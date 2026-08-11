"use client";

import React from "react";

interface ReusableSparklineProps {
  data?: number[];
  color?: string;
  height?: number;
  width?: number | string;
  className?: string;
}

export function ReusableSparkline({
  data = [10, 15, 12, 18, 20, 25, 22, 28, 30, 27, 35],
  color = "#10b981", // emerald
  height = 20,
  className = "",
}: ReusableSparklineProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={`w-full h-full flex items-center ${className}`}>
      <svg
        viewBox={`0 0 100 ${height}`}
        className="w-full overflow-visible"
        style={{ height: `${height}px` }}
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}
