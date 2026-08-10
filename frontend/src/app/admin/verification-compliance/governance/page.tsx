"use client";

import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Domain', value: 'Governance & Rules' },
];

export default function ComplianceGovernancePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await verificationComplianceApi.getGovernanceDashboard();
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

  const kpis = data?.kpis || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Governance</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Compliance Rules, Policies, SLA &amp; Escalations</h1>
            <p className="text-xs text-gray-500 mt-1">Define marketplace compliance rules, publish policies, configure automated SLA checks, and manage escalation trees.</p>
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

        {/* GOVERNANCE ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <ChartCard title="Governance Activity Trend (30 Days)" subtitle="Rule publications, policy updates &amp; escalations" loading={loading}>
            <TrendChart data={data?.trend || []} colors={['#2563eb', '#16a34a', '#f59e0b']} />
          </ChartCard>

          <ChartCard title="Rule Domain Distribution" subtitle="Active rule breakdown by domain" loading={loading}>
            <DonutDistributionChart data={data?.donut || []} totalLabel="Rules" totalValue={(data?.donut || []).reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} />
          </ChartCard>
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Governance Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Enforced" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
