"use client";

import React from "react";
import { Download, Upload, Filter, Plus, Image } from "lucide-react";
import { TopFilterBar } from "@/components/admin/layout/TopFilterBar";

export default function MediaAssetManagement() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
      <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
              Catalogue / Media Assets
            </div>
            <h1 className="text-xl font-bold text-ink">Media Asset Management</h1>
            <p className="text-[12px] text-muted mt-1">
              Manage product images, videos, documents, brand logos, CDN sync, quality validation and media compliance.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              <Download size={14} /> Export Media Report
            </button>
            <button className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 transition-colors shadow-sm">
              <Upload size={14} /> Upload Media Assets
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              Bulk Actions <Filter size={14} />
            </button>
          </div>
        </div>
      </div>

      <TopFilterBar />

      <div className="p-6 flex flex-col gap-6">
        <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
           <h2 className="text-[14px] font-bold text-ink mb-4">Media Asset Management Placeholder</h2>
           <p className="text-[12px] text-muted">A detailed implementation of the Media Asset Management UI will be placed here.</p>
           <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">42,840</div><div className="text-[11px] text-muted mt-1">Total Assets</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">38,962</div><div className="text-[11px] text-muted mt-1">Active Assets</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-amber-600">842</div><div className="text-[11px] text-muted mt-1">Validation Errors</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink text-red-600">124</div><div className="text-[11px] text-muted mt-1">Missing Product Media</div></div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Asset Gallery & Data Table Layout</span>
           </div>
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Media Health & Processing Status Sidebar</span>
           </div>
        </div>
      </div>
    </div>
  );
}