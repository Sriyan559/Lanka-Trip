"use client";

import React from "react";
import { PendingApprovalItem } from "@/data/marketingGovernance.mock";

interface PendingMarketingApprovalsProps {
  pendingApprovals: PendingApprovalItem[];
}

export function PendingMarketingApprovals({ pendingApprovals }: PendingMarketingApprovalsProps) {
  const getPriorityBadge = (prio: string) => {
    switch (prio) {
      case "High":
      case "Critical":
        return "text-rose-700 font-bold bg-rose-50 px-1 rounded";
      case "Medium":
        return "text-amber-700 font-semibold bg-amber-50 px-1 rounded";
      case "Low":
      default:
        return "text-emerald-700 font-medium bg-emerald-50 px-1 rounded";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Pending Marketing Approvals</span>
          <span className="text-[10px] text-[#800020] font-bold">17 Pending / 11 Overdue</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Item</th>
                <th className="py-1">Approval Type</th>
                <th className="py-1">Applies To</th>
                <th className="py-1">Age</th>
                <th className="py-1 text-center">Priority</th>
                <th className="py-1">Approver</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {pendingApprovals.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">{app.item}</td>
                  <td className="py-1.5 font-medium text-gray-700">{app.approvalType}</td>
                  <td className="py-1.5 text-gray-600">{app.appliesTo}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-500">{app.age}</td>
                  <td className="py-1.5 text-center">
                    <span className={getPriorityBadge(app.priority)}>{app.priority}</span>
                  </td>
                  <td className="py-1.5 font-medium text-gray-800">{app.approver}</td>
                  <td className="py-1.5 text-center font-bold text-amber-700">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
