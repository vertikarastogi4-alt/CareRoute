import { Link } from 'react-router-dom';
import {
  Stethoscope, User, GitBranch, ShieldCheck, Brain,
  Activity, ArrowRight, CheckCircle2, XCircle,
  TrendingUp, Building2, Users, MapPin,
} from 'lucide-react';
import { TrustBadge } from '@/components/TrustBadge';

export function AboutPage() {
  return (
    <div>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-navy-50/50 to-white py-16 lg:py-20">
          <div className="section-container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 mb-4">
              <Activity className="h-3.5 w-3.5 text-teal-600" />
              <span className="text-xs font-semibold text-teal-700">About CareRoute</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-navy-800 text-balance">
              Healthcare Accessibility Intelligence
            </h1>
            <p className="mt-4 text-navy-600 leading-relaxed">
              From knowing WHAT care is needed to finding WHERE and HOW it can realistically be accessed. CareRoute bridges the gap between a doctor's clinical recommendation and a patient's real-world ability to act on it.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="section-container py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6">
              <div className="h-12 w-12 rounded-xl bg-navy-700 flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Clinician-Led</h3>
              <p className="text-sm text-navy-600 leading-relaxed">
                A doctor defines what healthcare service the patient needs. CareRoute never diagnoses or overrides this recommendation.
              </p>
            </div>
            <div className="card p-6">
              <div className="h-12 w-12 rounded-xl bg-teal-500 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Patient-Centric</h3>
              <p className="text-sm text-navy-600 leading-relaxed">
                Patients enter real-world constraints — budget, location, transport, time. CareRoute finds options that actually work for them.
              </p>
            </div>
            <div className="card p-6">
              <div className="h-12 w-12 rounded-xl bg-navy-700 flex items-center justify-center mb-4">
                <GitBranch className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Alternative Pathways</h3>
              <p className="text-sm text-navy-600 leading-relaxed">
                If the first option isn't feasible, CareRoute generates alternatives by relaxing non-clinical constraints while keeping the clinical requirement unchanged.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Flow */}
        <section className="section-container py-12">
          <div className="card p-8 lg:p-10 bg-navy-800 text-white">
            <h2 className="text-xl font-semibold text-white mb-8 text-center">The CareRoute Flow</h2>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <FlowNode icon={Stethoscope} label="Doctor Recommendation" />
              <FlowArrow />
              <FlowNode icon={User} label="Patient Constraints" />
              <FlowArrow />
              <FlowNode icon={Activity} label="CareRoute Engine" highlight />
              <FlowArrow />
              <FlowNode icon={TrendingUp} label="Feasibility Score" />
              <FlowArrow />
              <FlowNode icon={GitBranch} label="Care Options" />
            </div>
          </div>
        </section>

        {/* AI Principles */}
        <section className="section-container py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-3 py-1.5 mb-3">
              <Brain className="h-4 w-4 text-navy-600" />
              <span className="text-xs font-semibold text-navy-700">AI Principles</span>
            </div>
            <h2 className="text-2xl font-bold text-navy-800">AI assists — never decides</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 border-teal-200">
              <h3 className="text-sm font-semibold text-teal-700 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> AI Does
              </h3>
              <ul className="space-y-3">
                {[
                  'Extracts structured requirements from doctor referrals',
                  'Interprets natural-language patient constraints',
                  'Supports facility matching with weighted scoring',
                  'Generates explanations for recommendations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 border-error-200">
              <h3 className="text-sm font-semibold text-error-600 mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5" /> AI Never Does
              </h3>
              <ul className="space-y-3">
                {[
                  'Diagnose disease or medical conditions',
                  'Prescribe treatment or medication',
                  "Override the doctor's recommendation",
                  'Invent facility information, prices, or availability',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                    <XCircle className="h-4 w-4 text-error-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="section-container py-16">
          <div className="card p-8 lg:p-12 bg-gradient-to-br from-navy-50 to-teal-50/30 border-navy-100">
            <div className="text-center mb-8">
              <ShieldCheck className="h-12 w-12 text-teal-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-navy-800">Privacy & Trust by Design</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <PrivacyCard icon={ShieldCheck} title="Minimum Data" desc="Only constraints needed for matching" />
              <PrivacyCard icon={CheckCircle2} title="Consent-Based" desc="Patient consent required for matching" />
              <PrivacyCard icon={Activity} title="Encrypted" desc="Referral links are encrypted with expiry" />
              <PrivacyCard icon={Users} title="Role-Based Access" desc="Doctors, patients, facilities have separate access" />
            </div>
            <div className="mt-8 flex justify-center">
              <TrustBadge />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Ready to find accessible care?</h2>
            <p className="text-navy-600 mb-6">Try Demo Mode to experience the full CareRoute flow.</p>
            <Link to="/doctor/create-referral" className="btn-primary text-base px-6 py-3">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function FlowNode({ icon: Icon, label, highlight }: { icon: typeof Stethoscope; label: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl px-4 py-3 text-center min-w-[130px] ${highlight ? 'bg-teal-500 text-white shadow-card-hover' : 'bg-navy-600 text-navy-100'}`}>
      <Icon className={`h-6 w-6 mx-auto mb-2 ${highlight ? 'text-white' : 'text-teal-400'}`} />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
}

function FlowArrow() {
  return <div className="text-teal-400 text-2xl hidden lg:block">→</div>;
}

function PrivacyCard({ icon: Icon, title, desc }: { icon: typeof ShieldCheck; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white p-5 text-center">
      <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center mx-auto mb-3">
        <Icon className="h-5 w-5 text-teal-600" />
      </div>
      <div className="text-sm font-semibold text-navy-800">{title}</div>
      <div className="text-xs text-navy-500 mt-1">{desc}</div>
    </div>
  );
}
