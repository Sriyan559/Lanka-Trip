"use client";

import React, { useState, useEffect } from "react";
import { ReverseLogisticsHeader } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsHeader";
import { ReverseLogisticsContextBar } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsContextBar";
import { ReverseLogisticsKPIGrid } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsKPIGrid";
import { ReverseLogisticsTabs } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsTabs";
import { ReverseLogisticsAnalytics } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsAnalytics";
import { ReverseLogisticsHealthScorecard } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsHealthScorecard";
import { ReverseLogisticsFilterPanel } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsFilterPanel";
import { ReverseLogisticsPortfolioTable } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsPortfolioTable";
import { SelectedReturnPreview } from "@/components/admin/logistics/reverse-logistics/SelectedReturnPreview";
import { ReverseLogisticsRightRail } from "@/components/admin/logistics/reverse-logistics/ReverseLogisticsRightRail";
import { CreateReturnCollectionModal } from "@/components/admin/logistics/reverse-logistics/CreateReturnCollectionModal";
import { ConfirmationModal } from "@/components/admin/logistics/shared/ConfirmationModal";
import { AlertBanner } from "@/components/admin/logistics/shared/AlertBanner";
import { reverseLogisticsService } from "@/services/logistics/reverseLogisticsService";
import {
  ReturnCase,
  ReverseLogisticsMetrics,
  ReverseLogisticsIntelligenceData,
} from "@/types/logistics/reverseLogistics";

export default function ReverseLogisticsPage() {
  const [metrics, setMetrics] = useState<ReverseLogisticsMetrics | null>(null);
  const [intelligence, setIntelligence] = useState<ReverseLogisticsIntelligenceData | null>(null);
  const [returnCases, setReturnCases] = useState<ReturnCase[]>([]);
  const [selectedReturn, setSelectedReturn] = useState<ReturnCase | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [mRes, iRes, rRes] = await Promise.all([
        reverseLogisticsService.getMetrics(),
        reverseLogisticsService.getIntelligence(),
        reverseLogisticsService.getReturnCases({ tab: activeTab }),
      ]);
      setMetrics(mRes);
      setIntelligence(iRes);
      setReturnCases(rRes);
      if (rRes.length > 0 && !selectedReturn) {
        setSelectedReturn(rRes[0]);
      }
    } catch (err) {
      console.error("Failed to load reverse logistics data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleCreateCollection = (formData: Partial<ReturnCase>) => {
    void reverseLogisticsService.createReturnCollection(formData).then((res) => {
      alert(`Return collection created successfully: ${res.returnCase.returnRef}`);
      void loadData();
    });
  };

  const handleUpdateStatus = (id: string, status: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Confirm Status Update",
      message: `Are you sure you want to update status of return case ${id} to ${status}?`,
      onConfirm: () => {
        void reverseLogisticsService.updateReturnStatus(id, status).then((res) => {
          alert(res.message);
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
          void loadData();
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto space-y-3">
        {/* Page Header & Breadcrumbs */}
        <ReverseLogisticsHeader
          onExport={() => alert("Exporting reverse logistics report...")}
          onReviewExceptions={() => alert("Opening return exceptions queue...")}
          onReviewOverdueCollections={() => alert("Opening overdue collections queue...")}
          onLogisticsReview={() => alert("Opening logistics review queue...")}
          onCreateCollection={() => setIsCreateModalOpen(true)}
        />

        {/* Live Alert Banner */}
        {intelligence && intelligence.alerts.length > 0 && <AlertBanner message={intelligence.alerts.map(a => `${a.count} ${a.message}`).join(" · ")} type="warning" />}

        {/* Business Scope Context Strip & 9 Health Badges */}
        <ReverseLogisticsContextBar
          lastSynced={metrics?.lastSynced}
          onRefresh={loadData}
        />

        {/* 12 KPI Metric Cards & 6 Secondary Performance Metrics */}
        {metrics && <ReverseLogisticsKPIGrid metrics={metrics} />}

        {/* Main Workspace Layout (Left Workspace + Right Intelligence Rail) */}
        <div className="flex flex-col xl:flex-row gap-3.5 items-start">
          {/* Main Left Workspace */}
          <main className="flex-1 min-w-0 w-full space-y-3">
            {/* 23 Operational Navigation Tabs */}
            <ReverseLogisticsTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* 3 Equal-Height Analytics Charts Row */}
            <ReverseLogisticsAnalytics returns={returnCases} />

            {/* 10 Circular Scorecards */}
            <ReverseLogisticsHealthScorecard
              onRefresh={loadData}
              onClearAll={() => setActiveTab("Overview")}
              onSaveView={() => alert("View saved.")}
            />

            {/* Multi-Row Grid Filter Panel */}
            <ReverseLogisticsFilterPanel
              onFilterChange={(filters) => {
                void reverseLogisticsService.getReturnCases(filters).then(setReturnCases);
              }}
              onClearAll={loadData}
            />

            {/* Returns & Reverse Logistics Portfolio Table (284 Records) */}
            <ReverseLogisticsPortfolioTable
              returns={returnCases}
              selectedReturnId={selectedReturn?.id}
              onSelectReturn={(r) => setSelectedReturn(r)}
              onEditReturn={(r) => {
                setSelectedReturn(r);
                setIsCreateModalOpen(true);
              }}
              loading={loading}
            />

            {/* Selected Return Preview (25 Sub-tabs, Summary Cards, 20-Stage Timeline) */}
            {selectedReturn && (
              <SelectedReturnPreview
                returnCase={selectedReturn}
                onUpdateStatus={(status) => handleUpdateStatus(selectedReturn.id, status)}
              />
            )}
          </main>

          {/* Right-Side Reverse Logistics Intelligence Rail */}
          {intelligence && (
            <ReverseLogisticsRightRail
              data={intelligence}
              onSelectAction={(actionName) => alert(`Action triggered: ${actionName}`)}
            />
          )}
        </div>
      </div>

      {/* Create Return Collection Modal */}
      <CreateReturnCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCollection}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
