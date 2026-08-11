"use client";

import React from "react";

interface PaidMediaStatusBadgeProps {
  status: string;
  type?: "status" | "delivery" | "tracking" | "governance";
}

export function PaidMediaStatusBadge({
  status,
  type = "status",
}: PaidMediaStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "Active":
      case "Healthy":
      case "Clear":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Scheduled":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Paused":
      case "Warning":
      case "Partial":
      case "Review Required":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Limited":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Critical":
      case "Broken":
        return "bg-rose-50 text-rose-800 border-rose-200";
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
