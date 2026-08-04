"use client";

import React from "react";

export function BottomSummaryPanels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Product Data Quality */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h4 className="text-[12px] font-bold text-ink mb-4">Product Data Quality</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
           <div><span className="text-[11px] text-muted">Incomplete Identity</span> <span className="text-[11px] font-bold text-red-600 float-right">248</span></div>
           <div><span className="text-[11px] text-muted">Invalid Barcode</span> <span className="text-[11px] font-bold text-red-600 float-right">22</span></div>
           <div><span className="text-[11px] text-muted">Missing Category</span> <span className="text-[11px] font-bold text-red-600 float-right">124</span></div>
           <div><span className="text-[11px] text-muted">Missing Media</span> <span className="text-[11px] font-bold text-red-600 float-right">124</span></div>
           <div><span className="text-[11px] text-muted">Missing Brand</span> <span className="text-[11px] font-bold text-amber-600 float-right">126</span></div>
           <div><span className="text-[11px] text-muted">Duplicate Candidates</span> <span className="text-[11px] font-bold text-amber-600 float-right">36</span></div>
        </div>
        <button className="text-[11px] text-[#8b2c45] font-semibold hover:underline w-full text-center">View full data quality report &rarr;</button>
      </div>

      {/* Variant & Attribute Readiness */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h4 className="text-[12px] font-bold text-ink mb-4">Variant & Attribute Readiness</h4>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-bold text-muted">Overall Variant Readiness</span>
          <span className="text-[12px] font-bold text-green-600">91%</span>
        </div>
        <button className="text-[11px] text-[#8b2c45] font-semibold hover:underline w-full text-center">View details &rarr;</button>
      </div>

      {/* Product Media Readiness */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h4 className="text-[12px] font-bold text-ink mb-4">Product Media Readiness</h4>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-bold text-muted">Missing Images</span>
          <span className="text-[11px] font-bold text-red-600">124</span>
        </div>
        <button className="text-[11px] text-[#8b2c45] font-semibold hover:underline w-full text-center">View media report &rarr;</button>
      </div>

      {/* Inventory & Batch Linkage */}
      <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
        <h4 className="text-[12px] font-bold text-ink mb-4">Inventory & Batch Linkage</h4>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] font-bold text-muted">Inventory Linked</span>
          <span className="text-[11px] font-bold text-ink">11,420</span>
        </div>
        <button className="text-[11px] text-[#8b2c45] font-semibold hover:underline w-full text-center">View inventory report &rarr;</button>
      </div>
    </div>
  );
}
