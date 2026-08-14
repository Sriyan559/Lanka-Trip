'use client';

import React from 'react';
import { DataGovernanceFullData, DataAssetRecord } from '@/lib/administration/data-governance/data-governance.types';
import { DataGovernanceOverviewTab } from './DataGovernanceOverviewTab';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';

interface DataGovernanceTabContentProps {
  activeTab: string;
  data: DataGovernanceFullData;
  selectedAssetItem: DataAssetRecord;
  onSelectAssetItem: (item: DataAssetRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function DataGovernanceTabContent({
  activeTab,
  data,
  selectedAssetItem,
  onSelectAssetItem,
  onNavigateTab,
}: DataGovernanceTabContentProps) {
  const {
    dataAssets,
    domainPortfolio,
    retentionPolicies,
    retentionSchedule,
    retentionBreaches,
    privacyControls,
    residencyLocations,
    sharingControls,
    governanceReviews,
    recentActivity,
  } = data;

  switch (activeTab) {
    case 'overview':
      return (
        <DataGovernanceOverviewTab
          data={data}
          selectedAssetItem={selectedAssetItem}
          onSelectAssetItem={onSelectAssetItem}
          onNavigateTab={onNavigateTab}
        />
      );

    case 'data-assets':
      return (
        <SectionCard title="Enterprise Data Asset Registry">
          <DataTable
            columns={[
              { key: 'assetName', header: 'Asset Name', cell: (r) => <span className="font-bold text-gray-900">{r.assetName}</span> },
              { key: 'assetRef', header: 'Asset Ref', cell: (r) => <span className="font-mono text-gray-500">{r.assetRef}</span> },
              { key: 'dataDomain', header: 'Domain' },
              { key: 'businessUnit', header: 'Business Unit' },
              { key: 'classification', header: 'Classification', cell: (r) => <StatusBadge status={r.classification} size="xs" /> },
              { key: 'sensitivity', header: 'Sensitivity' },
              { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
              { key: 'owner', header: 'Owner' },
              { key: 'retentionPolicy', header: 'Retention Policy' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={dataAssets}
            density="compact"
          />
        </SectionCard>
      );

    case 'data-domains':
      return (
        <SectionCard title="Data Domain Portfolio">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
              { key: 'count', header: 'Count', align: 'center' },
              { key: 'percentage', header: '% of Total', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.percentage}</span> },
            ]}
            data={domainPortfolio}
            density="compact"
          />
        </SectionCard>
      );

    case 'retention-policies':
      return (
        <SectionCard title="Retention Policies">
          <DataTable
            columns={[
              { key: 'policyRef', header: 'Policy Ref', cell: (r) => <span className="font-mono text-gray-500">{r.policyRef}</span> },
              { key: 'policyName', header: 'Policy Name', cell: (r) => <span className="font-bold text-gray-900">{r.policyName}</span> },
              { key: 'assets', header: 'Assets', align: 'center' },
              { key: 'retention', header: 'Retention', align: 'right', cell: (r) => <span className="font-bold text-gray-900">{r.retention}</span> },
            ]}
            data={retentionPolicies}
            density="compact"
          />
        </SectionCard>
      );

    case 'retention-schedule':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Retention Schedule">
            <DataTable
              columns={[
                { key: 'policyRef', header: 'Policy Ref', cell: (r) => <span className="font-mono">{r.policyRef}</span> },
                { key: 'asset', header: 'Asset', cell: (r) => <span className="font-bold text-gray-900">{r.asset}</span> },
                { key: 'retentionDue', header: 'Retention Due' },
                { key: 'action', header: 'Action', cell: (r) => <StatusBadge status={r.action} size="xs" /> },
              ]}
              data={retentionSchedule}
              density="compact"
            />
          </SectionCard>

          <SectionCard title="Retention Breaches">
            <DataTable
              columns={[
                { key: 'asset', header: 'Asset', cell: (r) => <span className="font-bold text-gray-900">{r.asset}</span> },
                { key: 'breachType', header: 'Breach Type' },
                { key: 'daysOverdue', header: 'Days Overdue', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.daysOverdue}</span> },
                { key: 'severity', header: 'Severity', cell: (r) => <StatusBadge status={r.severity} size="xs" /> },
              ]}
              data={retentionBreaches}
              density="compact"
            />
          </SectionCard>
        </div>
      );

    case 'privacy-controls':
      return (
        <SectionCard title="Privacy Controls">
          <DataTable
            columns={[
              { key: 'control', header: 'Control', cell: (r) => <span className="font-bold text-gray-900">{r.control}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={privacyControls}
            density="compact"
          />
        </SectionCard>
      );

    case 'residency':
      return (
        <SectionCard title="Residency & Location">
          <DataTable
            columns={[
              { key: 'location', header: 'Location', cell: (r) => <span className="font-bold text-gray-900">{r.location}</span> },
              { key: 'assets', header: 'Assets', align: 'center' },
              { key: 'percentage', header: '% Total', align: 'right' },
              { key: 'residencyStatus', header: 'Status', cell: (r) => <StatusBadge status={r.residencyStatus} size="xs" /> },
            ]}
            data={residencyLocations}
            density="compact"
          />
        </SectionCard>
      );

    case 'data-sharing':
      return (
        <SectionCard title="Sharing Controls Matrix">
          <DataTable
            columns={[
              { key: 'sharingType', header: 'Sharing Type', cell: (r) => <span className="font-bold text-gray-900">{r.sharingType}</span> },
              { key: 'agreements', header: 'Agreements', align: 'center' },
              { key: 'compliance', header: 'Compliant', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.compliance}</span> },
              { key: 'exceptions', header: 'Exceptions', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.exceptions}</span> },
            ]}
            data={sharingControls}
            density="compact"
          />
        </SectionCard>
      );

    case 'reviews':
      return (
        <SectionCard title="Data Governance Reviews">
          <DataTable
            columns={[
              { key: 'reviewType', header: 'Review Type', cell: (r) => <span className="font-bold text-gray-900">{r.reviewType}</span> },
              { key: 'due', header: 'Due', align: 'center' },
              { key: 'overdue', header: 'Overdue', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.overdue}</span> },
              { key: 'completed', header: 'Completed', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.completed}</span> },
            ]}
            data={governanceReviews}
            density="compact"
          />
        </SectionCard>
      );

    case 'activity':
    case 'audit-history':
      return (
        <SectionCard title="Recent Data Governance Activity">
          <DataTable
            columns={[
              { key: 'time', header: 'Time', cell: (r) => <span className="text-[9px] text-gray-500">{r.time}</span> },
              { key: 'activity', header: 'Activity', cell: (r) => <span className="font-bold text-gray-900">{r.activity}</span> },
              { key: 'assetDomain', header: 'Asset / Domain', cell: (r) => <span className="font-mono">{r.assetDomain}</span> },
              { key: 'performedBy', header: 'Performed By' },
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
export default DataGovernanceTabContent;
