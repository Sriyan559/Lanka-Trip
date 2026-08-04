"use client";

import React from "react";
import { AlertCircle, ChevronRight, FileX, ImageMinus, Copy, ShieldAlert, ListTree, CheckCircle2 } from "lucide-react";

export function QualityAndReadinessSection() {
  return (
    <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
      <h3 className="text-[13px] font-bold text-ink mb-6">Catalogue Quality & Data Readiness</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Incomplete Product Records", value: 248, risk: "High", color: "text-red-500", bg: "bg-red-50", icon: FileX },
          { label: "Missing Required Media", value: 124, risk: "Medium", color: "text-amber-500", bg: "bg-amber-50", icon: ImageMinus },
          { label: "Duplicate Product Risks", value: 36, risk: "Medium", color: "text-amber-500", bg: "bg-amber-50", icon: Copy },
          { label: "Publication Blockers", value: 22, risk: "High", color: "text-red-500", bg: "bg-red-50", icon: ShieldAlert },
        ].map((item, i) => (
          <div key={i} className="border border-line rounded p-3 bg-slate-50/50">
            <div className="flex items-start gap-2 mb-2">
              <item.icon size={14} className={`mt-0.5 ${item.color}`} />
              <div className="text-[11px] font-semibold text-muted leading-tight flex-1">{item.label}</div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-lg font-bold text-ink">{item.value}</span>
              <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${item.bg} ${item.color}`}>
                {item.risk}
              </span>
            </div>
            <div className="mt-2 text-right">
              <button className="text-[10px] text-blue-600 font-semibold hover:underline">View all</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Completeness Summary */}
        <div className="col-span-1 lg:col-span-2">
          <h4 className="text-[12px] font-bold text-ink mb-4">Product Completeness Summary</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {[
              { label: "Identity", score: 92 },
              { label: "Classification", score: 85 },
              { label: "Brand", score: 94 },
              { label: "Ingredients", score: 80 },
              { label: "Safety Information", score: 90 },
              { label: "Variants", score: 80 },
              { label: "Media", score: 84 },
              { label: "Regulatory Data", score: 87 },
              { label: "Pricing", score: 82 },
              { label: "Inventory Linkage", score: 91 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[11px] text-muted w-24 truncate">{item.label}</div>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.score >= 90 ? 'bg-green-500' : item.score >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${item.score}%` }} />
                </div>
                <div className="text-[11px] font-bold text-ink w-8 text-right">{item.score}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage */}
        <div className="col-span-1 border-l border-line pl-8">
          <div className="mb-6">
            <h4 className="text-[12px] font-bold text-ink mb-3">Category Coverage</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Total Categories</span>
                <span className="font-bold text-ink">486</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Active Categories</span>
                <span className="font-bold text-ink">438</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Empty Categories</span>
                <span className="font-bold text-ink text-amber-600">24</span>
              </div>
            </div>
            <button className="text-[10px] text-[#8b2c45] font-semibold hover:underline mt-2 flex items-center gap-1">
              View all categories <ChevronRight size={12} />
            </button>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-ink mb-3">Brand Coverage</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Total Brands</span>
                <span className="font-bold text-ink">486</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Verified Brands</span>
                <span className="font-bold text-ink">438</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Missing Authorization</span>
                <span className="font-bold text-ink text-red-600">14</span>
              </div>
            </div>
            <button className="text-[10px] text-[#8b2c45] font-semibold hover:underline mt-2 flex items-center gap-1">
              Manage brand authorizations <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
