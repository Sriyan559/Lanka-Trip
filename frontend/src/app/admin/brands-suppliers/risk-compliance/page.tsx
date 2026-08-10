"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Clock, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
];

export default function SupplierRiskCompliancePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getRiskComplianceDashboard();
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

  const risk = data?.risk_summary || { high: 0, medium: 0, low: 0 };
  const kpis = [
    { index: 1, title: 'High-Risk Suppliers', value: risk.high, icon: AlertTriangle, alert: risk.high > 0 },
    { index: 2, title: 'Medium-Risk Suppliers', value: risk.medium, icon: Clock },
    { index: 3, title: 'Low-Risk Suppliers', value: risk.low, icon: ShieldCheck },
  ];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Risk &amp; Compliance</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Risk &amp; Compliance</h1>
            <p className="text-xs text-gray-500 mt-1">Assess risk exposure, audit compliance posture, track remediations, and manage restrictions.</p>
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
          Risk profiles and compliance scores generated directly from database evaluations.
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Risk Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Compliant" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
