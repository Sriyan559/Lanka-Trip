"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white rounded-lg border border-slate-200 shadow-sm max-w-xl mx-auto my-12">
      <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-sm text-slate-600 mb-4">
        An unexpected error occurred while loading this section of the admin panel.
      </p>
      {error?.message && (
        <div className="w-full p-3 mb-6 bg-slate-50 border border-slate-200 rounded text-left text-xs font-mono text-slate-700 overflow-x-auto">
          {error.message}
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
