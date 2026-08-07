"use client";

import React, { Suspense } from "react";
import { Download, Plus, Upload, Filter } from "lucide-react";
import { ProductMasterManagementView } from "@/components/admin/catalogue/products/ProductMasterManagementView";
import { CatalogueTopFilterBar } from "@/components/admin/catalogue/shared/CatalogueTopFilterBar";
import Link from "next/link";

export default function ProductMastersPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading Product Master Management...</div>}>
      <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
        {/* Header */}
        <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
                <Link href="/admin/catalogue" className="hover:text-ink">Catalogue</Link> / Product Masters
              </div>
              <h1 className="text-xl font-bold text-ink">Product Master Management</h1>
              <p className="text-[12px] text-muted mt-1">
                Manage product master records, variants, compliance, inventory linkage and publication readiness.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
                <Download size={14} /> Export Products
              </button>
              <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
                <Upload size={14} /> Import Products
              </button>
              <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
                Bulk Actions <Filter size={14} />
              </button>
              <Link 
                href="/admin/catalogue/products/create" 
                className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 transition-colors shadow-sm justify-center flex"
              >
                <Plus size={14} /> Create Product Master
              </Link>
            </div>
          </div>
        </div>

        {/* Top Filter Bar */}
        <CatalogueTopFilterBar />

        {/* Main Content */}
        <div className="p-6">
          <ProductMasterManagementView />
        </div>
      </div>
    </Suspense>
  );
}
