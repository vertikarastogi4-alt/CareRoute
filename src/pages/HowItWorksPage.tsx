import { Link } from 'react-router-dom';
import {
  Stethoscope, User, Brain, TrendingUp,
  ArrowRight, CheckCircle2, FileText, MapPin,
  Wallet, Car, Clock, ShieldCheck, Activity,
  GitBranch, ChevronRight,
} from 'lucide-react';
import { TrustBadge } from '@/components/TrustBadge';

export function HowItWorksPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-b from-navy-50/50 to-white py-16 lg:py-20">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 mb-4">
            <Activity className="h-3.5 w-3.5 text-teal-600" />
            <span className="text-xs font-semibold text-teal-700">How It Works</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-navy-800 text-balance">
            Four steps from referral to accessible care
          </h1>
          <p className="mt-4 text-navy-600 max-w-2xl mx-auto">
            CareRoute connects a doctor's clinical recommendation to real-world healthcare access — without ever diagnosing or overriding the clinical decision.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-container py-16">
        <div className="grid lg:grid-cols-4 gap-6 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-navy-200 via-teal-300 to-navy-200" />

          <StepCard
            num="1"
            icon={Stethoscope}
            title="Doctor Referral"
            color="navy"
            items={[
              'Doctor creates a digital referral',
              'Secure link or QR code generated',
              'Clinical requirement defined (not diagnosed)',
            ]}
          />
          <StepCard
            num="2"
            icon={User}
            title="Patient Constraints"
            color="teal"
            items={[
              'Location & budget',
              'Maximum travel distance',
              'Transport availability',
              'Preferred time & accessibility',
            ]}
          />
          <StepCard
            num="3"
            icon={Brain}
            title="Intelligent Matching"
            color="navy"
            items={[
              'Service fit evaluation',
              'Cost & distance scoring',
              'Availability & eligibility check',
              'Data freshness verification',
            ]}
          />
          <StepCard
            num="4"
            icon={TrendingUp}
            title="Ranked Care Pathway"
            color="teal"
            items={[
              'Best option with full score breakdown',
              'Alternative options ranked',
              'Why each option was recommended',
              'Verification status shown',
            ]}
          />
        </div>
      </section>

      {/* Visual Flow Diagram */}
      <section className="section-container py-12">
        <div className="card p-8 lg:p-10 bg-navy-800 border-navy-700">
          <h3 className="text-lg font-semibold text-white mb-8 text-center">CareRoute Matching Flow</h3>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <FlowNode icon={FileText} label="Doctor Recommendation" sublabel="MRI Brain with Contrast" />
            <FlowArrow />
            <FlowNode icon={User} label="Patient Constraints" sublabel="₹2,000 / 15km / 7 days" />
            <FlowArrow />
            <FlowNode icon={Activity} label="CareRoute Engine" sublabel="Weighted scoring" highlight />
            <FlowArrow />
            <FlowNode icon={CheckCircle2} label="Feasibility Score" sublabel="92/100" />
            <FlowArrow />
            <FlowNode icon={GitBranch} label="Care Options" sublabel="Best + Alternatives" />
          </div>
        </div>
      </section>

      {/* Step 1 Detail */}
      <StepDetail
        num="1"
        icon={Stethoscope}
        title="Doctor Referral"
        description="A doctor creates a digital referral through a secure link or QR code. The doctor defines the required healthcare service — CareRoute never diagnoses or modifies this clinical recommendation."
        features={[
          { icon: FileText, label: 'Digital referral form', desc: 'Service, specification, urgency, clinical notes' },
          { icon: ShieldCheck, label: 'Secure link generation', desc: 'Encrypted patient link with expiry' },
          { icon: CheckCircle2, label: 'Clinical ownership', desc: 'AI extracts structure but never overrides' },
        ]}
      />

      {/* Step 2 Detail */}
      <StepDetail
        num="2"
        icon={User}
        title="Patient Constraints"
        description="The patient opens the referral link and enters real-world constraints that determine what care is actually accessible to them."
        features={[
          { icon: MapPin, label: 'Current location', desc: 'Where the patient is based' },
          { icon: Wallet, label: 'Maximum budget', desc: 'What the patient can afford' },
          { icon: Car, label: 'Transport availability', desc: 'Own vehicle, public, or none' },
          { icon: Clock, label: 'Preferred time', desc: 'When the patient is available' },
        ]}
        reversed
      />

      {/* Step 3 Detail */}
      <StepDetail
        num="3"
        icon={Brain}
        title="Intelligent Matching"
        description="CareRoute evaluates facilities against the clinical requirement and patient constraints using a weighted scoring system."
        features={[
          { icon: CheckCircle2, label: 'Service Fit — 30%', desc: 'Does the facility offer the required service?' },
          { icon: MapPin, label: 'Distance — 25%', desc: 'Is it within the travel limit?' },
          { icon: Wallet, label: 'Cost — 20%', desc: 'Is it within budget?' },
          { icon: Clock, label: 'Availability — 15%', desc: 'Is a slot available in time?' },
          { icon: ShieldCheck, label: 'Eligibility — 10%', desc: 'Does the patient meet facility criteria?' },
        ]}
      />

      {/* Step 4 Detail */}
      <StepDetail
        num="4"
        icon={TrendingUp}
        title="Ranked Care Pathway"
        description="The patient sees ranked facility options with a clear explanation of why each was recommended — and what to do if the first option isn't feasible."
        features={[
          { icon: TrendingUp, label: 'Best option', desc: 'Highest feasibility score with full breakdown' },
          { icon: GitBranch, label: 'Alternative pathways', desc: 'If the first option fails, alternatives are ready' },
          { icon: CheckCircle2, label: 'Explainable scores', desc: 'Every score is broken down by factor' },
          { icon: ShieldCheck, label: 'Verification status', desc: 'Know when facility data was last verified' },
        ]}
        reversed
      />

      {/* AI Section */}
      <section className="section-container py-16">
        <div className="card p-8 lg:p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-3 py-1.5 mb-3">
              <Brain className="h-4 w-4 text-navy-600" />
              <span className="text-xs font-semibold text-navy-700">AI / NLP in CareRoute</span>
            </div>
            <h2 className="text-2xl font-bold text-navy-800">AI assists — never decides</h2>
            <p className="mt-2 text-navy-600 max-w-2xl mx-auto">
              AI and NLP support the matching process, but structured data and the doctor's clinical judgment remain the source of truth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-5">
              <h4 className="text-sm font-semibold text-teal-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> AI Does
              </h4>
              <ul className="space-y-2 text-sm text-navy-700">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" /> Extracts structured requirements from referrals</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" /> Interprets natural-language patient constraints</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" /> Supports facility matching with weighted scoring</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" /> Generates explanations for recommendations</li>
              </ul>
            </div>
            <div className="rounded-xl border border-error-200 bg-error-50/40 p-5">
              <h4 className="text-sm font-semibold text-error-600 mb-3 flex items-center gap-2">
                <span className="text-error-500">✕</span> AI Never Does
              </h4>
              <ul className="space-y-2 text-sm text-navy-700">
                <li className="flex items-start gap-2"><span className="text-error-500 flex-shrink-0 mt-0.5">✕</span> Diagnose disease or medical conditions</li>
                <li className="flex items-start gap-2"><span className="text-error-500 flex-shrink-0 mt-0.5">✕</span> Prescribe treatment or medication</li>
                <li className="flex items-start gap-2"><span className="text-error-500 flex-shrink-0 mt-0.5">✕</span> Override the doctor's recommendation</li>
                <li className="flex items-start gap-2"><span className="text-error-500 flex-shrink-0 mt-0.5">✕</span> Invent facility information, prices, or availability</li>
              </ul>
            </div>
          </div>

          {/* NLP Example */}
          <div className="mt-6 rounded-xl bg-navy-800 p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-teal-400" />
              <span className="text-sm font-semibold">NLP Extraction Example</span>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="rounded-lg bg-navy-600 px-4 py-3 text-sm text-navy-100 flex-1 w-full">
                "MRI brain with contrast required within 7 days"
              </div>
              <ArrowRight className="h-5 w-5 text-teal-400 hidden lg:block" />
              <div className="flex-1 w-full space-y-1.5">
                <ExtractItem label="Service" value="MRI" />
                <ExtractItem label="Body Part" value="Brain" />
                <ExtractItem label="Contrast" value="Required" />
                <ExtractItem label="Urgency" value="7 days" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container py-16">
        <div className="text-center">
          <TrustBadge />
          <h2 className="mt-6 text-2xl font-bold text-navy-800 mb-3">Experience the full flow</h2>
          <p className="text-navy-600 mb-6">Try Demo Mode to see CareRoute in action — no signup needed.</p>
          <Link to="/doctor/create-referral" className="btn-primary text-base px-6 py-3">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StepCard({ num, icon: Icon, title, color, items }: {
  num: string; icon: typeof Stethoscope; title: string; color: 'navy' | 'teal'; items: string[];
}) {
  return (
    <div className="relative card-hover p-6 z-10 bg-white">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${
        color === 'navy' ? 'bg-navy-700' : 'bg-teal-500'
      }`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className={`absolute top-4 right-4 text-3xl font-bold ${color === 'navy' ? 'text-navy-100' : 'text-teal-100'}`}>
        {num}
      </div>
      <h3 className="text-lg font-semibold text-navy-800 mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-navy-600">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowNode({ icon: Icon, label, sublabel, highlight }: {
  icon: typeof FileText; label: string; sublabel: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl px-4 py-3 text-center min-w-[140px] ${
      highlight ? 'bg-teal-500 text-white shadow-card-hover' : 'bg-navy-600 text-navy-100'
    }`}>
      <Icon className={`h-6 w-6 mx-auto mb-2 ${highlight ? 'text-white' : 'text-teal-400'}`} />
      <div className="text-sm font-semibold">{label}</div>
      <div className={`text-xs ${highlight ? 'text-teal-50' : 'text-navy-300'}`}>{sublabel}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <ChevronRight className="h-5 w-5 text-teal-400" />
    </div>
  );
}

function StepDetail({ num, icon: Icon, title, description, features, reversed }: {
  num: string; icon: typeof Stethoscope; title: string; description: string;
  features: { icon: typeof MapPin; label: string; desc: string }[]; reversed?: boolean;
}) {
  return (
    <section className="section-container py-12">
      <div className={`grid lg:grid-cols-2 gap-10 items-center ${reversed ? 'lg:grid-flow-dense' : ''}`}>
        <div className={reversed ? 'lg:order-2' : ''}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-navy-700 flex items-center justify-center">
              <Icon className="h-5 w-5 text-teal-400" />
            </div>
            <span className="text-sm font-semibold text-teal-600">Step {num}</span>
          </div>
          <h2 className="text-2xl font-bold text-navy-800 mb-3">{title}</h2>
          <p className="text-navy-600 leading-relaxed">{description}</p>
        </div>
        <div className={reversed ? 'lg:order-1' : ''}>
          <div className="card p-6 space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                <div className="h-9 w-9 rounded-lg bg-white shadow-soft flex items-center justify-center flex-shrink-0">
                  <f.icon className="h-4.5 w-4.5 text-navy-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-800">{f.label}</div>
                  <div className="text-xs text-navy-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtractItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-teal-400 font-medium w-20">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
