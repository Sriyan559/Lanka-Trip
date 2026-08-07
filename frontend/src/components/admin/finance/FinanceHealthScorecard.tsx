'use client';

import React from 'react';
import { MOCK_HEALTH_SCORECARD } from '@/data/mockFinanceData';

interface Props {
  metrics?: { label: string; score: number }[];
}

export function FinanceHealthScorecard({ metrics = MOCK_HEALTH_SCORECARD }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-gray-100 text-xs">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900">Payment Operations Health Scorecard</h3>
          <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">Last 30 Days</span>
        </div>
      </div>

      {/* 10 Score Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-2">
        {metrics.map((item) => (
          <div key={item.label} className="bg-gray-50/70 border border-gray-100 rounded p-1.5 flex flex-col justify-between">
            <span className="text-[10px] font-medium text-gray-500 truncate leading-tight">{item.label}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xs font-black text-gray-900 leading-none">{item.score}</span>
              <span className="text-[9px] font-semibold text-gray-400">/100</span>
            </div>
            {/* Progress Track */}
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1 overflow-hidden">
              <div
                className="bg-[#8f002b] h-full rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
