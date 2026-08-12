"use client";

import React from "react";
import { EvidenceSnapshotItem } from "@/data/marketingGovernance.mock";

interface EvidenceAuditSnapshotsProps {
  evidenceSnapshots: EvidenceSnapshotItem[];
}

export function EvidenceAuditSnapshots({ evidenceSnapshots }: EvidenceAuditSnapshotsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Evidence & Audit Snapshots</span>
          <button className="text-[10px] font-bold text-[#800020] hover:underline cursor-pointer">
            View All Evidence
          </button>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Evidence Type</th>
                <th className="py-1">Source</th>
                <th className="py-1">Captured On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {evidenceSnapshots.map((ev) => (
                <tr key={ev.evidenceType} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{ev.evidenceType}</td>
                  <td className="py-1.5 font-medium text-gray-600">{ev.source}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-500">{ev.capturedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
