"use client";

import React from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SharedProgressList } from "../shared/SharedProgressList";

export function CategoryBottomPanels() {
  const HEALTH_SCORECARD = [
    { label: "Hierarchy Integrity", pct: 92, color: "bg-[#059669]" },
    { label: "Attribute Completeness", pct: 86, color: "bg-[#059669]" },
    { label: "Product Mapping Quality", pct: 88, color: "bg-[#059669]" },
    { label: "Channel Eligibility", pct: 90, color: "bg-[#059669]" },
    { label: "Compliance Readiness", pct: 82, color: "bg-[#d97706]" },
    { label: "SEO Readiness", pct: 78, color: "bg-[#d97706]" },
    { label: "Publication Readiness", pct: 92, color: "bg-[#059669]" },
    { label: "Audit Compliance", pct: 100, color: "bg-[#059669]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Category Health Scorecard */}
        <div className="bg-white rounded-xl border border-line flex flex-col p-5 shadow-sm">
          <h3 className="text-[13px] font-bold text-ink mb-4">Category Health Scorecard</h3>
          <SharedProgressList items={HEALTH_SCORECARD} layout="vertical" hasCardWrapper={false} />
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View detailed scorecard <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Required Attribute Coverage */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Required Attribute Coverage</h3>
            <span className="text-[10px] text-muted">Top Categories</span>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Category</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Coverage</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Face Serum</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">92%</td>
                  <td className="py-2.5 px-4 text-center"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Excellent</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Moisturizer</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">86%</td>
                  <td className="py-2.5 px-4 text-center"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Good</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Cleanser</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">75%</td>
                  <td className="py-2.5 px-4 text-center"><span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Needs Work</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Toner</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">60%</td>
                  <td className="py-2.5 px-4 text-center"><span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Needs Work</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Body Care</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">88%</td>
                  <td className="py-2.5 px-4 text-center"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Good</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all attribute coverage <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Category Product Coverage */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Category Product Coverage</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Level</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Categories</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Active Products</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Avg per Category</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">1</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">8</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">12,450</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">1,556</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">2</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">32</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">8,140</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">254</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">3</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">96</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">4,860</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">51</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">4</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">210</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">2,340</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">11</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">5</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">84</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">1,120</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">13</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full coverage report <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Channel Eligibility Matrix */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Channel Eligibility Matrix</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Channels</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Eligible</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Partial</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Not Eligible</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Online Marketplace</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">132</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">8</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">8</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Mobile App</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">128</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">6</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">14</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">B2B Wholesale</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">120</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">10</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">18</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Partner Storefront</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">110</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">12</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">26</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">Social Commerce</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink text-right">98</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">16</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted text-right">34</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full matrix <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Duplicate Category Candidates */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Duplicate Category Candidates</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Category A</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Category B</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Similarity</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Risk</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Products</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink whitespace-nowrap">Facial Serum</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted whitespace-nowrap">Face Serum</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink">95%</td>
                  <td className="py-2.5 px-4"><span className="text-[9px] font-bold text-red-700">High</span></td>
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">846</td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    <button className="text-[10px] font-bold text-ink hover:underline mr-2">Compare</button>
                    <button className="text-[10px] font-bold text-[#741d35] hover:underline mr-2">Merge</button>
                    <button className="text-[10px] font-bold text-muted hover:underline">Ignore</button>
                  </td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink whitespace-nowrap">Moisturizing Cream</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted whitespace-nowrap">Moisturizer</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink">90%</td>
                  <td className="py-2.5 px-4"><span className="text-[9px] font-bold text-amber-700">Medium</span></td>
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">554</td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    <button className="text-[10px] font-bold text-ink hover:underline mr-2">Compare</button>
                    <button className="text-[10px] font-bold text-[#741d35] hover:underline mr-2">Merge</button>
                    <button className="text-[10px] font-bold text-muted hover:underline">Ignore</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink whitespace-nowrap">Cleansing Foam</td>
                  <td className="py-2.5 px-4 text-[11px] text-muted whitespace-nowrap">Cleanser</td>
                  <td className="py-2.5 px-4 text-[11px] font-bold text-ink">88%</td>
                  <td className="py-2.5 px-4"><span className="text-[9px] font-bold text-green-700">Low</span></td>
                  <td className="py-2.5 px-4 text-[11px] font-medium text-ink">320</td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    <button className="text-[10px] font-bold text-ink hover:underline mr-2">Compare</button>
                    <button className="text-[10px] font-bold text-[#741d35] hover:underline mr-2">Merge</button>
                    <button className="text-[10px] font-bold text-muted hover:underline">Ignore</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all duplicate candidates <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Uncategorized & Misclassified Products */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Uncategorized & Misclassified Products</h3>
            <span className="text-[10px] text-muted">Queue Summary</span>
          </div>
          <div className="flex-1 p-4 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-[20px] font-bold text-ink">22</span>
              <span className="text-[10px] font-bold text-red-600 mt-1 uppercase flex justify-center items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>High</span>
              <span className="text-[10px] text-muted mt-2">Uncategorized Products</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-bold text-ink">14</span>
              <span className="text-[10px] font-bold text-amber-600 mt-1 uppercase flex justify-center items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>Medium</span>
              <span className="text-[10px] text-muted mt-2">Misclassified Products</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-bold text-ink">8</span>
              <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase flex justify-center items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>Low</span>
              <span className="text-[10px] text-muted mt-2">Needs Reassignment</span>
            </div>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full queue <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* SEO & Merchandising Readiness */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">SEO & Merchandising Readiness</h3>
          </div>
          <div className="flex-1 p-4 flex items-center justify-around text-center">
             <div className="flex flex-col">
              <span className="text-[24px] font-bold text-ink">118</span>
              <span className="text-[10px] font-bold text-green-600 mt-1 uppercase">80%</span>
              <span className="text-[10px] font-bold text-muted mt-2">SEO Ready</span>
            </div>
             <div className="flex flex-col">
              <span className="text-[24px] font-bold text-ink">22</span>
              <span className="text-[10px] font-bold text-amber-600 mt-1 uppercase">15%</span>
              <span className="text-[10px] font-bold text-muted mt-2">Partial</span>
            </div>
             <div className="flex flex-col">
              <span className="text-[24px] font-bold text-ink">8</span>
              <span className="text-[10px] font-bold text-red-600 mt-1 uppercase">5%</span>
              <span className="text-[10px] font-bold text-muted mt-2">Not Ready</span>
            </div>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View SEO recommendations <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Recent Category Activity */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Recent Category Activity</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[300px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Action</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Category</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">User</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Date & Time</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Result</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Category Updated</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Face Serum</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Elena Vance</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 12:45 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Attributes Updated</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Moisturizer</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Marcus Lee</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 11:15 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Category Created</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Toner</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Priya Kapoor</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">03 Aug 2026, 01:10 PM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full activity log <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Category Compliance Rule Matrix */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Category Compliance Rule Matrix</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Rule</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Affected Categories</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Severity</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Status</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Compliance Rate</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-medium whitespace-nowrap">Vitamin C Disclosure Rule</td>
                  <td className="py-2 px-4 font-bold text-ink text-right">48</td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-red-700 uppercase">High</span></td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-green-700 uppercase">Active</span></td>
                  <td className="py-2 px-4 font-bold text-ink text-right">92%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-medium whitespace-nowrap">Ingredient Safety Rule</td>
                  <td className="py-2 px-4 font-bold text-ink text-right">120</td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-red-700 uppercase">High</span></td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-green-700 uppercase">Active</span></td>
                  <td className="py-2 px-4 font-bold text-ink text-right">88%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-medium whitespace-nowrap">Channel Mapping Rule</td>
                  <td className="py-2 px-4 font-bold text-ink text-right">96</td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-amber-700 uppercase">Medium</span></td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-green-700 uppercase">Active</span></td>
                  <td className="py-2 px-4 font-bold text-ink text-right">95%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-medium whitespace-nowrap">SEO Metadata Rule</td>
                  <td className="py-2 px-4 font-bold text-ink text-right">84</td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-amber-700 uppercase">Medium</span></td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-green-700 uppercase">Active</span></td>
                  <td className="py-2 px-4 font-bold text-ink text-right">86%</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-ink font-medium whitespace-nowrap">Attribute Completeness Rule</td>
                  <td className="py-2 px-4 font-bold text-ink text-right">132</td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-red-700 uppercase">High</span></td>
                  <td className="py-2 px-4"><span className="text-[9px] font-bold text-green-700 uppercase">Active</span></td>
                  <td className="py-2 px-4 font-bold text-ink text-right">90%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all compliance rules <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Mapping / Taxonomy Governance Summary */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Mapping / Taxonomy Governance Summary</h3>
          </div>
          <div className="flex-1 p-4">
             <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted mb-1">Total Mapping Rules</span>
                  <span className="text-[20px] font-bold text-ink">186</span>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit mx-auto mt-1">Active</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted mb-1">Orphan Categories</span>
                  <span className="text-[20px] font-bold text-ink">8</span>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded w-fit mx-auto mt-1">Review</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted mb-1">Broken Mappings</span>
                  <span className="text-[20px] font-bold text-ink">6</span>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded w-fit mx-auto mt-1">High</span>
                </div>
             </div>
             
             <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-ink">Mapping Quality Trend (Last 30 Days)</span>
                <span className="text-[16px] font-bold text-green-600">91%</span>
             </div>
             {/* Fake Line Chart */}
             <div className="h-[60px] w-full flex items-end justify-between border-b border-line pb-1 relative">
                <div className="absolute inset-0 z-0">
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full stroke-[#3b82f6] fill-none" strokeWidth="2">
                    <path d="M0 25 L10 20 L20 22 L30 15 L40 18 L50 10 L60 12 L70 5 L80 8 L90 2 L100 5" />
                  </svg>
                </div>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="text-[8px] text-muted z-10">Jul {6 + (i*3)}</div>
                ))}
             </div>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View governance dashboard <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Recent Approvals & Audit Events */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line">
            <h3 className="text-[13px] font-bold text-ink">Recent Approvals & Audit Events</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[300px]">
              <thead>
                <tr className="border-b border-line bg-slate-50">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Event</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Category</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Reviewer</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Date & Time</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Result</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Category Approval</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Face Serum</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Elena Vance</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 10:30 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Attribute Change Approval</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Moisturizer</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Marcus Lee</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">04 Aug 2026, 04:20 PM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Bulk Mapping Approval</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Body Care</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Priya Kapoor</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">03 Aug 2026, 11:10 AM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Approved</span></td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-ink font-semibold whitespace-nowrap">Compliance Review</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">Cleanser</td>
                  <td className="py-2 px-4 text-ink whitespace-nowrap">Elena Vance</td>
                  <td className="py-2 px-4 text-muted whitespace-nowrap">02 Aug 2026, 03:45 PM</td>
                  <td className="py-2 px-4 text-right"><span className="text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">Passed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full audit trail <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

    </div>
  );
}
