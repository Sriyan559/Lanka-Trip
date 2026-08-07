"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function ProductDetailOverviewGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Product Identity */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          1. Product Identity
        </h3>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Public Product Ref</span>
            <span className="font-semibold text-ink text-right">PROD-2024-00421</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Database Product ID</span>
            <span className="font-semibold text-ink text-right">421</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">SKU</span>
            <span className="font-semibold text-ink text-right">RAD-VITC-30ML</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Barcode (GTIN)</span>
            <span className="font-semibold text-ink text-right">8901234567895</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Manufacturer</span>
            <span className="font-semibold text-ink text-right">Estée Lauder Companies Inc.</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Type</span>
            <span className="font-semibold text-ink text-right">Finished Cosmetic Product</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Status</span>
            <span className="font-bold text-[#059669]">Active</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Created At</span>
            <span className="font-semibold text-ink text-right">Oct 24, 2024 10:25 AM</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Updated At</span>
            <span className="font-semibold text-ink text-right">May 04, 2026 11:27 AM</span>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
           <span className="text-[10px] font-bold text-muted bg-slate-100 px-2 py-0.5 rounded">Version v2</span>
        </div>
      </div>

      {/* 2. Classification */}
      <div className="bg-white border border-line rounded-xl p-4 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          2. Classification
        </h3>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Department</span>
            <span className="font-semibold text-ink text-right">Skincare</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Category</span>
            <span className="font-semibold text-ink text-right">Face Serum</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Subcategory</span>
            <span className="font-semibold text-ink text-right">Vitamin C Serum</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Product Family</span>
            <span className="font-semibold text-ink text-right">Serum</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Beauty Concern</span>
            <span className="font-semibold text-ink text-right">Dullness, Uneven Tone</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Skin Type</span>
            <span className="font-semibold text-ink text-right">All Skin Types</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Regulatory Class</span>
            <span className="font-semibold text-ink text-right">Cosmetic</span>
          </div>
        </div>
      </div>

      {/* 3. Brand & Supplier Relationships */}
      <div className="bg-white border border-line rounded-xl p-4 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          3. Brand & Supplier Relationships
        </h3>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Brand</span>
            <span className="font-bold text-ink flex items-center gap-1 text-right">Estée Lauder <span className="text-[#059669] text-[10px]">Verified</span></span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Brand Authorization ID</span>
            <span className="font-semibold text-ink text-right">AUTH-2023-0892</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Authorization Status</span>
            <span className="font-bold text-[#059669]">Valid</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Authorization Expiry</span>
            <span className="font-semibold text-ink text-right">Dec 31, 2026</span>
          </div>
          <div className="h-px w-full bg-line my-1"></div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Supplier</span>
            <span className="font-bold text-ink flex items-center gap-1 text-right">Luxe Distribution Pvt Ltd <span className="text-[#059669] text-[10px]">Active</span></span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Supplier Risk</span>
            <span className="font-bold text-[#059669]">Low</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Supplier Since</span>
            <span className="font-semibold text-ink text-right">Jan 15, 2023</span>
          </div>
        </div>
      </div>

      {/* 4. Product Content Summary */}
      <div className="bg-white border border-line rounded-xl p-4 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          4. Product Content Summary
        </h3>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-col text-[11px] mb-1">
            <span className="text-muted mb-0.5">Title</span>
            <span className="font-semibold text-ink">Radiance Vitamin C Serum</span>
          </div>
          <div className="flex flex-col text-[11px] mb-1">
            <span className="text-muted mb-0.5">Short Description</span>
            <span className="text-ink leading-tight">Advanced Vitamin C serum that brightens dull skin...</span>
          </div>
          <div className="flex flex-col text-[11px] mb-1">
            <span className="text-muted mb-0.5">Key Benefits</span>
            <span className="text-ink leading-tight">Brightening, Anti-oxidant, Evens tone</span>
          </div>
          <div className="flex flex-col text-[11px] mb-1">
            <span className="text-muted mb-0.5">Warnings</span>
            <span className="text-ink leading-tight">For external use only. Avoid eye contact.</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Language Coverage</span>
            <span className="font-semibold text-ink">EN, SI, TA</span>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-muted uppercase">Content Completeness</span>
            <span className="text-ink">85%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-ink" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      {/* 5. Ingredients & Safety Summary */}
      <div className="bg-white border border-line rounded-xl p-4 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          5. Ingredients & Safety Summary
        </h3>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Total Ingredients</span>
            <span className="font-semibold text-ink">36</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Active Ingredients</span>
            <span className="font-semibold text-ink">3 (Vitamin C 15%)</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Allergens Declared</span>
            <span className="font-semibold text-ink text-right">Fragrance, Limonene</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Safety Evidence</span>
            <span className="font-bold text-[#059669]">2 pending</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Prohibited Ingredients</span>
            <span className="font-bold text-[#059669]">Clear</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Active Recall</span>
            <span className="font-bold text-[#059669]">None</span>
          </div>
        </div>
      </div>

      {/* 6. Variant & Attribute Summary */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col col-span-1 md:col-span-2">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          6. Variant & Attribute Summary
        </h3>
        <div className="flex flex-col flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line">Variant</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line">Size</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line">SKU</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line">Status</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-right">Readiness</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-right">Inventory</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Standard</td>
                <td className="py-1.5 px-2 text-[11px] text-muted">30 ml</td>
                <td className="py-1.5 px-2 text-[11px] text-muted">RAD-VITC-30ML</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Active</span></td>
                <td className="py-1.5 px-2 text-[11px] font-bold text-[#059669] text-right">100%</td>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink text-right">2,450</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Large</td>
                <td className="py-1.5 px-2 text-[11px] text-muted">50 ml</td>
                <td className="py-1.5 px-2 text-[11px] text-muted">RAD-VITC-50ML</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Active</span></td>
                <td className="py-1.5 px-2 text-[11px] font-bold text-[#d97706] text-right">95%</td>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink text-right">1,200</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Travel Size</td>
                <td className="py-1.5 px-2 text-[11px] text-muted">15 ml</td>
                <td className="py-1.5 px-2 text-[11px] text-muted">RAD-VITC-15ML</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Active</span></td>
                <td className="py-1.5 px-2 text-[11px] font-bold text-[#dc2626] text-right">70%</td>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink text-right">800</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex justify-center">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all 3 variants <ArrowRight size={12} /></button>
        </div>
      </div>

      {/* 7. Media Summary */}
      <div className="bg-white border border-line rounded-xl p-4 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          7. Media Summary
        </h3>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-[20px] font-bold text-ink leading-none">12</span>
            <span className="text-[9px] font-bold text-muted uppercase mt-1">Total Assets</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#059669]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
              <span className="text-[11px] font-bold">Ready</span>
            </div>
            <span className="text-[9px] font-bold text-muted uppercase mt-1">Primary Image</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#059669]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
              <span className="text-[11px] font-bold">Available</span>
            </div>
            <span className="text-[9px] font-bold text-muted uppercase mt-1">360° / Video</span>
          </div>
          <div className="flex flex-col items-center ml-auto">
             <span className="text-[14px] font-bold text-[#d97706] leading-none">80%</span>
             <span className="text-[9px] font-bold text-muted uppercase mt-1">Media Readiness</span>
          </div>
        </div>
        <div className="flex gap-2 flex-1">
          <div className="w-12 h-16 bg-amber-50 rounded border border-amber-200"></div>
          <div className="w-12 h-16 bg-amber-50 rounded border border-amber-200"></div>
          <div className="w-12 h-16 bg-amber-50 rounded border border-amber-200"></div>
          <div className="w-12 h-16 bg-slate-100 rounded border border-line flex items-center justify-center">
            <span className="text-[11px] font-bold text-muted">+8</span>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all media assets <ArrowRight size={12} /></button>
        </div>
      </div>
      
      {/* 8. Compliance & Approval Summary */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col col-span-1 md:col-span-2">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          8. Compliance & Approval Summary
        </h3>
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-muted">Current Stage:</span>
            <span className="font-bold text-ink">Compliance Review</span>
          </div>
          
          <div className="flex items-center gap-2">
            {[1,2,3,4,5,6,7,8].map(step => (
              <React.Fragment key={step}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${step <= 3 ? 'bg-[#059669] text-white' : step === 4 ? 'bg-amber-100 border border-amber-500 text-amber-700' : 'bg-slate-100 text-muted'}`}>
                  {step <= 3 ? '✓' : step}
                </div>
                {step < 8 && <div className={`flex-1 h-0.5 ${step <= 3 ? 'bg-[#059669]' : 'bg-line'}`}></div>}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between items-center text-[9px] font-bold text-muted uppercase">
            <span>14 of 18 steps</span>
            <span>78% complete</span>
          </div>
          
          <div className="bg-red-50 border border-red-100 rounded-lg p-2 mt-2">
            <h4 className="text-[10px] font-bold text-red-700 uppercase mb-1">Blocking Issues (3)</h4>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-red-700 flex items-center gap-1"><AlertTriangle size={10} /> Missing safety evidence for 15% Vitamin C</span>
                <span className="text-[#741d35] font-bold cursor-pointer hover:underline">Review ↗</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-red-700 flex items-center gap-1"><AlertTriangle size={10} /> Unsupported anti-aging claim on packaging</span>
                <span className="text-[#741d35] font-bold cursor-pointer hover:underline">Review ↗</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-red-700 flex items-center gap-1"><AlertTriangle size={10} /> Back packaging image missing</span>
                <span className="text-[#741d35] font-bold cursor-pointer hover:underline">Upload ↗</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">Open Approval Detail <ArrowRight size={12} /></button>
        </div>
      </div>
      
      {/* 9. Inventory & Batch Summary */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col col-span-1 md:col-span-2">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          9. Inventory & Batch Summary
        </h3>
        <div className="flex justify-between gap-4 mb-4">
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-ink">2,450</span>
            <span className="text-[9px] font-bold text-muted uppercase mt-0.5">Total Available</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-ink">200</span>
            <span className="text-[9px] font-bold text-muted uppercase mt-0.5">Reserved</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-ink">450</span>
            <span className="text-[9px] font-bold text-muted uppercase mt-0.5">In-Transit</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[16px] font-bold text-[#059669]">3,100</span>
            <span className="text-[9px] font-bold text-muted uppercase mt-0.5">Total Stock</span>
          </div>
        </div>
        
        <h4 className="text-[11px] font-bold text-ink mb-2">Active Batches (4)</h4>
        <div className="flex flex-col flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-1 px-2 text-[9px] font-bold text-muted uppercase border-b border-line">Batch Number</th>
                <th className="py-1 px-2 text-[9px] font-bold text-muted uppercase border-b border-line">Mfg Date</th>
                <th className="py-1 px-2 text-[9px] font-bold text-muted uppercase border-b border-line">Expiry Date</th>
                <th className="py-1 px-2 text-[9px] font-bold text-muted uppercase border-b border-line text-right">Available</th>
                <th className="py-1 px-2 text-[9px] font-bold text-muted uppercase border-b border-line text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink">BT-2024-0098</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Jan 15, 2024</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Jan 15, 2027</td>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink text-right">1,200</td>
                <td className="py-1.5 px-2 text-right"><span className="text-[9px] font-bold text-[#059669]">Active</span></td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink">BT-2024-0112</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Mar 20, 2024</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Mar 20, 2027</td>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink text-right">800</td>
                <td className="py-1.5 px-2 text-right"><span className="text-[9px] font-bold text-[#059669]">Active</span></td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink">BT-2024-0134</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Apr 10, 2024</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Apr 10, 2027</td>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink text-right">300</td>
                <td className="py-1.5 px-2 text-right"><span className="text-[9px] font-bold text-[#059669]">Active</span></td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink">BT-2024-0145</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Apr 22, 2024</td>
                <td className="py-1.5 px-2 text-[10px] text-muted">Apr 22, 2027</td>
                <td className="py-1.5 px-2 text-[10px] font-semibold text-ink text-right">150</td>
                <td className="py-1.5 px-2 text-right"><span className="text-[9px] font-bold text-[#059669]">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex justify-between">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all batches <ArrowRight size={12} /></button>
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">Open Inventory Detail <ArrowRight size={12} /></button>
        </div>
      </div>
      
      {/* 10. Pricing & Tax Summary */}
      <div className="bg-white border border-line rounded-xl p-4 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          10. Pricing & Tax Summary
        </h3>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Selling Price (MRP)</span>
            <span className="font-bold text-ink">LKR 12,450.00</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Cost Price</span>
            <span className="font-semibold text-ink">LKR 8,250.00</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Gross Margin</span>
            <span className="font-semibold text-ink">33.7%</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Tax Class</span>
            <span className="font-semibold text-ink text-right">Standard VAT (15%)</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Promotional Eligibility</span>
            <span className="font-bold text-[#059669]">Eligible</span>
          </div>
          <div className="flex justify-between items-start text-[11px]">
            <span className="text-muted">Price Last Updated</span>
            <span className="font-semibold text-ink">Apr 28, 2026</span>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View pricing details <ArrowRight size={12} /></button>
        </div>
      </div>
      
      {/* 11. Publication & Channel Readiness */}
      <div className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col col-span-1 md:col-span-2">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          11. Publication & Channel Readiness
        </h3>
        <div className="flex flex-col flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line">Channel</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line">Eligibility</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line">Publication</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-center">Content</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-center">Media</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-center">Pricing</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-center">Inventory</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-center">Policy</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-center">Blockers</th>
                <th className="py-1 px-2 text-[10px] font-bold text-muted uppercase border-b border-line text-right">Last Published</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Online Marketplace</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Eligible</span></td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Published</span></td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center">-</td>
                <td className="py-1.5 px-2 text-[10px] text-muted text-right">Apr 15, 2026</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Mobile App</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Eligible</span></td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Published</span></td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center">-</td>
                <td className="py-1.5 px-2 text-[10px] text-muted text-right">Apr 15, 2026</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">B2B Wholesale Portal</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Eligible</span></td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#dc2626]">Not Published</span></td>
                <td className="py-1.5 px-2 text-center text-[#dc2626]">×</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#dc2626] font-bold">2</td>
                <td className="py-1.5 px-2 text-[10px] text-muted text-right">-</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Partner Storefront</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Eligible</span></td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#dc2626]">Not Published</span></td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#dc2626]">×</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#dc2626] font-bold">1</td>
                <td className="py-1.5 px-2 text-[10px] text-muted text-right">-</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Social Commerce</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Eligible</span></td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#059669]">Published</span></td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center">-</td>
                <td className="py-1.5 px-2 text-[10px] text-muted text-right">Apr 15, 2026</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-[11px] font-semibold text-ink">Corporate Sales</td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#d97706]">Not Eligible</span></td>
                <td className="py-1.5 px-2"><span className="text-[10px] font-bold text-[#dc2626]">Not Published</span></td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#059669]">✓</td>
                <td className="py-1.5 px-2 text-center text-[#dc2626]">×</td>
                <td className="py-1.5 px-2 text-center text-[#dc2626] font-bold">1</td>
                <td className="py-1.5 px-2 text-[10px] text-muted text-right">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex gap-4 text-[10px] font-bold">
          <span className="flex items-center gap-1 text-[#059669]">✓ Ready</span>
          <span className="flex items-center gap-1 text-[#d97706]">- Partial</span>
          <span className="flex items-center gap-1 text-[#dc2626]">× Not Ready</span>
          <span className="flex items-center gap-1 text-muted">N/A</span>
        </div>
      </div>
      
      {/* 12. Linked Records */}
      <div className="bg-white border border-line rounded-xl p-4 shadow-sm flex flex-col">
        <h3 className="text-[12px] font-bold text-ink mb-3 pb-2 border-b border-line flex justify-between">
          12. Linked Records
        </h3>
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex justify-between items-center bg-slate-50 border border-line p-2 rounded-lg">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase">Approval Submission</span>
              <span className="text-[12px] font-bold text-[#741d35] hover:underline cursor-pointer">SUB-2024-0312</span>
            </div>
            <span className="text-[10px] font-medium text-muted">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 border border-line p-2 rounded-lg">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase">Marketplace Listings</span>
              <span className="text-[12px] font-bold text-[#741d35] hover:underline cursor-pointer">3 listings</span>
            </div>
            <span className="text-[10px] font-medium text-muted">Active</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 border border-line p-2 rounded-lg">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase">Supplier Catalogue Record</span>
              <span className="text-[12px] font-bold text-[#741d35] hover:underline cursor-pointer">REC-3626-0411</span>
            </div>
            <span className="text-[10px] font-medium text-muted">Synced</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 border border-line p-2 rounded-lg">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted uppercase">Brand Authorization</span>
              <span className="text-[12px] font-bold text-[#741d35] hover:underline cursor-pointer">AUTH-2023-0892</span>
            </div>
            <span className="text-[10px] font-medium text-muted">Valid</span>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View all linked records <ArrowRight size={12} /></button>
        </div>
      </div>

    </div>
  );
}
