"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Boxes,
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  MOCK_PRODUCT_DETAIL_RECORD,
  MOCK_VARIANTS,
  MOCK_ACTIVE_BATCHES,
  MOCK_CHANNEL_READINESS,
  MOCK_LINKED_RECORDS,
  MOCK_BLOCKING_ISSUES,
  MOCK_RECENT_AUDIT_ACTIVITIES,
} from "@/data/productDetail.mock";

interface OverviewTabContentProps {
  onSelectTab: (tabId: string) => void;
  onOpenIssueModal: (issueId: string) => void;
}

export const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  onSelectTab,
  onOpenIssueModal,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`Copied ${label} to clipboard.`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const p = MOCK_PRODUCT_DETAIL_RECORD;

  return (
    <div className="flex flex-col gap-6">
      {/* Grid Row 1: Cards 1 to 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 1. Product Identity */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              1. Product Identity
            </h3>
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Public Product Ref</span>
                <div className="flex items-center gap-1 font-mono font-bold text-gray-900">
                  <span>{p.publicId}</span>
                  <button onClick={() => handleCopy(p.publicId, "Public Ref")} className="text-gray-400 hover:text-gray-600">
                    {copiedKey === "Public Ref" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Database Product ID</span>
                <span className="font-mono text-gray-600">{p.dbProductId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">SKU</span>
                <div className="flex items-center gap-1 font-mono font-bold text-gray-900">
                  <span>{p.sku}</span>
                  <button onClick={() => handleCopy(p.sku, "SKU")} className="text-gray-400 hover:text-gray-600">
                    {copiedKey === "SKU" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Barcode (GTIN)</span>
                <div className="flex items-center gap-1 font-mono text-gray-700">
                  <span>{p.barcode}</span>
                  <button onClick={() => handleCopy(p.barcode, "Barcode")} className="text-gray-400 hover:text-gray-600">
                    {copiedKey === "Barcode" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Manufacturer</span>
                <span className="text-gray-800 font-medium text-[11px] truncate max-w-[130px]">{p.manufacturer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Product Type</span>
                <span className="text-gray-700">{p.productType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <span className="text-emerald-700 font-bold">{p.productStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Created At</span>
                <span className="text-gray-600 text-[10.5px]">{p.createdDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Updated At</span>
                <span className="text-gray-600 text-[10.5px]">{p.updatedDate}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-1">
                <span className="text-gray-500">Version</span>
                <span className="font-bold text-gray-800">{p.recordVersion}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Classification */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              2. Classification
            </h3>
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Department</span>
                <span className="font-semibold text-gray-800">{p.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-semibold text-gray-800">{p.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Subcategory</span>
                <span className="text-gray-700">{p.subcategory}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Product Family</span>
                <span className="text-gray-700">{p.productFamily}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Beauty Concern</span>
                <span className="text-gray-700 truncate max-w-[130px]">{p.beautyConcern}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Skin Type</span>
                <span className="text-gray-700">{p.skinType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Regulatory Class</span>
                <span className="text-gray-700">{p.regulatoryClass}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Brand & Supplier Relationships */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              3. Brand & Supplier Relationships
            </h3>
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Brand</span>
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  {p.brand}
                  <span className="px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px]">Verified</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Brand Auth ID</span>
                <span className="font-mono text-gray-600">{p.brandAuthId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Authorization Status</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                  {p.brandAuthStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Authorization Expiry</span>
                <span className="text-gray-700">{p.brandAuthExpiry}</span>
              </div>
              <div className="border-t border-gray-100 pt-1.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Supplier</span>
                  <span className="font-semibold text-gray-800">{p.supplier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Supplier Risk</span>
                  <span className="text-emerald-700 font-bold">{p.supplierRisk}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Supplier Since</span>
                  <span className="text-gray-600">{p.supplierSince}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Product Content Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              4. Product Content Summary
            </h3>
            <div className="space-y-2 text-[11.5px]">
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-semibold block">Product Title</span>
                <span className="font-semibold text-gray-900 line-clamp-1">{p.productName}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-semibold block">Short Description</span>
                <span className="text-gray-600 line-clamp-2">{p.shortDescription}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-semibold block">Key Benefits</span>
                <span className="text-gray-700">{p.keyBenefits}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-semibold block">Warnings</span>
                <span className="text-gray-600">{p.warnings}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-gray-500">Language Coverage</span>
                <span className="font-semibold text-gray-800">{p.languages.join(", ")}</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-gray-500">Content Completeness</span>
                  <span className="font-bold text-gray-900">{p.contentCompleteness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${p.contentCompleteness}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Cards 5 to 8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 5. Ingredients & Safety Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              5. Ingredients & Safety Summary
            </h3>
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Total Ingredients</span>
                <span className="font-bold text-gray-900">{p.totalIngredients}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Active Ingredients</span>
                <span className="font-semibold text-gray-800">{p.activeIngredientsCount} (Vitamin C 15%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Allergens Declared</span>
                <span className="text-gray-700">{p.allergens.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Safety Evidence</span>
                <span className="font-bold text-amber-600">{p.safetyEvidenceStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Prohibited Ingredients</span>
                <span className="font-bold text-emerald-600">{p.prohibitedIngredientsStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Active Recall</span>
                <span className="font-bold text-gray-700">{p.activeRecallStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Variant & Attribute Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
              <h3 className="text-xs font-bold text-gray-900">6. Variant & Attribute Summary</h3>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded mb-2">
              <table className="w-full text-left border-collapse text-[10.5px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[9px]">
                    <th className="py-1.5 px-2">Variant</th>
                    <th className="py-1.5 px-2">Size</th>
                    <th className="py-1.5 px-2">SKU</th>
                    <th className="py-1.5 px-2">Status</th>
                    <th className="py-1.5 px-2">Readiness</th>
                    <th className="py-1.5 px-2 text-right">Inventory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {MOCK_VARIANTS.map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-1.5 px-2 font-bold text-gray-800">{v.variant}</td>
                      <td className="py-1.5 px-2 text-gray-600">{v.size}</td>
                      <td className="py-1.5 px-2 font-mono text-gray-500 text-[9.5px]">{v.sku}</td>
                      <td className="py-1.5 px-2 font-semibold text-emerald-700">{v.status}</td>
                      <td className="py-1.5 px-2 font-bold text-gray-800">{v.readinessPercent}%</td>
                      <td className="py-1.5 px-2 text-right font-semibold text-gray-800">{v.inventory.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={() => onSelectTab("variants")}
            className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5"
          >
            <span>View all 3 variants</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* 7. Media Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              7. Media Summary
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <img src={p.thumbnail} alt="m1" className="w-full h-12 rounded border object-cover" />
              <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100" alt="m2" className="w-full h-12 rounded border object-cover" />
              <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100" alt="m3" className="w-full h-12 rounded border object-cover" />
              <div className="w-full h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                +8
              </div>
            </div>
            <div className="space-y-1 text-[11.5px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Assets</span>
                <span className="font-bold text-gray-900">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Primary Image</span>
                <span className="font-bold text-emerald-600">Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">360° / Video</span>
                <span className="font-semibold text-emerald-600">Available</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Media Readiness</span>
                <span className="font-bold text-amber-600">80%</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onSelectTab("media")}
            className="mt-3 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5"
          >
            <span>View all media assets</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* 8. Compliance & Approval Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
              <h3 className="text-xs font-bold text-gray-900">8. Compliance & Approval Summary</h3>
            </div>
            <div className="text-[11px] mb-2">
              <span className="text-gray-500">Current Stage: </span>
              <span className="font-bold text-amber-700">Compliance Review</span>
            </div>

            {/* Step circles */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-[11px] font-bold text-gray-800">14 of 18 steps</span>
              <span className="text-[10.5px] text-gray-400">· 78% complete</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="text-[10px] font-bold text-gray-500 uppercase">Blocking Issues (3)</div>
              {MOCK_BLOCKING_ISSUES.map((issue) => (
                <div key={issue.id} className="flex items-start justify-between gap-1 text-[10.5px]">
                  <div className="flex items-start gap-1">
                    <AlertTriangle size={12} className="text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-gray-800 line-clamp-1">{issue.issue}</span>
                  </div>
                  <button
                    onClick={() => onOpenIssueModal(issue.id)}
                    className="text-[#741d35] font-bold hover:underline shrink-0 text-[10px]"
                  >
                    {issue.actionLabel} &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectTab("compliance")}
            className="mt-3 w-full py-1.5 rounded border border-gray-300 text-center font-bold text-[#741d35] text-[11px] hover:bg-gray-50"
          >
            Open Approval Detail &rarr;
          </button>
        </div>
      </div>

      {/* Grid Row 3: Cards 9 to 12 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 9. Inventory & Batch Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2">
              9. Inventory & Batch Summary
            </h3>
            <div className="grid grid-cols-4 gap-1 text-center bg-gray-50 p-2 rounded mb-2.5 text-[10.5px]">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-semibold">Available</span>
                <span className="font-extrabold text-gray-900">2,450</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-semibold">Reserved</span>
                <span className="font-bold text-gray-700">200</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-semibold">Quarantined</span>
                <span className="font-bold text-rose-600">450</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-semibold">Total Stock</span>
                <span className="font-extrabold text-emerald-700">3,100</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[9px]">
                    <th className="py-1 px-1.5">Batch Number</th>
                    <th className="py-1 px-1.5">Mfg Date</th>
                    <th className="py-1 px-1.5">Expiry Date</th>
                    <th className="py-1 px-1.5 text-right">Available</th>
                    <th className="py-1 px-1.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {MOCK_ACTIVE_BATCHES.map((b, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-1 px-1.5 font-mono text-gray-800 font-bold">{b.batchNumber}</td>
                      <td className="py-1 px-1.5 text-gray-500">{b.mfgDate}</td>
                      <td className="py-1 px-1.5 text-gray-600">{b.expiryDate}</td>
                      <td className="py-1 px-1.5 text-right font-bold text-gray-800">{b.availableQty}</td>
                      <td className="py-1 px-1.5 font-bold text-emerald-700">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] font-semibold">
            <button onClick={() => onSelectTab("inventory")} className="text-gray-600 hover:underline">
              View all batches &rarr;
            </button>
            <button onClick={() => onSelectTab("inventory")} className="text-[#741d35] font-bold hover:underline">
              Open Inventory Detail &rarr;
            </button>
          </div>
        </div>

        {/* 10. Pricing & Tax Summary */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              10. Pricing & Tax Summary
            </h3>
            <div className="space-y-2 text-[11.5px]">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Selling Price (MRP)</span>
                <span className="font-extrabold text-gray-900 text-xs">LKR 12,450.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Cost Price</span>
                <span className="font-mono text-gray-700">LKR 8,250.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Gross Margin</span>
                <span className="font-bold text-emerald-600">33.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Tax Class</span>
                <span className="text-gray-800">{p.taxClass}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Promotional Eligibility</span>
                <span className="font-bold text-emerald-700">{p.promotionalEligibility}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-1">
                <span className="text-gray-500">Price Last Updated</span>
                <span className="text-gray-600">{p.priceLastUpdated}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onSelectTab("pricing")}
            className="mt-3 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5"
          >
            <span>View pricing details</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* 11. Publication & Channel Readiness */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
              <h3 className="text-xs font-bold text-gray-900">11. Publication & Channel Readiness</h3>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[8.5px]">
                    <th className="py-1 px-1.5">Channel</th>
                    <th className="py-1 px-1.5">Eligibility</th>
                    <th className="py-1 px-1.5">Publication</th>
                    <th className="py-1 px-1.5 text-center">Blockers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {MOCK_CHANNEL_READINESS.map((ch, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-1 px-1.5 font-bold text-gray-800 text-[9.5px]">{ch.channel}</td>
                      <td className="py-1 px-1.5 font-bold text-emerald-700">Eligible</td>
                      <td className="py-1 px-1.5 font-semibold text-rose-600">{ch.published ? "Published" : "Not Published"}</td>
                      <td className="py-1 px-1.5 text-center font-bold text-rose-600">{ch.blockersCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={() => onSelectTab("publication")}
            className="mt-2 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5"
          >
            <span>View channel publication report</span>
            <ChevronRight size={12} />
          </button>
        </div>

        {/* 12. Linked Records */}
        <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2.5">
              12. Linked Records
            </h3>
            <div className="space-y-1 text-[11px]">
              {MOCK_LINKED_RECORDS.map((rec, i) => (
                <div key={i} className="flex items-center justify-between py-0.5 border-b border-gray-50">
                  <span className="text-gray-600">{rec.type}</span>
                  <span className="font-mono font-bold text-[#741d35] cursor-pointer hover:underline">
                    {rec.reference}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-3 text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View all linked records</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Wide Product Master Health Scorecard */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-3">Product Master Health Scorecard</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "Identity Completeness", val: 98, status: "good" },
            { label: "Classification Quality", val: 94, status: "good" },
            { label: "Brand Verification", val: 96, status: "good" },
            { label: "Compliance Readiness", val: 72, status: "warning" },
            { label: "Variant Readiness", val: 100, status: "good" },
            { label: "Media Readiness", val: 80, status: "warning" },
            { label: "Inventory Linkage", val: 90, status: "good" },
            { label: "Publication Readiness", val: 68, status: "alert" },
          ].map((m, i) => (
            <div key={i} className="flex flex-col gap-1 p-2 bg-gray-50 rounded border border-gray-100">
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-semibold text-gray-600 truncate">{m.label}</span>
                <span className="font-bold text-gray-900">{m.val}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    m.status === "good" ? "bg-emerald-500" : m.status === "warning" ? "bg-amber-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${m.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Blocking Issues Table */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900">Product Blocking Issues</h3>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline">View all issues</button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[9.5px]">
                <th className="py-2 px-3">Issue</th>
                <th className="py-2 px-3">Area</th>
                <th className="py-2 px-3">Severity</th>
                <th className="py-2 px-3">Impact</th>
                <th className="py-2 px-3">Owner</th>
                <th className="py-2 px-3">Opened</th>
                <th className="py-2 px-3">SLA</th>
                <th className="py-2 px-3">Recommended Action</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_BLOCKING_ISSUES.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{issue.issue}</td>
                  <td className="py-2.5 px-3 text-gray-600">{issue.area}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        issue.severity === "High" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-rose-600">{issue.impact}</td>
                  <td className="py-2.5 px-3 text-gray-700">{issue.owner}</td>
                  <td className="py-2.5 px-3 text-gray-500">{issue.openedDate}</td>
                  <td className="py-2.5 px-3 font-bold text-amber-600">{issue.sla}</td>
                  <td className="py-2.5 px-3 text-gray-600 text-[10.5px]">{issue.recommendedAction}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onOpenIssueModal(issue.id)}
                      className="px-2.5 py-1 rounded bg-[#741d35] text-white text-[10.5px] font-bold hover:bg-[#5c172a]"
                    >
                      {issue.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Product Master Activity Log Table */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900">Recent Product Master Activity</h3>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline">View full audit history</button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[9.5px]">
                <th className="py-2 px-3">Event</th>
                <th className="py-2 px-3">Changed Area</th>
                <th className="py-2 px-3">Previous Value</th>
                <th className="py-2 px-3">New Value</th>
                <th className="py-2 px-3">Performed By</th>
                <th className="py-2 px-3">Role</th>
                <th className="py-2 px-3">Date & Time</th>
                <th className="py-2 px-3">Reason</th>
                <th className="py-2 px-3">Result</th>
                <th className="py-2 px-3 text-right">Audit Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MOCK_RECENT_AUDIT_ACTIVITIES.map((act) => (
                <tr key={act.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{act.event}</td>
                  <td className="py-2.5 px-3 text-gray-700">{act.changedArea}</td>
                  <td className="py-2.5 px-3 text-gray-500 font-mono text-[10.5px]">{act.previousValue}</td>
                  <td className="py-2.5 px-3 text-gray-800 font-mono font-bold text-[10.5px]">{act.newValue}</td>
                  <td className="py-2.5 px-3 font-medium text-gray-800">{act.performedBy}</td>
                  <td className="py-2.5 px-3 text-gray-500 text-[10.5px]">{act.role}</td>
                  <td className="py-2.5 px-3 text-gray-500 text-[10.5px]">{act.dateTime}</td>
                  <td className="py-2.5 px-3 text-gray-600 text-[10.5px]">{act.reason}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-emerald-700 font-bold">{act.result}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-[#741d35] cursor-pointer hover:underline">
                    {act.auditRecord}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
