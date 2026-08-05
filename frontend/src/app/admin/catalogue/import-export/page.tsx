"use client";

import React from "react";
import { Download, Upload, Filter, ListTree } from "lucide-react";
import { TopFilterBar } from "@/components/admin/layout/TopFilterBar";
import { ImportExportDashboard } from "@/components/admin/catalogue/import-export/ImportExportDashboard";

export default function CatalogueImportExport() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
      <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
              Catalogue / Import & Export
            </div>
            <h1 className="text-xl font-bold text-ink">Catalogue Import & Export</h1>
            <p className="text-[12px] text-muted mt-1">
              Manage bulk catalogue operations, data migrations, scheduled jobs, and supplier integration feeds.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 transition-colors shadow-sm">
              <Upload size={14} /> New Import Job
            </button>
            <button className="h-9 px-4 rounded border border-[#741d35] text-[#741d35] text-[12px] font-bold hover:bg-red-50 flex items-center gap-2 transition-colors shadow-sm">
              <Download size={14} /> New Export Job
            </button>
          </div>
        </div>
      </div>

      <TopFilterBar />

      <div className="p-6">
        <ImportExportDashboard />
      </div>
    </div>
  );
}