import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Play, Stethoscope, User, GitBranch,
  ShieldCheck, Lock, FileCheck, Activity, MapPin,
  Clock, Wallet, Car, CheckCircle2, ChevronRight,
  TrendingUp, Building2, Users, Sparkles,
} from 'lucide-react';
import { TrustBadge } from '@/components/TrustBadge';
import { useApp } from '@/context/AppContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { loadDemo } = useApp();

  const handleDemo = () => {
    loadDemo();
    navigate('/results');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,165,152,0.06),transparent_50%)]" />
        <div className="section-container relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                <span className="text-xs font-semibold text-teal-700">Healthcare Access Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 leading-tight text-balance">
                Turn a Doctor's Recommendation into a{' '}
                <span className="text-teal-600">Care Pathway</span> You Can Actually Access.
              </h1>

              <p className="mt-5 text-base lg:text-lg text-navy-600 leading-relaxed max-w-xl">
                CareRoute helps patients find healthcare options that fit their clinical requirement, budget, location, travel constraints and availability.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/doctor/create-referral" className="btn-primary text-base px-6 py-3">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/how-it-works" className="btn-secondary text-base px-6 py-3">
                  <Play className="h-4 w-4" />
                  See How It Works
                </Link>
              </div>

              <div className="mt-8">
                <TrustBadge />
              </div>
            </div>

            {/* Hero Visual - Matching Flow */}
            <div className="relative animate-scale-in">
              <div className="card p-6 lg:p-8 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-navy-800">CareRoute Matching Engine</h3>
                  <span className="badge bg-teal-50 text-teal-700">
                    <Activity className="h-3 w-3" />
                    Live Demo
                  </span>
                </div>

                {/* Flow Steps */}
                <div className="space-y-3">
                  <FlowStep
                    icon={Stethoscope}
                    title="Doctor Referral"
                    subtitle="MRI Brain with Contrast"
                    color="navy"
                  />
                  <div className="flex justify-center">
                    <div className="h-6 w-px bg-navy-200" />
                  </div>
                  <FlowStep
                    icon={User}
                    title="Patient Constraints"
                    subtitle="Budget, location, transport..."
                    color="teal"
                  />
                  <div className="flex justify-center">
                    <div className="h-6 w-px bg-navy-200" />
                  </div>
                  <FlowStep
                    icon={Activity}
                    title="CareRoute Matching Engine"
                    subtitle="Scoring & ranking facilities"
                    color="navy"
                    highlight
                  />
                  <div className="flex justify-center">
                    <div className="h-6 w-px bg-navy-200" />
                  </div>
                  <FlowStep
                    icon={TrendingUp}
                    title="Ranked Facilities"
                    subtitle="Best + alternative options"
                    color="teal"
                  />
                </div>

                {/* Constraint Cards */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-xs font-medium text-navy-500 mb-3">Patient Constraints</p>
                  <div className="grid grid-cols-2 gap-2">
                    <ConstraintCard icon={Wallet} label="₹2,000 Budget" />
                    <ConstraintCard icon={MapPin} label="≤15 km" />
                    <ConstraintCard icon={Clock} label="Within 7 Days" />
                    <ConstraintCard icon={Car} label="Transport Available" />
                  </div>
                </div>
              </div>

              {/* Floating Score Badge */}
              <div className="absolute -bottom-4 -right-2 lg:-right-4 card px-4 py-3 bg-navy-700 text-white shadow-card-hover">
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-teal-400">92%</div>
                  <div className="text-xs">
                    <div className="font-semibold">Match Score</div>
                    <div className="text-navy-200">Top Facility</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CareRoute */}
      <section className="section-container py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-navy-800">Why CareRoute?</h2>
          <p className="mt-3 text-navy-500 max-w-2xl mx-auto">
            We bridge the gap between a clinical recommendation and a care pathway a patient can actually follow through on.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Stethoscope}
            title="Clinician-Led"
            description="Your doctor defines the required care. CareRoute never diagnoses or overrides clinical judgment."
            color="navy"
          />
          <FeatureCard
            icon={User}
            title="Patient-Centric"
            description="Recommendations consider real-world constraints — budget, distance, transport, and time."
            color="teal"
          />
          <FeatureCard
            icon={GitBranch}
            title="Alternative Pathways"
            description="If the first option doesn't work, find feasible alternatives without compromising on the clinical requirement."
            color="navy"
          />
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-navy-800 py-12">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Users} value="1,284" label="Referrals Processed" />
            <StatCard icon={Building2} value="6" label="Facilities Onboarded" />
            <StatCard icon={CheckCircle2} value="892" label="Care Completed" />
            <StatCard icon={TrendingUp} value="84.2%" label="Avg Feasibility Score" />
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="section-container py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy-800 mb-4">
              A clear path from referral to accessible care
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              CareRoute doesn't just list facilities. It scores them against what the patient can actually do — and explains why each option is recommended.
            </p>
            <div className="space-y-4">
              <StepPreview num="1" title="Doctor creates a referral" desc="Secure digital referral with clinical requirement" />
              <StepPreview num="2" title="Patient enters constraints" desc="Budget, location, transport, time preferences" />
              <StepPreview num="3" title="Intelligent matching" desc="Service fit, cost, distance, availability, eligibility" />
              <StepPreview num="4" title="Ranked care pathway" desc="Best option + alternatives with explanations" />
            </div>
            <Link to="/how-it-works" className="mt-6 inline-flex items-center gap-1 text-teal-600 font-semibold hover:gap-2 transition-all">
              See the full process <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-navy-800">Sample Match Result</h3>
              <span className="badge bg-teal-50 text-teal-700">Recently Verified</span>
            </div>
            <div className="space-y-3">
              <SampleResultCard name="City Diagnostic Center" score="92%" price="₹1,600" distance="8 km" slot="Tomorrow" best />
              <SampleResultCard name="HealthPlus Imaging" score="86%" price="₹1,900" distance="12 km" slot="Day After" />
              <SampleResultCard name="Government Diagnostic Centre" score="78%" price="₹1,200" distance="18 km" slot="In 3 days" alt />
            </div>
            <button onClick={handleDemo} className="w-full mt-4 btn-accent">
              <Play className="h-4 w-4" />
              Try Demo Mode
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="section-container py-16 lg:py-20">
        <div className="card p-8 lg:p-12 bg-gradient-to-br from-navy-50 to-teal-50/30 border-navy-100">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-800 mb-4">
                Privacy & Trust by Design
              </h2>
              <p className="text-navy-600 leading-relaxed mb-6">
                CareRoute collects only what's needed to find feasible care options. We never ask for your complete medical history, and we never diagnose.
              </p>
              <div className="space-y-3">
                <PrivacyItem icon={ShieldCheck} text="Minimum data collection — only constraints needed for matching" />
                <PrivacyItem icon={Lock} text="Encrypted referral links with expiry" />
                <PrivacyItem icon={FileCheck} text="Verified facility information with clear freshness labels" />
                <PrivacyItem icon={Users} text="Role-based access for doctors, patients, and facilities" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="h-40 w-40 rounded-full bg-white shadow-card flex items-center justify-center">
                  <ShieldCheck className="h-20 w-20 text-teal-500" />
                </div>
                <div className="absolute -top-2 -right-2 badge bg-teal-500 text-white px-3 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Privacy-first
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-navy-800 mb-4">
            Ready to find accessible care?
          </h2>
          <p className="text-navy-600 mb-8">
            Start with a doctor's referral, and CareRoute will match it to facilities you can realistically reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/doctor/create-referral" className="btn-primary text-base px-6 py-3">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button onClick={handleDemo} className="btn-secondary text-base px-6 py-3">
              <Play className="h-4 w-4" />
              Try Demo Mode
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FlowStep({ icon: Icon, title, subtitle, color, highlight }: {
  icon: typeof Stethoscope; title: string; subtitle: string; color: 'navy' | 'teal'; highlight?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
      highlight ? 'bg-navy-700 text-white shadow-soft' : color === 'navy' ? 'bg-navy-50' : 'bg-teal-50'
    }`}>
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        highlight ? 'bg-teal-500' : color === 'navy' ? 'bg-navy-700' : 'bg-teal-500'
      }`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className={`text-sm font-semibold ${highlight ? 'text-white' : 'text-navy-800'}`}>{title}</div>
        <div className={`text-xs ${highlight ? 'text-navy-200' : 'text-navy-500'}`}>{subtitle}</div>
      </div>
    </div>
  );
}

