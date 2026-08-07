"use client";

import React from "react";
import { AlertTriangle, Upload, Eye, Clock, Check, HelpCircle, ArrowRight, UserCircle, Edit2, Archive, Download, LayoutList, PauseCircle, CheckCircle2 } from "lucide-react";
import { SharedCircularHealth } from "../../shared/SharedCircularHealth";
import { SharedProgressList } from "../../shared/SharedProgressList";

export function ProductDetailRightSidebar() {
  const SCORECARD = [
    { label: "Identity", pct: 98, color: "bg-[#059669]" },
    { label: "Classification", pct: 94, color: "bg-[#059669]" },
    { label: "Brand Verification", pct: 96, color: "bg-[#059669]" },
    { label: "Compliance", pct: 72, color: "bg-[#d97706]" },
    { label: "Variants", pct: 100, color: "bg-[#059669]" },
    { label: "Media", pct: 80, color: "bg-[#d97706]" },
    { label: "Inventory", pct: 90, color: "bg-[#059669]" },
    { label: "Publication", pct: 68, color: "bg-[#dc2626]" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full lg:w-[320px]">
      {/* Product Health */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Product Health</h3>
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 rounded-full border-[6px] border-slate-100 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#d97706]"
                strokeDasharray="84, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-ink leading-none">84<span className="text-[10px] text-muted">/100</span></span>
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <span className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">Needs Attention</span>
        </div>
        <SharedProgressList items={SCORECARD} layout="vertical" hasCardWrapper={false} />
        <div className="mt-4 flex justify-center border-t border-line pt-4">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View health dashboard <ArrowRight size={12} /></button>
        </div>
      </div>

      {/* Priority Issues */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[13px] font-bold text-ink">Priority Issues</h3>
          <button className="text-[10px] font-bold text-[#741d35] hover:underline">View all</button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <span className="bg-red-100 text-red-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mt-0.5">High</span>
              <span className="text-[11px] font-medium text-ink leading-tight">Missing safety evidence (15% Vit C)</span>
            </div>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline ml-2 flex-shrink-0">Review</button>
          </div>
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <span className="bg-red-100 text-red-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mt-0.5">High</span>
              <span className="text-[11px] font-medium text-ink leading-tight">Unsupported anti-aging claim</span>
            </div>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline ml-2 flex-shrink-0">Review</button>
          </div>
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <span className="bg-amber-100 text-amber-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mt-0.5">Medium</span>
              <span className="text-[11px] font-medium text-ink leading-tight">Back packaging image missing</span>
            </div>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline ml-2 flex-shrink-0">Upload</button>
          </div>
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <span className="bg-amber-100 text-amber-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded mt-0.5">Medium</span>
              <span className="text-[11px] font-medium text-ink leading-tight">Safety evidence pending</span>
            </div>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline ml-2 flex-shrink-0">Review</button>
          </div>
        </div>
      </div>

      {/* Approval & SLA */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Approval & SLA</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[11px] font-medium text-ink">Compliance Review</span>
            <span className="text-[11px] font-bold text-ink">14 of 18 steps<br/><span className="text-[10px] text-muted text-right block">78%</span></span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#741d35]" style={{ width: '78%' }}></div>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-muted">SLA Remaining</span>
            <span className="font-bold text-[#dc2626]">18h 45m</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-muted">Reviewer</span>
            <span className="font-semibold text-ink flex items-center gap-1"><UserCircle size={12}/> Elena Vance</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-muted">Final Decision</span>
            <span className="font-bold text-ink">Pending</span>
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full h-8 rounded border border-line text-[11px] font-bold text-ink hover:bg-slate-50 transition-colors">
            Open Approval Detail
          </button>
        </div>
      </div>

      {/* Publication Summary */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Publication Summary</h3>
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-ink">2 / 6</span>
            <span className="text-[9px] font-bold text-muted uppercase text-center mt-1">Eligible Channels</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-[#059669]">0</span>
            <span className="text-[9px] font-bold text-muted uppercase text-center mt-1">Published</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-[#dc2626]">4</span>
            <span className="text-[9px] font-bold text-muted uppercase text-center mt-1">Blocked</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Marketplace</span>
            <span className="text-[10px] font-bold text-[#dc2626]">No</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Mobile App</span>
            <span className="text-[10px] font-bold text-[#dc2626]">No</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Inventory Ready</span>
            <span className="text-[10px] font-bold text-[#059669]">Yes</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Pricing Ready</span>
            <span className="text-[10px] font-bold text-[#059669]">Yes</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View publication dashboard <ArrowRight size={12} /></button>
        </div>
      </div>

      {/* Inventory Risk */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Inventory Risk</h3>
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-ink">2,450</span>
            <span className="text-[9px] font-bold text-muted uppercase text-center mt-1">Available</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-[#059669]">No</span>
            <span className="text-[9px] font-bold text-muted uppercase text-center mt-1">Low Stock</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-[#059669]">No</span>
            <span className="text-[9px] font-bold text-muted uppercase text-center mt-1">Near Expiry</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Quarantined</span>
            <span className="text-[10px] font-bold text-[#059669]">0</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Recalled</span>
            <span className="text-[10px] font-bold text-[#059669]">0</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Active Batches</span>
            <span className="text-[10px] font-bold text-ink">4</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 p-2 rounded border border-line">
            <span className="text-[10px] font-bold text-muted mb-1">Inventory Risk</span>
            <span className="text-[10px] font-bold text-[#059669]">Low</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View inventory detail <ArrowRight size={12} /></button>
        </div>
      </div>

      {/* Final Product Actions */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Final Product Actions</h3>
        <div className="flex flex-col gap-2">
          <button className="h-9 w-full rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 justify-center transition-colors shadow-sm mb-2">
            <Edit2 size={14} /> Edit Product
          </button>
          <button className="h-9 w-full rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5a1629] flex items-center gap-2 justify-center transition-colors shadow-sm mb-2">
            <CheckCircle2 size={14} /> Submit for Approval
          </button>
          
          <button className="flex items-center gap-2 text-[11px] font-semibold text-ink hover:bg-slate-50 p-2 rounded transition-colors text-left border border-transparent hover:border-line">
            <HelpCircle size={14} className="text-muted" /> Request Additional Information
          </button>
          <button className="flex items-center gap-2 text-[11px] font-semibold text-ink hover:bg-slate-50 p-2 rounded transition-colors text-left border border-transparent hover:border-line">
            <Eye size={14} className="text-muted" /> Preview Marketplace Listing
          </button>
          <button className="flex items-center gap-2 text-[11px] font-semibold text-ink hover:bg-slate-50 p-2 rounded transition-colors text-left border border-transparent hover:border-line">
            <PauseCircle size={14} className="text-muted" /> Suspend Publication
          </button>
          <button className="flex items-center gap-2 text-[11px] font-semibold text-ink hover:bg-slate-50 p-2 rounded transition-colors text-left border border-transparent hover:border-line">
            <Archive size={14} className="text-muted" /> Archive Product
          </button>
          <button className="flex items-center gap-2 text-[11px] font-semibold text-[#dc2626] hover:bg-red-50 p-2 rounded transition-colors text-left border border-transparent hover:border-red-100">
            <AlertTriangle size={14} /> Escalate Product
          </button>
          <button className="flex items-center gap-2 text-[11px] font-semibold text-ink hover:bg-slate-50 p-2 rounded transition-colors text-left border border-transparent hover:border-line">
            <Download size={14} className="text-muted" /> Export Product Record
          </button>
        </div>
      </div>
    </div>
  );
}
