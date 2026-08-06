"use client";

import React, { useState } from "react";
import {
  Download,
  Play,
  Layers,
  Plus,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  Trash2,
  Archive,
} from "lucide-react";

interface CatalogueQualityHeaderProps {
  selectedCount: number;
  onExportReport: () => void;
  onRunValidation: () => void;
  onOpenCreateCase: () => void;
  onBulkAction: (action: string) => void;
}

export function CatalogueQualityHeader({
  selectedCount,
  onExportReport,
  onRunValidation,
  onOpenCreateCase,
  onBulkAction,
}: CatalogueQualityHeaderProps) {
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const bulkOptions = [
    "Assign owner",
    "Change severity",
    "Change status",
    "Request remediation",
    "Resolve selected",
    "Escalate selected",
    "Merge duplicate candidates",
    "Export selected",
    "Archive resolved cases",
  ];

  return (
    <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-3">
      {/* Top Breadcrumb & Actions Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-ink font-bold">Catalogue Quality</span>
          </div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">
            Catalogue Quality & Duplicate Resolution
          </h1>
          <p className="text-[13px] text-muted mt-1 max-w-3xl leading-relaxed">
            Monitor catalogue quality, resolve duplicate records, manage incomplete data, validate publication readiness and control audit-ready remediation across the beauty marketplace.
          </p>
        </div>

        {/* Top-Right Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Export Quality Report */}
          <button
            onClick={onExportReport}
            className="h-9 px-3.5 rounded-md bg-white border border-line text-[12px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download size={14} className="text-slate-600" />
            <span>Export Quality Report</span>
          </button>

          {/* Run Validation */}
          <button
            onClick={onRunValidation}
            className="h-9 px-3.5 rounded-md bg-white border border-line text-[12px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Play size={14} className="text-emerald-600 fill-emerald-600" />
            <span>Run Validation</span>
          </button>

          {/* Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => selectedCount > 0 && setIsBulkOpen((prev) => !prev)}
              disabled={selectedCount === 0}
              className={`h-9 px-3.5 rounded-md border text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm ${
                selectedCount > 0
                  ? "bg-white border-line text-ink hover:bg-slate-50 cursor-pointer"
                  : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Layers size={14} />
              <span>Bulk Actions ({selectedCount})</span>
              <ChevronDown size={14} />
            </button>

            {isBulkOpen && selectedCount > 0 && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-md border border-line shadow-lg z-30 py-1 text-[12px]">
                {bulkOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      onBulkAction(opt);
                      setIsBulkOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* + Create Quality Case (Dark Burgundy Primary) */}
          <button
            onClick={onOpenCreateCase}
            className="h-9 px-4 rounded-md bg-[#671021] text-white text-[12px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus size={15} />
            <span>+ Create Quality Case</span>
          </button>
        </div>
      </div>
    </div>
  );
}
