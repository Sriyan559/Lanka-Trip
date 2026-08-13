"use client";

import React from "react";
import { MessageSquare, Mail, UserRound, Clock, UserCheck, AlertTriangle, ShieldAlert, CheckCircle } from "lucide-react";

export function ConversationsKpiCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 mb-4">
      {/* 1. Open Conversations */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Open Conversations</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <MessageSquare size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">864</div>
      </div>

      {/* 2. New */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">New</span>
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
            <Mail size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">126</div>
      </div>

      {/* 3. Unassigned */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Unassigned</span>
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded">
            <UserRound size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">42</div>
      </div>

      {/* 4. Waiting for Customer */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Waiting for Customer</span>
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded">
            <Clock size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">118</div>
      </div>

      {/* 5. Waiting for Agent */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Waiting for Agent</span>
          <div className="p-1.5 bg-orange-50 text-orange-600 rounded">
            <UserCheck size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">73</div>
      </div>

      {/* 6. SLA At Risk */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">SLA At Risk</span>
          <div className="p-1.5 bg-red-50 text-red-600 rounded">
            <AlertTriangle size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">21</div>
      </div>

      {/* 7. Escalated Conversations */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Escalated Conversations</span>
          <div className="p-1.5 bg-red-50 text-red-700 rounded">
            <ShieldAlert size={14} />
          </div>
        </div>
        <div className="text-xl font-bold text-slate-900">14</div>
      </div>

      {/* 8. Conversation Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-slate-500">Conversation Health</span>
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
          <span className="text-xl font-bold text-slate-900">94<span className="text-xs font-semibold text-slate-400">/100</span></span>
        </div>
      </div>
    </div>
  );
}
