'use client';

import React from 'react';
import { Clock, ShieldCheck, AlertOctagon, UserX, ArrowUpRight, Flame, Smile } from 'lucide-react';
import type { SupportOperationsHealthData } from '@/types/customerSupport';

interface SupportOperationsHealthProps {
  health: SupportOperationsHealthData | null;
}

export function SupportOperationsHealth({ health }: SupportOperationsHealthProps) {
  if (!health) {
    return (
      <div className="bg-white rounded-xl border border-line shadow-sm p-5 space-y-4 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 bg-slate-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
        <ShieldCheck size={14} className="text-primary-900" />
        Support Operations Health
      </h3>

      <div className="flex flex-col">
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
            <Clock size={14} className="text-blue-600" />
            <span>Average First Response</span>
          </div>
          <span className="text-[13px] font-bold text-ink">{health.avgFirstResponseMinutes} Minutes</span>
        </div>

        <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
            <Clock size={14} className="text-purple-600" />
            <span>Average Resolution Time</span>
          </div>
          <span className="text-[13px] font-bold text-ink">{health.avgResolutionHours} Hours</span>
        </div>

        <div className="flex flex-col justify-center py-2.5 border-b border-slate-100 gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
              <ShieldCheck size={14} className="text-green-600" />
              <span>Cases Within SLA</span>
            </div>
            <span className="text-[13px] font-bold text-green-700">{health.casesWithinSlaPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{ width: `${health.casesWithinSlaPercent}%` }}></div>
          </div>
        </div>

        <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
            <AlertOctagon size={14} className="text-red-600" />
            <span>Active SLA Breaches</span>
          </div>
          <span className="text-[13px] font-bold text-red-600">{health.activeSlaBreaches}</span>
        </div>

        <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
            <UserX size={14} className="text-orange-600" />
            <span>Unassigned Cases</span>
          </div>
          <span className="text-[13px] font-bold text-orange-600">{health.unassignedCases}</span>
        </div>

        <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
            <ArrowUpRight size={14} className="text-purple-600" />
            <span>Escalated Cases</span>
          </div>
          <span className="text-[13px] font-bold text-purple-700">{health.escalatedCases}</span>
        </div>

        <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
            <Flame size={14} className="text-red-600" />
            <span>Safety Cases Open</span>
          </div>
          <span className="text-[13px] font-bold text-red-600">{health.safetyCasesOpen}</span>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center gap-2.5 text-[12px] font-medium text-slate-600">
            <Smile size={14} className="text-green-600" />
            <span>Customer Satisfaction</span>
          </div>
          <span className="text-[13px] font-bold text-green-700">{health.customerSatisfactionPercent}%</span>
        </div>
      </div>
    </div>
  );
}
