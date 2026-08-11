"use client";

import React from "react";

interface ReusableProgressChartProps {
  score: number; // 0 - 100
  label?: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export function ReusableProgressChart({
  score,
  label = "Excellent",
  sublabel = "Top 6% of shipments",
  size = 110,
  strokeWidth = 9,
  color = "#10b981", // emerald
  className = "",
}: ReusableProgressChartProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span className="text-2xl font-black text-gray-900 leading-none">
              {clampedScore}
            </span>
            <span className="text-xs text-gray-400 font-bold">/100</span>
          </div>
        </div>
      </div>
      {label && (
        <span className="mt-2 text-xs font-bold text-emerald-700 leading-none">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[10px] text-gray-500 font-medium mt-0.5">
          {sublabel}
        </span>
      )}
    </div>
  );
}
