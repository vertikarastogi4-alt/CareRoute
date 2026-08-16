import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, TrendingUp, MapPin, Activity,
  CheckCircle2, AlertTriangle, Clock, ArrowRight,
  Building2, GitBranch, ShieldCheck,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  FunnelChart, Funnel, LabelList,
  AreaChart, Area,
} from 'recharts';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LogoPlain } from '@/components/Logo';
import {
  dashboardStats, demandByService, demandByRegion,
  facilityCoverage, unmetByService, referralFunnel,
} from '@/data/mockData';

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
  { to: '/admin/coverage', icon: MapPin, label: 'Coverage Gaps' },
];

export function AdminDashboardPage() {
  return (
    <DashboardLayout
      sidebarTitle="Public Health Dashboard"
      links={links}
      header={
        <div className="flex items-center justify-between">
          <LogoPlain size="sm" />
          <span className="badge bg-navy-50 text-navy-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Anonymized Data
          </span>
        </div>
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Public Health Dashboard</h1>
        <p className="text-sm text-navy-500 mt-1">
          Aggregated, anonymized healthcare access insights across the CareRoute network
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Users} label="Total Referrals" value={dashboardStats.totalReferrals.toLocaleString()} color="navy" />
        <StatCard icon={CheckCircle2} label="Completed" value={dashboardStats.completedReferrals.toLocaleString()} color="teal" />
        <StatCard icon={AlertTriangle} label="Unmet Requests" value={dashboardStats.unmetRequests.toString()} color="amber" />
        <StatCard icon={MapPin} label="Avg Travel Distance" value={`${dashboardStats.averageTravelDistance} km`} color="navy" />
        <StatCard icon={TrendingUp} label="Avg Feasibility" value={`${dashboardStats.averageFeasibilityScore}%`} color="teal" />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Demand by Service */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-4">Healthcare Demand by Service</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={demandByService}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="service" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#25a598" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Demand by Region */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-4">Demand by Geographic Region</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={demandByRegion} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="region" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={110} />
              <Tooltip
                contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#1e3a6b" radius={[0, 6, 6, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Facility Coverage */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-4">Facility Coverage</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={facilityCoverage} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                {facilityCoverage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => <span style={{ fontSize: '11px', color: '#64748b' }}>{value}</span>}
              />
              <Tooltip contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Unmet Requirements */}
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-4">Unmet Healthcare Requirements</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={unmetByService}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="service" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="unmet" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={28} name="Unmet" />
              <Bar dataKey="total" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={28} name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Referral Funnel */}
      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-navy-800 mb-4">Referral Completion Funnel</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={referralFunnel} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="stage" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={160} />
            <Tooltip
              contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
              cursor={{ fill: '#f1f5f9' }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
              {referralFunnel.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#1e3a6b' : index === referralFunnel.length - 1 ? '#25a598' : '#4a6fa8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Map Placeholder */}
      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-navy-800 mb-4">Healthcare Access Gaps — Geographic View</h3>
        <div className="relative h-72 rounded-xl bg-navy-50 border border-navy-100 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(37,165,152,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.15),transparent_40%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-navy-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-navy-600">Map Placeholder</p>
              <p className="text-xs text-navy-400 mt-1">Healthcare access gap visualization (demo)</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="badge bg-teal-100 text-teal-700">
              <CheckCircle2 className="h-3 w-3" /> Well-covered areas
            </span>
            <span className="badge bg-amber-100 text-amber-700">
              <AlertTriangle className="h-3 w-3" /> Under-served areas
            </span>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="rounded-xl bg-navy-50 border border-navy-100 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-navy-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-navy-700">Anonymized & Aggregated Data</p>
          <p className="text-xs text-navy-500 mt-0.5">
            This dashboard uses only anonymized, aggregated information. No personally identifiable patient information is displayed.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: typeof Users; label: string; value: string; color: 'navy' | 'teal' | 'amber';
}) {
  const colors = { navy: 'bg-navy-700', teal: 'bg-teal-500', amber: 'bg-amber-500' };
  return (
    <div className="card p-4">
      <div className={`h-9 w-9 rounded-lg ${colors[color]} flex items-center justify-center mb-2`}>
        <Icon className="h-4.5 w-4.5 text-white" />
      </div>
      <div className="text-xl font-bold text-navy-800">{value}</div>
      <div className="text-xs text-navy-500 mt-0.5">{label}</div>
    </div>
  );
}
