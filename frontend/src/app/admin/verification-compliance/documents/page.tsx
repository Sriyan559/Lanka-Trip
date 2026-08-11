"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { 
  FileText, Clock, Eye, CheckCircle2, AlertTriangle, AlertCircle, 
  ShieldAlert, RefreshCw, MoreVertical, Download, ExternalLink, 
  ChevronRight, Filter, Search, CheckSquare, XCircle, ArrowUpRight, 
  Layers, FileCheck, FileX, Info, UserCheck, ShieldCheck, Database,
  Calendar, Building2, Tag, Lock, AlertOctagon, HelpCircle
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
  { id: 'all', label: 'All Documents' },
  { id: 'pending', label: 'Pending Verification' },
  { id: 'review', label: 'Under Review' },
  { id: 'verified', label: 'Verified' },
  { id: 'conditional', label: 'Conditional' },
  { id: 'expiring', label: 'Expiring Soon' },
  { id: 'expired', label: 'Expired' },
  { id: 'missing', label: 'Missing Mandatory' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'integrity_alerts', label: 'Integrity Alerts' },
  { id: 'replacement_requested', label: 'Replacement Requested' },
  { id: 'revalidation', label: 'Revalidation' },
  { id: 'audit_history', label: 'Audit History' },
];

const ICON_MAP: Record<string, any> = {
  FileText, Clock, Eye, CheckCircle2, AlertTriangle, AlertCircle, ShieldAlert, RefreshCw
};

