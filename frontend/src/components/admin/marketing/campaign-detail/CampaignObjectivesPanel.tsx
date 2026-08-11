"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ObjectiveTargetItem } from "@/data/campaignDetail.mock";

export function CampaignObjectivesPanel({
  objectives = [],
}: {
  objectives: ObjectiveTargetItem[];
}) {
  return (
    <MarketingSectionCard title="Objectives & Targets" className="h-full">
      <div className="w-full overflow-hidden font-sans">
        <table className="w-full text-xs text-left text-gray-700 table-fixed">
          <thead className="bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight text-[9px]">
            <tr>
              <th className="py-1.5 px-1.5 w-[38%]">Objective</th>
              <th className="py-1.5 px-1.5 w-[20%]">Target</th>
              <th className="py-1.5 px-1.5 w-[22%]">Current</th>
              <th className="py-1.5 px-1.5 text-right w-[20%]">Achievement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {objectives.map((item) => {
              const isMet = item.achievementPercent >= 100;
              return (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="py-1.5 px-1.5 font-semibold text-gray-900 truncate">
                    {item.objective}
                  </td>
                  <td className="py-1.5 px-1.5 text-gray-500 font-mono text-[11px] truncate">
                    {item.target}
                  </td>
                  <td className="py-1.5 px-1.5 font-bold text-gray-900 font-mono text-[11px] truncate">
                    {item.current}
                  </td>
                  <td className="py-1.5 px-1.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-12 bg-gray-100 rounded-full h-1.5 overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${
                            isMet ? "bg-emerald-500" : "bg-emerald-600"
                          }`}
                          style={{ width: `${Math.min(item.achievementPercent, 100)}%` }}
                        />
                      </div>
                      <span
                        className={`text-[11px] font-bold ${
                          isMet ? "text-emerald-700" : "text-gray-700"
                        }`}
                      >
                        {item.achievementPercent}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MarketingSectionCard>
  );
}
