'use client';

import React from 'react';

export interface CompatibilityScoreProps {
  score: number;
  maxScore?: number;
  label?: string;
  status?: 'excellent' | 'good' | 'warning' | 'critical';
  size?: 'sm' | 'md' | 'lg';
}

export function CompatibilityScore({
  score,
  maxScore = 100,
  label,
  status,
  size = 'md',
}: CompatibilityScoreProps) {
  // Determine status based on score if not provided
  let computedStatus = status;
  if (!computedStatus) {
    if (score >= 90) computedStatus = 'excellent';
    else if (score >= 75) computedStatus = 'good';
    else if (score >= 50) computedStatus = 'warning';
    else computedStatus = 'critical';
  }

  // Size configurations
  const sizeConfig = {
    sm: { width: 'w-24', height: 'h-24', textLg: 'text-2xl', textSm: 'text-xs' },
    md: { width: 'w-32', height: 'h-32', textLg: 'text-4xl', textSm: 'text-sm' },
    lg: { width: 'w-48', height: 'h-48', textLg: 'text-5xl', textSm: 'text-lg' },
  };

  const config = sizeConfig[size];

  // Status colors
  const statusColors = {
    excellent: '#0d9488',
    good: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
  };

  const statusLabels = {
    excellent: 'Excellent',
    good: 'Good',
    warning: 'Warning',
    critical: 'Critical',
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`relative ${config.width} ${config.height} flex items-center justify-center`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={statusColors[computedStatus]}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute text-center">
          <div className={`font-bold text-gray-900 ${config.textLg}`}>{score}</div>
          <div className={`text-gray-600 ${config.textSm}`}>/{maxScore}</div>
        </div>
      </div>
      <div className="text-center">
        <div className={`font-semibold ${config.textSm}`} style={{ color: statusColors[computedStatus] }}>
          {statusLabels[computedStatus]}
        </div>
        {label && <div className="text-xs text-gray-600 mt-1">{label}</div>}
      </div>
    </div>
  );
}
