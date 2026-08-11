"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ExceptionItem } from "@/data/campaignDetail.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

export function CampaignActiveExceptionsPanel({
  exceptions = [],
}: {
  exceptions: ExceptionItem[];
}) {
  return (
    <MarketingSectionCard
      title={`Active Exceptions (${exceptions.length})`}
      footerLink={{
        label: "View All Exceptions",
        href: "/admin/marketing/governance",
      }}
      className="h-full"
    >
      <div className="w-full overflow-hidden font-sans">
        {exceptions.length === 0 ? (
          <div className="p-3 text-center text-xs text-gray-400 font-medium">
            No active exceptions.
          </div>
        ) : (
          <table className="w-full text-xs text-left text-gray-700 table-fixed">
            <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[9px]">
              <tr>
                <th className="py-1.5 px-1 w-[40%]">Exception</th>
                <th className="py-1.5 px-1 w-[18%]">Severity</th>
                <th className="py-1.5 px-1 w-[16%]">Status</th>
                <th className="py-1.5 px-1 w-[16%]">Owner</th>
                <th className="py-1.5 px-1 text-right w-[10%]">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[10.5px]">
              {exceptions.map((ex) => (
                <tr key={ex.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 px-1 font-semibold text-gray-900 truncate" title={ex.exception}>
                    {ex.exception}
                  </td>
                  <td className="py-1.5 px-1">
                    <span className="text-[8px] font-bold px-1.5 py-0.3 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      {ex.severity}
                    </span>
                  </td>
                  <td className="py-1.5 px-1">
                    <MarketingStatusChip status={ex.status} className="text-[8px] px-1 py-0.2" />
                  </td>
                  <td className="py-1.5 px-1 text-gray-700 truncate">
                    {ex.owner}
                  </td>
                  <td className="py-1.5 px-1 text-right text-gray-500 font-mono text-[10px]">
                    {ex.due.split(" ")[0]} {ex.due.split(" ")[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MarketingSectionCard>
  );
}
