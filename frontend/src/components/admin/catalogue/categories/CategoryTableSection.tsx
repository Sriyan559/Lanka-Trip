"use client";

import React from "react";
import { SharedDataTable, SharedDataTableTab } from "../shared/SharedDataTable";
import { ChevronRight, ChevronDown, FolderTree, AlertCircle, Settings } from "lucide-react";

export function CategoryTableSection() {
  const tabs: SharedDataTableTab[] = [
    { label: "All Categories", count: null, active: true },
    { label: "Active", count: "132", active: false },
    { label: "Draft", count: "8", active: false },
    { label: "Review Required", count: "14", active: false },
    { label: "Missing Attributes", count: "18", active: false },
    { label: "Duplicates", count: "6", active: false },
    { label: "Uncategorized", count: "22", active: false },
    { label: "Archived", count: "16", active: false },
  ];

  const [rows, setRows] = React.useState([
    { id: "CAT-1000", path: "Skincare", level: "L1 (Department)", parent: "None", childCount: 12, products: "4,250", reqAttr: 4, status: "Active", updated: "04 Aug 2026", expanded: true, risk: false },
    { id: "CAT-1001", path: "Skincare > Face", level: "L2 (Category)", parent: "Skincare", childCount: 8, products: "2,100", reqAttr: 6, status: "Active", updated: "03 Aug 2026", expanded: false, risk: false, indent: 1 },
    { id: "CAT-1002", path: "Skincare > Face > Serums", level: "L3 (Subcategory)", parent: "Face", childCount: 0, products: "450", reqAttr: 12, status: "Active", updated: "01 Aug 2026", expanded: false, risk: false, indent: 2 },
    { id: "CAT-1003", path: "Skincare > Face > Moisturizers", level: "L3 (Subcategory)", parent: "Face", childCount: 0, products: "820", reqAttr: 10, status: "Review Required", updated: "01 Aug 2026", expanded: false, risk: true, indent: 2 },
    { id: "CAT-2000", path: "Makeup", level: "L1 (Department)", parent: "None", childCount: 8, products: "3,100", reqAttr: 2, status: "Active", updated: "28 Jul 2026", expanded: false, risk: false },
  ]);

  const toggleExpand = (index: number) => {
    setRows(prev => prev.map((r, idx) => idx === index ? { ...r, expanded: !r.expanded } : r));
  };

  return (
    <div className="mb-6">
      <SharedDataTable 
        tabs={tabs}
        searchPlaceholder="Search categories, ID, path..."
        filters={["Level", "Status", "Parent Category", "Attribute Completeness", "Updated Date"]}
        itemCountLabel="148 Categories"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-line">
                <th className="py-2.5 px-3 w-8"><input type="checkbox" className="rounded border-line" /></th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Category ID</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Hierarchy Path</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Level</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Parent Category</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Child Cats</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Products</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Req. Attr.</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider">Updated Date</th>
                <th className="py-2.5 px-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 w-8"><input type="checkbox" className="rounded border-line" /></td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] font-bold text-[#741d35] flex items-center gap-1.5 cursor-pointer hover:underline">
                      <FolderTree size={12} className="text-muted" /> {row.id}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1" style={{ paddingLeft: `${(row.indent || 0) * 16}px` }}>
                      {row.childCount > 0 ? (
                        row.expanded ? (
                          <ChevronDown size={14} className="text-muted cursor-pointer hover:text-ink transition-colors" onClick={() => toggleExpand(i)} />
                        ) : (
                          <ChevronRight size={14} className="text-muted cursor-pointer hover:text-ink transition-colors" onClick={() => toggleExpand(i)} />
                        )
                      ) : (
                        <div className="w-3.5" />
                      )}
                      <span className="text-[12px] font-semibold text-ink">{row.path}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{row.level}</span>
                  </td>
                  <td className="py-3 px-3 text-[12px] font-medium text-muted">{row.parent}</td>
                  <td className="py-3 px-3 text-[12px] font-semibold text-ink text-right">{row.childCount}</td>
                  <td className="py-3 px-3 text-[12px] font-semibold text-ink text-right">{row.products}</td>
                  <td className="py-3 px-3 text-[12px] font-semibold text-ink text-right">{row.reqAttr}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {row.risk && <AlertCircle size={10} />}
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[11px] font-medium text-muted">{row.updated}</td>
                  <td className="py-3 px-3">
                    <button className="text-muted hover:text-ink"><Settings size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SharedDataTable>
    </div>
  );
}
