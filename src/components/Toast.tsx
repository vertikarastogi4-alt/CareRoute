import { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, Info, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

let toastCallback: ((toast: Omit<Toast, 'id'>) => void) | null = null;

export function showToast(type: ToastType, message: string) {
  toastCallback?.({ type, message });
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
};

const styles = {
  success: 'bg-success-50 border-success-500/30 text-success-700',
  error: 'bg-error-50 border-error-500/30 text-error-700',
  info: 'bg-navy-50 border-navy-300/30 text-navy-700',
  warning: 'bg-warning-50 border-warning-500/30 text-warning-600',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    toastCallback = (toast) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => remove(id), 4000);
    };
    return () => {
      toastCallback = null;
    };
  }, [remove]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-card-hover animate-slide-up ${styles[toast.type]}`}
          >
            <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button onClick={() => remove(toast.id)} className="flex-shrink-0 opacity-60 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
