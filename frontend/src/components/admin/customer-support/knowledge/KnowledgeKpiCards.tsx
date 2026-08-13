'use client';

import React from 'react';
import {
  BookOpen,
  FileText,
  GitBranch,
  FileWarning,
  AlertCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
} from 'lucide-react';

export function KnowledgeKpiCards() {
  const kpiItems = [
    {
      label: 'Published Articles',
      value: '842',
      trend: '+ 23 this week',
      icon: BookOpen,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Active Playbooks',
      value: '64',
      trend: '+ 4 this week',
      icon: FileText,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Guided Resolution Flows',
      value: '38',
      trend: '+ 3 this week',
      icon: GitBranch,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Knowledge Gaps',
      value: '27',
      trend: '+ 6 this week',
      icon: FileWarning,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: 'Articles Needing Review',
      value: '41',
      trend: '+ 7 this week',
      icon: AlertCircle,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Low Confidence',
      value: '18',
      trend: '+ 2 this week',
      icon: AlertTriangle,
      iconBg: 'bg-red-50 text-red-600',
    },
    {
      label: 'Pending Approvals',
      value: '12',
      trend: '+ 1 this week',
      icon: Clock,
      iconBg: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
      {kpiItems.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0"
          >
            <div className="min-w-0 flex-1 pr-1">
              <span className="text-[10px] font-medium text-slate-500 block truncate leading-tight">
                {item.label}
              </span>
              <span className="text-xl font-bold text-slate-900 leading-tight block mt-0.5">
                {item.value}
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5 font-medium">
                {item.trend}
              </span>
            </div>
            <div className={`p-1.5 rounded-md ${item.iconBg} shrink-0`}>
              <IconComponent size={15} />
            </div>
          </div>
        );
      })}

      {/* 8th Card: Knowledge & Resolution Health */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0">
        <div className="min-w-0 flex-1 pr-1">
          <span className="text-[10px] font-medium text-slate-500 block truncate leading-tight">
            Knowledge &amp; Resolution
          </span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className="text-xl font-bold text-slate-900 leading-tight">95</span>
            <span className="text-xs font-semibold text-slate-400">/100</span>
          </div>
          <span className="text-[9px] text-emerald-600 font-semibold block mt-0.5 flex items-center gap-0.5">
            <TrendingUp size={9} /> Trend vs last week
          </span>
        </div>

        {/* Circular Gauge */}
        <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
          <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray="95, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