function ConstraintCard({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
      <Icon className="h-4 w-4 text-teal-600 flex-shrink-0" />
      <span className="text-xs font-medium text-navy-700">{label}</span>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: {
  icon: typeof Stethoscope; title: string; description: string; color: 'navy' | 'teal';
}) {
  return (
    <div className="card-hover p-6">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${
        color === 'navy' ? 'bg-navy-700' : 'bg-teal-500'
      }`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-navy-800 mb-2">{title}</h3>
      <p className="text-sm text-navy-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex h-10 w-10 rounded-xl bg-navy-600 items-center justify-center mb-2">
        <Icon className="h-5 w-5 text-teal-400" />
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-white">{value}</div>
      <div className="text-xs text-navy-200 mt-0.5">{label}</div>
    </div>
  );
}

function StepPreview({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-7 w-7 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
        {num}
      </div>
      <div>
        <div className="text-sm font-semibold text-navy-800">{title}</div>
        <div className="text-xs text-navy-500">{desc}</div>
      </div>
    </div>
  );
}

function SampleResultCard({ name, score, price, distance, slot, best, alt }: {
  name: string; score: string; price: string; distance: string; slot: string; best?: boolean; alt?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-3.5 transition-all ${
      best ? 'border-teal-300 bg-teal-50/50' : alt ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-navy-800">{name}</span>
          {best && <span className="badge bg-teal-500 text-white text-[10px] px-2 py-0.5">Best</span>}
          {alt && <span className="badge bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5">Alternative</span>}
        </div>
        <span className={`text-sm font-bold ${best ? 'text-teal-600' : 'text-navy-600'}`}>{score}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-navy-500">
        <span>{price}</span><span>•</span><span>{distance}</span><span>•</span><span>{slot}</span>
      </div>
    </div>
  );
}

function PrivacyItem({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-white shadow-soft flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-teal-600" />
      </div>
      <p className="text-sm text-navy-700 pt-1">{text}</p>
    </div>
  );
}
