"use client";

import React from "react";
import { AccessDownloadEvidenceItem } from "@/data/marketingReportsAudit.mock";

interface AccessDownloadEvidenceProps {
  evidenceList: AccessDownloadEvidenceItem[];
}

export function AccessDownloadEvidence({ evidenceList }: AccessDownloadEvidenceProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          19. Access & Download Evidence <span className="text-gray-400 font-normal">(Recent)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Artifact</th>
                <th className="py-1">Downloaded By</th>
                <th className="py-1">Time</th>
                <th className="py-1 text-center">Download Used</th>
                <th className="py-1 text-center">Access Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {evidenceList.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] font-bold text-gray-900">{item.artifact}</td>
                  <td className="py-1.5 text-gray-700 font-medium">{item.downloadedBy}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-500">{item.time}</td>
                  <td className="py-1.5 text-center font-mono text-[10px] font-bold text-gray-700">{item.downloadUsed}</td>
                  <td className="py-1.5 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.accessStatus}
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
