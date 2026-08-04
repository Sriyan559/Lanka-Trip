"use client";

import React from "react";
import { Download, Upload, Filter, ListTree } from "lucide-react";
import { TopFilterBar } from "@/components/admin/layout/TopFilterBar";

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

      <div className="p-6 flex flex-col gap-6">
        <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
           <h2 className="text-[14px] font-bold text-ink mb-4">Import & Export Management Placeholder</h2>
           <p className="text-[12px] text-muted">A detailed implementation of the Catalogue Import/Export UI will be placed here.</p>
           <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">12</div><div className="text-[11px] text-muted mt-1">Active Jobs</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">48</div><div className="text-[11px] text-muted mt-1">Completed Today</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-red-600">3</div><div className="text-[11px] text-muted mt-1">Failed Jobs</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-amber-600">14</div><div className="text-[11px] text-muted mt-1">Validation Errors</div></div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Data Job Queue & Details Table</span>
           </div>
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Integration System Health Sidebar</span>
           </div>
        </div>
      </div>
    </div>
  );
}