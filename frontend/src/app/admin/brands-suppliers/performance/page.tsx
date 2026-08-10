"use client";

import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
];

export default function SupplierPerformancePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getPerformanceDashboard();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const kpis = [
    { index: 1, title: 'Total Suppliers Assessed', value: data?.suppliers_count || '0', icon: Award },
    { index: 2, title: 'Average Performance Rating', value: `${data?.average_rating || '0.0'} / 5.0`, icon: CheckCircle2 },
  ];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Performance</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Performance &amp; SLA</h1>
            <p className="text-xs text-gray-500 mt-1">Monitor supplier fulfillment rates, order timeliness, complaint resolution, and operational compliance.</p>
          </div>
          <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={data?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        <DashboardGrid>
          {kpis.map((kpi: any) => (
            <KpiCard key={kpi.index} {...kpi} />
          ))}
        </DashboardGrid>

        {/* PERFORMANCE ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Supplier Performance Trend (30 Days)" subtitle="Average performance rating score trajectory" loading={loading}>
            <TrendChart data={data?.trend || []} colors={['#16a34a', '#2563eb', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Supplier Performance Tier Distribution" subtitle="Distribution by performance status rating" loading={loading}>
            <DonutDistributionChart data={data?.donut || []} totalLabel="Suppliers" totalValue={(data?.donut || []).reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} />
          </ChartCard>
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Performance Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Compliant" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
