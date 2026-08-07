"use client";

import React from "react";
import { CheckCircle2, ChevronRight, Clock, FileEdit, HelpCircle, ShieldCheck, Tag, XCircle, MoreVertical } from "lucide-react";

export function ProductApprovalSection() {
  return (
    <div className="bg-white rounded-xl border border-line p-5 shadow-sm flex flex-col">
      <h3 className="text-[14px] font-bold text-ink mb-6">Product Approval Operations</h3>
      
      {/* Pipeline */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto scrollbar-none pb-2">
        {[
          { label: "Draft", count: 486, icon: FileEdit, color: "text-slate-500", bg: "bg-slate-100" },
          { label: "Submitted", count: 312, icon: Clock, color: "text-[#0284c7]", bg: "bg-blue-50 border border-blue-100" },
          { label: "Initial Review", count: 126, icon: CheckCircle2, color: "text-[#0284c7]", bg: "bg-blue-50 border border-blue-100" },
          { label: "Brand Auth.", count: 48, icon: Tag, color: "text-[#ea580c]", bg: "bg-orange-50 border border-orange-100" },
          { label: "Compliance Review", count: 36, icon: ShieldCheck, color: "text-[#8b5cf6]", bg: "bg-purple-50 border border-purple-100" },
          { label: "Info Requested", count: 42, icon: HelpCircle, color: "text-[#ea580c]", bg: "bg-orange-50 border border-orange-100" },
          { label: "Final Decision", count: 28, icon: CheckCircle2, color: "text-[#0284c7]", bg: "bg-blue-50 border border-blue-100" },
          { label: "Approved", count: 294, icon: CheckCircle2, color: "text-[#059669]", bg: "bg-green-50 border border-green-100" },
          { label: "Rejected", count: 28, icon: XCircle, color: "text-[#dc2626]", bg: "bg-red-50 border border-red-100" },
          { label: "Published", count: 271, icon: CheckCircle2, color: "text-[#059669]", bg: "bg-green-50 border border-green-100" },
        ].map((step, i, arr) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.bg}`}>
                <step.icon size={16} className={step.color} />
              </div>
              <div className="text-center">
                <div className="text-[10px] font-semibold text-muted leading-tight whitespace-nowrap">{step.label}</div>
                <div className="text-[12px] font-bold text-ink">{step.count}</div>
              </div>
            </div>
            {i < arr.length - 1 && (
              <ChevronRight size={14} className="text-slate-300 flex-shrink-0 mx-1 mb-6" strokeWidth={3} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Priority Approvals Table */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <h4 className="text-[12px] font-bold text-ink">Priority Product Approvals</h4>
        <button className="text-[11px] font-bold text-[#741d35] hover:underline flex items-center gap-1">View All Approvals <ChevronRight size={12} /></button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line bg-white">
              <th className="py-2.5 px-2 text-[10px] font-bold text-muted w-8"><input type="checkbox" className="rounded border-line" /></th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink">Product</th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink">Submission ID</th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink">Brand</th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink">Risk</th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink">SLA</th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink">Reviewer</th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink">Status</th>
              <th className="py-2.5 px-2 text-[10px] font-bold text-ink text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { product: "Radiance Vitamin C Serum", size: "30 ml", id: "AUTH-2026-0892", brand: "Estée Lauder", risk: "High", riskColor: "text-red-700 bg-red-50 border border-red-100", sla: "2 hours", slaColor: "text-red-600", reviewer: "Elena Vance", status: "Pending Review", statusColor: "text-[#ea580c]", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80" },
              { product: "Tokyo Brightening Essence", size: "100 ml", id: "AUTH-2026-0915", brand: "Shiseido", risk: "Medium", riskColor: "text-orange-700 bg-orange-50 border border-orange-100", sla: "12 hours", slaColor: "text-orange-600", reviewer: "Marcus Lee", status: "In Progress", statusColor: "text-[#0284c7]", img: "https://images.unsplash.com/photo-1608248593842-8021c6a256d0?w=100&q=80" },
              { product: "Luxe Silk Lipstick Ruby Red", size: "", id: "AUTH-2026-0781", brand: "Chanel Beauty", risk: "Low", riskColor: "text-green-700 bg-green-50 border border-green-100", sla: "24 hours", slaColor: "text-ink", reviewer: "Priya Kapoor", status: "In Progress", statusColor: "text-[#0284c7]", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&q=80" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                <td className="py-3 px-2 w-8"><input type="checkbox" className="rounded border-line" /></td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="w-8 h-8 bg-slate-100 rounded border border-line overflow-hidden flex-shrink-0">
                      <img src={row.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[11px] font-bold text-[#741d35] hover:underline cursor-pointer leading-tight">{row.product}</span>
                       <span className="text-[10px] text-muted">{row.size}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-[10px] font-bold text-ink">{row.id}</td>
                <td className="py-3 px-2 text-[10px] font-semibold text-muted">{row.brand}</td>
                <td className="py-3 px-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${row.riskColor}`}>{row.risk}</span>
                </td>
                <td className={`py-3 px-2 text-[10px] font-bold ${row.slaColor}`}>{row.sla}</td>
                <td className="py-3 px-2">
                   <div className="flex items-center gap-1.5">
                     <div className="w-4 h-4 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                       <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.reviewer)}&background=random&color=fff&size=40`} alt="" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-[10px] font-bold text-ink">{row.reviewer}</span>
                   </div>
                </td>
                <td className={`py-3 px-2 text-[10px] font-bold ${row.statusColor}`}>{row.status}</td>
                <td className="py-3 px-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="text-[9px] font-bold px-2.5 py-1 border border-[#741d35] text-[#741d35] rounded hover:bg-red-50 transition-colors">Open Approval</button>
                    <button className="p-1 text-muted hover:bg-slate-100 rounded transition-colors"><MoreVertical size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
