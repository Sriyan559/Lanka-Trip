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
    { name: "Shade Name", id: "ATTR-0092", group: "Variants & Attributes", type: "Text", input: "Dropdown", req: "Yes", varGen: "Yes", catCov: "92%", prodUsage: "12,450", valueCount: "48", rules: "48", valRule: "VR-091", inheritance: "None", channel: "5 / 5", comp: "94%", issues: 2, risk: "Med", owner: "E. Vance" },
    { name: "Size", id: "ATTR-0101", group: "Variants & Attributes", type: "Text", input: "Dropdown", req: "Yes", varGen: "Yes", catCov: "98%", prodUsage: "10,962", valueCount: "24", rules: "24", valRule: "VR-102", inheritance: "None", channel: "5 / 5", comp: "96%", issues: 1, risk: "Low", owner: "M. Lee" },
    { name: "SPF Level", id: "ATTR-0115", group: "Skin & Beauty", type: "Number", input: "Dropdown", req: "Conditional", varGen: "No", catCov: "51%", prodUsage: "2,486", valueCount: "6", rules: "6", valRule: "VR-115", inheritance: "None", channel: "4 / 5", comp: "72%", issues: 6, risk: "High", owner: "P. Kapoor" },
    { name: "Fragrance Type", id: "ATTR-0120", group: "Skin & Beauty", type: "Text", input: "Dropdown", req: "Yes", varGen: "No", catCov: "61%", prodUsage: "3,120", valueCount: "12", rules: "12", valRule: "VR-120", inheritance: "None", channel: "4 / 5", comp: "83%", issues: 3, risk: "Med", owner: "E. Vance" },
    { name: "Skin Type", id: "ATTR-0123", group: "Skin & Beauty", type: "Text", input: "Multi-select", req: "Yes", varGen: "No", catCov: "97%", prodUsage: "8,640", valueCount: "5", rules: "4", valRule: "VR-123", inheritance: "None", channel: "5 / 5", comp: "95%", issues: 0, risk: "Low", owner: "M. Lee" },
    { name: "Hair Concern", id: "ATTR-0130", group: "Skin & Beauty", type: "Text", input: "Dropdown", req: "Yes", varGen: "No", catCov: "92%", prodUsage: "3,842", valueCount: "9", rules: "9", valRule: "VR-130", inheritance: "None", channel: "4 / 5", comp: "88%", issues: 2, risk: "Med", owner: "P. Kapoor" },
    { name: "Net Weight", id: "ATTR-0142", group: "Product Identity", type: "Number", input: "Number", req: "Yes", varGen: "No", catCov: "98%", prodUsage: "11,420", valueCount: "-", rules: "-", valRule: "VR-142", inheritance: "None", channel: "5 / 5", comp: "97%", issues: 0, risk: "Low", owner: "E. Vance" },
    { name: "Expiry Format", id: "ATTR-0160", group: "Ingredients & Safety", type: "Text", input: "Dropdown", req: "Yes", varGen: "No", catCov: "98%", prodUsage: "11,108", valueCount: "4", rules: "4", valRule: "VR-160", inheritance: "None", channel: "5 / 5", comp: "99%", issues: 0, risk: "Low", owner: "M. Lee" },
  ];

  return (
    <div className="mb-6">
      <SharedDataTable 
        tabs={tabs}
        searchPlaceholder="Search attribute name, ID or description..."
        filters={["Attribute Group", "Category", "Status", "Data Type", "Required Status"]}
        itemCountLabel="1,842 Attributes"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line bg-slate-50/50">
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted w-8"><input type="checkbox" className="rounded border-line" /></th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Attribute Name</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Attribute ID</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Group</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Data Type</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Input Type</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Req.</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Var. Gen.</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Cat. Cov.</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Prod. Usage</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Value Count</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Rules</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Validation Rule</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Inheritance</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Channel Req.</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Comp.</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Issues</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Risk</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Owner</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} className={`border-b border-line hover:bg-slate-50 transition-colors ${i === 0 ? 'bg-slate-50/50' : ''}`}>
                <td className="py-3 px-3 w-8"><input type="checkbox" className="rounded border-line" defaultChecked={i === 0} /></td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink whitespace-nowrap">{row.name}</td>
                <td className="py-3 px-3 text-[10px] text-muted whitespace-nowrap">{row.id}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.group}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.type}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.input}</td>
                <td className="py-3 px-3">
                  {row.req === "Yes" ? <span className="text-[#059669] font-bold text-[11px]">✓</span> : <span className="text-[#ea580c] text-[11px]">Conditional</span>}
                </td>
                <td className="py-3 px-3">
                   {row.varGen === "Yes" ? <span className="text-[#059669] font-bold text-[11px]">✓</span> : <span className="text-muted text-[11px]">—</span>}
                </td>
                <td className="py-3 px-3 text-[10px] font-medium text-ink text-center">{row.catCov}</td>
                <td className="py-3 px-3 text-[10px] font-medium text-ink text-center">{row.prodUsage}</td>
                <td className="py-3 px-3 text-[10px] font-medium text-ink text-center">{row.valueCount}</td>
                <td className="py-3 px-3 text-[10px] text-muted text-center">{row.rules}</td>
                <td className="py-3 px-3 text-[10px] text-muted whitespace-nowrap">{row.valRule}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.inheritance}</td>
                <td className="py-3 px-3 text-[10px] text-ink text-center">{row.channel}</td>
                <td className="py-3 px-3 text-[10px] font-medium text-ink text-center">{row.comp}</td>
                <td className="py-3 px-3 text-[10px] text-ink text-center">{row.issues}</td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-bold ${row.risk === 'High' ? 'text-[#dc2626]' : row.risk === 'Med' ? 'text-[#ea580c]' : 'text-[#059669]'}`}>{row.risk}</span>
                </td>
                <td className="py-3 px-3 text-[10px] text-muted whitespace-nowrap">{row.owner}</td>
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
