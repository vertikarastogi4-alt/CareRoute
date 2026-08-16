import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FilePlus2, FileText, Users, User,
  Search, Calendar, ArrowRight, FileX,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LogoPlain } from '@/components/Logo';
import { useApp } from '@/context/AppContext';
import { EmptyState } from '@/components/EmptyState';
import { useState } from 'react';

const links = [
  { to: '/doctor', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/doctor/create-referral', icon: FilePlus2, label: 'Create Referral' },
  { to: '/doctor/referrals', icon: FileText, label: 'My Referrals' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/profile', icon: User, label: 'Profile' },
];

export function ReferralsListPage() {
  const { referrals, setActiveReferral } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'pending'>('all');

  const filtered = referrals.filter((r) => {
    const matchesSearch = r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.specification.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout
      sidebarTitle="Doctor Portal"
      links={links}
      header={
        <div className="flex items-center justify-between">
          <LogoPlain size="sm" />
          <Link to="/doctor/create-referral" className="btn-primary">
            <FilePlus2 className="h-4 w-4" />
            New Referral
          </Link>
        </div>
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">My Referrals</h1>
        <p className="text-sm text-navy-500 mt-1">All referrals you've created</p>
      </div>

      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
            <input
              className="input-field pl-10"
              placeholder="Search by patient name, ID, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'pending', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f ? 'bg-navy-700 text-white' : 'bg-slate-100 text-navy-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileX}
          title="No referrals found"
          description="Try adjusting your search or create a new referral."
          actionLabel="Create Referral"
          actionTo="/doctor/create-referral"
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((ref) => (
            <div key={ref.id} className="card-hover p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-navy-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-navy-800">{ref.patientName}</span>
                      <StatusBadge status={ref.status} />
                    </div>
                    <div className="text-xs text-navy-500 mt-0.5">
                      {ref.specification} · {ref.id}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-navy-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Required by {ref.requiredBy}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/patient"
                  onClick={() => setActiveReferral(ref)}
                  className="btn-secondary text-sm flex-shrink-0"
                >
                  View
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
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
