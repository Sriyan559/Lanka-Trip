"use client";

import React from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SharedProgressList } from "../shared/SharedProgressList";

export function AttributeBottomPanels() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attribute Health Scorecard */}
        <SharedProgressList
          title="Attribute Health Scorecard"
          items={[
            { label: "Completeness", pct: 91, color: "bg-[#059669]" },
            { label: "Validation Accuracy", pct: 88, color: "bg-[#059669]" },
            { label: "Variant Readiness", pct: 96, color: "bg-[#059669]" },
            { label: "Category Coverage", pct: 86, color: "bg-[#059669]" },
            { label: "Channel Compliance", pct: 82, color: "bg-[#d97706]" },
            { label: "Media Mapping", pct: 84, color: "bg-[#059669]" },
            { label: "Publication Readiness", pct: 87, color: "bg-[#059669]" },
          ]}
          footerText="View full scorecard"
        />

        {/* Attribute Value Management */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col">
          <h3 className="text-[13px] font-bold text-ink mb-4">Attribute Value Management</h3>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
               <span className="text-[20px] font-bold text-ink">12,840</span>
               <span className="text-[10px] text-muted">Total Values</span>
            </div>
            <div className="flex flex-col text-center">
               <span className="text-[20px] font-bold text-red-600">248</span>
               <span className="text-[10px] text-muted">Missing Values</span>
            </div>
            <div className="flex flex-col text-center">
               <span className="text-[20px] font-bold text-amber-600">36</span>
               <span className="text-[10px] text-muted">Normalization Issues</span>
            </div>
            <div className="flex flex-col text-right">
               <span className="text-[20px] font-bold text-amber-600">92</span>
               <span className="text-[10px] text-muted">Orphan Values</span>
            </div>
          </div>
          <h4 className="text-[11px] font-bold text-muted uppercase mb-2">Top Attributes by Missing Values</h4>
          <div className="flex-1">
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">SPF Level</span>
               <span className="font-bold text-red-600">42</span>
               <span className="text-muted">25%</span>
            </div>
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">Hair Concern</span>
               <span className="font-bold text-red-600">48</span>
               <span className="text-muted">18%</span>
            </div>
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">Fragrance Type</span>
               <span className="font-bold text-red-600">36</span>
               <span className="text-muted">14%</span>
            </div>
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">Shade Name</span>
               <span className="font-bold text-red-600">24</span>
               <span className="text-muted">10%</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View value quality report <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Category Attribute Template Matrix */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Category Attribute Template Matrix</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Category</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Req. Attr.</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Coverage</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Compliant</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Issues</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Face Serum</td>
                  <td className="py-2.5 px-4 text-right">42</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">92%</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">38</td>
                  <td className="py-2.5 px-4 font-bold text-red-600 text-right">4</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Moisturizer</td>
                  <td className="py-2.5 px-4 text-right">45</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">88%</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">32</td>
                  <td className="py-2.5 px-4 font-bold text-red-600 text-right">6</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Lipstick</td>
                  <td className="py-2.5 px-4 text-right">38</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">86%</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">36</td>
                  <td className="py-2.5 px-4 font-bold text-red-600 text-right">2</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Shampoo</td>
                  <td className="py-2.5 px-4 text-right">41</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">85%</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">30</td>
                  <td className="py-2.5 px-4 font-bold text-red-600 text-right">6</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">Sunscreen</td>
                  <td className="py-2.5 px-4 text-right">44</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">79%</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">28</td>
                  <td className="py-2.5 px-4 font-bold text-red-600 text-right">10</td>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Variant Generation Rules */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Variant Generation Rules</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Rule Name</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Condition</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Result</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Shade + Size</td>
                  <td className="py-2.5 px-4 text-muted font-medium">Shade AND Size</td>
                  <td className="py-2.5 px-4 text-muted">Variant</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Active</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Size Only</td>
                  <td className="py-2.5 px-4 text-muted font-medium">Size</td>
                  <td className="py-2.5 px-4 text-muted">Variant</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Active</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Shade Only</td>
                  <td className="py-2.5 px-4 text-muted font-medium">Shade</td>
                  <td className="py-2.5 px-4 text-muted">Variant</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Active</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Pack Size</td>
                  <td className="py-2.5 px-4 text-muted font-medium">Pack Size</td>
                  <td className="py-2.5 px-4 text-muted">Variant</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Draft</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">Flavor + Size</td>
                  <td className="py-2.5 px-4 text-muted font-medium">Flavor AND Size</td>
                  <td className="py-2.5 px-4 text-muted">Variant</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Draft</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">Manage variant rules <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Product Variant Readiness by Channel */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Product Variant Readiness by Channel</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[350px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Channel</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Ready</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Partial</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Not Ready</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">% Ready</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Online Marketplace</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">8,420</td>
                  <td className="py-2.5 px-4 text-muted text-right">1,020</td>
                  <td className="py-2.5 px-4 text-muted text-right">240</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">81%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Mobile App</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">7,861</td>
                  <td className="py-2.5 px-4 text-muted text-right">921</td>
                  <td className="py-2.5 px-4 text-muted text-right">180</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">83%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">B2B Wholesale</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">6,442</td>
                  <td className="py-2.5 px-4 text-muted text-right">810</td>
                  <td className="py-2.5 px-4 text-muted text-right">148</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">79%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Partner Storefront</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">5,166</td>
                  <td className="py-2.5 px-4 text-muted text-right">640</td>
                  <td className="py-2.5 px-4 text-muted text-right">122</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">80%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">Social Commerce</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">4,321</td>
                  <td className="py-2.5 px-4 text-muted text-right">512</td>
                  <td className="py-2.5 px-4 text-muted text-right">96</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">85%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View readiness by channel <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Attribute Validation Rules */}
        <div className="bg-white rounded-xl border border-line p-6 shadow-sm flex flex-col items-center">
          <h3 className="text-[13px] font-bold text-ink mb-6 w-full text-left">Attribute Validation Rules</h3>
          <div className="relative w-32 h-32 mb-6">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="6"></circle>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#059669" strokeWidth="6" strokeDasharray="82 18" strokeDashoffset="0"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-ink">368</span>
              <span className="text-[9px] text-muted font-bold uppercase mt-1 text-center">Total<br/>Rules</span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center text-[11px]">
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-600"></span><span className="text-muted">Active</span></div>
               <span className="font-bold text-ink">302 <span className="text-muted font-normal">(82%)</span></span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span className="text-muted">Draft</span></div>
               <span className="font-bold text-ink">32 <span className="text-muted font-normal">(9%)</span></span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-400"></span><span className="text-muted">Pending Review</span></div>
               <span className="font-bold text-ink">18 <span className="text-muted font-normal">(5%)</span></span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-300"></span><span className="text-muted">Inactive</span></div>
               <span className="font-bold text-ink">16 <span className="text-muted font-normal">(4%)</span></span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left w-full">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all validation rules <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Attribute Dependencies & Inheritance */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Attribute Dependencies & Inheritance</h3>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center">
            {/* Mock dependency graph UI */}
            <div className="flex gap-4 items-center">
               <div className="flex flex-col gap-4">
                  <div className="border border-line rounded px-3 py-1.5 text-[10px] font-semibold bg-white">Undertone</div>
                  <div className="border border-line rounded px-3 py-1.5 text-[10px] font-semibold bg-white">Skin Type</div>
               </div>
               <div className="flex flex-col items-center">
                  <div className="h-px w-6 bg-slate-300"></div>
                  <div className="h-px w-6 bg-slate-300"></div>
               </div>
               <div className="border-2 border-[#741d35] rounded-lg px-4 py-3 text-[11px] font-bold bg-pink-50 text-[#741d35] shadow-sm">
                  Shade Name
               </div>
               <div className="flex flex-col items-center">
                  <div className="h-px w-6 bg-slate-300"></div>
                  <div className="h-px w-6 bg-slate-300"></div>
               </div>
               <div className="flex flex-col gap-4">
                  <div className="border border-line rounded px-3 py-1.5 text-[10px] font-semibold bg-white">Finish Type</div>
                  <div className="border border-line rounded px-3 py-1.5 text-[10px] font-semibold bg-white">Fragrance Type</div>
               </div>
            </div>
          </div>
          <div className="p-4 flex justify-around border-t border-line bg-slate-50">
             <div className="text-center">
                <span className="text-[16px] font-bold text-ink">46</span>
                <span className="text-[9px] font-bold text-muted uppercase block mt-1">Dependencies</span>
             </div>
             <div className="text-center">
                <span className="text-[16px] font-bold text-ink">128</span>
                <span className="text-[9px] font-bold text-muted uppercase block mt-1">Inherited from Templates</span>
             </div>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View dependency map <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Channel Attribute Requirements */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Channel Attribute Requirements</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Channel</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Required Attr.</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Optional Attr.</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Compliance</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Online Marketplace</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">842</td>
                  <td className="py-2.5 px-4 font-medium text-muted text-right">312</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">91%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Mobile App</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">812</td>
                  <td className="py-2.5 px-4 font-medium text-muted text-right">298</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">90%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">B2B Wholesale</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">768</td>
                  <td className="py-2.5 px-4 font-medium text-muted text-right">286</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">88%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Partner Storefront</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">736</td>
                  <td className="py-2.5 px-4 font-medium text-muted text-right">260</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">93%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">Social Commerce</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">654</td>
                  <td className="py-2.5 px-4 font-medium text-muted text-right">224</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">87%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full requirements <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Attribute Quality & Variant Issues */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Attribute Quality & Variant Issues</h3>
          </div>
          <div className="flex-1 p-4">
             <div className="flex justify-between items-center py-2 border-b border-line border-dashed">
                <span className="text-[11px] font-medium text-ink">Missing Required Values</span>
                <span className="text-[11px] font-bold text-red-600">248</span>
                <span className="text-[9px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">High</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-line border-dashed">
                <span className="text-[11px] font-medium text-ink">Invalid Format / Values</span>
                <span className="text-[11px] font-bold text-red-600">86</span>
                <span className="text-[9px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">High</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-line border-dashed">
                <span className="text-[11px] font-medium text-ink">Normalization Issues</span>
                <span className="text-[11px] font-bold text-amber-600">36</span>
                <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Medium</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-line border-dashed">
                <span className="text-[11px] font-medium text-ink">Orphan / Unused Values</span>
                <span className="text-[11px] font-bold text-amber-600">92</span>
                <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Medium</span>
             </div>
             <div className="flex justify-between items-center py-2">
                <span className="text-[11px] font-medium text-ink">Inconsistent Mappings</span>
                <span className="text-[11px] font-bold text-green-600">28</span>
                <span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Low</span>
             </div>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all quality issues <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Duplicate Attribute Candidates */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Duplicate Attribute Candidates</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Attribute Name</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Potential Duplicates</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Similarity</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Shade</td>
                  <td className="py-2.5 px-4 font-medium text-muted">2</td>
                  <td className="py-2.5 px-4 font-bold text-red-600 text-right">96%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Color</td>
                  <td className="py-2.5 px-4 font-medium text-muted">2</td>
                  <td className="py-2.5 px-4 font-bold text-red-600 text-right">94%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Size</td>
                  <td className="py-2.5 px-4 font-medium text-muted">4</td>
                  <td className="py-2.5 px-4 font-bold text-amber-600 text-right">88%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Net Weight</td>
                  <td className="py-2.5 px-4 font-medium text-muted">2</td>
                  <td className="py-2.5 px-4 font-bold text-amber-600 text-right">85%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">SPF</td>
                  <td className="py-2.5 px-4 font-medium text-muted">2</td>
                  <td className="py-2.5 px-4 font-bold text-green-600 text-right">82%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">Review duplicates <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Recent Attribute & Variant Activity */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Recent Attribute & Variant Activity</h3>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#741d35] mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Attribute updated <span className="text-muted font-normal">(Shade Name)</span></span>
                <span className="text-[10px] text-muted mt-0.5">Elena Vance • 04 Aug 2026, 10:25 AM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">New attribute created <span className="text-muted font-normal">(Blue Light)</span></span>
                <span className="text-[10px] text-muted mt-0.5">Marcus Lee • 04 Aug 2026, 09:40 AM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#741d35] mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Variant rule updated <span className="text-muted font-normal">(Size Only)</span></span>
                <span className="text-[10px] text-muted mt-0.5">Priya Kapoor • 04 Aug 2026, 08:15 AM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#741d35] mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Bulk values imported <span className="text-muted font-normal">(Fragrance)</span></span>
                <span className="text-[10px] text-muted mt-0.5">Marcus Lee • 03 Aug 2026, 04:20 PM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink text-slate-500 line-through">Attribute deprecated <span className="text-muted font-normal">(Colour Code)</span></span>
                <span className="text-[10px] text-muted mt-0.5">Elena Vance • 03 Aug 2026, 11:10 AM</span>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full activity log <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

    </div>
  );
}
