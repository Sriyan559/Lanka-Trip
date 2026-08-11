"use client";

import React from "react";
import { ContentRightsItem } from "@/data/marketingGovernance.mock";

interface ContentRightsCardProps {
  rightsItems: ContentRightsItem[];
}

export function ContentRightsCard({ rightsItems }: ContentRightsCardProps) {
  const getRightsStatusStyle = (st: string) => {
    switch (st) {
      case "Approved":
        return "text-emerald-700 font-bold bg-emerald-50 px-1 rounded";
      case "Review Required":
      case "Expiring":
        return "text-amber-700 font-bold bg-amber-50 px-1 rounded";
      case "Expired":
      case "Restricted":
      default:
        return "text-rose-700 font-bold bg-rose-50 px-1 rounded";
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Content & Rights</span>
          <span className="text-[10px] text-gray-400 font-normal">MK07 Creative Rights Reference</span>
        </h4>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                <th className="py-1">Content Type</th>
                <th className="py-1 text-center">Rights Status</th>
                <th className="py-1">Expiry Date</th>
                <th className="py-1">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {rightsItems.map((cnt) => (
                <tr key={cnt.contentType} className="hover:bg-gray-50/50">
                  <td className="py-1.5 font-semibold text-gray-800">{cnt.contentType}</td>
                  <td className="py-1.5 text-center">
                    <span className={getRightsStatusStyle(cnt.rightsStatus)}>{cnt.rightsStatus}</span>
                  </td>
                  <td className="py-1.5 font-mono text-[10px] text-gray-600">{cnt.expiryDate}</td>
                  <td className="py-1.5 text-gray-600">{cnt.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
