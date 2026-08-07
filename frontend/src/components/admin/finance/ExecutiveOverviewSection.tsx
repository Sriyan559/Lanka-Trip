'use client';

import React from 'react';
import { RevenueCollectionsTrendChart } from './RevenueCollectionsTrendChart';
import { PaymentMethodDistributionChart } from './PaymentMethodDistributionChart';
import { FinancialStatusSummaryPanel } from './FinancialStatusSummaryPanel';

export function ExecutiveOverviewSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
      {/* Revenue, Collection & Refund Trend (6 cols) */}
      <div className="lg:col-span-6">
        <RevenueCollectionsTrendChart />
      </div>

      {/* Payment Method Distribution (3 cols) */}
      <div className="lg:col-span-3">
        <PaymentMethodDistributionChart />
      </div>

      {/* Financial Status Summary (3 cols) */}
      <div className="lg:col-span-3">
        <FinancialStatusSummaryPanel />
      </div>
    </div>
  );
}
