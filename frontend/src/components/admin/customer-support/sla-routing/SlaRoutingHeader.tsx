'use client';

import React from 'react';
import {
  CheckCircle2,
  Plus,
  GitBranch,
  Shield,
  Play,
  MoreVertical,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface SlaRoutingHeaderProps {
  onReviewApprovalQueue?: () => void;
  onCreateSlaPolicy?: () => void;
  onCreateRoutingRule?: () => void;
  onCreateEscalationRule?: () => void;
  onSimulateRouting?: () => void;
  onMoreActions?: () => void;
}

export function SlaRoutingHeader({
  onReviewApprovalQueue,
  onCreateSlaPolicy,
  onCreateRoutingRule,
  onCreateEscalationRule,
  onSimulateRouting,
  onMoreActions,
}: SlaRoutingHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span>Customer Support</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">SLA &amp; Routing</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          CS10 — SLA, Routing, Escalation Rules &amp; Service Policies
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
          Configure and govern service targets, queue routing, escalation logic, operating calendars, and customer support policies across the ecosystem.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onReviewApprovalQueue}
          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <CheckCircle2 size={14} className="text-slate-500" />
          Review Approval Queue
        </button>

        <button
          type="button"
          onClick={onCreateSlaPolicy}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          Create SLA Policy
        </button>

        <button
          type="button"
          onClick={onCreateRoutingRule}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          Create Routing Rule
        </button>

        <button
          type="button"
          onClick={onCreateEscalationRule}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          Create Escalation Rule
        </button>

        <button
          type="button"
          onClick={onSimulateRouting}
          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Play size={13} className="text-slate-600 fill-slate-600" />
          Simulate Routing
        </button>

        <button
          type="button"
          onClick={onMoreActions}
          className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1"
        >
          More Actions
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
