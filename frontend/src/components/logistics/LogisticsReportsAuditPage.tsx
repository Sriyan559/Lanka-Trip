"use client";

import React, { useState } from "react";
import { ReportHeader } from "../admin/logistics/reports-import-export-audit/ReportHeader";
import { ReportContextBar } from "../admin/logistics/reports-import-export-audit/ReportContextBar";
import { ReportGovernanceHealthHeader } from "../admin/logistics/reports-import-export-audit/ReportGovernanceHealthHeader";
import { ReportKPIGrid } from "../admin/logistics/reports-import-export-audit/ReportKPIGrid";
import { ReportFilterTabs } from "../admin/logistics/reports-import-export-audit/ReportFilterTabs";
import { ReportAnalytics } from "../admin/logistics/reports-import-export-audit/ReportAnalytics";
import { ReportHealthScorecard } from "../admin/logistics/reports-import-export-audit/ReportHealthScorecard";
import { ReportFilterBar } from "../admin/logistics/reports-import-export-audit/ReportFilterBar";
import { ReportPortfolioTable } from "../admin/logistics/reports-import-export-audit/ReportPortfolioTable";
import { SelectedOperationPreview } from "../admin/logistics/reports-import-export-audit/SelectedOperationPreview";
import { ReportRightRail } from "../admin/logistics/reports-import-export-audit/ReportRightRail";
import {
  LogisticsOperationRecord,
  GovernanceIntelligence,
} from "@/types/logistics/reportsImportExportAudit";
import {
  sampleOperationRecord,
  sampleOperationsList,
  sampleGovernanceIntelligence,
} from "@/data/logistics/reportsImportExportAudit/reportsImportExportAuditMockData";

interface LogisticsReportsAuditPageProps {
  records?: LogisticsOperationRecord[];
  intelligence?: GovernanceIntelligence | null;
  onRefresh?: () => void;
  onCreateOperation?: (type: string) => void;
}

export function LogisticsReportsAuditPage({
  records = sampleOperationsList,
  intelligence = sampleGovernanceIntelligence,
  onRefresh,
  onCreateOperation,
}: LogisticsReportsAuditPageProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedRecord, setSelectedRecord] = useState<LogisticsOperationRecord>(
    records[0] || sampleOperationRecord
  );

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto space-y-3">
        {/* Page Header & Actions */}
        <ReportHeader
          onExportSummary={() => alert("Exporting logistics operations summary...")}
          onReviewFailedJobs={() => alert("Filtering failed data jobs...")}
          onBulkActions={() => alert("Opening bulk actions menu...")}
          onReviewPendingExports={() => alert("Opening pending export approvals...")}
          onCreateOperation={onCreateOperation}
          onRefresh={onRefresh}
        />

        {/* Context Strip & 10 Health Status Badges */}
        <ReportContextBar onRefresh={onRefresh} />

        {/* Main Workspace Layout (Left Workspace + Right Intelligence Panel) */}
        <div className="flex flex-col xl:flex-row gap-3.5 items-start">
          {/* Left Workspace */}
          <main className="flex-1 min-w-0 w-full space-y-3">
            {/* Top Control Health Banner Card */}
            <ReportGovernanceHealthHeader />

            {/* 11 KPI Mini Cards Grid & Secondary Metrics */}
            <ReportKPIGrid />

            {/* 20 Horizontal Filter Tabs */}
            <ReportFilterTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* 3 Major Analytics Charts */}
            <ReportAnalytics />

            {/* 10 Circular Scorecards */}
            <ReportHealthScorecard
              onRefresh={onRefresh}
              onClearAll={() => setActiveTab("Overview")}
              onSaveView={() => alert("View saved.")}
            />

            {/* 18-Dropdown Filter Toolbar */}
            <ReportFilterBar
              onRefresh={onRefresh}
              onFilterChange={(filters) => console.log("Filter update:", filters)}
            />

            {/* Main Portfolio Table */}
            <ReportPortfolioTable
              records={records}
              selectedRecordId={selectedRecord.id}
              onSelectRecord={setSelectedRecord}
            />

            {/* Selected Operation Preview */}
            <SelectedOperationPreview operationRecord={selectedRecord} />
          </main>

          {/* Right-Side Control Panel (Logistics Data Governance Intelligence) */}
          {intelligence && (
            <ReportRightRail
              data={intelligence}
              onSelectAction={(actionName) => alert(`Action triggered: ${actionName}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
