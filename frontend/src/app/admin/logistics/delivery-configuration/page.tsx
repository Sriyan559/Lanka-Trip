"use client";

import React, { useState, useEffect } from "react";
import { DeliveryConfigurationHeader } from "@/components/admin/logistics/delivery-configuration/DeliveryConfigurationHeader";
import { DeliveryConfigurationContextBar } from "@/components/admin/logistics/delivery-configuration/DeliveryConfigurationContextBar";
import { DeliveryConfigurationKPIGrid } from "@/components/admin/logistics/delivery-configuration/DeliveryConfigurationKPIGrid";
import { DeliveryConfigurationTabs } from "@/components/admin/logistics/delivery-configuration/DeliveryConfigurationTabs";
import { DeliveryConfigurationAnalytics } from "@/components/admin/logistics/delivery-configuration/DeliveryConfigurationAnalytics";
import { DeliveryConfigurationHealthScorecard } from "@/components/admin/logistics/delivery-configuration/DeliveryConfigurationHealthScorecard";
import { ConfigurationFilterPanel } from "@/components/admin/logistics/delivery-configuration/ConfigurationFilterPanel";
import { ConfigurationTable } from "@/components/admin/logistics/delivery-configuration/ConfigurationTable";
import { ConfigurationDetailPanel } from "@/components/admin/logistics/delivery-configuration/ConfigurationDetailPanel";
import { DeliveryConfigurationIntelligence } from "@/components/admin/logistics/delivery-configuration/DeliveryConfigurationIntelligence";
import { DeliveryRuleForm } from "@/components/admin/logistics/delivery-configuration/DeliveryRuleForm";
import { ImpactSimulationModal } from "@/components/admin/logistics/delivery-configuration/ImpactSimulationModal";
import { ConfirmationModal } from "@/components/admin/logistics/shared/ConfirmationModal";
import { AlertBanner } from "@/components/admin/logistics/shared/AlertBanner";
import { deliveryConfigurationService } from "@/services/logistics/deliveryConfigurationService";
import {
  ConfigurationMetrics,
  DeliveryConfigurationIntelligenceData,
  ConfigurationRecord,
} from "@/types/logistics/deliveryConfiguration";

export default function DeliveryConfigurationPage() {
  const [metrics, setMetrics] = useState<ConfigurationMetrics | null>(null);
  const [intelligence, setIntelligence] = useState<DeliveryConfigurationIntelligenceData | null>(null);
  const [configurations, setConfigurations] = useState<ConfigurationRecord[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<ConfigurationRecord | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isRuleFormOpen, setIsRuleFormOpen] = useState(false);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
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
        deliveryConfigurationService.getMetrics(),
        deliveryConfigurationService.getIntelligence(),
        deliveryConfigurationService.getConfigurations({ tab: activeTab }),
      ]);
      setMetrics(mRes);
      setIntelligence(iRes);
      setConfigurations(cRes);
      if (cRes.length > 0 && !selectedConfig) {
        setSelectedConfig(cRes[0]);
      }
    } catch (err) {
      console.error("Failed to load delivery configuration data", err);
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

  const handleCreateRule = (formData: Partial<ConfigurationRecord>) => {
    void deliveryConfigurationService.createDeliveryRule(formData).then((res) => {
      alert(`Delivery rule created successfully: ${res.rule.configName}`);
      void loadData();
    });
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setConfirmModal({
      isOpen: true,
      title: `Confirm Rule Status Change`,
      message: `Are you sure you want to change status of rule ${id} to ${newStatus}? This will recalculate zone coverage across the logistics network.`,
      onConfirm: () => {
        void deliveryConfigurationService.updateConfigurationStatus(id, newStatus).then((res) => {
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
        <DeliveryConfigurationHeader
          onExport={() => alert("Exporting delivery configuration report...")}
          onReviewConflicts={() => alert("Opening configuration conflicts review queue...")}
          onReviewCapacityRisks={() => alert("Opening capacity risks review queue...")}
          onCreateReview={() => alert("Creating configuration review...")}
          onCreateRule={() => setIsRuleFormOpen(true)}
        />

        {/* Live Warning Alert Banner */}
        <AlertBanner
          message="Notice: 12 zones are currently operating above 90% capacity limit. 8 configuration conflicts require immediate resolution before the next scheduled dispatch cut-off."
          type="warning"
        />

        {/* Business Scope Context Strip & 8 Health Badges */}
        <DeliveryConfigurationContextBar
          lastSynced={metrics?.lastSynced}
          onRefresh={loadData}
        />

        {/* 12 KPI Metric Cards & 6 Performance Rings Strip */}
        {metrics && <DeliveryConfigurationKPIGrid metrics={metrics} />}

        {/* Main Dashboard Layout Grid (Workspace Left + Intelligence Panel Right) */}
        <div className="flex flex-col xl:flex-row gap-3.5 items-start">
          {/* Main Left Workspace */}
          <main className="flex-1 min-w-0 w-full space-y-3">
            {/* 20 Operational Tabs Bar */}
            <DeliveryConfigurationTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* 3 Equal-Height Analytics Charts Row */}
            <DeliveryConfigurationAnalytics />

            {/* 10 Circular Health Scorecards & Filters Toolbar */}
            <DeliveryConfigurationHealthScorecard
              onRefresh={loadData}
              onClearAll={() => setActiveTab("Overview")}
              onSaveView={() => alert("View saved to preferences.")}
              onMoreFilters={() => alert("Filters drawer active.")}
            />

            {/* Multi-Row Grid Filter Panel */}
            <ConfigurationFilterPanel
              onFilterChange={(filters) => {
                void deliveryConfigurationService.getConfigurations(filters).then(setConfigurations);
              }}
              onClearAll={loadData}
            />

            {/* Delivery Configurations Directory (248 Records Table) */}
            <ConfigurationTable
              configurations={configurations}
              selectedConfigId={selectedConfig?.id}
              onSelectConfig={(c) => setSelectedConfig(c)}
              onEditConfig={(c) => {
                setSelectedConfig(c);
                setIsRuleFormOpen(true);
              }}
              onDuplicateConfig={(c) => {
                alert(`Duplicated configuration: ${c.configName}`);
              }}
              loading={loading}
            />

            {/* Selected Configuration Detail Panel (19 Sub-Tabs, Quick Stats, Hierarchy, Matrix, 20-Stage Workflow) */}
            {selectedConfig && (
              <ConfigurationDetailPanel
                config={selectedConfig}
                onRunSimulation={() => setIsSimulationOpen(true)}
                onUpdateStatus={(status) => handleUpdateStatus(selectedConfig.id, status)}
              />
            )}
          </main>

          {/* Fixed Right Intelligence Panel */}
          {intelligence && (
            <DeliveryConfigurationIntelligence
              data={intelligence}
              onSelectAction={(actionName) => alert(`Action triggered: ${actionName}`)}
            />
          )}
        </div>
      </div>

      {/* Add / Edit Delivery Rule Modal Drawer */}
      <DeliveryRuleForm
        isOpen={isRuleFormOpen}
        onClose={() => setIsRuleFormOpen(false)}
        onSubmit={handleCreateRule}
        initialData={selectedConfig}
      />

      {/* Impact Simulation Modal */}
      <ImpactSimulationModal
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
        onRunSimulation={(pct) => deliveryConfigurationService.runImpactSimulation(pct)}
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
