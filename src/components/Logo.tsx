import { Link, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 'h-7 w-7', text: 'text-lg' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl' },
  };
  const s = sizes[size];

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`${s.icon} rounded-xl bg-navy-700 flex items-center justify-center shadow-soft transition-transform group-hover:scale-105`}>
        <Activity className="h-1/2 w-1/2 text-teal-400" strokeWidth={2.5} />
      </div>
      <span className={`${s.text} font-display font-bold text-navy-800`}>
        Care<span className="text-teal-500">Route</span>
      </span>
    </Link>
  );
}

export function LogoPlain({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 'h-7 w-7', text: 'text-lg' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl' },
  };
  const s = sizes[size];
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')} className="flex items-center gap-2.5 group">
      <div className={`${s.icon} rounded-xl bg-navy-700 flex items-center justify-center shadow-soft transition-transform group-hover:scale-105`}>
        <Activity className="h-1/2 w-1/2 text-teal-400" strokeWidth={2.5} />
      </div>
      <span className={`${s.text} font-display font-bold text-navy-800`}>
        Care<span className="text-teal-500">Route</span>
      </span>
    </button>
  );
}
