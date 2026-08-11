"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Download, ShieldAlert, ChevronDown, CheckSquare, Plus } from "lucide-react";

export function ContentHeader({
  onAddContent,
}: {
  onAddContent?: () => void;
}) {
  return (
    <div className="flex flex-col gap-1 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
        <Link href="/admin/marketing" className="hover:text-gray-900 transition-colors">
          Marketing
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-bold text-gray-900">Content & Creative</span>
      </div>

      {/* Shallow Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200/80 shadow-2xs">
        <div className="flex flex-col min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
            Marketing Content & Creative Library
          </h1>
          <p className="text-[10.5px] text-gray-500 font-medium leading-tight">
            Manage reusable marketing assets, messaging templates, variants, approvals, rights and campaign usage across the ecosystem.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs h-7">
            <Download className="w-3 h-3 text-gray-500" />
            <span>Export Content Report</span>
          </button>

          <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-lg transition-colors shadow-2xs h-7">
            <ShieldAlert className="w-3 h-3 text-amber-600" />
            <span>Review Content Exceptions</span>
            <span className="bg-amber-600 text-white text-[9px] font-mono px-1.5 py-0.2 rounded-full ml-0.5">
              42
            </span>
          </button>

          <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs h-7">
            <span>Bulk Actions</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>

          <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs h-7">
            <CheckSquare className="w-3 h-3 text-gray-500" />
            <span>Review Approval Queue</span>
            <span className="bg-[#800020] text-white text-[9px] font-mono px-1.5 py-0.2 rounded-full ml-0.5">
              86
            </span>
          </button>

          <button
            onClick={onAddContent}
            className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors h-7"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Content</span>
          </button>
        </div>
      </div>
    </div>
  );
}
