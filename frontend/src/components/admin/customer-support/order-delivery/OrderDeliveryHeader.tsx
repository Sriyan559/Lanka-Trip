"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Plus, AlertTriangle, ChevronDown } from "lucide-react";

interface OrderDeliveryHeaderProps {
  onReviewEscalated?: () => void;
  onCreateSupportCase?: () => void;
  onReviewCarrierExceptions?: () => void;
  onMoreActions?: () => void;
}

export function OrderDeliveryHeader({
  onReviewEscalated,
  onCreateSupportCase,
  onReviewCarrierExceptions,
  onMoreActions,
}: OrderDeliveryHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link href="/admin/customer-support" className="hover:text-slate-800 transition-colors">
          Customer Support
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">Order, Delivery &amp; Fulfilment</span>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            CS07 — Order, Delivery &amp; Fulfilment Support
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-4xl">
            Monitor customer orders, fulfilment, dispatch and shipment health. Investigate post-sale channel issues with internal and external teams to support timely issue resolution.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onReviewEscalated}
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertCircle size={14} />
            <span>Review Escalated Delivery Cases</span>
          </button>

          <Link
            href="/admin/customer-support/cases/create"
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} />
            <span>Create Support Case</span>
          </Link>

          <button
            onClick={onReviewCarrierExceptions}
            className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle size={14} />
            <span>Review Carrier Exceptions</span>
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
