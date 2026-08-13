'use client';

import React from 'react';
import {
  Users,
  UserCheck,
  UserMinus,
  UserX,
  Inbox,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export function WorkforceKpiCards() {
  const kpis = [
    { label: 'Active Agents', value: '128', icon: Users, bg: 'bg-blue-50 text-blue-600' },
    { label: 'Available', value: '34', icon: UserCheck, bg: 'bg-emerald-50 text-emerald-600' },
    { label: 'At Capacity', value: '18', icon: UserMinus, bg: 'bg-amber-50 text-amber-600' },
    { label: 'Overloaded', value: '6', icon: UserX, bg: 'bg-rose-50 text-rose-600' },
    { label: 'Open Cases', value: '1,286', icon: Inbox, bg: 'bg-slate-100 text-slate-700' },
    { label: 'SLA At Risk', value: '29', icon: AlertTriangle, bg: 'bg-amber-50 text-amber-600' },
    { label: 'Avg First Response', value: '18m', trend: '↓ 2m vs yesterday', icon: Clock, bg: 'bg-[#881337]/10 text-[#881337]' },
    { label: 'Avg Resolution', value: '6.4h', trend: '↓ 0.5h vs yesterday', icon: Clock, bg: 'bg-[#881337]/10 text-[#881337]' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
      {kpis.map((k, i) => {
        const IconComp = k.icon;
        return (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0"
          >
            <div className="min-w-0 flex-1 pr-1">
              <span className="text-[10px] font-medium text-slate-500 block truncate leading-tight">
                {k.label}
              </span>
              <span className="text-xl font-bold text-slate-900 leading-tight block mt-0.5">
                {k.value}
              </span>
              {k.trend && (
                <span className="text-[8px] font-bold text-emerald-600 block mt-0.5">
                  {k.trend}
                </span>
              )}
            </div>
            <div className={`p-1.5 rounded-md ${k.bg} shrink-0`}>
              <IconComp size={15} />
            </div>
          </div>
        );
      })}

      {/* 9th Card: Workforce Health (Dark Crimson Card) */}
      <div className="bg-[#881337] text-white rounded-md p-2 shadow-2xs flex items-center justify-between min-w-0">
        <div className="min-w-0 flex-1 pr-1">
          <span className="text-[10px] font-semibold text-rose-100 block truncate leading-tight">
            Workforce Health
          </span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className="text-xl font-extrabold leading-tight">93</span>
            <span className="text-xs text-rose-200 font-bold">/100</span>
          </div>
        </div>

        {/* Mini circular gauge */}
        <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#70102e]"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-white"
              strokeDasharray="93, 100"
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
