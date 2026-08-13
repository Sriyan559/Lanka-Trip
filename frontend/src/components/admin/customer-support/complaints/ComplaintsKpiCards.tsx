"use client";

import React from "react";
import { Users, AlertTriangle, FilePenLine, UserRound, Shield, ClipboardCheck, FileText, CheckCircle } from "lucide-react";

export function ComplaintsKpiCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 mb-4">
      {/* 1. Open Complaints */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Open Complaints</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <Users size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">184</div>
      </div>

      {/* 2. Critical Complaints */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Critical Complaints</span>
          <div className="p-1.5 bg-red-50 text-red-600 rounded">
            <AlertTriangle size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">12</div>
      </div>

      {/* 3. Escalated */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Escalated</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <FilePenLine size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">37</div>
      </div>

      {/* 4. Executive Escalations */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Executive Escalations</span>
          <div className="p-1.5 bg-orange-50 text-orange-600 rounded">
            <UserRound size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">6</div>
      </div>

      {/* 5. Recovery Plans Active */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Recovery Plans Active</span>
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded">
            <Shield size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">42</div>
      </div>

      {/* 6. Pending Remedy Approvals */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Pending Remedy Approvals</span>
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded">
            <ClipboardCheck size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">18</div>
      </div>

      {/* 7. Reopened Complaints */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Reopened Complaints</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <FileText size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">14</div>
      </div>

      {/* 8. Complaint & Recovery Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Complaint &amp; Recovery Health</span>
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
                strokeDasharray="91, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-900">91<span className="text-xs font-semibold text-slate-400">/100</span></span>
        </div>
      </div>
    </div>
  );
}
