"use client";

import React from "react";

interface GovernanceStatusBadgeProps {
  status: string;
}

export function GovernanceStatusBadge({ status }: GovernanceStatusBadgeProps) {
  const getBadgeClass = (st: string) => {
    switch (st) {
      case "Clear":
      case "Approved":
      case "Pass":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
      case "Warning":
      case "Warn":
        return "bg-amber-50 text-amber-800 border-amber-200 font-bold";
      case "Review Required":
      case "Review":
        return "bg-orange-50 text-orange-800 border-orange-200 font-bold";
      case "Blocked":
      case "Rejected":
      case "Fail":
        return "bg-rose-50 text-rose-800 border-rose-200 font-bold";
      case "Approval Pending":
      case "Pending":
      case "Pending Approval":
        return "bg-blue-50 text-blue-800 border-blue-200 font-bold";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 font-semibold";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] border whitespace-nowrap ${getBadgeClass(
        status
      )}`}
    >
      {status}
    </span>
  );
}
