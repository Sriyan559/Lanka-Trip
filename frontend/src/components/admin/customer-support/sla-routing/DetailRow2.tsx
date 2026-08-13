'use client';

import React from 'react';
import { CheckCircle2, Play } from 'lucide-react';
import { EscalationRuleItem } from '@/types/slaRouting';

interface DetailRow2Props {
  escalationRules: EscalationRuleItem[];
  onRunSimulation?: () => void;
}

export function DetailRow2({ escalationRules, onRunSimulation }: DetailRow2Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.10fr)_minmax(0,2.00fr)_minmax(0,3.20fr)_minmax(0,2.10fr)] gap-2 text-xs items-start">
      {/* 7. Queue Capacity */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">7. Queue Capacity</h4>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Active Capacity</span>
              <span className="font-bold text-slate-900">120</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Available Agents</span>
              <span className="font-semibold text-slate-800">36 (30%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Overflow Threshold</span>
              <span className="font-semibold text-slate-800">80%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Current Utilisation</span>
              <span className="font-bold text-emerald-600">64%</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-slate-500 font-medium">Backlog Risk</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Low
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Escalation Rules */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">8. Escalation Rules</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold text-[10px]">
                  <th className="py-1 px-1.5">Trigger</th>
                  <th className="py-1 px-1.5">At</th>
                  <th className="py-1 px-1.5">Escalate To</th>
                  <th className="py-1 px-1.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {escalationRules.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-1 px-1.5 font-medium text-slate-800 whitespace-nowrap">{r.trigger}</td>
                    <td className="py-1 px-1.5 font-mono text-slate-600 whitespace-nowrap">{r.at}</td>
                    <td className="py-1 px-1.5 font-semibold text-[#881337] whitespace-nowrap">{r.escalateTo}</td>
                    <td className="py-1 px-1.5 text-slate-600 whitespace-nowrap">{r.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 9. Routing Simulation (Safe Preview) */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span>9. Routing Simulation</span>
              <span className="text-[10px] text-slate-400 font-normal">(Safe Preview)</span>
            </h4>
            <span className="text-[9px] text-slate-400 font-mono">does not modify live routing</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] mb-1.5 bg-slate-50 p-1.5 rounded border border-slate-100">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Input Stream</span>
              <div className="space-y-0.5">
                <div><span className="text-slate-400">Customer Tier:</span> <strong className="text-slate-800">VIP Customer</strong></div>
                <div><span className="text-slate-400">Priority:</span> <strong className="text-slate-800">High Priority</strong></div>
                <div><span className="text-slate-400">Issue Type:</span> <strong className="text-slate-800">Shipment Not Dispatched</strong></div>
                <div><span className="text-slate-400">Channel:</span> <strong className="text-slate-800">In-App Chat</strong></div>
                <div><span className="text-slate-400">Region:</span> <strong className="text-slate-800">Sri Lanka</strong></div>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Output Target</span>
              <div className="space-y-0.5">
                <div><span className="text-slate-400">Queue:</span> <strong className="text-slate-800">Order &amp; Delivery</strong></div>
                <div><span className="text-slate-400">Team:</span> <strong className="text-slate-800">Govinda Support Team</strong></div>
                <div><span className="text-slate-400">Agent:</span> <strong className="text-slate-800">Assigned</strong></div>
                <div><span className="text-slate-400">First Response:</span> <strong className="text-slate-800">15m</strong></div>
                <div><span className="text-slate-400">Escalation Rule:</span> <strong className="text-[#881337]">75% to Team Lead</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200 text-[10px]">
            <CheckCircle2 size={12} className="text-emerald-600" />
            Simulation Passed
          </span>
          <button
            type="button"
            onClick={onRunSimulation}
            className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold underline flex items-center gap-1"
          >
            <Play size={10} className="fill-blue-600" />
            Re-run Safe Simulation
          </button>
        </div>
      </div>

      {/* 10. Routing Sources */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">10. Routing Sources</h4>
          <div className="space-y-1.5 text-[10px]">
            <div className="p-1.5 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-500 font-semibold block">Input Stream:</span>
              <p className="text-slate-800 font-medium leading-tight">
                VIP Customer, Order &amp; Delivery, Shipment Not Dispatched, High Priority, Sri Lanka, In-App Chat
              </p>
            </div>
            <div className="p-1.5 bg-rose-50/50 rounded border border-rose-100/60 space-y-0.5">
              <span className="text-[#881337] font-bold block">Output:</span>
              <div className="flex justify-between"><span className="text-slate-500">SLA Policy:</span> <strong className="text-slate-900">High Priority Delivery</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Queue:</span> <strong className="text-slate-900">Order &amp; Delivery</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Team:</span> <strong className="text-slate-900">Govinda Support Team</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">First Response:</span> <strong className="text-slate-900">15m</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Escalation Rule:</span> <strong className="text-[#881337]">75% to Team Lead</strong></div>
            </div>
          </div>
        </div>

        <div className="pt-1 mt-1.5 border-t border-slate-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
            <CheckCircle2 size={11} className="text-emerald-600" />
            Simulation Passed
          </span>
        </div>
      </div>
    </div>
  );
}
