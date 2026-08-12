"use client";

import React, { useState } from "react";
import { SelectedGovernanceRecord } from "@/data/marketingGovernance.mock";

import { SelectedGovernanceHeader } from "./SelectedGovernanceHeader";
import { GovernanceDetailTabs } from "./GovernanceDetailTabs";
import { GovernanceDetailsCard } from "./GovernanceDetailsCard";
import { PolicyEvaluationCard } from "./PolicyEvaluationCard";
import { ConsentEligibilityCard } from "./ConsentEligibilityCard";
import { ContactFrequencyControls } from "./ContactFrequencyControls";
import { ContactCollisionAnalysis } from "./ContactCollisionAnalysis";
import { PendingMarketingApprovals } from "./PendingMarketingApprovals";
import { ChannelGovernanceCard } from "./ChannelGovernanceCard";
import { ContentRightsCard } from "./ContentRightsCard";
import { EvidenceAuditSnapshots } from "./EvidenceAuditSnapshots";
import { DataUseGovernanceCard } from "./DataUseGovernanceCard";
import { MarketingApprovalWorkflow } from "./MarketingApprovalWorkflow";
import { GovernanceAuditTrail } from "./GovernanceAuditTrail";
import { GovernanceHealthLog } from "./GovernanceHealthLog";
import { EscalationRulesCard } from "./EscalationRulesCard";

interface SelectedGovernanceWorkspaceProps {
  record: SelectedGovernanceRecord | null;
}

export function SelectedGovernanceWorkspace({ record }: SelectedGovernanceWorkspaceProps) {
  const [activeDetailTab, setActiveDetailTab] = useState("overview");

  if (!record) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-xl p-6 text-center text-xs text-gray-500 shadow-2xs">
        <p className="font-bold text-gray-700">Select a governance record to view:</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-gray-500">
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">policy evaluation</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">consent eligibility</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">frequency controls</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">rights status</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">approval workflow</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">evidence</span>
          <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">exceptions</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 1. SELECTED RECORD HEADER */}
      <SelectedGovernanceHeader record={record} />

      {/* 2. INNER DETAIL TABS */}
      <GovernanceDetailTabs activeTab={activeDetailTab} onTabChange={setActiveDetailTab} />

      {/* 3. DETAIL CARDS GRID */}
      <div className="flex flex-col gap-3">
        {/* ROW 1: Governance Details, Policy Evaluation, Consent & Eligibility, Contact Frequency Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          <GovernanceDetailsCard record={record} />
          <PolicyEvaluationCard evaluations={record.policyEvaluations} />
          <ConsentEligibilityCard eligibilityItems={record.consentEligibility} />
          <ContactFrequencyControls frequency={record.frequencyControls} />
        </div>

        {/* ROW 2: Contact Collision Analysis (1/3 width), Pending Marketing Approvals (2/3 width) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <ContactCollisionAnalysis collisions={record.collisionAnalysis} />
          <div className="md:col-span-2">
            <PendingMarketingApprovals pendingApprovals={record.pendingApprovals} />
          </div>
        </div>

        {/* ROW 3: Channel Governance, Content & Rights, Evidence & Audit Snapshots, Data Use Governance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          <ChannelGovernanceCard channels={record.channelGovernance} />
          <ContentRightsCard rightsItems={record.contentRights} />
          <EvidenceAuditSnapshots evidenceSnapshots={record.evidenceSnapshots} />
          <DataUseGovernanceCard dataUse={record.dataUseGovernance} />
        </div>

        {/* ROW 4: Marketing Approval Workflow */}
        <MarketingApprovalWorkflow workflowSteps={record.approvalWorkflow} />

        {/* ROW 5: Governance Audit Trail (2/3 width), Governance Health Log (1/3 width) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          <div className="md:col-span-2">
            <GovernanceAuditTrail auditTrail={record.auditTrail} />
          </div>
          <GovernanceHealthLog healthLog={record.healthLog} />
        </div>

        {/* ROW 6: Escalation Rules Card */}
        <EscalationRulesCard activeRulesCount={record.activeEscalationRules} />
      </div>
    </div>
  );
}
