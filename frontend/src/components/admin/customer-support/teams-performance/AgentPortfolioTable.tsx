'use client';

import React from 'react';
import { AgentTierSummary } from '@/types/teamsPerformance';

interface AgentPortfolioTableProps {
  tiers: AgentTierSummary[];
  teamName: string;
}

export function AgentPortfolioTable({ tiers, teamName }: AgentPortfolioTableProps) {
  const renderQueueHealthDots = () => {
    return (
      <div className="flex items-center gap-1 justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-xs font-bold text-slate-900">
          Agent Portfolio ({teamName})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[10px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
              <th className="py-1 px-1.5">Agent Tier</th>
              <th className="py-1 px-1 text-center">Agents</th>
              <th className="py-1 px-1 text-center">Active Cases</th>
              <th className="py-1 px-1 text-center text-amber-600">At Capacity</th>
              <th className="py-1 px-1 text-center text-rose-600">Overloaded</th>
              <th className="py-1 px-1 text-right">Utilisation (Wk)</th>
              <th className="py-1 px-1 text-right">SLA (%)</th>
              <th className="py-1 px-1 text-right">CSAT</th>
              <th className="py-1 px-1 text-right">Avg Resp</th>
              <th className="py-1 px-1 text-right">Avg Cases / Agent</th>
              <th className="py-1 px-1 text-right">FCR (%)</th>
              <th className="py-1 px-1 text-right">QA Score</th>
              <th className="py-1 px-1 text-right">SLA Compliance</th>
              <th className="py-1 px-1 text-right">GSL Score</th>
              <th className="py-1 px-1 text-center">Queue Health</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {tiers.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="py-1 px-1.5 font-bold text-slate-900 whitespace-nowrap">{row.tier}</td>
                <td className="py-1 px-1 text-center font-bold text-slate-900">{row.agents}</td>
                <td className="py-1 px-1 text-center font-bold text-slate-900">{row.activeCases}</td>
                <td className="py-1 px-1 text-center text-amber-600 font-semibold">{row.atCapacity}</td>
                <td className="py-1 px-1 text-center text-rose-600 font-bold">{row.overloaded}</td>
                <td className="py-1 px-1 text-right font-bold text-slate-900">{row.utilisation}%</td>
                <td className="py-1 px-1 text-right font-bold text-slate-900">{row.slaPercent}%</td>
                <td className="py-1 px-1 text-right font-bold text-emerald-600">{row.csat}%</td>
                <td className="py-1 px-1 text-right text-slate-600">{row.avgResponseMinutes}m</td>
                <td className="py-1 px-1 text-right text-slate-700 font-medium">{row.avgCasesPerAgent}</td>
                <td className="py-1 px-1 text-right font-semibold text-slate-800">{row.fcrPercent}%</td>
                <td className="py-1 px-1 text-right font-bold text-emerald-600">{row.qaScore}%</td>
                <td className="py-1 px-1 text-right font-semibold text-slate-800">{row.slaCompliance}%</td>
                <td className="py-1 px-1 text-right font-semibold text-slate-800">{row.gslScore}%</td>
                <td className="py-1 px-1 text-center">{renderQueueHealthDots()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-1 mt-1 border-t border-slate-100 flex justify-end">
        <button type="button" className="text-[10px] text-blue-600 font-semibold hover:underline">
          View all agents &gt;
        </button>
      </div>
    </div>
  );
}
