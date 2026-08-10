"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Download, ShieldAlert, ChevronDown, Plus } from "lucide-react";

interface WarehousePageHeaderProps {
  onAddWarehouseClick?: () => void;
}

export function WarehousePageHeader({ onAddWarehouseClick }: WarehousePageHeaderProps) {
  const [bulkOpen, setBulkOpen] = useState(false);
  const bulkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bulkRef.current && !bulkRef.current.contains(event.target as Node)) {
        setBulkOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 bg-white p-3 rounded-xl border border-line shadow-sm">
      <div>
        <div className="text-[10px] font-semibold text-muted mb-0.5 flex items-center gap-1">
          <Link href="/admin/logistics" className="hover:underline text-muted">
            Logistics
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-muted">Warehouses &amp; Fulfilment Centres</span>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-bold">Warehouse &amp; Fulfilment Centre Management</span>
        </div>
        <h1 className="text-lg md:text-xl font-bold text-ink leading-tight">
          Warehouse &amp; Fulfilment Centre Management
        </h1>
        <p className="text-[11px] text-muted mt-0.5 max-w-4xl">
          Manage physical infrastructure, monitor capacity limits, and oversee fulfilment operations network-wide.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => alert("Exporting Warehouse Network Report...")}
          className="px-2.5 py-1 bg-white border border-line text-ink text-[11px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download size={13} className="text-muted" />
          <span>Export Report</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Filtering Capacity Exceptions...")}
          className="px-2.5 py-1 bg-white border border-rose-200 text-rose-700 text-[11px] font-semibold rounded-lg hover:bg-rose-50 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <ShieldAlert size={13} />
          <span>Review Capacity Exceptions</span>
        </button>

        {/* BULK ACTIONS DROPDOWN */}
        <div className="relative" ref={bulkRef}>
          <button
            type="button"
            onClick={() => setBulkOpen(!bulkOpen)}
            className="px-2.5 py-1 bg-white border border-line text-ink text-[11px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <span>Bulk Actions</span>
            <ChevronDown size={13} className="text-muted" />
          </button>
          {bulkOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg border border-line shadow-lg z-50 py-1 text-[11px]">
              <button onClick={() => { setBulkOpen(false); alert("Bulk Updating Maintenance Schedule..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Bulk Update Maintenance Schedule
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Rebalancing Network Capacity..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Rebalance Network Capacity
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Bulk Auditing Facility Capabilities..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Audit Facility Capabilities
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onAddWarehouseClick || (() => alert("Opening Add Warehouse Modal..."))}
          className="px-3 py-1 bg-primary-900 text-white text-[11px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1"
        >
          <Plus size={14} />
          <span>+ Add Warehouse</span>
        </button>
      </div>
    </div>
  );
}
