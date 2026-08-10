"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertTriangle, 
  PauseCircle, Award, Clock, AlertCircle, FileText, ShieldAlert, RefreshCw,
  Download, Plus, CheckCircle2, ChevronRight, Layers, FileSpreadsheet, ArrowUpRight
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { ChartCard } from '@/components/admin/shared/ChartCard';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

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
  { id: 'suppliers', label: 'Suppliers' },
  { id: 'contracts', label: 'Contracts' },
  { id: 'catalogue', label: 'Catalogue Coverage' },
  { id: 'performance', label: 'Performance' },
  { id: 'risk', label: 'Risk & Compliance' },
  { id: 'users', label: 'Users & Access' },
];

const ICON_MAP: Record<string, any> = {
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertCircle, AlertTriangle, PauseCircle, FileText, Clock, Award, ShieldAlert
};

export default function BrandsSuppliersCommandCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await brandsSuppliersApi.getSuppliersDashboard({ status: activeTab });
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
  const health = dashboardData?.health || { score: null, status: 'Not Assessed' };
  const trendData = dashboardData?.trend || [];
  const compositionData = dashboardData?.composition || [];
  const statusSummaryData = dashboardData?.statusSummary || [];
  const suppliersTable = dashboardData?.suppliers?.data || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        {/* Header & Primary Toolbar Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Command Center</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Brands &amp; Suppliers Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Overview of supplier network operations, verification readiness, contracts, catalogue coverage, and risk management.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-semibold">
              <Download size={13} />
              <span>Export Operations Report</span>
            </button>

            <Link href="/admin/brands-suppliers/verification" className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-semibold">
              <ShieldCheck size={13} />
              <span>Review Pending Applications</span>
            </Link>

            <Link href="/admin/brands-suppliers/suppliers/create" className="flex items-center gap-1.5 text-xs bg-rose-800 text-white px-3 py-1.5 rounded hover:bg-rose-900 shadow-sm font-bold">
              <Plus size={14} />
              <span>Add Supplier</span>
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
            const IconComponent = ICON_MAP[kpi.icon] || Users;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* Tabs */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        {/* FULL ANALYTICS CHART GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            title="Supplier Growth & Application Trajectory"
            subtitle="30-day supplier onboarding and verification trend"
            actions={
              <select className="text-[11px] bg-canvas border border-line rounded px-2 py-1 text-muted font-medium focus:outline-none">
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="12m">Last 12 Months</option>
              </select>
            }
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            className="lg:col-span-2 min-h-[280px]"
          >
            <TrendChart data={trendData} colors={['#0284c7', '#16a34a', '#d97706', '#dc2626']} />
          </ChartCard>

          <ChartCard
            title="Supplier Status Distribution"
            subtitle="Operational breakdown by status"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
            className="min-h-[280px]"
          >
            <DonutDistributionChart 
              data={compositionData} 
              totalLabel="Suppliers" 
              totalValue={compositionData.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            title="Supplier Status Breakdown & Verification Queue"
            subtitle="Categorical operational distribution"
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
            title="Supplier Risk Profile Distribution"
            subtitle="Compliance and risk level assessment"
            loading={loading}
            error={error}
            onRetry={fetchDashboard}
          >
            <DonutDistributionChart 
              data={[
                { name: 'Low Risk', value: 0, color: '#16a34a' },
                { name: 'Medium Risk', value: 0, color: '#f59e0b' },
                { name: 'High Risk', value: 0, color: '#dc2626' }
              ]} 
              totalLabel="Risk Profiles" 
              totalValue="0" 
            />
          </ChartCard>
        </div>

        {/* OPERATIONAL SUMMARY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Supplier Master Overview */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900">Supplier Master Overview</h3>
              <Users size={14} className="text-gray-400" />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>Total Registered:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Active Verified:</span> <span className="font-bold text-green-700">0</span></div>
              <div className="flex justify-between"><span>Active Countries:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Avg Onboarding Time:</span> <span className="font-bold text-gray-900">N/A</span></div>
            </div>
            <Link href="/admin/brands-suppliers/suppliers" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1">
              <span>Manage Suppliers</span> <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Card 2: Brand & Supplier Relationship Matrix */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900">Relationship Matrix</h3>
              <Award size={14} className="text-gray-400" />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>Total Brands:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Authorized Resellers:</span> <span className="font-bold text-green-700">0</span></div>
              <div className="flex justify-between"><span>Exclusive Rights:</span> <span className="font-bold text-blue-700">0</span></div>
              <div className="flex justify-between"><span>Pending Legal Audit:</span> <span className="font-bold text-amber-700">0</span></div>
            </div>
            <Link href="/admin/brands-suppliers/authorizations" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1">
              <span>View Authorizations</span> <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Card 3: Supplier Product & Catalogue Coverage */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900">Catalogue Coverage</h3>
              <Layers size={14} className="text-gray-400" />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>Total SKUs Supplied:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Categories Covered:</span> <span className="font-bold text-gray-900">0</span></div>
              <div className="flex justify-between"><span>Coverage Gap SKUs:</span> <span className="font-bold text-rose-700">0</span></div>
              <div className="flex justify-between"><span>Readiness Score:</span> <span className="font-bold text-gray-900">0%</span></div>
            </div>
            <Link href="/admin/brands-suppliers/catalogue-coverage" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1">
              <span>Catalogue Analytics</span> <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Card 4: Supplier Contracts & Agreements */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-gray-900">Contracts &amp; Agreements</h3>
              <FileSpreadsheet size={14} className="text-gray-400" />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between"><span>Active Contracts:</span> <span className="font-bold text-green-700">0</span></div>
              <div className="flex justify-between"><span>Renewals Due (30D):</span> <span className="font-bold text-amber-700">0</span></div>
              <div className="flex justify-between"><span>Expired Contracts:</span> <span className="font-bold text-rose-700">0</span></div>
              <div className="flex justify-between"><span>Avg Tenure:</span> <span className="font-bold text-gray-900">N/A</span></div>
            </div>
            <Link href="/admin/brands-suppliers/contracts" className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1">
              <span>View Contracts</span> <ArrowUpRight size={12} />
            </Link>
          </div>

        </div>

        {/* Recent Supplier Activity Table */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900">Recent Supplier Network Activity</h3>
            <span className="text-[11px] text-gray-500">Live Database Stream</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1000px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Supplier ID</th>
                  <th className="px-3 py-2">Company Name</th>
                  <th className="px-3 py-2">Business Type</th>
                  <th className="px-3 py-2">Country</th>
                  <th className="px-3 py-2">Verification Status</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {suppliersTable.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-gray-400">
                      No supplier records found in database.
                    </td>
                  </tr>
                ) : (
                  suppliersTable.slice(0, 5).map((row: any) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-bold text-rose-800">{row.id}</td>
                      <td className="px-3 py-2 font-bold text-gray-900">{row.name}</td>
                      <td className="px-3 py-2 text-gray-600">{row.type}</td>
                      <td className="px-3 py-2 text-gray-600">{row.country}</td>
                      <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">{row.verification}</span></td>
                      <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-green-700">{row.status}</span></td>
                      <td className="px-3 py-2 text-gray-500">{row.updated}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ENHANCED RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Brands &amp; Suppliers Health">
          <HealthScoreGauge 
            score={health.score ?? 0} 
            label={health.status} 
            statusText={health.score === null ? 'Not Assessed' : (health.score >= 80 ? 'Healthy' : 'At Risk')}
            statusColor={health.score === null ? '#6b7280' : (health.score >= 80 ? '#16a34a' : '#dc2626')}
            metrics={[]} 
          />
        </RailSection>

        <RailSection title="Priority Alerts">
          <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded border border-gray-100 text-center">
            No active priority alerts
          </div>
        </RailSection>

        <RailSection title="Verification Status Summary">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-600"><span>Verified</span> <span className="font-bold text-green-700">0 (0%)</span></div>
            <div className="flex justify-between text-gray-600"><span>Pending Review</span> <span className="font-bold text-amber-700">0 (0%)</span></div>
            <div className="flex justify-between text-gray-600"><span>Under Review</span> <span className="font-bold text-blue-700">0 (0%)</span></div>
            <div className="flex justify-between text-gray-600"><span>Rejected</span> <span className="font-bold text-rose-700">0 (0%)</span></div>
          </div>
        </RailSection>

        <RailSection title="Quick Queues">
          <div className="space-y-1 text-xs">
            <Link href="/admin/brands-suppliers/verification" className="flex justify-between p-1.5 hover:bg-gray-50 rounded text-gray-700 font-medium">
              <span>Pending Verification</span>
              <span className="font-bold text-gray-900">0</span>
            </Link>
            <Link href="/admin/brands-suppliers/authorizations" className="flex justify-between p-1.5 hover:bg-gray-50 rounded text-gray-700 font-medium">
              <span>Expiring Authorizations</span>
              <span className="font-bold text-gray-900">0</span>
            </Link>
            <Link href="/admin/brands-suppliers/contracts" className="flex justify-between p-1.5 hover:bg-gray-50 rounded text-gray-700 font-medium">
              <span>Contract Renewals</span>
              <span className="font-bold text-gray-900">0</span>
            </Link>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
