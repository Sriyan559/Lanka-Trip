"use client";

import React, { useState, useEffect } from 'react';
import { FileText, ShieldCheck, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Domain', value: 'Compliance Analytics' },
];

export default function ComplianceReportsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await verificationComplianceApi.getReportsDashboard();
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

  const analytics = data?.analytics || { total_compliance_cases: 0, open_cases: 0, risk_profiles_count: 0 };
  const kpis = [
    { index: 1, title: 'Total Compliance Cases', value: analytics.total_compliance_cases, icon: FileText },
    { index: 2, title: 'Open Active Cases', value: analytics.open_cases, icon: FileText },
    { index: 3, title: 'Assessed Risk Profiles', value: analytics.risk_profiles_count, icon: ShieldCheck },
  ];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Reports &amp; Analytics</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Compliance Reports &amp; Analytics</h1>
            <p className="text-xs text-gray-500 mt-1">Generate trust score reports, analyze risk distribution, and measure SLA adherence.</p>
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

        <div className="bg-white border border-gray-200 rounded-md p-6 mt-2 text-center text-xs text-gray-500">
          Analytics &amp; trust scores calculated dynamically from database events.
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Analytics Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Aggregated" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
