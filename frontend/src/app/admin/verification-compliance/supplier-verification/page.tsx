"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, CheckCircle2, Clock, AlertTriangle, 
  FileText, Eye, AlertCircle, RefreshCw, MoreVertical, Filter, Layers
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

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Verification Scope', value: 'Supplier Verification & Eligibility' },
];

const TABS = [
  { id: 'all', label: 'All Applications' },
  { id: 'pending', label: 'Pending Initial Triage' },
  { id: 'review', label: 'Under Review' },
  { id: 'verified', label: 'Verified / Approved' },
  { id: 'rejected', label: 'Rejected' },
];

const ICON_MAP: Record<string, any> = {
  FileText, CheckCircle2, Clock, ShieldCheck, AlertTriangle, RefreshCw, AlertCircle
};

export default function SupplierVerificationManagementPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await verificationComplianceApi.getSupplierVerificationDashboard({ search, status: activeTab, page, per_page: 15 });
      setDashboardData(res);
    } catch (err) {
      console.error("Failed to load supplier verification dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab, page]);

  const kpis = dashboardData?.kpis || [];
  const applicationsList = dashboardData?.applications?.data || [];
  const meta = dashboardData?.applications ? {
    current_page: dashboardData.applications.current_page || 1,
    per_page: dashboardData.applications.per_page || 15,
    total: dashboardData.applications.total || 0,
    last_page: dashboardData.applications.last_page || 1,
  } : { current_page: 1, per_page: 15, total: 0, last_page: 1 };
  const health = dashboardData?.health || { score: null, status: 'Not Assessed' };
  const alerts = dashboardData?.alerts || { high_risk: 0, missing_kyc: 0, sla_breach: 0 };
  const queues = dashboardData?.queues || { pending_triage: 0, kyc_checks: 0, legal_review: 0 };
  const donutData = dashboardData?.donut || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Supplier Verification</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Verification &amp; Eligibility</h1>
            <p className="text-xs text-gray-500 mt-1">Review, audit, and approve supplier business credentials, KYC dossiers, and compliance verifications.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 shadow-sm hover:text-gray-900">
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              <span>Sync Live Data</span>
            </button>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={dashboardData?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        {/* 12 KPI Grid */}
        <DashboardGrid>
          {kpis.map((kpi: any) => {
            const IconComponent = ICON_MAP[kpi.icon] || FileText;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Supplier Verification Trend (30 Days)" subtitle="Historical verification applications trajectory" loading={loading}>
            <TrendChart data={dashboardData?.trend || []} colors={['#2563eb', '#16a34a', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Verification Breakdown" subtitle="Distribution by decision category" loading={loading}>
            <DonutDistributionChart 
              data={donutData} 
              totalLabel="Applications" 
              totalValue={donutData.reduce((a: any, c: any) => a + (c.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        {/* Tabs & Filters */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setPage(1); }} />

        <FilterToolbar 
          searchPlaceholder="Search applications by ID, supplier, country..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={() => { setPage(1); fetchDashboard(); }}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); setPage(1); }}
        />

        {/* Applications Portfolio Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Supplier Verification Applications ({meta.total})</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Case / App ID</th>
                  <th className="px-3 py-2">Supplier / Entity</th>
                  <th className="px-3 py-2">Document / Dossier</th>
                  <th className="px-3 py-2">Verification Status</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Updated At</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {applicationsList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-gray-400">
                      No supplier verification applications found in database.
                    </td>
                  </tr>
                ) : (
                  applicationsList.map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-bold text-blue-800">{row.id}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.company_name || row.store_name || row.supplier_id || 'N/A'}</td>
                      <td className="px-3 py-2 text-gray-600 font-mono text-[10px]">KYC Dossier</td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${
                          row.status === 'verified' || row.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {row.status || row.verification_status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-bold text-gray-900 capitalize">{row.risk_level || 'Low'}</td>
                      <td className="px-3 py-2 text-gray-500">{row.updated_at ? new Date(row.updated_at).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-3 py-2">
                        <Link href={`/admin/verification-compliance/supplier-verification/${row.id}`} className="text-blue-600 font-bold hover:underline">
                          View Decision
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 flex items-center justify-between border-t border-gray-200 text-[11px] text-gray-500 bg-gray-50 rounded-b-md">
            <div>Showing page {meta.current_page} of {meta.last_page} ({meta.total} total records)</div>
            <div className="flex items-center gap-1">
              <button 
                disabled={meta.current_page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                &lt;
              </button>
              <span className="px-2 font-semibold text-gray-700">{meta.current_page}</span>
              <button 
                disabled={meta.current_page >= meta.last_page}
                onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
                className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-40"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Verification Intelligence Health">
          <HealthScoreGauge 
            score={health.score ?? 0} 
            label={health.status} 
            statusText={health.score === null ? 'Not Assessed' : (health.score >= 80 ? 'Healthy' : 'At Risk')}
            statusColor={health.score === null ? '#6b7280' : (health.score >= 80 ? '#16a34a' : '#dc2626')}
            metrics={[]} 
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1.5 text-[11px] text-gray-700">
            <div className="flex justify-between items-center">
              <span>High-risk supplier application</span>
              <span className="font-bold text-rose-700">{alerts.high_risk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Missing KYC documents</span>
              <span className="font-bold text-amber-700">{alerts.missing_kyc}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>SLA breach - verification</span>
              <span className="font-bold text-gray-600">{alerts.sla_breach}</span>
            </div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1.5 text-[11px] text-gray-700">
            <div className="flex justify-between items-center">
              <span>Pending Triage</span>
              <span className="font-bold text-blue-700">{queues.pending_triage}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>KYC Checks</span>
              <span className="font-bold text-indigo-700">{queues.kyc_checks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Legal Review Queue</span>
              <span className="font-bold text-purple-700">{queues.legal_review}</span>
            </div>
          </div>
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
