"use client";

import React from "react";
import Link from "next/link";
import { CampaignPerformanceItem } from "@/data/marketingAttribution.mock";

interface CampaignPerformanceTableProps {
  campaigns: CampaignPerformanceItem[];
}

export function CampaignPerformanceTable({ campaigns }: CampaignPerformanceTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Campaign Performance
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Campaign</th>
                <th className="py-1 text-center">Status</th>
                <th className="py-1 text-right">Spend</th>
                <th className="py-1 text-right">Audience</th>
                <th className="py-1 text-right">Conversions</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">Assisted Revenue</th>
                <th className="py-1 text-right">ROAS</th>
                <th className="py-1 text-right">Incremental Lift</th>
                <th className="py-1 text-right">Contrib. %</th>
                <th className="py-1 text-center">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">
                    <Link
                      href={`/admin/marketing/campaigns/${cmp.campaignId}`}
                      className="hover:text-[#800020] hover:underline"
                    >
                      {cmp.campaign}
                    </Link>
                  </td>
                  <td className="py-1.5 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {cmp.status}
                    </span>
                  </td>
                  <td className="py-1.5 text-right font-bold text-rose-700">{cmp.spend}</td>
                  <td className="py-1.5 text-right text-gray-600 font-mono">{cmp.audience}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{cmp.conversions}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{cmp.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-semibold text-blue-700">{cmp.assistedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{cmp.roas}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{cmp.incrementalLift}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{cmp.contributionPercent}</td>
                  <td className="py-1.5 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {cmp.health}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
