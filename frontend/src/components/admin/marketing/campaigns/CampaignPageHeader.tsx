"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  ChevronDown,
  AlertOctagon,
  Plus,
  RefreshCw,
} from "lucide-react";

interface CampaignPageHeaderProps {
  onRefresh?: () => void;
  reviewCount?: number;
}

export function CampaignPageHeader({
  onRefresh,
  reviewCount = 5,
}: CampaignPageHeaderProps) {
  const [bulkOpen, setBulkOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 bg-white p-3 sm:p-4 rounded-xl border border-gray-200/80 shadow-xs">
      {/* Top Breadcrumb & Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link
            href="/admin/marketing"
            className="hover:text-[#800020] transition-colors"
          >
            Marketing
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Campaigns</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors cursor-pointer"
              title="Refresh Campaign Data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
              <span>Refresh</span>
            </button>
          )}

          {/* 1. Export Report */}
          <Link
            href="/admin/marketing/reports-audit"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Report</span>
          </Link>

          {/* 2. Bulk Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBulkOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <span>Bulk Actions</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {bulkOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 text-xs text-gray-700">
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Pause Selected Campaigns
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Submit for Approval
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Batch Budget Update
                </button>
              </div>
            )}
          </div>

          {/* 3. Review Queue (5) */}
          <Link
            href="/admin/marketing/governance"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#800020] bg-rose-50/80 hover:bg-rose-100/80 border border-[#800020]/30 rounded-lg transition-colors"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-[#800020]" />
            <span>Review Queue ({reviewCount})</span>
          </Link>

          {/* 4. Create Campaign */}
          <Link
            href="/admin/marketing/campaigns/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Campaign</span>
          </Link>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Campaign Management
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Manage campaign planning, execution, approvals, audiences, channels,
          budgets and lifecycle status across the ecosystem.
        </p>
      </div>
    </div>
  );
}
