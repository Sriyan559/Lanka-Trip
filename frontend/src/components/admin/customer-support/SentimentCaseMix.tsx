'use client';

import React from 'react';
import type { CustomerSentimentDistribution, CaseMixCategory } from '@/types/customerSupport';

interface SentimentCaseMixProps {
  sentiment: CustomerSentimentDistribution | null;
  caseMix: CaseMixCategory[] | null;
}

export function SentimentCaseMix({ sentiment, caseMix }: SentimentCaseMixProps) {
  if (!sentiment || !caseMix) {
    return null;
  }

  const sentimentItems = [
    { label: 'Positive', percent: sentiment.positivePercent, color: 'bg-green-600' },
    { label: 'Neutral', percent: sentiment.neutralPercent, color: 'bg-slate-500' },
    { label: 'Concerned', percent: sentiment.concernedPercent, color: 'bg-amber-500' },
    { label: 'Frustrated', percent: sentiment.frustratedPercent, color: 'bg-orange-600' },
    { label: 'Distressed', percent: sentiment.distressedPercent, color: 'bg-red-600' },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">
        Customer Sentiment & Case Mix
      </h3>

      {/* Donut Chart and Sentiment Legend */}
      <div className="mb-4">
        <span className="text-[11px] font-bold text-slate-700 block mb-3">
          Customer Sentiment
        </span>
        <div className="flex items-center gap-5">
          {/* SVG Donut Chart */}
          <div className="relative w-[70px] h-[70px] flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#64748b" strokeWidth="4" strokeDasharray="48 52" strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#16a34a" strokeWidth="4" strokeDasharray="22 78" strokeDashoffset="-48" />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#d97706" strokeWidth="4" strokeDasharray="16 84" strokeDashoffset="-70" />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#ea580c" strokeWidth="4" strokeDasharray="9 91" strokeDashoffset="-86" />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#dc2626" strokeWidth="4" strokeDasharray="5 95" strokeDashoffset="-95" />
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-1 flex-1 text-[11px]">
            {sentimentItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.color} inline-block`} />
                  <span className="text-slate-600">{item.label}</span>
                </div>
                <span className="font-bold text-ink">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 italic">* Calculated from recent messages</p>
      </div>

      <div className="border-t border-slate-100 pt-3">
        <span className="text-[11px] font-bold text-slate-700 block mb-3">
          Case Mix
        </span>
        <div className="flex flex-col gap-2.5">
          {caseMix.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-600">{cat.label}</span>
                <span className="font-bold text-ink">{cat.percent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-900 h-full rounded-full" style={{ width: `${cat.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-3 italic">* Calculated from open cases</p>
      </div>
    </div>
  );
}
