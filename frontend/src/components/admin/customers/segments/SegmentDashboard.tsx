"use client";

import React, { useState, useMemo } from "react";
import { CustomerContextStrip } from "@/components/admin/customers/CustomerContextStrip";
import { SegmentHeader } from "./SegmentHeader";
import { SegmentKpiGrid } from "./SegmentKpiGrid";
import { SegmentPrimaryTabs } from "./SegmentPrimaryTabs";
import { SegmentAnalyticsSection } from "./SegmentAnalyticsSection";
import { SegmentHealthMetricsRow } from "./SegmentHealthMetricsRow";
import { SegmentFilterToolbar } from "./SegmentFilterToolbar";
import { SegmentPortfolioTable } from "./SegmentPortfolioTable";
import { SegmentLowerCardsGrid } from "./SegmentLowerCardsGrid";
import { SegmentRightRail } from "./SegmentRightRail";
import { SegmentCreateModal } from "./SegmentCreateModal";
import {
  MOCK_SEGMENT_METRICS,
  MOCK_HEALTH_METRICS,
  MOCK_SEGMENT_PORTFOLIO,
  MOCK_SELECTED_SEGMENT_DETAILS,
  MOCK_PRIORITY_ALERTS_SEGMENTS,
} from "@/data/customer-segments.mock";
import { CustomerSegment, SelectedSegmentDetails } from "@/types/customer-segments";

