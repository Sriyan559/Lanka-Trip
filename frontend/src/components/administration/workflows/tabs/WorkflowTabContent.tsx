'use client';

import React from 'react';
import { WorkflowFullData, WorkflowDefinitionRecord } from '@/lib/administration/workflows/workflows.types';
import { WorkflowOverviewTab } from './WorkflowOverviewTab';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';

interface WorkflowTabContentProps {
  activeTab: string;
  data: WorkflowFullData;
  selectedWorkflowItem: WorkflowDefinitionRecord;
  onSelectWorkflowItem: (item: WorkflowDefinitionRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function WorkflowTabContent({
  activeTab,
  data,
  selectedWorkflowItem,
  onSelectWorkflowItem,
  onNavigateTab,
}: WorkflowTabContentProps) {
  const {
    definitions,
    pendingApprovals,
    approvalPolicies,
    routingRules,
    slaEscalations,
    processHealth,
    recentActivity,
  } = data;

  switch (activeTab) {
    case 'overview':
      return (
        <WorkflowOverviewTab
          data={data}
          selectedWorkflowItem={selectedWorkflowItem}
          onSelectWorkflowItem={onSelectWorkflowItem}
          onNavigateTab={onNavigateTab}
        />
      );

    case 'definitions':
    case 'versions':
      return (
        <SectionCard title="Workflow Definitions">
          <DataTable
            columns={[
              { key: 'workflowKey', header: 'Workflow Key', cell: (r) => <span className="font-mono text-gray-500">{r.workflowKey}</span> },
              { key: 'workflowName', header: 'Workflow Name', cell: (r) => <span className="font-bold text-gray-900">{r.workflowName}</span> },
              { key: 'domain', header: 'Domain' },
              { key: 'version', header: 'Version', align: 'center', cell: (r) => <span className="font-mono">{r.version}</span> },
              { key: 'stages', header: 'Stages', align: 'center' },
              { key: 'stepUp', header: 'Step-Up', align: 'center' },
              { key: 'routingMode', header: 'Routing Mode' },
              { key: 'owner', header: 'Owner' },
              { key: 'securityReview', header: 'Security Review', cell: (r) => <StatusBadge status={r.securityReview} size="xs" /> },
              { key: 'slaLevel', header: 'SLA Level', align: 'center' },
              { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
            ]}
            data={definitions}
            density="compact"
          />
        </SectionCard>
      );

    case 'approval-policies':
      return (
        <SectionCard title="Approval Policies">
          <DataTable
            columns={[
              { key: 'policyName', header: 'Policy Name', cell: (r) => <span className="font-bold text-gray-900">{r.policyName}</span> },
              { key: 'domain', header: 'Domain' },
              { key: 'approvalModel', header: 'Approval Model' },
              { key: 'minApprovers', header: 'Min Approvers', align: 'center' },
              { key: 'stepUp', header: 'Step-Up', align: 'center' },
              { key: 'autoApproval', header: 'Auto-Approval' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={approvalPolicies}
            density="compact"
          />
        </SectionCard>
      );

    case 'approval-queue':
    case 'active-instances':
      return (
        <SectionCard title="Pending Approval Queue">
          <DataTable
            columns={[
              { key: 'requestId', header: 'Request ID', cell: (r) => <span className="font-mono text-gray-500">{r.requestId}</span> },
              { key: 'workflow', header: 'Workflow', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.workflow}</span> },
              { key: 'step', header: 'Step' },
              { key: 'approver', header: 'Approver' },
              { key: 'currentStage', header: 'Current Stage' },
              { key: 'requestedBy', header: 'Requested By' },
              { key: 'age', header: 'Age', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.age}</span> },
              { key: 'sla', header: 'SLA', align: 'center' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={pendingApprovals}
            density="compact"
          />
        </SectionCard>
      );

    case 'routing-rules':
      return (
        <SectionCard title="Routing Rules">
          <DataTable
            columns={[
              { key: 'ruleName', header: 'Rule Name', cell: (r) => <span className="font-bold text-gray-900">{r.ruleName}</span> },
              { key: 'domain', header: 'Domain' },
              { key: 'condition', header: 'Condition' },
              { key: 'routingMode', header: 'Routing Mode' },
              { key: 'owner', header: 'Owner' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={routingRules}
            density="compact"
          />
        </SectionCard>
      );

    case 'sla-escalation':
      return (
        <SectionCard title="SLA & Escalation">
          <DataTable
            columns={[
              { key: 'slaName', header: 'SLA Name', cell: (r) => <span className="font-bold text-gray-900">{r.slaName}</span> },
              { key: 'domain', header: 'Domain' },
              { key: 'slaDuration', header: 'SLA Duration', align: 'center' },
              { key: 'escalationAfter', header: 'Escalation After', align: 'center' },
              { key: 'escalationTo', header: 'Escalation To' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={slaEscalations}
            density="compact"
          />
        </SectionCard>
      );

    case 'process-health':
      return (
        <SectionCard title="Process Health Metrics">
          <DataTable
            columns={[
              { key: 'metric', header: 'Metric', cell: (r) => <span className="font-bold text-gray-900">{r.metric}</span> },
              { key: 'score', header: 'Score', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.score}%</span> },
              { key: 'healthScore', header: 'Health Score', align: 'center', cell: (r) => <span className="font-extrabold text-gray-900">{r.healthScore}</span> },
              {
                key: 'trend',
                header: 'Trend',
                align: 'center',
                cell: (r) => (
                  <span className={`font-bold ${r.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {r.trend === 'up' ? '↑' : '↓'} {r.trendValue}
                  </span>
                ),
              },
              { key: 'last7Days', header: 'Last 7 Days', align: 'center' },
            ]}
            data={processHealth}
            density="compact"
          />
        </SectionCard>
      );

    case 'activity':
    case 'audit-history':
      return (
        <SectionCard title="Recent Workflow Activity">
          <DataTable
            columns={[
              { key: 'workflow', header: 'Workflow', cell: (r) => <span className="font-mono text-gray-500">{r.workflow}</span> },
              { key: 'activity', header: 'Activity', cell: (r) => <span className="font-bold text-gray-900">{r.activity}</span> },
              { key: 'by', header: 'By' },
              { key: 'time', header: 'Time', cell: (r) => <span className="text-[9px] text-gray-500">{r.time}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>
      );

    default:
      return (
        <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 text-sm shadow-2xs">
          The <span className="font-bold text-gray-700">{activeTab}</span> tab is under construction.
        </div>
      );
  }
}
export default WorkflowTabContent;
