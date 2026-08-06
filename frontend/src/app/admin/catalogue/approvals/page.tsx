"use client";

import React from "react";
import { Download, Search, SlidersHorizontal, CheckCircle } from "lucide-react";
import { CatalogueTopFilterBar } from "@/components/admin/catalogue/shared/CatalogueTopFilterBar";
import { ProductApprovalsDashboard } from "@/components/admin/catalogue/product-approvals/ProductApprovalsDashboard";

export default function ProductApprovalQueuePage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
      {/* Header */}
      <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
              Catalogue / Product Approvals
            </div>
            <h1 className="text-xl font-bold text-ink">Product Approval Queue</h1>
            <p className="text-[12px] text-muted mt-1">
              Manage product master reviews, compliance checks, brand authorizations, and publication readiness.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              <Download size={14} /> Export Approval Report
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              Bulk Actions <SlidersHorizontal size={14} />
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas transition-colors shadow-sm">
              Refresh
            </button>
          </div>
        </div>
      </div>

      <CatalogueTopFilterBar />

      <div className="p-6">
        <ProductApprovalsDashboard />
      </div>
    </div>
  );
}