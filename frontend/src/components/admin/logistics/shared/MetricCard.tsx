import React from "react";
import { ProgressBar } from "./ProgressBar";

interface MetricCardProps {
  number: number;
  title: string;
  value: string | number;
  unit?: string;
  statusText?: string;
  progressBarValue?: number;
  progressColor?: "emerald" | "blue" | "amber" | "rose" | "purple";
  varianceText?: string;
  varianceColor?: "emerald" | "rose" | "amber" | "purple" | "gray";
  isWarning?: boolean;
  isSuccess?: boolean;
  sparklineNode?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  number,
  title,
  value,
  unit,
  statusText,
  progressBarValue,
  progressColor = "emerald",
  varianceText,
  varianceColor,
  isWarning = false,
  isSuccess = false,
  sparklineNode,
  icon,
  className = "",
}: MetricCardProps) {
  const getVarianceColorClass = () => {
    if (varianceColor === "emerald") return "text-emerald-600";
    if (varianceColor === "rose") return "text-rose-600";
    if (varianceColor === "amber") return "text-amber-600";
    if (varianceColor === "purple") return "text-purple-600";
    if (varianceColor === "gray") return "text-gray-500";
    if (!varianceText) return "text-gray-500";
    if (varianceText.includes("▲")) return "text-emerald-600";
    if (varianceText.includes("▼")) return "text-rose-600";
    return "text-gray-500";
  };

  return (
    <div
      className={`bg-white border rounded-lg p-1.5 sm:p-2 flex flex-col justify-between shadow-2xs transition-all hover:border-gray-300 min-h-[90px] ${
        isWarning
          ? "border-amber-300 bg-amber-50/20"
          : isSuccess
          ? "border-emerald-200 bg-emerald-50/20"
          : "border-gray-200"
      } ${className}`}
    >
      {/* Header with Card Number & Title */}
      <div className="flex items-start justify-between gap-1 mb-0.5">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <span className="text-[9px] font-bold text-gray-500 w-3.5 h-3.5 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
            {number}
          </span>
          <span className="text-[8.5px] sm:text-[9px] font-bold text-gray-700 uppercase tracking-tighter leading-tight break-words">
            {title}
          </span>
        </div>
        {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
      </div>

      {/* Main Value Display */}
      <div className="flex items-baseline gap-1 my-0.5">
        <span className="text-lg font-bold text-gray-900 leading-tight">
          {value}
        </span>
        {unit && <span className="text-xs text-gray-500 font-medium">{unit}</span>}
      </div>

      {/* Optional Sparkline / Progress Bar / Variance / Status */}
      <div className="mt-1">
        {progressBarValue !== undefined && (
          <ProgressBar value={progressBarValue} color={progressColor} size="xs" />
        )}

        {sparklineNode && <div className="h-4 w-full mt-0.5">{sparklineNode}</div>}

        {varianceText && (
          <div className={`text-[11px] font-semibold ${getVarianceColorClass()}`}>
            {varianceText}
          </div>
        )}

        {statusText && (
          <div className="text-[10px] text-gray-500 font-medium truncate">
            {statusText}
          </div>
        )}
      </div>
    </div>
  );
}
