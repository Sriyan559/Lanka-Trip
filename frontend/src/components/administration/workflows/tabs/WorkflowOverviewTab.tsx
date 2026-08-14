'use client';

import React from 'react';
import { WorkflowFullData, WorkflowDefinitionRecord } from '@/lib/administration/workflows/workflows.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { SelectedWorkflowPanel } from '../SelectedWorkflowPanel';
import { WorkflowStagePipeline } from '../WorkflowStagePipeline';
import { ApprovalChain } from '../ApprovalChain';
import { ChevronRight } from 'lucide-react';

interface WorkflowOverviewTabProps {
  data: WorkflowFullData;
  selectedWorkflowItem: WorkflowDefinitionRecord;
  onSelectWorkflowItem: (item: WorkflowDefinitionRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function WorkflowOverviewTab({
  data,
  selectedWorkflowItem,
  onSelectWorkflowItem,
  onNavigateTab,
}: WorkflowOverviewTabProps) {
  const {
    definitions,
    selectedWorkflow,
    pipelineStages,
    approvalChain,
    pendingApprovals,
    approvalPolicies,
    routingRules,
    slaEscalations,
    stepUpRequirements,
    segregationControls,
    governanceGates,
    processHealth,
    dependencies,
    bottlenecks,
    recentActivity,
    migrationReadiness,
    ownership,
    charts,
  } = data;

  const definitionColumns: ColumnDef<WorkflowDefinitionRecord>[] = [
    { key: 'workflowKey', header: 'Workflow Key', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.workflowKey}</span> },
    {
      key: 'workflowName',
      header: 'Workflow Name',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectWorkflowItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left"
        >
          {r.workflowName}
        </button>
      ),
    },
    { key: 'workflowType', header: 'Workflow Type', cell: (r) => <span className="text-[9px] text-gray-500">{r.workflowType}</span> },
    { key: 'domain', header: 'Domain' },
    { key: 'version', header: 'Version', align: 'center', cell: (r) => <span className="font-mono text-[9px]">{r.version}</span> },
    { key: 'triggerType', header: 'Trigger Type' },
    { key: 'stages', header: 'Stages', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.stages}</span> },
    { key: 'stepUp', header: 'Step-Up', align: 'center', cell: (r) => <span className="font-semibold">{r.stepUp}</span> },
    { key: 'approvalSource', header: 'Approval Source' },
    { key: 'routingMode', header: 'Routing Mode' },
    { key: 'owner', header: 'Owner' },
    { key: 'securityReview', header: 'Security Review', cell: (r) => <StatusBadge status={r.securityReview} size="xs" /> },
    { key: 'autoApproved', header: 'Auto-Approved (Controlled)', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.autoApproved}</span> },
    { key: 'pendingApproval', header: 'Pending Approval', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.pendingApproval}</span> },
    { key: 'slaLevel', header: 'SLA Level', align: 'center', cell: (r) => <span className="font-semibold text-gray-800">{r.slaLevel}</span> },
    { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================================= */}
      {/* ROW 1: Workflow Definition Registry, Selected Workflow Summary */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8 min-w-0">
          <SectionCard
            title="Workflow Definition Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('definitions')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all workflow definitions</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={definitionColumns} data={definitions} density="compact" />
          </SectionCard>
        </div>

        <div className="lg:col-span-4 min-w-0">
          <SelectedWorkflowPanel
            workflow={selectedWorkflow}
            onReviewWorkflow={() => alert('Review Workflow')}
            onReviewStages={() => onNavigateTab('definitions')}
            onReviewRouting={() => onNavigateTab('routing-rules')}
            onReviewSla={() => onNavigateTab('sla-escalation')}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Stage Pipeline, Approval Chain, Pending Approval Queue */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 min-w-0">
          <WorkflowStagePipeline stages={pipelineStages} totalActiveInstances={126} />
        </div>

        <div className="lg:col-span-4 min-w-0">
          <ApprovalChain chain={approvalChain} workflowTitle="Production Configuration Change" />
        </div>

        <div className="lg:col-span-4 min-w-0">
          <SectionCard
            title="Pending Approval Queue"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('approval-queue')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View queue</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable
              columns={[
                { key: 'requestId', header: 'Request ID', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.requestId}</span> },
                { key: 'workflow', header: 'Workflow', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.workflow}</span> },
                { key: 'step', header: 'Step' },
                { key: 'approver', header: 'Approver', cell: (r) => <span className="font-semibold text-gray-800">{r.approver}</span> },
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
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 3: Approval Policies, Routing Rules, SLA & Escalation, Step-Up Requirements */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <SectionCard title="Approval Policies">
          <DataTable
            columns={[
              { key: 'policyName', header: 'Policy Name', cell: (r) => <span className="font-bold text-gray-900">{r.policyName}</span> },
              { key: 'domain', header: 'Domain' },
              { key: 'approvalModel', header: 'Approval Model' },
              { key: 'minApprovers', header: 'Min Approvers', align: 'center' },
              { key: 'stepUp', header: 'Step-Up', align: 'center' },
              { key: 'autoApproval', header: 'Auto-Approval (Controlled)' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={approvalPolicies}
            density="compact"
          />
        </SectionCard>

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

        <SectionCard title="Step-Up Requirements">
          <DataTable
            columns={[
              { key: 'scenario', header: 'Scenario', cell: (r) => <span className="font-bold text-gray-900">{r.scenario}</span> },
              { key: 'trigger', header: 'Trigger' },
              { key: 'stepUpLevel', header: 'Step-Up Level', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.stepUpLevel}</span> },
              { key: 'approvalSource', header: 'Approval Source' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={stepUpRequirements}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 4: Segregation Controls, Governance Gates, Process Health, Dependencies */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <SectionCard title="Segregation Controls">
          <DataTable
            columns={[
              { key: 'control', header: 'Control', cell: (r) => <span className="font-bold text-gray-900">{r.control}</span> },
              { key: 'description', header: 'Description' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={segregationControls}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Governance Gates">
          <DataTable
            columns={[
              { key: 'gate', header: 'Gate', cell: (r) => <span className="font-bold text-gray-900">{r.gate}</span> },
              { key: 'description', header: 'Description' },
              { key: 'required', header: 'Required', align: 'center' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={governanceGates}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Process Health">
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

        <SectionCard title="Workflow Dependencies">
          <DataTable
            columns={[
              { key: 'dependentWorkflow', header: 'Dependent Workflow', cell: (r) => <span className="font-bold text-gray-900">{r.dependentWorkflow}</span> },
              { key: 'dependsOn', header: 'Depends On' },
              { key: 'dependencyType', header: 'Dependency Type', cell: (r) => <StatusBadge status={r.dependencyType} size="xs" /> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={dependencies}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 5: Throughput Chart, SLA Trend Chart, Process Bottlenecks, Activity */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <SectionCard title="Workflow Throughput (Last 30 Days)">
          <ResponsiveLineChart
            data={charts.throughputTrend}
            xAxisKey="label"
            series={[
              { key: 'Created', label: 'Created', color: '#3b82f6' },
              { key: 'Completed', label: 'Completed', color: '#10b981' },
              { key: 'Rejected', label: 'Rejected', color: '#f43f5e' },
              { key: 'Deferred', label: 'Deferred', color: '#f59e0b' },
            ]}
            height={130}
          />
        </SectionCard>

        <SectionCard title="Approval SLA Trend (Last 30 Days)">
          <ResponsiveLineChart
            data={charts.slaTrend}
            xAxisKey="label"
            series={[
              { key: 'Within SLA', label: 'Within SLA', color: '#10b981' },
              { key: 'At Risk', label: 'At Risk', color: '#f59e0b', dashed: true },
              { key: 'Breach', label: 'Breach', color: '#f43f5e' },
            ]}
            height={130}
          />
        </SectionCard>

        <SectionCard title="Process Bottlenecks (Top 5)">
          <DataTable
            columns={[
              { key: 'stage', header: 'Stage', cell: (r) => <span className="font-bold text-gray-900">{r.stage}</span> },
              { key: 'instances', header: 'Instances', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.instances}</span> },
              { key: 'avgWaitTime', header: 'Avg Wait Time', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.avgWaitTime}</span> },
              { key: 'impact', header: 'Impact', cell: (r) => <StatusBadge status={r.impact} size="xs" /> },
            ]}
            data={bottlenecks}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Recent Workflow Activity">
          <DataTable
            columns={[
              { key: 'workflow', header: 'Workflow', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.workflow}</span> },
              { key: 'activity', header: 'Activity', cell: (r) => <span className="font-bold text-gray-900">{r.activity}</span> },
              { key: 'by', header: 'By' },
              { key: 'time', header: 'Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.time}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 6: Migration Readiness, Workflow Ownership */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SectionCard title="Migration Readiness">
          <DataTable
            columns={[
              { key: 'dimension', header: 'Dimension', cell: (r) => <span className="font-bold text-gray-900">{r.dimension}</span> },
              { key: 'readiness', header: 'Readiness', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.readiness}%</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={migrationReadiness}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Workflow Ownership">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
              { key: 'owner', header: 'Owner' },
              { key: 'backupOwner', header: 'Backup Owner' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={ownership}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
export default WorkflowOverviewTab;
