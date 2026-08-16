export type Urgency = 'routine' | 'within-7-days' | 'within-48-hours' | 'urgent';

export type FacilityType = 'Diagnostic Centre' | 'Hospital' | 'Clinic' | 'Imaging Center' | 'Government Hospital';

export type VerificationStatus = 'Recently Verified' | 'Verified' | 'Pending Verification' | 'Outdated';

export interface Service {
  name: string;
  available: boolean;
  specifications?: string[];
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  location: string;
  latitude: number;
  longitude: number;
  services: Service[];
  pricing: Record<string, number>;
  availability: {
    nextSlot: string;
    daysUntilSlot: number;
  };
  eligibility: string[];
  accessibility: string[];
  verificationStatus: VerificationStatus;
  lastVerified: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  operatingHours: {
    days: string;
    time: string;
  };
  rating: number;
  ownership: 'Government' | 'Private' | 'NGO';
}

export interface Referral {
  id: string;
  patientName: string;
  patientId: string;
  requiredService: string;
  specification: string;
  urgency: Urgency;
  requiredBy: string;
  additionalRequirements: string;
  doctorName: string;
  doctorId: string;
  clinic: string;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'completed' | 'pending' | 'expired';
  secureLink: string;
}

export interface PatientConstraints {
  location: string;
  budget: number;
  maxTravelDistance: number;
  transport: 'own-vehicle' | 'public-transport' | 'none';
  preferredTime: string;
  facilityType: 'government' | 'private' | 'any';
  accessibility: string[];
  optionalPreferences: string;
  consent: boolean;
}

export interface ScoreBreakdown {
  serviceFit: number;
  distance: number;
  cost: number;
  availability: number;
  eligibility: number;
  total: number;
}

export interface MatchedFacility {
  facility: Facility;
  score: ScoreBreakdown;
  matchPercentage: number;
  reasons: string[];
  isAlternative: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  email: string;
  phone: string;
}
