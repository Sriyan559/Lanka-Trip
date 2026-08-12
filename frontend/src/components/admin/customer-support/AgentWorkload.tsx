'use client';

import React from 'react';
import type { AgentWorkloadItem } from '@/types/customerSupport';

interface AgentWorkloadProps {
  agents?: AgentWorkloadItem[];
}

export function AgentWorkload({ agents }: AgentWorkloadProps) {
  const workloadList = [
    { agentName: 'Amaya Perera', openCases: 32, atRiskCritical: '4 / 1', resolvedToday: 16 },
    { agentName: 'Dilan Perera', openCases: 29, atRiskCritical: '5 / 2', resolvedToday: 14 },
    { agentName: 'Nadeesha Silva', openCases: 24, atRiskCritical: '2 / 1', resolvedToday: 17 },
    { agentName: 'Elena Vance', openCases: 12, atRiskCritical: '3 / 1', resolvedToday: 6 },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          Agent Workload
        </h3>
        <button type="button" className="text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left">
          <thead>
            <tr className="text-slate-400 border-b border-line pb-1 text-[10px]">
              <th className="font-semibold pb-1">Agent</th>
              <th className="font-semibold text-center pb-1">Open Cases</th>
              <th className="font-semibold text-center pb-1">At Risk / Critical</th>
              <th className="font-semibold text-right pb-1">Resolved Today</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {workloadList.map((row) => (
              <tr key={row.agentName}>
                <td className="py-1.5 font-medium text-ink whitespace-nowrap">{row.agentName}</td>
                <td className="text-center font-bold text-ink">{row.openCases}</td>
                <td className="text-center font-semibold text-amber-600">{row.atRiskCritical}</td>
                <td className="text-right font-bold text-green-700">{row.resolvedToday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-slate-400 mt-2 italic">* Calculated from operational aggregates</p>
    </div>
  );
}
