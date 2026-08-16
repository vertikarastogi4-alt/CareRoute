import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Clock, Phone, Mail, Globe,
  ShieldCheck, CheckCircle2, Navigation, Building2,
  Activity, Wallet, Accessibility, Calendar, Star,
  TrendingUp, ChevronRight, AlertCircle,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useApp } from '@/context/AppContext';
import { facilities } from '@/data/mockData';
import { getMockDistance, getMockPrice, getScoreLabel } from '@/utils/matching';

export function FacilityDetailsPage() {
  const navigate = useNavigate();
  const { selectedFacilityId, activeReferral, matches } = useApp();

  const facility = facilities.find((f) => f.id === selectedFacilityId);
  const match = matches.find((m) => m.facility.id === selectedFacilityId);

  if (!facility) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="section-container py-16">
          <div className="max-w-lg mx-auto card p-8 text-center">
            <div className="h-16 w-16 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-navy-400" />
            </div>
            <h1 className="text-xl font-semibold text-navy-800 mb-2">Facility Not Found</h1>
            <Link to="/results" className="btn-primary">Back to Results</Link>
          </div>
        </div>
      </div>
    );
  }

  const distance = getMockDistance(facility.id);
  const price = activeReferral ? getMockPrice(facility, activeReferral) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="section-container py-8 lg:py-12">
        <button onClick={() => navigate(-1)} className="btn-ghost mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </button>

        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h1 className="text-2xl font-bold text-navy-800">{facility.name}</h1>
                <VerificationBadge status={facility.verificationStatus} />
              </div>
              <div className="flex items-center gap-3 flex-wrap text-sm text-navy-500">
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{facility.type}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{facility.location}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-400" />{facility.rating}</span>
              </div>
              <div className="text-xs text-navy-400 mt-2">Last verified: {facility.lastVerified}</div>
            </div>
            {match && (
              <div className="text-center sm:text-right">
                <div className="text-3xl font-bold text-teal-600">{match.matchPercentage}%</div>
                <div className="text-xs text-navy-400">Feasibility Score</div>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-navy-800 mb-4">Location</h3>
              <div className="relative h-56 rounded-xl bg-navy-50 border border-navy-100 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,165,152,0.08),transparent_60%)]" />
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-teal-500 mx-auto flex items-center justify-center mb-2 shadow-card-hover">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-navy-600">{facility.location}</p>
                  <p className="text-xs text-navy-400 mt-1">{distance} km from your location</p>
                  <p className="text-xs text-navy-300 mt-1">Map placeholder · Lat: {facility.latitude}, Lng: {facility.longitude}</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-navy-600" />
                Services Available
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {facility.services.map((service) => (
                  <div key={service.name} className={`rounded-xl border p-3.5 ${service.available ? 'border-teal-200 bg-teal-50/30' : 'border-slate-200 bg-slate-50'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-navy-800">{service.name}</span>
                      {service.available ? (
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      ) : (
                        <span className="text-xs text-navy-400">Not available</span>
                      )}
                    </div>
                    {service.specifications && service.specifications.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {service.specifications.map((spec) => (
                          <span key={spec} className="badge bg-white text-navy-600 border border-slate-200 text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours & Contact */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-navy-600" />
                  Operating Hours
                </h3>
                <div className="text-sm text-navy-700">
                  <div className="font-medium">{facility.operatingHours.days}</div>
                  <div className="text-navy-500">{facility.operatingHours.time}</div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-navy-600" />
                  Contact
                </h3>
                <div className="space-y-2 text-sm text-navy-700">
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-navy-400" />{facility.contact.phone}</div>
                  <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-navy-400" />{facility.contact.email}</div>
                  {facility.contact.website && (
                    <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-navy-400" />{facility.contact.website}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Eligibility & Accessibility */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-navy-600" />
                  Eligibility
                </h3>
                <ul className="space-y-2">
                  {facility.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <Accessibility className="h-4 w-4 text-navy-600" />
                  Accessibility
                </h3>
                <ul className="space-y-2">
                  {facility.accessibility.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Estimated Price */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-navy-600" />
                Estimated Pricing
              </h3>
              <div className="space-y-2">
                {Object.entries(facility.pricing).map(([service, cost]) => (
                  <div key={service} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span className="text-sm text-navy-700">{service}</span>
                    <span className="text-sm font-semibold text-navy-800">₹{cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-navy-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Indicative pricing only. Confirm with the facility before booking.
              </div>
            </div>
          </div>

          {/* Score Breakdown Sidebar */}
          <div className="space-y-4">
            {match && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <h3 className="text-sm font-semibold text-navy-800">Why CareRoute Recommended This</h3>
                </div>

                <div className="space-y-4">
                  <ScoreRow label="Service Fit" value={match.score.serviceFit} max={30} />
                  <ScoreRow label="Distance" value={match.score.distance} max={25} />
                  <ScoreRow label="Cost" value={match.score.cost} max={20} />
                  <ScoreRow label="Availability" value={match.score.availability} max={15} />
                  <ScoreRow label="Eligibility" value={match.score.eligibility} max={10} />
                </div>

                <div className="mt-5 pt-5 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-navy-800">Total Score</span>
                    <span className="text-2xl font-bold text-teal-600">{match.score.total}/100</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {match.reasons.map((reason, i) => {
                    const isPositive = !reason.toLowerCase().includes('exceeds') && !reason.toLowerCase().includes('outside');
                    return (
                      <div key={i} className={`flex items-start gap-2 text-xs ${isPositive ? 'text-navy-700' : 'text-error-600'}`}>
                        {isPositive ? <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="h-3.5 w-3.5 text-error-500 flex-shrink-0 mt-0.5" />}
                        {reason}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="card p-6 space-y-3">
              <h3 className="text-sm font-semibold text-navy-800 mb-2">Actions</h3>
              <button className="w-full btn-primary">
                <Navigation className="h-4 w-4" />
                Get Directions
              </button>
              <button className="w-full btn-secondary">
                <Phone className="h-4 w-4" />
                Contact Facility
              </button>
              <Link to="/alternative-pathway" className="w-full btn-ghost text-teal-600 justify-center">
                View Alternative Options
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Availability */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-navy-600" />
                Availability
              </h3>
              <div className="rounded-xl bg-teal-50/40 border border-teal-100 p-3.5">
                <div className="text-sm font-semibold text-teal-700">Next Available Slot</div>
                <div className="text-lg font-bold text-navy-800 mt-1">{facility.availability.nextSlot}</div>
              </div>
              <div className="mt-3 text-xs text-navy-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Not real-time data. Confirm with facility before booking.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  const label2 = getScoreLabel(value, max);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-navy-700">{label}</span>
        <span className="text-sm font-semibold text-navy-800">{value}/{max}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full rounded-full ${pct >= 80 ? 'bg-teal-500' : pct >= 50 ? 'bg-navy-400' : 'bg-amber-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-navy-400 mt-1">{label2}</div>
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
