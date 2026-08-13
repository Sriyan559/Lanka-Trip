'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  fetchSlaPolicies,
  fetchEscalationRules,
  fetchPolicyExceptions,
  fetchConflicts,
  fetchPolicyVersions,
} from '@/services/api/slaRoutingService';
import {
  SlaPolicyItem,
  EscalationRuleItem,
  PolicyExceptionItem,
  ConflictItem,
  PolicyVersionItem,
  SlaRoutingFilterParams,
} from '@/types/slaRouting';

import { SlaRoutingHeader } from '@/components/admin/customer-support/sla-routing/SlaRoutingHeader';
import { SlaRoutingContextBar } from '@/components/admin/customer-support/sla-routing/SlaRoutingContextBar';
import { SlaRoutingKpiCards } from '@/components/admin/customer-support/sla-routing/SlaRoutingKpiCards';
import { PolicyGovernanceTabs } from '@/components/admin/customer-support/sla-routing/PolicyGovernanceTabs';
import { PolicyFilters } from '@/components/admin/customer-support/sla-routing/PolicyFilters';
import { PolicyReadinessStrip } from '@/components/admin/customer-support/sla-routing/PolicyReadinessStrip';
import { SlaPolicyPortfolio } from '@/components/admin/customer-support/sla-routing/SlaPolicyPortfolio';
import {
  SelectedPolicyHeader,
  SelectedPolicyMetrics,
} from '@/components/admin/customer-support/sla-routing/SelectedPolicyHeader';
import { DetailRow1 } from '@/components/admin/customer-support/sla-routing/DetailRow1';
import { DetailRow2 } from '@/components/admin/customer-support/sla-routing/DetailRow2';
import { DetailRow3 } from '@/components/admin/customer-support/sla-routing/DetailRow3';
import { DetailRow4 } from '@/components/admin/customer-support/sla-routing/DetailRow4';
import { RightOperationsRail } from '@/components/admin/customer-support/sla-routing/RightOperationsRail';
import {
  CreateSlaPolicyModal,
  CreateRoutingRuleModal,
  SimulateRoutingModal,
} from '@/components/admin/customer-support/sla-routing/SlaRoutingModals';

