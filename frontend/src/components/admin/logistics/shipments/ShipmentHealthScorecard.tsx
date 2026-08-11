"use client";

import React from "react";

export interface ShipmentScorecardItem {
  name: string;
  score: number;
  barColor?: string;
}

export function ShipmentHealthScorecard({ items }: { items?: ShipmentScorecardItem[] }) {
  const defaultItems: ShipmentScorecardItem[] = [
    { name: "Shipment Creation Accuracy", score: 94, barColor: "bg-emerald-600" },
    { name: "Carrier Assignment", score: 92, barColor: "bg-emerald-600" },
    { name: "Pickup Performance", score: 91, barColor: "bg-emerald-600" },
    { name: "Tracking Completeness", score: 89, barColor: "bg-emerald-500" },
    { name: "Transit Performance", score: 88, barColor: "bg-emerald-500" },
    { name: "Delivery SLA", score: 91, barColor: "bg-emerald-600" },
    { name: "First-Attempt Delivery", score: 94, barColor: "bg-emerald-600" },
    { name: "Proof-of-Delivery", score: 88, barColor: "bg-emerald-500" },
    { name: "Exception Resolution", score: 86, barColor: "bg-emerald-500" },
    { name: "Audit Completeness", score: 90, barColor: "bg-emerald-600" },
    { name: "Delivery Outcomes", score: 90, barColor: "bg-emerald-600" },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="bg-white rounded-xl border border-line shadow-xs p-2 sm:p-2.5 text-[9.5px]">
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider">
          Shipment Operations Health Scorecard
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-1.5">
        {displayItems.map((item, idx) => (
          <div key={idx} className="p-1 bg-canvas border border-line rounded flex flex-col justify-between h-[36px]">
            <div className="flex items-center justify-between gap-0.5">
              <span className="text-[8px] font-medium text-muted truncate" title={item.name}>{item.name}</span>
              <span className="text-[9px] font-bold text-ink flex-shrink-0">{item.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div className={`h-full rounded-full ${item.barColor || "bg-emerald-600"}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
