'use client';

import React from 'react';
import { MOCK_DOMAIN_MINI_CARDS } from '@/data/mockFinanceData';

export function FinanceDomainSummaryGrid() {
  const cards = MOCK_DOMAIN_MINI_CARDS;

  const renderMiniBars = (values?: number[]) => {
    if (!values || values.length === 0) return null;
    const max = Math.max(...values, 100);
    return (
      <div className="flex items-end gap-1 h-5 mt-2">
        {values.map((v, idx) => (
          <div
            key={idx}
            className="flex-1 bg-rose-200 hover:bg-[#8f002b] transition-colors rounded-t"
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5">
      {cards.map((card) => {
        if (card.id === 'activity') {
          return (
            <div key={card.id} className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2">
              <div className="pb-1 mb-1 border-b border-gray-100 flex items-center justify-between">
                <h4 className="text-[11px] font-bold text-gray-900 truncate">{card.title}</h4>
              </div>
              <div className="space-y-1 my-auto">
                {card.recentLog?.map((log, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] text-gray-700">
                    <span className="truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {log.text}
                    </span>
                    <span className="text-gray-400 font-semibold shrink-0 ml-1">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={card.id} className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm flex flex-col justify-between">
            <div className="pb-1 border-b border-gray-100 mb-1">
              <h4 className="text-[11px] font-bold text-gray-900 truncate">{card.title}</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs my-auto">
              {card.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[9px] text-gray-500 font-medium truncate">{m.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-extrabold text-gray-900 text-xs leading-none">{m.value}</span>
                    {m.delta && (
                      <span
                        className={`text-[9px] font-bold ${
                          m.isPositive ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {m.isPositive ? '▲' : '▼'} {m.delta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {renderMiniBars(card.sparkBars)}
          </div>
        );
      })}
    </div>
  );
}