export default function SlaRoutingPage() {
  const [activeTab, setActiveTab] = useState('sla-policies');
  const [policies, setPolicies] = useState<SlaPolicyItem[]>([]);
  const [escalationRules, setEscalationRules] = useState<EscalationRuleItem[]>([]);
  const [exceptions, setExceptions] = useState<PolicyExceptionItem[]>([]);
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [versions, setVersions] = useState<PolicyVersionItem[]>([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('1');

  // Filter state
  const [filters, setFilters] = useState<SlaRoutingFilterParams>({
    status: 'All',
    type: 'All',
    businessUnit: 'All',
    category: 'All',
    channel: 'All',
    queue: 'All',
    priority: 'All',
    customerTier: 'All',
    region: 'All',
    effectiveState: 'All',
    approvalState: 'All',
    conflictState: 'All',
  });

  // Modal controls
  const [isSlaModalOpen, setIsSlaModalOpen] = useState(false);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const pData = await fetchSlaPolicies(filters);
      setPolicies(pData);

      const eData = await fetchEscalationRules();
      setEscalationRules(eData);

      const exData = await fetchPolicyExceptions();
      setExceptions(exData);

      const cData = await fetchConflicts();
      setConflicts(cData);

      const vData = await fetchPolicyVersions();
      setVersions(vData);
    }
    loadData();
  }, [filters]);

  const handleFilterChange = (key: keyof SlaRoutingFilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      status: 'All',
      type: 'All',
      businessUnit: 'All',
      category: 'All',
      channel: 'All',
      queue: 'All',
      priority: 'All',
      customerTier: 'All',
      region: 'All',
      effectiveState: 'All',
      approvalState: 'All',
      conflictState: 'All',
    });
    toast.success('Filters reset to default view.');
  };

  const selectedPolicy = policies.find((p) => p.id === selectedPolicyId) || policies[0];

  return (
    <div className="space-y-2.5 p-2 sm:p-3 w-full max-w-[1920px] mx-auto pb-16 font-sans text-slate-900 leading-normal">
      {/* 1. Page Header */}
      <SlaRoutingHeader
        onReviewApprovalQueue={() => toast('Navigating to Approval Queue (7 pending)...')}
        onCreateSlaPolicy={() => setIsSlaModalOpen(true)}
        onCreateRoutingRule={() => setIsRoutingModalOpen(true)}
        onCreateEscalationRule={() => setIsRoutingModalOpen(true)}
        onSimulateRouting={() => setIsSimulationModalOpen(true)}
        onMoreActions={() => toast('Exporting SLA configuration package...')}
      />

      {/* 2. Policy / Engine Context Strip */}
      <SlaRoutingContextBar />

      {/* 3. KPI Cards Row */}
      <SlaRoutingKpiCards />

      {/* 4. Governance Tabs */}
      <PolicyGovernanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filter Workspace */}
      <PolicyFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onSaveView={() => toast.success('Current SLA view filter saved!')}
        onRefresh={() => toast.success('SLA Policy workspace refreshed.')}
        onMoreFilters={() => toast('Opening advanced boolean filter panel...')}
      />

      {/* 6. Readiness Strip */}
      <PolicyReadinessStrip />

      {/* Main split layout: Left main workspace + Right operations rail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_260px] gap-3 items-start">
        {/* Left main content column */}
        <div className="space-y-3 min-w-0">
          {/* 7. SLA Policy Portfolio Table */}
          <SlaPolicyPortfolio
            policies={policies}
            selectedPolicyId={selectedPolicyId}
            onSelectPolicy={setSelectedPolicyId}
            onViewPolicy={(p) => toast(`Viewing policy details for ${p.policyName}`)}
            onEditPolicy={(p) => toast(`Editing policy ${p.policyName}`)}
            onClonePolicy={(p) => toast.success(`Cloned policy ${p.policyName}`)}
          />

          {/* 8. Selected Policy Header & Metric Strip */}
          {selectedPolicy && (
            <>
              <SelectedPolicyHeader
                policyName={selectedPolicy.policyName}
                policyId={selectedPolicy.policyId}
                status={selectedPolicy.status}
              />
              <SelectedPolicyMetrics />
            </>
          )}

          {/* 9. Detail Row 1 (Cards 1-6) */}
          <DetailRow1 />

          {/* 10. Detail Row 2 (Cards 7-10) */}
          <DetailRow2
            escalationRules={escalationRules}
            onRunSimulation={() => setIsSimulationModalOpen(true)}
          />

          {/* 11. Detail Row 3 (Cards 11-15) */}
          <DetailRow3 exceptions={exceptions} conflicts={conflicts} />

          {/* 12. Detail Row 4 (Cards 16-20) */}
          <DetailRow4
            versions={versions}
            onNewVersion={() => toast('Creating new policy draft version (v7)...')}
            onCompareVersions={() => toast('Comparing v6 vs v5 diff...')}
            onCloneVersion={() => toast.success('Version v6 cloned successfully.')}
            onRollbackProposal={() => toast('Rollback proposal initiated for Governance review.')}
          />
        </div>

        {/* Right Operations Rail Column */}
        <div className="shrink-0 w-full">
          <RightOperationsRail
            onCreateSlaPolicy={() => setIsSlaModalOpen(true)}
            onCreateRoutingRule={() => setIsRoutingModalOpen(true)}
            onCreateEscalationRule={() => setIsRoutingModalOpen(true)}
            onRunSimulation={() => setIsSimulationModalOpen(true)}
            onReviewConflicts={() => toast('Reviewing 4 routing conflicts...')}
            onReviewCoverageGaps={() => toast('Reviewing 3 coverage gaps...')}
            onReviewApprovalQueue={() => toast('Opening approval queue modal...')}
            onOpenPolicyAudit={() => toast('Opening immutable policy audit log...')}
          />
        </div>
      </div>

      {/* Interactive Action Modals */}
      <CreateSlaPolicyModal isOpen={isSlaModalOpen} onClose={() => setIsSlaModalOpen(false)} />
      <CreateRoutingRuleModal isOpen={isRoutingModalOpen} onClose={() => setIsRoutingModalOpen(false)} />
      <SimulateRoutingModal isOpen={isSimulationModalOpen} onClose={() => setIsSimulationModalOpen(false)} />
    </div>
  );
}
