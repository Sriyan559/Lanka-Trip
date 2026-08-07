"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Layers, Plus, ChevronDown, CopyCheck } from "lucide-react";

interface CustomerDirectoryHeaderProps {
  onExportReport: () => void;
  onOpenAddCustomer: () => void;
  selectedCount: number;
  showToast: (msg: string) => void;
}

export function CustomerDirectoryHeader({
  onExportReport,
  onOpenAddCustomer,
  selectedCount,
  showToast,
}: CustomerDirectoryHeaderProps) {
  const [showBulkMenu, setShowBulkMenu] = useState(false);

  return (
    <div className="bg-white border-b border-line px-6 py-3.5 flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title and Breadcrumbs */}
        <div className="flex flex-col min-w-0 max-w-3xl">
          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold tracking-wider mb-0.5">
            <span className="text-slate-400 uppercase">Customers</span>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-800 uppercase font-bold">Customer Directory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Customer Directory
          </h1>
          <p className="text-[12.5px] text-slate-500 leading-relaxed mt-0.5 truncate lg:whitespace-normal">
            Search, review and manage customer master records, lifecycle status, identity, loyalty, privacy and account risk across the beauty marketplace.
          </p>
        </div>

        {/* Action Buttons Row (Single Horizontal Desktop Row) */}
        <div className="flex items-center gap-2 flex-nowrap shrink-0 self-start lg:self-center overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
          {/* 1. Export Directory Report */}
          <button
            onClick={onExportReport}
            className="h-8.5 px-3 rounded-md bg-white border border-line text-[11.5px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-ink flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Directory Report</span>
          </button>

          {/* 2. Review Duplicate Customers */}
          <button
            onClick={() => showToast("Opening Duplicate Resolution queue...")}
            className="h-8.5 px-3 rounded-md bg-white border border-line text-[11.5px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-ink flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <CopyCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Review Duplicate Customers</span>
          </button>

          {/* 3. Bulk Actions (0) */}
          <div className="relative">
            <button
              onClick={() => selectedCount > 0 && setShowBulkMenu(!showBulkMenu)}
              disabled={selectedCount === 0}
              className={`h-8.5 px-3 rounded-md border text-[11.5px] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap ${
                selectedCount > 0
                  ? "bg-white border-line text-slate-700 hover:bg-slate-50 cursor-pointer"
                  : "bg-slate-100/80 border-slate-200/80 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bulk Actions ({selectedCount})</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showBulkMenu && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-line rounded-lg shadow-lg py-1 z-40 text-[11.5px]">
                <button
                  onClick={() => {
                    showToast(`Bulk email sent to ${selectedCount} selected customers.`);
                    setShowBulkMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                >
                  Send Campaign Email
                </button>
                <button
                  onClick={() => {
                    showToast(`Verification requested for ${selectedCount} customers.`);
                    setShowBulkMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                >
                  Request ID Verification
                </button>
                <button
                  onClick={() => {
                    showToast(`Loyalty points granted to ${selectedCount} customers.`);
                    setShowBulkMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                >
                  Grant Bonus Loyalty Points
                </button>
                <div className="border-t border-line my-1" />
                <button
                  onClick={() => {
                    showToast(`${selectedCount} customer accounts restricted.`);
                    setShowBulkMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-rose-600 font-medium"
                >
                  Restrict Selected Accounts
                </button>
              </div>
            )}
          </div>

          {/* 4. Add Customer */}
          <Link
            href="/admin/customers/create"
            className="h-8.5 px-3.5 rounded-md bg-[#671021] hover:bg-[#520d1a] text-white text-[11.5px] font-bold flex items-center gap-1.5 transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Customer</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