export default function DocumentVerificationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedDocDetail, setSelectedDocDetail] = useState<any>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [detailTab, setDetailTab] = useState('preview');
  const [moreActionsOpen, setMoreActionsOpen] = useState(false);
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
      if (quickFilter === 'slaBreached') params.sla_breached = true;
      if (quickFilter === 'revalidationDue') params.expiring_soon = true;
      if (quickFilter === 'replacementDue') params.replacement_due = true;

      const res = await verificationComplianceApi.getDocumentsDashboard(params);
      setDashboardData(res);

      // Auto select first document if none selected
      if (res?.documents?.data?.length > 0 && !selectedDocId) {
        setSelectedDocId(res.documents.data[0].id);
      }
    } catch (err) {
      console.error("Failed to load document verification dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [activeTab, debouncedSearch, page, pageSize, quickFilter]);

  // Fetch detail for selected document
  useEffect(() => {
    if (!selectedDocId) {
      setSelectedDocDetail(null);
      return;
    }
    const fetchDetail = async () => {
      try {
        const res = await verificationComplianceApi.getDocumentDetail(selectedDocId);
        setSelectedDocDetail(res?.data || null);
      } catch (err) {
        console.error("Failed to fetch document detail:", err);
      }
    };
    fetchDetail();
  }, [selectedDocId]);

  // Handle document action execution
  const handleExecuteAction = async (actionType: string) => {
    if (!selectedDocId) return;
    setActionLoading(true);
    try {
      if (actionType === 'verify') {
        await verificationComplianceApi.verifyDocument(selectedDocId);
      } else if (actionType === 'conditional') {
        await verificationComplianceApi.verifyDocumentWithConditions(selectedDocId, { notes: 'Verified conditionally by admin' });
      } else if (actionType === 'replacement') {
        await verificationComplianceApi.requestDocumentReplacement(selectedDocId, { reason: 'Illegible upload' });
      } else if (actionType === 'evidence') {
        await verificationComplianceApi.requestDocumentEvidence(selectedDocId, { evidence_type: 'Additional Seal' });
      } else if (actionType === 'reject') {
        await verificationComplianceApi.rejectDocument(selectedDocId, { reason: 'Expired documentation' });
      } else if (actionType === 'revalidate') {
        await verificationComplianceApi.revalidateDocument(selectedDocId);
      }
      await fetchDashboard();
    } catch (err) {
      console.error(`Action ${actionType} failed:`, err);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Batch Approve
  const handleBatchApprove = async () => {
    if (selectedRowIds.length === 0) return;
    setActionLoading(true);
    try {
      await verificationComplianceApi.approveBatchDocuments(selectedRowIds);
      setSelectedRowIds([]);
      await fetchDashboard();
    } catch (err) {
      console.error("Batch approve failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Export Audit
  const handleExportAudit = async () => {
    try {
      const res = await verificationComplianceApi.exportDocumentAudit();
      const blob = new Blob([res], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-verification-audit-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    } catch (err) {
      console.error("Export audit failed:", err);
    }
  };

  // Select next pending document
  const handleReviewNext = () => {
    const documents = dashboardData?.documents?.data || [];
    const nextPending = documents.find((d: any) => d.rawStatus === 'pending' || d.status === 'Pending');
    if (nextPending) {
      setSelectedDocId(nextPending.id);
    } else if (documents.length > 0) {
      setSelectedDocId(documents[0].id);
    }
  };

  // Normalization layer for Zero Data State
  const kpis = dashboardData?.kpis || Array.from({ length: 12 }, (_, i) => ({
    index: i + 1,
    title: [
      'Total Documents', 'Pending Verification', 'Under Review', 'Verified Documents',
      'Conditional Verification', 'Rejected Documents', 'Expiring in 30 Days', 'Expired Documents',
      'Missing Mandatory Docs', 'Integrity Alerts', 'Replacement Requested', 'Verification SLA Breaches'
    ][i],
    value: '0',
    delta: { value: '0%', trend: 'neutral' },
    icon: ['FileText', 'Clock', 'Eye', 'CheckCircle2', 'AlertTriangle', 'AlertCircle', 'Clock', 'ShieldAlert', 'FileText', 'AlertTriangle', 'RefreshCw', 'Clock'][i],
    iconBgColor: 'bg-gray-50',
    iconColor: 'text-gray-500'
  }));

  const trend = dashboardData?.trend || [];
  const donut = dashboardData?.donut || [];
  const statusSummaryData = dashboardData?.statusSummary || [];
  const healthScorecard = dashboardData?.healthScorecard || [
    { label: 'Identity Completeness', percentage: 0, status: 'neutral' },
    { label: 'Issuer Validation', percentage: 0, status: 'neutral' },
    { label: 'Authenticity Control', percentage: 0, status: 'neutral' },
    { label: 'Integrity Monitoring', percentage: 0, status: 'neutral' },
    { label: 'Mandatory Coverage', percentage: 0, status: 'neutral' },
    { label: 'Metadata Accuracy', percentage: 0, status: 'neutral' },
    { label: 'Expiry Control', percentage: 0, status: 'neutral' },
    { label: 'Replacement Handling', percentage: 0, status: 'neutral' },
    { label: 'Revalidation Readiness', percentage: 0, status: 'neutral' },
    { label: 'Audit Completeness', percentage: 0, status: 'neutral' },
  ];

  const health = dashboardData?.health || { overall: 0, state: 'Healthy', statusColor: '#16a34a' };
  const alerts = dashboardData?.alerts || [];
  const expirySummary = dashboardData?.expirySummary || { expiring30: 0, expiring60: 0, expired: 0 };
  const integritySummary = dashboardData?.integritySummary || { secure: 0, alert: 0, compromised: 0 };
  const mandatoryCoverage = dashboardData?.mandatoryCoverage || { compliant: 0, missing: 0, partial: 0 };
  const quickQueues = dashboardData?.quickQueues || { assignedToMe: 0, slaBreached: 0, revalidationDue: 0, replacementDue: 0 };
  const documentsTable = dashboardData?.documents?.data || [];
  const meta = dashboardData?.documents?.meta || { current_page: 1, per_page: pageSize, total: 0, last_page: 1 };

  const selectedDocObj = documentsTable.find((d: any) => d.id === selectedDocId) || selectedDocDetail;

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Verification &amp; Compliance / Document Verification</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Document Verification Management</h1>
            <p className="text-xs text-gray-500 mt-1">Verify business licenses, GMP certificates, safety dossiers, and regulatory documentation across the marketplace.</p>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={handleReviewNext}
              className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded shadow-sm transition"
            >
              <FileCheck size={14} />
              <span>Review Next Document</span>
            </button>

            <button 
              onClick={handleBatchApprove}
              disabled={selectedRowIds.length === 0 || actionLoading}
              className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded shadow-sm disabled:opacity-40 transition"
            >
              <CheckSquare size={14} />
              <span>Approve Batch ({selectedRowIds.length})</span>
            </button>

            <button 
              onClick={handleExportAudit}
              className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-3 py-1.5 rounded shadow-sm transition"
            >
              <Download size={14} />
              <span>Export Audit</span>
            </button>

            <button 
              onClick={fetchDashboard} 
              className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 hover:text-gray-900 shadow-sm transition"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              <span>Sync Live Data</span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setMoreActionsOpen(!moreActionsOpen)}
                className="p-1.5 bg-white border border-gray-200 rounded text-gray-600 hover:text-gray-900 shadow-sm"
              >
                <MoreVertical size={15} />
              </button>
              {moreActionsOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 text-xs">
                  <button onClick={() => { setMoreActionsOpen(false); handleExportAudit(); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700">Export CSV Audit</button>
                  <button onClick={() => { setMoreActionsOpen(false); fetchDashboard(); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700">Trigger Revalidation</button>
                  <button onClick={() => { setMoreActionsOpen(false); alert('Compliance summary generated'); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700">Generate Report</button>
                </div>
              )}
            </div>
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
          <ChartCard title="Document Verification Trend (30 Days)" subtitle="Daily submitted, verified, conditional, and SLA breached dossiers" loading={loading}>
            <TrendChart data={trend} colors={['#2563eb', '#16a34a', '#f97316', '#dc2626']} />
          </ChartCard>

          <ChartCard title="Document Category Distribution" subtitle="Distribution by document classification" loading={loading}>
            <DonutDistributionChart 
              data={donut} 
              totalLabel="Total Docs" 
              totalValue={donut.reduce((acc: number, d: any) => acc + (d.value || 0), 0).toLocaleString()} 
            />
          </ChartCard>
        </div>

        {/* Verification Status Summary & Health Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Status Breakdown */}
          <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[13px] font-bold text-gray-900">Verification Status Summary</h3>
              <p className="text-[11px] text-gray-500 mb-3">Overall verification workflow completion rate</p>
            </div>
            <HorizontalStatusChart data={statusSummaryData} total={meta.total} />
          </div>

          {/* Health Scorecard (10 Metrics Grid) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-md p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
              <div>
                <h3 className="text-[13px] font-bold text-gray-900">Document Verification Health Scorecard</h3>
                <p className="text-[11px] text-gray-500">Key verification accuracy, compliance, and expiry metrics</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {health.overall}% Healthy
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
                placeholder="Search document name, ID, supplier, or certificate number..."
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
              { id: 'slaBreached', label: 'SLA Breached', count: quickQueues.slaBreached },
              { id: 'revalidationDue', label: 'Revalidation Due', count: quickQueues.revalidationDue },
              { id: 'replacementDue', label: 'Replacement Due', count: quickQueues.replacementDue },
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
              <span>Verification Document Queue</span>
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
            <table className="w-full text-left text-[11px] whitespace-nowrap min-w-[1500px]">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 w-8 text-center">
                    <input 
                      type="checkbox"
                      checked={documentsTable.length > 0 && selectedRowIds.length === documentsTable.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRowIds(documentsTable.map((d: any) => d.id));
                        } else {
                          setSelectedRowIds([]);
                        }
                      }}
                      className="rounded text-blue-600"
                    />
                  </th>
                  <th className="px-3 py-2">Document Name / Ref ID</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Entity Type</th>
                  <th className="px-3 py-2">Supplier / Brand</th>
                  <th className="px-3 py-2">Issuer</th>
                  <th className="px-3 py-2">Country</th>
                  <th className="px-3 py-2">Issue Date</th>
                  <th className="px-3 py-2">Expiry Date</th>
                  <th className="px-3 py-2">Mandatory</th>
                  <th className="px-3 py-2">Identity Match</th>
                  <th className="px-3 py-2">Issuer Val</th>
                  <th className="px-3 py-2">Authenticity</th>
                  <th className="px-3 py-2">Integrity</th>
                  <th className="px-3 py-2">Verification Status</th>
                  <th className="px-3 py-2">Risk Level</th>
                  <th className="px-3 py-2">Reviewer</th>
                  <th className="px-3 py-2">Submitted</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {documentsTable.length === 0 ? (
                  <tr>
                    <td colSpan={19} className="px-3 py-12 text-center text-gray-400 bg-gray-50/50">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileX size={32} className="text-gray-300" />
                        <span className="font-semibold text-gray-600 text-xs">No document verification records found for the selected filters.</span>
                        <span className="text-[11px] text-gray-400">Try adjusting your search query, status tabs, or clear quick filters.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  documentsTable.map((row: any) => {
                    const isSelected = row.id === selectedDocId;
                    const isChecked = selectedRowIds.includes(row.id);
                    return (
                      <tr 
                        key={row.id} 
                        onClick={() => setSelectedDocId(row.id)}
                        className={`cursor-pointer transition ${isSelected ? 'bg-blue-50/80 font-semibold' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
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
                          <div className="text-gray-900 font-bold">{row.name}</div>
                          <div className="text-gray-400 text-[10px]">{row.id}</div>
                        </td>
                        <td className="px-3 py-2 text-gray-600">{row.category}</td>
                        <td className="px-3 py-2 text-gray-600">{row.entityType}</td>
                        <td className="px-3 py-2 text-gray-900 font-semibold">{row.entity}</td>
                        <td className="px-3 py-2 text-gray-600">{row.issuer}</td>
                        <td className="px-3 py-2 text-gray-600">{row.country}</td>
                        <td className="px-3 py-2 text-gray-500">{row.issueDate}</td>
                        <td className="px-3 py-2 text-gray-500">{row.expiryDate}</td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${row.mandatory === 'Yes' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                            {row.mandatory}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-emerald-600 font-semibold">{row.match}</td>
                        <td className="px-3 py-2 text-gray-600">{row.issuerVal}</td>
                        <td className="px-3 py-2 text-gray-600">{row.authVal}</td>
                        <td className="px-3 py-2 text-gray-600">{row.integrity}</td>
                        <td className="px-3 py-2 font-semibold">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                            row.status === 'Verified' ? 'text-green-700 bg-green-50 border border-green-200' :
                            row.status === 'Rejected' ? 'text-red-700 bg-red-50 border border-red-200' :
                            row.status === 'Conditional' ? 'text-amber-700 bg-amber-50 border border-amber-200' :
                            'text-blue-700 bg-blue-50 border border-blue-200'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            row.risk === 'High' ? 'bg-red-100 text-red-700' :
                            row.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {row.risk}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-gray-600">{row.reviewer}</td>
                        <td className="px-3 py-2 text-gray-400">{row.submitted}</td>
                        <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => setSelectedDocId(row.id)}
                            className="text-blue-600 hover:text-blue-800 font-bold text-[11px]"
                          >
                            View
                          </button>
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

        {/* BOTTOM WORKSPACE: SELECTED DOCUMENT DETAILS PANEL */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm mt-6 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
            {selectedDocObj ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center font-bold">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{selectedDocObj.name}</h3>
                    <span className="text-[10px] text-gray-400 font-semibold">{selectedDocObj.id}</span>
                    <span className={`px-2 py-0.5 text-[10px] rounded font-bold ${
                      selectedDocObj.status === 'Verified' ? 'bg-green-100 text-green-800' :
                      selectedDocObj.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedDocObj.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center gap-3 mt-0.5">
                    <span>Category: <strong>{selectedDocObj.category}</strong></span>
                    <span>Supplier: <strong>{selectedDocObj.supplier || selectedDocObj.entity}</strong></span>
                    <span>Submitted: <strong>{selectedDocObj.submitted}</strong></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Info size={16} className="text-blue-500" />
                <span className="font-semibold">No document selected. Select a document row from the portfolio table above to view detailed metadata and audit history.</span>
              </div>
            )}

            {selectedDocObj && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleExecuteAction('verify')}
                  disabled={actionLoading}
                  className="px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-sm"
                >
                  Verify Now
                </button>
                <button 
                  onClick={() => handleExecuteAction('reject')}
                  disabled={actionLoading}
                  className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-sm"
                >
                  Reject
                </button>
              </div>
            )}
          </div>

          {/* Workspace Tabs */}
          <div className="border-b border-gray-200 px-4 bg-gray-50 text-xs flex gap-6 overflow-x-auto">
            {[
              { id: 'preview', label: 'Preview & Document' },
              { id: 'metadata', label: 'Metadata & Attributes' },
              { id: 'extracted', label: 'Extracted Fields' },
              { id: 'entityMatch', label: 'Entity Match' },
              { id: 'issuerVal', label: 'Issuer Validation' },
              { id: 'authenticity', label: 'Authenticity & Forensic' },
              { id: 'integrity', label: 'Integrity & Hash' },
              { id: 'expiry', label: 'Expiry & Schedule' },
              { id: 'auditHistory', label: 'Audit History' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDetailTab(tab.id)}
                className={`py-2.5 font-bold transition border-b-2 whitespace-nowrap ${
                  detailTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Detail Workspace Content Container */}
          <div className="p-5 min-h-[220px]">
            {selectedDocObj ? (
              <>
                {detailTab === 'preview' && (
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="w-full lg:w-1/2 bg-gray-50 border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center min-h-[240px] text-center">
                      {selectedDocObj.previewUrl ? (
                        <iframe src={selectedDocObj.previewUrl} className="w-full h-[220px] rounded border border-gray-200" title="Document Preview" />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileText size={48} className="text-gray-300" />
                          <span className="text-xs font-semibold text-gray-600">{selectedDocObj.fileName || 'dossier_document.pdf'}</span>
                          <span className="text-[11px] text-gray-400">{selectedDocObj.fileSize || '1.2 MB'} • PDF Document</span>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => alert('Opening full document view')} className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1">
                              <ExternalLink size={12} /> View Full
                            </button>
                            <button onClick={() => alert('Downloading file')} className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1">
                              <Download size={12} /> Download
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full lg:w-1/2 space-y-3 text-xs">
                      <h4 className="font-bold text-gray-900 border-b pb-1">Document Summary Overview</h4>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div><span className="text-gray-500">Document Name:</span> <strong className="text-gray-900 block">{selectedDocObj.name}</strong></div>
                        <div><span className="text-gray-500">Reference ID:</span> <strong className="text-gray-900 block">{selectedDocObj.id}</strong></div>
                        <div><span className="text-gray-500">Category:</span> <strong className="text-gray-900 block">{selectedDocObj.category}</strong></div>
                        <div><span className="text-gray-500">Entity Type:</span> <strong className="text-gray-900 block">{selectedDocObj.entityType}</strong></div>
                        <div><span className="text-gray-500">Issuer Body:</span> <strong className="text-gray-900 block">{selectedDocObj.issuer}</strong></div>
                        <div><span className="text-gray-500">Country:</span> <strong className="text-gray-900 block">{selectedDocObj.country}</strong></div>
                        <div><span className="text-gray-500">Issue Date:</span> <strong className="text-gray-900 block">{selectedDocObj.issueDate}</strong></div>
                        <div><span className="text-gray-500">Expiry Date:</span> <strong className="text-gray-900 block">{selectedDocObj.expiryDate}</strong></div>
                      </div>
                    </div>
                  </div>
                )}

                {detailTab === 'metadata' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    {Object.entries(selectedDocDetail?.metadata || {
                      documentType: selectedDocObj.category,
                      standard: 'GMP / ISO 22716',
                      certificateNumber: 'REG-884920',
                      scope: 'Cosmetics Distribution',
                      issuingBody: selectedDocObj.issuer,
                      accreditation: 'ISO/IEC 17025',
                      language: 'English / Sinhala',
                      pages: 4,
                      integrityHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                      fileName: selectedDocObj.fileName || 'dossier.pdf',
                      fileSize: selectedDocObj.fileSize || '1.2 MB',
                      uploadedBy: 'Supplier Admin',
                      digitalSignature: 'Valid RSA-2048 Signature',
                      tamperStatus: 'Untampered & Verified',
                    }).map(([k, v]) => (
                      <div key={k} className="bg-gray-50 p-2.5 rounded border border-gray-100">
                        <span className="text-[10px] text-gray-400 font-semibold block uppercase">{k.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-xs font-bold text-gray-900 break-all">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {detailTab === 'extracted' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-500 font-semibold uppercase">
                        <tr>
                          <th className="p-2">Extracted Field Key</th>
                          <th className="p-2">Extracted Value</th>
                          <th className="p-2">Confidence</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(selectedDocDetail?.extractedFields || [
                          { key: 'Business Name', value: selectedDocObj.supplier, confidence: '99.4%' },
                          { key: 'License Number', value: selectedDocObj.id, confidence: '100%' },
                          { key: 'Issue Date', value: selectedDocObj.issueDate, confidence: '98.2%' },
                          { key: 'Expiry Date', value: selectedDocObj.expiryDate, confidence: '98.5%' },
                        ]).map((f: any, i: number) => (
                          <tr key={i}>
                            <td className="p-2 font-bold text-gray-700">{f.key}</td>
                            <td className="p-2 text-gray-900">{f.value}</td>
                            <td className="p-2 font-semibold text-emerald-600">{f.confidence || '99%'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {detailTab === 'entityMatch' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-3 rounded border border-emerald-200">
                      <span className="font-bold">Entity Verification Match Score: 100% Match</span>
                      <span className="text-[11px] font-semibold">Verified against registered supplier account</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded border border-gray-200">
                        <span className="text-[10px] text-gray-400 font-bold block">REGISTERED SUPPLIER ENTITY</span>
                        <span className="font-bold text-gray-900 block mt-1">{selectedDocObj.supplier}</span>
                        <span className="text-[11px] text-gray-500">Tax ID: 928301928V • Sri Lanka</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded border border-gray-200">
                        <span className="text-[10px] text-gray-400 font-bold block">DOCUMENT ISSUED ENTITY</span>
                        <span className="font-bold text-gray-900 block mt-1">{selectedDocObj.supplier}</span>
                        <span className="text-[11px] text-gray-500">Identical Entity Name &amp; Registration</span>
                      </div>
                    </div>
                  </div>
                )}

                {detailTab === 'issuerVal' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-blue-50 text-blue-900 rounded border border-blue-200 flex justify-between items-center">
                      <span className="font-bold">Official Issuer Authority: {selectedDocObj.issuer}</span>
                      <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold">Government Registry Verified</span>
                    </div>
                    <p className="text-gray-600 text-[11px]">Issuer credential registry lookup confirmed active registration. Official authority seal matches regulatory repository signature.</p>
                  </div>
                )}

                {detailTab === 'authenticity' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-green-50 text-green-900 rounded border border-green-200 flex justify-between items-center">
                      <span className="font-bold">Forensic Authenticity Analysis Score: 99.8 / 100</span>
                      <span className="text-xs font-bold text-green-700">Genuine Document</span>
                    </div>
                    <p className="text-gray-600 text-[11px]">Anti-tamper digital watermark detected. Font structure, layout alignment, and PDF metadata stream verified clean.</p>
                  </div>
                )}

                {detailTab === 'integrity' && (
                  <div className="p-3 bg-gray-50 rounded border border-gray-200 text-xs space-y-2">
                    <div><span className="text-gray-500 font-semibold">Checksum Algorithm:</span> <strong className="text-gray-900">SHA-256</strong></div>
                    <div><span className="text-gray-500 font-semibold">File Hash:</span> <code className="bg-white px-2 py-1 rounded border border-gray-200 text-gray-800 font-mono text-[10px] block mt-1">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code></div>
                    <div><span className="text-gray-500 font-semibold">Encryption &amp; Storage:</span> <strong className="text-gray-900">AES-256 Encrypted Private Storage</strong></div>
                  </div>
                )}

                {detailTab === 'expiry' && (
                  <div className="p-3 bg-yellow-50 text-yellow-900 rounded border border-yellow-200 text-xs space-y-1">
                    <div className="font-bold">Expiry Date: {selectedDocObj.expiryDate}</div>
                    <div className="text-[11px]">Auto-revalidation reminder set for 30 days prior to expiration.</div>
                  </div>
                )}

                {detailTab === 'auditHistory' && (
                  <div className="space-y-3">
                    {(selectedDocDetail?.audits || [
                      { id: 1, action: 'Document submitted for review', performedBy: 'Supplier Officer', timestamp: selectedDocObj.submitted },
                      { id: 2, action: 'Automated OCR & Forensic scan completed', performedBy: 'System AI', timestamp: selectedDocObj.submitted },
                    ]).map((a: any) => (
                      <div key={a.id} className="p-2.5 bg-gray-50 rounded border border-gray-200 text-xs flex justify-between items-center">
                        <div>
                          <span className="font-bold text-gray-900 block">{a.action}</span>
                          <span className="text-[10px] text-gray-500">By {a.performedBy}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">{a.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                <FileText size={36} className="text-gray-300 mb-2" />
                <span className="text-xs font-semibold text-gray-600">No document selected</span>
                <span className="text-[11px] text-gray-400 mt-0.5">Select a document from the portfolio table above to view detailed metadata, extracted fields, integrity verification, and audit history.</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* RIGHT OPERATIONAL RAIL */}
      <RightIntelligenceRail>
        {/* Verification Health Score */}
        <RailSection title="Document Verification Health">
          <HealthScoreGauge 
            score={health.overall} 
            label={health.state} 
            statusText={health.state} 
            statusColor={health.statusColor} 
            metrics={[
              { label: 'Authenticity Score', value: `${health.overall}%`, progress: health.overall },
              { label: 'Expiry Compliance', value: `${Math.max(0, 100 - (expirySummary.expired * 10))}%`, progress: Math.max(0, 100 - (expirySummary.expired * 10)) },
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

        {/* Expiry Summary */}
        <RailSection title="Expiry Summary">
          <div className="bg-white border border-gray-200 rounded p-2.5 text-[11px] space-y-2 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expiring in 30 Days</span>
              <span className="font-bold text-amber-600">{expirySummary.expiring30}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expiring in 60 Days</span>
              <span className="font-bold text-gray-900">{expirySummary.expiring60}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-1">
              <span className="text-gray-600 font-semibold">Expired Documents</span>
              <span className="font-bold text-red-600">{expirySummary.expired}</span>
            </div>
          </div>
        </RailSection>

        {/* Integrity Summary */}
        <RailSection title="Integrity Summary">
          <div className="bg-white border border-gray-200 rounded p-2.5 text-[11px] space-y-2 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Secure &amp; Verified</span>
              <span className="font-bold text-emerald-600">{integritySummary.secure}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Integrity Alerts</span>
              <span className="font-bold text-amber-600">{integritySummary.alert}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-1">
              <span className="text-gray-600 font-semibold">Compromised</span>
              <span className="font-bold text-red-600">{integritySummary.compromised}</span>
            </div>
          </div>
        </RailSection>

        {/* Mandatory Coverage */}
        <RailSection title="Mandatory Coverage">
          <div className="bg-white border border-gray-200 rounded p-2.5 text-[11px] space-y-2 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Compliant</span>
              <span className="font-bold text-emerald-600">{mandatoryCoverage.compliant}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Missing Mandatory</span>
              <span className="font-bold text-purple-600">{mandatoryCoverage.missing}</span>
            </div>
          </div>
        </RailSection>

        {/* Quick Queues */}
        <RailSection title="Quick Queues">
          <div className="flex flex-col gap-1 text-[11px]">
            {[
              { id: 'assignedToMe', label: 'Assigned to Me', count: quickQueues.assignedToMe },
              { id: 'slaBreached', label: 'SLA Breached', count: quickQueues.slaBreached },
              { id: 'revalidationDue', label: 'Revalidation Due', count: quickQueues.revalidationDue },
              { id: 'replacementDue', label: 'Replacement Due', count: quickQueues.replacementDue },
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

        {/* Final Document Actions Panel */}
        <RailSection title="Final Document Actions">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleExecuteAction('verify')}
              disabled={!selectedDocId || actionLoading}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs shadow-sm disabled:opacity-40 transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={14} />
              <span>Verify Document</span>
            </button>

            <button
              onClick={() => handleExecuteAction('conditional')}
              disabled={!selectedDocId || actionLoading}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded text-xs shadow-sm disabled:opacity-40 transition flex items-center justify-center gap-1.5"
            >
              <AlertTriangle size={14} />
              <span>Verify with Conditions</span>
            </button>

            <button
              onClick={() => handleExecuteAction('replacement')}
              disabled={!selectedDocId || actionLoading}
              className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded text-xs shadow-sm disabled:opacity-40 transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={14} />
              <span>Request Replacement</span>
            </button>

            <button
              onClick={() => handleExecuteAction('evidence')}
              disabled={!selectedDocId || actionLoading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-xs shadow-sm disabled:opacity-40 transition flex items-center justify-center gap-1.5"
            >
              <FileText size={14} />
              <span>Request Evidence</span>
            </button>

            <button
              onClick={() => handleExecuteAction('reject')}
              disabled={!selectedDocId || actionLoading}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-xs shadow-sm disabled:opacity-40 transition flex items-center justify-center gap-1.5"
            >
              <XCircle size={14} />
              <span>Reject Document</span>
            </button>

            <button
              onClick={() => handleExecuteAction('revalidate')}
              disabled={!selectedDocId || actionLoading}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-xs shadow-sm disabled:opacity-40 transition flex items-center justify-center gap-1.5"
            >
              <ShieldCheck size={14} />
              <span>Revalidate</span>
            </button>
          </div>
        </RailSection>

      </RightIntelligenceRail>

    </div>
  );
}
