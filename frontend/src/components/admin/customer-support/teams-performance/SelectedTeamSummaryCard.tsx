'use client';

import React from 'react';
import { Users, Inbox, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SupportTeamItem } from '@/types/teamsPerformance';

interface SelectedTeamSummaryCardProps {
  team: SupportTeamItem;
}

export function SelectedTeamSummaryCard({ team }: SelectedTeamSummaryCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-900">
          Selected Team: <span className="text-[#881337] font-extrabold">{team.name}</span>
        </h3>
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-bold text-[10px] flex items-center gap-1">
          <CheckCircle2 size={11} className="text-emerald-600" />
          Team Health: 96%
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[10px]">
        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
          <span className="text-slate-400 block font-medium">Active Agents</span>
          <strong className="text-slate-900 text-sm font-extrabold">{team.agents}</strong>
        </div>

        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
          <span className="text-slate-400 block font-medium">Open Cases</span>
          <strong className="text-slate-900 text-sm font-extrabold">1,286</strong>
        </div>

        <div className="bg-amber-50/60 p-1.5 rounded border border-amber-100">
          <span className="text-amber-700 block font-semibold">SLA At Risk</span>
          <strong className="text-amber-800 text-sm font-extrabold">29</strong>
        </div>

        <div className="bg-emerald-50/60 p-1.5 rounded border border-emerald-100">
          <span className="text-emerald-700 block font-semibold">CSAT</span>
          <strong className="text-emerald-800 text-sm font-extrabold">{team.csat}%</strong>
        </div>

        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
          <span className="text-slate-400 block font-medium">GIA Compliance</span>
          <strong className="text-slate-900 text-sm font-extrabold">92%</strong>
        </div>

        <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
          <span className="text-slate-400 block font-medium">GSL Score</span>
          <strong className="text-slate-900 text-sm font-extrabold">95%</strong>
        </div>

        <div className="bg-emerald-50 p-1.5 rounded border border-emerald-200 flex flex-col justify-center items-center">
          <span className="text-[#881337] font-bold text-[9px] uppercase tracking-wider">Status</span>
          <span className="text-emerald-700 font-extrabold text-xs">Healthy</span>
        </div>
      </div>
    </div>
  );
}
