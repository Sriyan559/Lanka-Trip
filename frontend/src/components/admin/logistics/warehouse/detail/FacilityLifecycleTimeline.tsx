"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function FacilityLifecycleTimeline() {
  const lifecycleStages = [
    { num: 1, name: "Facility Registered", date: "12 Jan 2021", state: "completed" },
    { num: 2, name: "Identity Verified", date: "14 Jan 2021", state: "completed" },
    { num: 3, name: "Operator Verified", date: "16 Jan 2021", state: "completed" },
    { num: 4, name: "Operational Profile", date: "25 Jan 2021", state: "completed" },
    { num: 5, name: "Service Areas Configured", date: "29 Jan 2021", state: "completed" },
    { num: 6, name: "Capabilities Configured", date: "30 Jan 2021", state: "completed" },
    { num: 7, name: "Capacity Defined", date: "02 Feb 2021", state: "completed" },
    { num: 8, name: "Inventory Locations", date: "05 Feb 2021", state: "completed" },
    { num: 9, name: "Fulfilment Enabled", date: "07 Feb 2021", state: "completed" },
    { num: 10, name: "Carrier Coverage", date: "10 Feb 2021", state: "completed" },
    { num: 11, name: "Operational", date: "12 Feb 2021", state: "current" },
    { num: 12, name: "Periodic Review", state: "pending" },
    { num: 13, name: "Maintenance", state: "pending" },
    { num: 14, name: "Limited Service", state: "pending" },
    { num: 15, name: "Suspended", state: "pending" },
    { num: 16, name: "Retired / Archived", state: "pending" },
  ];

  return (
    <div className="bg-white rounded-xl border border-line p-3 shadow-sm space-y-2 text-[10px]">
      <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider">
        Facility Lifecycle &amp; Onboarding Workflow
      </h4>

      <div className="overflow-x-auto scrollbar-thin pb-2">
        <div className="flex items-start min-w-[1380px] justify-between px-2 pt-2 relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 z-0" />

          {lifecycleStages.map((stage, idx) => {
            const isCompleted = stage.state === "completed";
            const isCurrent = stage.state === "current";

            return (
              <div key={idx} className="flex flex-col items-center z-10 w-[80px] flex-shrink-0 text-center space-y-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shadow-sm transition-transform hover:scale-110 ${
                    isCompleted
                      ? "bg-emerald-600 text-white ring-2 ring-emerald-100"
                      : isCurrent
                      ? "bg-primary-900 text-white ring-2 ring-rose-100 font-extrabold"
                      : "bg-gray-100 text-gray-400 border border-gray-300"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={12} /> : stage.num}
                </div>

                <div className="w-full px-0.5">
                  <span className={`text-[8.5px] leading-tight block truncate ${
                    isCompleted ? "text-emerald-800 font-semibold" : isCurrent ? "text-primary-900 font-bold" : "text-muted"
                  }`} title={stage.name}>
                    {stage.name}
                  </span>
                  {stage.date && (
                    <span className="text-[7.5px] text-muted font-mono block whitespace-nowrap mt-0.5">
                      {stage.date}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
