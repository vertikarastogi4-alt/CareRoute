import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Wallet, Clock, Car, CheckCircle2, XCircle,
  ArrowRight, Stethoscope, ShieldCheck, TrendingUp,
  Building2, Activity, AlertCircle, ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useApp } from '@/context/AppContext';
import { getMockDistance, getMockPrice, getScoreLabel } from '@/utils/matching';
import type { MatchedFacility } from '@/types';

export function ResultsPage() {
  const navigate = useNavigate();
  const { activeReferral, constraints, matches, setSelectedFacilityId } = useApp();

  if (!activeReferral || !constraints || matches.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="section-container py-16">
          <div className="max-w-lg mx-auto card p-8 text-center">
            <div className="h-16 w-16 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-4">
              <Activity className="h-8 w-8 text-navy-400" />
            </div>
            <h1 className="text-xl font-semibold text-navy-800 mb-2">No Care Options Yet</h1>
            <p className="text-sm text-navy-500 mb-6">
              You need to enter your constraints first, or try Demo Mode to see ranked care options.
            </p>
            <Link to="/patient" className="btn-primary">
              Enter Constraints
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const topMatches = matches.filter((m) => !m.isAlternative);
  const alternatives = matches.filter((m) => m.isAlternative);

  const handleViewDetails = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
    navigate('/facility-details');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="section-container py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-teal-600" />
            <span className="text-xs font-semibold text-teal-700">CareRoute Matching Results</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-800">Your Care Options</h1>
          <p className="text-sm text-navy-500 mt-1">
            Ranked by feasibility score based on your doctor's recommendation and your constraints
          </p>
        </div>

        {/* Requirement & Constraints Summary */}
        <div className="grid lg:grid-cols-2 gap-4 mb-8">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="h-4 w-4 text-navy-600" />
              <h3 className="text-sm font-semibold text-navy-800">Requirement</h3>
            </div>
            <div className="text-lg font-semibold text-navy-800">{activeReferral.specification}</div>
            <div className="text-xs text-navy-500 mt-1">
              Required within {activeReferral.urgency === 'within-7-days' ? '7 days' : activeReferral.urgency.replace(/-/g, ' ')}
              {' · '}Recommended by {activeReferral.doctorName}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              <h3 className="text-sm font-semibold text-navy-800">Your Constraints</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <ConstraintPill icon={Wallet} label={`₹${constraints.budget}`} sub="Budget" />
              <ConstraintPill icon={MapPin} label={`≤${constraints.maxTravelDistance} km`} sub="Distance" />
              <ConstraintPill icon={Clock} label="7 days" sub="Time" />
              <ConstraintPill icon={Car} label={constraints.transport === 'none' ? 'No transport' : 'Available'} sub="Transport" />
            </div>
          </div>
        </div>

        {/* Top Matches */}
        {topMatches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <h2 className="text-lg font-semibold text-navy-800">Best Care Options</h2>
              <span className="badge bg-teal-50 text-teal-700">{topMatches.length} found</span>
            </div>
            <div className="space-y-4">
              {topMatches.map((match, idx) => (
                <FacilityMatchCard
                  key={match.facility.id}
                  match={match}
                  rank={idx + 1}
                  onViewDetails={() => handleViewDetails(match.facility.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-navy-800">Alternative Options</h2>
              <span className="badge bg-amber-50 text-amber-700">{alternatives.length} found</span>
            </div>
            <p className="text-sm text-navy-500 mb-4">
              These options may not fully match all your constraints but still offer the required service.
            </p>
            <div className="space-y-4">
              {alternatives.map((match, idx) => (
                <FacilityMatchCard
                  key={match.facility.id}
                  match={match}
                  rank={topMatches.length + idx + 1}
                  isAlternative
                  onViewDetails={() => handleViewDetails(match.facility.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Demo Notice */}
        <div className="rounded-xl bg-navy-50 border border-navy-100 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-navy-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-navy-700">Prototype / Demo Data</p>
            <p className="text-xs text-navy-500 mt-0.5">
              All facility data shown here is mock data for demonstration purposes. Prices, availability, and verification status are not real-world verified.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/patient" className="btn-secondary">
            ← Update Constraints
          </Link>
          <Link to="/alternative-pathway" className="btn-ghost text-teal-600">
            View Alternative Pathway
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ConstraintPill({ icon: Icon, label, sub }: { icon: typeof MapPin; label: string; sub: string }) {
  return (
    <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
      <div className="flex items-center gap-1.5 text-xs text-navy-400">
        <Icon className="h-3 w-3" />
        {sub}
      </div>
      <div className="text-sm font-semibold text-navy-800 mt-0.5">{label}</div>
    </div>
  );
}

function FacilityMatchCard({ match, rank, isAlternative, onViewDetails }: {
  match: MatchedFacility; rank: number; isAlternative?: boolean; onViewDetails: () => void;
}) {
  const { facility, score, matchPercentage, reasons } = match;
  const distance = getMockDistance(facility.id);
  const price = getMockPrice(facility, { specification: facility.services[0]?.specifications?.[0] ?? '' } as any);

  return (
    <div className={`card-hover p-5 ${isAlternative ? 'border-amber-200' : rank === 1 ? 'border-teal-300 bg-teal-50/20' : ''}`}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Rank & Score */}
        <div className="flex lg:flex-col items-center gap-3 lg:gap-1">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-lg font-bold ${
            rank === 1 && !isAlternative ? 'bg-teal-500 text-white' : isAlternative ? 'bg-amber-100 text-amber-700' : 'bg-navy-100 text-navy-700'
          }`}>
            #{rank}
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isAlternative ? 'text-amber-600' : 'text-teal-600'}`}>
              {matchPercentage}%
            </div>
            <div className="text-xs text-navy-400">Match</div>
          </div>
        </div>

        {/* Facility Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-navy-800">{facility.name}</h3>
                {rank === 1 && !isAlternative && (
                  <span className="badge bg-teal-500 text-white">Best Match</span>
                )}
                {isAlternative && (
                  <span className="badge bg-amber-100 text-amber-700">Alternative</span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-navy-500">
                <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{facility.type}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{facility.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <VerificationBadge status={facility.verificationStatus} />
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <DetailPill icon={Wallet} label="Price" value={`₹${getMockPrice(facility, { specification: facility.services.find(s => s.available)?.specifications?.[0] ?? '' } as any) || 'N/A'}`} />
            <DetailPill icon={MapPin} label="Distance" value={`${distance} km`} />
            <DetailPill icon={Activity} label="Service" value={facility.services.find(s => s.available)?.name ?? 'N/A'} />
            <DetailPill icon={Clock} label="Next Slot" value={facility.availability.nextSlot} />
          </div>

          {/* Why This Matches */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-navy-700 mb-2">Why this facility matches:</p>
            <div className="flex flex-wrap gap-1.5">
              {reasons.map((reason, i) => {
                const isPositive = !reason.toLowerCase().includes('exceeds') && !reason.toLowerCase().includes('outside');
                return (
                  <span
                    key={i}
                    className={`badge ${isPositive ? 'bg-teal-50 text-teal-700' : 'bg-error-50 text-error-600'}`}
                  >
                    {isPositive ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    {reason}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            <ScoreBar label="Service" value={score.serviceFit} max={30} />
            <ScoreBar label="Distance" value={score.distance} max={25} />
            <ScoreBar label="Cost" value={score.cost} max={20} />
            <ScoreBar label="Avail." value={score.availability} max={15} />
            <ScoreBar label="Eligib." value={score.eligibility} max={10} />
          </div>

          {/* Last Verified */}
          <div className="mt-3 text-xs text-navy-400">
            Last verified: {facility.lastVerified}
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <button onClick={onViewDetails} className="btn-primary text-sm">
              View Details
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/alternative-pathway" className="btn-ghost text-sm">
              View Alternatives
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailPill({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
      <div className="flex items-center gap-1 text-xs text-navy-400">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="text-sm font-semibold text-navy-800 mt-0.5">{value}</div>
    </div>
  );
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-navy-500">{label}</span>
        <span className="font-semibold text-navy-700">{value}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full rounded-full ${pct >= 80 ? 'bg-teal-500' : pct >= 50 ? 'bg-navy-400' : 'bg-amber-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function VerificationBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Recently Verified': 'bg-teal-50 text-teal-700 border-teal-100',
    'Verified': 'bg-success-50 text-success-700 border-success-100',
    'Pending Verification': 'bg-amber-50 text-amber-700 border-amber-100',
    'Outdated': 'bg-error-50 text-error-600 border-error-100',
  };
  return (
    <span className={`badge border ${styles[status] ?? styles['Pending Verification']}`}>
      <ShieldCheck className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}
