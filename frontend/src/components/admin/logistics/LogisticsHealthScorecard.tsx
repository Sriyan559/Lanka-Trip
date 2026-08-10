import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export interface ScorecardItem {
  name: string;
  score: number;
  status: "Optimal" | "Healthy" | "At Risk" | "Not Assessed";
  color: string;
}

export function LogisticsHealthScorecard({ items }: { items?: ScorecardItem[] }) {
  const defaultItems: ScorecardItem[] = [
    { name: "Fulfilment Readiness", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Inventory Allocation", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Pick-and-Pack Performance", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Logistics Readiness", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Carrier Pickup Performance", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Delivery SLA Compliance", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Proof-of-Delivery Completeness", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Reverse Logistics Performance", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Cost & Reconciliation Health", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
    { name: "Audit Completeness", score: 0, status: "Not Assessed", color: "text-gray-500 bg-gray-50 border-gray-200" },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary-900" />
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider">Logistics Operational Health Scorecard</h3>
        </div>
        <div className="text-[11px] text-muted flex items-center gap-1">
          <Info size={12} />
          Evaluates operational performance metrics
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {displayItems.map((item, idx) => (
          <div key={idx} className="p-3 bg-canvas border border-line rounded-lg flex flex-col justify-between space-y-2">
            <div className="text-[11px] font-medium text-muted truncate">{item.name}</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-ink">{item.score}%</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${item.color}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
