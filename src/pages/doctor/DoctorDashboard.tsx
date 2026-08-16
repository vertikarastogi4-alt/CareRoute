import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FilePlus2, FileText, Users, User,
  TrendingUp, Clock, CheckCircle2, GitBranch, Plus,
  ArrowRight, Stethoscope,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LogoPlain } from '@/components/Logo';
import { useApp } from '@/context/AppContext';
import { currentDoctor } from '@/data/mockData';

const links = [
  { to: '/doctor', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/doctor/create-referral', icon: FilePlus2, label: 'Create Referral' },
  { to: '/doctor/referrals', icon: FileText, label: 'My Referrals' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/profile', icon: User, label: 'Profile' },
];

export function DoctorDashboard() {
  const { referrals } = useApp();

  const active = referrals.filter((r) => r.status === 'active').length;
  const completed = referrals.filter((r) => r.status === 'completed').length;
  const pending = referrals.filter((r) => r.status === 'pending').length;

  return (
    <DashboardLayout
      sidebarTitle="Doctor Portal"
      links={links}
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LogoPlain size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-navy-800">{currentDoctor.name}</p>
              <p className="text-xs text-navy-500">{currentDoctor.specialty} · {currentDoctor.clinic}</p>
            </div>
          </div>
          <Link to="/doctor/create-referral" className="btn-primary">
            <Plus className="h-4 w-4" />
            New Referral
          </Link>
        </div>
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Dashboard</h1>
        <p className="text-sm text-navy-500 mt-1">Overview of your referrals and care pathways</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Clock} label="Active Referrals" value={active} color="navy" />
        <StatCard icon={CheckCircle2} label="Completed Referrals" value={completed} color="teal" />
        <StatCard icon={FileText} label="Pending Referrals" value={pending} color="amber" />
        <StatCard icon={GitBranch} label="Alternative Pathways" value={12} color="navy" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy-800">Recent Referrals</h3>
            <Link to="/doctor/referrals" className="text-xs text-teal-600 font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {referrals.slice(0, 4).map((ref) => (
              <div key={ref.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 hover:border-navy-200 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy-800">{ref.patientName}</span>
                    <StatusBadge status={ref.status} />
                  </div>
                  <div className="text-xs text-navy-500 mt-0.5">{ref.specification} · {ref.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-navy-400">Required by</div>
                  <div className="text-sm font-medium text-navy-700">{ref.requiredBy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <QuickAction icon={FilePlus2} label="Create New Referral" to="/doctor/create-referral" />
            <QuickAction icon={Users} label="View Patients" to="/doctor/patients" />
            <QuickAction icon={TrendingUp} label="View Referrals" to="/doctor/referrals" />
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-4 w-4 text-teal-600" />
              <span className="text-xs font-semibold text-navy-700">Clinician-Led</span>
            </div>
            <p className="text-xs text-navy-500">
              You define the required care. CareRoute never diagnoses or modifies your clinical recommendation.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: typeof Clock; label: string; value: number; color: 'navy' | 'teal' | 'amber';
}) {
  const colors = {
    navy: 'bg-navy-700',
    teal: 'bg-teal-500',
    amber: 'bg-amber-500',
  };
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className={`h-10 w-10 rounded-xl ${colors[color]} flex items-center justify-center`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-navy-800">{value}</div>
        <div className="text-xs text-navy-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-teal-50 text-teal-700',
    completed: 'bg-success-50 text-success-700',
    pending: 'bg-amber-50 text-amber-700',
    expired: 'bg-error-50 text-error-700',
  };
  return (
    <span className={`badge ${styles[status] ?? styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function QuickAction({ icon: Icon, label, to }: { icon: typeof FilePlus2; label: string; to: string }) {
  return (
    <Link to={to} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:border-teal-300 hover:bg-teal-50/30 transition-all group">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4.5 w-4.5 text-navy-600" />
        <span className="text-sm font-medium text-navy-700">{label}</span>
      </div>
      <ArrowRight className="h-4 w-4 text-navy-400 group-hover:text-teal-600 transition-colors" />
    </Link>
  );
}
