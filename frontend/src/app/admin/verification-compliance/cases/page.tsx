"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, CheckCircle2, Clock, AlertTriangle, 
  FileText, RefreshCw, Eye
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

const TABS = [
  { id: 'all', label: 'All Compliance Cases' },
  { id: 'open', label: 'Open Investigations' },
  { id: 'escalated', label: 'Escalated to Legal' },
  { id: 'resolved', label: 'Resolved / Closed' },
];

export default function CentralComplianceCasesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await verificationComplianceApi.getDocumentsDashboard({ search, status: activeTab });
      setDashboardData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab]);

  const kpis = [
    { index: 1, title: 'Total Active Compliance Cases', value: 0, icon: ShieldAlert },
    { index: 2, title: 'High Severity Cases', value: 0, icon: AlertTriangle, alert: false },
    { index: 3, title: 'Under Investigation', value: 0, icon: Clock },
    { index: 4, title: 'Resolved This Month', value: 0, icon: CheckCircle2 },
  ];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Cases</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Central Compliance Case Management</h1>
            <p className="text-xs text-gray-500 mt-1">Manage regulatory infractions, authenticity disputes, product safety violations, and escalation workflows.</p>
          </div>
          <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 shadow-sm">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        <ContextScopeBar items={[{ label: 'Tenant', value: 'SL Beauty' }]} lastSynced="Just now" accessNote="Access limited to assigned business context" />

        <DashboardGrid>
          {kpis.map((kpi) => (
            <KpiCard key={kpi.index} {...kpi} />
          ))}
        </DashboardGrid>

        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        <FilterToolbar 
          searchPlaceholder="Search case ID or subject..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={fetchDashboard}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Compliance Case Opened Trend (30 Days)" subtitle="Historical case openings" loading={loading}>
            <TrendChart data={dashboardData?.trend || []} colors={['#dc2626', '#f59e0b', '#2563eb']} />
          </ChartCard>

          <ChartCard title="Compliance Case Severity Breakdown" subtitle="Distribution by severity level" loading={loading}>
            <DonutDistributionChart data={dashboardData?.donut || []} totalLabel="Cases" totalValue="0" />
          </ChartCard>
        </div>

      </div>

      <RightIntelligenceRail>
        <RailSection title="Compliance Health">
          <HealthScoreGauge score={88} label="At Risk" statusText="Active Cases" statusColor="#f59e0b" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
