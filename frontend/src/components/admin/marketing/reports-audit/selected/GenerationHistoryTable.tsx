"use client";

import React from "react";
import { GenerationHistoryItem } from "@/data/marketingReportsAudit.mock";
import { Download } from "lucide-react";

interface GenerationHistoryTableProps {
  history: GenerationHistoryItem[];
}

export function GenerationHistoryTable({ history }: GenerationHistoryTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          6. Generation History <span className="text-gray-400 font-normal">(Latest 5)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Run ID</th>
                <th className="py-1">Generated Time</th>
                <th className="py-1 text-right">Duration</th>
                <th className="py-1 text-center">Status</th>
                <th className="py-1 text-right">Data Completeness</th>
                <th className="py-1 text-right">File Size</th>
                <th className="py-1 text-center">Warnings</th>
                <th className="py-1 text-center">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {history.map((gen) => (
                <tr key={gen.runId} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] font-bold text-gray-900">{gen.runId}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-600">{gen.generatedTime}</td>
                  <td className="py-1.5 text-right font-mono text-gray-600">{gen.duration}</td>
                  <td className="py-1.5 text-center font-bold text-emerald-700">{gen.status}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{gen.dataCompleteness}</td>
                  <td className="py-1.5 text-right font-mono text-gray-700">{gen.fileSize}</td>
                  <td className="py-1.5 text-center font-mono text-gray-600">{gen.warningsCount}</td>
                  <td className="py-1.5 text-center">
                    {gen.downloadable ? (
                      <button
                        className="p-1 text-gray-500 hover:text-[#800020] cursor-pointer"
                        title="Download Report Artifact"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
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
