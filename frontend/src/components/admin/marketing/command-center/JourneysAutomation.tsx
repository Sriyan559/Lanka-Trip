"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";

interface JourneysAutomationProps {
  activeJourneys: number;
  customers: string;
  automatedMessages: string;
  journeyConversion: string;
  list: Array<{
    name: string;
    status: string;
    customers: string;
    metric: string;
  }>;
}

export function JourneysAutomation({
  activeJourneys,
  customers,
  automatedMessages,
  journeyConversion,
  list = [],
}: JourneysAutomationProps) {
  return (
    <MarketingSectionCard
      title="Journeys & Automation"
      subtitle="Automated customer journey triggers & lifecycle metrics"
      footerLink={{
        label: "View All Journeys",
        href: "/admin/marketing/journeys",
      }}
      className="h-full"
    >
      {/* Top Mini KPIs */}
      <div className="grid grid-cols-4 gap-2 bg-gray-50/80 p-2 rounded-lg text-center border border-gray-100 mb-3">
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Active Journeys
          </span>
          <span className="text-sm font-extrabold text-gray-900">
            {activeJourneys}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Customers
          </span>
          <span className="text-sm font-extrabold text-gray-900 font-mono">
            {customers}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Automated Msgs
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-gray-900 truncate">
            {automatedMessages}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Conversion
          </span>
          <span className="text-sm font-extrabold text-emerald-700">
            {journeyConversion}
          </span>
        </div>
      </div>

      {/* Mini Journeys Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-400 font-semibold border-b border-gray-100">
            <tr>
              <th className="py-1 px-2">Journey</th>
              <th className="py-1 px-2">Status</th>
              <th className="py-1 px-2 text-right">Customers</th>
              <th className="py-1 px-2 text-right">Conversion / Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {list.map((j) => (
              <tr key={j.name} className="hover:bg-gray-50/50">
                <td className="py-1.5 px-2 font-semibold text-gray-900">
                  {j.name}
                </td>
                <td className="py-1.5 px-2">
                  <MarketingStatusChip status={j.status} />
                </td>
                <td className="py-1.5 px-2 text-right text-gray-800">
                  {j.customers}
                </td>
                <td className="py-1.5 px-2 text-right font-bold text-[#800020]">
                  {j.metric}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
