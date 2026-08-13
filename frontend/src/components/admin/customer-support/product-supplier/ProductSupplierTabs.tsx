"use client";

import React from "react";

export type ProductTabId =
  | "active-cases"
  | "product-quality"
  | "product-usage"
  | "damaged-defective"
  | "supplier-issues"
  | "authenticity"
  | "counterfeit"
  | "safety-concerns"
  | "batch-lot-review"
  | "compliance-escalations"
  | "sla-risk"
  | "escalated"
  | "resolved"
  | "audit";

interface ProductSupplierTabsProps {
  activeTab: ProductTabId;
  onTabChange: (tab: ProductTabId) => void;
}

const TABS: { id: ProductTabId; label: string }[] = [
  { id: "active-cases", label: "Active Cases" },
  { id: "product-quality", label: "Product Quality" },
  { id: "product-usage", label: "Product Usage" },
  { id: "damaged-defective", label: "Damaged & Defective" },
  { id: "supplier-issues", label: "Supplier Issues" },
  { id: "authenticity", label: "Authenticity" },
  { id: "counterfeit", label: "Counterfeit" },
  { id: "safety-concerns", label: "Safety Concerns" },
  { id: "batch-lot-review", label: "Batch & Lot Review" },
  { id: "compliance-escalations", label: "Compliance Escalations" },
  { id: "sla-risk", label: "SLA Risk" },
  { id: "escalated", label: "Escalated" },
  { id: "resolved", label: "Resolved" },
  { id: "audit", label: "Audit" },
];

export function ProductSupplierTabs({ activeTab, onTabChange }: ProductSupplierTabsProps) {
  return (
    <div className="w-full border-b border-slate-200 mb-4 overflow-x-auto custom-scrollbar scrollbar-none">
      <div className="flex items-center gap-6 text-xs font-semibold whitespace-nowrap min-w-max">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2 transition-colors relative ${
                isActive
                  ? "text-[#800020] font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800020] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
