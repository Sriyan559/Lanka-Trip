"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, Clock, CheckCircle2, AlertTriangle, AlertCircle, 
  ShieldAlert, RefreshCw, Download, ExternalLink, Filter, Search, 
  CheckSquare, XCircle, Layers, FileCheck, FileX, Info, ShieldCheck, 
  Database, Calendar, Tag, Lock, AlertOctagon, HelpCircle, ArrowUpRight,
  Activity, Award, Package, Beaker, Shield, Eye
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { TrendChart } from '@/components/admin/shared/TrendChart';
import { DonutDistributionChart } from '@/components/admin/shared/DonutDistributionChart';
import { HorizontalStatusChart } from '@/components/admin/shared/HorizontalStatusChart';
import { ChartCard } from '@/components/admin/shared/ChartCard';
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
  { id: 'under_review', label: 'Under Review' },
  { id: 'publication_blockers', label: 'Publication Blockers' },
  { id: 'missing_evidence', label: 'Missing Evidence' },
  { id: 'restricted_ingredients', label: 'Restricted Ingredients' },
  { id: 'claims_review', label: 'Claims Review' },
  { id: 'registrations', label: 'Registrations' },
  { id: 'batches', label: 'Batches' },
  { id: 'revalidation', label: 'Revalidation' },
  { id: 'audit_trail', label: 'Audit Trail' },
];

const ICON_MAP: Record<string, any> = {
  Clock, ShieldAlert, FileText, AlertTriangle, AlertCircle, CheckCircle2, RefreshCw
};

