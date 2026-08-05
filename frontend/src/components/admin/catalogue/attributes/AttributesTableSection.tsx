"use client";

import React from "react";
import { ChevronDown, MoreVertical, Edit2 } from "lucide-react";
import { SharedDataTable } from "../shared/SharedDataTable";

export function AttributesTableSection() {
  const tabs = [
    { label: "All Attributes", count: null, active: true },
    { label: "Variant Defining", count: "14", active: false },
    { label: "Required", count: "82", active: false },
    { label: "Custom Attributes", count: "34", active: false },
    { label: "Needs Normalization", count: "6", active: false },
  ];

  const tableData = [
    { name: "Color / Shade", code: "color_shade", type: "Visual Swatch", req: "Yes", reqColor: "text-[#dc2626] bg-red-50", rules: "Hex Code + Image", sets: 12, values: 1842, sync: "Synced", sColor: "text-[#059669]", variant: true },
    { name: "Size / Volume", code: "size_volume", type: "Numeric + Unit", req: "Yes", reqColor: "text-[#dc2626] bg-red-50", rules: "ml, oz, g, kg", sets: 48, values: 246, sync: "Synced", sColor: "text-[#059669]", variant: true },
    { name: "Skin Type", code: "skin_type", type: "Multi-Select", req: "Yes", reqColor: "text-[#dc2626] bg-red-50", rules: "Standard Dictionary", sets: 8, values: 8, sync: "Synced", sColor: "text-[#059669]", variant: false },
    { name: "SPF Rating", code: "spf_rating", type: "Numeric", req: "Conditional", reqColor: "text-[#ea580c] bg-orange-50", rules: "Max: 100", sets: 4, values: 16, sync: "Pending Sync", sColor: "text-[#ea580c]", variant: false },
    { name: "Finish", code: "makeup_finish", type: "Single-Select", req: "Yes", reqColor: "text-[#dc2626] bg-red-50", rules: "Standard Dictionary", sets: 6, values: 12, sync: "Synced", sColor: "text-[#059669]", variant: true },
    { name: "Key Ingredients", code: "key_ingredients", type: "Multi-Select", req: "No", reqColor: "text-slate-500 bg-slate-100", rules: "INCI Dictionary", sets: 42, values: 846, sync: "Conflict", sColor: "text-[#dc2626]", variant: false },
    { name: "Scent Family", code: "scent_family", type: "Single-Select", req: "Conditional", reqColor: "text-[#ea580c] bg-orange-50", rules: "Standard Dictionary", sets: 2, values: 14, sync: "Synced", sColor: "text-[#059669]", variant: true },
  ];

  return (
    <div className="mb-6">
      <SharedDataTable 
        tabs={tabs}
        searchPlaceholder="Search attributes, codes, or validation rules..."
        filters={["Input Type", "Required Status", "Attribute Set", "Sync Status", "Variant Type"]}
        itemCountLabel="482 attributes"
      >
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-line bg-slate-50/50">
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted w-8"><input type="checkbox" className="rounded border-line" /></th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Attribute Name</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Attribute Code</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Variant Defining</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Input Type</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Required</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Validation Rules</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Sets Used In</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Values Mapped</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Sync Status</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 w-8"><input type="checkbox" className="rounded border-line" /></td>
                <td className="py-3 px-3">
                   <div className="flex items-center gap-2">
                     <span className="text-[11px] font-bold text-ink">{row.name}</span>
                   </div>
                </td>
                <td className="py-3 px-3 text-[10px] font-mono text-muted bg-slate-50 rounded px-2">{row.code}</td>
                <td className="py-3 px-3">
                   {row.variant ? <span className="text-[10px] font-bold text-[#0284c7] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">Variant</span> : <span className="text-[10px] text-muted">-</span>}
                </td>
                <td className="py-3 px-3 text-[10px] font-semibold text-ink">{row.type}</td>
                <td className="py-3 px-3">
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-transparent ${row.reqColor}`}>{row.req}</span>
                </td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.rules}</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink text-center hover:underline cursor-pointer">{row.sets}</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink text-center hover:underline cursor-pointer">{row.values}</td>
                <td className="py-3 px-3">
                   <span className={`text-[10px] font-bold flex items-center gap-1.5 ${row.sColor}`}>
                     <div className={`w-1.5 h-1.5 rounded-full bg-current`}></div>
                     {row.sync}
                   </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                     <button className="p-1 text-muted hover:text-[#741d35] hover:bg-slate-100 rounded transition-colors"><Edit2 size={14} /></button>
                     <button className="p-1 text-muted hover:bg-slate-100 rounded transition-colors"><MoreVertical size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SharedDataTable>
    </div>
  );
}
