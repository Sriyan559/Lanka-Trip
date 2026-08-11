"use client";

import React from "react";
import { StatusTimeline, TimelineStep } from "../shared/StatusTimeline";
import { AlertCircle } from "lucide-react";

const LIFECYCLE_STAGES: { id: string; label: string }[] = [
  { id: "1", label: "Shipment Eligible" },
  { id: "2", label: "Shipment Created" },
  { id: "3", label: "Packages Validated" },
  { id: "4", label: "Carrier Selected" },
  { id: "5", label: "Carrier Assigned" },
  { id: "6", label: "Pickup Requested" },
  { id: "7", label: "Pickup Scheduled" },
  { id: "8", label: "Carrier Arrived" },
  { id: "9", label: "Handoff Confirmed" },
  { id: "10", label: "Collected" },
  { id: "11", label: "In Transit" }, // Current (index 10)
  { id: "12", label: "Delivery Hub" },
  { id: "13", label: "Cluster Delivery" },
  { id: "14", label: "Out for Delivery" },
  { id: "15", label: "Delivery Attempt" },
  { id: "16", label: "Delivered" },
  { id: "17", label: "Proof of Delivery Captured" },
  { id: "18", label: "COD Confirmed" },
  { id: "19", label: "Reconciled" },
  { id: "20", label: "Closed" },
  { id: "21", label: "Archived" },
];

const EXCEPTION_MARKERS = [
  "Pickup Failed",
  "Tracking Gap",
  "Delivery Delayed",
  "Failed Delivery",
  "Delivery Retry",
  "Return to Origin",
  "Lost",
  "Damaged",
];

interface ShipmentLifecycleSectionProps {
  currentState?: string;
}

export function ShipmentLifecycleSection({
  currentState = "In Transit",
}: ShipmentLifecycleSectionProps) {
  const steps: TimelineStep[] = LIFECYCLE_STAGES.map((stage, idx) => {
    let status: TimelineStep["status"] = "pending";
    if (idx < 10) {
      status = "completed";
    } else if (idx === 10) {
      status = "current";
    }

    return {
      id: stage.id,
      label: stage.label,
      status: status,
    };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Shipment Lifecycle & Operational Timeline
          </h3>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Current Stage: {currentState}
          </span>
        </div>
        <span className="text-[11px] text-gray-500 font-medium">
          Stage 11 of 21 (In Transit)
        </span>
      </div>

      {/* 20-Stage Timeline */}
      <StatusTimeline steps={steps} />

      {/* Operational Exception Markers Strip */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2 text-[10px]">
        <span className="font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          Exception Markers:
        </span>
        {EXCEPTION_MARKERS.map((marker, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 font-medium hover:border-amber-300 hover:text-amber-800 transition-colors cursor-pointer"
          >
            {marker}
          </span>
        ))}
      </div>
    </div>
  );
}
