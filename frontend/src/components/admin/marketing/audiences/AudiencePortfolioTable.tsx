"use client";

import React from "react";
import { AudienceRecord } from "@/data/marketingAudience.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

export function AudiencePortfolioTable({
  audiences = [],
  selectedAudienceId,
  onSelectAudience,
}: {
  audiences: AudienceRecord[];
  selectedAudienceId: string;
  onSelectAudience: (record: AudienceRecord) => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs font-sans overflow-hidden">
      <div className="w-full overflow-x-auto no-scrollbar">
        <table className="w-full text-xs text-left text-gray-700 min-w-[1400px]">
          <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[8.5px]">
            <tr>
              <th className="py-2 px-2 w-8 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#800020] focus:ring-0" />
              </th>
              <th className="py-2 px-2">AUDIENCE</th>
              <th className="py-2 px-2">AUDIENCE ID</th>
              <th className="py-2 px-2">TYPE</th>
              <th className="py-2 px-2">STATUS</th>
              <th className="py-2 px-2">OWNER</th>
              <th className="py-2 px-2">BUSINESS UNIT</th>
              <th className="py-2 px-2">SOURCE SEGMENTS</th>
              <th className="py-2 px-2">ELIGIBLE</th>
              <th className="py-2 px-2">MARKETABLE</th>
              <th className="py-2 px-2">SUPPRESSED</th>
              <th className="py-2 px-2">EMAIL</th>
              <th className="py-2 px-2">SMS</th>
              <th className="py-2 px-2">PUSH</th>
              <th className="py-2 px-2">PAID MEDIA MATCH</th>
              <th className="py-2 px-2">REFRESH</th>
              <th className="py-2 px-2">LAST RECALC.</th>
              <th className="py-2 px-2 text-center">LINKED CAMPAIGNS</th>
              <th className="py-2 px-2">GOVERNANCE</th>
              <th className="py-2 px-2 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-[10px]">
            {audiences.map((aud) => {
              const isSelected = aud.id === selectedAudienceId;

              return (
                <tr
                  key={aud.id}
                  onClick={() => onSelectAudience(aud)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-rose-50/50 hover:bg-rose-50/70" : "hover:bg-gray-50/50"
                  }`}
                >
                  <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectAudience(aud)}
                      className="rounded border-gray-300 text-[#800020] focus:ring-0"
                    />
                  </td>

                  {/* Audience Name */}
                  <td className="py-2 px-2 font-bold text-gray-900 text-[11px] whitespace-nowrap">
                    {aud.name}
                  </td>

                  {/* Audience Code */}
                  <td className="py-2 px-2 font-mono text-gray-500 whitespace-nowrap">
                    {aud.code}
                  </td>

                  {/* Type */}
                  <td className="py-2 px-2 text-gray-600 whitespace-nowrap">
                    {aud.type}
                  </td>

                  {/* Status */}
                  <td className="py-2 px-2">
                    <MarketingStatusChip status={aud.status} className="text-[8px] px-1.5 py-0.2" />
                  </td>

                  {/* Owner */}
                  <td className="py-2 px-2 text-gray-700 whitespace-nowrap">
                    {aud.owner}
                  </td>

                  {/* Business Unit */}
                  <td className="py-2 px-2 text-gray-600 whitespace-nowrap">
                    {aud.businessUnit}
                  </td>

                  {/* Source Segments */}
                  <td className="py-2 px-2 text-gray-800 font-medium whitespace-nowrap">
                    {aud.sourceSegments}
                  </td>

                  {/* Eligible */}
                  <td className="py-2 px-2 font-mono font-bold text-gray-900 whitespace-nowrap">
                    {aud.eligible}
                  </td>

                  {/* Marketable */}
                  <td className="py-2 px-2 font-mono text-gray-800 whitespace-nowrap">
                    {aud.marketable}
                  </td>

                  {/* Suppressed */}
                  <td className="py-2 px-2 font-mono text-rose-600 font-bold whitespace-nowrap">
                    {aud.suppressed}
                  </td>

                  {/* Email */}
                  <td className="py-2 px-2 font-mono text-gray-700 whitespace-nowrap">
                    {aud.email}
                  </td>

                  {/* SMS */}
                  <td className="py-2 px-2 font-mono text-gray-700 whitespace-nowrap">
                    {aud.sms}
                  </td>

                  {/* Push */}
                  <td className="py-2 px-2 font-mono text-gray-700 whitespace-nowrap">
                    {aud.push}
                  </td>

                  {/* Paid Media Match */}
                  <td className="py-2 px-2">
                    <span className="font-bold text-emerald-700 font-mono">
                      {aud.paidMediaMatch}%
                    </span>
                  </td>

                  {/* Refresh */}
                  <td className="py-2 px-2 text-emerald-700 font-semibold text-[9.5px]">
                    {aud.refreshMode}
                  </td>

                  {/* Last Recalc */}
                  <td className="py-2 px-2 text-gray-500 font-mono text-[9.5px]">
                    {aud.lastRecalc}
                  </td>

                  {/* Linked Campaigns */}
                  <td className="py-2 px-2 text-center font-bold text-gray-900 font-mono">
                    {aud.linkedCampaigns}
                  </td>

                  {/* Governance */}
                  <td className="py-2 px-2">
                    <MarketingStatusChip status={aud.governance} className="text-[8px] px-1.5 py-0.2" />
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
          Showing 1 to 6 of 84 audiences
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
            14
          </button>
          <button className="p-1 rounded text-gray-400 hover:text-gray-700">
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-gray-200 text-[11px]">
            <span className="text-gray-500">Rows per page:</span>
            <select className="bg-white border border-gray-300 rounded px-1.5 py-0.5 font-bold text-gray-900 focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
