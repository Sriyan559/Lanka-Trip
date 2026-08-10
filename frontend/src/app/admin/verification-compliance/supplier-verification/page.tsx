"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, CheckCircle2, Clock, AlertTriangle, 
  FileText, Eye, AlertCircle, RefreshCw, MoreVertical, Filter
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
];

const TABS = [
  { id: 'all', label: 'All Verification Requests' },
  { id: 'pending', label: 'Pending Queue' },
  { id: 'review', label: 'Under Review' },
  { id: 'verified', label: 'Verified / Approved' },
  { id: 'rejected', label: 'Rejected' },
];

export default function SupplierVerificationManagementPage() {
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
    { index: 1, title: 'Total Verification Applications', value: dashboardData?.documents?.meta?.total || 0, icon: FileText },
    { index: 2, title: 'Pending Review', value: 0, icon: Clock, alert: false },
    { index: 3, title: 'Verified Suppliers', value: 0, icon: CheckCircle2 },
    { index: 4, title: 'Rejections / Flagged', value: 0, icon: AlertTriangle },
  ];

  const tableData = dashboardData?.documents?.data || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Supplier Verification</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Verification Management</h1>
            <p className="text-xs text-gray-500 mt-1">Review, audit, and approve supplier business credentials, KYC dossiers, and compliance verifications.</p>
          </div>
          <button onClick={fetchDashboard} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 shadow-sm">
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced="Just now" accessNote="Access limited to assigned business context" />

        <DashboardGrid>
          {kpis.map((kpi) => (
            <KpiCard key={kpi.index} {...kpi} />
          ))}
        </DashboardGrid>

        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        <FilterToolbar 
          searchPlaceholder="Search supplier or verification case..."
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={fetchDashboard}
          filters={[]}
          onClearAll={() => { setSearch(''); setActiveTab('all'); }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Verification Request Velocity (30 Days)" subtitle="Daily submitted and processed applications" loading={loading}>
            <TrendChart data={dashboardData?.trend || []} colors={['#2563eb', '#16a34a', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Verification Status Breakdown" subtitle="Distribution by decision category" loading={loading}>
            <DonutDistributionChart data={dashboardData?.donut || []} totalLabel="Applications" totalValue="0" />
          </ChartCard>
        </div>

        {/* Verification Queue Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Verification Cases Queue</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Case ID</th>
                  <th className="px-3 py-2">Supplier / Entity</th>
                  <th className="px-3 py-2">Document Type</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Expiry Date</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {tableData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-gray-400">
                      No supplier verification applications found in database.
                    </td>
                  </tr>
                ) : (
                  tableData.map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-bold text-blue-800">{row.id}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.entity}</td>
                      <td className="px-3 py-2 text-gray-600">{row.type}</td>
                      <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">{row.status}</span></td>
                      <td className="px-3 py-2 text-gray-500">{row.expiry}</td>
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
        </div>

      </div>

      <RightIntelligenceRail>
        <RailSection title="Verification Readiness">
          <HealthScoreGauge score={100} label="Healthy" statusText="Operational" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
