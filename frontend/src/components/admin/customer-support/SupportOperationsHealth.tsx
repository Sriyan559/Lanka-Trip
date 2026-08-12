'use client';

import React from 'react';
import { Clock, ShieldCheck, AlertOctagon, UserX, ArrowUpRight, Flame, Smile } from 'lucide-react';
import type { SupportOperationsHealthData } from '@/types/customerSupport';

interface SupportOperationsHealthProps {
  health: SupportOperationsHealthData | null;
}

export function SupportOperationsHealth({ health }: SupportOperationsHealthProps) {
  const avgFirstResp = health ? `${health.avgFirstResponseMinutes} Minutes` : '18 Minutes';
  const avgResHours = health ? `${health.avgResolutionHours} Hours` : '6.4 Hours';
  const slaPercent = health ? health.casesWithinSlaPercent : 93;
  const activeBreaches = health ? health.activeSlaBreaches : 12;
  const unassigned = health ? health.unassignedCases : 46;
  const escalated = health ? health.escalatedCases : 17;
  const safetyCases = health ? health.safetyCasesOpen : 4;
  const csat = health ? health.customerSatisfactionPercent : 91;

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          Queue Operations Health
        </h3>
        <span className="sr-only">Support Operations Health</span>
      </div>

      {/* Donut Health Score Circle */}
      <div className="flex items-center justify-center my-3">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray="92, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold text-ink leading-none">92</span>
            <span className="text-[10px] font-semibold text-slate-400">/100</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-[11px]">
        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock size={13} className="text-slate-400" />
            <span>Average First Response</span>
          </div>
          <strong className="text-ink">{avgFirstResp}</strong>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock size={13} className="text-slate-400" />
            <span>Average Resolution Time</span>
          </div>
          <strong className="text-ink">{avgResHours}</strong>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck size={13} className="text-green-600" />
            <span>Cases Within SLA</span>
          </div>
          <strong className="text-green-700">{slaPercent}%</strong>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <AlertOctagon size={13} className="text-red-500" />
            <span>Active SLA Breaches</span>
          </div>
          <strong className="text-red-600">{activeBreaches}</strong>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <UserX size={13} className="text-orange-500" />
            <span>Unassigned Cases</span>
          </div>
          <strong className="text-orange-600">{unassigned}</strong>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ArrowUpRight size={13} className="text-purple-600" />
            <span>Escalated Cases</span>
          </div>
          <strong className="text-purple-700">{escalated}</strong>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Flame size={13} className="text-red-600" />
            <span>Safety Cases Open</span>
          </div>
          <strong className="text-red-600">{safetyCases}</strong>
        </div>

        <div className="flex items-center justify-between pt-1.5">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Smile size={13} className="text-green-600" />
            <span>Customer Satisfaction</span>
          </div>
          <strong className="text-green-700">{csat}%</strong>
        </div>
      </div>

      <button
        type="button"
        className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-3 pt-2 border-t border-slate-100"
      >
        View Health Analytics
      </button>
    </div>
  );
}
