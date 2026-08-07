'use client';

import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { PaymentLifecycleEvent } from '@/data/mockPaymentDetailData';

interface Props {
  events: PaymentLifecycleEvent[];
}

export function PaymentLifecycleBar({ events }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-3">
        Payment Lifecycle
      </p>

      {/* Horizontal scrolling track */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex items-center min-w-max gap-0">
          {events.map((ev, idx) => {
            const isLast = idx === events.length - 1;
            return (
              <React.Fragment key={ev.id}>
                {/* Stage node */}
                <div className="flex flex-col items-center gap-0.5 min-w-[80px] relative">
                  {/* Icon */}
                  <div
                    className={[
                      'w-7 h-7 rounded-full border-2 flex items-center justify-center',
                      ev.status === 'completed'
                        ? 'bg-emerald-50 border-emerald-400'
                        : ev.status === 'current'
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-gray-50 border-gray-300',
                    ].join(' ')}
                  >
                    {ev.status === 'completed' ? (
                      <CheckCircle size={13} className="text-emerald-500" />
                    ) : ev.status === 'current' ? (
                      <Clock size={13} className="text-blue-500" />
                    ) : (
                      <Circle size={12} className="text-gray-300" />
                    )}
                  </div>

                  {/* Label */}
                  <p
                    className={[
                      'text-[9px] text-center leading-tight px-0.5',
                      ev.status === 'completed'
                        ? 'font-semibold text-gray-700'
                        : ev.status === 'current'
                        ? 'font-bold text-blue-700'
                        : 'text-gray-400 font-medium',
                    ].join(' ')}
                  >
                    {ev.stage}
                  </p>

                  {/* Time */}
                  <p
                    className={[
                      'text-[8px] font-mono',
                      ev.status === 'completed'
                        ? 'text-gray-500'
                        : ev.status === 'current'
                        ? 'text-blue-500'
                        : 'text-gray-300',
                    ].join(' ')}
                  >
                    {ev.time ?? '—'}
                  </p>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div
                    className={[
                      'flex-1 h-[2px] min-w-[20px]',
                      events[idx + 1]?.status === 'pending'
                        ? 'border-t-2 border-dashed border-gray-200'
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
