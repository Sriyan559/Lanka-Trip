"use client";

import React from "react";
import { Edit2, ShieldAlert, Image as ImageIcon, Link2, Download, Trash2, ExternalLink } from "lucide-react";

export function MediaPreviewSidebar() {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-line flex items-center justify-between bg-slate-50">
        <h2 className="text-[13px] font-bold text-ink">Selected Asset Preview</h2>
      </div>

      <div className="p-6 flex flex-col gap-5">
        <div className="w-full aspect-square bg-slate-100 rounded-lg border border-line flex items-center justify-center overflow-hidden">
           <img src="https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=400&h=400" alt="Preview" className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-bold text-ink">hydrating-cream-hero.jpg</h3>
          </div>
          <div className="text-[11px] text-muted grid grid-cols-[100px_1fr] gap-y-1 mt-3">
            <span>Asset ID</span>
            <span className="font-semibold text-ink text-right">AST-99120</span>
            <span>Asset Type</span>
            <span className="font-semibold text-[#0284c7] bg-sky-50 px-1.5 rounded w-fit ml-auto">Primary Image</span>
            <span>Resolution</span>
            <span className="font-semibold text-ink text-right">2000 x 2000 px</span>
            <span>File Size</span>
            <span className="font-semibold text-ink text-right">1.4 MB</span>
            <span>Color Profile</span>
            <span className="font-semibold text-ink text-right">sRGB</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-y border-line py-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Linked Products (3)</span>
            <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1"><Link2 size={12}/> Manage Links</button>
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
             <div className="flex items-center gap-2 p-2 border border-line rounded bg-slate-50">
                <div className="w-6 h-6 bg-slate-200 rounded shrink-0"></div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-ink truncate">Hydrating Face Moisturizer</span>
                  <span className="text-[9px] text-muted font-mono">PF-4822</span>
                </div>
             </div>
             <div className="flex items-center gap-2 p-2 border border-line rounded bg-slate-50">
                <div className="w-6 h-6 bg-slate-200 rounded shrink-0"></div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-ink truncate">Hydrating Kit - Travel Size</span>
                  <span className="text-[9px] text-muted font-mono">PF-4823</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">CDN Status</span>
          <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2 rounded">
             <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
                <span className="text-[11px] font-bold text-[#059669]">Synced Globally</span>
             </div>
             <span className="text-[10px] font-mono text-[#059669]">7 edges</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
           <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Tags</span>
           <div className="flex flex-wrap gap-1.5">
             <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200">skincare</span>
             <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200">cream</span>
             <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200">hero</span>
             <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200">white-bg</span>
           </div>
        </div>

        <div className="flex items-center gap-3 pt-2 mt-2 border-t border-line">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
            <img src={`https://ui-avatars.com/api/?name=Sam+Smith&background=random&color=fff&size=64`} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted">Uploaded By</span>
            <span className="text-[11px] font-bold text-ink leading-tight">12 Oct 2024, 09:14 AM</span>
            <span className="text-[10px] text-muted">by Sam Smith</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
           <button className="h-8 flex items-center justify-center gap-2 bg-white border border-line text-ink text-[11px] font-bold rounded hover:bg-slate-50 transition-colors">
             <Download size={14} /> Download
           </button>
           <button className="h-8 flex items-center justify-center gap-2 bg-[#741d35] text-white text-[11px] font-bold rounded hover:bg-[#5a1629] transition-colors">
             <Edit2 size={14} /> Edit Meta
           </button>
        </div>
      </div>
    </div>
  );
}
