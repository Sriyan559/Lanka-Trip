'use client';

import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'current' | 'pending' | 'not-started';
}

interface Props {
  stages: Stage[];
}

export function SettlementDetailTimeline({ stages }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
          Settlement / Payout Lifecycle
        </p>
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
            Pending
          </span>
        </div>
      </div>

      {/* Horizontal scrolling track */}
      <div className="overflow-x-auto pb-1">
        <div className="flex items-start min-w-max gap-0">
          {stages.map((st, idx) => {
            const isLast = idx === stages.length - 1;
            return (
              <React.Fragment key={st.id}>
                {/* Node */}
                <div className="flex flex-col items-center gap-0.5 min-w-[70px]">
                  <div
                    className={[
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px]',
                      st.status === 'completed'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                        : st.status === 'current'
                        ? 'bg-orange-50 border-orange-500 text-orange-600'
                        : 'bg-gray-50 border-gray-300 text-gray-300',
                    ].join(' ')}
                  >
                    {st.status === 'completed' ? (
                      <CheckCircle size={10} className="text-emerald-500" />
                    ) : st.status === 'current' ? (
                      <Clock size={10} className="text-orange-500" />
                    ) : (
                      <Circle size={8} className="text-gray-300" />
                    )}
                  </div>

                  <p
                    className={[
                      'text-[8px] text-center leading-tight px-0.5 max-w-[62px]',
                      st.status === 'completed'
                        ? 'font-semibold text-gray-700'
                        : st.status === 'current'
                        ? 'font-bold text-orange-700'
                        : 'text-gray-400 font-medium',
                    ].join(' ')}
                  >
                    {st.name}
                  </p>

                  <p
                    className={[
                      'text-[8px] font-mono text-center',
                      st.status === 'completed'
                        ? 'text-gray-500'
                        : st.status === 'current'
                        ? 'text-orange-600 font-bold'
                        : 'text-gray-300',
                    ].join(' ')}
                  >
                    {st.date}
                  </p>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    className={[
                      'h-[2px] mt-[10px] min-w-[14px] flex-1',
                      stages[idx + 1]?.status === 'pending' || stages[idx + 1]?.status === 'not-started'
                        ? 'border-t-2 border-dashed border-gray-200'
                        : st.status === 'current'
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