export default function ProductSafetyPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const params: any = {
        search: debouncedSearch,
        status: activeTab,
        page,
        per_page: pageSize,
      };
      if (quickFilter === 'assignedToMe') params.assigned_to_me = true;
      if (quickFilter === 'highRisk') params.high_risk = true;
      if (quickFilter === 'publicationBlocked') params.publication_blocked = true;
      if (quickFilter === 'missingEvidence') params.missing_evidence = true;

      const res = await verificationComplianceApi.getProductSafetyDashboard(params);
      setDashboardData(res);
    } catch (err) {
      console.error("Failed to load product safety dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab, debouncedSearch, page, pageSize, quickFilter]);

  // Export Safety Report CSV
  const handleExportReport = async () => {
    try {
      const res = await verificationComplianceApi.exportProductSafetyReport();
      const blob = new Blob([res], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `product-safety-report-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    } catch (err) {
      console.error("Failed to export safety report:", err);
    }
  };

  // Action: Approve Product Safety
  const handleApproveProduct = async (id: string | number) => {
    setActionLoading(true);
    try {
      await verificationComplianceApi.approveProductSafety(id);
      await fetchDashboard();
    } catch (err) {
      console.error("Failed to approve product safety:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Block Product Publication
  const handleBlockPublication = async (id: string | number) => {
    setActionLoading(true);
    try {
      await verificationComplianceApi.blockProductPublication(id);
      await fetchDashboard();
    } catch (err) {
      console.error("Failed to block product publication:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Review Next Case
  const handleReviewNextCase = () => {
    const products = dashboardData?.products?.data || [];
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  };

  // Zero Data Normalization Layer
  const kpis = dashboardData?.kpis || Array.from({ length: 12 }, (_, i) => ({
    index: i + 1,
    title: [
      'Products Under Safety Review', 'Publication Blockers', 'Missing Safety Evidence',
      'Restricted Ingredient Findings', 'Unsupported Product Claims', 'Regulatory Registration Missing',
      'Packaging Compliance Issues', 'Laboratory Evidence Pending', 'High-Risk Products',
      'Active Safety Cases', 'Products Revalidation Due', 'Safety SLA Breaches'
    ][i],
    value: '0',
    delta: { value: '0%', trend: 'neutral' },
    icon: ['Clock', 'ShieldAlert', 'FileText', 'AlertTriangle', 'AlertCircle', 'FileText', 'AlertTriangle', 'Clock', 'ShieldAlert', 'CheckCircle2', 'RefreshCw', 'Clock'][i],
    iconBgColor: 'bg-gray-50',
    iconColor: 'text-gray-500'
  }));

  const trend = dashboardData?.trend || [];
  const donut = dashboardData?.donut || [];
  const statusSummaryData = dashboardData?.statusSummary || [];
  const healthScorecard = dashboardData?.healthScorecard || [
    { label: 'Identity Completeness', percentage: 0, status: 'neutral' },
    { label: 'Evidence Coverage', percentage: 0, status: 'neutral' },
    { label: 'Ingredient Compliance', percentage: 0, status: 'neutral' },
    { label: 'Claims Accuracy', percentage: 0, status: 'neutral' },
    { label: 'Registration Readiness', percentage: 0, status: 'neutral' },
    { label: 'Packaging Compliance', percentage: 0, status: 'neutral' },
    { label: 'Laboratory Readiness', percentage: 0, status: 'neutral' },
    { label: 'Batch Safety Control', percentage: 0, status: 'neutral' },
    { label: 'Publication Readiness', percentage: 0, status: 'neutral' },
    { label: 'Audit Readiness', percentage: 0, status: 'neutral' },
  ];

  const health = dashboardData?.health || { score: 0, state: 'Healthy', statusColor: '#16a34a' };
  const alerts = dashboardData?.priorityAlerts || [];
  const operations = dashboardData?.operations || {
    safetyEvidence: { submitted: 0, pending: 0, verified: 0, rejected: 0, readiness: 0 },
    ingredientSafety: { restricted: 0, underReview: 0, compliant: 0, awaiting: 0 },
    claimsCompliance: { unsupported: 0, approved: 0, reviewed: 0, underReview: 0 },
    registrations: { active: 0, pending: 0, expired: 0, missing: 0 },
    packaging: { warnings: 0, nonCompliant: 0, corrected: 0, compliant: 0 },
    laboratory: { verified: 0, pending: 0, failed: 0, overdue: 0 },
    batchSafety: { quarantined: 0, cleared: 0, underReview: 0, recalls: 0 },
    publicationControls: { marketplaceReady: 0, mobileReady: 0, retailReady: 0, blocked: 0 },
    safetyCases: { open: 0, escalated: 0, pending: 0, resolved: 0 },
    correctiveActions: { open: 0, overdue: 0, revalidation: 0, completed: 0 },
    sla: { onTimeRate: 0, breached: 0, avgTime: '—' },
    recentActivity: [],
  };

  const quickQueues = dashboardData?.quickQueues || {
    assignedToMe: 0, highRisk: 0, publicationBlocked: 0, missingEvidence: 0, claimsReview: 0, expiringRegistration: 0, revalidationDue: 0
  };

  const publicationSummary = dashboardData?.publicationSummary || { published: 0, conditional: 0, blocked: 0, notEligible: 0 };
  const recallBatchRisk = dashboardData?.recallBatchRisk || { quarantinedBatches: 0, recallCases: 0, flaggedProducts: 0 };
  const portfolioTable = dashboardData?.products?.data || [];
  const meta = dashboardData?.products?.meta || { current_page: 1, per_page: pageSize, total: 0, last_page: 1 };

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Product Safety &amp; Regulatory</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Product Safety &amp; Regulatory Oversight</h1>
            <p className="text-xs text-gray-500 mt-1">Enforce cosmetic safety evidence, ingredient compliance, regulatory registration, claims, packaging, laboratory validation, batch safety, and publication controls.</p>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={handleExportReport}
              className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-3 py-1.5 rounded shadow-sm transition"
            >
              <Download size={14} />
              <span>Export Safety Report</span>
            </button>

            <button 
              onClick={() => setActiveTab('publication_blockers')}
              className="flex items-center gap-1.5 text-xs bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 font-bold px-3 py-1.5 rounded shadow-sm transition"
            >
              <ShieldAlert size={14} />
              <span>Review Publication Blockers</span>
            </button>

            <button 
              onClick={handleReviewNextCase}
              className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded shadow-sm transition"
            >
              <FileCheck size={14} />
              <span>Review Next Safety Case</span>
            </button>

            <button 
              onClick={fetchDashboard} 
              className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 hover:text-gray-900 shadow-sm transition"
            >
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

        {/* Dynamic Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <ChartCard title="Product Safety &amp; Regulatory Trend (30 Days)" subtitle="Daily open safety reviews, publication blockers, and SLA breaches" loading={loading}>
            <TrendChart data={trend} colors={['#2563eb', '#dc2626', '#9333ea', '#f59e0b']} />
          </ChartCard>

          <ChartCard title="Safety Issue Distribution" subtitle="Distribution by product safety issue classification" loading={loading}>
            <DonutDistributionChart 
              data={donut} 
              totalLabel="Total Issues" 
              totalValue={donut.reduce((acc: number, d: any) => acc + (d.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        {/* Verification Status Summary & Health Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Status Breakdown */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[13px] font-bold text-gray-900">Safety Status Summary</h3>
              <p className="text-[11px] text-gray-500 mb-3">Overall product safety compliance resolution</p>
            </div>
            <HorizontalStatusChart data={statusSummaryData} total={meta.total} />
          </div>

          {/* Health Scorecard (10 Metrics Grid) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-md p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
              <div>
                <h3 className="text-[13px] font-bold text-gray-900">Product Safety Health Scorecard</h3>
                <p className="text-[11px] text-gray-500">Key safety compliance, ingredient control, and laboratory readiness metrics</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {health.score}% Overall Score
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {healthScorecard.map((item: any, idx: number) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 p-2 rounded flex flex-col justify-between">
                  <span className="text-[10px] text-gray-500 font-medium truncate mb-1">{item.label}</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                    <span className="text-[9px] text-gray-400 font-semibold">{item.percentage >= 80 ? 'Pass' : 'Review'}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-1 rounded-full transition-all duration-300" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status / Table Tabs */}
        <div className="bg-white border border-gray-200 rounded-t-md border-b-0 p-2">
          <Tabs tabs={TABS} activeTab={activeTab} onChange={(tabId) => { setActiveTab(tabId); setPage(1); }} />
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-gray-200 border-t-0 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-grow max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search products, SKU, brand, supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-500 font-semibold">Quick Filters:</span>
            {[
              { id: 'assignedToMe', label: 'Assigned to Me', count: quickQueues.assignedToMe },
              { id: 'highRisk', label: 'High Risk', count: quickQueues.highRisk },
              { id: 'publicationBlocked', label: 'Publication Blocked', count: quickQueues.publicationBlocked },
              { id: 'missingEvidence', label: 'Missing Evidence', count: quickQueues.missingEvidence },
            ].map(q => (
              <button
                key={q.id}
                onClick={() => setQuickFilter(quickFilter === q.id ? null : q.id)}
                className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
                  quickFilter === q.id 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {q.label} ({q.count})
              </button>
            ))}
            
            {quickFilter && (
              <button onClick={() => setQuickFilter(null)} className="text-[11px] text-blue-600 underline font-semibold">
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="bg-white border border-gray-200 rounded-b-md shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
              <span>Product Safety &amp; Regulatory Portfolio</span>
              <span className="px-2 py-0.5 text-[10px] bg-blue-50 text-blue-700 rounded-full font-bold border border-blue-200">
                {meta.total} records
              </span>
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              <span>Page size:</span>
              <select 
                value={pageSize} 
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-[11px]"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1600px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 w-8 text-center">
                    <input 
                      type="checkbox"
                      checked={portfolioTable.length > 0 && selectedRowIds.length === portfolioTable.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRowIds(portfolioTable.map((d: any) => d.id));
                        } else {
                          setSelectedRowIds([]);
                        }
                      }}
                      className="rounded text-blue-600"
                    />
                  </th>
                  <th className="px-3 py-2">Product Name / ID</th>
                  <th className="px-3 py-2">SKU</th>
                  <th className="px-3 py-2">Supplier</th>
                  <th className="px-3 py-2">Brand</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Safety Evidence</th>
                  <th className="px-3 py-2">Ingredients</th>
                  <th className="px-3 py-2">Claims</th>
                  <th className="px-3 py-2">Registration</th>
                  <th className="px-3 py-2">Packaging</th>
                  <th className="px-3 py-2">Lab Evidence</th>
                  <th className="px-3 py-2">Batch Safety</th>
                  <th className="px-3 py-2">Issues</th>
                  <th className="px-3 py-2">Publication Status</th>
                  <th className="px-3 py-2">Eligible Channels</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Reviewer</th>
                  <th className="px-3 py-2">Due Date</th>
                  <th className="px-3 py-2">SLA</th>
                  <th className="px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {portfolioTable.length === 0 ? (
                  <tr>
                    <td colSpan={22} className="px-3 py-12 text-center text-gray-400 bg-gray-50/50">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileX size={32} className="text-gray-300" />
                        <span className="font-semibold text-gray-600 text-xs">No product safety &amp; regulatory records found for the selected filters.</span>
                        <span className="text-[11px] text-gray-400">Try adjusting your search query, status tabs, or clear quick filters.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  portfolioTable.map((row: any) => {
                    const isChecked = selectedRowIds.includes(row.id);
                    return (
                      <tr key={row.id} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-2 text-center">
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRowIds([...selectedRowIds, row.id]);
                              } else {
                                setSelectedRowIds(selectedRowIds.filter(id => id !== row.id));
                              }
                            }}
                            className="rounded text-blue-600"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <div className="text-gray-900 font-bold">{row.product}</div>
                          <div className="text-gray-400 text-[10px]">{row.id}</div>
                        </td>
                        <td className="px-3 py-2 text-gray-600 font-mono text-[10px]">{row.sku}</td>
                        <td className="px-3 py-2 text-gray-900 font-semibold">{row.supplier}</td>
                        <td className="px-3 py-2 text-gray-600">{row.brand}</td>
                        <td className="px-3 py-2 text-gray-600">{row.category}</td>
                        <td className="px-3 py-2 text-gray-600">{row.productType}</td>
                        <td className="px-3 py-2 text-emerald-600 font-semibold">{row.safetyEvidence}</td>
                        <td className="px-3 py-2 text-emerald-600 font-semibold">{row.ingredientCompliance}</td>
                        <td className="px-3 py-2 text-gray-600">{row.claimsCompliance}</td>
                        <td className="px-3 py-2 text-gray-600">{row.registrationStatus}</td>
                        <td className="px-3 py-2 text-gray-600">{row.packagingStatus}</td>
                        <td className="px-3 py-2 text-gray-600">{row.labEvidence}</td>
                        <td className="px-3 py-2 text-gray-600">{row.batchSafety}</td>
                        <td className="px-3 py-2 text-center font-bold text-gray-900">{row.issueCount}</td>
                        <td className="px-3 py-2 font-semibold">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                            row.publicationStatus === 'Published' ? 'text-green-700 bg-green-50 border border-green-200' : 'text-red-700 bg-red-50 border border-red-200'
                          }`}>
                            {row.publicationStatus}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-500">{row.eligibleChannels}</td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            row.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {row.riskLevel}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-600">{row.safetyReviewer}</td>
                        <td className="px-3 py-2 text-gray-500">{row.dueDate}</td>
                        <td className="px-3 py-2 text-emerald-600 font-semibold">{row.slaStatus}</td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleApproveProduct(row.rawId)}
                              disabled={actionLoading}
                              className="text-emerald-600 hover:text-emerald-800 font-bold text-[11px]"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleBlockPublication(row.rawId)}
                              disabled={actionLoading}
                              className="text-red-600 hover:text-red-800 font-bold text-[11px]"
                            >
                              Block
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-3 flex items-center justify-between border-t border-gray-200 text-[11px] text-gray-500 bg-gray-50 rounded-b-md">
            <div>Showing page {meta.current_page} of {meta.last_page} ({meta.total} total records)</div>
            <div className="flex items-center gap-1">
              <button 
                disabled={meta.current_page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-40 font-bold"
              >
                &lt;
              </button>
              <span className="px-2.5 font-semibold text-gray-700">{meta.current_page}</span>
              <button 
                disabled={meta.current_page >= meta.last_page}
                onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
                className="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-40 font-bold"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: 12 OPERATIONAL SUMMARY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          
          {/* 1. Safety Evidence */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><FileText size={14} className="text-blue-600" /> Product Safety Evidence Operations</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Submitted:</span> <strong className="text-gray-900 block">{operations.safetyEvidence.submitted}</strong></div>
              <div><span className="text-gray-500">Pending Review:</span> <strong className="text-amber-600 block">{operations.safetyEvidence.pending}</strong></div>
              <div><span className="text-gray-500">Verified:</span> <strong className="text-emerald-600 block">{operations.safetyEvidence.verified}</strong></div>
              <div><span className="text-gray-500">Readiness:</span> <strong className="text-blue-600 block">{operations.safetyEvidence.readiness}%</strong></div>
            </div>
          </div>

          {/* 2. Ingredient Safety */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Beaker size={14} className="text-rose-600" /> Ingredient Safety &amp; Restriction</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Restricted:</span> <strong className="text-rose-600 block">{operations.ingredientSafety.restricted}</strong></div>
              <div><span className="text-gray-500">Under Review:</span> <strong className="text-amber-600 block">{operations.ingredientSafety.underReview}</strong></div>
              <div><span className="text-gray-500">Compliant:</span> <strong className="text-emerald-600 block">{operations.ingredientSafety.compliant}</strong></div>
              <div><span className="text-gray-500">Awaiting:</span> <strong className="text-gray-900 block">{operations.ingredientSafety.awaiting}</strong></div>
            </div>
          </div>

          {/* 3. Claims Compliance */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Award size={14} className="text-purple-600" /> Product Claims Compliance</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Unsupported:</span> <strong className="text-orange-600 block">{operations.claimsCompliance.unsupported}</strong></div>
              <div><span className="text-gray-500">Approved:</span> <strong className="text-emerald-600 block">{operations.claimsCompliance.approved}</strong></div>
              <div><span className="text-gray-500">Reviewed:</span> <strong className="text-gray-900 block">{operations.claimsCompliance.reviewed}</strong></div>
              <div><span className="text-gray-500">Under Review:</span> <strong className="text-amber-600 block">{operations.claimsCompliance.underReview}</strong></div>
            </div>
          </div>

          {/* 4. Regulatory Registration */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><FileCheck size={14} className="text-indigo-600" /> Product Regulatory Registration</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Active:</span> <strong className="text-emerald-600 block">{operations.registrations.active}</strong></div>
              <div><span className="text-gray-500">Pending:</span> <strong className="text-amber-600 block">{operations.registrations.pending}</strong></div>
              <div><span className="text-gray-500">Expired:</span> <strong className="text-red-600 block">{operations.registrations.expired}</strong></div>
              <div><span className="text-gray-500">Missing:</span> <strong className="text-purple-600 block">{operations.registrations.missing}</strong></div>
            </div>
          </div>

          {/* 5. Packaging & Labeling */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Package size={14} className="text-yellow-600" /> Packaging &amp; Labeling Compliance</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Warnings:</span> <strong className="text-yellow-600 block">{operations.packaging.warnings}</strong></div>
              <div><span className="text-gray-500">Non-Compliant:</span> <strong className="text-red-600 block">{operations.packaging.nonCompliant}</strong></div>
              <div><span className="text-gray-500">Corrected:</span> <strong className="text-gray-900 block">{operations.packaging.corrected}</strong></div>
              <div><span className="text-gray-500">Compliant:</span> <strong className="text-emerald-600 block">{operations.packaging.compliant}</strong></div>
            </div>
          </div>

          {/* 6. Laboratory Validation */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Activity size={14} className="text-sky-600" /> Laboratory Evidence &amp; Validation</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Verified Reports:</span> <strong className="text-emerald-600 block">{operations.laboratory.verified}</strong></div>
              <div><span className="text-gray-500">Pending Tests:</span> <strong className="text-sky-600 block">{operations.laboratory.pending}</strong></div>
              <div><span className="text-gray-500">Failed:</span> <strong className="text-red-600 block">{operations.laboratory.failed}</strong></div>
              <div><span className="text-gray-500">Overdue:</span> <strong className="text-amber-600 block">{operations.laboratory.overdue}</strong></div>
            </div>
          </div>

          {/* 7. Batch Safety */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Shield size={14} className="text-blue-600" /> Batch Safety Oversight</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Quarantined:</span> <strong className="text-red-600 block">{operations.batchSafety.quarantined}</strong></div>
              <div><span className="text-gray-500">Cleared:</span> <strong className="text-emerald-600 block">{operations.batchSafety.cleared}</strong></div>
              <div><span className="text-gray-500">Under Review:</span> <strong className="text-amber-600 block">{operations.batchSafety.underReview}</strong></div>
              <div><span className="text-gray-500">Recalls:</span> <strong className="text-purple-600 block">{operations.batchSafety.recalls}</strong></div>
            </div>
          </div>

          {/* 8. Publication & Channel Controls */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Eye size={14} className="text-emerald-600" /> Publication &amp; Channel Safety</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Marketplace Ready:</span> <strong className="text-emerald-600 block">{operations.publicationControls.marketplaceReady}</strong></div>
              <div><span className="text-gray-500">Mobile Ready:</span> <strong className="text-emerald-600 block">{operations.publicationControls.mobileReady}</strong></div>
              <div><span className="text-gray-500">Retail Ready:</span> <strong className="text-emerald-600 block">{operations.publicationControls.retailReady}</strong></div>
              <div><span className="text-gray-500">Blocked:</span> <strong className="text-red-600 block">{operations.publicationControls.blocked}</strong></div>
            </div>
          </div>

          {/* 9. Safety Cases */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><ShieldAlert size={14} className="text-red-600" /> Product Safety Case Operations</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Open Cases:</span> <strong className="text-red-600 block">{operations.safetyCases.open}</strong></div>
              <div><span className="text-gray-500">Escalated:</span> <strong className="text-orange-600 block">{operations.safetyCases.escalated}</strong></div>
              <div><span className="text-gray-500">Pending:</span> <strong className="text-amber-600 block">{operations.safetyCases.pending}</strong></div>
              <div><span className="text-gray-500">Resolved:</span> <strong className="text-emerald-600 block">{operations.safetyCases.resolved}</strong></div>
            </div>
          </div>

          {/* 10. Corrective Actions & Revalidation */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><RefreshCw size={14} className="text-indigo-600" /> Corrective Actions &amp; Revalidation</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">Open Actions:</span> <strong className="text-amber-600 block">{operations.correctiveActions.open}</strong></div>
              <div><span className="text-gray-500">Overdue:</span> <strong className="text-red-600 block">{operations.correctiveActions.overdue}</strong></div>
              <div><span className="text-gray-500">Revalidation:</span> <strong className="text-indigo-600 block">{operations.correctiveActions.revalidation}</strong></div>
              <div><span className="text-gray-500">Completed:</span> <strong className="text-emerald-600 block">{operations.correctiveActions.completed}</strong></div>
            </div>
          </div>

          {/* 11. Safety SLA */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Clock size={14} className="text-blue-600" /> Product Safety &amp; Regulatory SLA</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><span className="text-gray-500">On-Time Rate:</span> <strong className="text-emerald-600 block">{operations.sla.onTimeRate}%</strong></div>
              <div><span className="text-gray-500">Breached Items:</span> <strong className="text-red-600 block">{operations.sla.breached}</strong></div>
              <div className="col-span-2"><span className="text-gray-500">Avg Review Time:</span> <strong className="text-gray-900 block">{operations.sla.avgTime}</strong></div>
            </div>
          </div>

          {/* 12. Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-md p-3.5 shadow-sm text-xs space-y-2">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5"><Activity size={14} className="text-emerald-600" /> Recent Product Safety Activity</h4>
            <div className="space-y-1.5 text-[11px]">
              {operations.recentActivity.length === 0 ? (
                <span className="text-gray-400 italic block">No recent product safety activity.</span>
              ) : (
                operations.recentActivity.slice(0, 3).map((act: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-gray-800 truncate">{act.action}</span>
                    <span className="text-gray-400">{act.dateTime}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT OPERATIONAL RAIL */}
      <RightIntelligenceRail>
        {/* Safety Intelligence Health */}
        <RailSection title="Product Safety Intelligence Health">
          <HealthScoreGauge 
            score={health.score} 
            label={health.state} 
            statusText={health.state} 
            statusColor={health.statusColor} 
            metrics={[
              { label: 'Safety Coverage', value: `${health.score}%`, progress: health.score },
              { label: 'Ingredient Compliance', value: `${Math.max(0, 100 - (operations.ingredientSafety.restricted * 10))}%`, progress: Math.max(0, 100 - (operations.ingredientSafety.restricted * 10)) },
            ]} 
          />
        </RailSection>

        {/* Priority Alerts */}
        <RailSection title="Priority Alerts">
          <div className="flex flex-col gap-1.5">
            {alerts.map((alert: any) => (
              <div key={alert.id} className="p-2 bg-white border border-gray-200 rounded flex justify-between items-center text-[11px] shadow-sm">
                <div className="truncate pr-2">
                  <span className="font-semibold text-gray-800 block truncate">{alert.title}</span>
                  <span className="text-[10px] text-gray-400">{alert.severity} Severity</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${alert.count > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                  {alert.count}
                </span>
              </div>
            ))}
          </div>
        </RailSection>

        {/* Safety Status Summary */}
        <RailSection title="Safety Status Summary">
          <div className="bg-white border border-gray-200 rounded p-2.5 text-[11px] space-y-2 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">On Track</span>
              <span className="font-bold text-emerald-600">{statusSummaryData.find((s: any) => s.label === 'On Track')?.count || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Under Review</span>
              <span className="font-bold text-amber-600">{statusSummaryData.find((s: any) => s.label === 'Under Review')?.count || 0}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-1">
              <span className="text-gray-600 font-semibold">Blocked Products</span>
              <span className="font-bold text-red-600">{statusSummaryData.find((s: any) => s.label === 'Blocked')?.count || 0}</span>
            </div>
          </div>
        </RailSection>

        {/* Publication Summary */}
        <RailSection title="Publication Summary">
          <div className="bg-white border border-gray-200 rounded p-2.5 text-[11px] space-y-2 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Published</span>
              <span className="font-bold text-emerald-600">{publicationSummary.published}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-1">
              <span className="text-gray-600 font-semibold">Blocked from Publication</span>
              <span className="font-bold text-red-600">{publicationSummary.blocked}</span>
            </div>
          </div>
        </RailSection>

        {/* Recall & Batch Risk */}
        <RailSection title="Recall &amp; Batch Risk Summary">
          <div className="bg-white border border-gray-200 rounded p-2.5 text-[11px] space-y-2 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Quarantined Batches</span>
              <span className="font-bold text-red-600">{recallBatchRisk.quarantinedBatches}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recall Cases</span>
              <span className="font-bold text-purple-600">{recallBatchRisk.recallCases}</span>
            </div>
          </div>
        </RailSection>

        {/* Quick Queues */}
        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            {[
              { id: 'assignedToMe', label: 'Assigned to Me', count: quickQueues.assignedToMe },
              { id: 'highRisk', label: 'High Risk', count: quickQueues.highRisk },
              { id: 'publicationBlocked', label: 'Publication Blocked', count: quickQueues.publicationBlocked },
              { id: 'missingEvidence', label: 'Missing Evidence', count: quickQueues.missingEvidence },
            ].map(q => (
              <button
                key={q.id}
                onClick={() => setQuickFilter(quickFilter === q.id ? null : q.id)}
                className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 text-gray-700 shadow-sm"
              >
                <span>{q.label}</span>
                <span className="font-bold text-blue-600">{q.count}</span>
              </button>
            ))}
          </div>
        </RailSection>

        {/* Final Safety Actions Panel */}
        <RailSection title="Final Safety Actions">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleReviewNextCase}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <FileCheck size={14} />
              <span>Review Next Safety Case</span>
            </button>

            <button
              onClick={() => setActiveTab('under_review')}
              className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <Layers size={14} />
              <span>Open Safety Queue</span>
            </button>

            <button
              onClick={handleExportReport}
              className="w-full py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold rounded text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <Download size={14} />
              <span>Export Safety Report</span>
            </button>
          </div>
        </RailSection>

      </RightIntelligenceRail>

    </div>
  );
}
