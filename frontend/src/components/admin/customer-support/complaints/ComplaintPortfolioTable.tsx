"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { ComplaintItem } from "./types";

interface ComplaintPortfolioTableProps {
  complaints: ComplaintItem[];
  selectedId: string;
  onSelect: (complaint: ComplaintItem) => void;
}

export function ComplaintPortfolioTable({
  complaints,
  selectedId,
  onSelect,
}: ComplaintPortfolioTableProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 font-extrabold border-red-200";
      case "High":
        return "bg-rose-50 text-rose-700 font-bold border-rose-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 font-semibold border-amber-200";
      default:
        return "bg-slate-100 text-slate-600 font-medium border-slate-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Executive Review":
        return "bg-purple-100 text-purple-800 font-bold border-purple-200";
      case "Escalated":
        return "bg-red-50 text-red-700 font-bold border-red-200";
      case "In Progress":
        return "bg-blue-50 text-blue-700 font-semibold border-blue-200";
      case "Waiting Customer":
        return "bg-amber-50 text-amber-800 font-semibold border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 font-medium border-slate-200";
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "Frustrated":
      case "Distressed":
        return "bg-red-50 text-red-800 font-bold border-red-200";
      case "Concerned":
        return "bg-orange-50 text-orange-800 font-semibold border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 font-medium border-slate-200";
    }
  };

  const getSlaBadge = (sla: string) => {
    switch (sla) {
      case "Breached":
        return "bg-red-100 text-red-900 font-extrabold border-red-300";
      case "At Risk":
        return "bg-rose-100 text-rose-800 font-bold border-rose-200";
      default:
        return "bg-emerald-50 text-emerald-700 font-semibold border-emerald-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden mb-6">
      {/* Header Bar */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight">Complaint Portfolio</h3>
        <span className="text-[11px] text-slate-500 font-medium">184 total open complaints</span>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-100/80 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-3">Complaint Reference</th>
              <th className="py-2 px-3">Related Case</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Severity</th>
              <th className="py-2 px-3">Complaint Status</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Root Cause</th>
              <th className="py-2 px-3">Escalation Level</th>
              <th className="py-2 px-3">Sentiment</th>
              <th className="py-2 px-3">Customer Impact</th>
              <th className="py-2 px-3">Financial Impact</th>
              <th className="py-2 px-3">SLA Status</th>
              <th className="py-2 px-3">Recovery Status</th>
              <th className="py-2 px-3">Remedy Status</th>
              <th className="py-2 px-3">Assigned Owner</th>
              <th className="py-2 px-3">Assigned Team</th>
              <th className="py-2 px-3">Related Order</th>
              <th className="py-2 px-3">Supplier</th>
              <th className="py-2 px-3">Last Activity</th>
              <th className="py-2 px-3">Age</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.length === 0 ? (
              <tr>
                <td colSpan={21} className="py-8 text-center text-xs text-slate-400 font-medium">
                  No complaints found
                </td>
              </tr>
            ) : (
              complaints.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-rose-50/70 border-l-4 border-l-[#800020] font-medium text-slate-900"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {/* Complaint Reference */}
                    <td className="py-2 px-3 font-mono font-bold text-[#800020]">{item.id}</td>

                    {/* Related Case (Navigates to CS03) */}
                    <td className="py-2 px-3">
                      {item.relatedCaseId ? (
                        <Link
                          href={`/admin/customer-support/cases/${item.relatedCaseId}`}
                          className="font-mono text-blue-600 hover:underline inline-flex items-center gap-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{item.relatedCaseId}</span>
                          <ArrowUpRight size={10} />
                        </Link>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>

                    {/* Customer */}
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{item.customerName}</span>
                        {item.isVip && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 py-0.2 rounded border border-amber-300">
                            VIP
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Severity */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                        {item.severity}
                      </span>
                    </td>

                    {/* Complaint Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-2 px-3 font-medium text-slate-800">{item.category}</td>

                    {/* Root Cause */}
                    <td className="py-2 px-3 text-slate-700">{item.rootCause}</td>

                    {/* Escalation Level */}
                    <td className="py-2 px-3 font-medium text-slate-800">{item.escalationLevel}</td>

                    {/* Sentiment */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getSentimentBadge(item.sentiment)}`}>
                        {item.sentiment}
                      </span>
                    </td>

                    {/* Customer Impact */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        item.customerImpact === "High" ? "bg-rose-50 text-rose-700 border-rose-200 font-bold" : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}>
                        {item.customerImpact}
                      </span>
                    </td>

                    {/* Financial Impact */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        item.financialImpact === "High" ? "bg-amber-50 text-amber-800 border-amber-200 font-bold" : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}>
                        {item.financialImpact}
                      </span>
                    </td>

                    {/* SLA Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getSlaBadge(item.slaStatus)}`}>
                        {item.slaStatus}
                      </span>
                    </td>

                    {/* Recovery Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        item.recoveryStatus === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold" : "bg-amber-50 text-amber-700 border-amber-200 font-semibold"
                      }`}>
                        {item.recoveryStatus}
                      </span>
                    </td>

                    {/* Remedy Status */}
                    <td className="py-2 px-3">
                      <span className="text-[10px] px-1.5 py-0.5 rounded border bg-amber-50 text-amber-800 border-amber-200 font-semibold">
                        {item.remedyStatus}
                      </span>
                    </td>

                    {/* Assigned Owner */}
                    <td className="py-2 px-3 text-slate-800 font-medium">{item.assignedOwner}</td>

                    {/* Assigned Team */}
                    <td className="py-2 px-3 text-slate-600">{item.assignedTeam}</td>

                    {/* Related Order */}
                    <td className="py-2 px-3 font-mono text-blue-600">{item.relatedOrderId}</td>

                    {/* Supplier */}
                    <td className="py-2 px-3 text-slate-700">{item.supplierName}</td>

                    {/* Last Activity */}
                    <td className="py-2 px-3 text-slate-500">{item.lastActivityAt}</td>

                    {/* Age */}
                    <td className="py-2 px-3 font-semibold text-slate-800">{item.age}</td>

                    {/* Actions */}
                    <td className="py-2 px-3 text-center">
                      <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-2.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>Showing 1 to {complaints.length} of 184 complaints</div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>Rows per page</span>
            <select className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[11px] text-slate-700">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-50">
              <ChevronLeft size={13} />
            </button>
            <span className="px-2 py-0.5 rounded bg-[#800020] text-white font-bold text-[10px]">1</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">2</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">3</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">4</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">5</span>
            <span className="text-slate-400 text-[10px]">...</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">8</span>
            <button className="p-1 rounded hover:bg-slate-200 text-slate-600">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
