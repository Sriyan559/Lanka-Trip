'use client';

import React from 'react';

interface ServiceExcellenceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ServiceExcellenceTabs({ activeTab, onTabChange }: ServiceExcellenceTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Service Excellence Overview' },
    { id: 'satisfaction', label: 'Customer Satisfaction' },
    { id: 'evaluations', label: 'QA Evaluations' },
    { id: 'interaction-reviews', label: 'Interaction Reviews' },
    { id: 'quality-defects', label: 'Quality Defects' },
    { id: 'low-csat', label: 'Low-CSAT Cases' },
    { id: 'scorecards', label: 'Scorecards' },
    { id: 'sampling', label: 'Sampling' },
    { id: 'calibration', label: 'Calibration' },
    { id: 'appeals', label: 'Appeals' },
    { id: 'corrective-actions', label: 'Corrective Actions' },
    { id: 'initiatives', label: 'Improvement Initiatives' },
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
