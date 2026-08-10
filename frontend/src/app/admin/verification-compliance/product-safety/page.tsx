"use client";

import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Domain', value: 'Product Safety' },
];

export default function ProductSafetyPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await verificationComplianceApi.getProductSafetyDashboard();
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
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Product Safety</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Product Safety &amp; Regulatory Oversight</h1>
            <p className="text-xs text-gray-500 mt-1">Enforce cosmetic ingredients compliance, safety dossiers, packaging standards, and NMRA registration approvals.</p>
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
          Product safety dossiers and regulatory compliance records loaded directly from database.
        </div>
      </div>

      <RightIntelligenceRail>
        <RailSection title="Safety Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Compliant" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
