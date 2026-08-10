"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Clock, ShieldAlert, AlertTriangle, RefreshCw, FileText, CheckCircle2, AlertCircle,
  Download, ArrowUpRight, Award, Layers, FileSpreadsheet, Eye, Filter
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';
import { verificationComplianceApi } from '@/lib/api/verificationCompliance';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'documents', label: 'Documents' },
  { id: 'safety', label: 'Product Safety' },
  { id: 'authenticity', label: 'Authenticity' },
  { id: 'recalls', label: 'Recalls' },
  { id: 'governance', label: 'Governance' },
];

const ICON_MAP: Record<string, any> = {
  FileText, Clock, CheckCircle2, AlertTriangle, AlertCircle, ShieldAlert, RefreshCw, ShieldCheck
};

export default function VerificationComplianceCommandCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await verificationComplianceApi.getDocumentsDashboard({ status: activeTab });
      setDashboardData(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab]);

  const kpis = dashboardData?.kpis || [];
  const trendData = dashboardData?.trend || [];
  const donutData = dashboardData?.donut || [];
  const statusSummaryData = dashboardData?.statusSummary || [];
  const documentsTable = dashboardData?.documents?.data || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        {/* Header & Primary Toolbar Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Command Center</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Verification &amp; Compliance Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Central command for document verifications, regulatory safety oversight, counterfeit investigations, and product recalls.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-semibold">
              <Download size={13} />
              <span>Export Audit</span>
            </button>

            <Link href="/admin/verification-compliance/documents" className="flex items-center gap-1.5 text-xs bg-blue-700 text-white px-3 py-1.5 rounded hover:bg-blue-800 shadow-sm font-bold">
              <Eye size={14} />
              <span>Review Next Document</span>
            </Link>

            <button 
              onClick={fetchDashboard} 
              className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 hover:text-gray-900 shadow-sm"
              title="Sync Live Data"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              <span>Sync Live Data</span>
            </button>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={dashboardData?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        {/* ERROR BANNER */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-xs flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchDashboard} className="font-bold underline">Retry</button>
          </div>
        )}

        {/* KPI Grid */}
        <DashboardGrid>
          {kpis.map((kpi: any) => {
            const IconComponent = ICON_MAP[kpi.icon] || FileText;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* Tabs */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        {/* FULL ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            title="Document Verification Velocity (30 Days)"
            subtitle="Historical verification and processing activity"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            className="lg:col-span-2 min-h-[280px]"
          >
            <TrendChart data={trendData} colors={['#2563eb', '#16a34a', '#d97706', '#dc2626']} />
          </ChartCard>

          <ChartCard
            title="Document Status Distribution"
            subtitle="Verification status breakdown"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            className="min-h-[280px]"
          >
            <DonutDistributionChart 
              data={donutData} 
              totalLabel="Total Documents" 
              totalValue={donutData.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            title="Document Verification Queue Status"
            subtitle="Verification pipeline by category"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            className="lg:col-span-2"
          >
            <HorizontalStatusChart 
              data={statusSummaryData} 
              total={statusSummaryData.reduce((acc: number, curr: any) => acc + (curr.count || 0), 0)} 
            />
          </ChartCard>

          <ChartCard
            title="Document Expiry &amp; Risk Profile"
            subtitle="Regulatory expiration monitoring"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          >
            <DonutDistributionChart 
              data={[
                { name: 'Valid', value: 0, color: '#16a34a' },
                { name: 'Expiring in 30 Days', value: 0, color: '#f59e0b' },
                { name: 'Expired', value: 0, color: '#dc2626' }
              ]} 
              totalLabel="Risk Items" 
              totalValue="0" 
            />
          </ChartCard>
        </div>

        {/* OPERATIONAL SUMMARY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Product Safety Oversight */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900">Product Safety &amp; Regulatory</h3>
              <ShieldCheck size={14} className="text-gray-400" />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>Dossier Registrations:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>NMRA Approvals:</span> <span className="font-bold text-green-700">0</span></div>
              <div className="flex justify-between"><span>Pending Testing:</span> <span className="font-bold text-amber-700">0</span></div>
              <div className="flex justify-between"><span>Banned Substance Flags:</span> <span className="font-bold text-rose-700">0</span></div>
            </div>
            <Link href="/admin/verification-compliance/product-safety" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1">
              <span>View Product Safety</span> <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Card 2: Authenticity Investigations */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900">Authenticity Investigations</h3>
              <ShieldAlert size={14} className="text-gray-400" />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>Active Infringement Cases:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Grey Market Audits:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Counterfeit Reports:</span> <span className="font-bold text-rose-700">0</span></div>
              <div className="flex justify-between"><span>High Risk Flags:</span> <span className="font-bold text-amber-700">0</span></div>
            </div>
            <Link href="/admin/verification-compliance/authenticity" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1">
              <span>View Investigations</span> <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Card 3: Recalls & Safety Incidents */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900">Recalls &amp; Safety Incidents</h3>
              <AlertTriangle size={14} className="text-gray-400" />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>Active Recalls:</span> <span className="font-bold text-rose-700">0</span></div>
              <div className="flex justify-between"><span>Quarantined Units:</span> <span className="font-bold text-amber-700">0</span></div>
              <div className="flex justify-between"><span>Class I Recalls:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Regulatory Notices Sent:</span> <span className="font-bold text-green-700">0</span></div>
            </div>
            <Link href="/admin/verification-compliance/recalls" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1">
              <span>View Recalls Command</span> <ArrowUpRight size={12} />
            </Link>
          </div>

        </div>

        {/* Recent Verification Queue Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Recent Verification &amp; Compliance Document Queue</h3>
            <span className="text-[11px] text-gray-500">Live Database Stream</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Document ID</th>
                  <th className="px-3 py-2">Document Type</th>
                  <th className="px-3 py-2">Entity Name</th>
                  <th className="px-3 py-2">Issuer</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Expiry Date</th>
                  <th className="px-3 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {documentsTable.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-gray-400">
                      No document records found in database.
                    </td>
                  </tr>
                ) : (
                  documentsTable.slice(0, 5).map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-bold text-blue-800">{row.id}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.type}</td>
                      <td className="px-3 py-2 text-gray-600">{row.entity}</td>
                      <td className="px-3 py-2 text-gray-600">{row.issuer}</td>
                      <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">{row.status}</span></td>
                      <td className="px-3 py-2 text-gray-500">{row.expiry}</td>
                      <td className="px-3 py-2 text-gray-500">{row.updated}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Compliance Health">
          <HealthScoreGauge score={100} label="Healthy" statusText="Verified" statusColor="#16a34a" metrics={[]} />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded border border-gray-100 text-center">
            No active priority compliance alerts
          </div>
        </RailSection>

        <RailSection title="Quick Verification Queues">
          <div className="space-y-1 text-xs">
            <Link href="/admin/verification-compliance/documents" className="flex justify-between p-1.5 hover:bg-gray-50 rounded text-gray-700 font-medium">
              <span>Pending Documents</span>
              <span className="font-bold text-gray-900">0</span>
            </Link>
            <Link href="/admin/verification-compliance/recalls" className="flex justify-between p-1.5 hover:bg-gray-50 rounded text-gray-700 font-medium">
              <span>Safety Incidents</span>
              <span className="font-bold text-gray-900">0</span>
            </Link>
            <Link href="/admin/verification-compliance/authenticity" className="flex justify-between p-1.5 hover:bg-gray-50 rounded text-gray-700 font-medium">
              <span>Authenticity Audits</span>
              <span className="font-bold text-gray-900">0</span>
            </Link>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
