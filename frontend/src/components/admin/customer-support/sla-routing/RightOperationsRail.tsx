'use client';

import React from 'react';
import {
  RotateCw,
  Plus,
  Play,
  CheckCircle2,
  AlertOctagon,
  FileCheck,
  Shield,
  Layers,
} from 'lucide-react';

interface RightOperationsRailProps {
  onCreateSlaPolicy?: () => void;
  onCreateRoutingRule?: () => void;
  onCreateEscalationRule?: () => void;
  onRunSimulation?: () => void;
  onReviewConflicts?: () => void;
  onReviewCoverageGaps?: () => void;
  onReviewApprovalQueue?: () => void;
  onOpenPolicyAudit?: () => void;
}

export function RightOperationsRail({
  onCreateSlaPolicy,
  onCreateRoutingRule,
  onCreateEscalationRule,
  onRunSimulation,
  onReviewConflicts,
  onReviewCoverageGaps,
  onReviewApprovalQueue,
  onOpenPolicyAudit,
}: RightOperationsRailProps) {
  return (
    <div className="w-full space-y-2.5 text-xs">
      {/* 1. SLA & Routing Health */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-slate-900 text-xs">SLA &amp; Routing Health</h4>
          <RotateCw size={12} className="text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>

        <div className="flex items-center gap-3">
          {/* Circular Gauge */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="96, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">96</span>
              <span className="text-[9px] text-slate-400 leading-none">/100</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-emerald-600 text-xs block">Excellent</span>
            <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
              Strong governance and performance across SLA, routing and escalation.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Policy Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Policy Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">SLA Policies</span>
          <span className="font-bold text-slate-900">28</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Routing Rules</span>
          <span className="font-bold text-slate-900">46</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Escalation Rules</span>
          <span className="font-bold text-slate-900">32</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Service Policies</span>
          <span className="font-bold text-slate-900">19</span>
        </div>
      </div>

      {/* 3. Status Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Status Summary</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
          </span>
          <span className="font-bold text-slate-900">125</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Draft
          </span>
          <span className="font-bold text-slate-900">14</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Scheduled
          </span>
          <span className="font-bold text-slate-900">0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Pending Approval
          </span>
          <span className="font-bold text-slate-900">7</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Expiring
          </span>
          <span className="font-bold text-slate-900">5</span>
        </div>
      </div>

      {/* 4. Risk Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Risk Summary</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Routing Conflicts
          </span>
          <span className="font-bold text-rose-600">4</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Coverage Gaps
          </span>
          <span className="font-bold text-indigo-600">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Escalation Warnings
          </span>
          <span className="font-bold text-amber-600">6</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Queue Capacity Risks
          </span>
          <span className="font-bold text-slate-900">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Calendar Warnings
          </span>
          <span className="font-bold text-slate-900">2</span>
        </div>
      </div>

      {/* 5. SLA Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">SLA Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Compliance</span>
          <span className="font-bold text-emerald-600">93%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">At Risk</span>
          <span className="font-bold text-amber-600">29</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Breaches</span>
          <span className="font-bold text-rose-600">12</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Avg First Response</span>
          <span className="font-bold text-slate-900">16m</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Avg Resolution</span>
          <span className="font-bold text-slate-900">6.4h</span>
        </div>
      </div>

      {/* 6. Routing Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Routing Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Auto Routing</span>
          <span className="font-bold text-emerald-600">94%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Manual</span>
          <span className="font-bold text-slate-800">4%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Fallback</span>
          <span className="font-bold text-slate-800">2%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Unassigned</span>
          <span className="font-bold text-slate-800">4%</span>
        </div>
      </div>

      {/* 7. Quick Queues / Alerts */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1.5 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Quick Queues / Alerts</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-700">Routing Conflicts</span>
          <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 font-bold rounded-full text-[10px]">4</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-700">Pending Approvals</span>
          <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 font-bold rounded-full text-[10px]">7</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-700">Coverage Gaps</span>
          <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-800 font-bold rounded-full text-[10px]">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-700">Escalation Warnings</span>
          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 font-bold rounded-full text-[10px]">6</span>
        </div>
      </div>

      {/* 8. Final Actions (Dark Crimson Buttons) */}
      <div className="space-y-1.5 pt-1">
        <button
          type="button"
          onClick={onCreateSlaPolicy}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Create SLA Policy</span>
        </button>

        <button
          type="button"
          onClick={onCreateRoutingRule}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Create Routing Rule</span>
        </button>

        <button
          type="button"
          onClick={onCreateEscalationRule}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Create Escalation Rule</span>
        </button>

        <button
          type="button"
          onClick={onRunSimulation}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Play size={12} className="fill-white" /> Run Routing Simulation</span>
        </button>

        <button
          type="button"
          onClick={onReviewConflicts}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><AlertOctagon size={13} /> Review Conflicts</span>
        </button>

        <button
          type="button"
          onClick={onReviewCoverageGaps}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Layers size={13} /> Review Coverage Gaps</span>
        </button>

        <button
          type="button"
          onClick={onReviewApprovalQueue}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><CheckCircle2 size={13} /> Review Approval Queue</span>
        </button>

        <button
          type="button"
          onClick={onOpenPolicyAudit}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><FileCheck size={13} /> Open Policy Audit</span>
        </button>
      </div>
    </div>
  );
}
