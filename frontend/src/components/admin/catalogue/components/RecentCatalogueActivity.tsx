"use client";

import React from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { RECENT_ACTIVITIES } from "@/data/catalogue.mock";
import { RecentActivityItem } from "@/types/catalogue";

interface RecentCatalogueActivityProps {
  onViewAudit?: (item: RecentActivityItem) => void;
}

export const RecentCatalogueActivity: React.FC<RecentCatalogueActivityProps> = ({
  onViewAudit,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Recent Catalogue Activity</h2>
          <p className="text-[11.5px] text-gray-500">
            Real-time audit log of catalogue status changes, authorizations, merges, quarantines and publication events.
          </p>
        </div>
        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
          <span>View full activity log</span>
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="w-full text-left border-collapse text-[11.5px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[10px]">
              <th className="py-2.5 px-3">Action</th>
              <th className="py-2.5 px-3">Product or Record</th>
              <th className="py-2.5 px-3">Performed By</th>
              <th className="py-2.5 px-3">Date & Time</th>
              <th className="py-2.5 px-3">Business Context</th>
              <th className="py-2.5 px-3">Result</th>
              <th className="py-2.5 px-3 text-right">View Audit Record</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {RECENT_ACTIVITIES.map((act) => (
              <tr key={act.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-3 px-3 font-semibold text-gray-900 whitespace-nowrap">{act.action}</td>
                <td className="py-3 px-3 font-medium text-gray-800">{act.productRecord}</td>
                <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{act.performedBy}</td>
                <td className="py-3 px-3 text-gray-500 whitespace-nowrap">{act.dateTime}</td>
                <td className="py-3 px-3 text-gray-600 whitespace-nowrap text-[11px]">{act.businessContext}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      act.result === "Approved" || act.result === "Authorized" || act.result === "Published"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : act.result === "Merged"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : act.result === "Quarantined"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {act.result}
                  </span>
                </td>
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => onViewAudit?.(act)}
                    className="text-[#741d35] font-semibold hover:underline flex items-center gap-1 ml-auto text-[11px]"
                  >
                    <span>View Audit</span>
                    <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
