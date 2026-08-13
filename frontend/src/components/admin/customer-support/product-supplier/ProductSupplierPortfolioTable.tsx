"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductSupplierCase } from "./types";

interface ProductSupplierPortfolioTableProps {
  cases: ProductSupplierCase[];
  selectedId: string;
  onSelect: (c: ProductSupplierCase) => void;
}

export function ProductSupplierPortfolioTable({
  cases,
  selectedId,
  onSelect,
}: ProductSupplierPortfolioTableProps) {
  const getBadgeStyle = (val: string) => {
    switch (val) {
      case "Critical":
      case "High":
      case "At Risk":
      case "Negative":
      case "Suspected":
      case "Failed":
        return "text-red-700 font-bold bg-red-50 border-red-200";
      case "Medium":
      case "Concerned":
      case "Under Review":
      case "Under Verification":
      case "Waiting Supplier":
        return "text-amber-800 font-semibold bg-amber-50 border-amber-200";
      case "Low":
      case "Neutral":
      case "Good":
      case "Verified":
      case "Clear":
      case "On Track":
        return "text-emerald-700 font-semibold bg-emerald-50 border-emerald-200";
      case "In Progress":
        return "text-blue-700 font-semibold bg-blue-50 border-blue-200";
      default:
        return "text-slate-700 font-medium bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden mb-6">
      {/* Header Bar */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-4 h-4 bg-[#800020] text-white rounded-full text-[10px] font-extrabold flex items-center justify-center">1</span>
          <span>Product &amp; Supplier Support Portfolio — 198 Active Cases</span>
        </h3>
        <span className="text-[11px] text-slate-500 font-medium">198 total active cases</span>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-100/80 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-3">Case Reference</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Priority</th>
              <th className="py-2 px-3">Issue Type</th>
              <th className="py-2 px-3">Case Status</th>
              <th className="py-2 px-3">Product</th>
              <th className="py-2 px-3">SKU</th>
              <th className="py-2 px-3">Brand</th>
              <th className="py-2 px-3">Supplier</th>
              <th className="py-2 px-3">Batch/Lot</th>
              <th className="py-2 px-3">Product Quality Risk</th>
              <th className="py-2 px-3">Authenticity Status</th>
              <th className="py-2 px-3">Safety Status</th>
              <th className="py-2 px-3">Compliance Status</th>
              <th className="py-2 px-3">Dependency</th>
              <th className="py-2 px-3">Sentiment</th>
              <th className="py-2 px-3">Risk</th>
              <th className="py-2 px-3">SLA</th>
              <th className="py-2 px-3">Assigned Agent</th>
              <th className="py-2 px-3">Assigned Team</th>
              <th className="py-2 px-3">Last Supplier Update</th>
              <th className="py-2 px-3">Last Compliance Update</th>
              <th className="py-2 px-3">Last Customer Update</th>
              <th className="py-2 px-3">Age</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={24} className="py-8 text-center text-xs text-slate-400 font-medium">
                  No product, supplier or authenticity support cases found.
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
                    {/* Case Reference (Navigates to CS03) */}
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

                    {/* Product */}
                    <td className="py-2 px-3 font-semibold text-[#800020] truncate max-w-[180px]">
                      <Link href="/admin/catalogue" onClick={(e) => e.stopPropagation()} className="hover:underline">
                        {item.productName}
                      </Link>
                    </td>

                    {/* SKU */}
                    <td className="py-2 px-3 font-mono text-slate-600 text-[11px]">{item.sku}</td>

                    {/* Brand */}
                    <td className="py-2 px-3 text-slate-800">{item.brand}</td>

                    {/* Supplier */}
                    <td className="py-2 px-3 font-medium text-slate-800">
                      <Link href="/admin/brands-suppliers" onClick={(e) => e.stopPropagation()} className="hover:underline text-slate-900">
                        {item.supplier}
                      </Link>
                    </td>

                    {/* Batch/Lot */}
                    <td className="py-2 px-3 font-mono text-slate-600 text-[11px]">{item.batchLot}</td>

                    {/* Product Quality Risk */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.productQualityRisk)}`}>
                        {item.productQualityRisk}
                      </span>
                    </td>

                    {/* Authenticity Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.authenticityStatus)}`}>
                        {item.authenticityStatus}
                      </span>
                    </td>

                    {/* Safety Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.safetyStatus)}`}>
                        {item.safetyStatus}
                      </span>
                    </td>

                    {/* Compliance Status */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.complianceStatus)}`}>
                        {item.complianceStatus}
                      </span>
                    </td>

                    {/* Dependency */}
                    <td className="py-2 px-3 text-slate-700">{item.dependency}</td>

                    {/* Sentiment */}
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getBadgeStyle(item.sentiment)}`}>
                        {item.sentiment}
                      </span>
                    </td>

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

                    {/* Last Supplier Update */}
                    <td className="py-2 px-3 text-slate-500">{item.lastSupplierUpdate}</td>

                    {/* Last Compliance Update */}
                    <td className="py-2 px-3 text-slate-500">{item.lastComplianceUpdate}</td>

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
        <div>Showing 1 to {cases.length} of 198 cases</div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>Rows per page</span>
            <select className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[11px] text-slate-700">
              <option>10</option>
              <option>25</option>
              <option>50</option>
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
            <span className="px-1.5 py-0.5 text-slate-600 text-[10px]">40</span>
            <button className="p-1 rounded hover:bg-slate-200 text-slate-600">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
