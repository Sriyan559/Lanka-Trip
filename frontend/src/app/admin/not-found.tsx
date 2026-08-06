import Link from "next/link";
import { FileQuestion, LayoutDashboard, ArrowLeft } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white rounded-lg border border-slate-200 shadow-sm max-w-xl mx-auto my-12">
      <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
        <FileQuestion className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Record or Page Not Found</h2>
      <p className="text-sm text-slate-600 mb-6 max-w-md">
        The record ID or admin page you are looking for does not exist, has been removed, or is no longer available.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard Overview
        </Link>
      </div>
    </div>
  );
}
