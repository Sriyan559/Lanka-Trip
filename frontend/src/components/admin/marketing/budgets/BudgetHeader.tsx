"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  AlertTriangle,
  ChevronDown,
  AlertOctagon,
  Plus,
} from "lucide-react";

interface BudgetHeaderProps {
  onCreateBudget?: () => void;
}

export function BudgetHeader({ onCreateBudget }: BudgetHeaderProps) {
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
          <span className="text-gray-900 font-semibold">Budgets</span>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Export Budget Report */}
          <Link
            href="/admin/marketing/reports-audit"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Budget Report</span>
          </Link>

          {/* 2. Review Budget Exceptions */}
          <Link
            href="/admin/marketing/governance"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Review Budget Exceptions</span>
          </Link>

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
                  Recalculate Commitments
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Export Selected Allocations
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium"
                >
                  Submit Batch Reallocation
                </button>
                <button
                  onClick={() => setBulkOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 font-medium text-rose-700"
                >
                  Freeze Uncommitted Balances
                </button>
              </div>
            )}
          </div>

          {/* 4. Review Approval Queue */}
          <Link
            href="/admin/marketing/governance"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Review Approval Queue</span>
            <span className="ml-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold">
              5
            </span>
          </Link>

          {/* 5. Create Budget (Crimson Primary Button) */}
          <button
            onClick={onCreateBudget}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Budget</span>
          </button>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          MK11 — Marketing Budgets, Planning & Spend Control
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Plan, allocate, monitor and govern marketing budgets, commitments, pacing and spend across campaigns, channels and business units.
        </p>
      </div>
    </div>
  );
}
