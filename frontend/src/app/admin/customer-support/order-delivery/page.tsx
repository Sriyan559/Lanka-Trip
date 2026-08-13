"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { OrderDeliveryHeader } from "@/components/admin/customer-support/order-delivery/OrderDeliveryHeader";
import { SourceConnectionsBar } from "@/components/admin/customer-support/order-delivery/SourceConnectionsBar";
import { DeliverySupportKpis } from "@/components/admin/customer-support/order-delivery/DeliverySupportKpis";
import { DeliverySupportTabs, DeliveryTabId } from "@/components/admin/customer-support/order-delivery/DeliverySupportTabs";
import { DeliverySupportFilters } from "@/components/admin/customer-support/order-delivery/DeliverySupportFilters";
import { DeliveryPortfolioTable } from "@/components/admin/customer-support/order-delivery/DeliveryPortfolioTable";
import { SelectedDeliveryCaseWorkspace } from "@/components/admin/customer-support/order-delivery/SelectedDeliveryCaseWorkspace";
import { DeliveryOperationsRail } from "@/components/admin/customer-support/order-delivery/DeliveryOperationsRail";

import {
  MOCK_DELIVERY_CASES,
  MOCK_SELECTED_CASE_DETAILS,
  MOCK_OPERATIONS_RAIL_DATA,
} from "@/components/admin/customer-support/order-delivery/mockData";
import { DeliverySupportCase } from "@/components/admin/customer-support/order-delivery/types";

export default function OrderDeliveryPage() {
  const [cases, setCases] = useState<DeliverySupportCase[]>(MOCK_DELIVERY_CASES);
  const [selectedCase, setSelectedCase] = useState<DeliverySupportCase>(MOCK_DELIVERY_CASES[0]);
  const [activeTab, setActiveTab] = useState<DeliveryTabId>("active-cases");
  const [selectedChip, setSelectedChip] = useState("requires-reply");

  // Header Actions
  const handleReviewEscalated = () => {
    setActiveTab("escalated");
    toast.success("Filtered to escalated delivery cases");
  };

  const handleReviewCarrierExceptions = () => {
    setActiveTab("carrier-exceptions");
    toast.success("Filtered to carrier exceptions");
  };

  const handleMoreActions = () => {
    toast.success("More actions dropdown toggled");
  };

  // Filter cases list
  const filteredCases = cases.filter((c) => {
    if (activeTab === "awaiting-dispatch" && c.issueType !== "Dispatch Delay") return false;
    if (activeTab === "shipment-delay" && c.issueType !== "Shipment Delay") return false;
    if (activeTab === "failed-delivery" && c.issueType !== "Failed Delivery") return false;
    if (activeTab === "tracking-issues" && c.issueType !== "Tracking Issue") return false;
    if (activeTab === "sla-at-risk" && c.slaStatus !== "At Risk") return false;

    return true;
  });

  return (
    <div className="w-full flex flex-col p-4 bg-slate-50/50 min-h-screen">
      {/* 1. Page Header */}
      <OrderDeliveryHeader
        onReviewEscalated={handleReviewEscalated}
        onReviewCarrierExceptions={handleReviewCarrierExceptions}
        onMoreActions={handleMoreActions}
      />

      {/* 2. Source Connections Integration Status Bar */}
      <SourceConnectionsBar />

      {/* 3. Top KPI Summary Cards */}
      <DeliverySupportKpis />

      {/* 4. Horizontal Delivery Tabs */}
      <DeliverySupportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filters (14 Selects, 8 Quick Chips, Summary Strip) */}
      <DeliverySupportFilters
        selectedChip={selectedChip}
        onChipChange={setSelectedChip}
        onUnread={() => toast.success("Filtered to unread messages")}
        onRefresh={() => toast.success("Order & delivery cases refreshed")}
        onSaveView={() => toast.success("Current view saved")}
        onViewAlerts={() => toast.success("Delivery alerts opened")}
      />

      {/* 6. Main 2-Column Desktop Area (Main Workspace ~83% | Operations Rail ~17%) */}
      <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
        {/* Main Content Workspace (~83% width) */}
        <div className="w-full xl:w-[83%] flex flex-col">
          {/* Portfolio Table */}
          <DeliveryPortfolioTable
            cases={filteredCases}
            selectedId={selectedCase.id}
            onSelect={setSelectedCase}
          />

          {/* Selected Delivery Case Workspace */}
          <SelectedDeliveryCaseWorkspace details={MOCK_SELECTED_CASE_DETAILS} />
        </div>

        {/* Right Operations Summary Rail (~17% width) */}
        <div className="w-full xl:w-[17%] shrink-0">
          <DeliveryOperationsRail data={MOCK_OPERATIONS_RAIL_DATA} />
        </div>
      </div>
    </div>
  );
}
