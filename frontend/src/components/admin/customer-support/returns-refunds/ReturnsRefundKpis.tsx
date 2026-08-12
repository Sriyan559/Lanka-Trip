"use client";

import React from "react";
import { FileText, Package, Truck, Search, CreditCard, AlertTriangle, ShieldAlert, CheckCircle } from "lucide-react";

export function ReturnsRefundKpis() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 mb-4">
      {/* 1. Open Return / Refund Cases */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Open Return / Refund Cases</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <FileText size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">264</div>
      </div>

      {/* 2. Return Requests Pending */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Return Requests Pending</span>
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded">
            <Package size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">74</div>
      </div>

      {/* 3. Pickup Delays */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Pickup Delays</span>
          <div className="p-1.5 bg-red-50 text-red-600 rounded">
            <Truck size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">28</div>
      </div>

      {/* 4. Inspection Pending */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Inspection Pending</span>
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded">
            <Search size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">36</div>
      </div>

      {/* 5. Refunds Pending */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Refunds Pending</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <CreditCard size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">52</div>
      </div>

      {/* 6. Refund Exceptions */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Refund Exceptions</span>
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded">
            <AlertTriangle size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">18</div>
      </div>

      {/* 7. Active Disputes */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Active Disputes</span>
          <div className="p-1.5 bg-red-50 text-red-600 rounded">
            <ShieldAlert size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">21</div>
      </div>

      {/* 8. Return & Refund Support Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Return &amp; Refund Support Health</span>
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
                strokeDasharray="93, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900">93<span className="text-xs font-semibold text-slate-400">/100</span></span>
        </div>
      </div>
    </div>
  );
}
