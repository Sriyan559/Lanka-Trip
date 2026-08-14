"use client";

import React from "react";

interface CircularScoreProps {
  score: number;
  maxScore?: number;
  size?: number | "sm" | "md" | "lg";
  strokeWidth?: number;
  primaryColor?: string;
  backgroundColor?: string;
  label?: string;
  subtext?: string;
  className?: string;
}

export function CircularScore({
  score,
  maxScore = 100,
  size = 110,
  strokeWidth = 9,
  primaryColor = "#800020",
  backgroundColor = "#f1f5f9",
  label,
  subtext,
  className = "",
}: CircularScoreProps) {
  const numericSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 64
      : size === "md"
      ? 80
      : 96;
  const radius = (numericSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(score / maxScore, 0), 1);
  const strokeDashoffset = circumference - percentage * circumference;


  return (
    <div className={`circular-score-wrapper flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: numericSize, height: numericSize }}>
        <svg width={numericSize} height={numericSize} className="transform -rotate-90">

          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={numericSize / 2}
            cy={numericSize / 2}

            r={radius}
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold text-slate-900 leading-none">
            {score}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
            /{maxScore}
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-2 text-xs font-bold text-slate-800 text-center">{label}</span>
      )}
      {subtext && (
        <span className="text-[11px] font-medium text-slate-500 text-center">{subtext}</span>
      )}
    </div>
  );
}
