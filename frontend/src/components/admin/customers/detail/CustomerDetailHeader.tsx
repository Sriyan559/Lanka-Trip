"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, ShieldCheck, MessageSquare, ChevronDown, Download, History, ShieldAlert, GitMerge, Archive } from "lucide-react";

interface CustomerDetailHeaderProps {
  customerId: string;
  showToast: (msg: string) => void;
}

export function CustomerDetailHeader({ customerId, showToast }: CustomerDetailHeaderProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleAction = (actionName: string) => {
    setIsMoreOpen(false);
    showToast(`Executed action: ${actionName} for customer ${customerId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-line/60">
      {/* Breadcrumb + Page Title */}
      <div>
        <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
          <Link href="/admin/customers" className="hover:text-[#671021] transition-colors">
            Customers
          </Link>
          <span>/</span>
          <Link href="/admin/customers/directory" className="hover:text-[#671021] transition-colors">
            Customer Directory
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold font-mono">Customer Detail</span>
        </nav>
        <h1 className="text-xl font-black text-ink tracking-tight font-sans">
          Customer Detail
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/admin/customers/${customerId}/edit`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#671021] text-white rounded-md text-[11.5px] font-bold hover:bg-[#520d1a] transition-colors shadow-2xs cursor-pointer"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Edit Customer</span>
        </Link>

        <button
          onClick={() => handleAction("Start Verification Review")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-line rounded-md text-[11.5px] font-bold text-slate-700 hover:bg-slate-50 hover:text-ink transition-colors shadow-2xs cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Start Verification Review</span>
        </button>

        <button
          onClick={() => handleAction("Open Support Case")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-line rounded-md text-[11.5px] font-bold text-slate-700 hover:bg-slate-50 hover:text-ink transition-colors shadow-2xs cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
          <span>Open Support Case</span>
        </button>

        {/* More Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-line rounded-md text-[11.5px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>More Actions</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isMoreOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white border border-line rounded-lg shadow-lg py-1 z-50 text-[11.5px]">
              <button
                onClick={() => handleAction("Export Customer Data")}
                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Customer Data</span>
              </button>

              <button
                onClick={() => handleAction("View Audit History")}
                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-slate-700"
              >
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>View Audit History</span>
              </button>

              <button
                onClick={() => handleAction("Restrict Customer")}
                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-amber-700"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Restrict Customer</span>
              </button>

              <button
                onClick={() => handleAction("Merge Duplicate Record")}
                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-slate-700"
              >
                <GitMerge className="w-3.5 h-3.5 text-slate-400" />
                <span>Merge Duplicate Record</span>
              </button>

              <div className="border-t border-line my-1" />

              <button
                onClick={() => handleAction("Archive Customer")}
                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 text-rose-600"
              >
                <Archive className="w-3.5 h-3.5 text-rose-500" />
                <span>Archive Customer</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
