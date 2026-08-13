'use client';

import React from 'react';
interface Card {num:number;title:string;metrics?:Array<{label:string;val:string}>;events?:Array<{time:string;status:string;ref:string}>;score?:number|null}
export function PayableOperationsBottomGrid({cards}:{cards:Card[]}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-xs">
      {cards.map((card) => (
        <div
          key={card.num}
          className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-colors"
        >
          {/* Card Header */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 border-b border-gray-100 pb-1">
              <span className="w-4 h-4 rounded-full bg-[#8f002b] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                {card.num}
              </span>
              <p className="font-bold text-gray-900 text-[11px] truncate leading-tight">
                {card.title}
              </p>
            </div>

            {/* Metrics List */}
            {card.metrics && (
              <div className="space-y-1 text-[10px] my-1">
                {card.metrics.map((m) => (
                  <div key={m.label} className="flex justify-between items-center">
                    <span className="text-gray-500 truncate">{m.label}</span>
                    <span className="font-bold text-gray-800 shrink-0 font-mono">{m.val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Timeline events (for Card 12) */}
            {card.events && (
              <div className="space-y-1 text-[10px] my-1">
                {card.events.map((ev, i) => (
                  <div key={i} className="flex items-center justify-between gap-1">
                    <span className="font-mono text-gray-400 text-[9px] shrink-0">{ev.time}</span>
                    <span className="font-semibold text-gray-800 truncate">{ev.status}</span>
                    <span className="font-mono text-[#8f002b] text-[9px] truncate">{ev.ref}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Score / Indicator if present */}
          {card.score !== undefined && (
            <div className="mt-2 pt-1 border-t border-gray-100 flex items-center justify-between text-[10px]">
              <span className="text-gray-400 font-medium">Validation Score</span>
              <span className="font-bold text-emerald-700 font-mono">{card.score===null?'Unknown':`${card.score}%`}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
