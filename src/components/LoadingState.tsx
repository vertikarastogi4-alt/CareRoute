import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
      <p className="mt-3 text-sm text-navy-500">{message}</p>
    </div>
  );
}

export function FullPageLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-teal-500 animate-spin" />
      <p className="mt-4 text-sm text-navy-500">Loading...</p>
    </div>
  );
}
