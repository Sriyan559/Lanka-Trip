"use client";

import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

export function LogisticsLifecycle() {
  const stages = [
    { name: "Fulfilment Order Created", state: "completed" },
    { name: "Inventory Allocated", state: "completed" },
    { name: "Warehouse Assigned", state: "completed" },
    { name: "Picking Started", state: "completed" },
    { name: "Picking Completed", state: "completed" },
    { name: "Packing Started", state: "completed" },
    { name: "Packing Completed", state: "completed" },
    { name: "Quality Check Passed", state: "completed" },
    { name: "Ready for Dispatch", state: "completed" },
    { name: "Carrier Pickup", state: "completed" },
    { name: "Pickup Scheduled", state: "completed" },
    { name: "Fulfilment to Carrier", state: "completed" },
    { name: "In Transit", state: "current" },
    { name: "Arrived at Delivery Hub", state: "future" },
    { name: "Out for Delivery", state: "future" },
    { name: "Delivered", state: "future" },
    { name: "Proof of Delivery Captured", state: "future" },
    { name: "Reconciled", state: "future" },
    { name: "Closed", state: "future" },
    { name: "Archived", state: "future" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider">
          Customer Fulfilment / Logistics Lifecycle
        </h4>
        <span className="text-[10px] text-muted">20 Lifecycle Stages</span>
      </div>

      <div className="overflow-x-auto scrollbar-thin pb-3 pt-2">
        <div className="flex items-center min-w-[1200px] px-2">
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
                        ? "bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse"
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
                        ? "text-amber-800 font-bold"
                        : "text-muted"
                    }`}
                  >
                    {stage.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
