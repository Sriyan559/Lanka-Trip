'use client';

import React from 'react';
import type { RefundWorkflowStep } from '@/services/api/financeRefundsService';

interface Props {
  steps: RefundWorkflowStep[];
  loading?: boolean;
}

export function RefundOperationsWorkflow({ steps, loading }: Props) {
  if (loading && steps.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm">
        <div className="h-4 bg-gray-100 rounded w-48 animate-pulse mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-50 rounded-lg border border-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
          Refund Operations Workflow
        </h2>
        <span className="text-[10px] text-gray-400 font-semibold">
          {steps.length} Sequential Resolution Stages
        </span>
      </div>

      {steps.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">No workflow data for the selected period.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
          {steps.map((step) => (
            <div
              key={step.stepNum}
              className="bg-gray-50/70 border border-gray-200 rounded-lg p-2 flex flex-col justify-between hover:border-gray-300 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="w-4 h-4 rounded-full bg-[#8f002b] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                    {step.stepNum}
                  </span>
                  <p className="font-bold text-gray-900 text-[11px] truncate leading-tight">
                    {step.title}
                  </p>
                </div>

                <div className="space-y-0.5 my-1.5 border-t border-b border-gray-200/60 py-1 text-[10px]">
                  {step.metrics.map((m) => (
                    <div key={m.label} className="flex justify-between items-center">
                      <span className="text-gray-500 truncate">{m.label}</span>
                      <span className="font-bold text-gray-800 shrink-0 font-mono">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-[9px] mb-0.5">
                  <span className="text-gray-400 font-medium">Stage Completion</span>
                  <span className="font-bold text-emerald-700">{step.statusText}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${step.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
