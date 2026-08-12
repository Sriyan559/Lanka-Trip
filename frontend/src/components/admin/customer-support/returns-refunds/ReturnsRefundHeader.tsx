"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Plus, AlertTriangle, ShieldAlert, ChevronDown, Star } from "lucide-react";

interface ReturnsRefundHeaderProps {
  onReviewCritical?: () => void;
  onReviewRefundExceptions?: () => void;
  onReviewDisputes?: () => void;
  onMoreActions?: () => void;
}

export function ReturnsRefundHeader({
  onReviewCritical,
  onReviewRefundExceptions,
  onReviewDisputes,
  onMoreActions,
}: ReturnsRefundHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link href="/admin/customer-support" className="hover:text-slate-800 transition-colors">
          Customer Support
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">Returns &amp; Refund Support</span>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>CS08 — Returns, Refunds &amp; Dispute Support</span>
            <Star size={16} className="text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-4xl">
            Monitor return requests, reverse logistics, item inspection, refund processing and customer payment disputes across all channel orders.
          </p>
        </div>

        {/* Header Action Buttons (5 buttons) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onReviewCritical}
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertCircle size={14} />
            <span>Review Critical Return Cases</span>
          </button>

          <Link
            href="/admin/customer-support/cases/create"
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} />
            <span>Create Support Case</span>
          </Link>

          <button
            onClick={onReviewRefundExceptions}
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle size={14} />
            <span>Review Refund Exceptions</span>
          </button>

          <button
            onClick={onReviewDisputes}
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert size={14} />
            <span>Review Disputes</span>
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
