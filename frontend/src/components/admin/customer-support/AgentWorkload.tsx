'use client';

import React from 'react';
import type { AgentWorkloadItem } from '@/types/customerSupport';

interface AgentWorkloadProps {
  agents: AgentWorkloadItem[];
}

export function AgentWorkload({ agents }: AgentWorkloadProps) {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
        Agent Workload
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left">
          <thead>
            <tr className="border-b border-line text-slate-500">
              <th className="font-semibold py-2">Agent</th>
              <th className="font-semibold py-2 text-center">Open Cases</th>
              <th className="font-semibold py-2 text-center">At Risk / Critical</th>
              <th className="font-semibold py-2 text-right">Resolved Today</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td className="py-2.5 font-bold text-ink">{agent.agentName}</td>
                <td className="py-2.5 text-center font-bold text-ink">{agent.openCases}</td>
                <td className="py-2.5 text-center">
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded ${
                      agent.atRiskOrCritical > 3
                        ? 'bg-red-50 text-red-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {agent.atRiskOrCritical} {agent.atRiskOrCritical > 3 ? 'critical' : 'at risk'}
                  </span>
                </td>
                <td className="py-2.5 text-right font-bold text-green-600">
                  {agent.resolvedToday}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-slate-400 mt-3 italic">* Calculated operational aggregates</p>
    </div>
  );
}
