import React from "react";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({
  status,
  variant,
  size = "sm",
  className = "",
}: StatusBadgeProps) {
  let computedVariant = variant;

  if (!computedVariant) {
    const lower = status.toLowerCase();
    if (
      lower.includes("in transit") ||
      lower.includes("on time") ||
      lower.includes("healthy") ||
      lower.includes("verified") ||
      lower.includes("paid") ||
      lower.includes("collected") ||
      lower.includes("completed") ||
      lower.includes("success") ||
      lower.includes("intact") ||
      lower.includes("printed")
    ) {
      computedVariant = "success";
    } else if (
      lower.includes("pending") ||
      lower.includes("hub") ||
      lower.includes("scheduled") ||
      lower.includes("delayed")
    ) {
      computedVariant = "warning";
    } else if (
      lower.includes("failed") ||
      lower.includes("mismatch") ||
      lower.includes("critical") ||
      lower.includes("hold")
    ) {
      computedVariant = "error";
    } else if (lower.includes("not required") || lower.includes("no ")) {
      computedVariant = "neutral";
    } else {
      computedVariant = "info";
    }
  }

  const variantStyles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
    neutral: "bg-gray-100 text-gray-600 border-gray-200",
    default: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] font-medium rounded-md border",
    md: "px-2.5 py-1 text-xs font-semibold rounded-md border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 leading-none transition-colors ${
        variantStyles[computedVariant]
      } ${sizeStyles[size]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      {status}
    </span>
  );
}
