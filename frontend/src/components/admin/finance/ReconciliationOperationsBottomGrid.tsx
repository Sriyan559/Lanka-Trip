'use client';

import React from 'react';
import { FN13_OPERATIONS_CARDS } from '@/data/mockReconciliationControlsData';

export function ReconciliationOperationsBottomGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 text-xs">
      {FN13_OPERATIONS_CARDS.map((card) => (
        <div
          key={card.num}
          className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col justify-between hover:shadow transition-shadow"
        >
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-1.5 mb-2 leading-tight">
              {card.num}. {card.title}
            </p>

            {/* Metrics List */}
            {card.metrics && (
              <div className="flex flex-col gap-1 text-[11px]">
                {card.metrics.map((m) => (
                  <div key={m.label} className="flex justify-between items-center">
                    <span className="text-gray-600 text-[10px]">{m.label}</span>
                    <span className="font-mono font-bold text-gray-900">{m.val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Compact Donut Data */}
            {card.donutData && (
              <div className="flex flex-col gap-1 text-[10px]">
                {card.donutData.map((d) => (
                  <div key={d.label} className="flex justify-between items-center">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-gray-600 truncate">{d.label}</span>
                    </div>
                    <span className="font-mono font-bold text-gray-900">{d.pct}%</span>
                  </div>
                ))}
              </div>
            )}

            {/* Circular score indicator */}
            {card.circularScore !== undefined && (
              <div className="flex items-center justify-center my-2">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500"
                      strokeDasharray={`${card.circularScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex items-center justify-center text-center">
                    <span className="text-[11px] font-extrabold text-gray-900 font-mono">
                      {card.circularScore}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity Log */}
            {card.events && (
              <div className="flex flex-col gap-1 text-[9px] font-mono mt-1">
                {card.events.map((ev, i) => (
                  <div key={i} className="flex justify-between items-center text-gray-600 border-b border-gray-50 pb-0.5">
                    <span className="text-[#8f002b] font-bold truncate max-w-[75px]">{ev.ref}</span>
                    <span className="font-semibold text-emerald-700 truncate max-w-[90px]">{ev.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
