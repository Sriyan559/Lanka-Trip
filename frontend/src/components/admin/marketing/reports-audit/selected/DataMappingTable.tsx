"use client";

import React from "react";
import { DataMappingItem } from "@/data/marketingReportsAudit.mock";

interface DataMappingTableProps {
  mappings: DataMappingItem[];
}

export function DataMappingTable({ mappings }: DataMappingTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          12. Data Mappings <span className="text-gray-400 font-normal">(Sample)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Source Column</th>
                <th className="py-1">Target Column</th>
                <th className="py-1">Mapped By</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {mappings.map((m) => (
                <tr key={m.sourceColumn} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] font-bold text-gray-900">{m.sourceColumn}</td>
                  <td className="py-1.5 font-semibold text-gray-800">{m.targetColumn}</td>
                  <td className="py-1.5 text-gray-600">{m.mappedBy}</td>
                  <td className="py-1.5 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
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
  );
}
