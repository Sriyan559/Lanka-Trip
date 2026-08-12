"use client";

import React from "react";
import { PaidMediaRecord } from "@/data/marketingPaidMedia.mock";
import { PaidMediaStatusBadge } from "./PaidMediaStatusBadge";
import { MoreVertical, Globe, Share2, Video, Search } from "lucide-react";

interface PaidMediaPortfolioTableProps {
  campaigns: PaidMediaRecord[];
  selectedId: string;
  onSelectCampaign: (campaign: PaidMediaRecord) => void;
  selectedCheckboxes: string[];
  onToggleCheckbox: (id: string) => void;
  onToggleAllCheckboxes: () => void;
}

export function PaidMediaPortfolioTable({
  campaigns = [],
  selectedId,
  onSelectCampaign,
  selectedCheckboxes = [],
  onToggleCheckbox,
  onToggleAllCheckboxes,
}: PaidMediaPortfolioTableProps) {
  const isAllSelected =
    campaigns.length > 0 && selectedCheckboxes.length === campaigns.length;

  const getPlatformIcon = (platform: PaidMediaRecord["platform"]) => {
    switch (platform) {
      case "Meta Ads":
        return <Share2 className="w-3.5 h-3.5 text-blue-600" />;
      case "Google Ads":
        return <Search className="w-3.5 h-3.5 text-rose-600" />;
      case "TikTok Ads":
        return <Video className="w-3.5 h-3.5 text-slate-800" />;
      case "LinkedIn":
        return <Globe className="w-3.5 h-3.5 text-sky-700" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Header Title Bar */}
      <div className="p-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Paid Media Campaign Portfolio
          </h3>
          <p className="text-[11px] text-gray-500">
            Active and configured external advertising campaigns across connected ad platforms.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs text-gray-700 font-sans border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleAllCheckboxes}
                  className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3">Paid Campaign</th>
              <th className="py-2.5 px-3">Media ID</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Platform</th>
              <th className="py-2.5 px-3">Ad Account</th>
              <th className="py-2.5 px-3">Objective</th>
              <th className="py-2.5 px-3">Linked Marketing Campaign</th>
              <th className="py-2.5 px-3">Audience</th>
              <th className="py-2.5 px-3">Creative Set</th>
              <th className="py-2.5 px-3">Start</th>
              <th className="py-2.5 px-3">End</th>
              <th className="py-2.5 px-3 text-right">Budget</th>
              <th className="py-2.5 px-3 text-right">Spend</th>
              <th className="py-2.5 px-3 text-center">Pacing</th>
              <th className="py-2.5 px-3 text-right">Impressions</th>
              <th className="py-2.5 px-3 text-right">Clicks</th>
              <th className="py-2.5 px-3 text-right">CTR</th>
              <th className="py-2.5 px-3 text-right">Conversions</th>
              <th className="py-2.5 px-3 text-right">CPA</th>
              <th className="py-2.5 px-3 text-right">ROAS Reference</th>
              <th className="py-2.5 px-3">Delivery Health</th>
              <th className="py-2.5 px-3">Tracking</th>
              <th className="py-2.5 px-3">Governance</th>
              <th className="py-2.5 px-3">Last Sync</th>
              <th className="py-2.5 px-3 text-center w-10">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={26} className="py-8 text-center text-gray-500 font-normal">
                  No paid media campaigns found for the selected filters.
                </td>
              </tr>
            ) : (
              campaigns.map((cmp) => {
                const isSelected = selectedId === cmp.id;
                const isChecked = selectedCheckboxes.includes(cmp.id);

                return (
                  <tr
                    key={cmp.id}
                    onClick={() => onSelectCampaign(cmp)}
                    className={`transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-rose-50/50 hover:bg-rose-50"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCheckbox(cmp.id)}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-2">
                      {getPlatformIcon(cmp.platform)}
                      <span>{cmp.paidCampaign}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-gray-600">
                      {cmp.mediaId}
                    </td>
                    <td className="py-2.5 px-3">
                      <PaidMediaStatusBadge status={cmp.status} type="status" />
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{cmp.platform}</td>
                    <td className="py-2.5 px-3 text-gray-600">{cmp.adAccount}</td>
                    <td className="py-2.5 px-3 text-gray-700">{cmp.objective}</td>
                    <td className="py-2.5 px-3 text-gray-800 font-semibold">{cmp.linkedMarketingCampaign}</td>
                    <td className="py-2.5 px-3 text-gray-600">{cmp.audience}</td>
                    <td className="py-2.5 px-3 text-gray-600">{cmp.creativeSet}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-[11px]">{cmp.startDate}</td>
                    <td className="py-2.5 px-3 text-gray-600 text-[11px]">{cmp.endDate}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-900">
                      {cmp.budget}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-blue-700">
                      {cmp.spend}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="font-bold text-gray-900">{cmp.pacingPercent}%</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-900">
                      {cmp.impressions}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-blue-700">
                      {cmp.clicks}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-900">
                      {cmp.ctr}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      {cmp.conversions}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-900">
                      {cmp.cpa}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-800">
                      {cmp.roasReference}
                    </td>
                    <td className="py-2.5 px-3">
                      <PaidMediaStatusBadge status={cmp.deliveryHealth} type="delivery" />
                    </td>
                    <td className="py-2.5 px-3">
                      <PaidMediaStatusBadge status={cmp.tracking} type="tracking" />
                    </td>
                    <td className="py-2.5 px-3">
                      <PaidMediaStatusBadge status={cmp.governance} type="governance" />
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 text-[11px]">
                      {cmp.lastSync}
                    </td>
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
