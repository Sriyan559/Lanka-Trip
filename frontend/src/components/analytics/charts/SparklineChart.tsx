"use client";

import React from "react";

interface SparklineChartProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  showDots?: boolean;
  dotSize?: number;
  className?: string;
}

export function SparklineChart({
  data = [],
  color = "#800020", // Burgundy theme
  width = 90,
  height = 24,
  strokeWidth = 1.8,
  showDots = true,
  dotSize = 2,
  className = "",
}: SparklineChartProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const padding = 4;
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  const coords = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * usableWidth;
    const y = height - padding - ((val - min) / range) * usableHeight;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  const points = coords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <svg
      width={width}
      height={height}
      className={`sparkline-chart-svg overflow-hidden shrink-0 ${className}`}
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {showDots &&
        coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={dotSize} fill={color} />
        ))}
    </svg>
  );
}
