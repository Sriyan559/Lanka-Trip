"use client";

import React from "react";

interface CircularProgressProps {
  value: number; // 0-100
  label: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trendText?: string;
  isPositive?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  label,
  size = 54,
  strokeWidth = 5,
  color = "#10b981", // emerald
  trendText,
  isPositive = true,
  className = "",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
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
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-extrabold text-gray-900 leading-none">
            {clamped}%
          </span>
        </div>
      </div>
      <span className="text-[10px] font-semibold text-gray-700 leading-tight mt-1.5 truncate max-w-[80px]">
        {label}
      </span>
      {trendText && (
        <span
          className={`text-[9px] font-bold mt-0.5 ${
            isPositive ? "text-emerald-600" : "text-amber-600"
          }`}
        >
          {trendText}
        </span>
      )}
    </div>
  );
}
