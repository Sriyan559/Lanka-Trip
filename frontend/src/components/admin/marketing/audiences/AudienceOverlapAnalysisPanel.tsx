"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function AudienceOverlapAnalysisPanel({
  overlap = [],
}: {
  overlap: Array<{ name: string; count: string; percentage: number }>;
}) {
  return (
    <MarketingSectionCard
      title="Overlap Analysis"
      footerLink={{
        label: "Open Overlap Analysis",
        href: "/admin/marketing/audiences",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[8.5px]">
            <tr>
              <th className="py-1 px-1 w-[55%]">Audience</th>
              <th className="py-1 px-1 w-[25%]">Overlap</th>
              <th className="py-1 px-1 text-right w-[20%] font-mono">Overlap %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
            {overlap.map((item) => (
              <tr key={item.name} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={item.name}>
                  {item.name}
                </td>
                <td className="py-1.5 px-1 font-mono text-gray-800">
                  {item.count}
                </td>
                <td className="py-1.5 px-1 text-right font-mono font-bold text-gray-900">
                  {item.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}

export function AudienceAuditPanel({
  audit,
}: {
  audit: {
    created: { date: string; time: string; user: string };
    lastModified: { date: string; time: string; user: string };
    lastRecalculated: { date: string; time: string; user: string };
    lastRefresh: { date: string; time: string; user: string };
  };
}) {
  return (
    <MarketingSectionCard
      title="Audience Audit"
      footerLink={{
        label: "View Full Audit Log",
        href: "/admin/marketing/reports-audit",
      }}
      className="h-full"
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs font-sans">
        <div>
          <span className="text-gray-400 text-[9px] block">Created</span>
          <span className="font-mono text-gray-900 text-[10.5px] block">{audit.created.date} {audit.created.time}</span>
          <span className="text-gray-500 text-[9.5px] font-medium">{audit.created.user}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Last Modified</span>
          <span className="font-mono text-gray-900 text-[10.5px] block">{audit.lastModified.date} {audit.lastModified.time}</span>
          <span className="text-gray-500 text-[9.5px] font-medium">{audit.lastModified.user}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Last Recalculated</span>
          <span className="font-mono text-gray-900 text-[10.5px] block">{audit.lastRecalculated.date} {audit.lastRecalculated.time}</span>
          <span className="text-gray-500 text-[9.5px] font-medium">{audit.lastRecalculated.user}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Last Refresh</span>
          <span className="font-mono text-gray-900 text-[10.5px] block">{audit.lastRefresh.date} {audit.lastRefresh.time}</span>
          <span className="text-gray-500 text-[9.5px] font-medium">{audit.lastRefresh.user}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
