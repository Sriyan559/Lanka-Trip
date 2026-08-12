"use client";

import React from "react";
import Link from "next/link";
import { MarketingReportItem } from "@/data/marketingReportsAudit.mock";
import { ReportStatusBadge } from "./ReportStatusBadge";
import { MoreHorizontal, ExternalLink } from "lucide-react";

interface MarketingReportLibraryProps {
  reports: MarketingReportItem[];
  selectedId: string;
  onSelectReport: (report: MarketingReportItem) => void;
}

export function MarketingReportLibrary({
  reports,
  selectedId,
  onSelectReport,
}: MarketingReportLibraryProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
        <div>
          <h3 className="text-xs font-bold text-gray-900">Marketing Report Library</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Governed marketing reports, scheduled delivery configurations, privacy classifications and audit evidence.
          </p>
        </div>

        <Link
          href={selectedId ? `/admin/marketing/reports-audit/reports/${selectedId}` : "#"}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] hover:underline"
        >
          <span>Open Report Detail</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
              <th className="py-1.5 px-2">Report Name</th>
              <th className="py-1.5 px-2">Report ID</th>
              <th className="py-1.5 px-2">Report Type</th>
              <th className="py-1.5 px-2">Marketing Domain</th>
              <th className="py-1.5 px-2">Owner</th>
              <th className="py-1.5 px-2">Scope</th>
              <th className="py-1.5 px-2">Format</th>
              <th className="py-1.5 px-2">Schedule</th>
              <th className="py-1.5 px-2">Last Generated</th>
              <th className="py-1.5 px-2">Data Period</th>
              <th className="py-1.5 px-2 text-center">Status</th>
              <th className="py-1.5 px-2">Privacy</th>
              <th className="py-1.5 px-2">Retention</th>
              <th className="py-1.5 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[11px]">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={14} className="py-6 text-center text-gray-400 font-medium">
                  No marketing reports found for the selected filters.
                </td>
              </tr>
            ) : (
              reports.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectReport(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-rose-50/40 border-l-2 border-l-[#800020]"
                        : "hover:bg-gray-50/60"
                    }`}
                  >
                    <td className="py-2 px-2 font-bold text-gray-900">{item.reportName}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-500">{item.reportId}</td>
                    <td className="py-2 px-2 font-medium text-gray-700">{item.reportType}</td>
                    <td className="py-2 px-2 font-semibold text-gray-800">{item.marketingDomain}</td>
                    <td className="py-2 px-2 text-gray-600">{item.owner}</td>
                    <td className="py-2 px-2 text-gray-600">{item.scope}</td>
                    <td className="py-2 px-2 font-mono text-[10px] font-bold text-gray-700">{item.format}</td>
                    <td className="py-2 px-2 text-gray-700">{item.schedule}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-500">{item.lastGenerated}</td>
                    <td className="py-2 px-2 text-gray-600">{item.dataPeriod}</td>
                    <td className="py-2 px-2 text-center">
                      <ReportStatusBadge status={item.status} />
                    </td>
                    <td className="py-2 px-2 font-semibold text-gray-700">{item.privacy}</td>
                    <td className="py-2 px-2 font-mono text-[10px] text-gray-600">{item.retention}</td>
                    <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <Link
                        href={`/admin/marketing/reports-audit/reports/${item.id}`}
                        className="p-1 hover:bg-gray-100 rounded inline-block text-gray-500 hover:text-gray-900"
                        title="Open Report Detail"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
