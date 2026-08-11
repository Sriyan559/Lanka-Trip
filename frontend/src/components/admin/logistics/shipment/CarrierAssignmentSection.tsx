"use client";

import React, { useState } from "react";
import { DataTable, Column } from "../shared/DataTable";
import { StatusBadge } from "../shared/StatusBadge";
import { ActionButton } from "../shared/ActionButton";
import { CarrierAlternative } from "@/types/logistics/shipment";
import { CheckCircle2, Truck } from "lucide-react";

interface CarrierAssignmentSectionProps {
  currentCarrier: CarrierAlternative;
  alternatives: CarrierAlternative[];
  onSelectCarrier: (carrierId: string) => void;
}

export function CarrierAssignmentSection({
  currentCarrier,
  alternatives,
  onSelectCarrier,
}: CarrierAssignmentSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(currentCarrier.id);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelectCarrier(id);
  };

  const carrierColumns: Column<CarrierAlternative>[] = [
    {
      header: "Carrier",
      accessorKey: "carrierName",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-1.5 font-bold text-gray-900">
          <Truck className="w-3.5 h-3.5 text-rose-700" />
          <span>{row.carrierName}</span>
          {row.id === selectedId && (
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
              Assigned
            </span>
          )}
        </div>
      ),
    },
    { header: "Service", accessorKey: "service", sortable: true },
    { header: "Coverage", accessorKey: "coverage" },
    {
      header: "Capacity",
      accessorKey: "capacity",
      cell: (row) => <StatusBadge status={row.capacity} variant={row.capacity === "High" ? "success" : "warning"} />,
    },
    { header: "Pickup Window", accessorKey: "pickupWindow" },
    { header: "ETA", accessorKey: "eta", sortable: true },
    { header: "Rate", accessorKey: "rate", sortable: true },
    { header: "SLA Score", accessorKey: "slaScore", cell: (row) => `${row.slaScore}%`, align: "right" },
    { header: "POD Rate", accessorKey: "podRate", cell: (row) => `${row.podRate}%`, align: "right" },
    { header: "Damage", accessorKey: "damageRate", cell: (row) => `${row.damageRate}%`, align: "right" },
    { header: "Tracking Quality", accessorKey: "trackingQuality", cell: (row) => `${row.trackingQuality}%`, align: "right" },
    {
      header: "Eligibility",
      accessorKey: "eligibility",
      cell: (row) => <StatusBadge status={row.eligibility} variant="success" size="sm" />,
    },
    {
      header: "Score",
      accessorKey: "score",
      cell: (row) => <span className="font-bold text-gray-900">{row.score}</span>,
      align: "center",
    },
    {
      header: "Action",
      cell: (row) =>
        row.id === selectedId ? (
          <span className="text-emerald-700 font-bold text-[11px] inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Default
          </span>
        ) : (
          <ActionButton
            label="Select"
            size="xs"
            variant="outline"
            onClick={() => handleSelect(row.id)}
          />
        ),
      align: "center",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
      {/* 2A. Carrier Assignment (Current) Card */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
              2. Carrier Assignment (Current)
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Active Carrier
            </span>
          </div>

          <div className="flex items-center gap-3 p-2 bg-rose-50/40 rounded-md border border-rose-100 mb-3">
            <div className="w-10 h-10 bg-rose-700 rounded-md flex items-center justify-center text-white font-black text-sm">
              domex
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-none">
                {currentCarrier.carrierName}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">
                {currentCarrier.service} • {currentCarrier.coverage}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Pickup Window:</span>
              <span className="font-semibold text-gray-900">{currentCarrier.pickupWindow}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Promised ETA:</span>
              <span className="font-semibold text-gray-900">{currentCarrier.eta}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Carrier Rate:</span>
              <span className="font-bold text-rose-700">{currentCarrier.rate}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Carrier SLA Score:</span>
              <span className="font-bold text-emerald-700">{currentCarrier.slaScore}%</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">POD Capture Rate:</span>
              <span className="font-semibold text-gray-900">{currentCarrier.podRate}%</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-gray-500">Tracking Quality:</span>
              <span className="font-semibold text-gray-900">{currentCarrier.trackingQuality}%</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
          <ActionButton
            label="Reassign Carrier"
            size="xs"
            variant="outline"
            onClick={() => alert("Reassign carrier workflow initiated.")}
          />
        </div>
      </div>

      {/* 2B. Carrier Alternatives Comparison Table */}
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            2B. Carrier Alternatives & Handoff Options ({alternatives.length})
          </h3>
          <span className="text-[11px] text-gray-500 font-medium">
            Rule-based SLA & Cost Optimization
          </span>
        </div>

        <DataTable columns={carrierColumns} data={alternatives} />
      </div>
    </div>
  );
}
