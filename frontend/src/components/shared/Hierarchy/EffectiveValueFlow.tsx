'use client';

import React from 'react';
import { EffectiveValueNode } from '@/lib/administration/system-configuration/sys-config.types';
import { ArrowRight } from 'lucide-react';

interface EffectiveValueFlowProps {
  nodes: EffectiveValueNode[];
  resolution: {
    source: string;
    appliedBy: string;
    overrideType: string;
    priority: string;
    appliedOn: string;
    lastEvaluated: string;
    lifecycleState: string;
    validationStatus: string;
    productionReadiness: string;
    driftStatus: string;
  };
  className?: string;
}

export function EffectiveValueFlow({ nodes, resolution, className = '' }: EffectiveValueFlowProps) {
  const effectiveNode = nodes.find(n => n.isEffective);
  const effectiveScope = effectiveNode?.scope || 'Platform Default';
  const effectiveValue = effectiveNode?.value || '';

  return (
    <div className={`w-full flex flex-col items-center justify-center p-2 min-w-0 ${className}`}>
      {/* Top flow nodes */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 w-full">
        {nodes.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded border text-center shadow-2xs min-w-[90px] ${
              node.isEffective ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-gray-200'
            }`}>
              <span className={`text-[9px] font-bold block ${node.isEffective ? 'text-emerald-900' : 'text-gray-500'}`}>
                {node.scope}
              </span>
              <span className={`text-[11px] font-extrabold mt-0.5 block ${node.isEffective ? 'text-emerald-700' : 'text-gray-900'}`}>
                {node.value}
              </span>
            </div>
            {idx < nodes.length - 1 && (
              <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Effective Values Display */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6 w-full">
        <div className="text-center">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Effective Production Value
          </span>
          <span className="text-lg font-extrabold text-emerald-700">
            {effectiveValue}
          </span>
        </div>
        
        <div className="hidden md:block w-px h-12 bg-gray-200"></div>

        <div className="text-center">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Mobile App Effective Value
          </span>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-[10px] font-bold text-gray-400">({resolution.source})</span>
            <span className="text-lg font-extrabold text-emerald-700">
              {effectiveValue}
            </span>
          </div>
        </div>
      </div>

      {/* Resolution Details Grid */}
      <div className="mt-5 w-full bg-gray-50 border border-gray-150 rounded p-3">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-[9px]">
          <div>
            <span className="text-gray-400 font-semibold block uppercase">Source</span>
            <span className="font-bold text-gray-900">{resolution.source}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block uppercase">Applied By</span>
            <span className="font-bold text-gray-900">{resolution.appliedBy}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block uppercase">Override Type</span>
            <span className="font-bold text-gray-900">{resolution.overrideType}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block uppercase">Priority</span>
            <span className={`font-bold ${resolution.priority === 'High' ? 'text-rose-700' : resolution.priority === 'Medium' ? 'text-amber-700' : 'text-blue-700'}`}>{resolution.priority}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block uppercase">Applied On</span>
            <span className="font-bold text-gray-900">{resolution.appliedOn}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block uppercase">Last Evaluated</span>
            <span className="font-bold text-gray-900">{resolution.lastEvaluated}</span>
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="mt-3 w-full flex flex-wrap items-center justify-between gap-2 border-t border-gray-150 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase">Lifecycle State</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="text-[10px] font-bold text-emerald-700">{resolution.lifecycleState}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase">Validation Status</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="text-[10px] font-bold text-emerald-700">{resolution.validationStatus}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase">Production Readiness</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="text-[10px] font-bold text-emerald-700">{resolution.productionReadiness}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase">Drift Status</span>
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
          <span className="text-[10px] font-bold text-gray-700">{resolution.driftStatus}</span>
        </div>
      </div>
    </div>
  );
}
export default EffectiveValueFlow;
