"use client";

import React from "react";
import { Globe, ArrowRight, UploadCloud, CalendarClock, Activity } from "lucide-react";

export function MediaBottomPanels() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Row 1: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel 1: CDN Edge Node Replication */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
              <Globe size={14} className="text-[#059669]" />
              CDN Replication Status
            </h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">Nodes</button>
          </div>
          
          <div className="flex flex-col gap-3">
             {[
               { region: "North America (US-East)", status: "Synced", latency: "12ms", color: "text-[#059669]" },
               { region: "North America (US-West)", status: "Synced", latency: "18ms", color: "text-[#059669]" },
               { region: "Europe (Frankfurt)", status: "Syncing (98%)", latency: "42ms", color: "text-[#0284c7]" },
               { region: "Asia Pacific (Singapore)", status: "Synced", latency: "110ms", color: "text-[#059669]" },
               { region: "South America (São Paulo)", status: "Degraded", latency: "214ms", color: "text-[#ea580c]" },
             ].map((node, i) => (
               <div key={i} className="flex items-center justify-between border-b border-line pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-ink">{node.region}</span>
                    <span className={`text-[10px] font-semibold ${node.color}`}>{node.status}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-mono text-muted">{node.latency}</span>
                    <span className="text-[9px] text-muted">Latency</span>
                  </div>
               </div>
             ))}
          </div>
          
          <button className="w-full mt-4 h-8 flex items-center justify-center gap-1.5 rounded border border-line text-[11px] font-bold text-ink hover:bg-slate-50 transition-colors">
            Manage CDN Infrastructure <ArrowRight size={12} />
          </button>
        </div>

        {/* Panel 2: Recent Bulk Uploads */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
              <UploadCloud size={14} className="text-[#0284c7]" />
              Recent Bulk Uploads
            </h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">Audit Log</button>
          </div>
          
          <div className="flex flex-col gap-0 relative">
             <div className="absolute left-2.5 top-2 bottom-2 w-px bg-line z-0"></div>
             {[
               { batch: "Holiday24_Banners.zip", count: "24 assets", status: "Success", time: "10 mins ago", user: "Marketing Team" },
               { batch: "Fenty_Swatches_Q3.zip", count: "142 assets", status: "Partial (3 errors)", time: "1 hr ago", user: "Brand Admin" },
               { batch: "Dior_Primary_Updates.zip", count: "8 assets", status: "Success", time: "3 hrs ago", user: "Content Team" },
               { batch: "Hero_Videos_Batch1.zip", count: "4 assets", status: "Success", time: "5 hrs ago", user: "Content Team" },
             ].map((log, i) => (
               <div key={i} className="flex items-start gap-4 relative z-10 py-2 group">
                  <div className={`w-5 h-5 rounded-full bg-white border-2 border-line flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${log.status.includes('Partial') ? 'group-hover:border-[#ea580c]' : 'group-hover:border-[#0284c7]'}`}>
                     <div className={`w-1.5 h-1.5 rounded-full ${log.status.includes('Partial') ? 'bg-[#ea580c]' : 'bg-slate-300 group-hover:bg-[#0284c7]'}`}></div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col pt-0.5">
                     <div className="flex items-center justify-between gap-2 mb-0.5">
                       <span className="text-[11px] font-bold text-ink truncate">{log.batch}</span>
                       <span className="text-[9px] text-muted whitespace-nowrap">{log.time}</span>
                     </div>
                     <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[10px] text-muted">{log.count}</span>
                        <span className={`text-[9px] font-bold px-1.5 rounded ${log.status.includes('Partial') ? 'bg-orange-50 text-[#ea580c]' : 'bg-green-50 text-[#059669]'}`}>{log.status}</span>
                     </div>
                     <span className="text-[9px] text-muted font-medium">by {log.user}</span>
                  </div>
               </div>
             ))}
          </div>
          
        </div>

        {/* Panel 3: Expiring Promotional Assets */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
              <CalendarClock size={14} className="text-[#ea580c]" />
              Expiring Assets
            </h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">Schedules</button>
          </div>
          
          <div className="flex flex-col gap-3">
             {[
               { asset: "Summer Sale Banner Main", brand: "Global", expires: "Today, 11:59 PM", urgency: "text-[#dc2626]" },
               { asset: "Fenty Gloss Bomb Promo", brand: "Fenty Beauty", expires: "Tomorrow, 12:00 PM", urgency: "text-[#ea580c]" },
               { asset: "Dior Fall Collection Hero", brand: "Dior", expires: "Oct 15, 2024", urgency: "text-muted" },
               { asset: "Halloween Makeup Tutorial", brand: "Global", expires: "Nov 01, 2024", urgency: "text-muted" },
               { asset: "Cyber Monday Teaser", brand: "Global", expires: "Nov 25, 2024", urgency: "text-muted" },
             ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 py-2 border-b border-line last:border-0 hover:bg-slate-50 cursor-pointer -mx-2 px-2 rounded transition-colors">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-bold text-ink truncate">{item.asset}</span>
                     <span className={`text-[10px] font-bold whitespace-nowrap ml-2 ${item.urgency}`}>{item.expires}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <Activity size={10} className="text-muted" />
                     <span className="text-[9px] font-medium text-muted uppercase tracking-wider">{item.brand}</span>
                  </div>
                </div>
             ))}
          </div>

          <button className="w-full mt-2 h-8 flex items-center justify-center gap-1.5 rounded border border-line text-[11px] font-bold text-ink hover:bg-slate-50 transition-colors">
            Manage Asset Schedules <ArrowRight size={12} />
          </button>
        </div>

      </div>
      
    </div>
  );
}
