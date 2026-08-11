"use client";

import React from "react";
import { DetailCard } from "../shared/DetailCard";
import { StatusBadge } from "../shared/StatusBadge";
import { StatusTimeline } from "../shared/StatusTimeline";
import { PickupOperation } from "@/types/logistics/shipment";

interface PickupOperationsSectionProps {
  pickup: PickupOperation;
}

export function PickupOperationsSection({ pickup }: PickupOperationsSectionProps) {
  const pickupFields = [
    { label: "Pickup Reference", value: pickup.pickupRef },
    { label: "Requested At", value: pickup.requestedAt },
    { label: "Scheduled Window", value: pickup.scheduledAt },
    { label: "Warehouse / FC", value: pickup.warehouse },
    { label: "Dispatch Dock", value: pickup.dock },
    { label: "Courier Name", value: pickup.courierName },
    { label: "Courier Contact", value: pickup.courierContact },
    { label: "Carrier Arrival", value: pickup.carrierArrival },
    { label: "Handoff Confirmed", value: pickup.handoffConfirmed },
    { label: "Collected At", value: pickup.collectedAt },
    { label: "Package Count", value: pickup.packageCount },
    { label: "Pickup SLA", value: pickup.pickupSla },
    {
      label: "Status",
      value: <StatusBadge status={pickup.status} variant="success" size="sm" />,
    },
  ];

  const timelineSteps = pickup.timeline.map((item, idx) => ({
    id: idx + 1,
    label: item.stage,
    timestamp: item.timestamp,
    status: (item.completed ? "completed" : "pending") as "completed" | "pending",
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            3. Pickup Operations & Handoff
          </h3>
          <StatusBadge status={pickup.status} variant="success" />
        </div>
        <span className="text-[11px] text-gray-500 font-medium">
          Ref: {pickup.pickupRef} | Handoff Verified
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Pickup Metadata Grid */}
        <div className="lg:col-span-5">
          <DetailCard title="Pickup Identity & Courier Context" fields={pickupFields} />
        </div>

        {/* Pickup Stepper / Operational Timeline */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-gray-50/50 border border-gray-100 rounded-lg p-3">
          <div>
            <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">
              Pickup Execution Timeline
            </h4>
            <StatusTimeline steps={timelineSteps} />
          </div>

          <div className="mt-3 pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-normal">
              Collection Verified by Warehouse Dispatch Manager
            </span>
            <span className="font-bold text-emerald-700">100% On-Time Handoff</span>
          </div>
        </div>
      </div>
    </div>
  );
}
