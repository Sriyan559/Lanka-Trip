"use client";

import React from "react";

interface StatusBadgeProps {
  status: "connected" | "success" | "warning" | "error" | "info" | "neutral" | string;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  let styleClasses = "bg-slate-100 text-slate-700 border-slate-200";

  if (status === "connected" || status === "success") {
    styleClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (status === "warning") {
    styleClasses = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (status === "error") {
    styleClasses = "bg-rose-50 text-rose-700 border-rose-200";
  } else if (status === "info") {
    styleClasses = "bg-sky-50 text-sky-700 border-sky-200";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styleClasses} ${className}`}
    >
      {(status === "connected" || status === "success") && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      )}
      {status === "warning" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
      {status === "error" && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
      <span>{label}</span>
    </span>
  );
}
