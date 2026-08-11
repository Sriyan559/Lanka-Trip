"use client";

import React, { useState } from "react";
import { ReturnCase } from "@/types/logistics/reverseLogistics";
import { StatusBadge } from "../shared/StatusBadge";
import { DetailCard } from "../shared/DetailCard";
import { ReusableTabs } from "../shared/ReusableTabs";
import { CheckCircle2, RotateCcw } from "lucide-react";

interface ReturnDetailPortfolioContextProps {
  currentReturn: ReturnCase;
  portfolioCases: ReturnCase[];
  onSelectReturn: (returnCase: ReturnCase) => void;
}

const PREVIEW_SUB_TABS = [
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

export function ReturnDetailPortfolioContext({
  currentReturn,
  portfolioCases,
  onSelectReturn,
}: ReturnDetailPortfolioContextProps) {
  const [activePreviewTab, setActivePreviewTab] = useState("Overview");

  return (
    <div className="space-y-3 mb-3">
      {/* Portfolio Context Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Returns, Collections &amp; Reverse Logistics Portfolio Context
          </h3>
          <span className="text-[10.5px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Active Context: {currentReturn.returnRef}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200 text-[10px]">
              <tr>
                <th className="p-1.5">Return Ref</th>
                <th className="p-1.5">Type</th>
                <th className="p-1.5">Order Ref</th>
                <th className="p-1.5">Fulfilment Ref</th>
                <th className="p-1.5">Original Shipment</th>
                <th className="p-1.5">Customer</th>
                <th className="p-1.5">Supplier</th>
                <th className="p-1.5">Product</th>
                <th className="p-1.5 text-center">Qty</th>
                <th className="p-1.5 text-right">Value</th>
                <th className="p-1.5">Reason</th>
                <th className="p-1.5">Collection</th>
                <th className="p-1.5">Status</th>
                <th className="p-1.5">Reverse Ship</th>
                <th className="p-1.5">Reverse Status</th>
                <th className="p-1.5">Receipt</th>
                <th className="p-1.5">Inspection</th>
                <th className="p-1.5">Disposition</th>
                <th className="p-1.5">Refund Dep.</th>
                <th className="p-1.5">SLA</th>
                <th className="p-1.5">Owner</th>
                <th className="p-1.5">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {portfolioCases.map((rc) => {
                const isSelected = rc.id === currentReturn.id;
                return (
                  <tr
                    key={rc.id}
                    onClick={() => onSelectReturn(rc)}
                    className={`hover:bg-rose-50/50 cursor-pointer transition-colors ${
                      isSelected ? "bg-rose-50/80 font-medium" : ""
                    }`}
                  >
                    <td className="p-1.5 font-mono font-bold text-rose-700">{rc.returnRef}</td>
                    <td className="p-1.5 text-gray-900">{rc.returnType}</td>
                    <td className="p-1.5 font-mono text-gray-800">{rc.orderRef}</td>
                    <td className="p-1.5 font-mono text-gray-700">{rc.fulfilmentRef}</td>
                    <td className="p-1.5 font-mono text-gray-700">{rc.originalShipment}</td>
                    <td className="p-1.5 font-bold text-gray-900">{rc.customerName}</td>
                    <td className="p-1.5 text-gray-800">{rc.supplierName}</td>
                    <td className="p-1.5 text-gray-900">{rc.productSku}</td>
                    <td className="p-1.5 text-center font-bold">{rc.quantity}</td>
                    <td className="p-1.5 text-right font-mono font-bold">
                      LKR {rc.returnValue.toLocaleString()}
                    </td>
                    <td className="p-1.5 text-gray-800">{rc.returnReason}</td>
                    <td className="p-1.5 text-gray-800">{rc.collectionMethod}</td>
                    <td className="p-1.5">
                      <StatusBadge status={rc.collectionStatus} size="sm" />
                    </td>
                    <td className="p-1.5 font-mono text-gray-800">{rc.reverseShipmentRef}</td>
                    <td className="p-1.5">
                      <StatusBadge status={rc.shipmentStatus} size="sm" />
                    </td>
                    <td className="p-1.5">
                      <StatusBadge status={rc.receiptStatus} size="sm" />
                    </td>
                    <td className="p-1.5">
                      <StatusBadge status={rc.inspectionStatus} size="sm" />
                    </td>
                    <td className="p-1.5">
                      <StatusBadge status={rc.proposedDisposition} size="sm" />
                    </td>
                    <td className="p-1.5">
                      <StatusBadge status={rc.refundDependencyStatus} size="sm" />
                    </td>
                    <td className="p-1.5">
                      <StatusBadge status={rc.slaStatus} size="sm" />
                    </td>
                    <td className="p-1.5 font-semibold text-gray-900">{rc.returnOwner}</td>
                    <td className="p-1.5 text-gray-600">{rc.updatedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Return Preview Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-black text-gray-900 tracking-tight">
              Selected Return Preview: {currentReturn.returnRef}
            </h3>
            <StatusBadge status={currentReturn.shipmentStatus} size="sm" />
          </div>

          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified Case Context
          </span>
        </div>

        {/* 26 Sub-Tabs */}
        <div className="border-b border-gray-100 pb-1">
          <ReusableTabs
            tabs={PREVIEW_SUB_TABS}
            activeTab={activePreviewTab}
            onTabChange={setActivePreviewTab}
          />
        </div>

        {/* Overview 6 Detailed Sections Grid */}
        {activePreviewTab === "Overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2.5">
            {/* 1. Return Identity & Linked Information */}
            <DetailCard title="1. Return Identity & Linked Information">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Return Ref:</span>
                  <span className="font-mono font-bold text-rose-700">{currentReturn.returnRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Return Type:</span>
                  <span className="font-bold text-gray-900">{currentReturn.returnType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Return State:</span>
                  <span className="font-bold text-amber-700">{currentReturn.shipmentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reason:</span>
                  <span className="text-gray-900">{currentReturn.returnReason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Owner:</span>
                  <span className="font-bold text-gray-900">{currentReturn.returnOwner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Related Order:</span>
                  <span className="font-mono text-gray-900">{currentReturn.orderRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fulfilment Ref:</span>
                  <span className="font-mono text-gray-900">{currentReturn.fulfilmentRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Original Shipment:</span>
                  <span className="font-mono text-gray-900">{currentReturn.originalShipment}</span>
                </div>
              </div>
            </DetailCard>

            {/* 2. Collection Management */}
            <DetailCard title="2. Collection Management">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-bold text-gray-900">{currentReturn.collectionMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Window:</span>
                  <span className="text-gray-900">{currentReturn.pickupWindow || "May 25, 09:00 - 12:00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact State:</span>
                  <span className="font-bold text-emerald-700">Reachable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address Validation:</span>
                  <span className="font-bold text-emerald-700">Verified</span>
                </div>
                {/* Collection Attempts List */}
                <div className="pt-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block mb-0.5">
                    Collection Attempts
                  </span>
                  <div className="space-y-1">
                    {(currentReturn.collectionAttempts || [
                      { attemptNumber: 1, timestamp: "May 25, 09:00", status: "Failed", notes: "Customer not available" },
                      { attemptNumber: 2, timestamp: "May 25, 10:15", status: "Collected", notes: "Collected successfully" },
                    ]).map((att) => (
                      <div
                        key={att.attemptNumber}
                        className="flex justify-between text-[10px] bg-gray-50 p-1 rounded border border-gray-100"
                      >
                        <span className="font-semibold text-gray-700">Attempt {att.attemptNumber}:</span>
                        <span
                          className={`font-bold ${
                            att.status === "Collected" ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {att.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DetailCard>

            {/* 3. Reverse Shipment & Tracking */}
            <DetailCard title="3. Reverse Shipment & Tracking">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Reverse Shipment Ref:</span>
                  <span className="font-mono font-bold text-gray-900">{currentReturn.reverseShipmentRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Carrier:</span>
                  <span className="font-bold text-gray-900">{currentReturn.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking ID:</span>
                  <span className="font-mono text-gray-900">{currentReturn.reverseTrackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Origin:</span>
                  <span className="text-gray-900">{currentReturn.originAddress || "Colombo Pickup Point"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-bold text-gray-900">{currentReturn.destinationWarehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Location:</span>
                  <span className="text-blue-700 font-semibold">{currentReturn.currentLocation || "In Transit - Colombo Hub"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ETA Warehouse:</span>
                  <span className="text-gray-900">{currentReturn.expectedArrivalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transit Status:</span>
                  <span className="font-bold text-blue-700">{currentReturn.shipmentStatus}</span>
                </div>
              </div>
            </DetailCard>

            {/* 4. Warehouse Receipt & Inspection */}
            <DetailCard title="4. Warehouse Receipt & Inspection">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination WH:</span>
                  <span className="font-bold text-gray-900">{currentReturn.destinationWarehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expected Arrival:</span>
                  <span className="text-gray-900">{currentReturn.expectedArrivalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Receipt Status:</span>
                  <span className="font-bold text-amber-700">{currentReturn.receiptStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inspection Status:</span>
                  <span className="font-bold text-amber-700">{currentReturn.inspectionStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inspector:</span>
                  <span className="text-gray-800">{currentReturn.inspector || "TBD"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inspection Window:</span>
                  <span className="text-gray-800">{currentReturn.inspectionWindow || "May 26 - May 28, 2025"}</span>
                </div>
              </div>
            </DetailCard>

            {/* 5. Disposition Management */}
            <DetailCard title="5. Disposition Management">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Proposed Disposition:</span>
                  <span className="font-bold text-amber-700">{currentReturn.proposedDisposition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Approved Disposition:</span>
                  <span className="text-gray-800">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Supplier Impact:</span>
                  <span className="text-gray-800">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Financial Impact:</span>
                  <span className="text-gray-800">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Refund Release:</span>
                  <span className="font-bold text-rose-700">Blocked until inspection</span>
                </div>
              </div>
            </DetailCard>

            {/* 6. Post Disposition Summary & SLA */}
            <DetailCard title="6. Post Disposition Summary & SLA">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Restock Status:</span>
                  <span className="font-bold text-amber-700">{currentReturn.restockStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quarantine Status:</span>
                  <span className="text-gray-800">{currentReturn.quarantineStatus || "Pending"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Supplier Return:</span>
                  <span className="text-gray-800">{currentReturn.supplierReturnStatus || "Pending"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Exchange Status:</span>
                  <span className="text-gray-800">{currentReturn.exchangeStatus || "Pending"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Refund Dependency:</span>
                  <span className="font-bold text-rose-700">{currentReturn.refundDependencyStatus}</span>
                </div>
                <div className="pt-1 border-t border-gray-100 space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">SLA Summary</span>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Eligibility SLA:</span>
                    <span className="font-bold text-emerald-700">Met</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Collection SLA:</span>
                    <span className="font-bold text-emerald-700">Met</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Reverse Transit SLA:</span>
                    <span className="font-bold text-amber-700">At Risk</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Overall SLA:</span>
                    <span className="font-bold text-emerald-700">On Track</span>
                  </div>
                </div>
              </div>
            </DetailCard>
          </div>
        )}

        {activePreviewTab !== "Overview" && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center text-xs text-gray-500">
            <p className="font-semibold text-gray-800">
              {activePreviewTab} Information for {currentReturn.returnRef}
            </p>
            <p className="mt-1">Displaying operational logs, condition notes, and financial dependencies for {activePreviewTab.toLowerCase()}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
