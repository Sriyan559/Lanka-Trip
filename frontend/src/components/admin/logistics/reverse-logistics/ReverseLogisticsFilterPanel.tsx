"use client";

import React, { useState } from "react";
import { Filter, RotateCcw, Save } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface ReverseLogisticsFilterPanelProps {
  onFilterChange?: (filters: any) => void;
  onClearAll?: () => void;
}

export function ReverseLogisticsFilterPanel({
  onFilterChange,
  onClearAll,
}: ReverseLogisticsFilterPanelProps) {
  const [returnType, setReturnType] = useState("all");
  const [collectionStatus, setCollectionStatus] = useState("all");
  const [inspectionStatus, setInspectionStatus] = useState("all");
  const [disposition, setDisposition] = useState("all");
  const [carrier, setCarrier] = useState("all");
  const [slaStatus, setSlaStatus] = useState("all");

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({
        returnType,
        collectionStatus,
        inspectionStatus,
        disposition,
        carrier,
        slaStatus,
      });
    }
  };

  const handleReset = () => {
    setReturnType("all");
    setCollectionStatus("all");
    setInspectionStatus("all");
    setDisposition("all");
    setCarrier("all");
    setSlaStatus("all");
    if (onClearAll) onClearAll();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2 text-xs">
      <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-rose-700" />
          <h4 className="font-bold text-gray-900 uppercase text-[11px]">
            Reverse Logistics Multi-Row Filter Bar
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <ActionButton
            label="Reset Filters"
            icon={<RotateCcw className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={handleReset}
          />
          <ActionButton
            label="Save Filter View"
            icon={<Save className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={() => alert("Filter view saved.")}
          />
        </div>
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Return Type</label>
          <select
            value={returnType}
            onChange={(e) => setReturnType(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Types</option>
            <option value="Customer Return">Customer Return</option>
            <option value="Warranty Return">Warranty Return</option>
            <option value="Exchange Return">Exchange Return</option>
            <option value="RTO Return">RTO Return</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Collection Status</label>
          <select
            value={collectionStatus}
            onChange={(e) => setCollectionStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Collection Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Collected">Collected</option>
            <option value="Overdue">Overdue</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Inspection Status</label>
          <select
            value={inspectionStatus}
            onChange={(e) => setInspectionStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Inspection Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Passed">Passed</option>
            <option value="Condition Degraded">Condition Degraded</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Proposed Disposition</label>
          <select
            value={disposition}
            onChange={(e) => setDisposition(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Dispositions</option>
            <option value="Restock System">Restock System</option>
            <option value="Quarantine">Quarantine</option>
            <option value="Return to Supplier">Return to Supplier</option>
            <option value="Dispose">Dispose</option>
            <option value="Exchange">Exchange</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Carrier Partner</label>
          <select
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Carriers</option>
            <option value="PickMe">PickMe</option>
            <option value="Uber Flash">Uber Flash</option>
            <option value="Luxe Courier">Luxe Courier</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">SLA Status</label>
          <select
            value={slaStatus}
            onChange={(e) => setSlaStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All SLAs</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="SLA Breached">SLA Breached</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleApply}
            className="w-full text-xs font-bold py-1 px-2 bg-rose-700 text-white rounded hover:bg-rose-800 transition-colors shadow-2xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
