"use client";

import React from "react";
import { Package, Clock, AlertTriangle, FileText, AlertCircle, Truck, CheckCircle } from "lucide-react";

export function DeliverySupportKpis() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 mb-4">
      {/* 1. Open Delivery Support Cases */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Open Delivery Support Cases</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <Package size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">346</div>
      </div>

      {/* 2. Awaiting Dispatch */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Awaiting Dispatch</span>
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded">
            <Clock size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">82</div>
      </div>

      {/* 3. Shipment Delay */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Shipment Delay</span>
          <div className="p-1.5 bg-red-50 text-red-600 rounded">
            <AlertTriangle size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">64</div>
      </div>

      {/* 4. Dispatch Delay */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Dispatch Delay</span>
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded">
            <FileText size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">27</div>
      </div>

      {/* 5. Failed Delivery */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Failed Delivery</span>
          <div className="p-1.5 bg-red-50 text-red-600 rounded">
            <AlertCircle size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">27</div>
      </div>

      {/* 6. Waiting on Logistics */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Waiting on Logistics</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <Truck size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">38</div>
      </div>

      {/* 7. SLA At Risk */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">SLA At Risk</span>
          <div className="p-1.5 bg-orange-50 text-orange-600 rounded">
            <Clock size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">29</div>
      </div>

      {/* 8. Delivery Support Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Delivery Support Health</span>
          <div className="p-1 bg-emerald-50 text-emerald-600 rounded-full">
            <CheckCircle size={16} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-emerald-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray="92, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900">92<span className="text-xs font-semibold text-slate-400">/100</span></span>
        </div>
      </div>
    </div>
  );
}
