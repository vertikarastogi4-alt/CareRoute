import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionTo, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-navy-50 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-navy-400" />
      </div>
      <h3 className="text-lg font-semibold text-navy-800 mb-1.5">{title}</h3>
      <p className="text-sm text-navy-500 max-w-sm mb-5">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button onClick={onAction} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
