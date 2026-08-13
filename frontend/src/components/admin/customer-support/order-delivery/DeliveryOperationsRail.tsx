"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  Clock,
  Search,
  Truck,
  FileText,
  Package,
} from "lucide-react";
import { DeliveryOperationsRailData } from "./types";

interface DeliveryOperationsRailProps {
  data: DeliveryOperationsRailData;
}

export function DeliveryOperationsRail({ data }: DeliveryOperationsRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full h-auto self-start">
      {/* 0. Order & Delivery Support Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Activity size={14} className="text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900">Order &amp; Delivery Support Health</h4>
        </div>

        <div className="flex items-center gap-4">
          {/* Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-emerald-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${data.healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">{data.healthScore}</span>
              <span className="text-[9px] text-slate-400 font-semibold">/100</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 flex flex-col gap-1 text-[11px]">
            {data.scoreLegend.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className={`font-semibold ${item.color}`}>• {item.label}</span>
                <span className="text-slate-500 font-mono text-[10px]">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Case Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Case Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Open</span><span className="font-bold text-slate-900 text-xs">{data.caseSummary.open}</span></div>
          <div><span className="text-slate-400 block font-medium">Closed</span><span className="font-bold text-emerald-700 text-xs">{data.caseSummary.closed}</span></div>
          <div><span className="text-slate-400 block font-medium">SLA At Risk</span><span className="font-bold text-amber-700 text-xs">{data.caseSummary.slaAtRisk}</span></div>
          <div><span className="text-slate-400 block font-medium">Escalated</span><span className="font-bold text-red-600 text-xs">{data.caseSummary.escalated}</span></div>
          <div><span className="text-slate-400 block font-medium">Unassigned</span><span className="font-bold text-slate-600 text-xs">{data.caseSummary.unassigned}</span></div>
        </div>
      </div>

      {/* 2. Fulfilment Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Fulfilment Summary</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium">
                <th className="pb-1">Source</th>
                <th className="pb-1 text-center">Connected</th>
                <th className="pb-1 text-center">Pending</th>
                <th className="pb-1 text-center">SLA At Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr>
                <td className="py-1 font-semibold text-slate-800">Warehouse</td>
                <td className="py-1 text-center font-bold text-emerald-700">{data.fulfilmentSummary.warehouse.connected}</td>
                <td className="py-1 text-center font-bold text-slate-700">{data.fulfilmentSummary.warehouse.pending}</td>
                <td className="py-1 text-center font-bold text-amber-700">{data.fulfilmentSummary.warehouse.slaAtRisk}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-800">Supplier</td>
                <td className="py-1 text-center font-bold text-emerald-700">{data.fulfilmentSummary.supplier.connected}</td>
                <td className="py-1 text-center font-bold text-slate-700">{data.fulfilmentSummary.supplier.pending}</td>
                <td className="py-1 text-center font-bold text-amber-700">{data.fulfilmentSummary.supplier.slaAtRisk}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Shipment Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Shipment Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">In Transit</span><span className="font-bold text-blue-700 text-xs">{data.shipmentSummary.inTransit}</span></div>
          <div><span className="text-slate-400 block font-medium">Delayed</span><span className="font-bold text-red-600 text-xs">{data.shipmentSummary.delayed}</span></div>
          <div><span className="text-slate-400 block font-medium">Out Delivery</span><span className="font-bold text-blue-700 text-xs">{data.shipmentSummary.outForDelivery}</span></div>
          <div><span className="text-slate-400 block font-medium">Exception</span><span className="font-bold text-amber-700 text-xs">{data.shipmentSummary.exception}</span></div>
          <div><span className="text-slate-400 block font-medium">Attempted</span><span className="font-bold text-slate-700 text-xs">{data.shipmentSummary.attemptedDelivery}</span></div>
        </div>
      </div>

      {/* 4. Dependency Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Dependency Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Open</span><span className="font-bold text-slate-900 text-xs">{data.dependencySummary.open}</span></div>
          <div><span className="text-slate-400 block font-medium">Pending</span><span className="font-bold text-amber-700 text-xs">{data.dependencySummary.pending}</span></div>
          <div><span className="text-slate-400 block font-medium">Resolved</span><span className="font-bold text-emerald-700 text-xs">{data.dependencySummary.resolved}</span></div>
          <div><span className="text-slate-400 block font-medium">Overdue</span><span className="font-bold text-red-600 text-xs">{data.dependencySummary.overdue}</span></div>
        </div>
      </div>

      {/* 5. Quick Links */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Quick Links</h4>
        <div className="flex flex-col gap-1 text-[11px]">
          {data.quickLinks.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
              <span className="text-slate-700 font-medium">{q.label}</span>
              <span className={`font-bold font-mono px-1.5 py-0.2 rounded text-[10px] ${
                q.variant === "danger"
                  ? "bg-red-100 text-red-800"
                  : q.variant === "warning"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
              }`}>{q.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Find Actions */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Find Actions</h4>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Review Escalated Delivery Cases", icon: AlertCircle },
            { label: "Review Open Carrier Exceptions", icon: AlertTriangle },
            { label: "Review Cases Needing Response", icon: Clock },
            { label: "Review Tracking Issues", icon: Package },
            { label: "Request Carrier Update", icon: Truck },
            { label: "Escalate to Logistics", icon: FileText },
            { label: "Run Delivery Support Audit", icon: Search },
          ].map((act, idx) => {
            const IconComp = act.icon;
            return (
              <button
                key={idx}
                className="w-full py-1.5 px-2.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5">
                  <IconComp size={13} />
                  <span className="truncate">{act.label}</span>
                </div>
                <ChevronRight size={13} className="text-red-200 shrink-0 ml-1" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
