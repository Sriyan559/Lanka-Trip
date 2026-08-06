"use client";

import React from "react";
import { AlertCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import {
  SIDEBAR_HEALTH_METRICS,
  PRIORITY_ALERTS,
  APPROVAL_STATUS_SUMMARY,
  SLA_SUMMARY,
  INVENTORY_RISK_SUMMARY,
  QUICK_QUEUES,
} from "@/data/catalogue.mock";

interface CatalogueInsightSidebarProps {
  onQueueClick?: (filterKey: string) => void;
  onAlertClick?: (alertTitle: string) => void;
}

export const CatalogueInsightSidebar: React.FC<CatalogueInsightSidebarProps> = ({
  onQueueClick,
  onAlertClick,
}) => {
  return (
    <aside className="flex flex-col gap-4 text-xs">
      {/* A. Catalogue Health */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm">Catalogue Health</h3>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
            Stable
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4 pb-3 border-b border-gray-100">
          <div className="relative w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-50/30 shrink-0">
            <div className="text-center leading-none">
              <span className="text-lg font-black text-gray-900">89</span>
              <span className="text-[10px] text-gray-400 font-medium block">/100</span>
            </div>
          </div>

          <div className="flex-1 space-y-1.5 text-[11px]">
            {SIDEBAR_HEALTH_METRICS.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-bold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-1">
          <span>View full health dashboard</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* B. Priority Catalogue Alerts */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-bold text-gray-900 text-xs">Priority Catalogue Alerts</h3>
          <button className="text-[10.5px] font-semibold text-[#741d35] hover:underline">
            View all
          </button>
        </div>

        <div className="space-y-2">
          {PRIORITY_ALERTS.map((alert) => (
            <button
              key={alert.id}
              onClick={() => onAlertClick?.(alert.title)}
              className="w-full text-left p-2 rounded bg-gray-50/70 hover:bg-gray-100/80 border border-gray-100 transition-colors flex items-start gap-2 group"
            >
              <AlertCircle
                size={14}
                className={
                  alert.severity === "High"
                    ? "text-rose-500 shrink-0 mt-0.5"
                    : "text-amber-500 shrink-0 mt-0.5"
                }
              />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-[#741d35]">
                  {alert.title}
                </p>
              </div>
              <span
                className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase shrink-0 ${
                  alert.severity === "High"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {alert.severity}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* C. Approval Status Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
        <h3 className="font-bold text-gray-900 text-xs mb-3">Approval Status Summary</h3>
        <div className="space-y-2">
          {APPROVAL_STATUS_SUMMARY.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600 font-medium">{item.label}</span>
              </div>
              <span className="font-bold text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* D. Catalogue SLA Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-xs">Catalogue SLA Summary</h3>
          <button className="text-[10.5px] font-semibold text-[#741d35] hover:underline">
            View details
          </button>
        </div>

        <div className="space-y-2.5">
          {SLA_SUMMARY.map((item) => (
            <div key={item.stage} className="text-[11px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 font-medium">{item.stage}</span>
                <span className="text-gray-500 font-semibold">
                  <span className="text-emerald-700 font-bold">{item.withinSlaPercent}%</span> within SLA
                  {item.breachedCount > 0 && (
                    <span className="text-rose-600 font-bold ml-1.5">
                      ({item.breachedCount} breached)
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${item.withinSlaPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E. Inventory Risk Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
        <h3 className="font-bold text-gray-900 text-xs mb-3">Inventory Risk Summary</h3>
        <div className="grid grid-cols-2 gap-2">
          {INVENTORY_RISK_SUMMARY.map((item) => (
            <div
              key={item.label}
              className="p-2 rounded bg-gray-50 border border-gray-100 flex items-center justify-between"
            >
              <span className="text-[11px] text-gray-600 font-medium">{item.label}</span>
              <span
                className="font-extrabold text-[12px]"
                style={{ color: item.color }}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* F. Quick Queues */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
        <h3 className="font-bold text-gray-900 text-xs mb-2.5">Quick Queues</h3>
        <div className="space-y-1.5">
          {QUICK_QUEUES.map((queue) => (
            <button
              key={queue.id}
              onClick={() => onQueueClick?.(queue.filterKey)}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-50 text-[11px] font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200"
            >
              <span>{queue.label}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f5ebed] text-[#741d35] font-bold text-[10.5px]">
                {queue.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
