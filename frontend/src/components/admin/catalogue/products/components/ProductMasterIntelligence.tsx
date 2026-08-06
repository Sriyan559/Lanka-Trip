"use client";

import React from "react";
import {
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  ListFilter,
  Layers,
  UserCheck,
  ImageOff,
  Boxes,
  Lock,
} from "lucide-react";
import {
  PRIORITY_PRODUCT_ALERTS,
  PRODUCT_STATUS_SUMMARY_ITEMS,
  COMPLETENESS_SUMMARY_ITEMS,
  PUBLICATION_RISK_ITEMS,
  INTELLIGENCE_QUICK_QUEUES,
} from "@/data/productMasters.mock";

interface ProductMasterIntelligenceProps {
  onQueueClick?: (queueLabel: string) => void;
  onAlertClick?: (alertName: string) => void;
}

export const ProductMasterIntelligence: React.FC<ProductMasterIntelligenceProps> = ({
  onQueueClick,
  onAlertClick,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Panel Header */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h2 className="text-xs font-bold text-gray-900 tracking-tight mb-3">Product Master Intelligence</h2>

        {/* Overall Health Gauge */}
        <div className="flex items-center justify-around py-2 border-b border-gray-100 mb-3">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG Circular Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="90, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black text-gray-900 leading-none">90</span>
              <span className="text-[9px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-gray-700">Overall Product Master Health</span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
              <CheckCircle2 size={12} />
              <span>Stable</span>
            </div>
          </div>
        </div>

        <button className="w-full text-center text-[11px] font-semibold text-[#741d35] hover:underline flex items-center justify-center gap-0.5">
          <span>View full health dashboard</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Priority Product Alerts */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Priority Product Alerts</h3>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline">View all</button>
        </div>

        <div className="space-y-1.5">
          {PRIORITY_PRODUCT_ALERTS.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onAlertClick?.(alert.name)}
              className="p-2 rounded bg-gray-50/80 hover:bg-gray-100 border border-gray-100 flex items-center justify-between text-[11.5px] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle
                  size={14}
                  className={alert.severity === "High" ? "text-rose-600" : "text-amber-500"}
                />
                <span className="font-medium text-gray-800 text-[11px]">{alert.name}</span>
              </div>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-extrabold ${
                  alert.severity === "High"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {alert.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Status Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Product Status Summary</h3>
        </div>

        <div className="space-y-2 mb-3">
          {PRODUCT_STATUS_SUMMARY_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11.5px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
              <span className="font-bold text-gray-900">{item.count.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
          <span>View status breakdown</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Completeness Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Completeness Summary</h3>
        </div>

        <div className="space-y-2 mb-3">
          {COMPLETENESS_SUMMARY_ITEMS.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-gray-700">{item.label}</span>
                <span className="font-bold text-gray-900">
                  {item.count.toLocaleString()} <span className="text-gray-400 font-normal">({item.percent}%)</span>
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
          <span>View completeness report</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Publication Risk Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Publication Risk Summary</h3>
        </div>

        <div className="space-y-2 mb-3">
          {PUBLICATION_RISK_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11.5px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
              <span className="font-bold text-gray-900">{item.count.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
          <span>View risk analysis</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Quick Queues */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-gray-900">Quick Queues</h3>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline">View all queues</button>
        </div>

        <div className="space-y-1.5">
          {INTELLIGENCE_QUICK_QUEUES.map((q, idx) => (
            <div
              key={idx}
              onClick={() => onQueueClick?.(q.label)}
              className="p-2 rounded bg-gray-50 hover:bg-[#f5ebed] border border-gray-100 flex items-center justify-between text-[11.5px] cursor-pointer transition-colors group"
            >
              <span className="font-medium text-gray-700 group-hover:text-[#741d35]">{q.label}</span>
              <span className="font-bold text-gray-900 bg-white px-1.5 py-0.2 rounded border border-gray-200 text-[10px]">
                {q.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
