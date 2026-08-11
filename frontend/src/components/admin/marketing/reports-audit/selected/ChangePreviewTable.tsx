"use client";

import React from "react";
import { ChangePreviewItem } from "@/data/marketingReportsAudit.mock";

interface ChangePreviewTableProps {
  changePreviews: ChangePreviewItem[];
}

export function ChangePreviewTable({ changePreviews }: ChangePreviewTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>13. Change Preview <span className="text-gray-400 font-normal">(Sample Dry Run)</span></span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Field</th>
                <th className="py-1">From</th>
                <th className="py-1">To</th>
                <th className="py-1 text-center">Change Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {changePreviews.map((cp, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] font-bold text-gray-900">{cp.field}</td>
                  <td className="py-1.5 text-gray-600 font-mono text-[10px]">{cp.fromValue}</td>
                  <td className="py-1.5 font-mono text-[10px] font-bold text-emerald-700">{cp.toValue}</td>
                  <td className="py-1.5 text-center font-bold text-blue-700">{cp.changeType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
