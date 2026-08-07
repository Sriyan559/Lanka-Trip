"use client";

import React from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { SharedDataTable } from "../shared/SharedDataTable";

export function BrandsTableSection() {
  const tabs = [
    { label: "All Brands", count: null, active: true },
    { label: "Active", count: "438", active: false },
    { label: "Verified", count: "412", active: false },
    { label: "Pending", count: "24", active: false },
    { label: "Conditional", count: "18", active: false },
    { label: "Expiring", count: "18", active: false },
    { label: "Unauthorized Use", count: "9", active: false },
    { label: "Archived", count: "16", active: false },
  ];

  const tableData = [
    { brand: "Estée Lauder", initials: "EL", id: "BRD-24-0124", owner: "Estée Lauder Companies Inc.", supplier: "Luxe Distribution Pte Ltd", country: "USA", activeProducts: 428, categories: 12, verification: "Verified", auth: "Valid", territory: "Global", channel: "5 / 5", cColor: "bg-[#059669]", comp: "Compliant", compColor: "text-[#059669]", readiness: 92, dupRisk: "Low", dColor: "bg-[#059669]", riskLevel: "Low", rColor: "text-[#059669] border-[#059669] bg-green-50", rep: "Elena Vance", updated: "04 Aug 2026\n10:25 AM" },
    { brand: "Tokyo Beauty", initials: "TB", id: "BRD-24-0182", owner: "Glow Global Exp.", supplier: "Glow Global Exports", country: "Japan", activeProducts: 84, categories: 8, verification: "Verified", auth: "Expiring Soon", authColor: "text-[#ea580c] border-[#ea580c] bg-orange-50", territory: "APAC", channel: "4 / 5", cColor: "bg-[#059669]", comp: "Compliant", compColor: "text-[#059669]", readiness: 78, dupRisk: "Medium", dColor: "bg-[#ea580c]", riskLevel: "Medium", rColor: "text-[#ea580c] border-[#ea580c] bg-orange-50", rep: "Marcus Lee", updated: "04 Aug 2026\n11:27 AM" },
    { brand: "Shiseido", initials: "SH", id: "BRD-24-0201", owner: "Shiseido Co., Ltd.", supplier: "Shiseido Global", country: "Japan", activeProducts: 210, categories: 10, verification: "Verified", auth: "Valid", territory: "Global", channel: "5 / 5", cColor: "bg-[#059669]", comp: "Compliant", compColor: "text-[#059669]", readiness: 85, dupRisk: "Low", dColor: "bg-[#059669]", riskLevel: "Low", rColor: "text-[#059669] border-[#059669] bg-green-50", rep: "Priya Kapoor", updated: "04 Aug 2026\n09:40 AM" },
    { brand: "Chanel Beauty", initials: "CH", id: "BRD-24-0250", owner: "Chanel S.A.S.", supplier: "Luxe Distribution Pte Ltd", country: "France", activeProducts: 320, categories: 11, verification: "Verified", auth: "Valid", territory: "Global", channel: "5 / 5", cColor: "bg-[#059669]", comp: "Compliant", compColor: "text-[#059669]", readiness: 95, dupRisk: "Low", dColor: "bg-[#059669]", riskLevel: "Low", rColor: "text-[#059669] border-[#059669] bg-green-50", rep: "Elena Vance", updated: "04 Aug 2026\n08:55 AM" },
    { brand: "Innisfree", initials: "IN", id: "BRD-24-0278", owner: "Amorepacific Corp.", supplier: "Beauty Asia Pte Ltd", country: "Korea", activeProducts: 156, categories: 6, verification: "Pending", vColor: "text-[#ea580c]", auth: "Conditional", authColor: "text-[#ea580c] border-[#ea580c] bg-orange-50", territory: "APAC", channel: "3 / 5", cColor: "bg-[#ea580c]", comp: "Needs Review", compColor: "text-[#ea580c]", readiness: 64, dupRisk: "High", dColor: "bg-[#dc2626]", riskLevel: "High", rColor: "text-[#dc2626] border-[#dc2626] bg-red-50", rep: "Marcus Lee", updated: "04 Aug 2026\n10:15 AM" },
    { brand: "Glow Cosmetics", initials: "GC", id: "BRD-24-0315", owner: "Glow Cosmetics Pte Ltd", supplier: "Glow Global Exports", country: "Singapore", activeProducts: 96, categories: 7, verification: "Verified", auth: "Expiring Soon", authColor: "text-[#ea580c] border-[#ea580c] bg-orange-50", territory: "APAC", channel: "4 / 5", cColor: "bg-[#059669]", comp: "Compliant", compColor: "text-[#059669]", readiness: 72, dupRisk: "Medium", dColor: "bg-[#ea580c]", riskLevel: "Medium", rColor: "text-[#ea580c] border-[#ea580c] bg-orange-50", rep: "Priya Kapoor", updated: "03 Aug 2026\n12:15 PM" },
  ];

  return (
    <div className="mb-6">
      <SharedDataTable
        tabs={tabs}
        searchPlaceholder="Search brand, ID, owner, supplier..."
        filters={["Verification Status", "Authorization Status", "Brand Owner", "Supplier", "Country", "Channel Eligibility", "Risk Level", "Updated Date"]}
        itemCountLabel="486 brands"
      >
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-line bg-slate-50/50">
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted w-8"><input type="checkbox" className="rounded border-line" /></th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Brand / Logo</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Brand ID</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Legal Owner / Manufacturer</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Primary Supplier</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Country</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Active Products</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-center">Categories</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Verification</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Authorization</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Territory</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Channel Eligibility</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Compliance</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Catalogue Readiness</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Duplicate Risk</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Risk Level</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Brand Owner</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted">Updated At</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 w-8"><input type="checkbox" className="rounded border-line" /></td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-100 border border-line flex flex-col items-center justify-center text-[8px] font-bold text-muted">
                      {row.initials}
                    </div>
                    <span className="text-[11px] font-bold text-ink">{row.brand}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-[10px] font-bold text-muted">{row.id}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.owner}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.supplier}</td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.country}</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink text-center">{row.activeProducts}</td>
                <td className="py-3 px-3 text-[11px] font-bold text-ink text-center">{row.categories}</td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${row.vColor ? row.vColor + ' border-transparent' : 'text-[#059669] border-[#059669] bg-green-50'}`}>{row.verification}</span>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${row.authColor || 'text-[#059669] border-[#059669] bg-green-50'}`}>{row.auth}</span>
                </td>
                <td className="py-3 px-3 text-[10px] text-muted">{row.territory}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-ink">{row.channel}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${row.cColor}`}></div>
                  </div>
                </td>
                <td className={`py-3 px-3 text-[10px] font-bold ${row.compColor}`}>{row.comp}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2 w-24">
                    <span className="text-[11px] font-bold text-ink w-8">{row.readiness}%</span>
                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full">
                      <div className="h-full bg-[#059669] rounded-full" style={{ width: `${row.readiness}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-ink">
                    <div className={`w-1.5 h-1.5 rounded-full ${row.dColor}`}></div> {row.dupRisk}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${row.rColor}`}>{row.riskLevel}</span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.rep)}&background=random&color=fff&size=40`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-semibold text-ink">{row.rep}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-[9px] font-semibold text-muted whitespace-pre-line leading-tight">
                  {row.updated}
                </td>
                <td className="py-3 px-3 text-right">
                  <button className="p-1 text-muted hover:bg-slate-100 rounded transition-colors"><MoreVertical size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SharedDataTable>
    </div>
  );
}

