"use client";

import React from "react";
import { Download, Upload, Filter, Copy, AlertTriangle } from "lucide-react";
import { TopFilterBar } from "@/components/admin/layout/TopFilterBar";

export default function QualityManagement() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
      <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
              Catalogue / Quality & Duplicate Resolution
            </div>
            <h1 className="text-xl font-bold text-ink">Catalogue Quality & Duplicate Resolution</h1>
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

      <TopFilterBar />

      <div className="p-6 flex flex-col gap-6">
        <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
           <h2 className="text-[14px] font-bold text-ink mb-4">Catalogue Quality Management Placeholder</h2>
           <p className="text-[12px] text-muted">A detailed implementation of the Catalogue Quality & Duplicate Resolution UI will be placed here.</p>
           <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-amber-600">36</div><div className="text-[11px] text-muted mt-1">Duplicate Product Risks</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-red-600">248</div><div className="text-[11px] text-muted mt-1">Incomplete Product Records</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-red-600">22</div><div className="text-[11px] text-muted mt-1">Publication Blockers</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-amber-600">124</div><div className="text-[11px] text-muted mt-1">Missing Required Media</div></div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Duplicate Resolution Workspace & Tables</span>
           </div>
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Data Quality Rule Configuration</span>
           </div>
        </div>
      </div>
    </div>
  );
}