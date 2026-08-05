"use client";

import React from "react";

export function CatalogueQualityScorecard() {
  const scorecards = [
    { label: "Identity Completeness", value: "96%" },
    { label: "Classification Quality", value: "94%" },
    { label: "Brand Verification", value: "92%" },
    { label: "Compliance Readiness", value: "89%" },
    { label: "Media Readiness", value: "84%" },
    { label: "Inventory Linkage", value: "90%" },
    { label: "Publication Readiness", value: "82%" },
    { label: "Duplicate Control", value: "86%" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-5 shadow-sm mb-6">
      <h3 className="text-[13px] font-bold text-ink mb-5">Catalogue Quality Scorecard</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-6">
        {scorecards.map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-muted truncate">{item.label}</span>
            <div className="text-xl font-bold text-ink leading-none">{item.value}</div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 mt-1">
              <div 
                className={`h-full rounded-full ${parseInt(item.value) >= 90 ? 'bg-[#059669]' : parseInt(item.value) >= 85 ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`} 
                style={{ width: item.value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
