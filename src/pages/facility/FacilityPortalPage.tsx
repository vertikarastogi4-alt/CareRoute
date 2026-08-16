import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Activity, Wallet, Clock,
  ShieldCheck, FileText, CheckCircle2, Clock as ClockIcon,
  AlertCircle, Save, Star, MapPin, Phone, Mail,
  Accessibility, Calendar,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LogoPlain } from '@/components/Logo';
import { facilities } from '@/data/mockData';
import { showToast } from '@/components/Toast';

const links = [
  { to: '/facility', icon: LayoutDashboard, label: 'Overview' },
  { to: '/facility/profile', icon: Building2, label: 'Facility Profile' },
  { to: '/facility/services', icon: Activity, label: 'Services' },
  { to: '/facility/pricing', icon: Wallet, label: 'Pricing' },
  { to: '/facility/availability', icon: Clock, label: 'Availability' },
  { to: '/facility/verification', icon: ShieldCheck, label: 'Verification' },
  { to: '/facility/referrals', icon: FileText, label: 'Referrals' },
];

const facility = facilities[0];

export function FacilityPortalPage() {
  return (
    <DashboardLayout
      sidebarTitle="Facility Portal"
      links={links}
      header={
        <div className="flex items-center justify-between">
          <LogoPlain size="sm" />
          <div className="flex items-center gap-2">
            <span className="badge bg-teal-50 text-teal-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              {facility.verificationStatus}
            </span>
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Overview</h1>
        <p className="text-sm text-navy-500 mt-1">{facility.name} · {facility.location}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={CheckCircle2} label="Profile Status" value="85%" sub="Complete" color="teal" />
        <StatCard icon={Activity} label="Verified Services" value="4" sub="of 6 services" color="navy" />
        <StatCard icon={AlertCircle} label="Pending Updates" value="2" sub="Need attention" color="amber" />
        <StatCard icon={FileText} label="Referrals Received" value="47" sub="This month" color="navy" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-4">Services & Verification Status</h3>
          <div className="space-y-3">
            {facility.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${service.available ? 'bg-teal-50' : 'bg-slate-100'}`}>
                    <Activity className={`h-4.5 w-4.5 ${service.available ? 'text-teal-600' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy-800">{service.name}</div>
                    {service.specifications && service.specifications.length > 0 && (
                      <div className="text-xs text-navy-400">{service.specifications.join(', ')}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {service.available ? (
                    <span className="badge bg-teal-50 text-teal-700">
                      <CheckCircle2 className="h-3 w-3" /> Available
                    </span>
                  ) : (
                    <span className="badge bg-slate-100 text-slate-500">Unavailable</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-navy-800 mb-3">Verification</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Status</span>
                <span className="badge bg-teal-50 text-teal-700">{facility.verificationStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Last Verified</span>
                <span className="font-medium text-navy-700">{facility.lastVerified}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Rating</span>
                <span className="flex items-center gap-1 font-medium text-navy-700">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  {facility.rating}
                </span>
              </div>
            </div>
            <button className="w-full btn-secondary mt-4 text-sm">
              <ShieldCheck className="h-4 w-4" />
              Request Re-verification
            </button>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-navy-800 mb-3">Quick Info</h3>
            <div className="space-y-2 text-xs text-navy-600">
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-navy-400" />{facility.location}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-navy-400" />{facility.contact.phone}</div>
              <div className="flex items-center gap-2"><ClockIcon className="h-3.5 w-3.5 text-navy-400" />{facility.operatingHours.days} · {facility.operatingHours.time}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function FacilityProfilePage() {
  const [form, setForm] = useState({
    name: facility.name,
    location: facility.location,
    phone: facility.contact.phone,
    email: facility.contact.email,
    hours: facility.operatingHours.time,
    days: facility.operatingHours.days,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Facility profile updated successfully');
  };

  return (
    <DashboardLayout
      sidebarTitle="Facility Portal"
      links={links}
      header={<div className="flex items-center justify-between"><LogoPlain size="sm" /><Link to="/facility" className="btn-ghost">← Overview</Link></div>}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Facility Profile</h1>
        <p className="text-sm text-navy-500 mt-1">Update your facility information</p>
      </div>

      <form onSubmit={handleSave} className="card p-6 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label-field">Facility Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Location</label>
            <input className="input-field" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Phone</label>
            <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Operating Days</label>
            <input className="input-field" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Operating Hours</label>
            <input className="input-field" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-navy-400">
          <ClockIcon className="h-3.5 w-3.5" />
          Last updated: 2 days ago
        </div>
        <button type="submit" className="btn-primary mt-5">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </form>
    </DashboardLayout>
  );
}

export function FacilityServicesPage() {
  return (
    <DashboardLayout
      sidebarTitle="Facility Portal"
      links={links}
      header={<div className="flex items-center justify-between"><LogoPlain size="sm" /><Link to="/facility" className="btn-ghost">← Overview</Link></div>}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Services</h1>
        <p className="text-sm text-navy-500 mt-1">Manage your service availability</p>
      </div>

      <div className="card p-6">
        <div className="space-y-3">
          {facility.services.map((service) => (
            <div key={service.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <div className="text-sm font-semibold text-navy-800">{service.name}</div>
                {service.specifications && (
                  <div className="text-xs text-navy-400 mt-0.5">{service.specifications.join(', ')}</div>
                )}
                <div className="text-xs text-navy-400 mt-1">Last updated: 2 days ago</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={service.available} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              </label>
            </div>
          ))}
        </div>
        <button onClick={() => showToast('success', 'Service availability updated')} className="btn-primary mt-5">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}

export function FacilityPricingPage() {
  return (
    <DashboardLayout
      sidebarTitle="Facility Portal"
      links={links}
      header={<div className="flex items-center justify-between"><LogoPlain size="sm" /><Link to="/facility" className="btn-ghost">← Overview</Link></div>}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Pricing</h1>
        <p className="text-sm text-navy-500 mt-1">Update your indicative pricing</p>
      </div>

      <div className="card p-6">
        <div className="space-y-3">
          {Object.entries(facility.pricing).map(([service, price]) => (
            <div key={service} className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <div className="flex-1 text-sm font-semibold text-navy-800">{service}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-navy-400">₹</span>
                <input type="number" defaultValue={price} className="input-field w-28" />
              </div>
              <span className="text-xs text-navy-400 whitespace-nowrap">Last updated: 3 days ago</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">Pricing is indicative. Final cost is confirmed with the patient at the facility.</p>
        </div>
        <button onClick={() => showToast('success', 'Pricing updated')} className="btn-primary mt-5">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}

export function FacilityAvailabilityPage() {
  return (
    <DashboardLayout
      sidebarTitle="Facility Portal"
      links={links}
      header={<div className="flex items-center justify-between"><LogoPlain size="sm" /><Link to="/facility" className="btn-ghost">← Overview</Link></div>}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Availability</h1>
        <p className="text-sm text-navy-500 mt-1">Update your slot availability</p>
      </div>

      <div className="card p-6">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="label-field">Next Available Slot</label>
            <input className="input-field" defaultValue={facility.availability.nextSlot} />
          </div>
          <div>
            <label className="label-field">Days Until Next Slot</label>
            <input type="number" className="input-field" defaultValue={facility.availability.daysUntilSlot} />
          </div>
        </div>
        <div className="text-xs text-navy-400 mb-4 flex items-center gap-1.5">
          <ClockIcon className="h-3.5 w-3.5" />
          Last updated: 1 day ago
        </div>
        <button onClick={() => showToast('success', 'Availability updated')} className="btn-primary">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}

export function FacilityVerificationPage() {
  return (
    <DashboardLayout
      sidebarTitle="Facility Portal"
      links={links}
      header={<div className="flex items-center justify-between"><LogoPlain size="sm" /><Link to="/facility" className="btn-ghost">← Overview</Link></div>}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Verification</h1>
        <p className="text-sm text-navy-500 mt-1">Your facility verification status</p>
      </div>

      <div className="card p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
          <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <div className="text-lg font-semibold text-navy-800">{facility.verificationStatus}</div>
            <div className="text-xs text-navy-500">Last verified: {facility.lastVerified}</div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Facility License', status: 'Verified', date: 'Verified 2 days ago' },
            { label: 'Service Catalog', status: 'Verified', date: 'Verified 2 days ago' },
            { label: 'Pricing Information', status: 'Pending', date: 'Update submitted 3 days ago' },
            { label: 'Accessibility Info', status: 'Verified', date: 'Verified 1 week ago' },
            { label: 'Contact Information', status: 'Verified', date: 'Verified 2 days ago' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5">
              <div>
                <div className="text-sm font-medium text-navy-800">{item.label}</div>
                <div className="text-xs text-navy-400">{item.date}</div>
              </div>
              <span className={`badge ${item.status === 'Verified' ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'}`}>
                {item.status === 'Verified' ? <CheckCircle2 className="h-3 w-3" /> : <ClockIcon className="h-3 w-3" />}
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <button onClick={() => showToast('info', 'Re-verification request submitted')} className="btn-secondary mt-5">
          <ShieldCheck className="h-4 w-4" />
          Request Full Re-verification
        </button>
      </div>
    </DashboardLayout>
  );
}

export function FacilityReferralsPage() {
  const mockReferrals = [
    { id: 'REF-001', patient: 'Rahul S.', service: 'MRI Brain', date: '2026-08-15', status: 'New' },
    { id: 'REF-002', patient: 'Priya K.', service: 'CT Head', date: '2026-08-14', status: 'Contacted' },
    { id: 'REF-003', patient: 'Amit M.', service: 'X-Ray Chest', date: '2026-08-13', status: 'Completed' },
    { id: 'REF-004', patient: 'Sneha R.', service: 'MRI Spine', date: '2026-08-12', status: 'New' },
  ];

  return (
    <DashboardLayout
      sidebarTitle="Facility Portal"
      links={links}
      header={<div className="flex items-center justify-between"><LogoPlain size="sm" /><Link to="/facility" className="btn-ghost">← Overview</Link></div>}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Referrals Received</h1>
        <p className="text-sm text-navy-500 mt-1">Referrals from doctors for your facility</p>
      </div>

      <div className="card p-6">
        <div className="space-y-3">
          {mockReferrals.map((ref) => (
            <div key={ref.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-navy-50 flex items-center justify-center">
                  <FileText className="h-4.5 w-4.5 text-navy-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy-800">{ref.patient}</div>
                  <div className="text-xs text-navy-400">{ref.service} · {ref.id}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-navy-400">{ref.date}</span>
                <span className={`badge ${ref.status === 'New' ? 'bg-teal-50 text-teal-700' : ref.status === 'Completed' ? 'bg-success-50 text-success-700' : 'bg-amber-50 text-amber-700'}`}>
                  {ref.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: typeof CheckCircle2; label: string; value: string; sub: string; color: 'navy' | 'teal' | 'amber';
}) {
  const colors = { navy: 'bg-navy-700', teal: 'bg-teal-500', amber: 'bg-amber-500' };
  return (
    <div className="card p-5">
      <div className={`h-10 w-10 rounded-xl ${colors[color]} flex items-center justify-center mb-3`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-navy-800">{value}</div>
      <div className="text-xs text-navy-500 mt-0.5">{label}</div>
      <div className="text-xs text-navy-400 mt-0.5">{sub}</div>
    </div>
  );
}
