"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  AlertTriangle,
  ChevronDown,
  Clock,
  Plus,
} from "lucide-react";

interface GovernanceHeaderProps {
  onCreatePolicy?: () => void;
}

export function GovernanceHeader({ onCreatePolicy }: GovernanceHeaderProps) {
  const [bulkOpen, setBulkOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 bg-white p-3 sm:p-4 rounded-xl border border-gray-200/80 shadow-2xs">
      {/* Top Breadcrumb & Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link
            href="/admin/marketing"
            className="hover:text-[#800020] transition-colors"
          >
            Marketing
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Governance</span>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Export Governance Report */}
          <Link
            href="/admin/marketing/reports-audit"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Governance Report</span>
          </Link>

          {/* 2. Review Governance Exceptions */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Review Governance Exceptions</span>
          </button>

          {/* 3. Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBulkOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <span>Bulk Actions</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {bulkOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-xs text-gray-700">
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Re-evaluate Selected Policies
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Export Governance Matrix
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Trigger Consent Re-check
                </button>
              </div>
            )}
          </div>

          {/* 4. Review Approval Queue (Outlined Crimson) */}
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#800020] bg-white hover:bg-rose-50 border border-[#800020] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#800020]" />
            <span>Review Approval Queue</span>
          </button>

          {/* 5. Create Governance Policy (Primary Crimson) */}
          <button
            onClick={onCreatePolicy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Governance Policy</span>
          </button>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Marketing Governance, Consent, Policy & Approval Control
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Monitor and enforce marketing policies, consent eligibility, approval workflows, communication limits, market restrictions and execution exceptions across the ecosystem.
        </p>
      </div>
    </div>
  );
}
