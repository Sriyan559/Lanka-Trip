"use client";

import React from "react";
import Link from "next/link";
import { GovernancePortfolioItem } from "@/data/marketingGovernance.mock";
import { GovernanceStatusBadge } from "./GovernanceStatusBadge";
import { MoreHorizontal } from "lucide-react";

interface GovernancePortfolioTableProps {
  portfolio: GovernancePortfolioItem[];
  selectedId: string;
  onSelectRecord: (record: GovernancePortfolioItem) => void;
}

export function GovernancePortfolioTable({
  portfolio,
  selectedId,
  onSelectRecord,
}: GovernancePortfolioTableProps) {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Low":
        return "text-emerald-700 font-semibold";
      case "Medium":
        return "text-amber-700 font-bold";
      case "High":
      case "Critical":
        return "text-rose-700 font-bold";
      default:
        return "text-gray-600 font-medium";
    }
  };

  const getApprovalBadge = (app: string) => {
    switch (app) {
      case "Approved":
        return "text-emerald-700 font-bold";
      case "Pending Approval":
        return "text-amber-700 font-bold";
      case "Rejected":
        return "text-rose-700 font-bold";
      default:
        return "text-gray-500 font-medium";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
      <div className="pb-2.5 border-b border-gray-100">
        <h3 className="text-xs font-bold text-gray-900">Marketing Governance Portfolio</h3>
        <p className="text-[11px] text-gray-500 mt-0.5">
          Current governance states, policy evaluations and approval requirements across campaigns, journeys, channels, content and media execution.
        </p>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
              <th className="py-1.5 px-2">Governance Item</th>
              <th className="py-1.5 px-2">Item ID</th>
              <th className="py-1.5 px-2">Type</th>
              <th className="py-1.5 px-2">Related Entity</th>
              <th className="py-1.5 px-2">Entity Type</th>
              <th className="py-1.5 px-2 text-center">Status</th>
              <th className="py-1.5 px-2">Policy</th>
              <th className="py-1.5 px-2">Source</th>
              <th className="py-1.5 px-2 text-center">Severity</th>
              <th className="py-1.5 px-2">Owner</th>
              <th className="py-1.5 px-2 text-center">Approval</th>
              <th className="py-1.5 px-2">Effective From</th>
              <th className="py-1.5 px-2">Review Due</th>
              <th className="py-1.5 px-2 text-center">Exceptions</th>
              <th className="py-1.5 px-2">Last Evaluated</th>
              <th className="py-1.5 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[11px]">
            {portfolio.length === 0 ? (
              <tr>
                <td colSpan={16} className="py-6 text-center text-gray-400 font-medium">
                  No governance records found for the selected filters.
                </td>
              </tr>
            ) : (
              portfolio.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectRecord(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-rose-50/40 border-l-2 border-l-[#800020]"
                        : "hover:bg-gray-50/60"
                    }`}
                  >
                    <td className="py-2 px-2 font-bold text-gray-900">{item.governanceItem}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-500">{item.itemId}</td>
                    <td className="py-2 px-2 font-medium text-gray-700">{item.type}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-600">{item.relatedEntity}</td>
                    <td className="py-2 px-2 font-medium text-gray-600">{item.entityType}</td>
                    <td className="py-2 px-2 text-center">
                      <GovernanceStatusBadge status={item.status} />
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-800">{item.policy}</td>
                    <td className="py-2 px-2 font-medium text-gray-600">{item.source}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={getSeverityBadge(item.severity)}>● {item.severity}</span>
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-700">{item.owner}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={getApprovalBadge(item.approval)}>{item.approval}</span>
                    </td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-600">{item.effectiveFrom}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-600">{item.reviewDue}</td>
                    <td className="py-2 px-2 text-center font-bold text-gray-900">{item.exceptionsCount}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-500">{item.lastEvaluated}</td>
                    <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <Link
                        href={`/admin/marketing/governance/${item.id}`}
                        className="p-1 hover:bg-gray-100 rounded inline-block text-gray-500 hover:text-gray-900"
                        title="Open Governance Detail"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
