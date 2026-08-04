"use client";

import React from "react";
import { Download, Upload, Filter, Plus, List } from "lucide-react";
import { TopFilterBar } from "@/components/admin/layout/TopFilterBar";

export default function AttributeManagement() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-canvas pb-10">
      <div className="bg-white border-b border-line px-6 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-muted uppercase tracking-wider mb-1">
              Catalogue / Attributes & Variants
            </div>
            <h1 className="text-xl font-bold text-ink">Attribute & Variant Management</h1>
            <p className="text-[12px] text-muted mt-1">
              Manage catalogue attributes, required templates, variant combinations, validation rules, and publication readiness.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              <Download size={14} /> Export Attribute Report
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              <Upload size={14} /> Import Attributes
            </button>
            <button className="h-9 px-4 rounded bg-white border border-line text-[12px] font-semibold text-ink hover:bg-canvas flex items-center gap-2 transition-colors shadow-sm">
              Bulk Actions <Filter size={14} />
            </button>
            <button className="h-9 px-4 rounded border border-[#741d35] text-[#741d35] text-[12px] font-bold hover:bg-red-50 flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={14} /> Create Attribute
            </button>
            <button className="h-9 px-4 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={14} /> Create Variant Rule
            </button>
          </div>
        </div>
      </div>

      <TopFilterBar />

      <div className="p-6 flex flex-col gap-6">
        <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
           <h2 className="text-[14px] font-bold text-ink mb-4">Attribute & Variant Management Placeholder</h2>
           <p className="text-[12px] text-muted">A detailed implementation of the Attribute & Variant Management UI will be placed here.</p>
           <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">1,842</div><div className="text-[11px] text-muted mt-1">Total Attributes</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">1,521</div><div className="text-[11px] text-muted mt-1">Active Attributes</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">9</div><div className="text-[11px] text-muted mt-1">Attribute Groups</div></div>
              <div className="border border-line rounded p-3 text-center"><div className="text-2xl font-bold text-ink">312</div><div className="text-[11px] text-muted mt-1">Variant Attributes</div></div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Attribute Tables & Template Matrix Layout</span>
           </div>
           <div className="bg-white rounded-lg border border-line p-5 shadow-sm min-h-[400px] flex items-center justify-center">
              <span className="text-muted text-sm font-medium">Attribute Health & Sidebar Summary</span>
           </div>
        </div>
      </div>
    </div>
  );
}