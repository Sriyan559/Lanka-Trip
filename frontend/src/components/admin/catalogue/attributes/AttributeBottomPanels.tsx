"use client";

import React from "react";
import { ChevronRight, ArrowRight, ShieldAlert, GitBranch, Layers, CheckCircle2 } from "lucide-react";

export function AttributeBottomPanels() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Row 1: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel 1: Variant Family Conflicts */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
              <ShieldAlert size={14} className="text-[#dc2626]" />
              Variant Conflicts
            </h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">View all</button>
          </div>
          
          <div className="flex flex-col gap-3">
             {[
               { id: "PF-4822", product: "Hydrating Moisturizer", conflict: "Duplicate Size values", issue: "Both variants have Size: 50ml" },
               { id: "PF-9182", product: "Matte Lipstick Core", conflict: "Missing Color mapping", issue: "Variant 3 has no Color/Shade mapped" },
               { id: "PF-2241", product: "Vitamin C Serum", conflict: "Inconsistent types", issue: "Uses ml and oz within same family" },
             ].map((item, i) => (
               <div key={i} className="border border-line rounded p-3 hover:border-red-300 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-muted bg-slate-50 px-1.5 rounded">{item.id}</span>
                    <span className="text-[9px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">Action Required</span>
                  </div>
                  <div className="text-[11px] font-bold text-ink mb-1 group-hover:text-[#741d35]">{item.product}</div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-ink">{item.conflict}</span>
                    <span className="text-[10px] text-muted">{item.issue}</span>
                  </div>
               </div>
             ))}
          </div>
          
          <button className="w-full mt-4 h-8 flex items-center justify-center gap-1.5 rounded border border-line text-[11px] font-bold text-ink hover:bg-slate-50 transition-colors">
            Resolve Variant Conflicts <ArrowRight size={12} />
          </button>
        </div>

        {/* Panel 2: Recent Value Mappings (Audit) */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
              <GitBranch size={14} className="text-[#0284c7]" />
              Recent Normalizations
            </h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">Audit Log</button>
          </div>
          
          <div className="flex flex-col gap-0 relative">
             <div className="absolute left-2.5 top-2 bottom-2 w-px bg-line z-0"></div>
             {[
               { attr: "Color / Shade", from: "Lt. Blue", to: "Light Blue", time: "10 mins ago", user: "Auto-Mapper" },
               { attr: "Skin Type", from: "Dry/Norm", to: "Dry, Normal", time: "1 hr ago", user: "Sarah Jenkins" },
               { attr: "Size / Volume", from: "1oz", to: "30ml", time: "3 hrs ago", user: "Michael Chang" },
               { attr: "Finish", from: "Matt", to: "Matte", time: "4 hrs ago", user: "Auto-Mapper" },
               { attr: "Key Ingredients", from: "Vit C", to: "Vitamin C", time: "5 hrs ago", user: "Sarah Jenkins" },
             ].map((log, i) => (
               <div key={i} className="flex items-start gap-4 relative z-10 py-2 group">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-line flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-[#0284c7] transition-colors">
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#0284c7]"></div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col pt-0.5">
                     <div className="flex items-center justify-between gap-2 mb-1">
                       <span className="text-[10px] font-bold text-ink truncate">{log.attr}</span>
                       <span className="text-[9px] text-muted whitespace-nowrap">{log.time}</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-[11px] mb-1">
                        <span className="text-muted line-through truncate max-w-[80px]">{log.from}</span>
                        <ArrowRight size={10} className="text-muted flex-shrink-0" />
                        <span className="font-semibold text-[#059669] truncate max-w-[80px] bg-green-50 px-1 rounded">{log.to}</span>
                     </div>
                     <span className="text-[9px] text-muted font-medium">by {log.user}</span>
                  </div>
               </div>
             ))}
          </div>
          
          <button className="w-full mt-2 text-[11px] font-bold text-[#741d35] hover:underline flex items-center justify-center gap-1">
            View mapping audit log <ChevronRight size={12} />
          </button>
        </div>

        {/* Panel 3: Attribute Set Coverage */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
              <Layers size={14} className="text-[#059669]" />
              Attribute Sets
            </h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">Manage</button>
          </div>
          
          <div className="flex flex-col gap-3">
             {[
               { set: "Skincare Core", coverage: "100%", status: "Complete", color: "text-[#059669] bg-green-50" },
               { set: "Makeup - Face", coverage: "100%", status: "Complete", color: "text-[#059669] bg-green-50" },
               { set: "Fragrance Standard", coverage: "85%", status: "Missing Required", color: "text-[#ea580c] bg-orange-50" },
               { set: "Tools & Brushes", coverage: "100%", status: "Complete", color: "text-[#059669] bg-green-50" },
               { set: "Haircare Treatment", coverage: "60%", status: "Needs Review", color: "text-[#dc2626] bg-red-50" },
             ].map((set, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-line last:border-0 hover:bg-slate-50 cursor-pointer -mx-2 px-2 rounded transition-colors">
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] font-bold text-ink">{set.set}</span>
                     <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded w-max ${set.color}`}>{set.status}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[12px] font-bold text-ink">{set.coverage}</span>
                     <span className="text-[9px] text-muted">Coverage</span>
                  </div>
                </div>
             ))}
          </div>

          <button className="w-full mt-4 h-8 flex items-center justify-center gap-1.5 rounded border border-line text-[11px] font-bold text-ink hover:bg-slate-50 transition-colors">
            Manage Taxonomies <ArrowRight size={12} />
          </button>
        </div>

      </div>
      
    </div>
  );
}
