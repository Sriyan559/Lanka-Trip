"use client";

import React from "react";
import { FileText, Package, Truck, ShieldAlert, AlertCircle, AlertTriangle, Clock, CheckCircle } from "lucide-react";

export function ProductSupplierKpis() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 mb-4">
      {/* 1. Open Product / Supplier Cases */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Open Product / Supplier Cases</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <FileText size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">198</div>
        <span className="text-[10px] text-slate-400 font-medium mt-1">View all</span>
      </div>

      {/* 2. Product Quality Issues */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Product Quality Issues</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <Package size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">64</div>
        <span className="text-[10px] text-slate-400 font-medium mt-1">View all</span>
      </div>

      {/* 3. Supplier Issues */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Supplier Issues</span>
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
            <Truck size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">38</div>
        <span className="text-[10px] text-slate-400 font-medium mt-1">View all</span>
      </div>

      {/* 4. Authenticity Concerns */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Authenticity Concerns</span>
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded">
            <ShieldAlert size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">17</div>
        <span className="text-[10px] text-slate-400 font-medium mt-1">View all</span>
      </div>

      {/* 5. Counterfeit Suspicions */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Counterfeit Suspicions</span>
          <div className="p-1.5 bg-red-50 text-red-600 rounded">
            <AlertCircle size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">7</div>
        <span className="text-[10px] text-slate-400 font-medium mt-1">View all</span>
      </div>

      {/* 6. Safety Concerns */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Safety Concerns</span>
          <div className="p-1.5 bg-rose-50 text-rose-600 rounded">
            <AlertTriangle size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">9</div>
        <span className="text-[10px] text-slate-400 font-medium mt-1">View all</span>
      </div>

      {/* 7. Waiting Supplier / Compliance */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Waiting Supplier / Compliance</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <Clock size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">31</div>
        <span className="text-[10px] text-slate-400 font-medium mt-1">View all</span>
      </div>

      {/* 8. Selected Case Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Selected Case Health</span>
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
                strokeDasharray="94, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900">94<span className="text-xs font-semibold text-slate-400">/100</span></span>
            <div className="text-[10px] font-bold text-emerald-700">Excellent</div>
          </div>
        </div>
      </div>
    </div>
  );
}
