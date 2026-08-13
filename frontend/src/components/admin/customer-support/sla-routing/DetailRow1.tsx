'use client';

import React from 'react';
import { CheckCircle2, User, UserCheck, Shield, ChevronRight } from 'lucide-react';

export function DetailRow1() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.10fr)_minmax(0,1.05fr)_minmax(0,1.15fr)_minmax(0,1.30fr)_minmax(0,1.05fr)_minmax(0,1.75fr)] gap-2 text-xs items-start">
      {/* 1. Policy Overview */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">1. Policy Overview</h4>
          <div className="space-y-1 text-[11px]">
            <div>
              <span className="text-slate-400 font-medium block text-[10px]">Policy Owner</span>
              <span className="font-semibold text-slate-800 leading-tight block">Support Operations</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px]">Description</span>
              <span className="text-slate-700 leading-tight block whitespace-normal break-words">
                High priority handling for time-sensitive order &amp; delivery issues.
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 pt-0.5">
              <div>
                <span className="text-slate-400 font-medium block text-[10px]">Scope</span>
                <span className="font-semibold text-slate-800 block">Global</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[10px]">Priority Behavior</span>
                <span className="font-semibold text-slate-800 block">Preemptive</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px]">Effective</span>
              <span className="text-slate-700 font-medium text-[10px] block">Jan 1, 2026 – Dec 31, 2026</span>
            </div>
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 mt-1.5 flex items-center justify-between text-[10px]">
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
            <CheckCircle2 size={11} className="text-emerald-600" />
            Approved
          </span>
          <span className="font-mono text-slate-500 font-bold">v6</span>
        </div>
      </div>

      {/* 2. SLA Targets */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">2. SLA Targets</h4>
          <div className="space-y-1.5 text-[11px]">
            <div>
              <div className="flex items-center justify-between text-[10px] mb-0.5">
                <span className="text-slate-600">First Response</span>
                <span className="font-bold text-slate-900">15m</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] mb-0.5">
                <span className="text-slate-600">Update Interval</span>
                <span className="font-bold text-slate-900">2h</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] mb-0.5">
                <span className="text-slate-600">Resolution</span>
                <span className="font-bold text-slate-900">6h</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] mb-0.5">
                <span className="text-slate-600">Escalation Trigger</span>
                <span className="font-bold text-amber-600">75%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] mb-0.5">
                <span className="text-slate-600">Breach At</span>
                <span className="font-bold text-rose-600">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
          <span>Benchmark Industry: <strong className="text-slate-700">15m</strong></span>
          <span>Internal: <strong className="text-slate-700">20m</strong></span>
        </div>
      </div>

      {/* 3. Applicability */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">3. Applicability</h4>
          <ul className="space-y-1 text-[11px]">
            <li className="flex items-start gap-1">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-800 leading-tight">Order &amp; Delivery</span>
            </li>
            <li className="flex items-start gap-1">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-800 leading-tight">Shipment Not Dispatched</span>
            </li>
            <li className="flex items-start gap-1">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-semibold text-slate-800 leading-tight">High Priority</span>
            </li>
            <li className="flex items-start gap-1">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-tight">VIP Optional Override</span>
            </li>
            <li className="flex items-start gap-1">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-tight">Channels: In-App Chat / Email / WhatsApp</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Precedence / Override Rules */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">4. Precedence / Override Rules</h4>
          <ol className="space-y-1 text-[11px] list-none">
            <li className="flex items-start gap-1">
              <span className="font-bold text-slate-400 shrink-0">1.</span>
              <span className="text-slate-700 leading-tight whitespace-normal break-words">
                Critical Safety overrides all delivery rules.
              </span>
            </li>
            <li className="flex items-start gap-1">
              <span className="font-bold text-slate-400 shrink-0">2.</span>
              <span className="text-slate-700 leading-tight whitespace-normal break-words">
                VIP overrides apply only where regulatory/compliance requirements permit.
              </span>
            </li>
            <li className="flex items-start gap-1">
              <span className="font-bold text-slate-400 shrink-0">3.</span>
              <span className="text-slate-700 leading-tight whitespace-normal break-words">
                Regulatory requirements override all other rules.
              </span>
            </li>
            <li className="flex items-start gap-1">
              <span className="font-bold text-slate-400 shrink-0">4.</span>
              <span className="text-slate-700 leading-tight whitespace-normal break-words">
                Manual override requires approval.
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* 5. Pause Rules */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">5. Pause Rules</h4>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Waiting for Customer</span>
              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-semibold text-[10px]">
                Pause Resolution
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Waiting for Supplier</span>
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                Continue
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Waiting for Escalation</span>
              <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
                Pause Response
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Waiting for Compliance</span>
              <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded font-semibold text-[10px]">
                General Pause
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Agent Outage</span>
              <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded font-semibold text-[10px]">
                Not Allowed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Escalation Chain (Default) - WIDE CARD */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">6. Escalation Chain (Default)</h4>
          <div className="space-y-2">
            {/* Horizontal 5-Step Pipeline */}
            <div className="grid grid-cols-5 gap-1 items-start text-[10px] text-slate-700">
              <div className="flex flex-col items-center text-center relative min-w-0">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-0.5">
                  <User size={12} />
                </div>
                <span className="font-medium text-slate-800 leading-tight">Agent</span>
                <ChevronRight size={10} className="absolute -right-2 top-1.5 text-slate-300 pointer-events-none" />
              </div>

              <div className="flex flex-col items-center text-center relative min-w-0">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-0.5">
                  <UserCheck size={12} />
                </div>
                <span className="font-semibold text-slate-800 leading-tight">Team Lead</span>
                <ChevronRight size={10} className="absolute -right-2 top-1.5 text-slate-300 pointer-events-none" />
              </div>

              <div className="flex flex-col items-center text-center relative min-w-0">
                <div className="w-5 h-5 rounded-full bg-rose-50 text-[#881337] flex items-center justify-center mb-0.5 border border-rose-200">
                  <Shield size={11} />
                </div>
                <span className="font-bold text-[#881337] leading-tight">Support Mgr</span>
                <ChevronRight size={10} className="absolute -right-2 top-1.5 text-slate-300 pointer-events-none" />
              </div>

              <div className="flex flex-col items-center text-center relative min-w-0">
                <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-0.5">
                  <Shield size={11} />
                </div>
                <span className="font-medium text-slate-800 leading-tight">Ops Dir</span>
                <ChevronRight size={10} className="absolute -right-2 top-1.5 text-slate-300 pointer-events-none" />
              </div>

              <div className="flex flex-col items-center text-center min-w-0">
                <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mb-0.5 border border-purple-200">
                  <Shield size={11} />
                </div>
                <span className="font-medium text-purple-900 leading-tight">Exec Rev</span>
              </div>
            </div>

            {/* Specialist Branches */}
            <div className="pt-1.5 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 block mb-1">Specialist Branches</span>
              <div className="flex flex-wrap items-center gap-1 text-[10px] font-medium">
                <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 shrink-0">Finance</span>
                <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 shrink-0">Logistics</span>
                <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-100 shrink-0">Supplier</span>
                <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 shrink-0">Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
