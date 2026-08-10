"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Download, ShieldAlert, ChevronDown, Clock, FileText, Plus, RefreshCw, Layers, CheckSquare, Truck, AlertTriangle
} from "lucide-react";

interface LogisticsCommandHeaderProps {
  onRefresh?: () => void;
  onCreateOperationClick?: (type?: string) => void;
}

export function LogisticsCommandHeader({ onRefresh, onCreateOperationClick }: LogisticsCommandHeaderProps) {
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [bulkDropdownOpen, setBulkDropdownOpen] = useState(false);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const bulkMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (createMenuRef.current && !createMenuRef.current.contains(event.target as Node)) {
        setCreateDropdownOpen(false);
      }
      if (bulkMenuRef.current && !bulkMenuRef.current.contains(event.target as Node)) {
        setBulkDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const createOptions = [
    { label: "Create Fulfilment Order", desc: "Dispatch order from main DC" },
    { label: "Create Shipment", desc: "Book carrier shipment record" },
    { label: "Schedule Pickup", desc: "Dispatch courier vehicle for pickup" },
    { label: "Create Inventory Transfer", desc: "Inter-warehouse stock transfer" },
    { label: "Create Return Collection", desc: "Initiate reverse logistics pickup" },
    { label: "Create Carrier Review", desc: "Evaluate carrier SLA performance" },
    { label: "Create Logistics Claim", desc: "File lost/damaged goods claim" },
    { label: "Create Reconciliation Review", desc: "Financial COD & carrier audit" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-line shadow-sm">
      <div>
        <div className="text-[11px] font-semibold text-muted mb-1 flex items-center gap-1.5">
          <span>Logistics</span>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-bold">Command Center</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-ink leading-tight">
          Logistics &amp; Fulfilment Command Center
        </h1>
        <p className="text-xs text-muted mt-1 max-w-4xl">
          Centralized monitoring and governance for fulfilment, warehouse operations, shipping, delivery, reverse logistics, logistics costs, claims, and SLA performance across the beauty marketplace.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => alert("Exporting Logistics Operations Report...")}
          className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download size={14} className="text-muted" />
          <span>Export Logistics Operations Report</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Navigating to Critical Exceptions Queue...")}
          className="px-3 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg hover:bg-rose-50 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <ShieldAlert size={14} />
          <span>Review Critical Exceptions</span>
        </button>

        {/* BULK ACTIONS DROPDOWN */}
        <div className="relative" ref={bulkMenuRef}>
          <button
            type="button"
            onClick={() => setBulkDropdownOpen(!bulkDropdownOpen)}
            className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <span>Bulk Actions</span>
            <ChevronDown size={14} className="text-muted" />
          </button>
          {bulkDropdownOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg border border-line shadow-lg z-50 py-1 text-xs">
              <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk Re-assigning Carriers..."); }} className="w-full px-3 py-2 text-left hover:bg-canvas font-medium text-ink flex items-center gap-2">
                <Truck size={14} className="text-blue-600" /> Bulk Carrier Assignment
              </button>
              <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk Printing Shipping Labels..."); }} className="w-full px-3 py-2 text-left hover:bg-canvas font-medium text-ink flex items-center gap-2">
                <FileText size={14} className="text-purple-600" /> Print Waybills &amp; Labels
              </button>
              <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk Reconciling COD..."); }} className="w-full px-3 py-2 text-left hover:bg-canvas font-medium text-ink flex items-center gap-2">
                <CheckSquare size={14} className="text-emerald-600" /> Mark Reconciled
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => alert("Filtering Delayed Shipments...")}
          className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Clock size={14} />
          <span>Review Delayed Shipments</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Launching Logistics Performance Review...")}
          className="px-3 py-1.5 bg-white border border-line text-ink text-xs font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Layers size={14} className="text-muted" />
          <span>Create Logistics Review</span>
        </button>

        {/* CREATE LOGISTICS OPERATION DROPDOWN */}
        <div className="relative" ref={createMenuRef}>
          <button
            type="button"
            onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
            className="px-3.5 py-1.5 bg-primary-900 text-white text-xs font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>Create Logistics Operation</span>
            <ChevronDown size={14} className="text-white/80" />
          </button>
          {createDropdownOpen && (
            <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl border border-line shadow-xl z-50 py-1.5 text-xs">
              <div className="px-3 py-1.5 font-bold text-[10px] uppercase tracking-wider text-muted border-b border-line">
                Logistics Operations Menu
              </div>
              {createOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCreateDropdownOpen(false);
                    if (onCreateOperationClick) {
                      onCreateOperationClick(opt.label);
                    } else {
                      alert(`Initiating: ${opt.label}`);
                    }
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-canvas transition-colors flex flex-col group"
                >
                  <span className="font-semibold text-ink group-hover:text-primary-900">{opt.label}</span>
                  <span className="text-[10px] text-muted">{opt.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="p-1.5 bg-white border border-line text-muted hover:text-ink rounded-lg hover:bg-canvas transition-colors shadow-sm"
            title="Refresh Logistics Data"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
