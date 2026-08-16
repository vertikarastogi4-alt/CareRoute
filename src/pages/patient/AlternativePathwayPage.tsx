import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowRight, MapPin, Wallet, Clock,
  CheckCircle2, XCircle, GitBranch,
  TrendingUp, ShieldCheck, ArrowLeft, Info,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useApp } from '@/context/AppContext';
import { getMockDistance, getMockPrice } from '@/utils/matching';

export function AlternativePathwayPage() {
  const { activeReferral, constraints, matches, setSelectedFacilityId } = useApp();

  if (!activeReferral || matches.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="section-container py-16">
          <div className="max-w-lg mx-auto card p-8 text-center">
            <div className="h-16 w-16 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-4">
              <GitBranch className="h-8 w-8 text-navy-400" />
            </div>
            <h1 className="text-xl font-semibold text-navy-800 mb-2">No Care Options Available</h1>
            <p className="text-sm text-navy-500 mb-6">Find care options first to see alternative pathways.</p>
            <Link to="/patient" className="btn-primary">Find Care Options</Link>
          </div>
        </div>
      </div>
    );
  }

  const topMatch = matches[0];
  const alternatives = matches.slice(1);
  const topPrice = getMockPrice(topMatch.facility, activeReferral);

  const exceedsBudget = constraints ? topPrice > constraints.budget : false;
  const exceedsDistance = constraints ? getMockDistance(topMatch.facility.id) > constraints.maxTravelDistance : false;

  const reason = exceedsBudget
    ? `${topMatch.facility.name} exceeds your current budget of ₹${constraints?.budget}.`
    : exceedsDistance
    ? `${topMatch.facility.name} is outside your travel limit of ${constraints?.maxTravelDistance} km.`
    : `${topMatch.facility.name} has limited availability within your required timeframe.`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="section-container py-8 lg:py-12">
        <Link to="/results" className="btn-ghost mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </Link>

        {/* Header */}
        <div className="card p-6 mb-6 bg-gradient-to-br from-amber-50 to-white border-amber-200">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-navy-800">Your First Choice Isn't Feasible</h1>
              <p className="text-sm text-navy-600 mt-1">{reason}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-100/50 rounded-lg px-3 py-2">
                <Info className="h-3.5 w-3.5" />
                We relaxed the budget constraint while keeping the required service unchanged.
              </div>
            </div>
          </div>
        </div>

        {/* Original Choice */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-navy-500 mb-3">Original Recommendation</h2>
          <div className="card p-5 border-amber-200 bg-amber-50/20">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-800">{topMatch.facility.name}</div>
                  <div className="text-xs text-navy-500">{topMatch.facility.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-navy-600">₹{topPrice}</span>
                <span className="text-navy-400">•</span>
                <span className="text-navy-600">{getMockDistance(topMatch.facility.id)} km</span>
                <span className="badge bg-amber-100 text-amber-700">Not feasible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Pathways */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-navy-800">Alternative Pathways</h2>
          </div>
          <p className="text-sm text-navy-500 mb-4">
            These options keep the required clinical service ({activeReferral.specification}) while adjusting for feasibility.
          </p>

          <div className="space-y-4">
            {alternatives.map((match, idx) => {
              const price = getMockPrice(match.facility, activeReferral);
              const distance = getMockDistance(match.facility.id);
              return (
                <div key={match.facility.id} className="card-hover p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-teal-700">#{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-navy-800">{match.facility.name}</h3>
                          <span className="badge bg-teal-50 text-teal-700">{match.matchPercentage}% Match</span>
                        </div>
                        <div className="text-xs text-navy-500 mt-0.5">{match.facility.type} · {match.facility.location}</div>

                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <AltDetail icon={Wallet} label="Price" value={`₹${price}`} highlight={constraints ? price <= constraints.budget : false} />
                          <AltDetail icon={MapPin} label="Distance" value={`${distance} km`} highlight={constraints ? distance <= constraints.maxTravelDistance : false} />
                          <AltDetail icon={Clock} label="Available" value={match.facility.availability.nextSlot} />
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {match.reasons.slice(0, 3).map((r, i) => (
                            <span key={i} className="badge bg-teal-50 text-teal-700">
                              <CheckCircle2 className="h-3 w-3" />
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link to="/facility-details" onClick={() => setSelectedFacilityId(match.facility.id)} className="btn-primary text-sm flex-shrink-0">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <div className="card p-6 bg-navy-800 text-white">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-teal-400" />
            <h3 className="text-sm font-semibold">How CareRoute Handles Alternatives</h3>
          </div>
          <p className="text-sm text-navy-200 leading-relaxed">
            When your first choice isn't feasible, CareRoute doesn't just give up. It relaxes non-clinical constraints (like budget or distance) while keeping the doctor's clinical recommendation unchanged. This ensures you always have a viable care pathway.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-navy-300">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
            The required service ({activeReferral.specification}) is never modified — only the constraints around it.
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/results" className="btn-secondary">
            ← Back to All Results
          </Link>
          <Link to="/patient" className="btn-ghost text-teal-600">
            Update Constraints
          </Link>
        </div>
      </div>
    </div>
  );
}

function AltDetail({ icon: Icon, label, value, highlight }: {
  icon: typeof MapPin; label: string; value: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${highlight ? 'border-teal-200 bg-teal-50/40' : 'border-slate-200 bg-slate-50'}`}>
      <div className="flex items-center gap-1 text-xs text-navy-400">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className={`text-sm font-semibold mt-0.5 ${highlight ? 'text-teal-700' : 'text-navy-800'}`}>{value}</div>
    </div>
  );
}
