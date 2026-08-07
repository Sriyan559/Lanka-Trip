"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { SharedProgressList } from "../shared/SharedProgressList";

export function QualityBottomPanels() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Row 1: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Duplicate Product Candidates */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink">Duplicate Product Candidates</h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">View all</button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="w-[100px]">Candidate Pair</div>
               <div className="flex-1">Confidence</div>
               <div className="w-[70px]">Suggestion</div>
               <div className="w-[50px] text-right">Action</div>
            </div>
            {[
              { pair: "Radiance Vitamin C Serum", conf: "95%", sug: "Review", action: "Merge" },
              { pair: "Lux Silk Lipstick", conf: "90%", sug: "Review", action: "Merge" },
              { pair: "Pure Olive Oil Cl…", conf: "87%", sug: "Review", action: "Merge" },
              { pair: "Aqua Shield Sunscreen…", conf: "85%", sug: "Review", action: "Merge" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="w-[100px] font-bold text-ink truncate pr-2">{row.pair}</div>
                  <div className="flex-1 font-bold text-ink">{row.conf}</div>
                  <div className="w-[70px] text-muted">{row.sug}</div>
                  <div className="w-[50px] text-right text-[#741d35] font-bold hover:underline cursor-pointer">{row.action}</div>
               </div>
            ))}
            <div className="mt-2 pt-2">
               <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all 186 candidates <ChevronRight size={12} /></button>
            </div>
          </div>
        </div>

        {/* Incomplete Product Records */}
        <SharedProgressList
          title="Incomplete Product Records"
          items={[
            { label: "Missing regions", pct: 31, color: "bg-[#dc2626]" },
            { label: "Missing media", pct: 27, color: "bg-[#dc2626]" },
            { label: "Missing category", pct: 17, color: "bg-[#ea580c]" },
            { label: "Missing pricing", pct: 14, color: "bg-[#ea580c]" },
            { label: "Missing publication", pct: 11, color: "bg-[#f59e0b]" },
          ]}
          footerText="View incomplete records"
        />

        {/* Validation Failure Summary */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink">Validation Failure Summary</h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">View all</button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="flex-1">Failure Rule</div>
               <div className="w-[50px] text-center">Failures</div>
               <div className="w-[50px] text-right">% of total</div>
            </div>
            {[
              { rule: "Bar of Name (invalid)", count: 312, pct: "17.1%" },
              { rule: "Duplicate SKU detected", count: 248, pct: "13.6%" },
              { rule: "Invalid Ingredient Conflict", count: 192, pct: "10.5%" },
              { rule: "Missing alt text", count: 156, pct: "8.5%" },
              { rule: "Duplicate mapping rule", count: 124, pct: "6.8%" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="flex-1 font-semibold text-ink truncate pr-2">{row.rule}</div>
                  <div className="w-[50px] text-center font-bold text-ink">{row.count}</div>
                  <div className="w-[50px] text-right font-bold text-muted">{row.pct}</div>
               </div>
            ))}
            <div className="mt-2 pt-2">
               <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all validation failures <ChevronRight size={12} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Publication Readiness Impact */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink">Publication Readiness Impact</h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">View report</button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="flex-1">Channel</div>
               <div className="w-[40px] text-center">Eligible</div>
               <div className="w-[40px] text-center">Blocked</div>
               <div className="w-[60px] text-center">Missing Media</div>
               <div className="w-[40px] text-right">%</div>
            </div>
            {[
              { ch: "Online Marketplace", e: 6120, b: 248, m: 124, pct: "67.1%" },
              { ch: "Mobile App", e: 4100, b: 346, m: 186, pct: "44.8%" },
              { ch: "B2B Wholesale", e: 5890, b: 142, m: 78, pct: "64.4%" },
              { ch: "Partner Storefront", e: 3680, b: 112, m: 64, pct: "40.2%" },
              { ch: "Social Commerce", e: 4190, b: 1254, m: 384, pct: "45.8%" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="flex-1 font-semibold text-muted truncate pr-2">{row.ch}</div>
                  <div className="w-[40px] text-center font-bold text-ink">{row.e}</div>
                  <div className="w-[40px] text-center font-bold text-[#dc2626]">{row.b}</div>
                  <div className="w-[60px] text-center font-bold text-[#ea580c]">{row.m}</div>
                  <div className="w-[40px] text-right font-bold text-ink">{row.pct}</div>
               </div>
            ))}
            <div className="mt-2 pt-2">
               <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View readiness impact <ChevronRight size={12} /></button>
            </div>
          </div>
        </div>

        {/* Merge & Resolution Performance */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink">Merge & Resolution Performance</h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">Dashboard</button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Avg merge review time", value: "06:34:18", color: "text-ink" },
              { label: "Auto-merges approved", value: "312", color: "text-ink" },
              { label: "Manual merges", value: "186", color: "text-ink" },
              { label: "Rejected merges", value: "28", color: "text-[#dc2626]" },
              { label: "Resolved conflicts", value: "96", color: "text-ink" },
              { label: "Rollback rate", value: "4.2%", color: "text-[#ea580c]" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-line last:border-0">
                <span className="text-[11px] font-semibold text-muted">{item.label}</span>
                <span className={`text-[12px] font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2">
             <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View performance dashboard <ChevronRight size={12} /></button>
          </div>
        </div>

        {/* Quality Governance Summary */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-bold text-ink">Quality Governance Summary</h3>
            <button className="text-[10px] font-bold text-muted hover:text-ink">Dashboard</button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Total active rules", value: "258", color: "text-ink" },
              { label: "Blocking exceptions", value: "36", color: "text-[#dc2626]" },
              { label: "Coverage (products)", value: "92%", color: "text-[#059669]" },
              { label: "Leveraged rules", value: "94.2%", color: "text-[#059669]" },
              { label: "Open quality cases", value: "1,248", color: "text-ink" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-line last:border-0">
                <span className="text-[11px] font-semibold text-muted">{item.label}</span>
                <span className={`text-[12px] font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 rounded p-2">
              <span className="text-[11px] font-bold text-[#059669]">Success</span>
              <span className="text-[11px] font-bold text-[#059669]">94.2%</span>
            </div>
          </div>
          <div className="mt-3 pt-2">
             <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View governance dashboard <ChevronRight size={12} /></button>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Activity */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-[13px] font-bold text-ink">Recent Catalogue Quality Activity</h3>
           <button className="text-[11px] font-bold text-[#741d35] hover:underline">View full activity log <ChevronRight size={12} className="inline" /></button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
             <div className="w-[200px]">Activity</div>
             <div className="w-[160px]">Issue</div>
             <div className="w-[100px]">Action By</div>
             <div className="flex-1">Date & Time</div>
             <div className="w-[60px] text-right">Status</div>
          </div>
          {[
             { act: "Duplicate merge approved", issue: "QLT-2026-034821", by: "Elena Vance", time: "04 Aug 2026, 11:30 AM", status: "Merged", sColor: "text-[#059669]" },
             { act: "Missing media resolved", issue: "QLT-2026-034799", by: "Marcus Lee", time: "04 Aug 2026, 10:45 AM", status: "Resolved", sColor: "text-[#059669]" },
             { act: "Media added", issue: "QLT-2026-034768", by: "Priya Kapoor", time: "04 Aug 2026, 10:15 AM", status: "Fixed", sColor: "text-[#059669]" },
             { act: "Validation rule created", issue: "QLT-2026-034712", by: "Elena Vance", time: "04 Aug 2026, 09:50 AM", status: "Active", sColor: "text-[#0284c7]" },
             { act: "Publication blocker", issue: "QLT-2026-034691", by: "Marcus Lee", time: "04 Aug 2026, 09:30 AM", status: "Escalated", sColor: "text-[#dc2626]" },
          ].map((row, i) => (
             <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                <div className="w-[200px] font-semibold text-muted truncate pr-2">{row.act}</div>
                <div className="w-[160px] font-bold text-ink truncate pr-2">{row.issue}</div>
                <div className="w-[100px] text-muted truncate pr-2">{row.by}</div>
                <div className="flex-1 text-muted">{row.time}</div>
                <div className={`w-[60px] text-right font-bold ${row.sColor}`}>{row.status}</div>
             </div>
          ))}
        </div>
      </div>

    </div>
  );
}
