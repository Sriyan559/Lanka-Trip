"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Plus, ShieldAlert, Truck } from "lucide-react";

interface ProductSupplierHeaderProps {
  onReviewCritical?: () => void;
  onReviewSupplierIssues?: () => void;
  onReviewAuthenticityAlerts?: () => void;
}

export function ProductSupplierHeader({
  onReviewCritical,
  onReviewSupplierIssues,
  onReviewAuthenticityAlerts,
}: ProductSupplierHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link href="/admin/customer-support" className="hover:text-slate-800 transition-colors">
          Customer Support
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">Product &amp; Supplier Support</span>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            CS09 — Product, Supplier &amp; Authenticity Support
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-4xl">
            Monitor product quality issues, supplier support dependencies, authenticity concerns, safety concerns, and coordinate customer support with compliance and supplier teams.
          </p>
        </div>

        {/* Header Action Buttons (4 buttons) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onReviewCritical}
            className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <AlertCircle size={14} className="text-red-600" />
            <span>Review Critical Product Cases</span>
          </button>

          <button
            onClick={onReviewSupplierIssues}
            className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Truck size={14} className="text-blue-600" />
            <span>Review Supplier Issues</span>
          </button>

          <button
            onClick={onReviewAuthenticityAlerts}
            className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert size={14} className="text-amber-600" />
            <span>Review Authenticity Alerts</span>
          </button>

          <Link
            href="/admin/customer-support/cases/create"
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} />
            <span>Create Support Case</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
