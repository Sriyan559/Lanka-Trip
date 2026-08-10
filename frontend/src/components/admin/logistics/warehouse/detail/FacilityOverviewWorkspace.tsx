"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Link as LinkIcon, Calendar } from "lucide-react";

interface FacilityOverviewWorkspaceProps {
  facilityId: string;
}

export function FacilityOverviewWorkspace({ facilityId }: FacilityOverviewWorkspaceProps) {
  const linkedRecords = [
    { label: "Warehouse Agreement", ref: `AG-WH-${facilityId}`, status: "Active" },
    { label: "Operator Agreement", ref: "AG-OP-SLB-01", status: "Active" },
    { label: "Carrier Coverage", ref: `CC-WH-${facilityId}`, status: "Active" },
    { label: "Service Area Profile", ref: "SA-CMB-01", status: "Active" },
    { label: "SLA Policy", ref: `SLA-WH-${facilityId}`, status: "Active" },
    { label: "Maintenance Policy", ref: `MT-WH-${facilityId}`, status: "Active" },
    { label: "Audit Profile", ref: `AU-WH-${facilityId}`, status: "Active" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[10px]">
      {/* CARD 1: FACILITY IDENTITY */}
      <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 border-b border-line pb-1.5">
          Facility Identity
        </h3>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px]">
          <div><span className="text-muted block text-[9px]">Facility Reference:</span><strong className="font-mono text-primary-900 font-bold">{facilityId}</strong></div>
          <div><span className="text-muted block text-[9px]">Facility Type:</span><strong className="text-ink font-semibold">Warehouse</strong></div>
          <div><span className="text-muted block text-[9px]">Facility Status:</span><span className="font-bold text-emerald-700">Operational</span></div>
          <div><span className="text-muted block text-[9px]">Operations:</span><span className="font-bold text-amber-700">High Utilization</span></div>
          <div><span className="text-muted block text-[9px]">Operator:</span><strong className="text-ink font-semibold">SL Beauty</strong></div>
          <div><span className="text-muted block text-[9px]">Facility Owner:</span><strong className="text-ink font-semibold">Ops Directorate</strong></div>
          <div><span className="text-muted block text-[9px]">Operations Manager:</span><strong className="text-ink font-semibold">Elena Vance</strong></div>
          <div><span className="text-muted block text-[9px]">Sales Channels:</span><strong className="text-ink font-semibold">Marketplace</strong></div>
          <div><span className="text-muted block text-[9px]">Service Areas:</span><strong className="text-ink font-semibold">Colombo Metro / Western</strong></div>
          <div><span className="text-muted block text-[9px]">Delivery Zones:</span><strong className="text-ink font-semibold">Same-Day / Next-Day</strong></div>
          <div><span className="text-muted block text-[9px]">Created At:</span><strong className="text-ink font-semibold">Jan 12 2021</strong></div>
          <div><span className="text-muted block text-[9px]">Activated At:</span><strong className="text-ink font-semibold">Feb 01 2021</strong></div>
        </div>
      </div>

      {/* CARD 2: OPERATIONAL STATE & LINKED RECORDS */}
      <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 border-b border-line pb-1.5">
          <LinkIcon size={12} className="text-primary-900" />
          Operational State &amp; Linked Records
        </h3>

        <div className="space-y-1 my-auto">
          {linkedRecords.map((lr, i) => (
            <div key={i} className="flex items-center justify-between text-[9.5px]">
              <span className="text-muted">{lr.label}:</span>
              <div className="flex items-center gap-1">
                <span className="font-mono font-bold text-ink">{lr.ref}</span>
                <span className="px-1 py-0.1 text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded">
                  {lr.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-line flex flex-wrap items-center gap-1">
          <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">Operational</span>
          <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">No Active Hold</span>
          <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">Same-Day Enabled</span>
          <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">Returns Active</span>
          <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">Dispatch Stable</span>
          <span className="px-1.5 py-0.2 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">Not Under Maintenance</span>
        </div>
      </div>

      {/* CARD 3: LIFECYCLE DATES & STATUS SNAPSHOT */}
      <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 border-b border-line pb-1.5">
          <Calendar size={12} className="text-primary-900" />
          Lifecycle Dates &amp; Status Snapshot
        </h3>

        <div className="grid grid-cols-2 gap-3 my-auto text-[9.5px]">
          <div className="space-y-1">
            <div><span className="text-muted block text-[8.5px]">Facility Registered:</span><strong className="text-ink">12 Jan 2021</strong></div>
            <div><span className="text-muted block text-[8.5px]">Identity Verified:</span><strong className="text-ink">14 Jan 2021</strong></div>
            <div><span className="text-muted block text-[8.5px]">Operator Verified:</span><strong className="text-ink">16 Jan 2021</strong></div>
            <div><span className="text-muted block text-[8.5px]">Operational Profile:</span><strong className="text-ink">25 Jan 2021</strong></div>
            <div><span className="text-muted block text-[8.5px]">Service Areas:</span><strong className="text-ink">29 Jan 2021</strong></div>
            <div><span className="text-muted block text-[8.5px]">Fulfilment Enabled:</span><strong className="text-ink">01 Feb 2021</strong></div>
          </div>

          <div className="space-y-1 border-l border-line pl-3">
            <div><span className="text-muted block text-[8.5px]">Current State:</span><span className="px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded">Operational</span></div>
            <div><span className="text-muted block text-[8.5px]">State Since:</span><strong className="text-ink">01 Feb 2021</strong></div>
            <div><span className="text-muted block text-[8.5px]">Uptime:</span><strong className="text-emerald-700 font-bold">&gt; 99.9%</strong></div>
            <div><span className="text-muted block text-[8.5px]">Last State Change:</span><strong className="text-ink">31 May 2025 09:21 AM</strong></div>
            <div><span className="text-muted block text-[8.5px]">Next Review:</span><strong className="text-ink">15 Jun 2025</strong></div>
            <div><span className="text-muted block text-[8.5px]">Record Version:</span><strong className="text-ink">v2.4</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
