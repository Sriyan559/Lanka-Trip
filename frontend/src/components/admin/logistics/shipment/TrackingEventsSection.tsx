"use client";

import React from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { ProgressBar } from "../shared/ProgressBar";
import { ActionButton } from "../shared/ActionButton";
import { TrackingEvent, TrackingIntegrityMetrics } from "@/types/logistics/shipment";
import { Eye, ShieldCheck } from "lucide-react";

interface TrackingEventsSectionProps {
  events: TrackingEvent[];
  integrity: TrackingIntegrityMetrics;
}

export function TrackingEventsSection({
  events,
  integrity,
}: TrackingEventsSectionProps) {
  const eventColumns: Column<TrackingEvent>[] = [
    {
      header: "Event ID",
      accessorKey: "id",
      sortable: true,
      cell: (row) => <span className="font-mono font-bold text-gray-900">{row.id}</span>,
    },
    { header: "Date & Time", accessorKey: "dateTime", sortable: true },
    { header: "Carrier", accessorKey: "carrier" },
    {
      header: "Provider Code",
      accessorKey: "providerEventCode",
      cell: (row) => <span className="font-mono text-gray-600">{row.providerEventCode}</span>,
    },
    { header: "Provider Event", accessorKey: "providerEvent" },
    {
      header: "Normalized Event",
      accessorKey: "normalizedEvent",
      cell: (row) => <StatusBadge status={row.normalizedEvent} variant="info" size="sm" />,
    },
    { header: "Location", accessorKey: "location" },
    { header: "Hub", accessorKey: "hub" },
    {
      header: "Source",
      accessorKey: "source",
      cell: (row) => (
        <span className="font-mono font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">
          {row.source}
        </span>
      ),
      align: "center",
    },
    {
      header: "Confidence",
      accessorKey: "confidence",
      cell: (row) => <span className="font-bold text-emerald-700">{row.confidence}%</span>,
      align: "right",
    },
    {
      header: "Raw Event",
      accessorKey: "rawEventValid",
      cell: (row) => (row.rawEventValid ? "Yes" : "No"),
      align: "center",
    },
    {
      header: "Result",
      accessorKey: "result",
      cell: (row) => <StatusBadge status={row.result} variant="success" size="sm" />,
      align: "center",
    },
    {
      header: "Action",
      cell: (row) => (
        <button
          type="button"
          onClick={() => alert(`Raw Event Details for ${row.id}`)}
          className="text-rose-700 font-bold flex items-center gap-1 hover:underline"
        >
          <Eye className="w-3 h-3" /> View
        </button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
      {/* 4. Tracking Events DataTable */}
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            4. Tracking Events ({events.length})
          </h3>
          <span className="text-[11px] text-gray-500 font-medium">
            Normalized Multi-Carrier Stream
          </span>
        </div>

        <DataTable columns={eventColumns} data={events} />
      </div>

      {/* 5. Tracking Integrity Card */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              5. Tracking Integrity
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Score: 96%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="text-[10px] text-gray-500 uppercase">Raw Events</div>
              <div className="text-sm font-bold text-gray-900">{integrity.rawEventsCount}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="text-[10px] text-gray-500 uppercase">Normalized</div>
              <div className="text-sm font-bold text-gray-900">{integrity.normalizedEventsCount}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="text-[10px] text-gray-500 uppercase">Duplicates</div>
              <div className="text-sm font-bold text-gray-900">{integrity.duplicateEventsCount}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="text-[10px] text-gray-500 uppercase">Out-of-Order</div>
              <div className="text-sm font-bold text-gray-900">{integrity.outOfOrderEventsCount}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="text-[10px] text-gray-500 uppercase">Missing Milestones</div>
              <div className="text-sm font-bold text-gray-900">{integrity.missingMilestonesCount}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="text-[10px] text-gray-500 uppercase">Tracking Conflicts</div>
              <div className="text-sm font-bold text-gray-900">{integrity.trackingConflictsCount}</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-600">Normalization Confidence:</span>
              <span className="text-emerald-700">{integrity.normalizationConfidence}%</span>
            </div>
            <ProgressBar value={integrity.normalizationConfidence} color="emerald" size="sm" />
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <span className="text-gray-500">Last Sync: {integrity.lastSync}</span>
          <ActionButton label="Re-sync Stream" size="xs" variant="outline" />
        </div>
      </div>
    </div>
  );
}
