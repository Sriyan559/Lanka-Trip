'use client';

import React from 'react';
import {
  FileText,
  GitBranch,
  AlertTriangle,
  Layers,
  FileSpreadsheet,
  AlertOctagon,
  Clock,
  RotateCw,
} from 'lucide-react';

export function SlaRoutingKpiCards() {
  const kpiItems = [
    {
      label: 'Active SLA Policies',
      value: '28',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Active Routing Rules',
      value: '46',
      icon: GitBranch,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Active Escalation Rules',
      value: '32',
      icon: AlertTriangle,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Active Service Policies',
      value: '19',
      icon: Layers,
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Policy Exceptions',
      value: '11',
      icon: FileSpreadsheet,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: 'Routing Conflicts',
      value: '4',
      icon: AlertOctagon,
      iconBg: 'bg-red-50 text-red-600',
    },
    {
      label: 'Pending Approvals',
      value: '7',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
      {kpiItems.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs flex items-center justify-between min-w-0"
          >
            <div className="min-w-0 flex-1 pr-1">
              <span className="text-[11px] font-medium text-slate-500 block truncate leading-tight">
                {item.label}
              </span>
              <span className="text-xl font-bold text-slate-900 leading-tight block mt-0.5">
                {item.value}
              </span>
            </div>
            <div className={`p-1.5 rounded-md ${item.iconBg} shrink-0`}>
              <IconComponent size={16} />
            </div>
          </div>
        );
      })}

      {/* 8th Card: SLA & Routing Health */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0">
        <div className="min-w-0 flex-1 pr-1">
          <span className="text-[10px] font-medium text-slate-500 block truncate leading-tight">
            SLA &amp; Routing Health
          </span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className="text-xl font-bold text-slate-900 leading-tight">96</span>
            <span className="text-xs font-semibold text-slate-400">/100</span>
          </div>
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
              strokeDasharray="96, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <RotateCw size={10} className="absolute text-slate-400 hover:text-slate-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
