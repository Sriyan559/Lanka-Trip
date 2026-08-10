"use client";

import React, { useState, useEffect } from 'react';
import { Users, UserCheck, ShieldCheck, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
];

export default function SupplierUsersAccessPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getUsersAccessDashboard();
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
    { index: 1, title: 'Total Platform Users', value: data?.total_users || '0', icon: Users },
    { index: 2, title: 'Supplier Users', value: data?.supplier_users || '0', icon: UserCheck },
  ];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Users &amp; Access</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Users, Roles &amp; Access</h1>
            <p className="text-xs text-gray-500 mt-1">Manage user accounts, assigned roles, permissions, MFA enforcement, and access reviews.</p>
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

        {/* ACCESS ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Supplier Access Activity Trend (30 Days)" subtitle="User logins and active sessions trajectory" loading={loading}>
            <TrendChart data={data?.trend || []} colors={['#2563eb', '#16a34a']} />
          </ChartCard>

          <ChartCard title="User Role Distribution" subtitle="Role breakdown" loading={loading}>
            <DonutDistributionChart data={data?.donut || []} totalLabel="Users" totalValue={(data?.donut || []).reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} />
          </ChartCard>
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Access Security Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Secure" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
