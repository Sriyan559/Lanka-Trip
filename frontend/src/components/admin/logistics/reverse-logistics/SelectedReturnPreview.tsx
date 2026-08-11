"use client";

import React, { useState } from "react";
import { ReturnCase } from "@/types/logistics/reverseLogistics";
import { StatusBadge } from "../shared/StatusBadge";
import { DetailCard } from "../shared/DetailCard";
import { ReusableTabs } from "../shared/ReusableTabs";
import { StatusTimeline, TimelineStep } from "../shared/StatusTimeline";
import { CheckCircle2, RotateCcw } from "lucide-react";

interface SelectedReturnPreviewProps {
  returnCase: ReturnCase;
  onUpdateStatus?: (status: string) => void;
}

const DETAIL_SUB_TABS = [
  "Overview",
  "Eligibility",
  "Order",
  "Customer",
  "Product",
  "Collection",
  "Reverse Shipment",
  "Tracking",
  "Warehouse Receipt",
  "Inspection",
  "Condition",
  "Disposition",
  "Restock",
  "Quarantine",
  "Supplier Return",
  "Exchange",
  "Refund Dependency",
  "Costs",
  "Holds",
  "Exceptions",
  "Reconciliation",
  "SLA",
  "Linked Records",
  "Communications",
  "Activity",
  "Audit History",
];

export function SelectedReturnPreview({
  returnCase,
  onUpdateStatus,
}: SelectedReturnPreviewProps) {
  const [activeSubTab, setActiveSubTab] = useState("Overview");

  const timelineSteps: TimelineStep[] = (returnCase.lifecycleTimeline || []).map((st) => ({
    label: st.stage,
    timestamp: st.timestamp,
    status: st.completed ? (st.current ? "current" : "completed") : "pending",
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-3">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-gray-900 tracking-tight">
                Selected Return Preview: {returnCase.returnRef}
              </h2>
              <StatusBadge status={returnCase.collectionStatus} size="sm" />
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Selected Case
              </span>
            </div>
            <p className="text-[10.5px] text-gray-500 font-normal mt-0.5">
              Type: <span className="font-semibold text-gray-800">{returnCase.returnType}</span> |{" "}
              Order: <span className="font-semibold text-gray-800">{returnCase.orderRef}</span> |{" "}
              Customer: <span className="font-semibold text-gray-800">{returnCase.customerName}</span> |{" "}
              Value: <span className="font-mono font-bold text-gray-900">LKR {returnCase.returnValue.toLocaleString()}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onUpdateStatus && (
            <button
              type="button"
              onClick={() => onUpdateStatus("In Transit")}
              className="text-[10.5px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-1 rounded transition-colors"
            >
              Update Tracking
            </button>
          )}
          {onUpdateStatus && (
            <button
              type="button"
              onClick={() => onUpdateStatus("On Hold")}
              className="text-[10.5px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded transition-colors"
            >
              Place On Hold
            </button>
          )}
        </div>
      </div>

      {/* 25 Sub-Tabs */}
      <div className="border-b border-gray-100 pb-1">
        <ReusableTabs
          tabs={DETAIL_SUB_TABS}
          activeTab={activeSubTab}
          onTabChange={setActiveSubTab}
        />
      </div>

      {/* Overview Tab Content (6 Detail Cards Grid) */}
      {activeSubTab === "Overview" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {/* 1. Return Identity & Linked Information */}
            <DetailCard title="Return Identity & Linked Information">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Return Reference:</span>
                  <span className="font-mono font-bold text-rose-700">{returnCase.returnRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Return Type:</span>
                  <span className="font-bold text-gray-900">{returnCase.returnType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Reference:</span>
                  <span className="font-mono text-gray-900">{returnCase.orderRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer:</span>
                  <span className="font-bold text-gray-900">{returnCase.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact:</span>
                  <span className="text-gray-800">{returnCase.customerContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Return Value:</span>
                  <span className="font-mono font-bold text-gray-900">LKR {returnCase.returnValue.toLocaleString()}</span>
                </div>
              </div>
            </DetailCard>

            {/* 2. Collection Management */}
            <DetailCard title="Collection Management">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-bold text-gray-900">{returnCase.collectionMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Carrier:</span>
                  <span className="font-bold text-gray-900">{returnCase.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Collection Status:</span>
                  <span className="font-bold text-emerald-700">{returnCase.collectionStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Scheduled Date:</span>
                  <span className="text-gray-900">{returnCase.collectionScheduledDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Scheduled By:</span>
                  <span className="font-semibold text-gray-800">Nimal W.</span>
                </div>
              </div>
            </DetailCard>

            {/* 3. Reverse Shipment & Tracking */}
            <DetailCard title="Reverse Shipment & Tracking">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Reverse Shipment:</span>
                  <span className="font-mono font-bold text-gray-900">{returnCase.reverseShipmentRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking Number:</span>
                  <span className="font-mono text-gray-900">{returnCase.reverseTrackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Status:</span>
                  <span className="font-bold text-blue-700">{returnCase.shipmentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ETA Warehouse:</span>
                  <span className="text-gray-900">{returnCase.expectedArrivalDate}</span>
                </div>
              </div>
            </DetailCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {/* 4. Warehouse Receipt & Inspection */}
            <DetailCard title="Warehouse Receipt & Inspection">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination WH:</span>
                  <span className="font-bold text-gray-900">{returnCase.destinationWarehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Receipt Status:</span>
                  <span className="font-bold text-amber-700">{returnCase.receiptStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inspection Status:</span>
                  <span className="font-bold text-amber-700">{returnCase.inspectionStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expected Inspection:</span>
                  <span className="text-gray-900">May 29, 2025</span>
                </div>
              </div>
            </DetailCard>

            {/* 5. Disposition Management */}
            <DetailCard title="Disposition Management">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Proposed Disposition:</span>
                  <span className="font-bold text-gray-900">{returnCase.proposedDisposition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Proposed By:</span>
                  <span className="text-gray-800">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Approval Status:</span>
                  <span className="font-bold text-amber-700">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Restock Eligibility:</span>
                  <span className="font-bold text-emerald-700">Eligible</span>
                </div>
              </div>
            </DetailCard>

            {/* 6. Post Disposition Summary */}
            <DetailCard title="Post Disposition Summary">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Restock Status:</span>
                  <span className="font-bold text-amber-700">{returnCase.restockStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quarantine Status:</span>
                  <span className="text-gray-800">Not Required</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Supplier Return Status:</span>
                  <span className="text-gray-800">Not Applicable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Refund Dependency:</span>
                  <span className="font-bold text-amber-700">{returnCase.refundDependencyStatus}</span>
                </div>
              </div>
            </DetailCard>
          </div>
        </div>
      )}

      {/* Sub-Tabs Fallback View */}
      {activeSubTab !== "Overview" && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-800">
            {activeSubTab} Details for {returnCase.returnRef}
          </p>
          <p className="mt-1">Displaying inspection, condition, and financial disposition logs for {activeSubTab.toLowerCase()}.</p>
        </div>
      )}

      {/* Reverse Logistics Lifecycle Workflow Timeline */}
      <div className="border-t border-gray-100 pt-2.5">
        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight mb-2">
          Reverse Logistics Lifecycle / Workflow Timeline
        </h4>
        <StatusTimeline steps={timelineSteps} />
      </div>
    </div>
  );
}
