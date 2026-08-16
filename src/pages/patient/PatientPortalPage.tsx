import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Stethoscope, MapPin, Wallet, Car, Clock, Building2,
  Accessibility, FileText, ShieldCheck, Lock, ArrowRight,
  AlertCircle, CheckCircle2, User,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { TrustBadge } from '@/components/TrustBadge';
import { useApp } from '@/context/AppContext';
import { showToast } from '@/components/Toast';
import type { PatientConstraints } from '@/types';

export function PatientPortalPage() {
  const navigate = useNavigate();
  const { activeReferral, runMatching, loadDemo } = useApp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<PatientConstraints>({
    location: '',
    budget: 2000,
    maxTravelDistance: 15,
    transport: 'own-vehicle',
    preferredTime: '',
    facilityType: 'any',
    accessibility: [],
    optionalPreferences: '',
    consent: false,
  });

  if (!activeReferral) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="section-container py-16">
          <div className="max-w-lg mx-auto card p-8 text-center">
            <div className="h-16 w-16 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="h-8 w-8 text-navy-400" />
            </div>
            <h1 className="text-xl font-semibold text-navy-800 mb-2">No Active Referral</h1>
            <p className="text-sm text-navy-500 mb-6">
              You need a doctor's referral link to access the patient portal. Try Demo Mode to experience the full flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  loadDemo();
                  navigate('/results');
                }}
                className="btn-primary"
              >
                Try Demo Mode
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/doctor/create-referral" className="btn-secondary">
                Create a Referral
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.location.trim()) e.location = 'Please enter your location';
    if (!form.budget || form.budget <= 0) e.budget = 'Please enter a valid budget';
    if (!form.maxTravelDistance || form.maxTravelDistance <= 0) e.maxTravelDistance = 'Please enter a valid distance';
    if (!form.preferredTime.trim()) e.preferredTime = 'Please select a preferred time';
    if (!form.consent) e.consent = 'Please provide consent to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      showToast('error', 'Please complete all required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      runMatching(activeReferral, form);
      setLoading(false);
      showToast('success', 'Care options found');
      navigate('/results');
    }, 1000);
  };

  const toggleAccessibility = (item: string) => {
    setForm((prev) => ({
      ...prev,
      accessibility: prev.accessibility.includes(item)
        ? prev.accessibility.filter((a) => a !== item)
        : [...prev.accessibility, item],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="section-container py-8 lg:py-12">
        {/* Referral Info Card */}
        <div className="card p-6 mb-8 bg-gradient-to-br from-navy-700 to-navy-800 text-white border-navy-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="h-4 w-4 text-teal-400" />
                <span className="text-xs font-semibold text-teal-400">Your Doctor Recommended</span>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold">{activeReferral.specification}</h1>
              <p className="text-sm text-navy-200 mt-1">
                Required within {activeReferral.urgency === 'within-7-days' ? '7 days' : activeReferral.urgency.replace(/-/g, ' ')}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-navy-300">
                <User className="h-3.5 w-3.5" />
                {activeReferral.doctorName} · {activeReferral.clinic}
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className="badge bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Lock className="h-3 w-3" />
                Referral ID: {activeReferral.id}
              </span>
              <span className="text-xs text-navy-300">Expires: {activeReferral.expiresAt}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-6">
              <h2 className="text-lg font-semibold text-navy-800 mb-1">
                Tell us what makes healthcare accessible for you
              </h2>
              <p className="text-sm text-navy-500 mb-6">
                We'll match your doctor's recommendation to facilities you can realistically reach.
              </p>

              <div className="space-y-5">
                {/* Location */}
                <FieldGroup icon={MapPin} label="Current Location" required>
                  <input
                    className="input-field"
                    placeholder="e.g. Greater Noida, Sector 18"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                  {errors.location && <FieldError msg={errors.location} />}
                </FieldGroup>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Budget */}
                  <FieldGroup icon={Wallet} label="Maximum Budget (₹)" required>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g. 2000"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                    />
                    {errors.budget && <FieldError msg={errors.budget} />}
                  </FieldGroup>

                  {/* Travel Distance */}
                  <FieldGroup icon={MapPin} label="Maximum Travel Distance (km)" required>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g. 15"
                      value={form.maxTravelDistance}
                      onChange={(e) => setForm({ ...form, maxTravelDistance: Number(e.target.value) })}
                    />
                    {errors.maxTravelDistance && <FieldError msg={errors.maxTravelDistance} />}
                  </FieldGroup>
                </div>

                {/* Transportation */}
                <FieldGroup icon={Car} label="Transportation" required>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {[
                      { val: 'own-vehicle', label: 'Own vehicle', icon: Car },
                      { val: 'public-transport', label: 'Public transport', icon: Car },
                      { val: 'none', label: 'No reliable transport', icon: Car },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setForm({ ...form, transport: opt.val as PatientConstraints['transport'] })}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${
                          form.transport === opt.val
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 bg-white text-navy-600 hover:border-navy-200'
                        }`}
                      >
                        <opt.icon className="h-4 w-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </FieldGroup>

                {/* Preferred Time */}
                <FieldGroup icon={Clock} label="Preferred Appointment Time" required>
                  <select
                    className="input-field"
                    value={form.preferredTime}
                    onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                  >
                    <option value="">Select a time slot</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                  {errors.preferredTime && <FieldError msg={errors.preferredTime} />}
                </FieldGroup>

                {/* Facility Type */}
                <FieldGroup icon={Building2} label="Government / Private / Any">
                  <div className="grid sm:grid-cols-3 gap-2">
                    {[
                      { val: 'government', label: 'Government' },
                      { val: 'private', label: 'Private' },
                      { val: 'any', label: 'Any' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setForm({ ...form, facilityType: opt.val as PatientConstraints['facilityType'] })}
                        className={`rounded-xl border p-3 text-sm font-medium transition-all ${
                          form.facilityType === opt.val
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 bg-white text-navy-600 hover:border-navy-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </FieldGroup>

                {/* Accessibility */}
                <FieldGroup icon={Accessibility} label="Accessibility Requirements">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {['Wheelchair accessible', 'Ground floor only', 'Elevator access needed', 'Parking required'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAccessibility(item)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${
                          form.accessibility.includes(item)
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 bg-white text-navy-600 hover:border-navy-200'
                        }`}
                      >
                        {form.accessibility.includes(item) ? (
                          <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                        )}
                        {item}
                      </button>
                    ))}
                  </div>
                </FieldGroup>

                {/* Optional Preferences */}
                <FieldGroup icon={FileText} label="Optional Preferences">
                  <textarea
                    className="input-field min-h-[70px] resize-y"
                    placeholder="e.g. Prefer facility with home sample collection, prefer morning slots..."
                    value={form.optionalPreferences}
                    onChange={(e) => setForm({ ...form, optionalPreferences: e.target.value })}
                  />
                </FieldGroup>

                {/* Consent */}
                <div className="rounded-xl bg-navy-50 border border-navy-100 p-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, consent: !form.consent })}
                      className={`mt-0.5 h-5 w-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        form.consent ? 'bg-teal-500 border-teal-500' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {form.consent && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                    </button>
                    <div>
                      <p className="text-sm text-navy-700">
                        I understand and consent to use this information for care-pathway matching.
                      </p>
                      {errors.consent && <p className="mt-1 text-xs text-error-500">{errors.consent}</p>}
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start gap-2.5 rounded-xl bg-teal-50/50 border border-teal-100 p-4">
                  <ShieldCheck className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-navy-600 leading-relaxed">
                    We only ask for information needed to find feasible care options. CareRoute does not need your complete medical history for this process. Your data is encrypted and used solely for matching.
                  </p>
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary text-base py-3">
                  {loading ? (
                    <>
                      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Finding care options...
                    </>
                  ) : (
                    <>
                      Find My Care Options
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold text-navy-800">Your Privacy</h3>
              </div>
              <div className="space-y-2.5 text-xs text-navy-600">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" /> Minimum data collection</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" /> No medical history required</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" /> Encrypted referral link</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" /> Data used only for matching</div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <TrustBadge variant="compact" />
              </div>
            </div>

            <div className="card p-5 bg-amber-50/40 border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-navy-800">Demo Mode</h3>
              </div>
              <p className="text-xs text-navy-600 mb-3">
                Want to see the full flow without filling the form? Try the demo with pre-filled data.
              </p>
              <button
                onClick={() => {
                  loadDemo();
                  navigate('/results');
                }}
                className="w-full btn-secondary text-sm"
              >
                Use Demo Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldGroup({ icon: Icon, label, children, required }: {
  icon: typeof MapPin; label: string; children: React.ReactNode; required?: boolean;
}) {
  return (
    <div>
      <label className="label-field flex items-center gap-1.5">
        <Icon className="h-4 w-4 text-navy-500" />
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-1 mt-1 text-xs text-error-500">
      <AlertCircle className="h-3 w-3" />
      {msg}
    </div>
  );
}
