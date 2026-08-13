'use client';

import React from 'react';
import { SupportTeamItem } from '@/types/teamsPerformance';

interface SupportTeamPortfolioTableProps {
  teams: SupportTeamItem[];
  selectedTeamId: string;
  onSelectTeam: (id: string) => void;
}

export function SupportTeamPortfolioTable({
  teams,
  selectedTeamId,
  onSelectTeam,
}: SupportTeamPortfolioTableProps) {
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-rose-100 text-rose-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-emerald-100 text-emerald-800';
    }
  };

  const renderSparkline = (risk: string) => {
    const strokeColor = risk === 'High' ? '#e11d48' : risk === 'Medium' ? '#d97706' : '#10b981';
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

  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-xs font-bold text-slate-900">Support Team Portfolio</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[10px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
              <th className="py-1 px-1.5">Support Team</th>
              <th className="py-1 px-1 text-center">Agents</th>
              <th className="py-1 px-1 text-center">Avail</th>
              <th className="py-1 px-1 text-center">Busy</th>
              <th className="py-1 px-1 text-center">At Capacity</th>
              <th className="py-1 px-1 text-center text-rose-600">Overloaded</th>
              <th className="py-1 px-1 text-right">Utilisation (Wk)</th>
              <th className="py-1 px-1 text-right">SLA (%)</th>
              <th className="py-1 px-1 text-right">CSAT</th>
              <th className="py-1 px-1 text-right">Avg Resp</th>
              <th className="py-1 px-1 text-right">Avg Res</th>
              <th className="py-1 px-1 text-center">Risk</th>
              <th className="py-1 px-1 text-center">Trend (7D)</th>
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
                  <td className="py-1 px-1.5 font-bold text-slate-900 whitespace-nowrap">{t.name}</td>
                  <td className="py-1 px-1 text-center font-bold text-slate-900">{t.agents}</td>
                  <td className="py-1 px-1 text-center text-emerald-600 font-semibold">{t.available}</td>
                  <td className="py-1 px-1 text-center text-slate-600">{t.busy}</td>
                  <td className="py-1 px-1 text-center text-amber-600 font-semibold">{t.atCapacity}</td>
                  <td className="py-1 px-1 text-center text-rose-600 font-bold">{t.overloaded}</td>
                  <td className="py-1 px-1 text-right font-bold text-slate-900">{t.utilisation}%</td>
                  <td className="py-1 px-1 text-right font-bold text-slate-900">{t.slaPercent}%</td>
                  <td className="py-1 px-1 text-right font-bold text-emerald-600">{t.csat}%</td>
                  <td className="py-1 px-1 text-right text-slate-600">{t.avgResponseMinutes}m</td>
                  <td className="py-1 px-1 text-right text-slate-600">{t.avgResolutionHours}h</td>
                  <td className="py-1 px-1 text-center">
                    <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${getRiskBadge(t.risk)}`}>
                      {t.risk}
                    </span>
                  </td>
                  <td className="py-1 px-1 text-center flex justify-center">
                    {renderSparkline(t.risk)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-1 mt-1 border-t border-slate-100 flex justify-start">
        <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
          View all teams &gt;
        </button>
      </div>
    </div>
  );
}
