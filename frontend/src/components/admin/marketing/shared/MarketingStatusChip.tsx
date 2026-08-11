"use client";

import React from "react";

export type StatusCategory =
  | "lifecycle"
  | "health"
  | "approval"
  | "governance"
  | "severity";

interface MarketingStatusChipProps {
  status: string;
  category?: StatusCategory;
  className?: string;
}

export function MarketingStatusChip({
  status,
  category = "lifecycle",
  className = "",
}: MarketingStatusChipProps) {
  const norm = (status || "").toLowerCase().trim();

  let badgeStyle = "bg-gray-100 text-gray-700 border-gray-200";
  let dotStyle = "bg-gray-400";

  if (
    norm === "active" ||
    norm === "approved" ||
    norm === "healthy" ||
    norm === "compliant" ||
    norm === "running" ||
    norm === "good" ||
    norm === "synced"
  ) {
    badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-200/80";
    dotStyle = "bg-emerald-500";
  } else if (
    norm === "scheduled" ||
    norm === "info" ||
    norm === "information"
  ) {
    badgeStyle = "bg-blue-50 text-blue-800 border-blue-200/80";
    dotStyle = "bg-blue-500";
  } else if (
    norm === "awaiting approval" ||
    norm === "awaiting_approval" ||
    norm === "pending" ||
    norm === "warning" ||
    norm === "consent warning" ||
    norm === "frequency cap" ||
    norm === "medium"
  ) {
    badgeStyle = "bg-amber-50 text-amber-800 border-amber-200/80";
    dotStyle = "bg-amber-500";
  } else if (
    norm === "approval required" ||
    norm === "critical" ||
    norm === "high priority" ||
    norm === "high" ||
    norm === "violation" ||
    norm === "degraded" ||
    norm === "failed"
  ) {
    badgeStyle = "bg-rose-50 text-rose-800 border-rose-200/80";
    dotStyle = "bg-rose-500";
  } else if (norm === "paused" || norm === "exception") {
    badgeStyle = "bg-purple-50 text-purple-800 border-purple-200/80";
    dotStyle = "bg-purple-500";
  } else if (norm === "completed" || norm === "completed – 30 days") {
    badgeStyle = "bg-emerald-100 text-emerald-900 border-emerald-300";
    dotStyle = "bg-emerald-700";
  } else if (norm === "draft" || norm === "low") {
    badgeStyle = "bg-gray-100 text-gray-700 border-gray-200";
    dotStyle = "bg-gray-400";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeStyle} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
      <span>{status}</span>
    </span>
  );
}
