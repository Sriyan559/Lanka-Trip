'use client';

import React, { useState, useEffect } from 'react';
import {
  fetchReportsAuditData,
  generateAdministrationReport,
  createExportJob,
  reviewAuditExceptions,
  exportAuditRegistry,
} from '@/lib/administration/reports-audit/reports-audit.api';
import { ReportsAuditFullData, AuditRecord } from '@/lib/administration/reports-audit/reports-audit.types';
import { REPORTS_AUDIT_TABS } from '@/lib/administration/reports-audit/reports-audit.constants';

import { ReportsAuditHeader } from './ReportsAuditHeader';
import { ReportsAuditContextBar } from './ReportsAuditContextBar';
import { ReportsAuditKpiGrid } from './ReportsAuditKpiGrid';
import { ReportsAuditFilterBar } from './ReportsAuditFilterBar';
import { ReportsAuditRightRail } from './ReportsAuditRightRail';
import { AuditOverviewTab } from './tabs/AuditOverviewTab';
import { ChangeHistoryTab } from './tabs/ChangeHistoryTab';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function ReportsAuditPage() {
  const [data, setData] = useState<ReportsAuditFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('last_30_days');
  const [category, setCategory] = useState('all');
  const [actorType, setActorType] = useState('all');
  const [operation, setOperation] = useState('all');
  const [resultFilter, setResultFilter] = useState('all');
  const [integrityFilter, setIntegrityFilter] = useState('all');
  const [businessUnit, setBusinessUnit] = useState('all');
  const [channelRegion, setChannelRegion] = useState('all');
  const [riskLevel, setRiskLevel] = useState('all');

  // Dialog States
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [isCreateExportOpen, setIsCreateExportOpen] = useState(false);
  const [isReviewExceptionsOpen, setIsReviewExceptionsOpen] = useState(false);
  const [isExportAuditOpen, setIsExportAuditOpen] = useState(false);
  const [isCompareChangesOpen, setIsCompareChangesOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchReportsAuditData();
      setData(result);
      if (result.auditRecords && result.auditRecords.length > 0) {
        setSelectedRecord(result.auditRecords[2] || result.auditRecords[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleGenerateReport = async () => {
    await generateAdministrationReport('full_audit');
    setIsGenerateReportOpen(false);
    alert('Administration Report generated successfully.');
  };

  const handleCreateExport = async () => {
    await createExportJob('Audit Records Export');
    setIsCreateExportOpen(false);
    alert('Export job created successfully.');
  };

  const handleReviewExceptions = async () => {
    await reviewAuditExceptions();
    setIsReviewExceptionsOpen(false);
    alert('Audit exceptions review initiated.');
  };

  const handleExportAudit = async () => {
    await exportAuditRegistry();
    setIsExportAuditOpen(false);
    alert('Administration Audit Registry exported.');
  };

  const handleCompareChanges = () => {
    setIsCompareChangesOpen(false);
    alert('Before / After comparison mode updated.');
  };

  const handleActionClick = (action: string) => {
    if (action === 'generate_report') setIsGenerateReportOpen(true);
    else if (action === 'export_audit') setIsExportAuditOpen(true);
    else if (action === 'review_exceptions') setIsReviewExceptionsOpen(true);
    else if (action === 'archive_evidence') alert('Archiving evidence packages...');
    else if (action === 'configure_retention') alert('Navigating to Audit Retention Settings...');
    else if (action === 'pending_approvals') alert('Filter: Pending Approvals');
    else if (action === 'exports_awaiting_review') alert('Filter: Exports Awaiting Review');
    else if (action === 'failed_exports') alert('Filter: Failed Exports');
    else if (action === 'unreviewed_high_risk') alert('Filter: Unreviewed High Risk');
    else alert(`Action triggered: ${action}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDateRange('last_30_days');
    setCategory('all');
    setActorType('all');
    setOperation('all');
    setResultFilter('all');
    setIntegrityFilter('all');
    setBusinessUnit('all');
    setChannelRegion('all');
    setRiskLevel('all');
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50/50">
        <div className="w-8 h-8 border-4 border-[#741d35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filtered records for demonstration
  const filteredRecords = data.auditRecords.filter((rec) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        rec.auditId.toLowerCase().includes(q) ||
        rec.actor.toLowerCase().includes(q) ||
        rec.entity.toLowerCase().includes(q) ||
        rec.changeArea.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (riskLevel !== 'all' && rec.risk.toLowerCase() !== riskLevel.toLowerCase()) return false;
    if (resultFilter !== 'all' && rec.result.toLowerCase() !== resultFilter.toLowerCase()) return false;
    if (integrityFilter !== 'all' && rec.integrity.toLowerCase() !== integrityFilter.toLowerCase()) return false;
    return true;
  });

  const displayData = {
    ...data,
    auditRecords: filteredRecords,
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        {/* Header */}
        <ReportsAuditHeader
          onGenerateReport={() => setIsGenerateReportOpen(true)}
          onCreateExport={() => setIsCreateExportOpen(true)}
          onReviewExceptions={() => setIsReviewExceptionsOpen(true)}
          onCompareChanges={() => setIsCompareChangesOpen(true)}
          onExportAudit={() => setIsExportAuditOpen(true)}
        />

        {/* Context / Breadcrumb */}
        <ReportsAuditContextBar />

        {/* Top 2-Row KPI Grid */}
        <ReportsAuditKpiGrid
          row1Kpis={data.row1Kpis}
          row2Kpis={data.row2Kpis}
        />

        {/* Main Workspace Layout (Main Content + Right Rail) */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <ReportsAuditFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              category={category}
              onCategoryChange={setCategory}
              actorType={actorType}
              onActorTypeChange={setActorType}
              operation={operation}
              onOperationChange={setOperation}
              result={resultFilter}
              onResultChange={setResultFilter}
              integrity={integrityFilter}
              onIntegrityChange={setIntegrityFilter}
              businessUnit={businessUnit}
              onBusinessUnitChange={setBusinessUnit}
              channelRegion={channelRegion}
              onChannelRegionChange={setChannelRegion}
              riskLevel={riskLevel}
              onRiskLevelChange={setRiskLevel}
              onApplyFilters={() => alert('Filters applied')}
              onClearFilters={handleClearFilters}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {REPORTS_AUDIT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 text-[11px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#741d35] text-[#741d35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border-b border-x border-gray-200 rounded-b p-3 shadow-2xs min-w-0">
              {activeTab === 'overview' ? (
                <AuditOverviewTab
                  data={displayData}
                  selectedRecord={selectedRecord!}
                  onSelectRecord={setSelectedRecord}
                  onNavigateTab={setActiveTab}
                />
              ) : (
                <ChangeHistoryTab
                  data={displayData}
                  selectedRecord={selectedRecord!}
                  onSelectRecord={setSelectedRecord}
                />
              )}
            </div>
          </div>

          {/* Right Rail Panel */}
          <div className="w-full lg:w-72 shrink-0">
            <ReportsAuditRightRail
              healthScore={data.healthScore}
              summaryStats={data.summaryStats}
              quickQueues={data.quickQueues}
              onNavigateTab={setActiveTab}
              onActionClick={handleActionClick}
            />
          </div>
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={isGenerateReportOpen}
        title="Generate Administration Report"
        description="Generate a comprehensive PDF/CSV administration report containing audit logs, change history, and evidence traces."
        confirmLabel="Generate Report"
        cancelLabel="Cancel"
        onConfirm={handleGenerateReport}
        onCancel={() => setIsGenerateReportOpen(false)}
      />

      <ConfirmDialog
        isOpen={isCreateExportOpen}
        title="Create Administration Export"
        description="Initiate a secure export of administration audit records and governance evidence for offline archival."
        confirmLabel="Create Export"
        cancelLabel="Cancel"
        onConfirm={handleCreateExport}
        onCancel={() => setIsCreateExportOpen(false)}
      />

      <ConfirmDialog
        isOpen={isReviewExceptionsOpen}
        title="Review Audit Exceptions"
        description="Review 22 open administration audit exceptions and assign resolution workflows."
        confirmLabel="Review Exceptions"
        cancelLabel="Cancel"
        onConfirm={handleReviewExceptions}
        onCancel={() => setIsReviewExceptionsOpen(false)}
      />

      <ConfirmDialog
        isOpen={isExportAuditOpen}
        title="Export Administration Audit"
        description="Export the immutable administration audit registry to an encrypted evidence package."
        confirmLabel="Export Audit"
        cancelLabel="Cancel"
        onConfirm={handleExportAudit}
        onCancel={() => setIsExportAuditOpen(false)}
      />

      <ConfirmDialog
        isOpen={isCompareChangesOpen}
        title="Compare Changes"
        description="Select administration change records to perform deep side-by-side before/after comparison."
        confirmLabel="Compare Changes"
        cancelLabel="Cancel"
        onConfirm={handleCompareChanges}
        onCancel={() => setIsCompareChangesOpen(false)}
      />
    </div>
  );
}

export default ReportsAuditPage;
