"use client";

import React from "react";
import { Filter, Search, Download, Settings, RefreshCw, X } from "lucide-react";

export function ProductsTableSection() {
  return (
    <div className="bg-white rounded-lg border border-line p-0 shadow-sm flex flex-col">
      {/* Tabs */}
      <div className="flex items-center border-b border-line px-5 overflow-x-auto">
        {[
          { label: "All Products", count: "12,840", active: true },
          { label: "Active", count: "10,962" },
          { label: "Draft", count: "486" },
          { label: "Pending Approval", count: "312" },
          { label: "Approved", count: "10,150" },
          { label: "Published", count: "9,246" },
          { label: "Incomplete", count: "248" },
          { label: "Blocked", count: "28" },
          { label: "Archived", count: "1,128" },
        ].map(t => (
          <button key={t.label} className={`whitespace-nowrap px-4 py-3 text-[12px] font-semibold flex items-center gap-2 border-b-2 transition-colors ${t.active ? 'border-[#8b2c45] text-[#8b2c45]' : 'border-transparent text-muted hover:text-ink'}`}>
            {t.label}
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${t.active ? 'bg-[#8b2c45]/10 text-[#8b2c45]' : 'bg-slate-100 text-slate-500'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Advanced Filters (Simplified for now) */}
      <div className="p-5 border-b border-line">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input type="text" placeholder="Search by product, SKU, barcode, or ID..." className="w-full h-9 pl-9 pr-4 rounded bg-canvas border border-line text-[12px] focus:outline-none focus:border-[#8b2c45]" />
          </div>
          <button className="h-9 px-4 rounded border border-line text-[12px] font-semibold text-ink flex items-center gap-2 hover:bg-slate-50">
            <Filter size={14} /> More Filters
          </button>
          <button className="h-9 px-4 rounded text-[#8b2c45] font-semibold text-[12px] hover:bg-red-50">Clear All</button>
          <button className="h-9 px-4 rounded border border-line text-[12px] font-semibold text-ink hover:bg-slate-50">Save View</button>
          <button className="h-9 px-4 rounded bg-[#8b2c45] text-white text-[12px] font-semibold flex items-center gap-2 hover:bg-[#741d35]">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-muted mr-2">Quick Filters:</span>
          {["Assigned to Me", "Pending Approval", "High Risk", "Missing Information", "Duplicate Warning", "Missing Media", "No Inventory Link", "Publication Blocked"].map(f => (
            <span key={f} className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-100 rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap">
              {f} <X size={12} className="cursor-pointer hover:text-red-900" />
            </span>
          ))}
          <button className="text-[11px] text-blue-600 font-medium ml-2 whitespace-nowrap">Clear All</button>
        </div>
      </div>

      {/* Health Scorecard */}
      <div className="p-5 border-b border-line bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[12px] font-bold text-ink">Product Master Health Scorecard</h4>
          <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline">View full scorecard &rarr;</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { label: "Identity Completeness", score: 98 },
            { label: "Classification Quality", score: 94 },
            { label: "Brand Verification", score: 96 },
            { label: "Compliance Readiness", score: 89 },
            { label: "Variant Readiness", score: 91 },
            { label: "Media Readiness", score: 84 },
            { label: "Inventory Linkage", score: 90 },
            { label: "Publication Readiness", score: 88 },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-[10px] font-semibold text-muted mb-1 truncate">{item.label}</div>
              <div className="text-[13px] font-bold text-ink mb-1">{item.score}%</div>
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${item.score >= 90 ? 'bg-green-500' : 'bg-emerald-500'}`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line bg-canvas/50">
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Product</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Public ID</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">DB Product ID</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">SKU</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Barcode</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Brand</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Category</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Approval Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line hover:bg-slate-50">
              <td className="py-3 px-3 text-[12px] font-medium text-ink flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-200 rounded object-cover overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80" alt="" className="w-full h-full object-cover" />
                </div>
                Radiance Vitamin C Serum<br/><span className="text-[10px] text-muted font-normal">30 ml</span>
              </td>
              <td className="py-3 px-3 text-[11px] text-muted">PUB-00011234</td>
              <td className="py-3 px-3 text-[11px] text-muted">PRD-0091234</td>
              <td className="py-3 px-3 text-[11px] text-muted">RAD-VITC-30ML</td>
              <td className="py-3 px-3 text-[11px] text-muted">8901234567895</td>
              <td className="py-3 px-3 text-[11px] text-muted">Estée Lauder</td>
              <td className="py-3 px-3 text-[11px] text-muted">Skincare &gt; Serums</td>
              <td className="py-3 px-3 text-[11px] font-medium text-blue-600">Initial Review</td>
            </tr>
            {/* Add more placeholder rows here if needed */}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-line text-center text-[12px] text-muted">
        Showing 1 to 25 of 12,840 records
      </div>
    </div>
  );
}
