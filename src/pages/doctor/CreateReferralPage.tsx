import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FilePlus2, FileText, Users, User,
  Stethoscope, QrCode, Copy, Share2, CheckCircle2,
  ArrowRight, Lock, Clock, Calendar, AlertCircle,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LogoPlain } from '@/components/Logo';
import { useApp } from '@/context/AppContext';
import { showToast } from '@/components/Toast';
import type { Referral, Urgency } from '@/types';

const links = [
  { to: '/doctor', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/doctor/create-referral', icon: FilePlus2, label: 'Create Referral' },
  { to: '/doctor/referrals', icon: FileText, label: 'My Referrals' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/profile', icon: User, label: 'Profile' },
];

export function CreateReferralPage() {
  const navigate = useNavigate();
  const { createReferral, setActiveReferral } = useApp();
  const [generated, setGenerated] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    patientName: '',
    patientId: '',
    requiredService: '',
    specification: '',
    urgency: 'within-7-days' as Urgency,
    requiredBy: '',
    additionalRequirements: '',
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.patientName.trim()) e.patientName = 'Patient name is required';
    if (!form.patientId.trim()) e.patientId = 'Patient ID is required';
    if (!form.requiredService.trim()) e.requiredService = 'Required service is required';
    if (!form.specification.trim()) e.specification = 'Specification is required';
    if (!form.requiredBy) e.requiredBy = 'Required by date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      showToast('error', 'Please fill in all required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const referral = createReferral(form);
      setActiveReferral(referral);
      setGenerated(referral);
      setLoading(false);
      showToast('success', 'Secure referral generated successfully');
    }, 800);
  };

  const handleCopy = () => {
    if (!generated) return;
    const url = `${window.location.origin}${generated.secureLink}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast('success', 'Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceed = () => {
    if (generated) {
      setActiveReferral(generated);
      navigate('/patient');
    }
  };

  return (
    <DashboardLayout
      sidebarTitle="Doctor Portal"
      links={links}
      header={
        <div className="flex items-center justify-between">
          <LogoPlain size="sm" />
          <Link to="/doctor" className="btn-ghost">← Dashboard</Link>
        </div>
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Create Referral</h1>
        <p className="text-sm text-navy-500 mt-1">
          Define the required healthcare service. CareRoute will match it to feasible facilities — it never diagnoses or modifies your recommendation.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {!generated ? (
            <form onSubmit={handleSubmit} className="card p-6">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-200">
                <Stethoscope className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold text-navy-800">Clinical Requirement</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-field" htmlFor="patientName">Patient Name <span className="text-error-500">*</span></label>
                  <input
                    id="patientName"
                    className="input-field"
                    value={form.patientName}
                    onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                  />
                  {errors.patientName && <p className="mt-1 text-xs text-error-500">{errors.patientName}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="patientId">Patient ID <span className="text-error-500">*</span></label>
                  <input
                    id="patientId"
                    className="input-field"
                    value={form.patientId}
                    onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                    placeholder="e.g. PT-2024-0341"
                  />
                  {errors.patientId && <p className="mt-1 text-xs text-error-500">{errors.patientId}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="requiredService">Required Service <span className="text-error-500">*</span></label>
                  <input
                    id="requiredService"
                    className="input-field"
                    value={form.requiredService}
                    onChange={(e) => setForm({ ...form, requiredService: e.target.value })}
                    placeholder="e.g. MRI, CT Scan, X-Ray"
                  />
                  {errors.requiredService && <p className="mt-1 text-xs text-error-500">{errors.requiredService}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="specification">Body Part / Service Specification <span className="text-error-500">*</span></label>
                  <input
                    id="specification"
                    className="input-field"
                    value={form.specification}
                    onChange={(e) => setForm({ ...form, specification: e.target.value })}
                    placeholder="e.g. MRI Brain with Contrast"
                  />
                  {errors.specification && <p className="mt-1 text-xs text-error-500">{errors.specification}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="urgency">Urgency</label>
                  <select
                    id="urgency"
                    className="input-field"
                    value={form.urgency}
                    onChange={(e) => setForm({ ...form, urgency: e.target.value as Urgency })}
                  >
                    <option value="routine">Routine</option>
                    <option value="within-7-days">Within 7 days</option>
                    <option value="within-48-hours">Within 48 hours</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="requiredBy">Required By <span className="text-error-500">*</span></label>
                  <input
                    id="requiredBy"
                    type="date"
                    className="input-field"
                    value={form.requiredBy}
                    onChange={(e) => setForm({ ...form, requiredBy: e.target.value })}
                  />
                  {errors.requiredBy && <p className="mt-1 text-xs text-error-500">{errors.requiredBy}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="label-field" htmlFor="additionalRequirements">Additional Clinical Requirements</label>
                <textarea
                  id="additionalRequirements"
                  className="input-field min-h-[80px] resize-y"
                  value={form.additionalRequirements}
                  onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })}
                  placeholder="e.g. Patient has claustrophobia, prefer open MRI if available"
                />
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Generate Secure Referral
                    </>
                  )}
                </button>
                <Link to="/doctor" className="btn-ghost">Cancel</Link>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-navy-50 p-3">
                <AlertCircle className="h-4 w-4 text-navy-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-navy-600">
                  The doctor only defines the required healthcare service. CareRoute's AI does not diagnose, prescribe, or modify this clinical recommendation.
                </p>
              </div>
            </form>
          ) : (
            <div className="card p-6 animate-scale-in">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-200">
                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold text-navy-800">Referral Generated</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <InfoRow label="Referral ID" value={generated.id} />
                <InfoRow label="Patient" value={`${generated.patientName} (${generated.patientId})`} />
                <InfoRow label="Required Service" value={generated.requiredService} />
                <InfoRow label="Specification" value={generated.specification} />
                <InfoRow label="Urgency" value={generated.urgency.replace(/-/g, ' ')} />
                <InfoRow label="Required By" value={generated.requiredBy} />
              </div>

              <div className="rounded-xl border border-slate-200 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-semibold text-navy-700">Secure Patient Link</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-navy-600 bg-slate-50 rounded-lg px-3 py-2 truncate">
                    {window.location.origin}{generated.secureLink}
                  </code>
                  <button onClick={handleCopy} className="btn-secondary px-3 py-2">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-teal-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-navy-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Expires: {generated.expiresAt}</span>
                  <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Encrypted</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleProceed} className="btn-primary flex-1">
                  Proceed to Patient Portal
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={handleCopy} className="btn-secondary">
                  <Share2 className="h-4 w-4" />
                  Share Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* QR Placeholder & Info */}
        <div className="space-y-4">
          <div className="card p-6 text-center">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <QrCode className="h-5 w-5 text-navy-700" />
              <h3 className="text-sm font-semibold text-navy-800">QR Code</h3>
            </div>
            <div className="mx-auto h-40 w-40 rounded-xl border-2 border-dashed border-navy-200 flex items-center justify-center bg-navy-50/30">
              <QrCode className="h-16 w-16 text-navy-300" />
            </div>
            <p className="mt-3 text-xs text-navy-500">
              Patient can scan this QR to open the referral directly
            </p>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-navy-800 mb-3">How it works</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="h-6 w-6 rounded-full bg-navy-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <p className="text-xs text-navy-600">You define the required clinical service</p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="h-6 w-6 rounded-full bg-navy-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                <p className="text-xs text-navy-600">Patient opens the secure link and enters constraints</p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="h-6 w-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                <p className="text-xs text-navy-600">CareRoute ranks feasible facilities with explanations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <div className="text-xs text-navy-400">{label}</div>
      <div className="text-sm font-semibold text-navy-800 mt-0.5">{value}</div>
    </div>
  );
}
