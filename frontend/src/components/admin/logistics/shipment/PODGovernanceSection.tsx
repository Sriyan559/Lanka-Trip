"use client";

import React from "react";
import { StatusBadge } from "../shared/StatusBadge";
import { PODGovernanceData } from "@/types/logistics/shipment";
import { ShieldCheck, AlertCircle } from "lucide-react";

interface PODGovernanceSectionProps {
  pod: PODGovernanceData;
}

export function PODGovernanceSection({ pod }: PODGovernanceSectionProps) {
  const governanceItems = [
    { label: "POD Status", value: pod.podStatus },
    { label: "Delivery Timestamp", value: pod.deliveryTimestamp },
    { label: "Recipient", value: pod.recipient },
    { label: "Recipient Type", value: pod.recipientType },
    { label: "Signature Status", value: pod.signatureStatus },
    { label: "Photo Status", value: pod.photoStatus },
    { label: "OTP Status", value: pod.otpStatus },
    { label: "Geo Validation", value: pod.geoValidation },
    { label: "Delivery Location Match", value: pod.deliveryLocationMatch },
    { label: "Courier Confirmation", value: pod.courierConfirmation },
    { label: "Carrier Confirmation", value: pod.carrierConfirmation },
    { label: "Evidence Integrity", value: pod.evidenceIntegrity },
    { label: "POD Review Status", value: pod.podReviewStatus },
  ];

  const podExceptionsLegend = [
    "Missing Signature",
    "Missing Photo",
    "Invalid OTP",
    "Geo Mismatch",
    "Timestamp Conflict",
    "Recipient Conflict",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            8. Proof of Delivery Governance
          </h3>
          <StatusBadge status={pod.podStatus} variant="warning" />
        </div>
        <span className="text-[11px] text-gray-500 font-medium">
          Digital Signature & OTP Security Required
        </span>
      </div>

      {/* Governance Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs mb-3">
        {governanceItems.map((item, idx) => (
          <div key={idx} className="bg-gray-50 border border-gray-100 p-2 rounded">
            <div className="text-[10px] text-gray-500 uppercase font-medium truncate">
              {item.label}
            </div>
            <div className="mt-1">
              <StatusBadge status={String(item.value)} size="sm" />
            </div>
          </div>
        ))}
      </div>

      {/* POD Exception Legend */}
      <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2 text-[10px]">
        <span className="font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-rose-600" />
          POD Exception Legend:
        </span>
        {podExceptionsLegend.map((legend, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded border border-rose-100 bg-rose-50/40 text-rose-800 font-medium"
          >
            {legend}
          </span>
        ))}
      </div>
    </div>
  );
}
