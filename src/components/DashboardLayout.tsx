import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}

export function SidebarLink({ to, icon: Icon, label, badge }: SidebarLinkProps) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active
          ? 'bg-navy-700 text-white shadow-soft'
          : 'text-navy-600 hover:bg-navy-50 hover:text-navy-800'
      }`}
    >
      <Icon className="h-4.5 w-4.5 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`badge px-2 py-0.5 text-xs ${active ? 'bg-teal-500 text-white' : 'bg-navy-100 text-navy-600'}`}>
          {badge}
        </span>
      )}
    </Link>
  );
}

interface DashboardLayoutProps {
  sidebarTitle: string;
  links: SidebarLinkProps[];
  children: React.ReactNode;
  header?: React.ReactNode;
}

export function DashboardLayout({ sidebarTitle, links, children, header }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-navy-800">{sidebarTitle}</h2>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <Link to="/" className="flex items-center gap-2 text-sm text-navy-500 hover:text-navy-700">
            ← Back to Home
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {header && <div className="border-b border-slate-200 bg-white px-6 py-4">{header}</div>}
        <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
