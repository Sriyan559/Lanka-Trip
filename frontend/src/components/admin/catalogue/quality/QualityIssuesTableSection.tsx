"use client";

import React from "react";
import { Search, Filter, Save, RefreshCw, ChevronDown, User, AlertTriangle, Copy, Ban, Clock, ShieldAlert } from "lucide-react";

export function QualityIssuesTableSection() {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm mb-6 flex flex-col">
      <div className="p-4 border-b border-line">
        <h3 className="text-[14px] font-bold text-ink mb-4">Catalogue Quality Issues</h3>
        
        {/* Filter Row 1 */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
            <input 
              type="text" 
              placeholder="Search quality issues..." 
              className="w-full h-9 pl-9 pr-3 rounded border border-line text-[12px] focus:outline-none focus:border-blue-500"
            />
          </div>
          
          {["Issue Type", "Severity", "Status", "Category", "Brand", "Channel", "Owner", "Data Source", "Updated Date"].map(filter => (
            <button key={filter} className="h-9 px-3 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 whitespace-nowrap">
              {filter} <ChevronDown size={12} className="text-muted" />
            </button>
          ))}
          
          <button className="h-9 px-3 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5">
            <Filter size={12} /> More Filters
          </button>
          
          <div className="flex-1"></div>
          
          <button className="text-[11px] font-bold text-[#741d35] hover:underline px-2">Clear All</button>
          <button className="h-9 px-3 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5">
            <Save size={12} /> Save View
          </button>
          <button className="h-9 px-3 rounded bg-[#741d35] text-white text-[11px] font-bold hover:bg-[#5a1629] flex items-center gap-1.5">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
           {[
             { label: "Assigned to Me", icon: User, active: true },
             { label: "Critical", icon: AlertTriangle, active: false },
             { label: "Duplicate Conflict", icon: Copy, active: false },
             { label: "Publication Blocked", icon: Ban, active: false },
             { label: "SLA Breach", icon: Clock, active: false },
             { label: "Compliance Risk", icon: ShieldAlert, active: false },
           ].map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button key={i} className={`h-8 px-3 rounded-full text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors ${tab.active ? 'bg-[#741d35] text-white' : 'bg-slate-100 text-ink hover:bg-slate-200'}`}>
                  <Icon size={12} /> {tab.label}
                </button>
              );
           })}
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="border-b border-line bg-slate-50/50">
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted w-8"><input type="checkbox" className="rounded border-line" /></th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Case ID</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Issue Type</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Entity / Product</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Public ID / SKU</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Brand</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Category</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Channels</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Severity</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Business Impact</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Owner</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">SLA</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Status</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase">Updated At</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "QLT-2026-004831", type: "Possible Duplicate Product", product: "Radiance Vitamin C Serum", sku: "RAD-VITC-30ML", brand: "Estée Lauder", cat: "Skincare", channel: "Marketplace, Mobile App", sev: "High", sevColor: "text-[#dc2626] bg-red-50 border-red-100", impact: "Customer confusion", owner: "Elena Vance", sla: "18h", status: "Pending Merge Review", sColor: "text-[#ea580c]", date: "04 Aug 2026, 11:42 AM" },
              { id: "QLT-2026-004799", type: "Duplicate Barcode Conflict", product: "Luxe Silk Lipstick Ruby Red", sku: "PROD-2026-00911 / LUX-LIPS-R001", brand: "Chanel Beauty", cat: "Makeup", channel: "Marketplace", sev: "High", sevColor: "text-[#dc2626] bg-red-50 border-red-100", impact: "Wrong fulfillment", owner: "Marcus Lee", sla: "12h", status: "In Review", sColor: "text-[#0284c7]", date: "04 Aug 2026, 10:58 AM" },
              { id: "QLT-2026-004768", type: "Missing Mandatory Media", product: "Tokyo Brightening Essence", sku: "PROD-2026-00387 / TOK-ESS-50ML", brand: "Shiseido", cat: "Skincare", channel: "Marketplace, Mobile App", sev: "Medium", sevColor: "text-[#ea580c] bg-orange-50 border-orange-100", impact: "Poor conversion", owner: "Priya Kapoor", sla: "24h", status: "In Progress", sColor: "text-[#0284c7]", date: "04 Aug 2026, 10:21 AM" },
              { id: "QLT-2026-004731", type: "Classification Conflict", product: "Pure Glow Hair Oil", sku: "PROD-2026-00161 / PGO-HAIR-OIL", brand: "Luxe Distribution", cat: "Hair Care", channel: "Marketplace, B2B", sev: "Medium", sevColor: "text-[#ea580c] bg-orange-50 border-orange-100", impact: "Search mismatch", owner: "Elena Vance", sla: "24h", status: "Pending Review", sColor: "text-[#ea580c]", date: "04 Aug 2026, 09:45 AM" },
              { id: "QLT-2026-004702", type: "Publication Blocker", product: "Aqua Shield Sunscreen", sku: "PROD-2026-00144 / AQUA-SS-50", brand: "Neutrogena", cat: "Skincare", channel: "Marketplace, Mobile App", sev: "High", sevColor: "text-[#dc2626] bg-red-50 border-red-100", impact: "Not publishable", owner: "Marcus Lee", sla: "6h", status: "Escalated", sColor: "text-[#dc2626]", date: "04 Aug 2026, 09:12 AM" },
              { id: "QLT-2026-004690", type: "Incomplete Safety Data", product: "Matte Silk Lipstick", sku: "PROD-2026-00823 / MAT-LIPS-01", brand: "MAC Cosmetics", cat: "Makeup", channel: "Marketplace", sev: "Medium", sevColor: "text-[#ea580c] bg-orange-50 border-orange-100", impact: "Compliance risk", owner: "Priya Kapoor", sla: "36h", status: "New", sColor: "text-ink", date: "04 Aug 2026, 08:37 AM" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 w-8"><input type="checkbox" className="rounded border-line" /></td>
                <td className="py-3 px-3 text-[10px] font-bold text-[#741d35] hover:underline cursor-pointer">{row.id}</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink">{row.type}</td>
                <td className="py-3 px-3 text-[11px] font-semibold text-muted">{row.product}</td>
                <td className="py-3 px-3 text-[10px] font-medium text-muted">{row.sku}</td>
                <td className="py-3 px-3 text-[10px] font-semibold text-muted">{row.brand}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.cat}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.channel}</td>
                <td className="py-3 px-3">
                   <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${row.sevColor}`}>{row.sev}</span>
                </td>
                <td className="py-3 px-3 text-[11px] font-medium text-ink">{row.impact}</td>
                <td className="py-3 px-3 text-[11px] font-semibold text-ink">{row.owner}</td>
                <td className="py-3 px-3 text-[10px] font-bold text-ink">{row.sla}</td>
                <td className={`py-3 px-3 text-[10px] font-bold ${row.sColor}`}>{row.status}</td>
                <td className="py-3 px-3 text-[10px] font-semibold text-muted">{row.date}</td>
                <td className="py-3 px-3 text-right">
                  <button className="text-[9px] font-bold px-2.5 py-1 border border-[#741d35] text-[#741d35] rounded hover:bg-red-50 transition-colors">Open Case</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-line flex items-center justify-between">
        <span className="text-[11px] font-semibold text-muted">Showing 1 to 6 of 1,248 issues</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-muted hover:bg-slate-50">&lt;</button>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-[#741d35] text-white text-[11px] font-bold">1</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">2</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">3</button>
          <span className="px-1 text-muted">...</span>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-ink text-[11px] hover:bg-slate-50 font-medium">208</button>
          <button className="w-6 h-6 flex items-center justify-center rounded border border-line text-muted hover:bg-slate-50">&gt;</button>
          <div className="ml-2 flex items-center gap-1 text-[11px] font-medium text-ink border border-line rounded px-2 h-6">
            25 / page <ChevronDown size={12} className="text-muted ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
