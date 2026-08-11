"use client";

import React, { useState } from "react";
import { ReturnDetailHeader } from "../admin/logistics/reverse-logistics-detail/ReturnDetailHeader";
import { ReturnExceptionBanner } from "../admin/logistics/reverse-logistics-detail/ReturnExceptionBanner";
import { ReturnDetailContextBar } from "../admin/logistics/reverse-logistics-detail/ReturnDetailContextBar";
import { ReturnWorkflowActions } from "../admin/logistics/reverse-logistics-detail/ReturnWorkflowActions";
import { ReturnDetailKPIGrid } from "../admin/logistics/reverse-logistics-detail/ReturnDetailKPIGrid";
import { ReturnDetailCardsGrid } from "../admin/logistics/reverse-logistics-detail/ReturnDetailCardsGrid";
import { ReturnDetailTabs } from "../admin/logistics/reverse-logistics-detail/ReturnDetailTabs";
import { ReturnLifecycleSection } from "../admin/logistics/reverse-logistics-detail/ReturnLifecycleSection";
import { ReturnDetailAnalytics } from "../admin/logistics/reverse-logistics-detail/ReturnDetailAnalytics";
import { ReturnDetailHealthScorecard } from "../admin/logistics/reverse-logistics-detail/ReturnDetailHealthScorecard";
import { ReturnDetailFilterBar } from "../admin/logistics/reverse-logistics-detail/ReturnDetailFilterBar";
import { ReturnDetailPortfolioContext } from "../admin/logistics/reverse-logistics-detail/ReturnDetailPortfolioContext";
import { ReverseLogisticsRightRail } from "../admin/logistics/reverse-logistics/ReverseLogisticsRightRail";
import { DetailCard } from "../admin/logistics/shared/DetailCard";
import { StatusBadge } from "../admin/logistics/shared/StatusBadge";
import { ReturnCase, ReverseLogisticsIntelligenceData } from "@/types/logistics/reverseLogistics";
import { sampleReturnDetailRecord } from "@/data/logistics/reverseLogistics/reverseLogisticsMockData";
import { useRouter } from "next/navigation";

interface ReturnReverseLogisticsDetailsProps {
  returnCase?: ReturnCase;
  portfolioCases?: ReturnCase[];
  intelligence?: ReverseLogisticsIntelligenceData | null;
  onRefresh?: () => void;
  onUpdateStatus?: (status: string) => void;
}

