"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ActionButton } from "../shared/ActionButton";
import { Download, AlertCircle, FileCheck, RefreshCw, Plus, ChevronDown, ShieldCheck } from "lucide-react";

interface ReportHeaderProps {
  onExportSummary?: () => void;
  onReviewFailedJobs?: () => void;
  onBulkActions?: () => void;
  onReviewPendingExports?: () => void;
  onCreateOperation?: (type: string) => void;
  onRefresh?: () => void;
}

export function ReportHeader({
  onExportSummary,
  onReviewFailedJobs,
  onBulkActions,
  onReviewPendingExports,
  onCreateOperation,
  onRefresh,
}: ReportHeaderProps) {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  const createOptions = [
    { label: "Generate Logistics Report", type: "Report" },
    { label: "Schedule Recurring Report", type: "Scheduled Report" },
    { label: "Create Custom Report", type: "Custom Report" },
    { label: "Start Data Import", type: "Import" },
    { label: "Create Export Request", type: "Export" },
    { label: "Create Audit Evidence Package", type: "Audit" },
    { label: "Create Logistics Data Review", type: "Data Review" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
        <Link href="/admin/logistics" className="hover:text-rose-700 transition-colors">
          Logistics
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">Reports, Import, Export &amp; Audit</span>
      </div>

      {/* Title & Header Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-0.5">
        <div className="space-y-0.5">
          <h1 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            Logistics Reports, Import, Export &amp; Audit
          </h1>
          <p className="text-[11px] text-gray-600 font-normal leading-normal max-w-4xl">
            Manage governed logistics reports, validate logistics data exchange, control secure exports, preserve immutable audit evidence, and monitor retention and legal-hold compliance across the logistics network.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0 relative">
          <ActionButton
            label="Export Logistics Operations Summary"
            icon={<Download className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onExportSummary}
          />
          <ActionButton
            label="Review Failed Data Jobs"
            icon={<AlertCircle className="w-3 h-3 text-rose-600" />}
            variant="outline"
            size="xs"
            onClick={onReviewFailedJobs}
          />
          <ActionButton
            label="Bulk Actions"
            icon={<FileCheck className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onBulkActions}
          />
          <ActionButton
            label="Review Pending Export Approvals"
            icon={<ShieldCheck className="w-3 h-3 text-amber-600" />}
            variant="outline"
            size="xs"
            onClick={onReviewPendingExports}
          />

          {/* Primary Dropdown Button: + Create Logistics Operation */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCreateDropdown(!showCreateDropdown)}
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Logistics Operation</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {showCreateDropdown && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 text-xs divide-y divide-gray-100">
                {createOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setShowCreateDropdown(false);
                      onCreateOperation?.(opt.type);
                    }}
                    className="w-full text-left px-3 py-1.5 text-gray-700 hover:bg-rose-50 hover:text-rose-900 font-medium transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ActionButton
            label="Refresh"
            icon={<RefreshCw className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onRefresh}
          />
        </div>
      </div>
    </div>
  );
}
