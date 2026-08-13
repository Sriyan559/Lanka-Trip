"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Plus, CheckSquare, ChevronDown } from "lucide-react";

interface ComplaintsPageHeaderProps {
  onReviewCritical?: () => void;
  onCreateComplaint?: () => void;
  onApproveRemedies?: () => void;
  onMoreActions?: () => void;
}

export function ComplaintsPageHeader({
  onReviewCritical,
  onCreateComplaint,
  onApproveRemedies,
  onMoreActions,
}: ComplaintsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link href="/admin/customer-support" className="hover:text-slate-800 transition-colors">
          Customer Support
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">Complaints &amp; Escalations</span>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            CS06 — Complaints, Escalations &amp; Service Recovery
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-4xl">
            Monitor serious customer complaints, manage escalation chains, coordinate service recovery, and govern remedy approvals across the support ecosystem.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onReviewCritical}
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertCircle size={14} />
            <span>Review Critical Complaints</span>
          </button>

          <button
            onClick={onCreateComplaint}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} className="text-slate-500" />
            <span>Create Complaint</span>
          </button>

          <button
            onClick={onApproveRemedies}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <CheckSquare size={14} className="text-slate-500" />
            <span>Approve Remedies</span>
          </button>

          <button
            onClick={onMoreActions}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>More Actions</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
