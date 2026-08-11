"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Download, ShieldAlert, ChevronDown, Clock, FileText, Plus, Layers, CheckSquare, Truck
} from "lucide-react";

interface ShipmentPageHeaderProps {
  onRefresh?: () => void;
  onCreateClick?: (type?: string) => void;
}

export function ShipmentPageHeader({ onCreateClick }: ShipmentPageHeaderProps) {
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
    { label: "Create Standard Shipment", desc: "Dispatch package with default carrier" },
    { label: "Create Express Shipment", desc: "Priority delivery booking" },
    { label: "Schedule Carrier Pickup", desc: "Dispatch courier vehicle for pickup" },
    { label: "Create Bulk Shipment Manifest", desc: "Batch shipment generation" },
    { label: "Create Return Collection", desc: "Initiate reverse logistics pickup" },
    { label: "Create Carrier SLA Review", desc: "Evaluate carrier performance" },
    { label: "Create Damage/Loss Claim", desc: "File carrier indemnity claim" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-line shadow-xs">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold text-muted mb-0.5 flex items-center gap-1">
          <span>Logistics</span>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-bold">Shipments &amp; Tracking</span>
        </div>
        <h1 className="text-base sm:text-lg font-bold text-ink leading-tight truncate">
          Logistics &amp; Fulfilment Operations
        </h1>
        <p className="text-[10.5px] text-muted mt-0.5 truncate max-w-4xl">
          Manage shipment creation, carrier assignment, pickup, tracking, delivery execution, proof-of-delivery, failed delivery and shipment SLA across the beauty marketplace.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={() => alert("Exporting Shipment Operations Report...")}
          className="px-2.5 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Download size={12} className="text-muted" />
          <span>Export Shipment Report</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Navigating to Shipment Exceptions Queue...")}
          className="px-2 py-1 bg-white border border-rose-200 text-rose-700 text-[10px] font-semibold rounded-md hover:bg-rose-50 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <ShieldAlert size={12} />
          <span>Review Shipment Exceptions</span>
        </button>

        {/* BULK ACTIONS DROPDOWN */}
        <div className="relative" ref={bulkMenuRef}>
          <button
            type="button"
            onClick={() => setBulkDropdownOpen(!bulkDropdownOpen)}
            className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
          >
            <span>Bulk Actions</span>
            <ChevronDown size={12} className="text-muted" />
          </button>
          {bulkDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md border border-line shadow-lg z-50 py-1 text-[10px]">
              <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk Carrier Re-assignment..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink flex items-center gap-1.5">
                <Truck size={12} className="text-blue-600" /> Bulk Carrier Assignment
              </button>
              <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk Printing Waybills..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink flex items-center gap-1.5">
                <FileText size={12} className="text-purple-600" /> Print Waybills &amp; Labels
              </button>
              <button onClick={() => { setBulkDropdownOpen(false); alert("Bulk POD Verification..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink flex items-center gap-1.5">
                <CheckSquare size={12} className="text-emerald-600" /> Verify Proof of Delivery
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => alert("Filtering Delayed Shipments...")}
          className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold rounded-md hover:bg-amber-100 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Clock size={12} />
          <span>Review Delayed Shipments</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Launching Shipment Review...")}
          className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Layers size={12} className="text-muted" />
          <span>Create Shipment Review</span>
        </button>

        {/* CREATE SHIPMENT BUTTON */}
        <div className="relative" ref={createMenuRef}>
          <button
            type="button"
            onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
            className="px-2.5 py-1 bg-primary-900 text-white text-[10px] font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
          >
            <Plus size={13} />
            <span>+ Create Shipment</span>
            <ChevronDown size={12} className="text-white/80" />
          </button>
          {createDropdownOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-md border border-line shadow-xl z-50 py-1 text-[10px]">
              <div className="px-3 py-1 font-bold text-[9px] uppercase tracking-wider text-muted border-b border-line">
                Shipment Creation Options
              </div>
              {createOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCreateDropdownOpen(false);
                    if (onCreateClick) {
                      onCreateClick(opt.label);
                    } else {
                      alert(`Initiating: ${opt.label}`);
                    }
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-canvas transition-colors flex flex-col group"
                >
                  <span className="font-semibold text-ink group-hover:text-primary-900">{opt.label}</span>
                  <span className="text-[8.5px] text-muted">{opt.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
