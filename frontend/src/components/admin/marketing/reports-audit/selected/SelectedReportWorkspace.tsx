"use client";

import React, { useState } from "react";
import { SelectedReportRecord } from "@/data/marketingReportsAudit.mock";

import { SelectedReportHeader } from "./SelectedReportHeader";
import { SelectedReportSummaryMetrics } from "./SelectedReportSummaryMetrics";
import { SelectedReportTabs } from "./SelectedReportTabs";
import { ReportDetailsCard } from "./ReportDetailsCard";
import { IncludedSectionsCard } from "./IncludedSectionsCard";
import { ReportDataScopeCard } from "./ReportDataScopeCard";
import { ReportScheduleCard } from "./ReportScheduleCard";
import { ReportDeliveryCard } from "./ReportDeliveryCard";
import { GenerationHistoryTable } from "./GenerationHistoryTable";
import { ReportTemplatesCard } from "./ReportTemplatesCard";
import { ExportJobsTable } from "./ExportJobsTable";
import { ExportPrivacyControls } from "./ExportPrivacyControls";
import { ImportJobsTable } from "./ImportJobsTable";
import { ImportValidationCard } from "./ImportValidationCard";
import { DataMappingTable } from "./DataMappingTable";
import { ChangePreviewTable } from "./ChangePreviewTable";
import { ImportSafetyControls } from "./ImportSafetyControls";
import { TransferJobMonitor } from "./TransferJobMonitor";
import { TransferExceptionsTable } from "./TransferExceptionsTable";
import { MarketingAuditTrail } from "./MarketingAuditTrail";
import { SelectedAuditEventCard } from "./SelectedAuditEventCard";
import { AccessDownloadEvidence } from "./AccessDownloadEvidence";
import { RetentionManagement } from "./RetentionManagement";
import { ReportingGovernanceHealth } from "./ReportingGovernanceHealth";
import { ReportingSourcesHealth } from "./ReportingSourcesHealth";
import { ReportingRecentActivity } from "./ReportingRecentActivity";

interface SelectedReportWorkspaceProps {
  report: SelectedReportRecord | null;
}

export function SelectedReportWorkspace({ report }: SelectedReportWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!report) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-6 text-center text-xs text-gray-500 shadow-2xs">
        <p className="font-bold text-gray-700">Select a report to review:</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-gray-500">
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">sections</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">data scope</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">schedule</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">delivery</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">generation history</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">evidence</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 1. SELECTED REPORT HEADER */}
      <SelectedReportHeader report={report} />

      {/* 2. INNER DETAIL TABS */}
      <SelectedReportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. SUMMARY METRICS */}
      <SelectedReportSummaryMetrics metrics={report.summaryMetrics} />

      {/* 4. DETAIL CARDS GRID */}
      <div className="flex flex-col gap-3">
        {/* ROW 1: 1. Report Details, 2. Included Sections, 3. Data Scope, 4. Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          <ReportDetailsCard details={report.details} />
          <IncludedSectionsCard sections={report.includedSections} />
          <ReportDataScopeCard dataScope={report.dataScope} />
          <ReportScheduleCard schedule={report.schedule} />
        </div>

        {/* ROW 2: 5. Delivery, 6. Generation History (2 cols), 7. Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch">
          <ReportDeliveryCard recipients={report.recipients} />
          <div className="md:col-span-2">
            <GenerationHistoryTable history={report.generationHistory} />
          </div>
          <ReportTemplatesCard templates={report.reportTemplates} />
        </div>

        {/* ROW 3: 8. Export Jobs, 9. Export Privacy Controls, 10. Import Jobs, 11. Import Validation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          <ExportJobsTable exportJobs={report.exportJobs} />
          <ExportPrivacyControls controls={report.exportPrivacyControls} />
          <ImportJobsTable importJobs={report.importJobs} />
          <ImportValidationCard validation={report.importValidation} />
        </div>

        {/* ROW 4: 12. Data Mappings, 13. Change Preview, 14. Import Safety Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <DataMappingTable mappings={report.dataMappings} />
          <ChangePreviewTable changePreviews={report.changePreview} />
          <ImportSafetyControls safetyControls={report.importSafetyControls} />
        </div>

        {/* ROW 5: 15. Transfer Job Monitor (2 cols), 16. Transfer Exceptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <div className="md:col-span-2">
            <TransferJobMonitor transferJobs={report.transferJobs} />
          </div>
          <TransferExceptionsTable exceptions={report.transferExceptions} />
        </div>

        {/* ROW 6: 17. Marketing Audit Trail (2 cols), 18. Selected Audit Event */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <div className="md:col-span-2">
            <MarketingAuditTrail auditEvents={report.auditTrail} />
          </div>
          <SelectedAuditEventCard auditEvent={report.selectedAuditEvent} />
        </div>

        {/* ROW 7: 19. Access & Download Evidence, 20. Retention Management, 21. Reporting Governance Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <AccessDownloadEvidence evidenceList={report.downloadEvidence} />
          <RetentionManagement retentionItems={report.retentionManagement} />
          <ReportingGovernanceHealth governanceHealth={report.governanceHealth} />
        </div>

        {/* ROW 8: 22. Reporting Sources Health, 23. Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
          <ReportingSourcesHealth sources={report.reportingSources} />
          <ReportingRecentActivity activityList={report.recentActivity} />
        </div>
      </div>
    </div>
  );
}
