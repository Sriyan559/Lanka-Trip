"use client";

import React from "react";

interface ChannelStatusBadgeProps {
  status: "Healthy" | "Warning" | "Degraded" | "Disconnected" | string;
  type?: "channel" | "providerSync" | "governance";
}

export function ChannelStatusBadge({
  status,
  type = "channel",
}: ChannelStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "Healthy":
      case "Compliant":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Warning":
      case "Under Review":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Degraded":
      case "Non-Compliant":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "Disconnected":
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
