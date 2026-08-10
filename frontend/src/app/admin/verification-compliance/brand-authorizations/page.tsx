"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, CheckCircle2, Clock, AlertTriangle, 
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
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

const TABS = [
  { id: 'all', label: 'All Brand Authorizations' },
  { id: 'active', label: 'Active Exclusive' },
  { id: 'non_exclusive', label: 'Active Non-Exclusive' },
  { id: 'pending', label: 'Pending Legal Review' },
  { id: 'expired', label: 'Expired / Terminated' },
];

export default function ComplianceBrandAuthorizationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getContractsDashboard({ search, status: activeTab });
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
    { index: 1, title: 'Total Authorizations', value: dashboardData?.contracts?.meta?.total || 0, icon: Award },
    { index: 2, title: 'Exclusive Rights', value: 0, icon: CheckCircle2 },
    { index: 3, title: 'Pending Legal Audit', value: 0, icon: Clock },
    { index: 4, title: 'Territory Conflicts', value: 0, icon: AlertTriangle, alert: false },
  ];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Brand Authorizations</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Brand Authorization Compliance Management</h1>
            <p className="text-xs text-gray-500 mt-1">Audit brand reseller rights, letter of authorization (LOA) validity, exclusivity covenants, and territory scopes.</p>
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
          searchPlaceholder="Search brand name or authorization ID..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={fetchDashboard}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Brand Authorization Filings (30 Days)" subtitle="Historical authorization filings" loading={loading}>
            <TrendChart data={dashboardData?.trend || []} colors={['#2563eb', '#16a34a', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Authorization Status Distribution" subtitle="Status breakdown" loading={loading}>
            <DonutDistributionChart data={dashboardData?.donut || []} totalLabel="Authorizations" totalValue="0" />
          </ChartCard>
        </div>

      </div>

      <RightIntelligenceRail>
        <RailSection title="LOA Health Score">
          <HealthScoreGauge score={95} label="Healthy" statusText="Compliant" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
