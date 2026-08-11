import React from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: "emerald" | "blue" | "amber" | "rose" | "purple" | "neutral";
  size?: "xs" | "sm" | "md";
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = "emerald",
  size = "sm",
  showValue = false,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  const colorStyles = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    purple: "bg-purple-500",
    neutral: "bg-gray-500",
  };

  const trackHeights = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2.5",
  };

  return (
    <div className={`w-full flex items-center gap-2 ${className}`}>
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${trackHeights[size]}`}>
        <div
          className={`h-full transition-all duration-300 rounded-full ${colorStyles[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showValue && (
        <span className="text-[11px] font-semibold text-gray-700 w-8 text-right">
          {clamped}%
        </span>
      )}
    </div>
  );
}
