"use client";

import React from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SharedProgressList } from "../shared/SharedProgressList";

export function BrandBottomPanels() {
  const SCORECARD = [
    { label: "Verification Coverage", pct: 92, color: "bg-[#059669]" },
    { label: "Authorization Readiness", pct: 88, color: "bg-[#059669]" },
    { label: "Supplier Mapping", pct: 90, color: "bg-[#059669]" },
    { label: "Product Coverage", pct: 86, color: "bg-[#059669]" },
    { label: "Channel Readiness", pct: 82, color: "bg-[#d97706]" },
    { label: "Media / SEO Readiness", pct: 90, color: "bg-[#059669]" },
    { label: "Duplicate Control", pct: 74, color: "bg-[#d97706]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SharedProgressList 
          title="Brand Health Scorecard" 
          items={SCORECARD} 
          layout="vertical"
          footerText="View detailed scorecard"
        />

        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Product Coverage by Brand</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Brand</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Active Products</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Coverage</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Estée Lauder</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">428</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">92%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Chanel Beauty</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">320</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">95%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Shiseido</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">210</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">85%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Innisfree</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">156</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">64%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">Tokyo Beauty</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">84</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">70%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full report <ArrowRight size={12} /></button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-line flex flex-col p-6 shadow-sm">
          <h3 className="text-[13px] font-bold text-ink mb-6">Brand Readiness Distribution</h3>
          <div className="flex flex-col items-center justify-center flex-1">
             <div className="relative w-32 h-32 mb-6">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="6"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#059669" strokeWidth="6" strokeDasharray="85 15" strokeDashoffset="0"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="6" strokeDasharray="5 95" strokeDashoffset="-85"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#dc2626" strokeWidth="6" strokeDasharray="4 96" strokeDashoffset="-90"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-ink">486</span>
                  <span className="text-[9px] text-muted font-bold uppercase mt-1 text-center">Total<br/>Brands</span>
                </div>
             </div>
             <div className="w-full space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-600"></span><span className="text-muted">Verified</span></div>
                   <span className="font-bold text-ink">412 <span className="text-muted font-normal">(84.8%)</span></span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span className="text-muted">Pending</span></div>
                   <span className="font-bold text-ink">24 <span className="text-muted font-normal">(4.9%)</span></span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-700"></span><span className="text-muted">Conditional</span></div>
                   <span className="font-bold text-ink">18 <span className="text-muted font-normal">(3.7%)</span></span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span><span className="text-muted">Unauthorized</span></div>
                   <span className="font-bold text-ink">9 <span className="text-muted font-normal">(1.9%)</span></span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-500"></span><span className="text-muted">Expired</span></div>
                   <span className="font-bold text-ink">6 <span className="text-muted font-normal">(1.2%)</span></span>
                </div>
             </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-center">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center justify-center w-full gap-1">View details <ArrowRight size={12} /></button>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand Eligibility by Channel */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-ink mb-4">Brand Eligibility by Channel</h3>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase">Channel</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-right">Eligible</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-right">Partial</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-right">Not Elig.</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-right">Coverage</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">Online Marketplace</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">408</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">18</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">30</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">91%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">Mobile App</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">412</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">24</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">20</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">94%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">B2B Wholesale Portal</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">386</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">32</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">68</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">79%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">Partner Storefront</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">362</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">36</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">88</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">75%</td>
                </tr>
                <tr>
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">Social Commerce</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">340</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">28</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">118</td>
                  <td className="py-2 px-1 font-bold text-ink text-right">69%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full report <ArrowRight size={12} /></button>
          </div>
        </div>
        
        {/* Unauthorized Brand Use */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-ink mb-4">Unauthorized Brand Use</h3>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase">Incident</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase">Brand</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase">Channel</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-right">Detected On</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-right">Risk</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">UB-2026-0412</td>
                  <td className="py-2 px-1 font-bold text-ink">Pure Glow</td>
                  <td className="py-2 px-1 font-medium text-muted">Social Media</td>
                  <td className="py-2 px-1 font-medium text-muted text-right">04 Aug 2026</td>
                  <td className="py-2 px-1 text-right"><span className="text-red-700 font-bold">High</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">UB-2026-0407</td>
                  <td className="py-2 px-1 font-bold text-ink">Luxe Vita</td>
                  <td className="py-2 px-1 font-medium text-muted">Online Marketplace</td>
                  <td className="py-2 px-1 font-medium text-muted text-right">03 Aug 2026</td>
                  <td className="py-2 px-1 text-right"><span className="text-amber-700 font-bold">Medium</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">UB-2026-0395</td>
                  <td className="py-2 px-1 font-bold text-ink">Bloom Lab</td>
                  <td className="py-2 px-1 font-medium text-muted">Mobile App</td>
                  <td className="py-2 px-1 font-medium text-muted text-right">02 Aug 2026</td>
                  <td className="py-2 px-1 text-right"><span className="text-red-700 font-bold">High</span></td>
                </tr>
                <tr>
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">UB-2026-0393</td>
                  <td className="py-2 px-1 font-bold text-ink">K-Beauty Plus</td>
                  <td className="py-2 px-1 font-medium text-muted">Social Media</td>
                  <td className="py-2 px-1 font-medium text-muted text-right">02 Aug 2026</td>
                  <td className="py-2 px-1 text-right"><span className="text-amber-700 font-bold">Medium</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all incidents <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Duplicate Brand Candidates */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-ink mb-4">Duplicate Brand Candidates</h3>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase">Brand</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase">Similar to</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-center">Similarity</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-center">Risk</th>
                  <th className="py-2 px-1 text-[10px] font-bold text-muted uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-bold text-ink whitespace-nowrap">Glow Cosmetics</td>
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">Glow-Cosmetics</td>
                  <td className="py-2 px-1 font-bold text-ink text-center">95%</td>
                  <td className="py-2 px-1 text-center"><span className="text-red-700 font-bold">High</span></td>
                  <td className="py-2 px-1 text-right"><button className="text-[10px] font-bold text-[#741d35] hover:underline">Review</button></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-bold text-ink whitespace-nowrap">Pure Skin</td>
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">PureSkin Labs</td>
                  <td className="py-2 px-1 font-bold text-ink text-center">92%</td>
                  <td className="py-2 px-1 text-center"><span className="text-red-700 font-bold">High</span></td>
                  <td className="py-2 px-1 text-right"><button className="text-[10px] font-bold text-[#741d35] hover:underline">Review</button></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-1 font-bold text-ink whitespace-nowrap">Luxe Vita</td>
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">Luxe Vita Beauty</td>
                  <td className="py-2 px-1 font-bold text-ink text-center">88%</td>
                  <td className="py-2 px-1 text-center"><span className="text-amber-700 font-bold">Medium</span></td>
                  <td className="py-2 px-1 text-right"><button className="text-[10px] font-bold text-[#741d35] hover:underline">Review</button></td>
                </tr>
                <tr>
                  <td className="py-2 px-1 font-bold text-ink whitespace-nowrap">Beaute Lab</td>
                  <td className="py-2 px-1 font-semibold text-muted whitespace-nowrap">Beaute Lab.</td>
                  <td className="py-2 px-1 font-bold text-ink text-center">87%</td>
                  <td className="py-2 px-1 text-center"><span className="text-amber-700 font-bold">Medium</span></td>
                  <td className="py-2 px-1 text-right"><button className="text-[10px] font-bold text-[#741d35] hover:underline">Review</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all candidates <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recent Brand Activity */}
        <div className="bg-white rounded-xl border border-line flex flex-col p-6 shadow-sm overflow-hidden">
          <h3 className="text-[13px] font-bold text-ink mb-4">Recent Brand Activity</h3>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[300px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Activity</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Brand</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Action By</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Date & Time</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Result</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Brand updated</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Estée Lauder</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Elena Vance</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 10:25 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Success</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Authorization renewed</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Tokyo Beauty</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Elena Vance</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 09:40 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Success</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Verification completed</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Pure Glow</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Priya Kapoor</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 08:55 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Success</span></td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Duplicate flagged</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Shiseido</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Marcus Lee</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 08:33 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded">Flagged</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full activity log <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Recent Approvals & Audit Events */}
        <div className="bg-white rounded-xl border border-line flex flex-col p-6 shadow-sm overflow-hidden">
          <h3 className="text-[13px] font-bold text-ink mb-4">Recent Approvals & Audit Events</h3>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[300px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Event</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Brand</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Reviewer</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Date & Time</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Result</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Brand Authorization Approved</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Tokyo Beauty</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Brand Authorization</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">22 Aug 2036, 10:25 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Import Authorization Approved</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Estée Lauder</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Elena Vance</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 09:40 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Brand Approval</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Chanel Beauty</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Priya Kapoor</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 08:55 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Compliance Review</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Innisfree</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Elena Vance</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 10:10 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Passed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full audit trail <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

    </div>
  );
}
