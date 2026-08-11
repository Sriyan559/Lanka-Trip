"use client";

import React from "react";

interface PlacementStatusBadgeProps {
  status: string;
  type?: "status" | "contentReadiness" | "governance";
}

export function PlacementStatusBadge({
  status,
  type = "status",
}: PlacementStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "Active":
      case "Ready":
      case "Clear":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Scheduled":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Paused":
      case "Pending":
      case "Review Required":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Warning":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Expired":
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
