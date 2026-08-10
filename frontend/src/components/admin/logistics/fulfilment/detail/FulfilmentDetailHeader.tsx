"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, ChevronDown, ShieldAlert, Layers } from "lucide-react";

interface FulfilmentDetailHeaderProps {
  fulfilmentId: string;
}

export function FulfilmentDetailHeader({ fulfilmentId }: FulfilmentDetailHeaderProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setExportOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-line shadow-xs">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold text-muted mb-0.5 flex items-center gap-1">
          <Link href="/admin/logistics" className="hover:underline text-muted">
            Logistics
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/admin/logistics/fulfilment-orders" className="hover:underline text-muted">
            Fulfilment Orders
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-primary-900 font-bold font-mono">{fulfilmentId}</span>
        </div>
        <h1 className="text-base sm:text-lg font-bold text-ink leading-tight truncate">
          LG03 — Fulfilment Order Detail
        </h1>
        <p className="text-[10.5px] text-muted mt-0.5 truncate max-w-4xl">
          Review allocation, warehouse execution, picking, packing, quality, dispatch readiness, shipment linkage, exceptions and fulfilment audit history.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
        <Link
          href="/admin/logistics/fulfilment-orders"
          className="px-2.5 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <ArrowLeft size={12} className="text-muted" />
          <span>Back to Fulfilment Orders</span>
        </Link>

        {/* EXPORT DROPDOWN */}
        <div className="relative" ref={exportRef}>
          <button
            type="button"
            onClick={() => setExportOpen(!exportOpen)}
            className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
          >
            <Download size={12} className="text-muted" />
            <span>Export Fulfilment Detail</span>
            <ChevronDown size={12} className="text-muted" />
          </button>
          {exportOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-md border border-line shadow-lg z-50 py-1 text-[10px]">
              <button onClick={() => { setExportOpen(false); alert("Exporting PDF Summary..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Export PDF Summary
              </button>
              <button onClick={() => { setExportOpen(false); alert("Exporting Excel Manifest..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Export Excel Manifest
              </button>
              <button onClick={() => { setExportOpen(false); alert("Exporting JSON Audit Record..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Export Audit Log (JSON)
              </button>
            </div>
          )}
        </div>

        {/* MORE ACTIONS DROPDOWN */}
        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            className="px-2 py-1 bg-white border border-line text-ink text-[10px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
          >
            <span>More Actions</span>
            <ChevronDown size={12} className="text-muted" />
          </button>
          {moreOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md border border-line shadow-lg z-50 py-1 text-[10px]">
              <button onClick={() => { setMoreOpen(false); alert("Re-allocating Inventory..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Re-allocate Inventory
              </button>
              <button onClick={() => { setMoreOpen(false); alert("Re-assigning Picker..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Re-assign Picker
              </button>
              <button onClick={() => { setMoreOpen(false); alert("Printing Pick/Pack Manifest..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Print Pick/Pack Manifest
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => alert("Reviewing Fulfilment Exception...")}
          className="px-2 py-1 bg-white border border-rose-200 text-rose-700 text-[10px] font-semibold rounded-md hover:bg-rose-50 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <ShieldAlert size={12} />
          <span>Review Fulfilment Exception</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Launching Fulfilment Review Dialog...")}
          className="px-2.5 py-1 bg-primary-900 text-white text-[10px] font-bold rounded-md hover:bg-primary-800 transition-colors shadow-xs flex items-center gap-1 whitespace-nowrap"
        >
          <Layers size={12} />
          <span>Create Fulfilment Review</span>
        </button>
      </div>
    </div>
  );
}
