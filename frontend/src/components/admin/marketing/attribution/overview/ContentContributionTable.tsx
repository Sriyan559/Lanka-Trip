"use client";

import React from "react";
import Link from "next/link";
import { ContentContributionItem } from "@/data/marketingAttribution.mock";

interface ContentContributionTableProps {
  contentList: ContentContributionItem[];
}

export function ContentContributionTable({ contentList }: ContentContributionTableProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Content Contribution
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Content</th>
                <th className="py-1 text-right">Impressions</th>
                <th className="py-1 text-right">Clicks</th>
                <th className="py-1 text-right">Attrib. Revenue</th>
                <th className="py-1 text-right">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {contentList.map((cnt) => (
                <tr key={cnt.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-bold text-gray-900">
                    <Link
                      href={`/admin/marketing/content/${cnt.contentId}`}
                      className="hover:text-[#800020] hover:underline"
                    >
                      {cnt.content}
                    </Link>
                  </td>
                  <td className="py-1.5 text-right font-mono text-gray-600">{cnt.impressions}</td>
                  <td className="py-1.5 text-right font-mono text-gray-600">{cnt.clicks}</td>
                  <td className="py-1.5 text-right font-bold text-emerald-700">{cnt.attributedRevenue}</td>
                  <td className="py-1.5 text-right font-bold text-blue-700">{cnt.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
