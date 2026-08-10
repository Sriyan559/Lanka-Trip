"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, FileText, Calendar, Link as LinkIcon, Activity } from "lucide-react";

export function FacilityBottomPanels() {
  const capabilities = [
    { name: "Standard Storage", status: "Enabled" },
    { name: "Temperature Controlled", status: "Compliant" },
    { name: "Fragile Handling", status: "Enabled" },
    { name: "High Value Handling", status: "Enabled" },
    { name: "Batch / Lot Handling", status: "Enabled" },
    { name: "Expiry / FEFO", status: "Compliant" },
    { name: "Returns Processing", status: "Enabled" },
    { name: "COD Handoff", status: "Enabled" },
    { name: "Same-Day Fulfilment", status: "Enabled" },
    { name: "Next-Day Fulfilment", status: "Enabled" },
    { name: "B2B Fulfilment", status: "Enabled" },
    { name: "B2C Fulfilment", status: "Enabled" },
    { name: "Marketplace Fulfilment", status: "Enabled" },
    { name: "Supplier Fulfilment", status: "Enabled" },
  ];

  const maintenanceRows = [
    { type: "Preventive", area: "Dock 3", start: "06 Jun 02:00", end: "06 Jun 08:00", impact: "10%", owner: "Ops Team", status: "Scheduled" },
    { type: "Cleaning", area: "Temp Zone", start: "12 Jun 04:00", end: "12 Jun 07:00", impact: "5%", owner: "Facilities", status: "Scheduled" },
    { type: "Equipment Check", area: "Picking", start: "18 Jun 01:00", end: "18 Jun 04:30", impact: "15%", owner: "Vendor", status: "Scheduled" },
    { type: "Deep Cleaning", area: "Packing", start: "25 Jun 02:00", end: "25 Jun 07:00", impact: "8%", owner: "Facilities", status: "Planned" },
  ];

  const holdRows = [
    { ref: "HLD-2025-01", type: "Operational", scope: "Capacity", reason: "Capacity limit", applied: "31 May 06:15", expiry: "02 Jun 2025", state: "Active" },
    { ref: "HLD-2024-19", type: "Maintenance", scope: "Packing", reason: "Equipment issue", applied: "22 May 10:00", expiry: "24 May 2025", state: "Expired" },
  ];

  const complianceItems = [
    "Facility Verification", "Health & Safety", "Fire / Emergency Readiness",
    "Storage Compliance", "Temperature Compliance", "Restricted Goods Compliance",
    "Product Segregation", "Security Controls", "Access Controls", "Audit Readiness"
  ];

  return (
    <div className="space-y-2.5 text-[10px]">
      {/* ROW 1: CAPABILITY MATRIX, SERVICE AREA & CALENDAR, MAINTENANCE SCHEDULE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* CAPABILITY MATRIX */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-line pb-1">
            Capability Matrix
          </h3>
          <div className="grid grid-cols-2 gap-1.5 my-auto">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 bg-canvas border border-line rounded-md">
                <span className="text-ink font-medium truncate text-[9px]">{cap.name}</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1 py-0.1 text-[8px] rounded border border-emerald-200">
                  {cap.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICE AREA & OPERATING CALENDAR */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-line pb-1">
            Service Area &amp; Operating Calendar
          </h3>
          <div className="space-y-1 my-auto text-[9.5px]">
            <div className="flex justify-between"><span>Region Served:</span><strong className="text-ink">Western Province, Colombo Metro</strong></div>
            <div className="flex justify-between"><span>Delivery Zones:</span><strong className="text-ink">12 Zones</strong></div>
            <div className="flex justify-between"><span>Same-Day Zones:</span><strong className="text-emerald-700">6 Zones</strong></div>
            <div className="flex justify-between"><span>Next-Day Zones:</span><strong className="text-blue-700">12 Zones</strong></div>
            <div className="flex justify-between"><span>Operating Days:</span><strong className="text-ink">Mon – Sun</strong></div>
            <div className="flex justify-between"><span>Cut-off Time (Same-Day):</span><strong className="text-ink">12:00 PM</strong></div>
            <div className="flex justify-between"><span>Cut-off Time (Next-Day):</span><strong className="text-ink">16:00 PM</strong></div>
            <div className="flex justify-between"><span>Peak Days:</span><strong className="text-ink">Mon, Fri, Sat</strong></div>
            <div className="flex justify-between"><span>Holiday Calendar:</span><a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Calendar..."); }} className="text-primary-900 font-bold hover:underline">View Calendar</a></div>
            <div className="flex justify-between"><span>Blackout Periods:</span><strong className="text-muted">None</strong></div>
          </div>
        </div>

        {/* MAINTENANCE SCHEDULE */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-line pb-1">
            Maintenance Schedule (Next 30 Days)
          </h3>
          <div className="overflow-x-auto scrollbar-thin my-auto">
            <table className="w-full text-left text-[8.5px]">
              <thead className="text-muted font-semibold uppercase text-[7.5px] border-b border-line">
                <tr>
                  <th className="py-1">Type</th>
                  <th className="py-1">Area</th>
                  <th className="py-1">Start – End</th>
                  <th className="py-1 text-center">Cap Impact</th>
                  <th className="py-1 text-center">Owner</th>
                  <th className="py-1 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {maintenanceRows.map((m, i) => (
                  <tr key={i}>
                    <td className="py-1 font-semibold text-ink">{m.type}</td>
                    <td className="py-1 text-muted">{m.area}</td>
                    <td className="py-1 font-mono text-[8px]">{m.start} – {m.end}</td>
                    <td className="py-1 text-center font-bold text-amber-700">{m.impact}</td>
                    <td className="py-1 text-center text-muted">{m.owner}</td>
                    <td className="py-1 text-center">
                      <span className="px-1 py-0.1 rounded text-[7.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ROW 2: HOLDS, EXCEPTIONS, COMPLIANCE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* ACTIVE / PAST HOLDS */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-line pb-1">
            Active / Past Holds
          </h3>
          <div className="overflow-x-auto scrollbar-thin my-auto">
            <table className="w-full text-left text-[8.5px]">
              <thead className="text-muted font-semibold uppercase text-[7.5px] border-b border-line">
                <tr>
                  <th className="py-1">Hold Ref</th>
                  <th className="py-1">Type</th>
                  <th className="py-1">Scope</th>
                  <th className="py-1">Reason</th>
                  <th className="py-1">Applied At - Expiry</th>
                  <th className="py-1 text-center">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {holdRows.map((h, i) => (
                  <tr key={i}>
                    <td className="py-1 font-mono font-bold text-primary-900">{h.ref}</td>
                    <td className="py-1 text-ink">{h.type}</td>
                    <td className="py-1 text-muted">{h.scope}</td>
                    <td className="py-1 text-muted">{h.reason}</td>
                    <td className="py-1 font-mono text-[8px]">{h.applied} - {h.expiry}</td>
                    <td className="py-1 text-center">
                      <span className={`px-1 py-0.1 rounded text-[7.5px] font-bold ${
                        h.state === "Active" ? "text-amber-800 bg-amber-50 border border-amber-200" : "text-gray-600 bg-gray-100 border border-gray-200"
                      }`}>
                        {h.state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FACILITY EXCEPTIONS (8) */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-line pb-1">
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider">Facility Exceptions (8)</h3>
            <button onClick={() => alert("Viewing All Exceptions...")} className="text-[8px] text-primary-900 font-bold hover:underline">View All Exceptions</button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 my-auto text-[9px]">
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>Capacity Exceeded</span><strong className="text-rose-700 font-bold">2</strong>
            </div>
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>Inventory Location Failure</span><strong className="text-amber-700 font-bold">2</strong>
            </div>
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>Return Receiving Backlog</span><strong className="text-amber-700 font-bold">1</strong>
            </div>
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>Dock Congestion</span><strong className="text-rose-700 font-bold">1</strong>
            </div>
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>Picking Congestion</span><strong className="text-amber-700 font-bold">1</strong>
            </div>
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>Carrier Pickup Failure</span><strong className="text-rose-700 font-bold">1</strong>
            </div>
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>Equipment Failure</span><strong className="text-emerald-700 font-bold">0</strong>
            </div>
            <div className="p-1.5 bg-canvas border border-line rounded flex items-center justify-between">
              <span>SLA Breach</span><strong className="text-emerald-700 font-bold">0</strong>
            </div>
          </div>
        </div>

        {/* COMPLIANCE & SAFETY */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-line pb-1">
            Compliance &amp; Safety
          </h3>

          <div className="grid grid-cols-2 gap-1 my-auto text-[9px]">
            {complianceItems.map((ci, i) => (
              <div key={i} className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-600 flex-shrink-0" />
                <span className="text-ink font-medium">{ci}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: SLA METRICS, LINKED RECORDS, ACTIVITY / AUDIT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* SLA METRICS (THIS MONTH) */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-line pb-1">
            SLA Metrics (This Month)
          </h3>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 my-auto text-[9px]">
            <div className="flex justify-between"><span>Allocation Readiness:</span><strong className="text-emerald-700 font-bold">96.4%</strong></div>
            <div className="flex justify-between"><span>Inventory Location Accuracy:</span><strong className="text-emerald-700 font-bold">99.1%</strong></div>
            <div className="flex justify-between"><span>Pick Accuracy:</span><strong className="text-emerald-700 font-bold">98.3%</strong></div>
            <div className="flex justify-between"><span>Average Pick Time:</span><strong className="text-ink font-bold">8.1 min</strong></div>
            <div className="flex justify-between"><span>Pack Accuracy:</span><strong className="text-emerald-700 font-bold">97.6%</strong></div>
            <div className="flex justify-between"><span>Average Pack Time:</span><strong className="text-ink font-bold">6.5 min</strong></div>
            <div className="flex justify-between"><span>Dispatch SLA:</span><strong className="text-emerald-700 font-bold">96.2%</strong></div>
            <div className="flex justify-between"><span>Current SLA:</span><strong className="text-emerald-700 font-bold">93.6%</strong></div>
            <div className="flex justify-between"><span>Fulfilment Throughput:</span><strong className="text-ink font-bold">1,248/day</strong></div>
            <div className="flex justify-between"><span>Transfer SLA:</span><strong className="text-emerald-700 font-bold">94.1%</strong></div>
            <div className="flex justify-between"><span>Returns Receiving SLA:</span><strong className="text-emerald-700 font-bold">94%</strong></div>
            <div className="flex justify-between"><span>Overall Facility SLA:</span><strong className="text-emerald-700 font-bold">94.1%</strong></div>
          </div>
        </div>

        {/* LINKED RECORDS */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-line pb-1">
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider">Linked Records</h3>
            <button onClick={() => alert("Viewing All Linked Records...")} className="text-[8px] text-primary-900 font-bold hover:underline">View All Linked Records</button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 my-auto text-[9.5px]">
            <div className="flex justify-between"><span>Facilities:</span><strong className="text-ink">6</strong></div>
            <div className="flex justify-between"><span>Inventory Locations:</span><strong className="text-ink">1,248</strong></div>
            <div className="flex justify-between"><span>Fulfilment Orders:</span><strong className="text-blue-700">312</strong></div>
            <div className="flex justify-between"><span>Shipments:</span><strong className="text-indigo-700">184</strong></div>
            <div className="flex justify-between"><span>Transfers:</span><strong className="text-amber-700">38</strong></div>
            <div className="flex justify-between"><span>Returns:</span><strong className="text-rose-700">23</strong></div>
            <div className="flex justify-between"><span>Maintenance Jobs:</span><strong className="text-purple-700">12</strong></div>
            <div className="flex justify-between"><span>Audit Records:</span><strong className="text-ink">16</strong></div>
          </div>
        </div>

        {/* ACTIVITY / AUDIT SUMMARY */}
        <div className="bg-white p-3 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-line pb-1">
            Activity / Audit Summary
          </h3>

          <div className="space-y-1 my-auto text-[9.5px]">
            <div className="flex justify-between"><span>Changes Last 7 Days:</span><strong className="text-ink font-bold">142</strong></div>
            <div className="flex justify-between"><span>Updated By:</span><strong className="text-ink">Logistics Service</strong></div>
            <div className="flex justify-between"><span>Last Updated:</span><strong className="text-ink">31 May 2025 09:58</strong></div>
            <div className="flex justify-between"><span>Record Version:</span><strong className="text-ink">v2.4</strong></div>
            <div className="flex justify-between"><span>Audit Trail:</span><a href="#" onClick={(e) => { e.preventDefault(); alert("Viewing Audit Trail..."); }} className="text-primary-900 font-bold hover:underline">View Trail →</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
