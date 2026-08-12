"use client";

import React from "react";
import Link from "next/link";
import { CampaignBudgetUsageItem } from "@/data/marketingBudgets.mock";

interface CampaignBudgetUsageCardProps {
  campaignUsage: CampaignBudgetUsageItem[];
}

export function CampaignBudgetUsageCard({ campaignUsage }: CampaignBudgetUsageCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Campaign Budget Usage
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Channel / Campaign</th>
                <th className="py-1 text-center">Utilization</th>
                <th className="py-1 text-right">Spend</th>
                <th className="py-1 text-right">Forecast</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {campaignUsage.map((cu) => (
                <tr key={cu.channelCampaign} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{cu.channelCampaign}</td>
                  <td className="py-1.5 text-center font-bold text-gray-900">{cu.utilizationPercent}%</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{cu.spend}</td>
                  <td className="py-1.5 text-right font-semibold text-gray-900">{cu.forecast}</td>
                  <td className="py-1.5 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {cu.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 text-left">
        <Link
          href="/admin/marketing/campaigns"
          className="text-xs font-bold text-[#800020] hover:underline cursor-pointer"
        >
          View All Campaigns →
        </Link>
      </div>
    </div>
  );
}
