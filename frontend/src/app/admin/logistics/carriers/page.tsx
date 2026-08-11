"use client";

import React, { useState, useEffect } from "react";
import { CarrierPageHeader } from "@/components/admin/logistics/carrier/CarrierPageHeader";
import { CarrierContextBar } from "@/components/admin/logistics/carrier/CarrierContextBar";
import { CarrierKPIGrid } from "@/components/admin/logistics/carrier/CarrierKPIGrid";
import { CarrierTabs } from "@/components/admin/logistics/carrier/CarrierTabs";
import { CarrierAnalytics } from "@/components/admin/logistics/carrier/CarrierAnalytics";
import { CarrierPerformanceIndicators } from "@/components/admin/logistics/carrier/CarrierPerformanceIndicators";
import { CarrierOperatingDirectory } from "@/components/admin/logistics/carrier/CarrierOperatingDirectory";
import { CarrierDetailPanel } from "@/components/admin/logistics/carrier/CarrierDetailPanel";
import { CarrierNetworkIntelligence } from "@/components/admin/logistics/carrier/CarrierNetworkIntelligence";
import { CarrierForm } from "@/components/admin/logistics/carrier/CarrierForm";
import { ConfirmationModal } from "@/components/admin/logistics/shared/ConfirmationModal";
import { AlertBanner } from "@/components/admin/logistics/shared/AlertBanner";
import { carrierService } from "@/services/logistics/carrierService";
import {
  Carrier,
  CarrierDashboardMetrics,
  CarrierNetworkIntelligenceData,
} from "@/types/logistics/carrier";

export default function CarriersPage() {
  const [metrics, setMetrics] = useState<CarrierDashboardMetrics | null>(null);
  const [intelligence, setIntelligence] = useState<CarrierNetworkIntelligenceData | null>(null);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [selectedCarrier, setSelectedCarrier] = useState<Carrier | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);

  // Form & Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
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
      const [mRes, iRes, cRes] = await Promise.all([
        carrierService.getDashboardMetrics(),
        carrierService.getNetworkIntelligence(),
        carrierService.getCarriers({ tab: activeTab }),
      ]);
      setMetrics(mRes);
      setIntelligence(iRes);
      setCarriers(cRes);
      if (cRes.length > 0 && !selectedCarrier) {
        setSelectedCarrier(cRes[0]);
      }
    } catch (err) {
      console.error("Failed to load carrier data", err);
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

  const handleAddCarrier = (formData: any) => {
    void carrierService.createCarrier(formData).then((res) => {
      alert(`Carrier partner created successfully: ${res.carrier.carrierName}`);
      void loadData();
    });
  };

  const handleUpdateStatus = (carrierId: string, newStatus: string) => {
    setConfirmModal({
      isOpen: true,
      title: `Confirm Carrier Status Change`,
      message: `Are you sure you want to change status of carrier ${carrierId} to ${newStatus}? This will update carrier assignment rules across the logistics network.`,
      onConfirm: () => {
        void carrierService.updateCarrierStatus(carrierId, newStatus).then((res) => {
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
        {/* Top Header & Breadcrumbs */}
        <CarrierPageHeader
          onExport={() => alert("Exporting carrier operations report...")}
          onReviewExceptions={() => alert("Opening carrier exceptions review queue...")}
          onReviewSLABreaches={() => alert("Opening SLA breach review queue...")}
          onCreateReview={() => alert("Creating carrier performance review...")}
          onAddCarrier={() => setIsFormOpen(true)}
        />

        {/* Live Warning / Alert Banner */}
        <AlertBanner
          message="Notice: Koombiyo Delivery network capacity is currently exceeding 90% utilization. Recommended to reroute Western Province next-day volume to Pronto Express or Domex."
          type="warning"
        />

        {/* Business Scope Context Strip & 8 Health Badges */}
        <CarrierContextBar
          lastSynced={metrics?.lastSynced}
          onRefresh={loadData}
        />

        {/* 12 KPI Metric Cards Grid & Secondary Performance Rings Strip */}
        {metrics && <CarrierKPIGrid metrics={metrics} />}

        {/* Main Dashboard Layout Grid (Workspace Left + Intelligence Panel Right) */}
        <div className="flex flex-col xl:flex-row gap-3.5 items-start">
          {/* Main Left Workspace */}
          <main className="flex-1 min-w-0 w-full space-y-3">
            {/* 17 Operational Tabs Bar */}
            <CarrierTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* 3 Analytics Charts Row */}
            <CarrierAnalytics />

            {/* 10 Circular Progress Scorecard Items & Toolbar */}
            <CarrierPerformanceIndicators
              onRefresh={loadData}
              onClearAll={() => setActiveTab("Overview")}
              onSaveView={() => alert("Current view saved to preferences.")}
              onMoreFilters={() => alert("Filter drawer active.")}
            />

            {/* Carrier Operating Directory (18 Records Table) */}
            <CarrierOperatingDirectory
              carriers={carriers}
              selectedCarrierId={selectedCarrier?.id}
              onSelectCarrier={(c) => setSelectedCarrier(c)}
              onEditCarrier={(c) => {
                setSelectedCarrier(c);
                setIsFormOpen(true);
              }}
              onViewCarrierDetail={(id) => {
                const found = carriers.find((c) => c.id === id);
                if (found) setSelectedCarrier(found);
              }}
              loading={loading}
            />

            {/* Selected Carrier Detail Panel (21 Sub-Tabs, 8 Summary Cards & 16-Stage Lifecycle) */}
            {selectedCarrier && (
              <CarrierDetailPanel
                carrier={selectedCarrier}
                onUpdateStatus={(status) => handleUpdateStatus(selectedCarrier.id, status)}
              />
            )}
          </main>

          {/* Fixed/Right Intelligence Panel */}
          {intelligence && (
            <CarrierNetworkIntelligence
              data={intelligence}
              onSelectAction={(actionName) => alert(`Action triggered: ${actionName}`)}
            />
          )}
        </div>
      </div>

      {/* Add / Edit Carrier Modal Drawer */}
      <CarrierForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddCarrier}
        initialData={selectedCarrier}
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
