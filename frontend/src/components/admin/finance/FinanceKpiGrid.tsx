'use client';

import React from 'react';
import { FinanceKpiCard } from './FinanceKpiCard';
import { MOCK_FINANCE_KPIS } from '@/data/mockFinanceData';
import { FinanceKpi } from '@/types/finance';

interface Props {
  kpis?: FinanceKpi[];
}

export function FinanceKpiGrid({ kpis }: Props) {
  const items = kpis ?? MOCK_FINANCE_KPIS;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5">
      {items.map((kpi) => (
        <FinanceKpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
