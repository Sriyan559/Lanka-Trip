"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShipmentDetail } from "@/types/logistics/shipment";
import { shipmentService } from "@/services/logistics/shipmentService";

// Shared Reusable UI Components
import { AlertBanner } from "@/components/admin/logistics/shared/AlertBanner";
import { ReusableTabs } from "@/components/admin/logistics/shared/ReusableTabs";
import { ConfirmationModal } from "@/components/admin/logistics/shared/ConfirmationModal";

// Shipment Specific Components
import { ShipmentTopHeader } from "@/components/admin/logistics/shipment/ShipmentTopHeader";
import { ShipmentActionBar } from "@/components/admin/logistics/shipment/ShipmentActionBar";
import { ShipmentMetadataStrip } from "@/components/admin/logistics/shipment/ShipmentMetadataStrip";
import { ShipmentKPIGrid } from "@/components/admin/logistics/shipment/ShipmentKPIGrid";
import { ShipmentOverviewCards } from "@/components/admin/logistics/shipment/ShipmentOverviewCards";
import { ShipmentLifecycleSection } from "@/components/admin/logistics/shipment/ShipmentLifecycleSection";
import { PackageTable } from "@/components/admin/logistics/shipment/PackageTable";
import { CarrierAssignmentSection } from "@/components/admin/logistics/shipment/CarrierAssignmentSection";
import { PickupOperationsSection } from "@/components/admin/logistics/shipment/PickupOperationsSection";
import { TrackingEventsSection } from "@/components/admin/logistics/shipment/TrackingEventsSection";
import { TransitOperationsSection } from "@/components/admin/logistics/shipment/TransitOperationsSection";
import { DeliveryAttemptsSection } from "@/components/admin/logistics/shipment/DeliveryAttemptsSection";
import { PODGovernanceSection } from "@/components/admin/logistics/shipment/PODGovernanceSection";
import { FinancialHoldSLAGrid } from "@/components/admin/logistics/shipment/FinancialHoldSLAGrid";
import { ShipmentIntelligencePanel } from "@/components/admin/logistics/shipment/ShipmentIntelligencePanel";

const LG08_TABS = [
  "Overview",
  "Fulfilment",
  "Order",
  "Packages",
  "Carrier",
  "Pickup",
  "Tracking",
  "Transit",
  "Delivery",
  "Proof of Delivery",
  "COD",
  "Costs",
  "Returns",
  "Holds",
  "Exceptions",
  "Reconciliation",
  "SLA",
  "Linked Records",
  "Communications",
  "Activity",
  "Audit History",
];

interface ShipmentDetailCarrierTrackingProps {
  shipmentId?: string;
  initialShipment?: ShipmentDetail | null;
}

