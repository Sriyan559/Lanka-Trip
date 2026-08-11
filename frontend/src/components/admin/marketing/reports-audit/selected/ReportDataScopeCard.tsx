"use client";

import React from "react";
import { ReportDataScope } from "@/data/marketingReportsAudit.mock";

interface ReportDataScopeCardProps {
  dataScope: ReportDataScope;
}

export function ReportDataScopeCard({ dataScope }: ReportDataScopeCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          3. Data Scope
        </h4>

        <div className="mt-2 space-y-1 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Tenant</span>
            <span className="font-bold text-gray-900">{dataScope.tenant}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Ecosystem</span>
            <span className="font-semibold text-gray-800">{dataScope.ecosystem}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Business Units</span>
            <span className="font-semibold text-gray-800">{dataScope.businessUnits}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Regions</span>
            <span className="font-semibold text-gray-800">{dataScope.regions}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Channels</span>
            <span className="font-semibold text-gray-800">{dataScope.channels}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Privacy Scope</span>
            <span className="font-bold text-gray-800">{dataScope.privacyScope}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Customer Level Data</span>
            <span className="font-bold text-emerald-700">{dataScope.customerLevelData}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Source Systems</span>
            <span className="font-bold text-emerald-700">{dataScope.sourceSystems}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
