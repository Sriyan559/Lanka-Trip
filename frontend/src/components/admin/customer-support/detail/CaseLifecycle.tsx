'use client';

import React from 'react';
import { Check } from 'lucide-react';
import type { LifecycleStage } from '@/types/customerSupportDetail';

interface CaseLifecycleProps {
  stages: LifecycleStage[];
}

export function CaseLifecycle({ stages }: CaseLifecycleProps) {
  return (
    <div className="bg-slate-50 border border-line rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-line flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">CASE LIFECYCLE STAGE</span>
        <span className="text-[10px] font-bold text-primary-900 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
          STAGE 4 OF 9 ACTIVE
        </span>
      </div>

      <div className="px-6 py-8 relative">
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
        <div className="relative z-10 flex items-center justify-between">
          {stages.map((stage) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';

            return (
              <div key={stage.stageNumber} className="flex flex-col items-center gap-3 w-20">
                {isCompleted ? (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-green-500 text-white shadow-sm ring-4 ring-slate-50"
                    title={`Completed: ${stage.label}`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : isActive ? (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-900 text-white shadow-md ring-4 ring-primary-50 text-[12px] font-bold"
                    title={`Active: ${stage.label}`}
                  >
                    {stage.stageNumber}
                  </div>
                ) : (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-slate-400 border-2 border-slate-200 ring-4 ring-slate-50 text-[12px] font-bold"
                    title={`Pending: ${stage.label}`}
                  >
                    {stage.stageNumber}
                  </div>
                )}

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider text-center leading-tight ${
                    isActive ? 'text-primary-900' : 'text-slate-500'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
