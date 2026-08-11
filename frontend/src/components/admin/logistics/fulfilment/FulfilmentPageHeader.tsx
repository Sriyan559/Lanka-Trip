"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Download, ShieldAlert, ChevronDown, Clock, FileText, Plus, Layers, CheckSquare, Truck
} from "lucide-react";

interface FulfilmentPageHeaderProps {
  onRefresh?: () => void;
  onCreateClick?: () => void;
}

export function FulfilmentPageHeader({ onCreateClick }: FulfilmentPageHeaderProps) {
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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-line shadow-xs">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold text-muted mb-0.5 flex items-center gap-1">
          <span>Logistics</span>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-bold">Fulfilment Orders</span>
        </div>
        <h1 className="text-base sm:text-lg font-bold text-ink leading-tight truncate">
          Fulfilment Order Management
        </h1>
        <p className="text-[10.5px] text-muted mt-0.5 truncate max-w-4xl">
          Manage warehouse assignment, inventory allocation, picking, packing, quality checks, dispatch readiness and fulfilment SLA across marketplace orders.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={() => alert("Exporting Fulfilment Operations Report...")}
          className="px-2.5 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Download size={12} className="text-muted" />
          <span>Export Fulfilment Operations Report</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Filtering Blocked Fulfilment Orders...")}
          className="px-2 py-1 bg-white border border-rose-200 text-rose-700 text-[10px] font-semibold rounded-md hover:bg-rose-50 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <ShieldAlert size={12} />
          <span>Review Blocked Fulfilment</span>
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
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md border border-line shadow-lg z-50 py-1 text-[10px]">
              <button onClick={() => { setBulkOpen(false); alert("Bulk Allocating Inventory..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink flex items-center gap-1.5">
                <CheckSquare size={12} className="text-emerald-600" /> Bulk Allocate Inventory
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Bulk Generating Pick Lists..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink flex items-center gap-1.5">
                <FileText size={12} className="text-purple-600" /> Generate Pick Lists
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Bulk Marking Ready for Dispatch..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink flex items-center gap-1.5">
                <Truck size={12} className="text-blue-600" /> Mark Ready for Dispatch
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => alert("Reviewing SLA Breached Fulfilment Orders...")}
          className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold rounded-md hover:bg-amber-100 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Clock size={12} />
          <span>Review SLA Breaches</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Creating Fulfilment Performance Review...")}
          className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Layers size={12} className="text-muted" />
          <span>Create Fulfilment Review</span>
        </button>

        <button
          type="button"
          onClick={onCreateClick || (() => alert("Opening Create Fulfilment Order Dialog..."))}
          className="px-2.5 py-1 bg-primary-900 text-white text-[10px] font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Plus size={13} />
          <span>+ Create Fulfilment Order</span>
        </button>
      </div>
    </div>
  );
}
