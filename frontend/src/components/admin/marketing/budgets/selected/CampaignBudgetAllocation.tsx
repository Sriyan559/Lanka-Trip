"use client";

import React from "react";
import Link from "next/link";
import { CampaignBudgetAllocationItem } from "@/data/marketingBudgets.mock";

interface CampaignBudgetAllocationProps {
  campaigns: CampaignBudgetAllocationItem[];
}

export function CampaignBudgetAllocation({ campaigns }: CampaignBudgetAllocationProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Campaign Budget Allocation <span className="text-gray-400 font-normal">(Top Campaigns)</span></span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Campaign</th>
                <th className="py-1 text-right">Approved Budget</th>
                <th className="py-1 text-right">Committed</th>
                <th className="py-1 text-right">Actual</th>
                <th className="py-1 text-center">Utilization</th>
                <th className="py-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">
                    <Link
                      href={`/admin/marketing/campaigns/${cmp.campaignId}`}
                      className="hover:text-[#800020] hover:underline"
                    >
                      {cmp.campaign}
                    </Link>
                  </td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{cmp.approvedBudget}</td>
                  <td className="py-1.5 text-right font-semibold text-emerald-700">{cmp.committed}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{cmp.actual}</td>
                  <td className="py-1.5 text-center font-bold text-gray-900">{cmp.utilizationPercent}%</td>
                  <td className="py-1.5 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {cmp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 text-left">
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
