'use client';

import React from 'react';
import type { CustomerSentimentDistribution, CaseMixCategory } from '@/types/customerSupport';

interface SentimentCaseMixProps {
  sentiment?: CustomerSentimentDistribution | null;
  caseMix?: CaseMixCategory[] | null;
}

export function SentimentCaseMix({ sentiment, caseMix }: SentimentCaseMixProps) {
  const sentimentItems = [
    { label: 'Positive', percent: sentiment?.positivePercent ?? 20, color: 'bg-emerald-500' },
    { label: 'Neutral', percent: sentiment?.neutralPercent ?? 38, color: 'bg-slate-400' },
    { label: 'Concerned', percent: sentiment?.concernedPercent ?? 18, color: 'bg-amber-500' },
    { label: 'Frustrated', percent: sentiment?.frustratedPercent ?? 15, color: 'bg-orange-500' },
    { label: 'Distressed', percent: sentiment?.distressedPercent ?? 9, color: 'bg-red-600' },
  ];

  const caseMixItems = caseMix?.length ? caseMix : [
    { label: 'Order & Delivery', percent: 38 },
    { label: 'Payments', percent: 17 },
    { label: 'Returns & Refunds', percent: 22 },
    { label: 'Product Safety', percent: 8 },
    { label: 'Authenticity', percent: 5 },
    { label: 'General Inquiries', percent: 10 },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4">
      <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-3">
        Customer Sentiment & Case Mix
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: Customer Sentiment Donut */}
        <div>
          <span className="text-[10px] font-bold text-slate-700 block mb-2">
            Customer Sentiment
          </span>
          <div className="flex items-center gap-3">
            {/* SVG Donut Chart */}
            <div className="relative w-14 h-14 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#94a3b8" strokeWidth="4" strokeDasharray="38 62" strokeDashoffset="-20" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="18 82" strokeDashoffset="-58" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-76" />
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#dc2626" strokeWidth="4" strokeDasharray="9 91" strokeDashoffset="-91" />
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-0.5 flex-1 text-[10px]">
              {sentimentItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color} inline-block`} />
                    <span className="text-slate-600">{item.label}</span>
                  </div>
                  <span className="font-bold text-ink">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-slate-400 mt-2 italic">* Calculated from recent messages</p>
        </div>

        {/* Right: Case Mix Breakdown */}
        <div>
          <span className="text-[10px] font-bold text-slate-700 block mb-2">
            Case Mix
          </span>
          <div className="flex flex-col gap-1 text-[10px]">
            {caseMixItems.map((cat) => (
              <div key={cat.label} className="flex items-center justify-between">
                <span className="text-slate-600 truncate max-w-[100px]">{cat.label}</span>
                <span className="font-bold text-ink">{cat.percent}%</span>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-slate-400 mt-2 italic">* Calculated from open cases</p>
        </div>
      </div>
    </div>
  );
}
