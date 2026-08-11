"use client";

import React from "react";
import { Boxes, Layers, CheckSquare } from "lucide-react";

export function FulfilmentMiddleWorkspaces() {
  const pickingTasks = [
    { task: "PICK-001", zone: "Zone A-01", bin: "A-01-01", picker: "Kasun P.", req: 6, picked: 6, short: 0, started: "10:45 AM", completed: "11:05 AM", status: "Completed" },
    { task: "PICK-002", zone: "Zone A-01", bin: "A-01-02", picker: "Kasun P.", req: 6, picked: 6, short: 0, started: "11:08 AM", completed: "11:20 AM", status: "Completed" },
    { task: "PICK-003", zone: "Zone A-02", bin: "A-02-01", picker: "Menuka S.", req: 6, picked: 6, short: 0, started: "11:12 AM", completed: "11:25 AM", status: "Completed" },
    { task: "PICK-004", zone: "Zone A-03", bin: "A-03-01", picker: "Tharindu D.", req: 3, picked: 3, short: 0, started: "11:15 AM", completed: "11:30 AM", status: "Completed" },
    { task: "PICK-005", zone: "Zone A-04", bin: "A-04-01", picker: "Tharindu D.", req: 3, picked: 3, short: 0, started: "11:17 AM", completed: "11:35 AM", status: "Completed" },
  ];

  const packingPackages = [
    { ref: "PKG-0001", station: "PK-04", packer: "Udari K.", items: 2, type: "Box", weight: "0.45", dim: "20x15x8", fragile: "No", handling: "None", qc: "Passed", status: "Completed" },
    { ref: "PKG-0002", station: "PK-04", packer: "Udari K.", items: 2, type: "Box", weight: "0.50", dim: "22x16x9", fragile: "Yes", handling: "Fragile", qc: "Pending", status: "In-Progress" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2.5 text-[10px]">
      {/* 1. INVENTORY ALLOCATION SUMMARY (xl:col-span-3) */}
      <div className="xl:col-span-3 bg-white p-2.5 rounded-xl border border-line shadow-xs flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1 flex items-center gap-1">
            <Boxes size={13} className="text-purple-600" /> Inventory Allocation Summary
          </h4>
          <div className="space-y-0.5 text-[9.5px] mt-1.5">
            <div className="flex justify-between"><span className="text-muted">Ordered Quantity:</span><strong className="text-ink">24</strong></div>
            <div className="flex justify-between"><span className="text-muted">Reserved Quantity:</span><strong className="text-emerald-700 font-bold">24</strong></div>
            <div className="flex justify-between"><span className="text-muted">Allocated Quantity:</span><strong className="text-emerald-700 font-bold">24</strong></div>
            <div className="flex justify-between"><span className="text-muted">Short Quantity:</span><span className="text-muted">0</span></div>
            <div className="flex justify-between"><span className="text-muted">Allocation Strategy:</span><span className="font-mono text-muted">FEFO</span></div>
            <div className="flex justify-between"><span className="text-muted">Reservation Expiry:</span><span className="text-muted text-[8.5px]">May 27 2025 09:30 AM</span></div>
            <div className="flex justify-between"><span className="text-muted">Source Warehouse:</span><span className="text-ink font-semibold">FC Colombo Central</span></div>
            <div className="flex justify-between"><span className="text-muted">Source Location:</span><span className="font-mono text-muted text-[8.5px]">A-01-01, A-01-02, A-02-01</span></div>
            <div className="flex justify-between"><span className="text-muted">Transfer Required:</span><span className="text-muted">No</span></div>
          </div>
        </div>

        <div className="pt-1.5 border-t border-line space-y-0.5 mt-2">
          <div className="flex justify-between text-[9.5px]">
            <span className="text-muted font-medium">Allocation Score:</span>
            <strong className="text-emerald-700 font-bold">98%</strong>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: "98%" }} />
          </div>
        </div>
      </div>

      {/* 2. PICKING WORKSPACE (xl:col-span-5) */}
      <div className="xl:col-span-5 bg-white rounded-xl border border-line shadow-xs overflow-hidden flex flex-col justify-between text-[10px]">
        <div>
          <div className="p-2 border-b border-line bg-canvas flex items-center justify-between">
            <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Layers size={13} className="text-purple-600" /> Picking Workspace
            </h4>
            <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              5 / 5 Completed
            </span>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-[9.5px] whitespace-nowrap divide-y divide-line">
              <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider text-[8px]">
                <tr>
                  <th className="px-2 py-1 font-mono">Task ID</th>
                  <th className="px-1.5 py-1">Zone</th>
                  <th className="px-1.5 py-1 font-mono">Bin</th>
                  <th className="px-2 py-1">Picker</th>
                  <th className="px-1.5 py-1 text-center">Req Qty</th>
                  <th className="px-1.5 py-1 text-center">Picked Qty</th>
                  <th className="px-1.5 py-1 text-center">Short Qty</th>
                  <th className="px-1.5 py-1">Started At</th>
                  <th className="px-1.5 py-1">Completed At</th>
                  <th className="px-2 py-1 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white font-medium">
                {pickingTasks.map((t, i) => (
                  <tr key={i} className="hover:bg-canvas transition-colors">
                    <td className="px-2 py-1 font-mono text-primary-900 font-bold">{t.task}</td>
                    <td className="px-1.5 py-1 text-muted">{t.zone}</td>
                    <td className="px-1.5 py-1 font-mono text-muted">{t.bin}</td>
                    <td className="px-2 py-1 text-ink">{t.picker}</td>
                    <td className="px-1.5 py-1 text-center font-bold">{t.req}</td>
                    <td className="px-1.5 py-1 text-center font-bold text-emerald-700">{t.picked}</td>
                    <td className="px-1.5 py-1 text-center text-gray-400">{t.short}</td>
                    <td className="px-1.5 py-1 text-muted font-mono text-[8.5px]">{t.started}</td>
                    <td className="px-1.5 py-1 text-muted font-mono text-[8.5px]">{t.completed}</td>
                    <td className="px-2 py-1 text-center">
                      <span className="px-1.5 py-0.1 rounded text-[8.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. PACKING WORKSPACE (xl:col-span-4) */}
      <div className="xl:col-span-4 bg-white rounded-xl border border-line shadow-xs overflow-hidden flex flex-col justify-between text-[10px]">
        <div>
          <div className="p-2 border-b border-line bg-canvas flex items-center justify-between">
            <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider flex items-center gap-1">
              <CheckSquare size={13} className="text-sky-600" /> Packing Workspace
            </h4>
            <span className="text-[8.5px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              1 / 2 In-Progress
            </span>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-[9.5px] whitespace-nowrap divide-y divide-line">
              <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider text-[8px]">
                <tr>
                  <th className="px-2 py-1 font-mono">Package Ref</th>
                  <th className="px-1.5 py-1">Station</th>
                  <th className="px-2 py-1">Packer</th>
                  <th className="px-1.5 py-1 text-center">Items</th>
                  <th className="px-1.5 py-1">Package Type</th>
                  <th className="px-1.5 py-1 text-right">Weight (kg)</th>
                  <th className="px-1.5 py-1">Dimensions (cm)</th>
                  <th className="px-1.5 py-1">Fragile</th>
                  <th className="px-1.5 py-1">Special Handling</th>
                  <th className="px-1.5 py-1">Quality</th>
                  <th className="px-2 py-1 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white font-medium">
                {packingPackages.map((p, i) => (
                  <tr key={i} className="hover:bg-canvas transition-colors">
                    <td className="px-2 py-1 font-mono text-primary-900 font-bold">{p.ref}</td>
                    <td className="px-1.5 py-1 text-muted">{p.station}</td>
                    <td className="px-2 py-1 text-ink">{p.packer}</td>
                    <td className="px-1.5 py-1 text-center font-bold">{p.items}</td>
                    <td className="px-1.5 py-1 text-muted">{p.type}</td>
                    <td className="px-1.5 py-1 text-right font-bold">{p.weight}</td>
                    <td className="px-1.5 py-1 font-mono text-muted text-[8.5px]">{p.dim}</td>
                    <td className="px-1.5 py-1 text-muted">{p.fragile}</td>
                    <td className="px-1.5 py-1 text-muted">{p.handling}</td>
                    <td className="px-1.5 py-1">
                      <span className={`px-1 py-0.1 rounded text-[8.5px] font-bold ${
                        p.qc === 'Passed' ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-amber-800 bg-amber-50 border border-amber-200'
                      }`}>
                        {p.qc}
                      </span>
                    </td>
                    <td className="px-2 py-1 text-center">
                      <span className={`px-1.5 py-0.1 rounded text-[8.5px] font-bold ${
                        p.status === 'Completed' ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-blue-800 bg-blue-50 border border-blue-200'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
