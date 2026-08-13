'use client';

import React from 'react';

interface TeamsPerformanceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TeamsPerformanceTabs({ activeTab, onTabChange }: TeamsPerformanceTabsProps) {
  const tabs = [
    { id: 'teams-overview', label: 'Teams Overview' },
    { id: 'agents', label: 'Agents' },
    { id: 'queue-capacity', label: 'Queue Capacity' },
    { id: 'workload', label: 'Workload' },
    { id: 'skills-coverage', label: 'Skills & Coverage' },
    { id: 'schedules', label: 'Schedules' },
    { id: 'performance', label: 'Performance' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'forecasting', label: 'Forecasting' },
    { id: 'exceptions', label: 'Exceptions' },
    { id: 'goals', label: 'Goals' },
    { id: 'versions', label: 'Versions' },
    { id: 'audit', label: 'Audit' },
  ];

  return (
    <div className="border-b border-slate-200 bg-white px-2 pt-1">
      <div className="flex items-center gap-5 overflow-x-auto scrollbar-none text-xs">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`pb-2 pt-0.5 px-1 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-[#881337] text-[#881337]'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
