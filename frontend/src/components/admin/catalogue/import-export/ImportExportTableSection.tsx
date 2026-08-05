"use client";

import React from "react";
import { Search, Filter, MoreHorizontal, Download, FileText, Play, RotateCcw, AlertCircle } from "lucide-react";
import { SharedDataTable } from "../shared/SharedDataTable";

export function ImportExportTableSection() {
  const jobs = [
    {
      id: "JOB-2026-0891",
      type: "Import",
      entity: "Products",
      source: "ERP PIM Feed",
      status: "Running",
      records: "1,245 / 5,000",
      startedAt: "10:24 AM",
      duration: "02m 14s",
      user: "System",
    },
    {
      id: "JOB-2026-0890",
      type: "Export",
      entity: "Inventory",
      source: "Manual Export",
      status: "Completed",
      records: "48,290",
      startedAt: "09:15 AM",
      duration: "00m 45s",
      user: "Sarah Jenkins",
    },
    {
      id: "JOB-2026-0889",
      type: "Import",
      entity: "Prices",
      source: "Supplier X Feed",
      status: "Failed",
      records: "0 / 250",
      startedAt: "08:30 AM",
      duration: "00m 02s",
      user: "System",
      error: "Invalid CSV Format",
    },
    {
      id: "JOB-2026-0888",
      type: "Import",
      entity: "Products",
      source: "Manual Import",
      status: "Completed with Warnings",
      records: "820 (14 skipped)",
      startedAt: "Yesterday",
      duration: "01m 20s",
      user: "Michael Scott",
    },
    {
      id: "JOB-2026-0887",
      type: "Export",
      entity: "Media",
      source: "Manual Export",
      status: "Completed",
      records: "1,450",
      startedAt: "Yesterday",
      duration: "03m 15s",
      user: "Sarah Jenkins",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Running":
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-100"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>Running</span>;
      case "Completed":
        return <span className="inline-flex px-2 py-1 bg-green-50 text-[#059669] text-[10px] font-bold rounded border border-green-100">Completed</span>;
      case "Failed":
        return <span className="inline-flex px-2 py-1 bg-red-50 text-[#dc2626] text-[10px] font-bold rounded border border-red-100">Failed</span>;
      case "Completed with Warnings":
        return <span className="inline-flex px-2 py-1 bg-orange-50 text-[#ea580c] text-[10px] font-bold rounded border border-orange-100">With Warnings</span>;
      default:
        return <span className="inline-flex px-2 py-1 bg-gray-50 text-gray-700 text-[10px] font-bold rounded border border-gray-200">{status}</span>;
    }
  };

  const getJobIcon = (type: string) => {
    if (type === "Import") {
      return <div className="w-6 h-6 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600"><Download size={12} strokeWidth={2.5} /></div>;
    }
    return <div className="w-6 h-6 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600"><FileText size={12} strokeWidth={2.5} /></div>;
  };

  return (
    <div className="h-full">
      <SharedDataTable 
        tabs={[]}
        searchPlaceholder="Search jobs by ID, user, or entity..."
        filters={["Entity", "Status"]}
        itemCountLabel="124 jobs"
      >
        <table className="w-full text-left border-collapse text-[12px]">
          <thead className="bg-canvas shadow-sm border-b border-line">
            <tr>
              <th className="px-4 py-3 font-bold text-muted uppercase tracking-wider text-[10px]">Job Details</th>
              <th className="px-4 py-3 font-bold text-muted uppercase tracking-wider text-[10px]">Entity & Source</th>
              <th className="px-4 py-3 font-bold text-muted uppercase tracking-wider text-[10px]">Status & Progress</th>
              <th className="px-4 py-3 font-bold text-muted uppercase tracking-wider text-[10px]">Timing</th>
              <th className="px-4 py-3 font-bold text-muted uppercase tracking-wider text-[10px]">User</th>
              <th className="px-4 py-3 font-bold text-muted uppercase tracking-wider text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {jobs.map((job, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {getJobIcon(job.type)}
                    <div>
                      <div className="font-bold text-ink">{job.id}</div>
                      <div className="text-[11px] font-semibold text-muted mt-0.5">{job.type} Job</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-ink">{job.entity}</div>
                  <div className="text-[11px] font-medium text-muted mt-0.5">{job.source}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5 items-start">
                    {getStatusBadge(job.status)}
                    <div className="text-[11px] font-medium text-ink flex items-center gap-1">
                      {job.status === "Running" && (
                        <div className="w-16 h-1.5 bg-line rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 rounded-full w-1/4"></div>
                        </div>
                      )}
                      {job.records}
                    </div>
                    {job.error && (
                      <div className="text-[10px] font-semibold text-[#dc2626] flex items-center gap-1">
                        <AlertCircle size={10} /> {job.error}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-ink">{job.startedAt}</div>
                  <div className="text-[11px] text-muted mt-0.5">{job.duration}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-ink">{job.user}</div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 text-muted hover:text-ink hover:bg-line rounded transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SharedDataTable>
    </div>
  );
}
