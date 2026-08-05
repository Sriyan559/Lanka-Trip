"use client";

import React from "react";

export function DetailTabs() {
  const tabs = [
    "Overview",
    "Identity & Classification",
    "Brand & Supplier",
    "Product Content",
    "Ingredients & Safety",
    "Variants & Attributes",
    "Images & Media",
    "Compliance & Approval",
    "Inventory & Batches",
    "Pricing & Tax",
    "Publication & Channels",
    "Audit History"
  ];

  return (
    <div>
      <div className="flex overflow-x-auto border-b border-line px-2">
        {tabs.map((t, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-3 text-[12px] font-semibold border-b-2 transition-colors ${i === 0 ? 'border-[#8b2c45] text-[#8b2c45]' : 'border-transparent text-muted hover:text-ink'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="p-6">
        <h3 className="text-sm font-bold text-ink mb-4">Product Overview</h3>
        <p className="text-[12px] text-muted mb-8">
          Detailed breakdown of all product sections will be implemented here. For now, this serves as a placeholder for the Overview tab content.
        </p>

        {/* Dummy content representing the grid of panels shown in the mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-line rounded p-4">
            <h4 className="text-[11px] font-bold text-ink mb-3">1. Product Identity</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-muted">Public Ref</span><span className="font-medium text-ink">PROD-2024-00421</span></div>
              <div className="flex justify-between"><span className="text-muted">SKU</span><span className="font-medium text-ink">RAD-VITC-30ML</span></div>
              <div className="flex justify-between"><span className="text-muted">Status</span><span className="font-bold text-green-600">Active</span></div>
            </div>
          </div>
          <div className="border border-line rounded p-4">
            <h4 className="text-[11px] font-bold text-ink mb-3">2. Classification</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-muted">Department</span><span className="font-medium text-ink">Skincare</span></div>
              <div className="flex justify-between"><span className="text-muted">Category</span><span className="font-medium text-ink">Face Serum</span></div>
            </div>
          </div>
          <div className="border border-line rounded p-4">
            <h4 className="text-[11px] font-bold text-ink mb-3">3. Brand & Supplier</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-muted">Brand</span><span className="font-medium text-ink">Estée Lauder</span></div>
              <div className="flex justify-between"><span className="text-muted">Auth Status</span><span className="font-bold text-green-600">Valid</span></div>
            </div>
          </div>
          <div className="border border-line rounded p-4">
            <h4 className="text-[11px] font-bold text-ink mb-3">4. Product Content</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-muted">Title</span><span className="font-medium text-ink truncate w-24">Radiance Vitamin C...</span></div>
              <div className="flex justify-between"><span className="text-muted">Completeness</span><span className="font-medium text-ink">85%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
