"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ReturnRefundCase } from "./types";

interface ReturnsRefundPortfolioTableProps {
  cases: ReturnRefundCase[];
  selectedId: string;
  onSelect: (c: ReturnRefundCase) => void;
}

export function ReturnsRefundPortfolioTable({
  cases,
  selectedId,
  onSelect,
}: ReturnsRefundPortfolioTableProps) {
  const getBadgeStyle = (val: string) => {
    switch (val) {
      case "High":
      case "Critical":
        return "text-red-700 font-bold bg-red-50 border-red-200";
      case "Medium":
        return "text-amber-700 font-semibold bg-amber-50 border-amber-200";
      case "Low":
        return "text-slate-600 font-medium bg-slate-100 border-slate-200";
      case "Refund Pending":
        return "text-red-700 font-bold bg-red-50 border-red-200";
      case "Pickup Open":
        return "text-blue-700 font-semibold bg-blue-50 border-blue-200";
      case "Inspection":
      case "Inspection Pending":
        return "text-purple-700 font-semibold bg-purple-50 border-purple-200";
      case "Inspection Pass":
      case "Completed":
      case "Eligible":
      case "Refund Approved":
        return "text-emerald-700 font-semibold bg-emerald-50 border-emerald-200";
      case "Inspection Fail":
      case "Not Eligible":
      case "Refund Failed":
      case "Dispute Open":
        return "text-red-800 font-bold bg-red-100 border-red-300";
      case "Under Review":
        return "text-amber-800 font-semibold bg-amber-50 border-amber-200";
      case "At Risk":
        return "text-rose-700 font-bold bg-rose-50 border-rose-200";
      case "On Track":
        return "text-emerald-700 font-semibold bg-emerald-50 border-emerald-200";
      default:
        return "text-slate-700 font-medium bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden mb-6">
      {/* Header Bar */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight">Returns, Refunds &amp; Dispute Support Portfolio (264)</h3>
        <span className="text-[11px] text-slate-500 font-medium">264 total active cases</span>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-100/80 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-3">Case Ref</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Priority</th>
              <th className="py-2 px-3">Issue Type</th>
              <th className="py-2 px-3">Case Status</th>
              <th className="py-2 px-3">Related Order</th>
              <th className="py-2 px-3">Return Status</th>
              <th className="py-2 px-3">Pickup Status</th>
              <th className="py-2 px-3">Inspection Status</th>
              <th className="py-2 px-3">Refund Ref</th>
              <th className="py-2 px-3">Refund Status</th>
              <th className="py-2 px-3">Refund Amount</th>
              <th className="py-2 px-3">Dispute Status</th>
              <th className="py-2 px-3">Eligibility</th>
              <th className="py-2 px-3">Supplier</th>
              <th className="py-2 px-3">Dependency</th>
              <th className="py-2 px-3">Sentiment</th>
              <th className="py-2 px-3">Risk</th>
              <th className="py-2 px-3">SLA</th>
              <th className="py-2 px-3">Assigned Agent</th>
              <th className="py-2 px-3">Assigned Team</th>
              <th className="py-2 px-3">Last Customer Update</th>
              <th className="py-2 px-3">Age</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={23} className="py-8 text-center text-xs text-slate-400 font-medium">
                  No return, refund or dispute cases found.
                </td>
              </tr>
            ) : (
              cases.map((item) => {
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
                    {/* Case Ref (Navigates to CS03) */}
                    <td className="py-2 px-3">
                      <Link
                        href={`/admin/customer-support/cases/${item.id}`}
                        className="font-mono text-blue-600 hover:underline font-bold inline-flex items-center gap-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{item.id}</span>
                        <ArrowUpRight size={10} />
                      </Link>
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

                    {/* Priority */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>

                    {/* Issue Type */}
                    <td className="py-2 px-3 font-semibold text-slate-800">{item.issueType}</td>

                    {/* Case Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.caseStatus)}`}>
                        {item.caseStatus}
                      </span>
                    </td>

                    {/* Related Order */}
                    <td className="py-2 px-3 font-mono text-blue-600 hover:underline font-medium">
                      <Link href="/admin/orders" onClick={(e) => e.stopPropagation()}>
                        {item.relatedOrderId}
                      </Link>
                    </td>

                    {/* Return Status */}
                    <td className="py-2 px-3 font-medium text-slate-800">{item.returnStatus}</td>

                    {/* Pickup Status */}
                    <td className="py-2 px-3 text-slate-700">{item.pickupStatus}</td>

                    {/* Inspection Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.inspectionStatus)}`}>
                        {item.inspectionStatus}
                      </span>
                    </td>

                    {/* Refund Ref */}
                    <td className="py-2 px-3 font-mono text-slate-600">{item.refundRef}</td>

                    {/* Refund Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.refundStatus)}`}>
                        {item.refundStatus}
                      </span>
                    </td>

                    {/* Refund Amount */}
                    <td className="py-2 px-3 font-mono font-semibold text-slate-900">{item.refundAmount}</td>

                    {/* Dispute Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.disputeStatus)}`}>
                        {item.disputeStatus}
                      </span>
                    </td>

                    {/* Eligibility */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.eligibility)}`}>
                        {item.eligibility}
                      </span>
                    </td>

                    {/* Supplier */}
                    <td className="py-2 px-3 font-medium text-slate-800">{item.supplier}</td>

                    {/* Dependency */}
                    <td className="py-2 px-3 text-slate-700">{item.dependency}</td>

                    {/* Sentiment */}
                    <td className="py-2 px-3 text-slate-700">{item.sentiment}</td>

                    {/* Risk */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.risk)}`}>
                        {item.risk}
                      </span>
                    </td>

                    {/* SLA */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.slaStatus)}`}>
                        {item.slaStatus}
                      </span>
                    </td>

                    {/* Assigned Agent */}
                    <td className="py-2 px-3 font-medium text-slate-800">{item.assignedAgent}</td>

                    {/* Assigned Team */}
                    <td className="py-2 px-3 text-slate-600">{item.assignedTeam}</td>

                    {/* Last Customer Update */}
                    <td className="py-2 px-3 text-slate-500">{item.lastCustomerUpdate}</td>

                    {/* Age */}
                    <td className="py-2 px-3 font-semibold text-slate-800">{item.age}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-2.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>Showing 1 to {cases.length} of 264 cases</div>

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
            <span className="text-slate-400 text-[10px]">...</span>
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">11</span>
            <button className="p-1 rounded hover:bg-slate-200 text-slate-600">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
