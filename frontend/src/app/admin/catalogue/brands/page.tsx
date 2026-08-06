"use client";

import React from "react";
import { Download, Upload, Filter, Plus } from "lucide-react";
import { CatalogueTopFilterBar } from "@/components/admin/catalogue/shared/CatalogueTopFilterBar";
import { BrandManagementDashboard } from "@/components/admin/catalogue/BrandManagementDashboard";

export default function BrandManagement() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
      <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
              Catalogue / Brands
            </div>
            <h1 className="text-xl font-bold text-ink">Brand Management</h1>
            <p className="text-[12px] text-muted mt-1">
              Manage brand masters, ownership, verification, authorization, supplier relationships and catalogue readiness.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              <Download size={14} /> Export Brand Report
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              <Upload size={14} /> Import Brands
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              Bulk Actions <Filter size={14} />
            </button>
            <button className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={14} /> Create Brand
            </button>
          </div>
        </div>
      </div>

      <CatalogueTopFilterBar />

      <div className="px-8 flex flex-col gap-6 w-full mt-6">
        <BrandManagementDashboard />
      </div>
    </div>
  );
}