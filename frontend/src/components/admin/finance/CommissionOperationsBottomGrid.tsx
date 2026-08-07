'use client';

import React from 'react';
import { FN08_OPERATIONS_CARDS } from '@/data/mockCommissionData';

export function CommissionOperationsBottomGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
      {FN08_OPERATIONS_CARDS.map((card) => (
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
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-gray-900">{m.val}</span>
                    {m.delta && (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                        {m.delta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
