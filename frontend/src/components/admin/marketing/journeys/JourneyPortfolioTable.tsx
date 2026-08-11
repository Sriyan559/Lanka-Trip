"use client";

import React from "react";
import { JourneyRecord } from "@/data/customerJourneys.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import { MoreVertical, ChevronLeft, ChevronRight, Mail, Bell, MessageSquare } from "lucide-react";

export function JourneyPortfolioTable({
  journeys = [],
  selectedJourneyId,
  onSelectJourney,
}: {
  journeys: JourneyRecord[];
  selectedJourneyId: string;
  onSelectJourney: (record: JourneyRecord) => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs font-sans overflow-hidden">
      <div className="w-full overflow-x-auto no-scrollbar">
        <table className="w-full text-xs text-left text-gray-700 min-w-[1350px]">
          <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[8.5px]">
            <tr>
              <th className="py-2 px-2 w-8 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#800020] focus:ring-0" />
              </th>
              <th className="py-2 px-2">JOURNEY</th>
              <th className="py-2 px-2">JOURNEY ID</th>
              <th className="py-2 px-2">STATUS</th>
              <th className="py-2 px-2">JOURNEY TYPE</th>
              <th className="py-2 px-2">OWNER</th>
              <th className="py-2 px-2">ENTRY AUDIENCE</th>
              <th className="py-2 px-2">TRIGGER</th>
              <th className="py-2 px-2">ACTIVE CUSTOMERS</th>
              <th className="py-2 px-2 text-center">STEP COUNT</th>
              <th className="py-2 px-2">PRIMARY CHANNELS</th>
              <th className="py-2 px-2">ENTRY RATE</th>
              <th className="py-2 px-2">CONVERSION</th>
              <th className="py-2 px-2">REVENUE</th>
              <th className="py-2 px-2 text-center">EXCEPTIONS</th>
              <th className="py-2 px-2">GOVERNANCE</th>
              <th className="py-2 px-2">LAST ACTIVITY</th>
              <th className="py-2 px-2 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-[10px]">
            {journeys.map((jrn) => {
              const isSelected = jrn.id === selectedJourneyId;

              return (
                <tr
                  key={jrn.id}
                  onClick={() => onSelectJourney(jrn)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-rose-50/50 hover:bg-rose-50/70" : "hover:bg-gray-50/50"
                  }`}
                >
                  <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectJourney(jrn)}
                      className="rounded border-gray-300 text-[#800020] focus:ring-0"
                    />
                  </td>

                  {/* Journey Name */}
                  <td className="py-2 px-2 font-bold text-gray-900 text-[11px] whitespace-nowrap">
                    {jrn.name}
                  </td>

                  {/* Code */}
                  <td className="py-2 px-2 font-mono text-gray-500 whitespace-nowrap">
                    {jrn.code}
                  </td>

                  {/* Status */}
                  <td className="py-2 px-2">
                    <MarketingStatusChip status={jrn.status} className="text-[8px] px-1.5 py-0.2" />
                  </td>

                  {/* Type */}
                  <td className="py-2 px-2 text-gray-600 whitespace-nowrap">
                    {jrn.type}
                  </td>

                  {/* Owner */}
                  <td className="py-2 px-2 text-gray-700 whitespace-nowrap">
                    {jrn.owner}
                  </td>

                  {/* Entry Audience */}
                  <td className="py-2 px-2 text-gray-800 font-medium whitespace-nowrap">
                    {jrn.entryAudience}
                  </td>

                  {/* Trigger */}
                  <td className="py-2 px-2 text-gray-600 whitespace-nowrap">
                    {jrn.trigger}
                  </td>

                  {/* Active Customers */}
                  <td className="py-2 px-2 font-mono font-bold text-gray-900 whitespace-nowrap">
                    {jrn.activeCustomers}
                  </td>

                  {/* Step Count */}
                  <td className="py-2 px-2 text-center font-mono font-bold text-gray-900">
                    {jrn.stepCount}
                  </td>

                  {/* Primary Channels */}
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1">
                      {jrn.primaryChannels.includes("Email") && (
                        <span className="p-0.5 rounded bg-blue-50 text-blue-600" title="Email">
                          <Mail className="w-3 h-3" />
                        </span>
                      )}
                      {jrn.primaryChannels.includes("Push") && (
                        <span className="p-0.5 rounded bg-emerald-50 text-emerald-600" title="Push">
                          <Bell className="w-3 h-3" />
                        </span>
                      )}
                      {jrn.primaryChannels.includes("SMS") && (
                        <span className="p-0.5 rounded bg-purple-50 text-purple-600" title="SMS">
                          <MessageSquare className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Entry Rate */}
                  <td className="py-2 px-2 font-mono text-gray-700 whitespace-nowrap">
                    {jrn.entryRate}
                  </td>

                  {/* Conversion */}
                  <td className="py-2 px-2 font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {jrn.conversion}
                  </td>

                  {/* Revenue */}
                  <td className="py-2 px-2 font-mono font-bold text-gray-900 whitespace-nowrap">
                    {jrn.revenue}
                  </td>

                  {/* Exceptions */}
                  <td className="py-2 px-2 text-center font-mono">
                    <span className={jrn.exceptions > 0 ? "text-amber-700 font-bold" : "text-gray-400"}>
                      {jrn.exceptions}
                    </span>
                  </td>

                  {/* Governance */}
                  <td className="py-2 px-2">
                    <MarketingStatusChip status={jrn.governance} className="text-[8px] px-1.5 py-0.2" />
                  </td>

                  {/* Last Activity */}
                  <td className="py-2 px-2 text-gray-500 font-mono text-[9.5px]">
                    {jrn.lastActivity}
                  </td>

                  {/* Actions */}
                  <td className="py-2 px-2 text-right">
                    <button className="p-1 text-gray-400 hover:text-gray-700 rounded">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Bar */}
      <div className="flex items-center justify-between p-2.5 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-600 font-sans">
        <span className="text-[11px] font-medium text-gray-500">
          Showing 1 to 6 of 38 journeys
        </span>

        <div className="flex items-center gap-1">
          <button className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-2 py-0.5 rounded text-xs font-bold bg-[#800020] text-white">
            1
          </button>
          <button className="px-2 py-0.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-200">
            2
          </button>
          <button className="px-2 py-0.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-200">
            3
          </button>
          <button className="px-2 py-0.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-200">
            4
          </button>
          <button className="px-2 py-0.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-200">
            5
          </button>
          <span className="text-gray-400 font-mono text-xs">...</span>
          <button className="px-2 py-0.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-200">
            7
          </button>
          <button className="p-1 rounded text-gray-400 hover:text-gray-700">
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-gray-200 text-[11px]">
            <span className="text-gray-500">Rows per page:</span>
            <select className="bg-white border border-gray-300 rounded px-1.5 py-0.5 font-bold text-gray-900 focus:outline-none">
              <option>10 / page</option>
              <option>25 / page</option>
              <option>50 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
