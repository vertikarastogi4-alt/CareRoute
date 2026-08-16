import type { Facility, PatientConstraints, Referral, MatchedFacility, ScoreBreakdown } from '@/types';
import { facilities } from '@/data/mockData';

const MAX_SCORES = {
  serviceFit: 30,
  distance: 25,
  cost: 20,
  availability: 15,
  eligibility: 10,
};

export function matchFacilities(
  referral: Referral,
  constraints: PatientConstraints,
  allFacilities: Facility[] = facilities
): MatchedFacility[] {
  const matches = allFacilities
    .map((facility) => {
      const score = calculateScore(referral, constraints, facility);
      const reasons = generateReasons(referral, constraints, facility, score);
      const matchPercentage = Math.round((score.total / 100) * 100);

      const isAlternative =
        score.cost < MAX_SCORES.cost * 0.5 ||
        score.distance < MAX_SCORES.distance * 0.5 ||
        facility.verificationStatus === 'Outdated';

      return {
        facility,
        score,
        matchPercentage,
        reasons,
        isAlternative,
      };
    })
    .filter((m) => m.score.serviceFit > 0)
    .sort((a, b) => b.score.total - a.score.total);

  return matches;
}

function calculateScore(
  referral: Referral,
  constraints: PatientConstraints,
  facility: Facility
): ScoreBreakdown {
  const serviceFit = scoreServiceFit(referral, facility);
  const distance = scoreDistance(constraints, facility);
  const cost = scoreCost(referral, constraints, facility);
  const availability = scoreAvailability(referral, facility);
  const eligibility = scoreEligibility(constraints, facility);

  return {
    serviceFit,
    distance,
    cost,
    availability,
    eligibility,
    total: serviceFit + distance + cost + availability + eligibility,
  };
}

function scoreServiceFit(referral: Referral, facility: Facility): number {
  const service = facility.services.find(
    (s) => s.name.toLowerCase() === referral.requiredService.toLowerCase()
  );
  if (!service || !service.available) return 0;

  if (referral.specification && service.specifications) {
    const hasSpec = service.specifications.some(
      (spec) => spec.toLowerCase() === referral.specification.toLowerCase()
    );
    return hasSpec ? MAX_SCORES.serviceFit : Math.round(MAX_SCORES.serviceFit * 0.7);
  }

  return MAX_SCORES.serviceFit;
}

function scoreDistance(constraints: PatientConstraints, facility: Facility): number {
  const mockDistance = getMockDistance(facility.id);
  if (mockDistance <= constraints.maxTravelDistance * 0.5) return MAX_SCORES.distance;
  if (mockDistance <= constraints.maxTravelDistance) {
    const ratio = 1 - (mockDistance - constraints.maxTravelDistance * 0.5) / (constraints.maxTravelDistance * 0.5);
    return Math.round(MAX_SCORES.distance * Math.max(0.6, ratio));
  }
  const overage = mockDistance - constraints.maxTravelDistance;
  const penalty = Math.min(overage / constraints.maxTravelDistance, 1);
  return Math.round(MAX_SCORES.distance * (0.4 - penalty * 0.4));
}

function scoreCost(
  referral: Referral,
  constraints: PatientConstraints,
  facility: Facility
): number {
  const price = facility.pricing[referral.specification] ?? facility.pricing[referral.requiredService] ?? 0;
  if (price === 0) return 0;
  if (price <= constraints.budget) {
    const ratio = price / constraints.budget;
    if (ratio <= 0.6) return MAX_SCORES.cost;
    if (ratio <= 0.8) return Math.round(MAX_SCORES.cost * 0.9);
    return Math.round(MAX_SCORES.cost * 0.75);
  }
  const overage = (price - constraints.budget) / constraints.budget;
  return Math.round(MAX_SCORES.cost * Math.max(0.2, 0.5 - overage * 0.3));
}

function scoreAvailability(referral: Referral, facility: Facility): number {
  const days = facility.availability.daysUntilSlot;
  const urgencyDays = getUrgencyDays(referral.urgency);

  if (days <= urgencyDays) return MAX_SCORES.availability;
  if (days <= urgencyDays + 2) return Math.round(MAX_SCORES.availability * 0.6);
  return Math.round(MAX_SCORES.availability * 0.3);
}

function scoreEligibility(constraints: PatientConstraints, facility: Facility): number {
  let score = MAX_SCORES.eligibility;

  if (constraints.facilityType !== 'any') {
    if (
      (constraints.facilityType === 'government' && facility.ownership !== 'Government') ||
      (constraints.facilityType === 'private' && facility.ownership !== 'Private')
    ) {
      score = Math.round(score * 0.5);
    }
  }

  if (facility.verificationStatus === 'Outdated') {
    score = Math.round(score * 0.6);
  } else if (facility.verificationStatus === 'Pending Verification') {
    score = Math.round(score * 0.85);
  }

  return score;
}

function generateReasons(
  referral: Referral,
  constraints: PatientConstraints,
  facility: Facility,
  score: ScoreBreakdown
): string[] {
  const reasons: string[] = [];
  const mockDistance = getMockDistance(facility.id);
  const price = facility.pricing[referral.specification] ?? facility.pricing[referral.requiredService] ?? 0;

  if (score.serviceFit === MAX_SCORES.serviceFit) {
    reasons.push('Required service available');
  } else if (score.serviceFit > 0) {
    reasons.push('Service available (partial specification match)');
  }

  if (price <= constraints.budget) {
    reasons.push('Within budget');
  } else {
    reasons.push('Exceeds budget');
  }

  if (mockDistance <= constraints.maxTravelDistance) {
    reasons.push('Within travel limit');
  } else {
    reasons.push('Outside travel limit');
  }

  if (facility.availability.daysUntilSlot <= getUrgencyDays(referral.urgency)) {
    reasons.push('Available within required time');
  }

  if (facility.verificationStatus === 'Recently Verified') {
    reasons.push('Recently verified facility data');
  }

  return reasons;
}

export function getMockDistance(facilityId: string): number {
  const distances: Record<string, number> = {
    'fac-001': 8,
    'fac-002': 12,
    'fac-003': 18,
    'fac-004': 5,
    'fac-005': 14,
    'fac-006': 22,
  };
  return distances[facilityId] ?? 15;
}

export function getMockPrice(facility: Facility, referral: Referral): number {
  return facility.pricing[referral.specification] ?? facility.pricing[referral.requiredService] ?? 0;
}

function getUrgencyDays(urgency: Referral['urgency']): number {
  switch (urgency) {
    case 'urgent':
      return 1;
    case 'within-48-hours':
      return 2;
    case 'within-7-days':
      return 7;
    case 'routine':
      return 30;
  }
}

export function getScoreLabel(score: number, max: number): string {
  const ratio = score / max;
  if (ratio >= 0.9) return 'Excellent';
  if (ratio >= 0.75) return 'Good';
  if (ratio >= 0.5) return 'Fair';
  return 'Limited';
}
