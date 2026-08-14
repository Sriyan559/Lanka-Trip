'use client';

import React from 'react';
import { SelectedWorkflowDetails } from '@/lib/administration/workflows/workflows.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';

interface SelectedWorkflowPanelProps {
  workflow: SelectedWorkflowDetails;
  onReviewWorkflow: () => void;
  onReviewStages: () => void;
  onReviewRouting: () => void;
  onReviewSla: () => void;
}

export function SelectedWorkflowPanel({
  workflow,
  onReviewWorkflow,
  onReviewStages,
  onReviewRouting,
  onReviewSla,
}: SelectedWorkflowPanelProps) {
  return (
    <SectionCard
      title={
        <div className="flex items-center gap-1.5">
          <span>Selected Workflow Summary</span>
          <StatusBadge status={workflow.status} size="xs" />
        </div>
      }
    >
      <div className="flex flex-col justify-between h-full text-[10px]">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Workflow Key</span>
            <span className="font-mono font-bold text-gray-900">{workflow.workflowKey}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Stages</span>
            <span className="font-bold text-gray-900">{workflow.stages}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Workflow Name</span>
            <span className="font-bold text-gray-900 truncate block">{workflow.workflowName}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Approval Steps</span>
            <span className="font-bold text-gray-900">{workflow.approvalSteps}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Domain</span>
            <span className="font-semibold text-gray-800">{workflow.domain}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Step-Up</span>
            <span className="font-bold text-emerald-700">{workflow.stepUp}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Version</span>
            <span className="font-mono text-gray-700">{workflow.version}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">SLA</span>
            <span className="font-bold text-gray-900">{workflow.sla}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Trigger Type</span>
            <span className="font-semibold text-gray-800 truncate block">{workflow.triggerType}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Escalation</span>
            <span className="font-bold text-emerald-700">{workflow.escalation}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Description</span>
            <span className="text-gray-700 leading-tight block">{workflow.description}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Routing Mode</span>
            <span className="font-semibold text-gray-800">{workflow.routingMode}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Instances (Running)</span>
            <span className="font-bold text-gray-900">{workflow.instances}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Owner</span>
            <span className="font-semibold text-gray-800 truncate block">{workflow.owner}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Approval Rate</span>
            <span className="font-bold text-emerald-700">{workflow.approvalRate}%</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">SLA Compliance</span>
            <span className="font-bold text-emerald-700">{workflow.slaCompliance}%</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Workflow Health</span>
            <span className="font-extrabold text-emerald-700">{workflow.workflowHealth} / 100</span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-150 flex items-center justify-between gap-1 text-[9px]">
          <button
            type="button"
            onClick={onReviewWorkflow}
            className="px-2 py-1 bg-[#741d35] hover:bg-[#5d172a] text-white font-bold rounded shadow-2xs transition-colors"
          >
            Review Workflow
          </button>
          <button
            type="button"
            onClick={onReviewStages}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review Stages
          </button>
          <button
            type="button"
            onClick={onReviewRouting}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review Routing
          </button>
          <button
            type="button"
            onClick={onReviewSla}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review SLA
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
export default SelectedWorkflowPanel;
