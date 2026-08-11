"use client";

import React from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { DeliveryAttempt } from "@/types/logistics/shipment";
import { Truck } from "lucide-react";

interface DeliveryAttemptsSectionProps {
  attempts: DeliveryAttempt[];
}

export function DeliveryAttemptsSection({ attempts }: DeliveryAttemptsSectionProps) {
  const attemptColumns: Column<DeliveryAttempt>[] = [
    { header: "Attempt #", accessorKey: "attemptNumber", align: "center" },
    { header: "Date & Time", accessorKey: "dateTime" },
    { header: "Courier", accessorKey: "courier" },
    { header: "Location", accessorKey: "location" },
    { header: "Result", accessorKey: "result", cell: (row) => <StatusBadge status={row.result} size="sm" /> },
    { header: "Failure Reason", accessorKey: "failureReason" },
    { header: "Customer Contacted", cell: (row) => (row.customerContacted ? "Yes" : "No"), align: "center" },
    { header: "Evidence", accessorKey: "evidence" },
    { header: "Next Action", accessorKey: "nextAction" },
    { header: "Retry Scheduled", accessorKey: "retryScheduled" },
    { header: "Status", accessorKey: "status", cell: (row) => <StatusBadge status={row.status} size="sm" /> },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-gray-600" />
            7. Delivery Attempts & Retry History ({attempts.length})
          </h3>
        </div>
        <span className="text-[11px] text-gray-500 font-medium">
          Attempt Limit: 3 | SLA Governed
        </span>
      </div>

      <DataTable
        columns={attemptColumns}
        data={attempts}
        emptyMessage="No delivery attempts have occurred yet."
      />
    </div>
  );
}
