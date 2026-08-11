import React from "react";
import { ServiceHealthStatus } from "@/types/logistics/shipment";

interface HealthBadgeProps {
  label: string;
  status: ServiceHealthStatus | "Healthy" | "Degraded" | "Critical";
  showDot?: boolean;
  className?: string;
}

export function HealthBadge({
  label,
  status,
  showDot = true,
  className = "",
}: HealthBadgeProps) {
  const isHealthy = status === "Healthy";
  const isDegraded = status === "Degraded";

  const colorClass = isHealthy
    ? "text-emerald-700 bg-emerald-50/80 border-emerald-200"
    : isDegraded
    ? "text-amber-700 bg-amber-50/80 border-amber-200"
    : "text-rose-700 bg-rose-50/80 border-rose-200";

  const dotColor = isHealthy
    ? "bg-emerald-500"
    : isDegraded
    ? "bg-amber-500"
    : "bg-rose-500";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-[11px] font-medium leading-tight ${colorClass} ${className}`}
    >
      <span className="text-gray-500 font-normal">{label}:</span>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      )}
      <span className="font-semibold">{status}</span>
    </div>
  );
}
