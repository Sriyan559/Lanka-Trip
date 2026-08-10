"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Download, ShieldAlert, ChevronDown, Plus } from "lucide-react";

interface AllocationPageHeaderProps {
  onRefresh?: () => void;
  onCreateTransferClick?: () => void;
}

export function AllocationPageHeader({
  onRefresh,
  onCreateTransferClick,
}: AllocationPageHeaderProps) {
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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl border border-line shadow-sm">
      {/* LEFT: TITLE & SUBTITLE */}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold text-muted mb-0.5 flex items-center gap-1">
          <Link href="/admin/logistics" className="hover:underline text-muted">
            Logistics
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-bold">Inventory Allocation</span>
        </div>
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-ink leading-tight truncate">
          Inventory Allocation, Reservation &amp; Transfer
        </h1>
        <p className="text-[10.5px] text-muted mt-0.5 truncate max-w-5xl">
          Manage stock allocation, reservations, shortages, source selection and inter-facility transfer operations across the logistics network.
        </p>
      </div>

      {/* RIGHT: COMPACT ACTION BUTTONS */}
      <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={() => alert("Exporting Allocation Operations Report...")}
          className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Download size={12} className="text-muted" />
          <span>Export Allocation Operations Report</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Reviewing Allocation Failures...")}
          className="px-2 py-1 bg-white border border-rose-200 text-rose-700 text-[10px] font-semibold rounded-md hover:bg-rose-50 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <ShieldAlert size={12} />
          <span>Review Allocation Failures</span>
        </button>

        {/* BULK ACTIONS DROPDOWN */}
        <div className="relative" ref={bulkRef}>
          <button
            type="button"
            onClick={() => setBulkOpen(!bulkOpen)}
            className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
          >
            <span>Bulk Actions</span>
            <ChevronDown size={12} className="text-muted" />
          </button>
          {bulkOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-md border border-line shadow-lg z-50 py-1 text-[10px]">
              <button onClick={() => { setBulkOpen(false); alert("Bulk Re-allocating Pending Demands..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Bulk Re-allocate Pending Demands
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Bulk Extending Active Reservations..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Bulk Extend Active Reservations
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Bulk Resolving Stock Shortages..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Bulk Resolve Shortage Cases
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => alert("Reviewing Expiring Reservations...")}
          className="px-2 py-1 bg-white border border-amber-200 text-amber-800 text-[10px] font-semibold rounded-md hover:bg-amber-50 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <ShieldAlert size={12} className="text-amber-600" />
          <span>Review Expiring Reservations</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Creating Allocation Review...")}
          className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <span>Create Allocation Review</span>
        </button>

        <button
          type="button"
          onClick={onCreateTransferClick || (() => alert("Opening Create Transfer Request Modal..."))}
          className="px-2.5 py-1 bg-primary-900 text-white text-[10px] font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Plus size={13} />
          <span>Create Transfer Request</span>
        </button>
      </div>
    </div>
  );
}