export function SegmentDashboard() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMembership, setSelectedMembership] = useState("All");
  const [selectedConsent, setSelectedConsent] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedOwner, setSelectedOwner] = useState("All");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Selected Segment State
  const [portfolio, setPortfolio] = useState<CustomerSegment[]>(MOCK_SEGMENT_PORTFOLIO);
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment>(MOCK_SEGMENT_PORTFOLIO[0]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Refreshing Customer Segments data...");
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Data successfully synchronized.");
    }, 600);
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedStatus("All");
    setSelectedCategory("All");
    setSelectedMembership("All");
    setSelectedConsent("All");
    setSelectedRisk("All");
    setSelectedOwner("All");
    setSelectedQuickFilter("");
    showToast("All filters reset.");
  };

  // Filtered segments list
  const filteredSegments = useMemo(() => {
    return portfolio.filter((seg) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = seg.name.toLowerCase().includes(q);
        const matchCode = seg.code.toLowerCase().includes(q);
        const matchOwner = seg.owner.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchOwner) return false;
      }

      if (selectedType !== "All" && seg.type !== selectedType) return false;
      if (selectedStatus !== "All" && seg.status !== selectedStatus) return false;
      if (selectedMembership !== "All" && seg.membershipType !== selectedMembership) return false;
      if (selectedConsent !== "All" && seg.consentEligibility !== selectedConsent) return false;

      if (selectedQuickFilter === "active-segments" && seg.status !== "Active") return false;
      if (selectedQuickFilter === "draft-segments" && seg.status !== "Draft") return false;
      if (selectedQuickFilter === "dynamic-segments" && seg.type !== "Dynamic") return false;
      if (selectedQuickFilter === "high-risk-segments" && seg.riskLevel !== "High") return false;
      if (selectedQuickFilter === "membership-conflicts" && seg.conflictStatus !== "Conflict") return false;

      return true;
    });
  }, [portfolio, searchQuery, selectedType, selectedStatus, selectedMembership, selectedConsent, selectedQuickFilter]);

  const selectedDetails: SelectedSegmentDetails = useMemo(() => {
    return {
      ...MOCK_SELECTED_SEGMENT_DETAILS,
      segment: selectedSegment,
    };
  }, [selectedSegment]);

  const handleSaveCreatedSegment = (name: string, type: string) => {
    const newSeg: CustomerSegment = {
      id: `seg-${Date.now()}`,
      code: `SEG-000${portfolio.length + 100}`,
      name,
      type: type as any,
      membershipType: "Inclusive",
      customerScope: "Active Customers",
      entryRuleSummary: "Created via Admin Console",
      exitRuleSummary: "Standard Exit Rule",
      customerCount: 0,
      newMembersCount: 0,
      removedMembersCount: 0,
      avgLtvFormatted: "LKR 0",
      avgLtvNumber: 0,
      orderFrequency: 0,
      retentionRatePct: 100,
      consentEligibility: "Eligible",
      riskLevel: "Low",
      overlapCount: 0,
      conflictStatus: "None",
      recalculationSchedule: "Every 7 days",
      lastRecalculated: "Just now",
      owner: "Elena Vance",
      version: "v1.0",
      status: "Active",
      updatedAt: "Just now",
    };

    setPortfolio([newSeg, ...portfolio]);
    setSelectedSegment(newSeg);
    showToast(`Created new segment "${name}".`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-100/50">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-bold font-mono animate-in fade-in duration-150 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Layout Wrapper */}
      <div className="p-4 sm:p-6 space-y-4 max-w-[1700px] mx-auto min-w-0">
        {/* Page Header */}
        <SegmentHeader
          onExportReport={() => showToast("Exporting Customer Segments Report (CSV/PDF)...")}
          onReviewConflicts={() => {
            setSelectedStatus("Conflict");
            setActiveTab("conflicts");
            showToast("Filtering to Segment Conflicts...");
          }}
          onOpenCreateSegment={() => setIsCreateModalOpen(true)}
          onBulkAction={(act) => showToast(`Executing bulk action: ${act}`)}
          showToast={showToast}
        />

        {/* Business Context Strip */}
        <CustomerContextStrip onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        {/* Top 12 KPI Metric Cards */}
        <SegmentKpiGrid metrics={MOCK_SEGMENT_METRICS} />

        {/* Primary 18 Tabs Bar */}
        <SegmentPrimaryTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* 2-Column Dashboard Layout (Left ~75% + Right ~25% Segmentation Health Rail) */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Left Main Workspace (3 Cols on XL) */}
          <div className="xl:col-span-3 space-y-4 min-w-0">
            {/* Analytics Section (Membership Trend, Type Distribution, Status Summary) */}
            <SegmentAnalyticsSection />

            {/* Health Metrics Row */}
            <SegmentHealthMetricsRow healthMetrics={MOCK_HEALTH_METRICS} />

            {/* Dense Filter Toolbar & Quick Filter Chips */}
            <SegmentFilterToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedMembership={selectedMembership}
              onMembershipChange={setSelectedMembership}
              selectedConsent={selectedConsent}
              onConsentChange={setSelectedConsent}
              selectedRisk={selectedRisk}
              onRiskChange={setSelectedRisk}
              selectedOwner={selectedOwner}
              onOwnerChange={setSelectedOwner}
              selectedQuickFilter={selectedQuickFilter}
              onQuickFilterSelect={(val) =>
                setSelectedQuickFilter(selectedQuickFilter === val ? "" : val)
              }
              onClearAll={handleClearAll}
              onRefresh={handleRefresh}
            />

            {/* Main Segment Portfolio Table */}
            <SegmentPortfolioTable
              segments={filteredSegments}
              selectedSegmentId={selectedSegment.id}
              onSelectSegment={setSelectedSegment}
              onActionClick={(act, seg) => showToast(`Action ${act} on ${seg.name}`)}
            />

            {/* Lower 12 Operational Summary Cards Grid */}
            <SegmentLowerCardsGrid selectedDetails={selectedDetails} showToast={showToast} />
          </div>

          {/* Right Segmentation Health Summary Rail (1 Col on XL) */}
          <div className="xl:col-span-1 min-w-0">
            <SegmentRightRail
              priorityAlerts={MOCK_PRIORITY_ALERTS_SEGMENTS}
              showToast={showToast}
              onReviewConflicts={() => {
                setSelectedStatus("Conflict");
                setActiveTab("conflicts");
                showToast("Filtering to Segment Conflicts...");
              }}
              onRecalculateSegments={() => showToast("Recalculation triggered for all active dynamic segments.")}
              onApproveDrafts={() => showToast("Opening Draft Segment Approvals Queue...")}
              onExportReport={() => showToast("Exporting Customer Segments Report...")}
            />
          </div>
        </div>
      </div>

      {/* Create Segment Modal */}
      <SegmentCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveCreatedSegment}
      />
    </div>
  );
}
