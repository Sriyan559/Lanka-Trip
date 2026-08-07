"use client";

import React, { Suspense } from "react";
import { Download, Upload, Plus } from "lucide-react";
import { CatalogueTopFilterBar } from "@/components/admin/catalogue/shared/CatalogueTopFilterBar";
import { AttributeManagementDashboard } from "@/components/admin/catalogue/attributes/AttributeManagementDashboard";

export default function AttributeManagementPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading Attribute &amp; Variant Management dashboard...</div>}>
      <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
        <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
                Catalogue / Attributes
              </div>
              <h1 className="text-xl font-bold text-ink">Attribute &amp; Variant Management</h1>
              <p className="text-[12px] text-muted mt-1">
                Manage global attribute dictionary, variant families, input validations, and category taxonomies.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
                <Download size={14} /> Export Attributes
              </button>
              <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
                <Upload size={14} /> Import Mapping
              </button>
              <button className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 transition-colors shadow-sm">
                <Plus size={14} /> Create Attribute
              </button>
            </div>
          </div>
        </div>

        <CatalogueTopFilterBar />

        <div className="px-8 flex flex-col gap-6 w-full mt-6">
          <AttributeManagementDashboard />
        </div>
      </div>
    </Suspense>
  );
}