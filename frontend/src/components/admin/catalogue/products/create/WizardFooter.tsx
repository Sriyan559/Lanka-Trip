"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

export function WizardFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-line p-4 z-10 flex items-center justify-between shadow-lg ml-64 pl-6 pr-6">
      <div className="flex items-center gap-6">
        <div>
          <div className="text-[11px] font-bold text-ink mb-1">STEP 5 / 10</div>
          <div className="text-[14px] font-bold text-ink">Ingredients & Safety</div>
        </div>
        <div className="w-px h-8 bg-line mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-bold text-muted">Completeness: <span className="text-amber-600">68%</span></div>
          <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: '68%' }} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600 ml-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Saved 2 minutes ago
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded ml-4">
          <AlertCircle size={14} /> 3 blocking issues
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="h-10 px-6 rounded bg-white border border-line text-[13px] font-bold text-ink hover:bg-slate-50 transition-colors shadow-sm">
          Cancel
        </button>
        <button className="h-10 px-6 rounded bg-white border border-line text-[13px] font-bold text-ink hover:bg-slate-50 transition-colors shadow-sm">
          Save Draft
        </button>
        <button className="h-10 px-8 rounded bg-[#741d35] text-white text-[13px] font-bold hover:bg-[#5a1629] transition-colors shadow-sm">
          Save & Continue
        </button>
        <div className="w-px h-6 bg-line mx-2"></div>
        <button className="h-10 px-6 rounded bg-white border border-line text-[13px] font-bold text-ink hover:bg-slate-50 transition-colors shadow-sm">
          Validate
        </button>
        <button className="h-10 px-6 rounded bg-white border border-line text-[13px] font-bold text-ink hover:bg-slate-50 transition-colors shadow-sm">
          Preview
        </button>
        <button className="h-10 px-6 rounded bg-red-100 text-[#8b2c45] text-[13px] font-bold opacity-60 cursor-not-allowed transition-colors shadow-sm">
          Submit for Approval
        </button>
      </div>
    </div>
  );
}
