'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  UserCheck,
  Scale,
  Clock,
  TrendingUp,
  GitBranch,
} from 'lucide-react';

interface QueueActionsProps {
  onReviewPriority?: () => void;
  onAssignCases?: () => void;
  onBalanceWorkloads?: () => void;
  onReviewSlaRisks?: () => void;
  onRouteEscalations?: () => void;
  onOpenRoutingRules?: () => void;
}

export function QueueActions({
  onReviewPriority,
  onAssignCases,
  onBalanceWorkloads,
  onReviewSlaRisks,
  onRouteEscalations,
  onOpenRoutingRules,
}: QueueActionsProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl border border-line shadow-sm p-4">
      <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-3">
        Queue Actions
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onReviewPriority}
          className="px-2.5 py-2 bg-[#7a0016] text-white text-[11px] font-semibold rounded-lg hover:bg-[#600011] transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
        >
          <AlertTriangle size={13} />
          <span>Review Priority Cases</span>
        </button>

        <button
          type="button"
          onClick={onAssignCases}
          className="px-2.5 py-2 bg-[#7a0016] text-white text-[11px] font-semibold rounded-lg hover:bg-[#600011] transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
        >
          <UserCheck size={13} />
          <span>Assign / Reassign Cases</span>
        </button>

        <button
          type="button"
          onClick={onBalanceWorkloads}
          className="px-2.5 py-2 bg-[#7a0016] text-white text-[11px] font-semibold rounded-lg hover:bg-[#600011] transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
        >
          <Scale size={13} />
          <span>Balance Workloads</span>
        </button>

        <button
          type="button"
          onClick={onReviewSlaRisks}
          className="px-2.5 py-2 bg-[#7a0016] text-white text-[11px] font-semibold rounded-lg hover:bg-[#600011] transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
        >
          <Clock size={13} />
          <span>Review SLA Risks</span>
        </button>

        <button
          type="button"
          onClick={onRouteEscalations}
          className="px-2.5 py-2 bg-[#7a0016] text-white text-[11px] font-semibold rounded-lg hover:bg-[#600011] transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
        >
          <TrendingUp size={13} />
          <span>Route Escalations</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenRoutingRules) onOpenRoutingRules();
            else router.push('/admin/customer-support/sla-routing');
          }}
          className="px-2.5 py-2 bg-[#7a0016] text-white text-[11px] font-semibold rounded-lg hover:bg-[#600011] transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
        >
          <GitBranch size={13} />
          <span>Open Routing Rules</span>
        </button>
      </div>

      <button
        type="button"
        className="w-full text-center text-[10px] font-semibold text-slate-400 hover:text-primary-900 transition-colors mt-3 pt-2 border-t border-slate-100"
      >
        View Queue Audit
      </button>
    </div>
  );
}
