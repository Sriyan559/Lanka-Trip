"use client";

import React from "react";
import Link from "next/link";
import { ImportJobItem } from "@/data/marketingReportsAudit.mock";
import { ReportStatusBadge } from "../ReportStatusBadge";

interface ImportJobsTableProps {
  importJobs: ImportJobItem[];
}

export function ImportJobsTable({ importJobs }: ImportJobsTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          10. Marketing Import Jobs <span className="text-gray-400 font-normal">(Latest 5)</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Import ID</th>
                <th className="py-1">Type</th>
                <th className="py-1">Domain</th>
                <th className="py-1">Scope</th>
                <th className="py-1">Format</th>
                <th className="py-1">Uploaded At</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {importJobs.map((job) => (
                <tr key={job.importId} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-mono text-[10px] font-bold text-gray-900">
                    <Link
                      href={`/admin/marketing/reports-audit/imports/${job.importId}`}
                      className="hover:text-[#800020] hover:underline"
                    >
                      {job.importId}
                    </Link>
                  </td>
                  <td className="py-1.5 font-semibold text-gray-800">{job.type}</td>
                  <td className="py-1.5 text-gray-600">{job.domain}</td>
                  <td className="py-1.5 text-gray-600">{job.scope}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-700">{job.format}</td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-500">{job.uploadedAt}</td>
                  <td className="py-1.5 text-center">
                    <ReportStatusBadge status={job.status} />
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
