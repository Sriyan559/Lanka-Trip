import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { UserHealthBreakdown } from '@/lib/administration/users/user-detail.types';

interface UserHealthScoreProps {
  score: number;
  breakdown?: UserHealthBreakdown[];
  className?: string;
}

export function UserHealthScore({ score = 96, breakdown = [], className = '' }: UserHealthScoreProps) {
  const formattedBreakdown = breakdown.map((b) => ({
    label: b.dimension,
    value: b.score,
  }));

  return (
    <div className={`flex items-center gap-3 bg-white p-2.5 rounded border border-gray-200 shadow-2xs ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
          User Health
        </span>
        <HealthScore score={score} max={100} label="Excellent" size="md" />
      </div>

      <div className="h-16 w-px bg-gray-200 hidden sm:block" />

      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[9px]">
        {formattedBreakdown.slice(0, 8).map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-1.5 min-w-[110px]">
            <span className="text-gray-500 truncate">{item.label}</span>
            <span className="font-bold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
