import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FilePlus2, FileText, Users, User,
  ArrowRight, UserX,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LogoPlain } from '@/components/Logo';
import { useApp } from '@/context/AppContext';
import { EmptyState } from '@/components/EmptyState';

const links = [
  { to: '/doctor', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/doctor/create-referral', icon: FilePlus2, label: 'Create Referral' },
  { to: '/doctor/referrals', icon: FileText, label: 'My Referrals' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/profile', icon: User, label: 'Profile' },
];

export function PatientsPage() {
  const { referrals } = useApp();

  const patients = Array.from(
    new Map(referrals.map((r) => [r.patientId, { name: r.patientName, id: r.patientId, count: referrals.filter((x) => x.patientId === r.patientId).length }])).values()
  );

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
        <h1 className="text-2xl font-bold text-navy-800">Patients</h1>
        <p className="text-sm text-navy-500 mt-1">Patients with active or past referrals</p>
      </div>

      {patients.length === 0 ? (
        <EmptyState
          icon={UserX}
          title="No patients yet"
          description="Create a referral to see your patients here."
          actionLabel="Create Referral"
          actionTo="/doctor/create-referral"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((p) => (
            <div key={p.id} className="card-hover p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-navy-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-800">{p.name}</div>
                  <div className="text-xs text-navy-400">{p.id}</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs text-navy-500">{p.count} referral{p.count > 1 ? 's' : ''}</span>
                <Link to="/doctor/referrals" className="text-xs text-teal-600 font-medium hover:underline flex items-center gap-1">
                  View referrals <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
