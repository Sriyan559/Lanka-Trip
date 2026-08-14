'use client';

import React from 'react';
import { SecurityFullData, AuthenticationPolicyRecord } from '@/lib/administration/security-authentication/security-authentication.types';
import { SecurityOverviewTab } from './SecurityOverviewTab';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';

interface SecurityTabContentProps {
  activeTab: string;
  data: SecurityFullData;
  selectedPolicyItem: AuthenticationPolicyRecord;
  onSelectPolicyItem: (item: AuthenticationPolicyRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function SecurityTabContent({
  activeTab,
  data,
  selectedPolicyItem,
  onSelectPolicyItem,
  onNavigateTab,
}: SecurityTabContentProps) {
  const {
    policies,
    providers,
    ssoDomains,
    mfaMethods,
    stepUpPolicies,
    sessionPolicies,
    highRiskSessions,
    deviceTrustRules,
    recentActivity,
  } = data;

  switch (activeTab) {
    case 'overview':
      return (
        <SecurityOverviewTab
          data={data}
          selectedPolicyItem={selectedPolicyItem}
          onSelectPolicyItem={onSelectPolicyItem}
          onNavigateTab={onNavigateTab}
        />
      );

    case 'providers':
      return (
        <SectionCard title="Authentication Providers">
          <DataTable
            columns={[
              { key: 'provider', header: 'Provider', cell: (r) => <span className="font-bold text-gray-900">{r.provider}</span> },
              { key: 'protocol', header: 'Protocol', cell: (r) => <span className="font-mono">{r.protocol}</span> },
              { key: 'users', header: 'Users', align: 'center' },
              { key: 'mfaCoverage', header: 'MFA Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.mfaCoverage}%</span> },
              { key: 'mfaStatus', header: 'MFA Status' },
              { key: 'avgLatency', header: 'Avg. Latency', align: 'right' },
              { key: 'errorRate', header: 'Error Rate', align: 'right' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'connectivity', header: 'Connectivity', cell: (r) => <StatusBadge status={r.connectivity} size="xs" /> },
            ]}
            data={providers}
            density="compact"
          />
        </SectionCard>
      );

    case 'sso':
      return (
        <SectionCard title="SSO Domain Mapping">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-mono font-bold text-gray-900">{r.domain}</span> },
              { key: 'users', header: 'Users', align: 'center' },
              { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={ssoDomains}
            density="compact"
          />
        </SectionCard>
      );

    case 'mfa':
      return (
        <SectionCard title="MFA Methods">
          <DataTable
            columns={[
              { key: 'method', header: 'Method', cell: (r) => <span className="font-bold text-gray-900">{r.method}</span> },
              { key: 'users', header: 'Users', align: 'center' },
              { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={mfaMethods}
            density="compact"
          />
        </SectionCard>
      );

    case 'step-up':
      return (
        <SectionCard title="Step-Up Policies">
          <DataTable
            columns={[
              { key: 'trigger', header: 'Trigger', cell: (r) => <span className="font-bold text-gray-900">{r.trigger}</span> },
              { key: 'usersImpacted', header: 'Users Impacted', align: 'center' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={stepUpPolicies}
            density="compact"
          />
        </SectionCard>
      );

    case 'session-policies':
    case 'active-sessions':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Session Policies">
            <DataTable
              columns={[
                { key: 'policy', header: 'Policy', cell: (r) => <span className="font-bold text-gray-900">{r.policy}</span> },
                { key: 'usersImpacted', header: 'Users Impacted', align: 'center' },
                { key: 'status', header: 'Status' },
              ]}
              data={sessionPolicies}
              density="compact"
            />
          </SectionCard>

          <SectionCard title="High-Risk Sessions">
            <DataTable
              columns={[
                { key: 'session', header: 'Session', cell: (r) => <span className="font-bold text-gray-900">{r.session}</span> },
                { key: 'riskReason', header: 'Risk Reason' },
                { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.count}</span> },
              ]}
              data={highRiskSessions}
              density="compact"
            />
          </SectionCard>
        </div>
      );

    case 'device-trust':
      return (
        <SectionCard title="Device Trust Rules">
          <DataTable
            columns={[
              { key: 'rule', header: 'Rule', cell: (r) => <span className="font-bold text-gray-900">{r.rule}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={deviceTrustRules}
            density="compact"
          />
        </SectionCard>
      );

    case 'activity':
    case 'audit-history':
      return (
        <SectionCard title="Recent Security Activity">
          <DataTable
            columns={[
              { key: 'dateTime', header: 'Date / Time', cell: (r) => <span className="text-[9px] text-gray-500">{r.dateTime}</span> },
              { key: 'event', header: 'Event', cell: (r) => <span className="font-bold text-gray-900">{r.event}</span> },
              { key: 'actor', header: 'Actor' },
              { key: 'details', header: 'Details' },
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
export default SecurityTabContent;
