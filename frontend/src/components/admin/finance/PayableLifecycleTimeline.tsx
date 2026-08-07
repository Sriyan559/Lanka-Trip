'use client';

import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { FN07LifecycleStage } from '@/data/mockSupplierPayableDetailData';

interface Props {
  stages: FN07LifecycleStage[];
}

export function PayableLifecycleTimeline({ stages }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
          1. Payable Lifecycle (Workflow)
        </p>
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />
            Current Step
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            Completed
          </span>
        </div>
      </div>

      {/* Horizontal scrolling track */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex items-start min-w-max gap-0">
          {stages.map((ev, idx) => {
            const isLast = idx === stages.length - 1;
            return (
              <React.Fragment key={ev.id}>
                {/* Stage node */}
                <div className="flex flex-col items-center gap-0.5 min-w-[72px]">
                  {/* Icon */}
                  <div
                    className={[
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                      ev.status === 'completed'
                        ? 'bg-emerald-50 border-emerald-400'
                        : ev.status === 'current'
                        ? 'bg-orange-50 border-orange-500'
                        : 'bg-gray-50 border-gray-300',
                    ].join(' ')}
                  >
                    {ev.status === 'completed' ? (
                      <CheckCircle size={11} className="text-emerald-500" />
                    ) : ev.status === 'current' ? (
                      <Clock size={11} className="text-orange-500" />
                    ) : (
                      <Circle size={10} className="text-gray-300" />
                    )}
                  </div>

                  {/* Label */}
                  <p
                    className={[
                      'text-[8px] text-center leading-tight px-0.5 max-w-[64px]',
                      ev.status === 'completed'
                        ? 'font-semibold text-gray-700'
                        : ev.status === 'current'
                        ? 'font-bold text-orange-700'
                        : 'text-gray-400 font-medium',
                    ].join(' ')}
                  >
                    {ev.stage}
                  </p>

                  {/* Date */}
                  <p
                    className={[
                      'text-[8px] font-mono',
                      ev.status === 'completed'
                        ? 'text-gray-500'
                        : ev.status === 'current'
                        ? 'text-orange-500'
                        : 'text-gray-300',
                    ].join(' ')}
                  >
                    {ev.date}
                  </p>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    className={[
                      'h-[2px] mt-[11px] min-w-[16px] flex-1',
                      stages[idx + 1]?.status === 'pending'
                        ? 'border-t-2 border-dashed border-gray-200'
                        : ev.status === 'current'
                        ? 'bg-orange-300'
                        : 'bg-emerald-300',
                    ].join(' ')}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
