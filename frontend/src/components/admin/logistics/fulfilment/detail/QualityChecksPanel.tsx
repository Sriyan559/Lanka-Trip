"use client";

import React from "react";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export function QualityChecksPanel() {
  const checks = [
    { item: "Correct Products", status: "Passed", by: "Dilini R.", at: "12:00 PM" },
    { item: "Correct Quantities", status: "Passed", by: "Dilini R.", at: "12:00 PM" },
    { item: "Batch / Lot", status: "Passed", by: "Dilini R.", at: "12:00 PM" },
    { item: "Expiry", status: "Passed", by: "Dilini R.", at: "12:00 PM" },
    { item: "Product Condition", status: "Pending", by: "Dilini R.", at: "12:05 PM" },
    { item: "Packaging Condition", status: "Passed", by: "Dilini R.", at: "12:06 PM" },
    { item: "Tamper Protection", status: "Passed", by: "Dilini R.", at: "12:07 PM" },
    { item: "Labelling", status: "Passed", by: "Dilini R.", at: "12:07 PM" },
    { item: "Documentation", status: "Passed", by: "Dilini R.", at: "12:07 PM" },
    { item: "Special Handling", status: "Passed", by: "Dilini R.", at: "12:07 PM" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden flex flex-col justify-between text-xs">
      <div className="p-3 border-b border-line bg-canvas flex items-center justify-between">
        <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-700" /> Quality Checks
        </h4>
        <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 font-bold px-2 py-0.5 rounded">
          1 Pending
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-[11px] whitespace-nowrap divide-y divide-line">
          <thead className="bg-canvas text-muted font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-3 py-1.5">Check Item</th>
              <th className="px-2.5 py-1.5">Status</th>
              <th className="px-2.5 py-1.5">Checked By</th>
              <th className="px-2.5 py-1.5">Checked As</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white font-medium">
            {checks.map((chk, idx) => (
              <tr key={idx} className="hover:bg-canvas transition-colors">
                <td className="px-3 py-1.5 font-semibold text-ink">{chk.item}</td>
                <td className="px-2.5 py-1.5">
                  <span
                    className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      chk.status === "Passed"
                        ? "text-emerald-800 bg-emerald-50 border border-emerald-200"
                        : "text-amber-800 bg-amber-50 border border-amber-200 animate-pulse"
                    }`}
                  >
                    {chk.status}
                  </span>
                </td>
                <td className="px-2.5 py-1.5 text-muted">{chk.by}</td>
                <td className="px-2.5 py-1.5 font-mono text-muted">{chk.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-2.5 bg-amber-50 border-t border-amber-200 text-amber-900 text-[11px] font-bold flex items-center gap-1.5">
        <AlertTriangle size={13} className="text-amber-600 flex-shrink-0" />
        <span>1 Quality Review Pending</span>
      </div>
    </div>
  );
}
