"use client";

import React from "react";
import { SelectedReportRecord } from "@/data/marketingReportsAudit.mock";

interface ReportDetailsCardProps {
  details: SelectedReportRecord["details"];
}

export function ReportDetailsCard({ details }: ReportDetailsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          1. Report Details
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Report Owner</span>
            <span className="font-bold text-gray-900">{details.reportOwner}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Report Version</span>
            <span className="font-mono text-[10px] text-gray-700 font-bold">{details.reportVersion}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Report Class</span>
            <span className="font-semibold text-gray-800">{details.reportClass}</span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-gray-500 font-medium">Schedule Status</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {details.scheduleStatus}
            </span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Privacy Class</span>
            <span className="font-bold text-gray-800">{details.privacyClass}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
