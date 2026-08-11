"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Download, SlidersHorizontal, ChevronDown, ShieldAlert, Plus } from "lucide-react";

export function AudienceHeader({
  onCreateAudience,
}: {
  onCreateAudience?: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <Link href="/admin/marketing" className="hover:text-gray-900 transition-colors">
          Marketing
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-bold text-gray-900">Audiences</span>
      </div>

      {/* Main Title & Action Buttons Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Audience, Segments & Targeting
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Build reusable marketing audiences from customer segments, behavior, consent, eligibility and business rules.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Audience Report</span>
          </button>

          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span>Compare Audiences</span>
          </button>

          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <span>Bulk Actions</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-lg transition-colors shadow-2xs">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Review Suppressions</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
          </button>

          <button
            onClick={onCreateAudience}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Audience</span>
          </button>
        </div>
      </div>
    </div>
  );
}
