"use client";

import React from "react";
import { TransferJobItem } from "@/data/marketingReportsAudit.mock";

interface TransferJobMonitorProps {
  transferJobs: TransferJobItem[];
}

export function TransferJobMonitor({ transferJobs }: TransferJobMonitorProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          15. Transfer Job Monitor <span className="text-gray-400 font-normal">(Active)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Job ID</th>
                <th className="py-1">Type</th>
                <th className="py-1">Source</th>
                <th className="py-1">Destination</th>
                <th className="py-1 min-w-[120px]">Progress</th>
                <th className="py-1">Started At</th>
                <th className="py-1">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {transferJobs.map((job) => (
                <tr key={job.jobId} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] font-bold text-gray-900">{job.jobId}</td>
                  <td className="py-1.5 font-semibold text-gray-800">{job.type}</td>
                  <td className="py-1.5 text-gray-600">{job.source}</td>
                  <td className="py-1.5 text-gray-600">{job.destination}</td>
                  <td className="py-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${job.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-gray-700">{job.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-500">{job.startedAt}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-500">{job.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
