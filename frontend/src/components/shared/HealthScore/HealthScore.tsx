'use client';

import React from 'react';

interface HealthBreakdownItem {
  label: string;
  value: number;
}

interface HealthScoreProps {
  score: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
  breakdown?: HealthBreakdownItem[];
  className?: string;
}

export function HealthScore({
  score = 96,
  max = 100,
  label = 'Excellent',
  size = 'md',
  showBreakdown = false,
  breakdown = [],
  className = '',
}: HealthScoreProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((score / max) * 100)));
  const radius = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 6 : 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = '#10b981'; // Green
  let labelColor = 'text-emerald-700';

  if (percentage < 70) {
    strokeColor = '#ef4444';
    labelColor = 'text-rose-700';
  } else if (percentage < 85) {
    strokeColor = '#f59e0b';
    labelColor = 'text-amber-700';
  }

  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circle Gauge */}
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: svgSize, height: svgSize }}>
        <svg className="transform -rotate-90" width={svgSize} height={svgSize}>
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`${size === 'sm' ? 'text-xs font-bold' : size === 'lg' ? 'text-xl font-extrabold' : 'text-base font-extrabold'} text-gray-900 leading-none`}>
            {score}
          </span>
          <span className="text-[8px] text-gray-400 font-semibold leading-none mt-0.5">/{max}</span>
        </div>
      </div>

      {/* Label and optional breakdown */}
      <div className="flex flex-col">
        {label && (
          <span className={`text-[11px] font-bold ${labelColor} leading-tight`}>
            {label}
          </span>
        )}
        {showBreakdown && breakdown.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 text-[9px] text-gray-600">
                <span className="truncate">{item.label}</span>
                <span className="font-bold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
