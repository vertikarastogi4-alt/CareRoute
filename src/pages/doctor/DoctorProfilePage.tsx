import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FilePlus2, FileText, Users, User,
  Mail, Phone, Stethoscope, Building2, ShieldCheck,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LogoPlain } from '@/components/Logo';
import { currentDoctor } from '@/data/mockData';

const links = [
  { to: '/doctor', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/doctor/create-referral', icon: FilePlus2, label: 'Create Referral' },
  { to: '/doctor/referrals', icon: FileText, label: 'My Referrals' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/profile', icon: User, label: 'Profile' },
];

export function DoctorProfilePage() {
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
        <h1 className="text-2xl font-bold text-navy-800">Profile</h1>
        <p className="text-sm text-navy-500 mt-1">Your professional information</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="h-24 w-24 rounded-full bg-navy-100 mx-auto flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-navy-500" />
          </div>
          <h2 className="text-lg font-semibold text-navy-800">{currentDoctor.name}</h2>
          <p className="text-sm text-navy-500">{currentDoctor.specialty}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 badge bg-teal-50 text-teal-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Doctor
          </div>
        </div>

        <div className="lg:col-span-2 card p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-4">Professional Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoItem icon={Stethoscope} label="Specialty" value={currentDoctor.specialty} />
            <InfoItem icon={Building2} label="Clinic" value={currentDoctor.clinic} />
            <InfoItem icon={Mail} label="Email" value={currentDoctor.email} />
            <InfoItem icon={Phone} label="Phone" value={currentDoctor.phone} />
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-navy-800 mb-3">Doctor ID</h4>
            <code className="text-sm text-navy-600 bg-slate-50 rounded-lg px-3 py-2 block">{currentDoctor.id}</code>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3.5">
      <div className="flex items-center gap-2 text-xs text-navy-400 mb-1">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="text-sm font-medium text-navy-800">{value}</div>
    </div>
  );
}
