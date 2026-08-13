'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { fetchSupportReports } from '@/services/api/reportsAuditService';
import { SupportReportItem, ReportFilterParams } from '@/types/reportsAudit';

import { ReportsAuditHeader } from '@/components/admin/customer-support/reports-audit/ReportsAuditHeader';
import { ReportingGlobalFilters } from '@/components/admin/customer-support/reports-audit/ReportingGlobalFilters';
import { ReportsAuditKpis } from '@/components/admin/customer-support/reports-audit/ReportsAuditKpis';
import { ReportsAuditTabs } from '@/components/admin/customer-support/reports-audit/ReportsAuditTabs';
import { ReportFiltersWorkspace } from '@/components/admin/customer-support/reports-audit/ReportFiltersWorkspace';
import { ReportsAuditStatusStrip } from '@/components/admin/customer-support/reports-audit/ReportsAuditStatusStrip';
import { SupportReportLibraryTable } from '@/components/admin/customer-support/reports-audit/SupportReportLibraryTable';
import { SelectedReportWorkspace } from '@/components/admin/customer-support/reports-audit/SelectedReportWorkspace';
import { NumberedAnalyticsGrid } from '@/components/admin/customer-support/reports-audit/NumberedAnalyticsGrid';
import { RightOperationsRail } from '@/components/admin/customer-support/reports-audit/RightOperationsRail';
import {
  GenerateReportModal,
  ExportDataModal,
  ImportDataModal,
} from '@/components/admin/customer-support/reports-audit/ReportsAuditModals';

export default function ReportsAuditPage() {
  const [activeTab, setActiveTab] = useState('reports');
  const [reports, setReports] = useState<SupportReportItem[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string>('1');

  // Filter state
  const [filters, setFilters] = useState<ReportFilterParams>({
    timeRange: 'This Month',
    marketplace: 'All Marketplaces',
    businessUnit: 'All Business Units',
    region: 'All Regions',
    segment: 'All Customer Segments',
    caseSource: 'All Sources',
    dataSource: 'All Sources',
    domain: 'All Domains',
    workforceSource: 'All Sources',
    autoRefresh: '5 Minutes',
    auditZone: 'Prod & QA',
    search: '',
    reportType: 'All Types',
    createdUser: 'All Users',
    executionStatus: 'All Statuses',
    priority: 'All Priorities',
    dateRangeFilter: 'Jul 1 – Jul 22, 2026',
    statusChip: 'All',
  });

  // Modal controls
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const rData = await fetchSupportReports(filters);
      setReports(rData);
    }
    loadData();
  }, [filters]);

  const handleFilterChange = (key: keyof ReportFilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      timeRange: 'This Month',
      marketplace: 'All Marketplaces',
      businessUnit: 'All Business Units',
      region: 'All Regions',
      segment: 'All Customer Segments',
      caseSource: 'All Sources',
      dataSource: 'All Sources',
      domain: 'All Domains',
      workforceSource: 'All Sources',
      autoRefresh: '5 Minutes',
      auditZone: 'Prod & QA',
      search: '',
      reportType: 'All Types',
      createdUser: 'All Users',
      executionStatus: 'All Statuses',
      priority: 'All Priorities',
      dateRangeFilter: 'Jul 1 – Jul 22, 2026',
      statusChip: 'All',
    });
    toast.success('Filters reset to default view.');
  };

  const selectedReport = (reports && reports.length > 0)
    ? (reports.find((r) => r.id === selectedReportId) || reports[0])
    : {
        id: '1',
        number: 1,
        reportName: 'Customer Support Executive Dashboard Report',
        reportId: 'RPT-ESP-001',
        reportType: 'Dashboard',
        supportDomain: 'Workforce',
        scope: 'All Business Units',
        format: 'PDF',
        schedule: 'Daily 09:00 AM',
        lastGenerated: 'Jul 22, 2026 10:00 AM',
        dateRange: 'Jul 21 – Jul 22, 2026',
        status: 'Active' as const,
        priority: 'Normal' as const,
      };

  return (
    <div className="space-y-2.5 p-2 sm:p-3 w-full max-w-[1920px] mx-auto pb-16 font-sans text-slate-900 leading-normal">
      {/* 1. Page Header */}
      <ReportsAuditHeader
        onGenerateReport={() => setIsGenerateModalOpen(true)}
        onCreateScheduled={() => setIsGenerateModalOpen(true)}
        onExportData={() => setIsExportModalOpen(true)}
        onImportData={() => setIsImportModalOpen(true)}
        onReviewExceptions={() => toast('Reviewing 11 transfer exceptions...')}
        onReviewAuditTrail={() => toast('Reviewing 18.4K audit events...')}
        onMoreActions={() => toast('Opening Reports & Audit options...')}
      />

      {/* 2. Global Reporting Filters */}
      <ReportingGlobalFilters />

      {/* 3. KPI Row */}
      <ReportsAuditKpis />

      {/* 4. Main Navigation Tabs */}
      <ReportsAuditTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Report Filters Workspace */}
      <ReportFiltersWorkspace
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onSaveView={() => toast.success('Current Report filter saved!')}
        onColumns={() => toast('Configuring Report Library columns...')}
        onMoreFilters={() => toast('Opening extra filters...')}
      />

      {/* 6. Reports & Audit Health Strip */}
      <ReportsAuditStatusStrip
        activeStatusChip={filters.statusChip}
        onSelectStatusChip={(sc) => handleFilterChange('statusChip', sc)}
      />

      {/* Main split layout: Left main workspace + Right operations rail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_250px] gap-2.5 items-start w-full">
        {/* Left main content column */}
        <div className="space-y-2.5 min-w-0">
          {/* 7. Support Report Library Table */}
          <SupportReportLibraryTable
            reports={reports}
            selectedReportId={selectedReportId}
            onSelectReport={setSelectedReportId}
            onActionClick={(rId) => toast(`Opening options for report ${rId}`)}
          />

          {/* 8. Selected Report Workspace */}
          <SelectedReportWorkspace selectedReport={selectedReport} />

          {/* 9. Dense Numbered Analytics / Audit Grid (All 23 Cards) */}
          <NumberedAnalyticsGrid />
        </div>

        {/* Right Operations Rail Column */}
        <div className="shrink-0 w-full">
          <RightOperationsRail
            onGenerateReport={() => setIsGenerateModalOpen(true)}
            onCreateScheduled={() => setIsGenerateModalOpen(true)}
            onExportData={() => setIsExportModalOpen(true)}
            onImportData={() => setIsImportModalOpen(true)}
            onReviewExceptions={() => toast('Reviewing 11 transfer exceptions...')}
            onReviewAuditTrail={() => toast('Reviewing 18.4K audit events...')}
            onReviewRetention={() => toast('Reviewing 148 expiring retention items...')}
            onOpenAccessEvidence={() => toast('Opening 24,835 evidence records...')}
          />
        </div>
      </div>

      {/* Interactive Action Modals */}
      <GenerateReportModal isOpen={isGenerateModalOpen} onClose={() => setIsGenerateModalOpen(false)} />
      <ExportDataModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      <ImportDataModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </div>
  );
}
