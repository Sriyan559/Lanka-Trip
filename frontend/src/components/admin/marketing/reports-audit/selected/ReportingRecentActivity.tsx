"use client";

import React from "react";
import { ReportingRecentActivityItem } from "@/data/marketingReportsAudit.mock";

interface ReportingRecentActivityProps {
  activityList: ReportingRecentActivityItem[];
}

export function ReportingRecentActivity({ activityList }: ReportingRecentActivityProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>23. Recent Activity</span>
          <button className="text-[#800020] font-bold text-[10px] hover:underline cursor-pointer">
            View All Activity
          </button>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {activityList.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start text-[11px] pb-1 border-b border-gray-50 last:border-0">
              <div className="flex items-start gap-1.5">
                <span className="font-mono text-[10px] text-gray-400 font-medium shrink-0">{item.time}</span>
                <span className="text-gray-800 font-medium leading-tight">{item.activity}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium shrink-0 ml-2">{item.domainAttribution}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