export function ReturnReverseLogisticsDetails({
  returnCase = sampleReturnDetailRecord,
  portfolioCases = [sampleReturnDetailRecord],
  intelligence,
  onRefresh,
  onUpdateStatus,
}: ReturnReverseLogisticsDetailsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto space-y-3">
        {/* Page Header & Breadcrumbs */}
        <ReturnDetailHeader
          returnRef={returnCase.returnRef}
          onExport={() => alert("Exporting return detail PDF...")}
          onReviewException={() => alert("Opening return exception queue...")}
          onCreateReview={() => alert("Creating reverse logistics review...")}
        />

        {/* Warning / Exception Banner */}
        <ReturnExceptionBanner />

        {/* Business Scope Context Strip & 8 Health Badges */}
        <ReturnDetailContextBar
          returnCase={returnCase}
          onRefresh={onRefresh}
        />

        {/* Workflow Action Buttons Bar */}
        <ReturnWorkflowActions
          returnCase={returnCase}
          onRescheduleCollection={() => onUpdateStatus?.("Collection Rescheduled")}
          onReassignCarrier={() => onUpdateStatus?.("Carrier Reassigned")}
          onPlaceHold={() => onUpdateStatus?.("On Hold")}
          onConfirmReceipt={() => onUpdateStatus?.("Warehouse Receipt Confirmed")}
          onStartInspection={() => onUpdateStatus?.("Inspection Started")}
        />

        {/* 12 KPI / Mini Metrics Grid */}
        <ReturnDetailKPIGrid returnCase={returnCase} />

        {/* 5 Key Return Detail Information Cards Grid */}
        <ReturnDetailCardsGrid returnCase={returnCase} />

        {/* 10 Operational Detail Sections (Summary, Eligibility, Collection, Reverse Shipment, Receipt, Inspection, Disposition, Supplier Return, Refund Dependency, SLA & Exceptions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-3">
          {/* 1. Return Summary */}
          <DetailCard title="1. Return Summary">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Return ID:</span>
                <span className="font-mono font-bold text-rose-700">{returnCase.returnRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono text-gray-900">{returnCase.orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-900">{returnCase.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Return Status:</span>
                <StatusBadge status={returnCase.shipmentStatus} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Return Reason:</span>
                <span className="text-gray-900 font-medium">{returnCase.returnReason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created Date:</span>
                <span className="text-gray-800">May 24, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">SLA Status:</span>
                <StatusBadge status={returnCase.slaStatus} size="sm" />
              </div>
            </div>
          </DetailCard>

          {/* 2. Return Eligibility */}
          <DetailCard title="2. Return Eligibility">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Eligibility Status:</span>
                <StatusBadge status={returnCase.returnEligibility} variant="success" size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Policy Validation:</span>
                <span className="font-mono text-emerald-700 font-bold">Passed (RTN-BEAUTY-004)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Eligible Items:</span>
                <span className="font-bold text-gray-900">1 Item (Glow Serum 30ml)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Eligibility Decision:</span>
                <span className="font-bold text-emerald-700">Approved for Home Collection</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Validation Info:</span>
                <span className="text-gray-800">Within 14-day window</span>
              </div>
            </div>
          </DetailCard>

          {/* 3. Collection Details */}
          <DetailCard title="3. Collection Details">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Collection Status:</span>
                <StatusBadge status={returnCase.collectionStatus} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Collection Address:</span>
                <span className="text-gray-900 font-semibold">Verified (Colombo 07)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Scheduled Date:</span>
                <span className="text-gray-800">May 25, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Attempts:</span>
                <span className="font-bold text-gray-900">2 (Attempt 2 Success)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Courier/Carrier:</span>
                <span className="font-bold text-gray-900">{returnCase.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Collection Notes:</span>
                <span className="text-gray-700 italic">Seal intact on pickup</span>
              </div>
            </div>
          </DetailCard>

          {/* 4. Reverse Shipment & Tracking */}
          <DetailCard title="4. Reverse Shipment & Tracking">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Shipment ID:</span>
                <span className="font-mono font-bold text-gray-900">{returnCase.reverseShipmentRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Carrier:</span>
                <span className="font-bold text-gray-900">{returnCase.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Number:</span>
                <span className="font-mono text-gray-900">{returnCase.reverseTrackingNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Shipment Status:</span>
                <StatusBadge status={returnCase.shipmentStatus} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pickup Date:</span>
                <span className="text-gray-800">May 25, 2025 10:15 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Location:</span>
                <span className="font-semibold text-blue-700">Colombo North Hub</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ETA WH:</span>
                <span className="text-gray-800">{returnCase.expectedArrivalDate}</span>
              </div>
            </div>
          </DetailCard>

          {/* 5. Return Receipt */}
          <DetailCard title="5. Return Receipt">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Expected Arrival:</span>
                <span className="text-gray-800">{returnCase.expectedArrivalDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Receiving WH:</span>
                <span className="font-bold text-gray-900">{returnCase.destinationWarehouse}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Receipt Status:</span>
                <StatusBadge status={returnCase.receiptStatus} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Received By:</span>
                <span className="text-gray-800">Pending Gate Scan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Package Condition:</span>
                <span className="text-gray-800">Awaiting Inbound Inspection</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Qty Expected / Received:</span>
                <span className="font-mono font-bold text-gray-900">1 / 0</span>
              </div>
            </div>
          </DetailCard>
        </div>

        {/* Row 2 of Operational Detail Sections (Inspection, Disposition, Supplier Return, Refund Dependency, SLA & Exceptions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-3">
          {/* 6. Inspection */}
          <DetailCard title="6. Inspection">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Inspection Status:</span>
                <StatusBadge status={returnCase.inspectionStatus} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Inspection Window:</span>
                <span className="text-gray-800">May 26 - May 28, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Inspector:</span>
                <span className="text-gray-800">TBD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Item Condition:</span>
                <span className="text-gray-800">Pending Receipt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Evidence / Attachments:</span>
                <span className="font-semibold text-rose-700">2 Customer Photos Uploaded</span>
              </div>
            </div>
          </DetailCard>

          {/* 7. Disposition */}
          <DetailCard title="7. Disposition">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Proposed Decision:</span>
                <span className="font-bold text-amber-700">{returnCase.proposedDisposition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Approved Decision:</span>
                <span className="text-gray-800">Pending Inspection</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Restock Option:</span>
                <span className="text-gray-800">Pending QA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Quarantine Option:</span>
                <span className="text-gray-800">Not Requested</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Disposition Reason:</span>
                <span className="text-gray-800">Shade mismatch verification required</span>
              </div>
            </div>
          </DetailCard>

          {/* 8. Supplier Return */}
          <DetailCard title="8. Supplier Return">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Supplier / Brand:</span>
                <span className="font-bold text-gray-900">{returnCase.supplierName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Supplier Return Status:</span>
                <StatusBadge status={returnCase.supplierReturnStatus || "Pending"} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Supplier Shipment:</span>
                <span className="font-mono text-gray-800">N/A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Supplier Tracking:</span>
                <span className="font-mono text-gray-800">N/A</span>
              </div>
            </div>
          </DetailCard>

          {/* 9. Refund Dependency */}
          <DetailCard title="9. Refund Dependency">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Refund Status:</span>
                <StatusBadge status={returnCase.refundDependencyStatus} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Refund Amount:</span>
                <span className="font-mono font-bold text-gray-900">LKR {returnCase.returnValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Finance Reference:</span>
                <span className="font-mono text-gray-800">FIN-DEP-99218</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dependency Rule:</span>
                <span className="font-semibold text-rose-700">Inspection Pass Required</span>
              </div>
            </div>
          </DetailCard>

          {/* 10. SLA & Exceptions */}
          <DetailCard title="10. SLA & Exceptions">
            <div className="text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">SLA Target:</span>
                <span className="font-semibold text-gray-900">5 Business Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Current SLA Status:</span>
                <StatusBadge status={returnCase.slaStatus} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Exception Status:</span>
                <StatusBadge status="1 Exception Recorded" variant="warning" size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Exception Reason:</span>
                <span className="text-amber-800 font-medium">Attempt 1 customer unavailable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Related Claim:</span>
                <span className="font-mono text-gray-800">CLM-2025-0041</span>
              </div>
            </div>
          </DetailCard>
        </div>

        {/* Main Workspace Layout */}
        <div className="flex flex-col xl:flex-row gap-3.5 items-start">
          {/* Main Left Workspace */}
          <main className="flex-1 min-w-0 w-full space-y-3">
            {/* 25 Sub-Tabs */}
            <ReturnDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* 20 Workflow Stages Timeline & Exception Branches */}
            <ReturnLifecycleSection returnCase={returnCase} />

            {/* 3 Equal-Height Analytics Charts Row */}
            <ReturnDetailAnalytics />

            {/* Operations Health Scorecard */}
            <ReturnDetailHealthScorecard
              onRefresh={onRefresh}
              onClearAll={() => setActiveTab("Overview")}
              onSaveView={() => alert("View saved.")}
            />

            {/* 18-Dropdown Filter Controls Bar */}
            <ReturnDetailFilterBar
              onRefresh={onRefresh}
              onFilterChange={(filters) => console.log("Filter update:", filters)}
            />

            {/* Portfolio Context Table + Selected Return Preview */}
            <ReturnDetailPortfolioContext
              currentReturn={returnCase}
              portfolioCases={portfolioCases}
              onSelectReturn={(rc) => {
                router.push(`/admin/logistics/reverse-logistics/${rc.id}`);
              }}
            />
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
    </div>
  );
}
