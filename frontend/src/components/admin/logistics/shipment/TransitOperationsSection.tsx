"use client";

import React from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { TransitOperations, TransitMilestone } from "@/types/logistics/shipment";
import { MapPin, Navigation } from "lucide-react";

interface TransitOperationsSectionProps {
  transit: TransitOperations;
}

export function TransitOperationsSection({ transit }: TransitOperationsSectionProps) {
  const milestoneColumns: Column<TransitMilestone>[] = [
    { header: "Milestone", accessorKey: "milestone", sortable: true, cell: (row) => <span className="font-bold text-gray-900">{row.milestone}</span> },
    { header: "Scheduled Time", accessorKey: "scheduledTime" },
    { header: "Actual Time", accessorKey: "actualTime" },
    {
      header: "Variance",
      accessorKey: "variance",
      cell: (row) => (
        <span
          className={`font-semibold ${
            row.variance.startsWith("+")
              ? "text-amber-600"
              : row.variance.startsWith("-")
              ? "text-emerald-600"
              : "text-gray-500"
          }`}
        >
          {row.variance}
        </span>
      ),
    },
    { header: "Location", accessorKey: "location" },
    { header: "Hub", accessorKey: "hubName" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => <StatusBadge status={row.status} size="sm" />,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-blue-600" />
            6. Transit Operations & Hub Routing
          </h3>
          <StatusBadge status="In Transit" variant="info" />
        </div>
        <span className="text-[11px] text-gray-500 font-medium">
          Progress: {transit.distanceProgress} | Est. Remaining: {transit.estRemainingTime}
        </span>
      </div>

      {/* Transit Route Header Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-50 border border-slate-200 rounded-md p-2.5 mb-3 text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-semibold">Origin Hub</div>
            <div className="font-bold text-gray-900">{transit.originHub}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-semibold">Current Hub</div>
            <div className="font-bold text-blue-700">{transit.currentHub} (Dwell: {transit.hubDwellTime})</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-semibold">Destination Hub</div>
            <div className="font-bold text-gray-900">{transit.destinationHub}</div>
          </div>
        </div>
      </div>

      {/* Milestone Progress Table */}
      <DataTable columns={milestoneColumns} data={transit.milestones} />
    </div>
  );
}
