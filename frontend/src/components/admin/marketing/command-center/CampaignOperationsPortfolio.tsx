"use client";

import React from "react";
import { CampaignPortfolioItem } from "@/data/marketingCommandCenter.mock";
import { MarketingStatusChip } from "../shared/MarketingStatusChip";
import { MoreVertical, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CampaignOperationsPortfolioProps {
  campaigns: CampaignPortfolioItem[];
  selectedId: string;
  onSelectCampaign: (item: CampaignPortfolioItem) => void;
}

export function CampaignOperationsPortfolio({
  campaigns = [],
  selectedId,
  onSelectCampaign,
}: CampaignOperationsPortfolioProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-3 sm:p-3.5 border-b border-gray-100 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900">
            Campaign Operations Portfolio
          </h3>
          <p className="text-[11px] text-gray-500">
            Active and scheduled campaign governance workspace
          </p>
        </div>
        <Link
          href="/admin/marketing/campaigns"
          className="text-xs font-semibold text-[#800020] hover:underline flex items-center gap-1"
        >
          <span>View All Campaigns</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-[11px] text-left text-gray-700">
          <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-100">
            <tr>
              <th className="py-2 px-3">Campaign</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Channel</th>
              <th className="py-2 px-2 text-right">Audience</th>
              <th className="py-2 px-2 text-right">Spend</th>
              <th className="py-2 px-2 text-right">Revenue</th>
              <th className="py-2 px-2 text-right">ROAS</th>
              <th className="py-2 px-2 text-right">Conversion</th>
              <th className="py-2 px-2">End Date</th>
              <th className="py-2 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-gray-400">
                  No campaigns found for the selected period.
                </td>
              </tr>
            ) : (
              campaigns.map((cmp) => {
                const isSelected = cmp.id === selectedId;
                return (
                  <tr
                    key={cmp.id}
                    onClick={() => onSelectCampaign(cmp)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-rose-50/70 border-l-2 border-l-[#800020]"
                        : "hover:bg-gray-50/70"
                    }`}
                  >
                    <td className="py-2 px-3 font-semibold text-gray-900 hover:text-[#800020]">
                      <Link href={`/admin/marketing/campaigns/${cmp.id}`}>
                        {cmp.name}
                      </Link>
                    </td>
                    <td className="py-2 px-2">
                      <MarketingStatusChip status={cmp.status} />
                    </td>
                    <td className="py-2 px-2 text-gray-600 text-[10px]">
                      {cmp.channels.join(" + ")}
                    </td>
                    <td className="py-2 px-2 text-right text-gray-900 font-semibold">
                      {cmp.audience}
                    </td>
                    <td className="py-2 px-2 text-right text-gray-800">
                      {cmp.spend}
                    </td>
                    <td className="py-2 px-2 text-right text-gray-900 font-bold">
                      {cmp.revenue}
                    </td>
                    <td className="py-2 px-2 text-right text-[#800020] font-bold">
                      {cmp.roas}
                    </td>
                    <td className="py-2 px-2 text-right text-emerald-700 font-semibold">
                      {cmp.conversion}
                    </td>
                    <td className="py-2 px-2 text-gray-500 text-[10px]">
                      {cmp.endDate}
                    </td>
                    <td className="py-2 px-2 text-center text-gray-400">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1 hover:text-gray-700 rounded cursor-pointer"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
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
