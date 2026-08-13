'use client';

import React from 'react';
import { UserCheck } from 'lucide-react';

interface SelectedAgentHeaderProps {
  agentName?: string;
  role?: string;
  activeCases?: number;
  weightedLoad?: number;
  stdCapacity?: number;
  utilisation?: number;
}

export function SelectedAgentHeader({
  agentName = 'Amaya Perera',
  role = 'Senior Agent',
  activeCases = 14,
  weightedLoad = 20.4,
  stdCapacity = 18.0,
  utilisation = 76,
}: SelectedAgentHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-1 border-t border-slate-200">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#881337] text-white flex items-center justify-center font-bold text-xs">
          AP
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-900 leading-none">
            Selected Agent: <span className="text-[#881337] font-extrabold">{agentName}</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-medium">{role}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        <div>
          <span className="text-slate-500">Active Cases:</span> <strong className="text-slate-900 font-bold">{activeCases}</strong>
        </div>
        <span className="text-slate-200">|</span>
        <div>
          <span className="text-slate-500">Weighted Load:</span> <strong className="text-slate-900 font-bold">{weightedLoad}</strong>
        </div>
        <span className="text-slate-200">|</span>
        <div>
          <span className="text-slate-500">Std. Capacity:</span> <strong className="text-slate-900 font-bold">{stdCapacity}</strong>
        </div>
        <span className="text-slate-200">|</span>
        <div>
          <span className="text-slate-500">Utilisation:</span> <strong className="text-emerald-600 font-bold">{utilisation}%</strong>
        </div>
      </div>
    </div>
  );
}
