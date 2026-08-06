"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, RefreshCw, Edit2, Send, ExternalLink, MoreHorizontal } from "lucide-react";
import { DetailHeaderInfo } from "./DetailHeaderInfo";
import { DetailReadinessBadges } from "./DetailReadinessBadges";
import { DetailTabs } from "./DetailTabs";
import { DetailSidebar } from "./DetailSidebar";

export function ProductMasterDetailView({ productId }: { productId: string }) {
  return (
    <div className="p-6">
      {/* Back & Breadcrumb */}
      <Link href="/admin/catalogue/products" className="inline-flex items-center gap-2 text-[12px] font-semibold text-muted hover:text-ink mb-4 transition-colors">
        <ArrowLeft size={14} /> Back to Product Master Management
      </Link>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-ink">Product Master Detail</h1>
        <div className="text-[11px] font-semibold text-muted bg-white border border-line px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Live Data
          <span className="text-slate-400 font-normal">Last updated: 04 May 2026, 11:27 AM</span>
        </div>
      </div>

      {/* Warning Alert */}
      <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded p-3 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-[12px] font-medium">
          <AlertTriangle size={16} className="text-orange-500" />
          This product master was updated by Marcus Lee (Admin) 2 minutes ago. Please refresh before making changes to avoid conflicts.
        </div>
        <button className="h-8 px-3 rounded bg-white border border-orange-200 text-[11px] font-bold hover:bg-orange-100 flex items-center gap-1.5 transition-colors">
          <RefreshCw size={12} /> Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg border border-line shadow-sm overflow-hidden">
            {/* Header Info */}
            <DetailHeaderInfo />
            
            {/* Readiness Badges */}
            <div className="px-6 py-4 border-t border-line bg-slate-50">
               <DetailReadinessBadges />
            </div>

            {/* Tabs & Main Content area */}
            <div className="border-t border-line">
              <DetailTabs />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <DetailSidebar productId={productId} />
        </div>
      </div>
    </div>
  );
}
