"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, ShieldAlert, ChevronDown, Plus } from "lucide-react";

interface FacilityDetailHeaderProps {
  facilityId: string;
}

export function FacilityDetailHeader({ facilityId }: FacilityDetailHeaderProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
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
          <Link href="/admin/logistics/warehouses" className="hover:underline text-muted">
            Warehouses &amp; Fulfilment Centres
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-bold font-mono">{facilityId}</span>
        </div>
        <h1 className="text-lg md:text-xl font-bold text-ink leading-tight flex items-center gap-2">
          <span>LG05 — Warehouse / Fulfilment Centre Detail</span>
        </h1>
        <p className="text-[11px] text-muted mt-0.5 max-w-4xl">
          Monitor facility capacity, inventory locations, fulfilment workload, picking, packing, dispatch, transfers, returns, maintenance, SLA performance and audit controls for a single warehouse / fulfilment centre.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <Link
          href="/admin/logistics/warehouses"
          className="px-2.5 py-1 bg-white border border-line text-ink text-[11px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>Back to Warehouses</span>
        </Link>

        <button
          type="button"
          onClick={() => alert(`Exporting facility detail for ${facilityId}...`)}
          className="px-2.5 py-1 bg-white border border-line text-ink text-[11px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Download size={13} className="text-muted" />
          <span>Export Facility Detail</span>
        </button>

        {/* MORE ACTIONS DROPDOWN */}
        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            className="px-2.5 py-1 bg-white border border-line text-ink text-[11px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1"
          >
            <span>More Actions</span>
            <ChevronDown size={13} className="text-muted" />
          </button>
          {moreOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg border border-line shadow-lg z-50 py-1 text-[11px]">
              <button onClick={() => { setMoreOpen(false); alert("Auditing Facility Capabilities..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Audit Facility Capabilities
              </button>
              <button onClick={() => { setMoreOpen(false); alert("Downloading Operational Logs..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Download Operational Logs
              </button>
              <button onClick={() => { setMoreOpen(false); alert("Requesting SLA Review..."); }} className="w-full px-3 py-1.5 text-left hover:bg-canvas font-medium text-ink">
                Request SLA Performance Review
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => alert("Opening Facility Exceptions...")}
          className="px-2.5 py-1 bg-white border border-rose-200 text-rose-700 text-[11px] font-semibold rounded-lg hover:bg-rose-50 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <ShieldAlert size={13} />
          <span>Review Facility Exception</span>
        </button>

        <button
          type="button"
          onClick={() => alert("Creating Facility Review Record...")}
          className="px-3 py-1 bg-primary-900 text-white text-[11px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1"
        >
          <Plus size={14} />
          <span>+ Create Facility Review</span>
        </button>
      </div>
    </div>
  );
}
