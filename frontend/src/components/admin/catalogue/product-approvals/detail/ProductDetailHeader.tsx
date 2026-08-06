"use client";

import React from "react";
import { AlertTriangle, ArrowLeft, RefreshCw, ChevronDown, Edit2, CheckCircle2, ShieldCheck, Link2, XCircle, AlertCircle, FileWarning, Box, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProductDetailHeader() {
  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb & Warning */}
      <div className="flex items-center gap-2 text-[11px] font-medium text-muted mb-4">
        <Link href="/admin/catalogue/approvals" className="hover:text-ink flex items-center gap-1">
          <ArrowLeft size={12} /> Back to Product Master Management
        </Link>
      </div>

      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2.5 rounded-lg mb-6 shadow-sm">
        <div className="flex items-center gap-2 text-[12px] font-medium">
          <AlertTriangle size={14} className="text-amber-500" />
          This product master was updated by Marcus Lee (Admin) 2 minutes ago. Please refresh before making changes to avoid conflicts.
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-amber-200 rounded text-[11px] font-bold hover:bg-amber-100 transition-colors">
          <RefreshCw size={12} /> Refresh Data
        </button>
      </div>

      {/* Main Info */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-6">
        <div className="flex items-start gap-5 flex-1">
          <div className="w-28 h-32 bg-white border border-line rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2 relative shadow-sm">
            {/* Using a placeholder since we don't have the actual product image. The image is a brown serum bottle. */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-900 to-amber-700 opacity-20"></div>
            <div className="w-16 h-24 bg-amber-900 rounded-t-lg rounded-b flex flex-col items-center pt-2 border border-amber-950 relative z-10 shadow-lg">
              <div className="w-4 h-6 bg-amber-950 rounded-t border-b border-black"></div>
              <div className="w-10 h-3 bg-amber-100 mt-4 rounded-sm text-[4px] text-center font-bold text-amber-900">ESTEE LAUDER</div>
              <div className="w-8 h-1 bg-amber-100 mt-1"></div>
            </div>
          </div>
          
          <div className="flex flex-col flex-1">
            <h1 className="text-2xl font-bold text-ink mb-4">Radiance Vitamin C Serum - 30 ml</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Public Product Ref</span>
                <span className="text-[12px] font-semibold text-ink">PROD-2024-00421</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Database Product ID</span>
                <span className="text-[12px] font-semibold text-ink">421</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">SKU</span>
                <span className="text-[12px] font-semibold text-ink">RAD-VITC-30ML</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Barcode (GTIN)</span>
                <span className="text-[12px] font-semibold text-ink">8901234567895</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Brand</span>
                <span className="text-[12px] font-bold text-[#741d35] hover:underline cursor-pointer">Estée Lauder</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Supplier</span>
                <span className="text-[12px] font-semibold text-ink hover:underline cursor-pointer">Luxe Distribution Pvt Ltd</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Category</span>
                <span className="text-[12px] font-semibold text-ink">Skincare &gt; Face Serum</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Product Type</span>
                <span className="text-[12px] font-semibold text-ink">Finished Cosmetic Product</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Primary Variant</span>
                <span className="text-[12px] font-semibold text-ink">30 ml</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Country of Origin</span>
                <span className="text-[12px] font-semibold text-ink">USA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Manufacturer</span>
                <span className="text-[12px] font-semibold text-ink">Estée Lauder Companies Inc.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-[280px]">
          <div className="flex justify-end gap-2">
            <button className="h-8 px-3 rounded bg-[#741d35] text-white text-[11px] font-bold hover:bg-[#5a1629] flex items-center gap-1.5 transition-colors shadow-sm">
              <Edit2 size={12} /> Edit Product
            </button>
            <button className="h-8 px-3 rounded bg-white border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm">
              <CheckCircle2 size={12} /> Submit for Approval
            </button>
            <button className="h-8 px-3 rounded bg-white border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm">
              Preview Marketplace Listing
            </button>
            <button className="h-8 px-3 rounded bg-white border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm">
              More Actions <ChevronDown size={12} />
            </button>
          </div>

          <div className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 text-[11px]">
            <div className="flex flex-col gap-3 flex-1 border-b md:border-b-0 md:border-r border-line pb-4 md:pb-0 md:pr-6">
              <div className="flex justify-between items-center">
                <span className="text-muted font-medium">Product Status</span>
                <span className="flex items-center gap-1 font-bold text-[#059669]"><div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div> Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted font-medium">Approval Status</span>
                <span className="font-bold text-[#d97706]">Compliance Review</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted font-medium">Publication Status</span>
                <span className="flex items-center gap-1 font-bold text-[#dc2626]"><div className="w-1.5 h-1.5 rounded-full bg-[#dc2626]"></div> Not Ready</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted font-medium">Risk Level</span>
                <span className="font-bold text-[#059669]">Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted font-medium">Data Completeness</span>
                <span className="font-bold text-ink">85%</span>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Owner / Reviewer</span>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-[#741d35] text-white flex items-center justify-center font-bold text-[10px]">EV</div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink">Elena Vance</span>
                  <span className="text-[10px] text-muted">Compliance Lead</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-muted font-medium">Created Date</span>
                <span className="font-semibold text-ink">Oct 24, 2024</span>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-muted font-medium">Updated At</span>
                <span className="font-semibold text-ink">May 04, 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted font-medium">Record Version</span>
                <span className="font-semibold text-ink">v2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reusable Readiness Badges Row */}
      <ProductReadinessBadges />
    </div>
  );
}

function ProductReadinessBadges() {
  const badges = [
    { label: "Data Completeness", value: "85%", type: "progress", color: "bg-[#059669]", icon: <LayoutGrid size={14} className="text-[#059669]" /> },
    { label: "Compliance Readiness", value: "72%", type: "progress", color: "bg-[#d97706]", icon: <FileWarning size={14} className="text-[#d97706]" /> },
    { label: "Brand Authorization", value: "Valid", type: "status", color: "text-[#059669]", icon: <ShieldCheck size={14} className="text-[#059669]" /> },
    { label: "Variant Readiness", value: "100%", type: "progress", color: "bg-[#059669]", icon: <Box size={14} className="text-[#059669]" /> },
    { label: "Media Readiness", value: "80%", type: "progress", color: "bg-[#d97706]", icon: <div className="w-3.5 h-3.5 border-2 border-[#d97706] rounded-sm relative"><div className="absolute inset-0 bg-[#d97706] m-[2px] rounded-[1px]"></div></div> },
    { label: "Inventory Linkage", value: "Linked", type: "status", color: "text-[#059669]", icon: <Link2 size={14} className="text-[#059669]" /> },
    { label: "Publication Readiness", value: "Not Ready", type: "status", color: "text-[#dc2626]", icon: <XCircle size={14} className="text-[#dc2626]" /> },
    { label: "Duplicate Risk", value: "Low", type: "status", color: "text-[#059669]", icon: <ShieldCheck size={14} className="text-[#059669]" /> },
    { label: "Product Risk Score", value: "38/100", type: "text", color: "text-[#d97706]", subtext: "Medium", icon: <AlertTriangle size={14} className="text-[#d97706]" /> },
    { label: "Open Issues", value: "3", type: "text", color: "text-ink", subtext: "View", icon: <AlertCircle size={14} className="text-[#dc2626]" /> },
    { label: "Active Batches", value: "4", type: "text", color: "text-ink", subtext: "View", icon: <Box size={14} className="text-[#059669]" /> },
    { label: "Channel Coverage", value: "2 of 6", type: "text", color: "text-ink", subtext: "View", icon: <div className="w-3.5 h-3.5 rounded-full border-2 border-[#059669] flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div></div> },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-3 mb-6">
      {badges.map((b, i) => (
        <div key={i} className="bg-white border border-line rounded-xl p-3 flex flex-col justify-between shadow-sm min-w-0">
          <div className="flex items-center gap-1.5 mb-2">
            {b.icon}
            <span className="text-[9px] font-bold text-muted leading-tight truncate">{b.label}</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-[14px] font-bold ${b.type === 'status' ? b.color : 'text-ink'}`}>{b.value}</span>
            {b.type === 'progress' && (
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className={`h-full ${b.color}`} style={{ width: b.value }}></div>
              </div>
            )}
            {b.type === 'text' && b.subtext && (
              <span className={`text-[10px] font-medium mt-0.5 ${b.subtext === 'View' ? 'text-[#741d35] hover:underline cursor-pointer' : b.color}`}>{b.subtext}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
