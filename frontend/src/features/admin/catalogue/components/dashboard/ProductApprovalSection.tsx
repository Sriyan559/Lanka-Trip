"use client";

import React from "react";
import { CheckCircle2, ChevronRight, Clock, FileEdit, HelpCircle, ShieldCheck, Tag, XCircle } from "lucide-react";

export function ProductApprovalSection() {
  return (
    <div className="bg-white rounded-lg border border-line p-5 shadow-sm">
      <h3 className="text-[13px] font-bold text-ink mb-6">Product Approval Operations</h3>
      
      {/* Pipeline */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {[
          { label: "Draft", count: 486, icon: FileEdit, color: "text-slate-500", bg: "bg-slate-100" },
          { label: "Submitted", count: 312, icon: Clock, color: "text-blue-500", bg: "bg-blue-100" },
          { label: "Initial Review", count: 126, icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Brand Auth", count: 48, icon: Tag, color: "text-amber-500", bg: "bg-amber-100" },
          { label: "Compliance Review", count: 36, icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-100" },
          { label: "Info Requested", count: 42, icon: HelpCircle, color: "text-orange-500", bg: "bg-orange-100" },
          { label: "Final Decision", count: 28, icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-100" },
          { label: "Approved", count: 294, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-100" },
          { label: "Rejected", count: 28, icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
          { label: "Published", count: 271, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
        ].map((step, i, arr) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.bg}`}>
                <step.icon size={18} className={step.color} />
              </div>
              <div className="text-center">
                <div className="text-[10px] font-medium text-muted leading-tight">{step.label}</div>
                <div className="text-[12px] font-bold text-ink">{step.count}</div>
              </div>
            </div>
            {i < arr.length - 1 && (
              <ChevronRight size={16} className="text-slate-300 flex-shrink-0 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Priority Approvals Table */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[12px] font-bold text-ink">Priority Product Approvals</h4>
        <button className="text-[11px] font-semibold text-[#8b2c45] hover:underline">View All Approvals</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-line bg-canvas/50">
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Product</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Submission ID</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Brand</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Risk</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">SLA</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Reviewer</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase">Status</th>
              <th className="py-2 px-3 text-[11px] font-semibold text-muted uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { product: "Radiance Vitamin C Serum", id: "AUTH-2023-0892", brand: "Estée Lauder", risk: "High", riskColor: "text-red-600 bg-red-50", sla: "3 days", slaColor: "text-red-600", reviewer: "Elena Vance", status: "Initial Review" },
              { product: "Tokyo Brightening Essence", id: "AUTH-2023-0915", brand: "Shiseido", risk: "Medium", riskColor: "text-amber-600 bg-amber-50", sla: "2 days", slaColor: "text-amber-600", reviewer: "Marcus Lee", status: "Brand Authorization" },
              { product: "Luxe Silk Lipstick Ruby Red", id: "AUTH-2023-0781", brand: "Chanel Beauty", risk: "Low", riskColor: "text-green-600 bg-green-50", sla: "5 days", slaColor: "text-green-600", reviewer: "Priya Kapoor", status: "Compliance Review" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-line hover:bg-slate-50">
                <td className="py-3 px-3 text-[12px] font-medium text-ink flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded object-cover overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80" alt="" className="w-full h-full object-cover" />
                  </div>
                  {row.product}
                </td>
                <td className="py-3 px-3 text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">{row.id}</td>
                <td className="py-3 px-3 text-[11px] text-muted">{row.brand}</td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${row.riskColor}`}>{row.risk}</span>
                </td>
                <td className={`py-3 px-3 text-[11px] font-semibold ${row.slaColor}`}>{row.sla}</td>
                <td className="py-3 px-3 text-[11px] text-muted">{row.reviewer}</td>
                <td className="py-3 px-3 text-[11px] text-blue-600 font-medium">{row.status}</td>
                <td className="py-3 px-3 text-right">
                  <button className="text-[10px] font-bold px-2 py-1 border border-line rounded hover:bg-slate-100">Open Approval</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
