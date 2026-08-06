"use client";

import React from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SharedProgressList } from "../shared/SharedProgressList";

export function MediaBottomPanels() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Media Asset Health Scorecard */}
        <SharedProgressList
          title="Media Asset Health Scorecard"
          items={[
            { label: "Product Link Coverage", pct: 94, color: "bg-[#059669]" },
            { label: "Resolution Compliance", pct: 88, color: "bg-[#059669]" },
            { label: "Alt Text Completeness", pct: 72, color: "bg-[#d97706]" },
            { label: "Tagging Accuracy", pct: 85, color: "bg-[#059669]" },
            { label: "Optimization Status", pct: 90, color: "bg-[#059669]" },
            { label: "Rights Validity", pct: 96, color: "bg-[#059669]" },
            { label: "CDN Delivery Success", pct: 99, color: "bg-[#059669]" },
          ]}
          footerText="View full scorecard"
        />

        {/* Asset Optimization Queue */}
        <div className="bg-white rounded-xl border border-line flex flex-col p-6 shadow-sm">
          <h3 className="text-[13px] font-bold text-ink mb-4">Asset Optimization Queue</h3>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
               <span className="text-[20px] font-bold text-ink">4,280</span>
               <span className="text-[10px] text-muted">Awaiting Process</span>
            </div>
            <div className="flex flex-col text-center">
               <span className="text-[20px] font-bold text-red-600">312</span>
               <span className="text-[10px] text-muted">Failed</span>
            </div>
            <div className="flex flex-col text-right">
               <span className="text-[20px] font-bold text-green-600">12.5k</span>
               <span className="text-[10px] text-muted">Completed (24h)</span>
            </div>
          </div>
          <h4 className="text-[11px] font-bold text-muted uppercase mb-2">Queue Status by Type</h4>
          <div className="flex-1">
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">Image WebP Conversion</span>
               <span className="font-bold text-ink">2,140</span>
               <span className="text-muted">45m ETA</span>
            </div>
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">Video Transcoding (HLS)</span>
               <span className="font-bold text-ink">1,420</span>
               <span className="text-muted">2h 15m ETA</span>
            </div>
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">Thumbnail Generation</span>
               <span className="font-bold text-ink">480</span>
               <span className="text-muted">15m ETA</span>
            </div>
            <div className="flex justify-between text-[11px] py-1 border-b border-line border-dashed">
               <span className="text-ink">Watermarking</span>
               <span className="font-bold text-ink">240</span>
               <span className="text-muted">5m ETA</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">Manage processing queue <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Product Media Coverage */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Product Media Coverage</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Category</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Avg Images/Prod</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Has Video</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Coverage Score</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Skincare</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">5.2</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">45%</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">High</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Makeup</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">6.8</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">62%</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">High</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Fragrance</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">3.4</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">15%</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Medium</span></td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Haircare</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">4.1</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">22%</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">High</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">Tools & Brushes</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">2.8</td>
                  <td className="py-2.5 px-4 font-bold text-ink text-right">8%</td>
                  <td className="py-2.5 px-4 text-right"><span className="text-[9px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">Low</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View full coverage report <ArrowRight size={12} /></button>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Asset Expiration & Rights Management */}
        <div className="bg-white rounded-xl border border-line flex flex-col p-6 shadow-sm overflow-hidden">
          <h3 className="text-[13px] font-bold text-ink mb-6">Asset Expiration & Rights Management</h3>
          <div className="flex flex-col items-center justify-center flex-1">
             <div className="relative w-32 h-32 mb-6">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="6"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#059669" strokeWidth="6" strokeDasharray="80 20" strokeDashoffset="0"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-80"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#dc2626" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-90"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-ink">45k</span>
                  <span className="text-[9px] text-muted font-bold uppercase mt-1 text-center">Licensed<br/>Assets</span>
                </div>
             </div>
             <div className="w-full space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-600"></span><span className="text-muted">Valid (&gt;90 days)</span></div>
                   <span className="font-bold text-ink">36,000 <span className="text-muted font-normal">(80%)</span></span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span className="text-muted">Expiring (30-90 days)</span></div>
                   <span className="font-bold text-ink">4,500 <span className="text-muted font-normal">(10%)</span></span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-700"></span><span className="text-muted">Expiring (&lt;30 days)</span></div>
                   <span className="font-bold text-ink">2,250 <span className="text-muted font-normal">(5%)</span></span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span><span className="text-muted">Expired</span></div>
                   <span className="font-bold text-ink">2,250 <span className="text-muted font-normal">(5%)</span></span>
                </div>
             </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">Manage rights & expiration <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* CDN & Delivery Performance */}
        <div className="bg-white rounded-xl border border-line flex flex-col p-6 shadow-sm">
          <h3 className="text-[13px] font-bold text-ink mb-4">CDN & Delivery Performance</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
               <span className="text-[20px] font-bold text-ink">99.98%</span>
               <span className="text-[10px] text-muted">Cache Hit Ratio</span>
            </div>
            <div className="flex flex-col">
               <span className="text-[20px] font-bold text-ink">42ms</span>
               <span className="text-[10px] text-muted">Avg Response Time</span>
            </div>
            <div className="flex flex-col">
               <span className="text-[20px] font-bold text-ink">1.2 TB</span>
               <span className="text-[10px] text-muted">Bandwidth (24h)</span>
            </div>
            <div className="flex flex-col">
               <span className="text-[20px] font-bold text-ink">14.5M</span>
               <span className="text-[10px] text-muted">Requests (24h)</span>
            </div>
          </div>
          <div className="flex-1">
             <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-ink">Traffic Trend (Last 7 Days)</span>
             </div>
             {/* Fake Line Chart */}
             <div className="h-[70px] w-full flex items-end justify-between border-b border-line pb-1 relative">
                <div className="absolute inset-0 z-0">
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full stroke-blue-500 fill-none" strokeWidth="2">
                    <path d="M0 25 L10 20 L20 28 L30 15 L40 22 L50 10 L60 12 L70 5 L80 14 L90 2 L100 8" />
                  </svg>
                </div>
             </div>
          </div>
          <div className="mt-4 pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View CDN analytics <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Tagging & Taxonomy Completeness */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Tagging & Taxonomy Completeness</h3>
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
             <div className="mb-6">
                <div className="flex justify-between text-[11px] font-bold text-ink mb-1">
                   <span>AI Auto-Tagging Accuracy</span>
                   <span className="text-green-600">92%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                   <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
             </div>
             
             <div className="mb-6">
                <div className="flex justify-between text-[11px] font-bold text-ink mb-1">
                   <span>Taxonomy Mapping Coverage</span>
                   <span className="text-green-600">85%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                   <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
             </div>

             <div>
                <div className="flex justify-between text-[11px] font-bold text-ink mb-1">
                   <span>Alt-Text Generation</span>
                   <span className="text-amber-600">68%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                   <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <span className="text-[9px] text-muted mt-1 block">3,420 assets pending manual review</span>
             </div>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View tagging dashboard <ArrowRight size={12} /></button>
          </div>
        </div>

      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Channel Media Compliance */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Channel Media Compliance</h3>
          </div>
          <div className="flex-1 overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[250px]">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase">Channel</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Min Res.</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Max Size</th>
                  <th className="py-2 px-4 text-[10px] font-bold text-muted uppercase text-right">Compliance</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Amazon Store</td>
                  <td className="py-2.5 px-4 text-muted text-right">1000x1000</td>
                  <td className="py-2.5 px-4 text-muted text-right">10MB</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">98%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Shopify Main</td>
                  <td className="py-2.5 px-4 text-muted text-right">800x800</td>
                  <td className="py-2.5 px-4 text-muted text-right">20MB</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">99%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">TikTok Shop</td>
                  <td className="py-2.5 px-4 text-muted text-right">600x600</td>
                  <td className="py-2.5 px-4 text-muted text-right">5MB</td>
                  <td className="py-2.5 px-4 font-bold text-amber-700 text-right">82%</td>
                </tr>
                <tr className="border-b border-line border-dashed">
                  <td className="py-2.5 px-4 font-semibold text-ink">Sephora Retail</td>
                  <td className="py-2.5 px-4 text-muted text-right">1500x1500</td>
                  <td className="py-2.5 px-4 text-muted text-right">15MB</td>
                  <td className="py-2.5 px-4 font-bold text-amber-700 text-right">76%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-ink">Ulta Portal</td>
                  <td className="py-2.5 px-4 text-muted text-right">1200x1200</td>
                  <td className="py-2.5 px-4 text-muted text-right">10MB</td>
                  <td className="py-2.5 px-4 font-bold text-green-700 text-right">88%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-line">
             <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View compliance issues <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Unlinked & Orphaned Assets */}
        <div className="bg-white rounded-xl border border-line flex flex-col p-6 shadow-sm overflow-hidden">
          <h3 className="text-[13px] font-bold text-ink mb-2">Unlinked & Orphaned Assets</h3>
          <span className="text-[10px] text-muted mb-6">Storage Waste Analysis</span>
          <div className="flex justify-between items-center py-3 border-b border-line border-dashed">
             <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Orphaned Images</span>
                <span className="text-[10px] text-muted mt-0.5">Not linked to any product/category</span>
             </div>
             <div className="text-right flex flex-col items-end">
                <span className="text-[12px] font-bold text-ink">14,280</span>
                <span className="text-[10px] font-bold text-red-600 mt-0.5">2.4 TB</span>
             </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-line border-dashed">
             <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Unused Videos</span>
                <span className="text-[10px] text-muted mt-0.5">Uploaded but never published</span>
             </div>
             <div className="text-right flex flex-col items-end">
                <span className="text-[12px] font-bold text-ink">842</span>
                <span className="text-[10px] font-bold text-red-600 mt-0.5">14.8 TB</span>
             </div>
          </div>
          <div className="flex justify-between items-center py-3">
             <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Duplicate Uploads</span>
                <span className="text-[10px] text-muted mt-0.5">Exact hash matches</span>
             </div>
             <div className="text-right flex flex-col items-end">
                <span className="text-[12px] font-bold text-ink">2,140</span>
                <span className="text-[10px] font-bold text-amber-600 mt-0.5">420 GB</span>
             </div>
          </div>
          <div className="mt-auto pt-3 border-t border-line text-left">
             <button className="text-[10px] font-bold text-red-700 hover:underline flex items-center gap-1">Run storage cleanup <ArrowRight size={12} /></button>
          </div>
        </div>

        {/* Recent Media Activity */}
        <div className="bg-white rounded-xl border border-line flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-line bg-slate-50">
            <h3 className="text-[13px] font-bold text-ink">Recent Media Activity</h3>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Bulk upload completed <span className="text-muted font-normal">(Estee Lauder)</span></span>
                <span className="text-[10px] text-muted mt-0.5">System • 04 Aug 2026, 11:20 AM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#741d35] mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Asset rights updated <span className="text-muted font-normal">(Chanel Holiday 26)</span></span>
                <span className="text-[10px] text-muted mt-0.5">Elena Vance • 04 Aug 2026, 10:15 AM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">DMCA Takedown Processed <span className="text-muted font-normal">(Third Party)</span></span>
                <span className="text-[10px] text-muted mt-0.5">Admin Team • 04 Aug 2026, 09:30 AM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">AI Auto-tagging batch <span className="text-muted font-normal">(Skincare)</span></span>
                <span className="text-[10px] text-muted mt-0.5">AI Service • 04 Aug 2026, 08:00 AM</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">CDN Cache purged <span className="text-muted font-normal">(/images/promo)</span></span>
                <span className="text-[10px] text-muted mt-0.5">System • 03 Aug 2026, 11:59 PM</span>
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
