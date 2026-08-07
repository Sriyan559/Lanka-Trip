"use client";

import React, { Suspense } from "react";
import { Download, Copy } from "lucide-react";
import { CatalogueTopFilterBar } from "@/components/admin/catalogue/shared/CatalogueTopFilterBar";
import { QualityManagementDashboard } from "@/components/admin/catalogue/quality/QualityManagementDashboard";

export default function QualityManagementPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading Catalogue Quality Management...</div>}>
      <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
        <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
                Catalogue / Quality &amp; Duplicate Resolution
              </div>
              <h1 className="text-xl font-bold text-ink">Catalogue Quality &amp; Duplicate Resolution</h1>
              <p className="text-[12px] text-muted mt-1">
                Resolve duplicate product candidates, validate missing information, fix regulatory errors and maintain high data health.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
                <Download size={14} /> Export Quality Report
              </button>
              <button className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 transition-colors shadow-sm">
                <Copy size={14} /> Resolve Top Duplicates
              </button>
            </div>
          </div>
        </div>

        <CatalogueTopFilterBar />

        <div className="px-8 flex flex-col gap-6 w-full mt-6">
          <QualityManagementDashboard />
        </div>
      </div>
    </Suspense>
  );
}