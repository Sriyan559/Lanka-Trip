"use client";

import React, { useState } from "react";
import { ExceptionHeader } from "../admin/logistics/exceptions-reconciliation/ExceptionHeader";
import { ExceptionBanner } from "../admin/logistics/exceptions-reconciliation/ExceptionBanner";
import { ExceptionContextBar } from "../admin/logistics/exceptions-reconciliation/ExceptionContextBar";
import { ExceptionControlHealthHeader } from "../admin/logistics/exceptions-reconciliation/ExceptionControlHealthHeader";
import { ExceptionKPIGrid } from "../admin/logistics/exceptions-reconciliation/ExceptionKPIGrid";
import { ExceptionFilterTabs } from "../admin/logistics/exceptions-reconciliation/ExceptionFilterTabs";
import { ExceptionAnalytics } from "../admin/logistics/exceptions-reconciliation/ExceptionAnalytics";
import { ExceptionHealthScorecard } from "../admin/logistics/exceptions-reconciliation/ExceptionHealthScorecard";
import { ExceptionFilterBar } from "../admin/logistics/exceptions-reconciliation/ExceptionFilterBar";
import { ExceptionPortfolioTable } from "../admin/logistics/exceptions-reconciliation/ExceptionPortfolioTable";
import { SelectedExceptionPreview } from "../admin/logistics/exceptions-reconciliation/SelectedExceptionPreview";
import { ExceptionRightRail } from "../admin/logistics/exceptions-reconciliation/ExceptionRightRail";
import {
  LogisticsExceptionRecord,
  LogisticsControlIntelligence,
} from "@/types/logistics/exceptionsReconciliation";
import {
  sampleExceptionRecord,
  sampleExceptionsList,
  sampleControlIntelligence,
} from "@/data/logistics/exceptionsReconciliation/exceptionsReconciliationMockData";

interface LogisticsExceptionsPageProps {
  records?: LogisticsExceptionRecord[];
  intelligence?: LogisticsControlIntelligence | null;
  onRefresh?: () => void;
  onRunReconciliation?: () => void;
  onCreateException?: () => void;
}

export function LogisticsExceptionsPage({
  records = sampleExceptionsList,
  intelligence = sampleControlIntelligence,
  onRefresh,
  onRunReconciliation,
  onCreateException,
}: LogisticsExceptionsPageProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedRecord, setSelectedRecord] = useState<LogisticsExceptionRecord>(
    records[0] || sampleExceptionRecord
  );

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto space-y-3">
        {/* Page Header & Actions */}
        <ExceptionHeader
          onExportReport={() => alert("Exporting logistics control report...")}
          onReviewCritical={() => alert("Filtering critical exceptions...")}
          onReviewClaims={() => alert("Opening claims review queue...")}
          onRunReconciliation={onRunReconciliation}
          onCreateException={onCreateException}
          onRefresh={onRefresh}
        />

        {/* Warning Alert Banner */}
        <ExceptionBanner />

        {/* Context Strip & 10 Service Health Badges */}
        <ExceptionContextBar onRefresh={onRefresh} />

        {/* Main Workspace Layout (Left Workspace + Right Intelligence Panel) */}
        <div className="flex flex-col xl:flex-row gap-3.5 items-start">
          {/* Left Workspace */}
          <main className="flex-1 min-w-0 w-full space-y-3">
            {/* Top Control Health Banner Card */}
            <ExceptionControlHealthHeader />

            {/* 12 KPI Mini Cards Grid & Secondary Metrics */}
            <ExceptionKPIGrid />

            {/* 20 Horizontal Filter Tabs */}
            <ExceptionFilterTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* 3 Major Analytics Charts */}
            <ExceptionAnalytics />

            {/* 10 Circular Scorecards */}
            <ExceptionHealthScorecard
              onRefresh={onRefresh}
              onClearAll={() => setActiveTab("Overview")}
              onSaveView={() => alert("View saved.")}
            />

            {/* 18-Dropdown Filter Toolbar */}
            <ExceptionFilterBar
              onRefresh={onRefresh}
              onFilterChange={(filters) => console.log("Filter update:", filters)}
            />

            {/* Main Portfolio Table */}
            <ExceptionPortfolioTable
              records={records}
              selectedRecordId={selectedRecord.id}
              onSelectRecord={setSelectedRecord}
            />

            {/* Selected Exception Preview */}
            <SelectedExceptionPreview exceptionRecord={selectedRecord} />
          </main>

          {/* Right-Side Control Panel (Logistics Control Intelligence) */}
          {intelligence && (
            <ExceptionRightRail
              data={intelligence}
              onSelectAction={(actionName) => alert(`Action triggered: ${actionName}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
