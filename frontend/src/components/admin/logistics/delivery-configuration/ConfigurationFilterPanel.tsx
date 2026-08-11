"use client";

import React, { useState } from "react";
import { Filter, RotateCcw, Save } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface ConfigurationFilterPanelProps {
  onFilterChange?: (filters: any) => void;
  onClearAll?: () => void;
}

export function ConfigurationFilterPanel({
  onFilterChange,
  onClearAll,
}: ConfigurationFilterPanelProps) {
  const [configType, setConfigType] = useState("all");
  const [configStatus, setConfigStatus] = useState("all");
  const [approvalStatus, setApprovalStatus] = useState("all");
  const [activationStatus, setActivationStatus] = useState("all");
  const [conflictStatus, setConflictStatus] = useState("all");
  const [exceptionStatus, setExceptionStatus] = useState("all");
  const [region, setRegion] = useState("all");
  const [carrier, setCarrier] = useState("all");
  const [service, setService] = useState("all");
  const [rateType, setRateType] = useState("all");

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({
        configType,
        configStatus,
        approvalStatus,
        activationStatus,
        conflictStatus,
        exceptionStatus,
        region,
        carrier,
        service,
        rateType,
      });
    }
  };

  const handleReset = () => {
    setConfigType("all");
    setConfigStatus("all");
    setApprovalStatus("all");
    setActivationStatus("all");
    setConflictStatus("all");
    setExceptionStatus("all");
    setRegion("all");
    setCarrier("all");
    setService("all");
    setRateType("all");
    if (onClearAll) onClearAll();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2 text-xs">
      <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-rose-700" />
          <h4 className="font-bold text-gray-900 uppercase text-[11px]">
            Delivery Configuration Multi-Row Filter Panel
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

      {/* Row 1 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Configuration Type</label>
          <select
            value={configType}
            onChange={(e) => setConfigType(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Types</option>
            <option value="Delivery Zone">Delivery Zone</option>
            <option value="Rate Rule">Rate Rule</option>
            <option value="Capacity Rule">Capacity Rule</option>
            <option value="SLA Rule">SLA Rule</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Configuration Status</label>
          <select
            value={configStatus}
            onChange={(e) => setConfigStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Approval Status</label>
          <select
            value={approvalStatus}
            onChange={(e) => setApprovalStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Approvals</option>
            <option value="Approved">Approved</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Pending Approval">Pending Approval</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Activation Status</label>
          <select
            value={activationStatus}
            onChange={(e) => setActivationStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Activations</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Conflict Status</label>
          <select
            value={conflictStatus}
            onChange={(e) => setConflictStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Conflicts</option>
            <option value="None">No Conflict</option>
            <option value="Overlap">Overlap</option>
            <option value="Cut-Off Conflict">Cut-Off Conflict</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Exception Status</label>
          <select
            value={exceptionStatus}
            onChange={(e) => setExceptionStatus(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Exceptions</option>
            <option value="None">None</option>
            <option value="Capacity Risk">Capacity Risk</option>
            <option value="Expiring Soon">Expiring Soon</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Regions</option>
            <option value="Western">Western</option>
            <option value="Central">Central</option>
            <option value="Southern">Southern</option>
            <option value="Northern">Northern</option>
          </select>
        </div>
      </div>

      {/* Row 2 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1 border-t border-gray-100">
        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Carrier Partner</label>
          <select
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Carriers</option>
            <option value="Domex">Domex</option>
            <option value="SpeedX">SpeedX</option>
            <option value="Kandy Regional">Kandy Regional</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Shipping Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Services</option>
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
            <option value="Same-Day">Same-Day</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Same-Day / Next-Day</label>
          <select className="w-full text-xs p-1 border border-gray-200 rounded bg-white">
            <option value="all">Any</option>
            <option value="same">Same-Day Only</option>
            <option value="next">Next-Day Only</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">COD Support</label>
          <select className="w-full text-xs p-1 border border-gray-200 rounded bg-white">
            <option value="all">Any</option>
            <option value="yes">COD Enabled</option>
            <option value="no">No COD</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Rate Type</label>
          <select
            value={rateType}
            onChange={(e) => setRateType(e.target.value)}
            className="w-full text-xs p-1 border border-gray-200 rounded bg-white"
          >
            <option value="all">All Rate Types</option>
            <option value="Flat">Flat Rate</option>
            <option value="Weight">Weight Based</option>
            <option value="Distance">Distance Based</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">Cut-Off Type</label>
          <select className="w-full text-xs p-1 border border-gray-200 rounded bg-white">
            <option value="all">All Cut-offs</option>
            <option value="morning">Morning (Before 12 PM)</option>
            <option value="afternoon">Afternoon (1-4 PM)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-gray-400 font-semibold mb-0.5">SLA Promise</label>
          <select className="w-full text-xs p-1 border border-gray-200 rounded bg-white">
            <option value="all">All SLAs</option>
            <option value="same">Same-Day</option>
            <option value="next">Next-Day</option>
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
