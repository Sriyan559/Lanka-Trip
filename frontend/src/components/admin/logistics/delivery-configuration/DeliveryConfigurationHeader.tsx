"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  ShieldCheck,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface DeliveryConfigurationHeaderProps {
  onExport?: () => void;
  onReviewConflicts?: () => void;
  onReviewCapacityRisks?: () => void;
  onCreateReview?: () => void;
  onCreateRule?: () => void;
}

export function DeliveryConfigurationHeader({
  onExport,
  onReviewConflicts,
  onReviewCapacityRisks,
  onCreateReview,
  onCreateRule,
}: DeliveryConfigurationHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="space-y-2 mb-2">
      {/* Top Toolbar: Breadcrumb + Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <Link
            href="/admin/logistics"
            className="hover:text-rose-700 transition-colors"
          >
            Logistics
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-gray-900">Delivery Configuration</span>
        </nav>

        {/* Primary Page Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <ActionButton
            label="Export Delivery Configuration Report"
            icon={<Download className="w-3.5 h-3.5" />}
            variant="outline"
            size="sm"
            onClick={onExport}
          />

          <button
            type="button"
            onClick={onReviewConflicts}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Review Configuration Conflicts</span>
            <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
              8
            </span>
          </button>

          <div className="relative">
            <ActionButton
              label="Bulk Actions"
              icon={<MoreVertical className="w-3.5 h-3.5" />}
              variant="outline"
              size="sm"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1 text-xs">
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Bulk rule activation triggered.");
                  }}
                >
                  Bulk Activate Rules
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Bulk rate recalculation active.");
                  }}
                >
                  Bulk Recalculate Rates
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Exporting configuration matrix CSV...");
                  }}
                >
                  Export All Config Matrix CSV
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onReviewCapacityRisks}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Review Capacity Risks</span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
              12
            </span>
          </button>

          <ActionButton
            label="Create Configuration Review"
            icon={<FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />}
            variant="outline"
            size="sm"
            onClick={onCreateReview}
          />

          <ActionButton
            label="+ Create Delivery Rule"
            icon={<Plus className="w-3.5 h-3.5" />}
            variant="primary"
            size="sm"
            onClick={onCreateRule}
          />
        </div>
      </div>

      {/* Header Title & Subtitle */}
      <div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>Delivery Zones, Rates, Capacity &amp; SLA</span>
        </h1>
        <p className="text-xs text-gray-500 font-normal leading-tight">
          Configure delivery coverage, carrier eligibility, service levels, route rules, rates, capacity, cut-offs and delivery promises across the logistics network.
        </p>
      </div>
    </div>
  );
}
