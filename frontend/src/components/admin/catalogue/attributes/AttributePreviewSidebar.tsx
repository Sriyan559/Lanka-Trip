"use client";

import React from "react";
import { Edit2, ShieldAlert } from "lucide-react";

export function AttributePreviewSidebar() {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-line flex items-center justify-between bg-slate-50">
        <h2 className="text-[13px] font-bold text-ink">Selected Attribute Preview</h2>
      </div>

      <div className="p-6 flex flex-col gap-5">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-bold text-ink">Shade Name</h3>
            <span className="text-[10px] font-bold text-[#059669] px-2 py-0.5 bg-green-50 rounded border border-[#059669]">Active</span>
          </div>
          <div className="text-[11px] text-muted grid grid-cols-2 gap-y-1">
            <span>Attribute ID</span>
            <span className="font-semibold text-ink text-right">ATTR-0092</span>
            <span>Group</span>
            <span className="font-semibold text-ink text-right">Variants & Attributes</span>
            <span>Definition</span>
            <span className="font-medium text-ink col-span-2 mt-1 leading-tight">Name of the shade or color variant used to differentiate product color.</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-y border-line py-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Usage Summary</span>
            <span className="text-xs text-muted mb-0.5">Products Using</span>
            <span className="text-lg font-bold text-ink">12,450</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1 invisible">.</span>
            <span className="text-xs text-muted mb-0.5">Categories Covered</span>
            <span className="text-lg font-bold text-ink">92%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Allowed Values (48)</span>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline">Manage</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-medium rounded">Porcelain</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-medium rounded">Ivory</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-medium rounded">Beige</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-medium rounded">Natural</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-medium rounded">Honey</span>
            <span className="px-2 py-1 bg-slate-200 text-slate-700 text-[10px] font-medium rounded">+43 more</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Validation Logic</span>
          <span className="text-[11px] font-medium text-ink bg-slate-50 p-2 border border-line rounded">Must match standardized shade list. No special characters allowed.</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Dependent Attributes</span>
          <span className="text-[11px] font-medium text-ink">Skin Type, Undertone, Finish Type</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Eligible Channels</span>
          <div className="flex flex-wrap gap-2">
             <span className="text-[10px] font-semibold text-[#059669] flex items-center gap-1"><ShieldAlert size={12}/> Online Marketplace</span>
             <span className="text-[10px] font-semibold text-[#059669] flex items-center gap-1"><ShieldAlert size={12}/> Mobile App</span>
             <span className="text-[10px] font-semibold text-[#059669] flex items-center gap-1"><ShieldAlert size={12}/> B2B Wholesale</span>
             <span className="text-[10px] font-semibold text-[#059669] flex items-center gap-1"><ShieldAlert size={12}/> Partner Storefront</span>
             <span className="text-[10px] font-semibold text-[#059669] flex items-center gap-1"><ShieldAlert size={12}/> Social Commerce</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-line">
           <div className="flex justify-between items-center">
             <span className="text-[11px] font-bold text-muted">Completeness</span>
             <span className="text-[11px] font-bold text-ink">94%</span>
           </div>
           <div className="h-1.5 w-full bg-slate-100 rounded-full">
             <div className="h-full bg-[#059669] rounded-full" style={{ width: '94%' }}></div>
           </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
            <img src={`https://ui-avatars.com/api/?name=Elena+Vance&background=random&color=fff&size=64`} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted">Last Updated</span>
            <span className="text-[11px] font-bold text-ink leading-tight">04 Aug 2026, 10:25 AM</span>
            <span className="text-[10px] text-muted">by Elena Vance</span>
          </div>
        </div>
        
        <button className="w-full mt-2 h-9 flex items-center justify-center gap-2 bg-[#741d35] text-white text-[12px] font-bold rounded hover:bg-[#5a1629] transition-colors">
          <Edit2 size={14} /> Edit Attribute
        </button>
      </div>
    </div>
  );
}
