'use client';

import React from 'react';
import { TeamQualityItem } from '@/types/satisfactionQa';
import { CheckCircle2 } from 'lucide-react';

interface PerformanceSectionRowProps {
  teams: TeamQualityItem[];
  selectedTeamId: string;
  onSelectTeam: (id: string) => void;
}

export function PerformanceSectionRow({
  teams,
  selectedTeamId,
  onSelectTeam,
}: PerformanceSectionRowProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'bg-emerald-100 text-emerald-800';
      case 'Good':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  const renderSparkline = (status: string) => {
    const strokeColor = status === 'Needs Attention' ? '#d97706' : '#10b981';
    return (
      <svg className="w-12 h-4" viewBox="0 0 50 15">
        <path
          d="M 0,10 Q 10,2 20,8 T 40,4 T 50,7"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  const selectedTeam = (teams && teams.length > 0)
    ? (teams.find((t) => t.id === selectedTeamId) || teams[0])
    : {
        id: '1',
        name: 'Customer Operations',
        evaluations: 142,
        csat: 92,
        qaScore: 96,
        ces: 4.5,
        repeatContactPercent: 5,
        policyAdherencePercent: 97,
        criticalDefects: 1,
        coachingDue: 4,
        status: 'Excellent' as const,
      };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.70fr)_minmax(0,2.10fr)_minmax(0,1.20fr)] gap-2 text-xs items-start">
      {/* Section A: Satisfaction & Quality Performance (30-Day) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">
            A. Satisfaction &amp; Quality Performance (30-Day)
          </h4>

          {/* SVG Multi-Line Chart */}
          <div className="bg-slate-50 p-2 rounded border border-slate-100 mb-2">
            <svg className="w-full h-24" viewBox="0 0 300 90">
              {/* Legend grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="45" x2="300" y2="45" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="70" x2="300" y2="70" stroke="#f1f5f9" strokeWidth="1" />

              {/* Line 1: CSAT % (Emerald) */}
              <polyline fill="none" stroke="#10b981" strokeWidth="2" points="10,25 60,22 110,20 160,24 210,18 260,20 290,15" />
              {/* Line 2: QA Score % (Purple) */}
              <polyline fill="none" stroke="#a855f7" strokeWidth="1.5" points="10,28 60,30 110,25 160,28 210,22 260,24 290,20" />
              {/* Line 3: FCR % (Blue) */}
              <polyline fill="none" stroke="#2563eb" strokeWidth="1.5" points="10,40 60,42 110,38 160,45 210,39 260,41 290,36" />
              {/* Line 4: Customer Effort CES (Amber) */}
              <polyline fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" points="10,65 60,62 110,60 160,64 210,58 260,61 290,55" />
              {/* Line 5: Repeat Contact (Rose) */}
              <polyline fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" points="10,75 60,78 110,74 160,79 210,72 260,76 290,70" />
            </svg>
            <div className="flex flex-wrap items-center justify-between text-[8px] text-slate-500 font-semibold px-1 mt-1">
              <span>Apr 18</span>
              <span>Apr 22</span>
              <span>Apr 26</span>
              <span>Apr 30</span>
              <span>May 4</span>
              <span>May 8</span>
              <span>May 12</span>
              <span>May 18</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[9px] font-medium text-slate-600">
            <span className="flex items-center gap-1 text-amber-600"><span className="w-2 h-0.5 bg-amber-500" /> Customer Effort (CES) (%)</span>
            <span className="flex items-center gap-1 text-rose-600"><span className="w-2 h-0.5 bg-rose-500" /> Repeat Contact (%)</span>
            <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-0.5 bg-emerald-500" /> CSAT (%)</span>
            <span className="flex items-center gap-1 text-purple-600"><span className="w-2 h-0.5 bg-purple-500" /> QA Score (%)</span>
            <span className="flex items-center gap-1 text-blue-600"><span className="w-2 h-0.5 bg-blue-500" /> FCR (%)</span>
          </div>
        </div>
      </div>

      {/* Section B: Team Quality Portfolio */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">B. Team Quality Portfolio</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Team</th>
                  <th className="py-1 px-1 text-center">Evaluations</th>
                  <th className="py-1 px-1 text-right">CSAT</th>
                  <th className="py-1 px-1 text-right">QA Score</th>
                  <th className="py-1 px-1 text-right">CES</th>
                  <th className="py-1 px-1 text-right">Repeat Contact</th>
                  <th className="py-1 px-1 text-right">Policy Adherence</th>
                  <th className="py-1 px-1 text-center text-rose-600">Critical Defects</th>
                  <th className="py-1 px-1 text-center">Coaching Due</th>
                  <th className="py-1 px-1 text-center">Trend (30D)</th>
                  <th className="py-1 px-1 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {teams.map((t) => {
                  const isSelected = selectedTeamId === t.id;
                  return (
                    <tr
                      key={t.id}
                      onClick={() => onSelectTeam(t.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-rose-50/70 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-1 px-1 font-bold text-slate-900 whitespace-nowrap">{t.name}</td>
                      <td className="py-1 px-1 text-center font-bold text-slate-900">{t.evaluations}</td>
                      <td className="py-1 px-1 text-right font-bold text-emerald-600">{t.csat}%</td>
                      <td className="py-1 px-1 text-right font-bold text-slate-900">{t.qaScore}%</td>
                      <td className="py-1 px-1 text-right text-slate-700">{t.ces}</td>
                      <td className="py-1 px-1 text-right text-slate-600">{t.repeatContactPercent}%</td>
                      <td className="py-1 px-1 text-right font-semibold text-slate-800">{t.policyAdherencePercent}%</td>
                      <td className="py-1 px-1 text-center font-bold text-rose-600">{t.criticalDefects}</td>
                      <td className="py-1 px-1 text-center text-purple-700 font-bold">{t.coachingDue}</td>
                      <td className="py-1 px-1 text-center flex justify-center">{renderSparkline(t.status)}</td>
                      <td className="py-1 px-1 text-center">
                        <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${getStatusBadge(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section C: Selected Team — Customer Operations */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">
            C. Selected Team — <span className="text-[#881337]">{selectedTeam.name}</span>
          </h4>

          <div className="grid grid-cols-4 gap-1 text-[9px] mb-2 pb-1 border-b border-slate-100">
            <div><span className="text-slate-400 block">Evaluations</span><strong className="text-slate-900 text-xs font-extrabold">{selectedTeam.evaluations}</strong></div>
            <div><span className="text-slate-400 block">CSAT Responses</span><strong className="text-slate-900 text-xs font-extrabold">384</strong></div>
            <div><span className="text-slate-400 block">QA</span><strong className="text-emerald-600 text-xs font-extrabold">{selectedTeam.qaScore}%</strong></div>
            <div><span className="text-slate-400 block">FCR</span><strong className="text-slate-900 text-xs font-extrabold">84%</strong></div>
          </div>

          <div className="grid grid-cols-3 gap-1 text-[9px] mb-2">
            <div><span className="text-slate-400 block">CES</span><strong className="text-slate-900 font-bold">{selectedTeam.ces} /5</strong></div>
            <div><span className="text-slate-400 block">Repeat Contact</span><strong className="text-slate-900 font-bold">{selectedTeam.repeatContactPercent}%</strong></div>
            <div><span className="text-slate-400 block">Critical Defects</span><strong className="text-rose-600 font-bold">{selectedTeam.criticalDefects}</strong></div>
          </div>

          <div className="flex items-center gap-3 pt-1 border-t border-slate-100 bg-slate-50 p-1.5 rounded">
            <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-200" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray="97, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-[9px] font-extrabold text-slate-900">97%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-900 block">Team Quality Health</span>
              <span className="text-[9px] text-emerald-600 font-bold">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