export function ShipmentDetailCarrierTracking({
  shipmentId = "SHP-2025-006921",
  initialShipment = null,
}: ShipmentDetailCarrierTrackingProps) {
  const router = useRouter();

  const [shipment, setShipment] = useState<ShipmentDetail | null>(initialShipment);
  const [loading, setLoading] = useState(!initialShipment);
  const [activeTab, setActiveTab] = useState("Overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Modal States
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    actionType: string;
    isDestructive?: boolean;
    requireReason?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    actionType: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const loadShipmentData = async () => {
    setLoading(true);
    try {
      const data = await shipmentService.getShipment(shipmentId);
      setShipment(data);
    } catch (err) {
      console.error("Failed to load shipment", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialShipment) {
      void loadShipmentData();
    }
  }, [shipmentId, initialShipment]);

  if (loading || !shipment) {
    return (
      <div className="min-h-screen bg-[#faf8f8] p-4 font-sans space-y-4 max-w-[1920px] mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-20 bg-gray-200 rounded w-full" />
        <div className="h-24 bg-gray-200 rounded w-full" />
        <div className="h-64 bg-gray-200 rounded w-full" />
      </div>
    );
  }

  // Action handlers
  const handleRefreshTracking = async () => {
    setLoadingAction("refreshTracking");
    const res = await shipmentService.refreshTracking(shipment.shipmentRef);
    setLoadingAction(null);
    if (res.success) {
      showToast(res.message);
      void loadShipmentData();
    }
  };

  const handleModalAction = async (reason?: string) => {
    setLoadingAction(modalConfig.actionType);
    if (modalConfig.actionType === "placeHold") {
      const res = await shipmentService.placeHold(shipment.shipmentRef, reason || "Admin hold");
      showToast(res.message);
    } else if (modalConfig.actionType === "releaseHold") {
      const res = await shipmentService.releaseHold(shipment.shipmentRef);
      showToast(res.message);
    } else if (modalConfig.actionType === "startRTO") {
      const res = await shipmentService.startReturnToOrigin(shipment.shipmentRef);
      showToast(res.message);
    } else if (modalConfig.actionType === "startDeliveryRetry") {
      const res = await shipmentService.startDeliveryRetry(shipment.shipmentRef);
      showToast(res.message);
    } else if (modalConfig.actionType === "closeShipment") {
      showToast(`Shipment ${shipment.shipmentRef} has been closed.`);
    }
    setLoadingAction(null);
    void loadShipmentData();
  };

  const openHoldModal = () => {
    setModalConfig({
      isOpen: true,
      title: "Place Operational Shipment Hold",
      message:
        "Placing a hold will halt dispatch, pickup, and carrier handoff for this shipment. Please enter the reason for audit compliance.",
      actionType: "placeHold",
      isDestructive: false,
      requireReason: true,
    });
  };

  const openReleaseHoldModal = () => {
    setModalConfig({
      isOpen: true,
      title: "Release Approved Shipment Hold",
      message:
        "Releasing the approved hold will re-enable operational dispatch and carrier pickup.",
      actionType: "releaseHold",
      isDestructive: false,
    });
  };

  const openRTOModal = () => {
    setModalConfig({
      isOpen: true,
      title: "Initiate Return to Origin (RTO)",
      message:
        "Are you sure you want to trigger Return to Origin? The carrier will be requested to reverse transit to origin facility.",
      actionType: "startRTO",
      isDestructive: true,
      requireReason: true,
    });
  };

  const openCloseShipmentModal = () => {
    setModalConfig({
      isOpen: true,
      title: "Close Shipment Record",
      message:
        "Closing the shipment locks all tracking events, cost reconciliations, and proof of delivery records.",
      actionType: "closeShipment",
      isDestructive: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto space-y-2">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 font-bold hover:text-emerald-900"
            >
              &times;
            </button>
          </div>
        )}

        {/* 1. BREADCRUMBS, TITLE & PRIMARY ACTIONS */}
        <ShipmentTopHeader
          shipmentId={shipment.shipmentRef}
          onRefresh={handleRefreshTracking}
          onExport={() => showToast(`Detail exported for ${shipment.shipmentRef}`)}
          onReviewException={() =>
            router.push("/admin/logistics/exceptions-reconciliation")
          }
          onCreateReview={() => showToast("Review case created.")}
        />

        {/* 2. SECONDARY OPERATIONAL ACTION BUTTONS STRIP */}
        <ShipmentActionBar
          loadingAction={loadingAction}
          onRefreshTracking={handleRefreshTracking}
          onReassignCarrier={() =>
            showToast("Reassign carrier drawer opened.")
          }
          onReschedulePickup={() =>
            showToast("Reschedule pickup window initiated.")
          }
          onConfirmHandoff={() =>
            showToast("Carrier handoff confirmed by dispatch.")
          }
          onStartDeliveryRetry={() =>
            showToast("Delivery retry requested.")
          }
          onRequestAddressValidation={() =>
            showToast("Address validation requested.")
          }
          onStartRTO={openRTOModal}
          onReviewPOD={() =>
            showToast("POD Governance review active.")
          }
          onPlaceHold={openHoldModal}
          onReleaseHold={openReleaseHoldModal}
          onStartReconciliation={() =>
            router.push("/admin/logistics/exceptions-reconciliation")
          }
          onCloseShipment={openCloseShipmentModal}
        />

        {/* 3. WARNING / ALERT BANNER */}
        <AlertBanner
          type="warning"
          message="This shipment was updated by another administrator. Please refresh tracking and review the latest state before taking action."
          actionText="Refresh Tracking Now"
          onAction={handleRefreshTracking}
        />

        {/* 4. BUSINESS CONTEXT & SERVICE HEALTH STRIP */}
        <ShipmentMetadataStrip shipment={shipment} />

        {/* 5. 12 KPI / METRIC CARDS ROW */}
        <ShipmentKPIGrid kpis={shipment.kpis} />

        {/* MAIN CONTENT + RIGHT INTELLIGENCE PANEL LAYOUT */}
        <div className="flex flex-col xl:flex-row gap-3.5 items-start">
          {/* LEFT / CENTER WORKSPACE */}
          <main className="flex-1 min-w-0 w-full space-y-3">
            {/* 6. MAIN SHIPMENT OVERVIEW CARDS + STATUS SNAPSHOT */}
            <ShipmentOverviewCards shipment={shipment} />

            {/* 7. SHIPMENT TABS NAVIGATION (21 TABS) */}
            <div className="bg-white border border-gray-200 rounded-lg p-1.5 shadow-2xs">
              <ReusableTabs
                tabs={LG08_TABS}
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab)}
              />
            </div>

            {/* TAB CONTENT SECTIONS */}
            {/* 8. 20-STAGE SHIPMENT LIFECYCLE TIMELINE */}
            <ShipmentLifecycleSection currentState={shipment.shipmentState} />

            {/* SECTION 1: PACKAGES */}
            <PackageTable packages={shipment.packages} />

            {/* SECTION 2: CARRIER ASSIGNMENT & ALTERNATIVES */}
            <CarrierAssignmentSection
              currentCarrier={shipment.carrierAssignment}
              alternatives={shipment.carrierAlternatives}
              onSelectCarrier={(id) =>
                showToast(`Carrier ${id} selected for handoff optimization.`)
              }
            />

            {/* SECTION 3: PICKUP OPERATIONS */}
            <PickupOperationsSection pickup={shipment.pickup} />

            {/* SECTION 4 & 5: TRACKING EVENTS & INTEGRITY */}
            <TrackingEventsSection
              events={shipment.trackingEvents}
              integrity={shipment.trackingIntegrity}
            />

            {/* SECTION 6: TRANSIT OPERATIONS */}
            <TransitOperationsSection transit={shipment.transit} />

            {/* SECTION 7: DELIVERY ATTEMPTS / RETRY */}
            <DeliveryAttemptsSection attempts={shipment.deliveryAttemptsList} />

            {/* SECTION 8: PROOF OF DELIVERY GOVERNANCE */}
            <PODGovernanceSection pod={shipment.pod} />

            {/* SECTIONS 9–12: FINANCIAL, HOLDS, EXCEPTIONS & SLA SUMMARY GRID */}
            <FinancialHoldSLAGrid
              cod={shipment.cod}
              costs={shipment.costs}
              reconciliation={shipment.reconciliation}
              holds={shipment.holds}
              exceptions={shipment.exceptions}
              sla={shipment.sla}
            />
          </main>

          {/* RIGHT-SIDE SHIPMENT INTELLIGENCE PANEL */}
          <ShipmentIntelligencePanel
            intelligence={shipment.intelligence}
            onRefreshTracking={handleRefreshTracking}
            onReassignCarrier={() => showToast("Reassign Carrier triggered.")}
            onReschedulePickup={() => showToast("Reschedule Pickup triggered.")}
            onStartDeliveryRetry={() => showToast("Delivery Retry triggered.")}
            onReviewPOD={() => showToast("Review POD triggered.")}
            onStartRTO={openRTOModal}
            onReviewException={() =>
              router.push("/admin/logistics/exceptions-reconciliation")
            }
          />
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        isDestructive={modalConfig.isDestructive}
        requireReason={modalConfig.requireReason}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleModalAction}
      />
    </div>
  );
}
