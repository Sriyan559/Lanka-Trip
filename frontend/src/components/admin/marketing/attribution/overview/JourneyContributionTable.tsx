"use client";

import React from "react";
import Link from "next/link";
import { JourneyContributionItem } from "@/data/marketingAttribution.mock";

interface JourneyContributionTableProps {
  journeys: JourneyContributionItem[];
}

export function JourneyContributionTable({ journeys }: JourneyContributionTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Journey Contribution
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Journey</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">Assisted Revenue</th>
                <th className="py-1 text-right">Conversions</th>
                <th className="py-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {journeys.map((jrn) => (
                <tr key={jrn.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">
                    <Link
                      href={`/admin/marketing/journeys/${jrn.journeyId}`}
                      className="hover:text-[#800020] hover:underline"
                    >
                      {jrn.journey}
                    </Link>
                  </td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{jrn.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-semibold text-blue-700">{jrn.assistedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{jrn.conversions}</td>
                  <td className="py-1.5 text-center">
                    <Link
                      href={`/admin/marketing/journeys/${jrn.journeyId}`}
                      className="text-[10px] font-bold text-[#800020] hover:underline"
                    >
                      Open Journey
                    </Link>
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
