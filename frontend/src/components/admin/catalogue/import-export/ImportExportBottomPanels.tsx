"use client";

import React from "react";
import { SharedProgressList } from "../shared/SharedProgressList";
import { UploadCloud, CalendarClock, ArrowRight } from "lucide-react";

export function ImportExportBottomPanels() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Sync Status by Marketplace */}
      <SharedProgressList
        title="Sync Status by Marketplace"
        items={[
          { label: "Sephora Global API", pct: 98, color: "bg-[#059669]" },
          { label: "Amazon Beauty Gateway", pct: 94, color: "bg-[#059669]" },
          { label: "Ulta Wholesale Portal", pct: 88, color: "bg-[#059669]" },
          { label: "Tmall Global Cross-Border", pct: 82, color: "bg-[#0284c7]" },
          { label: "Zalora Fashion & Beauty", pct: 76, color: "bg-[#0284c7]" },
        ]}
        footerText="View full sync report"
      />

      {/* Recent Bulk Uploads */}
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

      {/* Upcoming Scheduled Jobs */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-bold text-ink flex items-center gap-2">
            <CalendarClock size={14} className="text-[#8b5cf6]" />
            Upcoming Scheduled Jobs
          </h3>
          <button className="text-[10px] font-bold text-muted hover:text-ink">Schedules</button>
        </div>
        
        <div className="flex flex-col gap-3">
            {[
              { job: "Nightly Inventory Sync", target: "All Marketplaces", time: "Today, 11:59 PM", urgency: "text-[#dc2626]" },
              { job: "Sephora Weekly Update", target: "Sephora Global API", time: "Tomorrow, 12:00 PM", urgency: "text-[#ea580c]" },
              { job: "Price Book Refresh", target: "PIM Integration", time: "Oct 15, 2024", urgency: "text-muted" },
              { job: "Holiday Price Update", target: "All Marketplaces", time: "Nov 01, 2024", urgency: "text-muted" },
              { job: "Cyber Monday Teaser", target: "All Marketplaces", time: "Nov 25, 2024", urgency: "text-muted" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1 py-2 border-b border-line last:border-0 hover:bg-slate-50 cursor-pointer -mx-2 px-2 rounded transition-colors">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-ink truncate">{item.job}</span>
                    <span className={`text-[10px] font-bold whitespace-nowrap ml-2 ${item.urgency}`}>{item.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-medium text-muted uppercase tracking-wider">{item.target}</span>
                </div>
              </div>
            ))}
        </div>

        <button className="w-full mt-2 h-8 flex items-center justify-center gap-1.5 rounded border border-line text-[11px] font-bold text-ink hover:bg-slate-50 transition-colors">
          Manage Schedules <ArrowRight size={12} />
        </button>
      </div>

    </div>
  );
}
