"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export function BottomSummaryPanels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 1. Product Data Quality */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col justify-between">
        <div>
           <h4 className="text-[12px] font-bold text-ink mb-4">Product Data Quality</h4>
           <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1 border-b border-line pb-2">
                 <span className="text-[10px] font-bold text-muted">Incomplete Identity</span>
                 <span className="text-[14px] font-bold text-red-600">248</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-line pb-2">
                 <span className="text-[10px] font-bold text-muted">Invalid Barcode</span>
                 <span className="text-[14px] font-bold text-red-600">22</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-line pb-2">
                 <span className="text-[10px] font-bold text-muted">Missing Category</span>
                 <span className="text-[14px] font-bold text-orange-600">124</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-line pb-2">
                 <span className="text-[10px] font-bold text-muted">Missing Media</span>
                 <span className="text-[14px] font-bold text-orange-600">124</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-muted">Missing Brand</span>
                 <span className="text-[14px] font-bold text-orange-600">126</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-muted">Duplicate Candidates</span>
                 <span className="text-[14px] font-bold text-orange-600">36</span>
              </div>
           </div>
        </div>
        <button className="text-[11px] text-[#741d35] font-bold hover:underline w-full text-center flex items-center justify-center gap-1">
           View full data quality report <ChevronRight size={12} />
        </button>
      </div>

      {/* 2. Variant & Attribute Readiness */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col justify-between">
        <div>
           <h4 className="text-[12px] font-bold text-ink mb-4">Variant & Attribute Readiness</h4>
           
           <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[11px] font-bold text-ink">Overall Variant Readiness</span>
                <span className="text-[13px] font-bold text-[#059669]">91%</span>
              </div>
              <div className="flex justify-between items-center border-b border-line pb-3">
                <span className="text-[11px] font-semibold text-muted">Products with Variants</span>
                <span className="text-[12px] font-bold text-ink">8,920</span>
              </div>
              <div className="flex justify-between items-center border-b border-line pb-3">
                <span className="text-[11px] font-semibold text-muted">Missing Variant Attributes</span>
                <span className="text-[12px] font-bold text-orange-600">312</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-muted">Inconsistent Variant Pricing</span>
                <span className="text-[12px] font-bold text-orange-600">84</span>
              </div>
           </div>
        </div>
        <button className="text-[11px] text-[#741d35] font-bold hover:underline w-full text-center flex items-center justify-center gap-1">
           View variant readiness <ChevronRight size={12} />
        </button>
      </div>

      {/* 3. Product Media Readiness */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col justify-between">
        <div>
           <h4 className="text-[12px] font-bold text-ink mb-4">Product Media Readiness</h4>
           
           <div className="w-full flex h-2 rounded-full overflow-hidden mb-4">
              <div className="bg-[#059669] w-[84%]"></div>
              <div className="bg-orange-400 w-[12%]"></div>
              <div className="bg-red-500 w-[4%]"></div>
           </div>

           <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-center border-b border-line pb-2">
                <span className="text-[11px] font-semibold text-muted flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#059669]"></div> Fully Complete</span>
                <span className="text-[12px] font-bold text-ink">10,782</span>
              </div>
              <div className="flex justify-between items-center border-b border-line pb-2">
                <span className="text-[11px] font-semibold text-muted flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Low Quality Images</span>
                <span className="text-[12px] font-bold text-orange-600">89</span>
              </div>
              <div className="flex justify-between items-center border-b border-line pb-2">
                <span className="text-[11px] font-semibold text-muted flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400"></div> Missing Secondary Images</span>
                <span className="text-[12px] font-bold text-orange-600">458</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-muted flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-600"></div> Missing Primary Image</span>
                <span className="text-[12px] font-bold text-red-600">124</span>
              </div>
           </div>
        </div>
        <button className="text-[11px] text-[#741d35] font-bold hover:underline w-full text-center flex items-center justify-center gap-1">
           View media report <ChevronRight size={12} />
        </button>
      </div>

      {/* 4. Inventory & Batch Linkage */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col justify-between">
        <div>
           <h4 className="text-[12px] font-bold text-ink mb-4">Inventory & Batch Linkage</h4>
           
           <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[11px] font-bold text-ink">Overall Inventory Linkage</span>
                <span className="text-[13px] font-bold text-[#059669]">89%</span>
              </div>
              <div className="flex justify-between items-center border-b border-line pb-3">
                <span className="text-[11px] font-semibold text-muted">Inventory Linked</span>
                <span className="text-[12px] font-bold text-ink">11,420</span>
              </div>
              <div className="flex justify-between items-center border-b border-line pb-3">
                <span className="text-[11px] font-semibold text-muted">Unlinked Products</span>
                <span className="text-[12px] font-bold text-orange-600">1,420</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-muted">Batch Eligibility Configured</span>
                <span className="text-[12px] font-bold text-ink">9,200</span>
              </div>
           </div>
        </div>
        <button className="text-[11px] text-[#741d35] font-bold hover:underline w-full text-center flex items-center justify-center gap-1">
           View inventory report <ChevronRight size={12} />
        </button>
      </div>

    </div>
  );
}
