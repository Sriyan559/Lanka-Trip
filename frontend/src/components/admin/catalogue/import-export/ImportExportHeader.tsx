"use client";

import React, { useState } from "react";
import { Download, Upload, Calendar, ChevronDown, CheckCircle2, RotateCcw, UserPlus, FileSpreadsheet, Archive } from "lucide-react";

interface ImportExportHeaderProps {
  selectedCount: number;
  onExportReport: () => void;
  onOpenNewImport: () => void;
  onOpenScheduleExport: () => void;
  onBulkAction: (action: string) => void;
  canExport: boolean;
  canImport: boolean;
  canSchedule: boolean;
  canManage: boolean;
}

export function ImportExportHeader({
  selectedCount,
  onExportReport,
  onOpenNewImport,
  onOpenScheduleExport,
  onBulkAction,
  canExport,
  canImport,
  canSchedule,
  canManage,
}: ImportExportHeaderProps) {
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const bulkOptions = [
    { label: "Assign Reviewer", icon: UserPlus, supported: false },
    { label: "Retry Failed Jobs", icon: RotateCcw, supported: true },
    { label: "Approve Selected Jobs", icon: CheckCircle2, supported: false },
    { label: "Export Selected Details", icon: FileSpreadsheet, supported: false },
    { label: "Archive Completed Jobs", icon: Archive, supported: false },
  ];

  return (
    <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-ink font-bold">Import & Export</span>
          </div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Catalogue Import & Export</h1>
          <p className="text-[13px] text-muted mt-1 max-w-3xl leading-relaxed">
            Manage bulk catalogue data operations, mapping profiles, validation workflows, export schedules, reconciliation and audit-ready data exchange across the beauty marketplace.
          </p>
        </div>

        {/* Top-Right Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={onExportReport}
            disabled={!canExport}
            className="h-9 px-3.5 rounded-md bg-white border border-line text-[12px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-40"
          >
            <Download size={14} className="text-slate-600" />
            <span>Export Data Operations Report</span>
          </button>

          <button
            onClick={onOpenNewImport}
            disabled={!canImport}
            className="h-9 px-4 rounded-md bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-40"
          >
            <Upload size={14} />
            <span>+ New Import</span>
          </button>

          <button
            onClick={onOpenScheduleExport}
            disabled={!canSchedule}
            className="h-9 px-3.5 rounded-md bg-white border border-line text-[12px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-40"
          >
            <Calendar size={14} className="text-slate-600" />
            <span>Schedule Export</span>
          </button>

          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsBulkOpen((prev) => !prev)}
              disabled={selectedCount === 0 || !canManage}
              className={`h-9 px-3.5 rounded-md border text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                selectedCount > 0
                  ? "bg-white border-line text-ink hover:bg-slate-50 cursor-pointer"
                  : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>Bulk Actions {selectedCount > 0 ? `(${selectedCount})` : ""}</span>
              <ChevronDown size={13} />
            </button>

            {isBulkOpen && selectedCount > 0 && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-xl border border-line py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {bulkOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      disabled={!opt.supported}
                      title={opt.supported ? undefined : "Unavailable — no authoritative backend transition exists."}
                      onClick={() => {
                        onBulkAction(opt.label);
                        setIsBulkOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-[12px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Icon size={14} className="text-slate-500" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
