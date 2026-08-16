import { ShieldCheck, Lock, FileCheck } from 'lucide-react';

export function TrustBadge({ variant = 'row' }: { variant?: 'row' | 'compact' }) {
  const items = [
    { icon: ShieldCheck, label: 'Privacy-first' },
    { icon: Lock, label: 'Data minimization' },
    { icon: FileCheck, label: 'Verified facility info' },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        {items.map((item) => (
          <span key={item.label} className="badge bg-teal-50 text-teal-700">
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <span key={item.label} className="badge bg-teal-50 text-teal-700 border border-teal-100">
          <item.icon className="h-3.5 w-3.5" />
          {item.label}
        </span>
      ))}
    </div>
  );
}
