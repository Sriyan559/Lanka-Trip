"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function FulfilmentLifecycle() {
  const stages = [
    { name: "Fulfilment Created", state: "completed", time: "May 25 18:36" },
    { name: "Order Validated", state: "completed", time: "May 25 18:37" },
    { name: "Inventory Checked", state: "completed", time: "May 25 18:38" },
    { name: "Reservation Created", state: "completed", time: "May 25 18:39" },
    { name: "Allocation Completed", state: "completed", time: "May 25 18:40" },
    { name: "Warehouse Confirmed", state: "completed", time: "May 25 18:42" },
    { name: "Picking Started", state: "completed", time: "May 25 08:45" },
    { name: "Picking Completed", state: "completed", time: "May 25 09:32" },
    { name: "Packing Started", state: "current", time: "May 25 09:55" },
    { name: "Packing Completed", state: "pending" },
    { name: "Quality Check Completed", state: "pending" },
    { name: "Ready for Dispatch", state: "pending" },
    { name: "Shipment Created", state: "pending" },
    { name: "Handoff Ready", state: "pending" },
    { name: "Fulfilment Completed", state: "pending" },
    { name: "Closed", state: "pending" },
    { name: "Archived", state: "pending" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider">
          Customer Fulfilment / Logistics Lifecycle
        </h4>
        <div className="flex items-center gap-3 text-[10px] text-muted font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" /> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600" /> InProgress
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300" /> Pending
          </span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin pb-3 pt-2">
        <div className="flex items-center min-w-[1100px] px-2">
          {stages.map((stage, idx) => {
            const isCompleted = stage.state === "completed";
            const isCurrent = stage.state === "current";

            return (
              <div key={idx} className="flex items-center flex-1 relative group">
                {/* Connecting horizontal line */}
                {idx < stages.length - 1 && (
                  <div
                    className={`absolute left-4 top-3.5 right-0 h-0.5 z-0 ${
                      isCompleted ? "bg-emerald-500" : "bg-gray-200"
                    }`}
                  />
                )}

                <div className="flex flex-col items-center gap-1.5 z-10 w-full text-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] transition-transform group-hover:scale-110 shadow-sm ${
                      isCompleted
                        ? "bg-emerald-600 text-white ring-2 ring-emerald-100"
                        : isCurrent
                        ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse"
                        : "bg-gray-100 text-gray-400 border border-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={15} />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    ) : (
                      <span className="text-[10px]">{idx + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] leading-tight max-w-[85px] truncate font-medium ${
                      isCompleted
                        ? "text-emerald-800 font-semibold"
                        : isCurrent
                        ? "text-blue-800 font-bold"
                        : "text-muted"
                    }`}
                  >
                    {stage.name}
                  </span>
                  {stage.time && (
                    <span className="text-[9px] text-muted font-mono whitespace-nowrap">{stage.time}</span>
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
