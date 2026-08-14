'use client';

import React, { useState, useEffect } from 'react';
import { fetchWorkflowData, createWorkflowDefinition, createApprovalPolicy, reviewSlaBreaches } from '@/lib/administration/workflows/workflows.api';
import { WorkflowFullData, WorkflowDefinitionRecord } from '@/lib/administration/workflows/workflows.types';
import { WORKFLOW_TABS } from '@/lib/administration/workflows/workflows.constants';

import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowContextBar } from './WorkflowContextBar';
import { WorkflowKpiGrid } from './WorkflowKpiGrid';
import { WorkflowFilterBar } from './WorkflowFilterBar';
import { WorkflowRightRail } from './WorkflowRightRail';
import { WorkflowTabContent } from './tabs/WorkflowTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function WorkflowPage() {
  const [data, setData] = useState<WorkflowFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const [selectedWorkflowItem, setSelectedWorkflowItem] = useState<WorkflowDefinitionRecord | null>(null);

  // Dialog States
  const [isCreateWorkflowOpen, setIsCreateWorkflowOpen] = useState(false);
  const [isCreatePolicyOpen, setIsCreatePolicyOpen] = useState(false);
  const [isReviewSlaOpen, setIsReviewSlaOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchWorkflowData();
      setData(result);
      if (result.definitions && result.definitions.length > 0) {
        setSelectedWorkflowItem(result.definitions[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleCreateWorkflow = async () => {
    await createWorkflowDefinition('New Workflow', 'Platform Config');
    setIsCreateWorkflowOpen(false);
    alert('Workflow definition created.');
  };

  const handleCreatePolicy = async () => {
    await createApprovalPolicy('New Policy', 'Platform Config');
    setIsCreatePolicyOpen(false);
    alert('Approval policy created.');
  };

  const handleReviewSlaBreaches = async () => {
    await reviewSlaBreaches();
    setIsReviewSlaOpen(false);
    alert('SLA breaches review initiated.');
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50/50">
        <div className="w-8 h-8 border-4 border-[#741d35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <WorkflowHeader
          onCreateWorkflow={() => setIsCreateWorkflowOpen(true)}
          onCreatePolicy={() => setIsCreatePolicyOpen(true)}
          onReviewPendingApprovals={() => setActiveTab('approval-queue')}
          onReviewSlaBreaches={() => setIsReviewSlaOpen(true)}
          onExportRegistry={() => alert('Exporting workflow registry...')}
        />

        <WorkflowContextBar context={data.context} />

        <WorkflowKpiGrid kpis={data.kpis} />

        <div className="flex flex-col lg:flex-row gap-3">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <WorkflowFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeQuickFilter={activeQuickFilter}
              onToggleQuickFilter={(id) => setActiveQuickFilter(prev => prev === id ? null : id)}
              onApplyFilters={() => alert('Filters applied')}
              onClearFilters={() => { setSearchQuery(''); setActiveQuickFilter(null); }}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {WORKFLOW_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 text-[11px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#741d35] text-[#741d35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border-b border-x border-gray-200 rounded-b p-3 shadow-2xs min-w-0">
              <WorkflowTabContent
                activeTab={activeTab}
                data={data}
                selectedWorkflowItem={selectedWorkflowItem!}
                onSelectWorkflowItem={setSelectedWorkflowItem}
                onNavigateTab={setActiveTab}
              />
            </div>
          </div>

          {/* Right Rail Panel */}
          <div className="w-full lg:w-72 shrink-0">
            <WorkflowRightRail
              onNavigateTab={setActiveTab}
              onActionClick={(action) => {
                if (action === 'create_workflow') setIsCreateWorkflowOpen(true);
                else if (action === 'create_policy') setIsCreatePolicyOpen(true);
                else if (action === 'review_sla_breaches') setIsReviewSlaOpen(true);
                else alert(`Action triggered: ${action}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={isCreateWorkflowOpen}
        title="Create Workflow Definition"
        description="Draft a new enterprise workflow process definition with configurable stages, step-up requirements, and routing rules."
        confirmLabel="Create Workflow"
        cancelLabel="Cancel"
        onConfirm={handleCreateWorkflow}
        onCancel={() => setIsCreateWorkflowOpen(false)}
      />

      <ConfirmDialog
        isOpen={isCreatePolicyOpen}
        title="Create Approval Policy"
        description="Define an approval policy enforcing minimum approvers, auto-approval thresholds, and delegation rules."
        confirmLabel="Create Policy"
        cancelLabel="Cancel"
        onConfirm={handleCreatePolicy}
        onCancel={() => setIsCreatePolicyOpen(false)}
      />

      <ConfirmDialog
        isOpen={isReviewSlaOpen}
        title="Review SLA Breaches"
        description="Initiate diagnostic and auto-escalation evaluation for overdue approval tasks across critical workflows."
        confirmLabel="Escalate & Review"
        cancelLabel="Cancel"
        onConfirm={handleReviewSlaBreaches}
        onCancel={() => setIsReviewSlaOpen(false)}
      />
    </div>
  );
}
export default WorkflowPage;
