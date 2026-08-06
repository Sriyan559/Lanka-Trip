"use client";

import React from "react";
import { AlertTriangle, Clock, ShieldCheck, CheckCircle2, Copy, UserX, Ban, AlertCircle, HelpCircle, Archive, ChevronRight } from "lucide-react";

interface BrandIntelligenceSidebarProps {
  onSelectQueue: (queueKey: string) => void;
}

export const BrandIntelligenceSidebar: React.FC<BrandIntelligenceSidebarProps> = ({
  onSelectQueue,
}) => {
  return (
    <div className="flex flex-col gap-4 text-xs">
      {/* 1. Brand Catalogue Health Donut */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-1.5 text-xs">
            <ShieldCheck size={14} className="text-[#741d35]" />
            Brand Catalogue Health
          </h3>
        </div>

        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Donut score SVG */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
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
                strokeDasharray="89, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-sm font-black text-gray-900 leading-tight">89</span>
              <span className="text-[8.5px] font-bold text-gray-400">/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[10.5px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start">
              Healthy
            </span>
            <p className="text-gray-500 text-[10px] leading-tight">
              Brand masters, authorization and supplier records are well maintained.
            </p>
          </div>
        </div>

        {/* Health breakdown list */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100 text-[10.5px]">
          <div className="flex justify-between">
            <span className="text-gray-600">Verification Coverage</span>
            <span className="font-bold text-gray-900">92%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Authorization Readiness</span>
            <span className="font-bold text-gray-900">78%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Supplier Mapping</span>
            <span className="font-bold text-gray-900">85%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Compliance</span>
            <span className="font-bold text-gray-900">89%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Product Coverage</span>
            <span className="font-bold text-gray-900">82%</span>
          </div>
        </div>

        <button className="text-[11px] font-bold text-[#741d35] hover:underline mt-3 text-left">
          View full health dashboard &gt;
        </button>
      </div>

      {/* 2. Priority Brand Alerts */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-bold text-gray-900 text-xs">Priority Brand Alerts</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700">View all &gt;</button>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { label: "Expiring authorizations (within 30 days)", count: 18, risk: "High", color: "rose" },
            { label: "Unauthorized brand use detected", count: 9, risk: "High", color: "rose" },
            { label: "Missing owner mapping", count: 12, risk: "Medium", color: "amber" },
            { label: "Duplicate brand candidates", count: 14, risk: "Medium", color: "amber" },
            { label: "Channel eligibility conflicts", count: 7, risk: "Medium", color: "amber" },
            { label: "Compliance gaps requiring attention", count: 8, risk: "Low", color: "emerald" },
            { label: "Brand recall watch", count: 3, risk: "Low", color: "emerald" },
          ].map((alert, idx) => (
            <div
              key={idx}
              onClick={() => onSelectQueue(alert.label)}
              className="flex items-center justify-between p-2 rounded bg-gray-50/80 hover:bg-gray-100/80 border border-gray-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 pr-1 min-w-0">
                <AlertTriangle size={12} className={alert.color === "rose" ? "text-rose-500 shrink-0" : "text-amber-500 shrink-0"} />
                <span className="text-[11px] font-medium text-gray-700 truncate" title={alert.label}>
                  {alert.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-bold text-gray-900 text-[11px]">{alert.count}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold ${
                    alert.color === "rose"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : alert.color === "amber"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {alert.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Brand Status Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-xs">Brand Status Summary</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700">View status breakdown &gt;</button>
        </div>
        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Active Brands</span>
            <span className="font-bold text-emerald-700">438</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Pending Verification</span>
            <span className="font-bold text-amber-700">24</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Conditional Authorization</span>
            <span className="font-bold text-amber-700">18</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Unauthorized Use</span>
            <span className="font-bold text-rose-600">9</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Expired Authorizations</span>
            <span className="font-bold text-rose-600">6</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600 font-medium">Archived Brands</span>
            <span className="font-bold text-gray-700">16</span>
          </div>
        </div>
      </div>

      {/* 4. Authorization Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-xs">Authorization Summary</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700">View report &gt;</button>
        </div>
        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Valid Authorizations</span>
            <span className="font-bold text-emerald-700">312</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Expiring (≤ 30 days)</span>
            <span className="font-bold text-amber-700">18</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Expired Authorizations</span>
            <span className="font-bold text-rose-600">6</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Pending Authorization</span>
            <span className="font-bold text-gray-700">24</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600 font-medium">Conditional Authorization</span>
            <span className="font-bold text-amber-700">18</span>
          </div>
        </div>
      </div>

      {/* 5. Supplier Coverage Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-xs">Supplier Coverage Summary</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700">View supplier coverage &gt;</button>
        </div>
        <div className="flex flex-col gap-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Mapped Suppliers</span>
            <span className="font-bold text-gray-900">214</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Unmapped Brands</span>
            <span className="font-bold text-rose-600">12</span>
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex justify-between text-[10.5px]">
              <span className="text-gray-500 font-medium">Coverage Rate</span>
              <span className="font-bold text-emerald-700">85%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Quick Queues */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-xs">Quick Queues</h3>
          <button className="text-[10px] font-bold text-[#741d35] hover:underline">View all queues &gt;</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Pending Verification", count: 24, key: "pending" },
            { label: "Conditional Review", count: 18, key: "conditional" },
            { label: "Authorization Review", count: 24, key: "expiring" },
            { label: "Duplicate Review", count: 14, key: "duplicates" },
            { label: "Unauthorized Use Cases", count: 9, key: "unauthorized" },
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSelectQueue(q.key)}
              className="p-2 rounded bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left transition-colors cursor-pointer"
            >
              <span className="text-[10px] font-bold text-gray-500 uppercase block truncate">{q.label}</span>
              <span className="text-base font-black text-gray-900">{q.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
