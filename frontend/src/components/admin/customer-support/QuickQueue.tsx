'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { QuickQueueItemData } from '@/types/customerSupport';

interface QuickQueueProps {
  items: QuickQueueItemData[];
}

export function QuickQueue({ items }: QuickQueueProps) {
  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          Quick Queue
        </h3>
        <button type="button" className="text-[11px] font-semibold text-slate-400 hover:text-primary-900 transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/admin/customer-support/cases/${item.caseId}`}
            className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 group hover:bg-slate-50 transition-colors -mx-2 px-2 rounded-lg"
          >
            <span className="text-[12px] font-bold text-slate-700 group-hover:text-ink transition-colors">{item.label}</span>
            <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-primary-900">
              <span>{item.caseReference}</span>
              <ChevronRight size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
