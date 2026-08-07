'use client';

import React from 'react';
import { FN11_OPERATIONS_CARDS } from '@/data/mockInvoicesNotesData';

export function DocumentOperationsBottomGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 text-xs">
      {FN11_OPERATIONS_CARDS.map((card) => (
        <div
          key={card.num}
          className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col justify-between hover:shadow transition-shadow"
        >
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-1.5 mb-2 leading-tight">
              {card.num}. {card.title}
            </p>

            <div className="flex flex-col gap-1 text-[11px]">
              {card.metrics?.map((m) => (
                <div key={m.label} className="flex justify-between items-center">
                  <span className="text-gray-600 text-[10px]">{m.label}</span>
                  <span className="font-mono font-bold text-gray-900">{m.val}</span>
                </div>
              ))}
            </div>

            {card.events && (
              <div className="flex flex-col gap-1 text-[9px] font-mono mt-1">
                {card.events.map((ev, i) => (
                  <div key={i} className="flex justify-between items-center text-gray-600 border-b border-gray-50 pb-0.5">
                    <span className="text-[#8f002b] font-bold truncate max-w-[70px]">{ev.ref}</span>
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
