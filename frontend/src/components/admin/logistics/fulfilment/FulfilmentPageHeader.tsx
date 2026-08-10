"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Download, ShieldAlert, ChevronDown, Clock, FileText, Plus, RefreshCw, Layers, CheckSquare, Truck, AlertTriangle
} from "lucide-react";

interface FulfilmentPageHeaderProps {
  onRefresh?: () => void;
  onCreateClick?: () => void;
}

export function FulfilmentPageHeader({ onRefresh, onCreateClick }: FulfilmentPageHeaderProps) {
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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-line shadow-sm">
      <div>
        <div className="text-[11px] font-semibold text-muted mb-1 flex items-center gap-1.5">
          <span>Logistics</span>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-bold">Fulfilment Orders</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-ink leading-tight">
          Fulfilment Order Management
        </h1>
        <p className="text-xs text-muted mt-1 max-w-4xl">
          Manage warehouse assignment, inventory allocation, picking, packing, quality checks, dispatch readiness and fulfilment SLA across marketplace orders.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => alert("Exporting Fulfilment Operations Report...")}
          className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download size={14} className="text-muted" />
          <span>Export Fulfilment Operations Report</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Filtering Blocked Fulfilment Orders...")}
          className="px-3 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg hover:bg-rose-50 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <ShieldAlert size={14} />
          <span>Review Blocked Fulfilment</span>
        </button>

        {/* BULK ACTIONS DROPDOWN */}
        <div className="relative" ref={bulkRef}>
          <button
            type="button"
            onClick={() => setBulkOpen(!bulkOpen)}
            className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <span>Bulk Actions</span>
            <ChevronDown size={14} className="text-muted" />
          </button>
          {bulkOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg border border-line shadow-lg z-50 py-1 text-xs">
              <button onClick={() => { setBulkOpen(false); alert("Bulk Allocating Inventory..."); }} className="w-full px-3 py-2 text-left hover:bg-canvas font-medium text-ink flex items-center gap-2">
                <CheckSquare size={14} className="text-emerald-600" /> Bulk Allocate Inventory
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Bulk Generating Pick Lists..."); }} className="w-full px-3 py-2 text-left hover:bg-canvas font-medium text-ink flex items-center gap-2">
                <FileText size={14} className="text-purple-600" /> Generate Pick Lists
              </button>
              <button onClick={() => { setBulkOpen(false); alert("Bulk Marking Ready for Dispatch..."); }} className="w-full px-3 py-2 text-left hover:bg-canvas font-medium text-ink flex items-center gap-2">
                <Truck size={14} className="text-blue-600" /> Mark Ready for Dispatch
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => alert("Reviewing SLA Breached Fulfilment Orders...")}
          className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Clock size={14} />
          <span>Review SLA Breaches</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Creating Fulfilment Performance Review...")}
          className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Layers size={14} className="text-muted" />
          <span>Create Fulfilment Review</span>
        </button>

        <button
          type="button"
          onClick={onCreateClick || (() => alert("Opening Create Fulfilment Order Dialog..."))}
          className="px-3.5 py-1.5 bg-primary-900 text-white text-xs font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Create Fulfilment Order</span>
        </button>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="p-1.5 bg-white border border-line text-muted hover:text-ink rounded-lg hover:bg-canvas transition-colors shadow-sm"
            title="Refresh Fulfilment Data"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
