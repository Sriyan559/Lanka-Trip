"use client";

import React from "react";
import Link from "next/link";
import { SelectedReportRecord } from "@/data/marketingReportsAudit.mock";

interface SelectedReportHeaderProps {
  report: SelectedReportRecord | null;
}

export function SelectedReportHeader({ report }: SelectedReportHeaderProps) {
  if (!report) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-500">
          Selected Report — <span className="font-normal text-gray-400">Select a report from the library above</span>
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 className="text-xs sm:text-sm font-bold text-gray-900">
          Selected Report — <span className="text-[#800020] font-extrabold">{report.reportName}</span>{" "}
          <span className="font-mono text-gray-500 font-normal text-xs">({report.reportId})</span>
        </h3>
      </div>

      <Link
        href={`/admin/marketing/reports-audit/reports/${report.id}`}
        className="px-3 py-1.5 text-xs font-bold text-[#800020] bg-white hover:bg-rose-50 border border-[#800020] rounded-lg transition-colors"
      >
        Open Report Detail
      </Link>
    </div>
  );
}
