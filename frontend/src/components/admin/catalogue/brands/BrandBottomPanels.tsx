"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { SharedProgressList } from "../shared/SharedProgressList";

export function BrandBottomPanels() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Row 1: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Brand Eligibility by Channel */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <h3 className="text-[13px] font-bold text-ink mb-4">Brand Eligibility by Channel</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="w-1/3">Channel</div>
               <div className="w-1/6 text-right">Eligible</div>
               <div className="w-1/6 text-right">Partial</div>
               <div className="w-1/6 text-right">Not Eligible</div>
               <div className="w-1/6 text-right">Coverage</div>
            </div>
            {[
              { label: "Online Marketplace", e: 408, p: 18, n: 30, c: "91%" },
              { label: "Mobile App", e: 412, p: 24, n: 20, c: "94%" },
              { label: "B2B Wholesale Portal", e: 386, p: 32, n: 68, c: "79%" },
              { label: "Partner Storefront", e: 362, p: 36, n: 88, c: "75%" },
              { label: "Social Commerce", e: 340, p: 28, n: 118, c: "69%" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1 border-b border-line last:border-0">
                  <div className="w-1/3 font-semibold text-muted truncate pr-2">{row.label}</div>
                  <div className="w-1/6 text-right font-bold text-ink">{row.e}</div>
                  <div className="w-1/6 text-right font-bold text-ink">{row.p}</div>
                  <div className="w-1/6 text-right font-bold text-ink">{row.n}</div>
                  <div className="w-1/6 text-right font-bold text-ink">{row.c}</div>
               </div>
            ))}
            <div className="mt-2 pt-2">
               <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full report <ChevronRight size={12} /></button>
            </div>
          </div>
        </div>
        
        {/* Unauthorized Brand Use */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <h3 className="text-[13px] font-bold text-ink mb-4">Unauthorized Brand Use</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="w-[80px]">Incident</div>
               <div className="flex-1">Brand</div>
               <div className="w-[70px]">Channel</div>
               <div className="w-[60px]">Detected On</div>
               <div className="w-[40px] text-right">Risk</div>
            </div>
            {[
              { id: "UB-2026-0412", brand: "Pure Glow", channel: "Social Media", date: "04 Aug 2026", risk: "High", color: "text-[#dc2626]" },
              { id: "UB-2026-0407", brand: "Luxe Vita", channel: "Online Marketplace", date: "03 Aug 2026", risk: "Medium", color: "text-[#ea580c]" },
              { id: "UB-2026-0395", brand: "Bloom Lab", channel: "Mobile App", date: "02 Aug 2026", risk: "High", color: "text-[#dc2626]" },
              { id: "UB-2026-0393", brand: "K-Beauty Plus", channel: "Social Media", date: "02 Aug 2026", risk: "Medium", color: "text-[#ea580c]" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="w-[80px] font-semibold text-muted">{row.id}</div>
                  <div className="flex-1 font-bold text-ink truncate pr-2">{row.brand}</div>
                  <div className="w-[70px] text-muted truncate pr-2">{row.channel}</div>
                  <div className="w-[60px] text-muted">{row.date}</div>
                  <div className={`w-[40px] text-right font-bold ${row.color}`}>{row.risk}</div>
               </div>
            ))}
            <div className="mt-2 pt-2">
               <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all incidents <ChevronRight size={12} /></button>
            </div>
          </div>
        </div>

        {/* Duplicate Brand Candidates */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <h3 className="text-[13px] font-bold text-ink mb-4">Duplicate Brand Candidates</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="w-[80px]">Brand</div>
               <div className="flex-1">Similar to</div>
               <div className="w-[50px] text-center">Similarity</div>
               <div className="w-[40px] text-center">Risk</div>
               <div className="w-[50px] text-right">Action</div>
            </div>
            {[
              { b1: "Glow Cosmetics", b2: "Glow-Cosmetics", sim: "95%", risk: "High", rColor: "text-[#dc2626]" },
              { b1: "Pure Skin", b2: "PureSkin Labs", sim: "92%", risk: "High", rColor: "text-[#dc2626]" },
              { b1: "Luxe Vita", b2: "Luxe Vita Beauty", sim: "88%", risk: "Medium", rColor: "text-[#ea580c]" },
              { b1: "Beaute Lab", b2: "Beaute Lab.", sim: "87%", risk: "Medium", rColor: "text-[#ea580c]" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="w-[80px] font-bold text-ink truncate pr-2">{row.b1}</div>
                  <div className="flex-1 font-semibold text-muted truncate pr-2">{row.b2}</div>
                  <div className="w-[50px] text-center font-bold text-ink">{row.sim}</div>
                  <div className={`w-[40px] text-center font-bold ${row.rColor}`}>{row.risk}</div>
                  <div className="w-[50px] text-right text-[#741d35] font-bold hover:underline cursor-pointer">Review</div>
               </div>
            ))}
            <div className="mt-2 pt-2">
               <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all candidates <ChevronRight size={12} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.5fr] gap-6">
        
        {/* Brand Compliance & Authenticity */}
        <SharedProgressList
          title="Brand Compliance & Authenticity"
          items={[
            { label: "KYC Verification Rate", pct: 94, color: "bg-[#059669]" },
            { label: "Certificate Validity", pct: 92, color: "bg-[#059669]" },
            { label: "Authenticity Coverage", pct: 90, color: "bg-[#059669]" },
            { label: "Regulatory Compliance", pct: 87, color: "bg-[#059669]" },
            { label: "Restricted Ingredient Check", pct: 86, color: "bg-[#059669]" },
          ]}
          footerText="View compliance report"
        />

        {/* Brand Media & SEO Readiness */}
        <SharedProgressList
          title="Brand Media & SEO Readiness"
          items={[
            { label: "Image Completeness", pct: 84, color: "bg-[#059669]" },
            { label: "Video Availability", pct: 84, color: "bg-[#059669]" },
            { label: "SEO Metadata Coverage", pct: 78, color: "bg-[#0284c7]" },
            { label: "Content Quality Score", pct: 74, color: "bg-[#0284c7]" },
            { label: "Rich Media Score", pct: 69, color: "bg-[#0284c7]" },
          ]}
          footerText="View media report"
        />

        {/* Brand & Supplier Relationship Matrix */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-[13px] font-bold text-ink">Brand & Supplier Relationship Matrix</h3>
             <button className="text-[11px] font-bold text-[#741d35] hover:underline">View full matrix <ChevronRight size={12} className="inline" /></button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="w-[100px]">Supplier</div>
               <div className="flex-1">Total Brands</div>
               <div className="w-[50px] text-center">Active</div>
               <div className="w-[50px] text-center">At Risk</div>
               <div className="w-[60px] text-right">Coverage</div>
            </div>
            {[
              { supplier: "Luxe Distribution Pte Ltd", brands: 124, active: 118, risk: 6, cov: "95%" },
              { supplier: "Glow Global Exports", brands: 86, active: 78, risk: 8, cov: "91%" },
              { supplier: "Shiseido Global", brands: 42, active: 42, risk: 0, cov: "100%" },
              { supplier: "Beauty Asia Pte Ltd", brands: 36, active: 30, risk: 6, cov: "83%" },
              { supplier: "Others", brands: 198, active: 170, risk: 28, cov: "86%" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="w-[100px] font-semibold text-muted truncate pr-2">{row.supplier}</div>
                  <div className="flex-1 font-bold text-ink">{row.brands}</div>
                  <div className="w-[50px] text-center font-bold text-ink">{row.active}</div>
                  <div className={`w-[50px] text-center font-bold ${row.risk > 0 ? 'text-[#dc2626]' : 'text-ink'}`}>{row.risk}</div>
                  <div className="w-[60px] text-right font-bold text-ink">{row.cov}</div>
               </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Brand Activity */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-[13px] font-bold text-ink">Recent Brand Activity</h3>
             <button className="text-[11px] font-bold text-[#741d35] hover:underline">View full activity log <ChevronRight size={12} className="inline" /></button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="w-[140px]">Activity</div>
               <div className="w-[100px]">Brand</div>
               <div className="w-[100px]">Action By</div>
               <div className="flex-1">Date & Time</div>
               <div className="w-[60px] text-right">Result</div>
            </div>
            {[
               { act: "Brand authorized", brand: "Estée Lauder", by: "Elena Vance", time: "04 Aug 2026, 10:25 AM", res: "Success", rColor: "text-[#059669]" },
               { act: "Authorization renewed", brand: "Tokyo Beauty", by: "Marcus Lee", time: "04 Aug 2026, 11:27 AM", res: "Success", rColor: "text-[#059669]" },
               { act: "New brand created", brand: "Pure Glow", by: "Priya Kapoor", time: "04 Aug 2026, 09:40 AM", res: "Success", rColor: "text-[#059669]" },
               { act: "Verification completed", brand: "Shiseido", by: "Elena Vance", time: "04 Aug 2026, 08:55 AM", res: "Success", rColor: "text-[#059669]" },
               { act: "Duplicate flagged", brand: "Glow Cosmetics", by: "Marcus Lee", time: "04 Aug 2026, 10:10 AM", res: "Flagged", rColor: "text-[#dc2626]" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="w-[140px] font-semibold text-muted truncate pr-2">{row.act}</div>
                  <div className="w-[100px] font-bold text-ink truncate pr-2">{row.brand}</div>
                  <div className="w-[100px] text-muted truncate pr-2">{row.by}</div>
                  <div className="flex-1 text-muted">{row.time}</div>
                  <div className={`w-[60px] text-right font-bold ${row.rColor}`}>{row.res}</div>
               </div>
            ))}
          </div>
        </div>

        {/* Recent Approvals & Audit Events */}
        <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-[13px] font-bold text-ink">Recent Approvals & Audit Events</h3>
             <button className="text-[11px] font-bold text-[#741d35] hover:underline">View full audit trail <ChevronRight size={12} className="inline" /></button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-[10px] font-bold text-muted border-b border-line pb-2 mb-1">
               <div className="w-[160px]">Event</div>
               <div className="w-[100px]">Brand</div>
               <div className="w-[100px]">Reviewer</div>
               <div className="flex-1">Date & Time</div>
               <div className="w-[60px] text-right">Result</div>
            </div>
            {[
               { ev: "Brand Authorization Approved", brand: "Estée Lauder", rev: "Elena Vance", time: "04 Aug 2026, 10:25 AM", res: "Approved", rColor: "text-[#059669]" },
               { ev: "Import Authorization Approved", brand: "Tokyo Beauty", rev: "Marcus Lee", time: "04 Aug 2026, 09:40 AM", res: "Approved", rColor: "text-[#059669]" },
               { ev: "Brand Approval", brand: "Chanel Beauty", rev: "Priya Kapoor", time: "04 Aug 2026, 08:55 AM", res: "Approved", rColor: "text-[#059669]" },
               { ev: "Compliance Review", brand: "Innisfree", rev: "Elena Vance", time: "04 Aug 2026, 10:10 AM", res: "Failed", rColor: "text-[#dc2626]" },
            ].map((row, i) => (
               <div key={i} className="flex items-center text-[11px] py-1.5 border-b border-line last:border-0">
                  <div className="w-[160px] font-semibold text-muted truncate pr-2">{row.ev}</div>
                  <div className="w-[100px] font-bold text-ink truncate pr-2">{row.brand}</div>
                  <div className="w-[100px] text-muted truncate pr-2">{row.rev}</div>
                  <div className="flex-1 text-muted">{row.time}</div>
                  <div className={`w-[60px] text-right font-bold ${row.rColor}`}>{row.res}</div>
               </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
