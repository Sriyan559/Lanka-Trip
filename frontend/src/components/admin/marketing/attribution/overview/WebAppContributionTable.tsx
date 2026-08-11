"use client";

import React from "react";
import Link from "next/link";
import { WebAppContributionItem } from "@/data/marketingAttribution.mock";

interface WebAppContributionTableProps {
  experiences: WebAppContributionItem[];
}

export function WebAppContributionTable({ experiences }: WebAppContributionTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Website & App Experience Contribution
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Experience</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">Revenue Ref.</th>
                <th className="py-1 text-right">Conversions</th>
                <th className="py-1 text-right">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">
                    <Link
                      href={`/admin/marketing/web-app-campaigns/${exp.placementId}`}
                      className="hover:text-[#800020] hover:underline"
                    >
                      {exp.experience}
                    </Link>
                  </td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{exp.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-semibold text-gray-600 font-mono">{exp.revenueReference}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{exp.conversions}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{exp.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
