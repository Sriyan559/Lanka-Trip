"use client";

import React from "react";

interface BudgetStatusBadgeProps {
  status: string;
  type?: "status" | "spendHealth" | "approval";
}

export function BudgetStatusBadge({
  status,
  type = "status",
}: BudgetStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "Active":
      case "Healthy":
      case "Approved":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Pending Approval":
      case "Awaiting Approval":
      case "Pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Overspend Risk":
      case "Rejected":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "Underspend Risk":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Closed":
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${getBadgeStyle()}`}
    >
      {status}
    </span>
  );
}
