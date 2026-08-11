"use client";

import React, { useState } from "react";
import { Carrier } from "@/types/logistics/carrier";
import { StatusBadge } from "../shared/StatusBadge";
import { DetailCard } from "../shared/DetailCard";
import { ReusableTabs } from "../shared/ReusableTabs";
import { StatusTimeline, TimelineStep } from "../shared/StatusTimeline";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";

interface CarrierDetailPanelProps {
  carrier: Carrier;
  onUpdateStatus?: (status: string) => void;
}

const DETAIL_PANEL_TABS = [
  "Overview",
  "Services",
  "Coverage",
  "Capacity",
  "Shipments",
  "Pickup Performance",
  "Delivery Performance",
  "Tracking",
  "POD",
  "COD",
  "RTO",
  "Reverse Logistics",
  "Claims",
  "Reconciliation",
  "Rates",
  "Agreements",
  "Compliance",
  "Insurance",
  "Holds",
  "Exceptions",
  "SLA",
  "Linked Records",
  "Activity",
  "Audit History",
];

export function CarrierDetailPanel({ carrier, onUpdateStatus }: CarrierDetailPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState("Overview");

  // Format lifecycle timeline steps for StatusTimeline
  const lifecycleSteps: TimelineStep[] = (carrier.lifecycleTimeline || []).map((st) => ({
    label: st.stage,
    timestamp: st.timestamp,
    status: st.completed ? (st.current ? "current" : "completed") : "pending",
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-3">
      {/* Selected Carrier Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-gray-900 tracking-tight">
                {carrier.carrierRef} — {carrier.carrierName}
              </h2>
              <StatusBadge status={carrier.operationalStatus} size="sm" />
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Selected Record
              </span>
            </div>
            <p className="text-[10.5px] text-gray-500 font-normal mt-0.5">
              Operator: <span className="font-semibold text-gray-800">{carrier.operator}</span> |{" "}
              Type: <span className="font-semibold text-gray-800">{carrier.carrierType}</span> |{" "}
              Reg: <span className="font-mono font-semibold text-gray-800">{carrier.businessRegNo}</span>
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1.5">
          {onUpdateStatus && (
            <button
              type="button"
              onClick={() => onUpdateStatus("Limited Service")}
              className="text-[10.5px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded transition-colors"
            >
              Limit Capacity
            </button>
          )}
          {onUpdateStatus && (
            <button
              type="button"
              onClick={() => onUpdateStatus("Suspended")}
              className="text-[10.5px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-1 rounded transition-colors"
            >
              Suspend Carrier
            </button>
          )}
        </div>
      </div>

      {/* 21 Detail Panel Sub-Tabs */}
      <div className="border-b border-gray-100 pb-1">
        <ReusableTabs
          tabs={DETAIL_PANEL_TABS}
          activeTab={activeSubTab}
          onTabChange={setActiveSubTab}
        />
      </div>

      {/* Overview Tab Content (8 Detail Cards Grid) */}
      {activeSubTab === "Overview" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* A. Carrier Identity & Commercial Profile */}
            <DetailCard title="Carrier Identity & Commercial Profile">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Operator:</span>
                  <span className="font-bold text-gray-900">{carrier.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Business Reg. No:</span>
                  <span className="font-mono text-gray-900">{carrier.businessRegNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact:</span>
                  <span className="text-gray-900">{carrier.contactNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-rose-700 font-medium">{carrier.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contract Period:</span>
                  <span className="text-gray-900">{carrier.contractStart} — {carrier.contractEnd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Terms:</span>
                  <span className="font-bold text-gray-900">{carrier.paymentTerms}</span>
                </div>
              </div>
            </DetailCard>

            {/* B. Service Portfolio */}
            <DetailCard title="Service Portfolio">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Services:</span>
                  <span className="font-bold text-gray-900">{carrier.services.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Same-Day Services:</span>
                  <span className="font-bold text-purple-700">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Next-Day Services:</span>
                  <span className="font-bold text-blue-700">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Standard Ground:</span>
                  <span className="font-bold text-gray-700">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reverse Logistics:</span>
                  <span className="font-bold text-emerald-700">Yes</span>
                </div>
                <div className="pt-1 text-right">
                  <button className="text-[10px] font-bold text-rose-700 hover:underline">
                    View All Services &rarr;
                  </button>
                </div>
              </div>
            </DetailCard>

            {/* C. Coverage Summary */}
            <DetailCard title="Coverage Summary">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Regions Covered:</span>
                  <span className="font-bold text-gray-900">{carrier.coverage.regionsCovered} / {carrier.coverage.totalRegions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Districts Covered:</span>
                  <span className="font-bold text-gray-900">{carrier.coverage.districtsCovered} / {carrier.coverage.totalDistricts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Zones:</span>
                  <span className="font-bold text-gray-900">{carrier.coverage.deliveryZonesCovered} / {carrier.coverage.totalDeliveryZones}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Islandwide Coverage:</span>
                  <span className="font-bold text-emerald-700">{carrier.coverage.islandwidePercentage}%</span>
                </div>
                <div className="pt-1 text-right">
                  <button className="text-[10px] font-bold text-rose-700 hover:underline">
                    View Coverage Map &rarr;
                  </button>
                </div>
              </div>
            </DetailCard>

            {/* D. Capacity & Load Summary */}
            <DetailCard title="Capacity & Load Summary">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Daily Capacity:</span>
                  <span className="font-mono font-bold text-gray-900">{carrier.capacity.dailyCapacity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Load:</span>
                  <span className="font-mono font-bold text-blue-700">{carrier.capacity.currentLoad.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Remaining Capacity:</span>
                  <span className="font-mono font-bold text-emerald-700">{carrier.capacity.remainingCapacity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Peak Capacity:</span>
                  <span className="font-mono text-gray-700">{carrier.capacity.peakCapacity.toLocaleString()}</span>
                </div>
                <div className="pt-1 text-right">
                  <button className="text-[10px] font-bold text-rose-700 hover:underline">
                    View Capacity Trends &rarr;
                  </button>
                </div>
              </div>
            </DetailCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* E. Shipment Performance */}
            <DetailCard title="Shipment Performance (30 Days)">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Assigned Shipments:</span>
                  <span className="font-bold text-gray-900">{carrier.performance.assignedShipments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivered Shipments:</span>
                  <span className="font-bold text-emerald-700">{carrier.performance.deliveredShipments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">On-Time Delivery Rate:</span>
                  <span className="font-bold text-emerald-700">{carrier.performance.onTimeDeliveryPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Failed Deliveries:</span>
                  <span className="font-bold text-rose-700">{carrier.performance.failedDeliveryPercentage}%</span>
                </div>
              </div>
            </DetailCard>

            {/* F. Pickup Performance */}
            <DetailCard title="Pickup Performance">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Requests:</span>
                  <span className="font-bold text-gray-900">298</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickups Completed:</span>
                  <span className="font-bold text-emerald-700">282</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">On-Time Pickup Rate:</span>
                  <span className="font-bold text-emerald-700">{carrier.performance.onTimePickupPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup SLA Breaches:</span>
                  <span className="font-bold text-amber-700">4</span>
                </div>
              </div>
            </DetailCard>

            {/* G. Delivery Performance */}
            <DetailCard title="Delivery Performance">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Deliveries Attempted:</span>
                  <span className="font-bold text-gray-900">278</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Deliveries Completed:</span>
                  <span className="font-bold text-emerald-700">266</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">First-Attempt Delivery:</span>
                  <span className="font-bold text-emerald-700">{carrier.performance.firstAttemptDeliveryPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery SLA Breaches:</span>
                  <span className="font-bold text-rose-700">6</span>
                </div>
              </div>
            </DetailCard>

            {/* H. Tracking & Reliability */}
            <DetailCard title="Tracking & Reliability">
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking Integration:</span>
                  <span className="font-mono font-bold text-gray-900">{carrier.tracking.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking Completeness:</span>
                  <span className="font-bold text-emerald-700">{carrier.tracking.completenessPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking Exceptions:</span>
                  <span className="font-bold text-amber-700">{carrier.tracking.exceptionsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">API / Gateway Health:</span>
                  <span className="font-bold text-emerald-700">{carrier.tracking.apiGatewayHealth}</span>
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
            {activeSubTab} Data for {carrier.carrierName}
          </p>
          <p className="mt-1">Displaying operational logs and governance details for {activeSubTab.toLowerCase()}.</p>
        </div>
      )}

      {/* Carrier Lifecycle Workflow Timeline */}
      <div className="border-t border-gray-100 pt-2.5">
        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight mb-2">
          Carrier Lifecycle / Workflow Timeline
        </h4>
        {lifecycleSteps.length > 0 ? (
          <StatusTimeline steps={lifecycleSteps} />
        ) : (
          <div className="text-xs text-gray-400 font-mono">
            Standard workflow active: Operational Approval &rarr; Active Partner Status
          </div>
        )}
      </div>
    </div>
  );
}
