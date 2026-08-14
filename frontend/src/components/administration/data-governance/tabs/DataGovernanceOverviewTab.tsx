'use client';

import React from 'react';
import { DataGovernanceFullData, DataAssetRecord } from '@/lib/administration/data-governance/data-governance.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { SelectedDataAssetPanel } from '../SelectedDataAssetPanel';
import { ChevronRight } from 'lucide-react';

interface DataGovernanceOverviewTabProps {
  data: DataGovernanceFullData;
  selectedAssetItem: DataAssetRecord;
  onSelectAssetItem: (item: DataAssetRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function DataGovernanceOverviewTab({
  data,
  selectedAssetItem,
  onSelectAssetItem,
  onNavigateTab,
}: DataGovernanceOverviewTabProps) {
  const {
    dataAssets,
    selectedAsset,
    classificationMatrix,
    domainPortfolio,
    ownershipStewardship,
    dataPurposes,
    retentionPolicies,
    retentionSchedule,
    retentionBreaches,
    archivalPortfolio,
    disposalQueue,
    governanceHolds,
    privacyControls,
    personalDataAssets,
    minimizationReview,
    residencyLocations,
    sharingControls,
    sourceEndpoints,
    accessGovernance,
    governanceReviews,
    recentActivity,
    governanceGates,
    charts,
  } = data;

  const assetColumns: ColumnDef<DataAssetRecord>[] = [
    {
      key: 'assetName',
      header: 'Asset Ref / Asset Name',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectAssetItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left block truncate"
        >
          {r.assetName}
        </button>
      ),
    },
    { key: 'dataDomain', header: 'Data Domain' },
    { key: 'businessUnit', header: 'Bus. Unit' },
    { key: 'classification', header: 'Classification', cell: (r) => <StatusBadge status={r.classification} size="xs" /> },
    { key: 'sensitivity', header: 'Sensitivity', cell: (r) => <span className="font-semibold">{r.sensitivity}</span> },
    { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
    { key: 'owner', header: 'Owner' },
    { key: 'dataOwner', header: 'Data Owner' },
    { key: 'steward', header: 'Steward' },
    { key: 'retentionPolicy', header: 'Retention Policy', cell: (r) => <span className="font-mono text-[9px]">{r.retentionPolicy}</span> },
    { key: 'retention', header: 'Retention', align: 'center' },
    { key: 'residency', header: 'Residency' },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================================= */}
      {/* ROW 1: Enterprise Data Asset Registry, Selected Data Asset */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8 min-w-0">
          <SectionCard
            title="Enterprise Data Asset Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('data-assets')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all data assets</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={assetColumns} data={dataAssets} density="compact" />
          </SectionCard>
        </div>

        <div className="lg:col-span-4 min-w-0">
          <SelectedDataAssetPanel
            asset={selectedAsset}
            onReviewClassification={() => onNavigateTab('classification')}
            onReviewRetention={() => onNavigateTab('retention-policies')}
            onReviewOwnership={() => onNavigateTab('ownership')}
            onReviewDataQuality={() => onNavigateTab('data-quality')}
            onViewAssetLineage={() => onNavigateTab('lineage')}
            onViewAuditHistory={() => onNavigateTab('audit-history')}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Classification Matrix, Domain Portfolio, Ownership & Stewardship, Purpose, Retention Policies */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <SectionCard title="Data Classification Matrix">
          <DataTable
            columns={[
              { key: 'classification', header: 'Classification', cell: (r) => <span className="font-bold text-gray-900">{r.classification}</span> },
              { key: 'p', header: 'P', align: 'center', cell: (r) => <span className="font-semibold">{r.p}</span> },
              { key: 'c', header: 'C', align: 'center', cell: (r) => <span className="font-semibold">{r.c}</span> },
              { key: 'r', header: 'R', align: 'center', cell: (r) => <span className="font-semibold">{r.r}</span> },
              { key: 'total', header: 'Total', align: 'right', cell: (r) => <span className="font-bold text-gray-900">{r.total}</span> },
            ]}
            data={classificationMatrix}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Data Domain Portfolio">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-semibold">{r.count}</span> },
              { key: 'percentage', header: '% of Total', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.percentage}</span> },
            ]}
            data={domainPortfolio}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Ownership & Stewardship Registry">
          <DataTable
            columns={[
              { key: 'role', header: 'Role', cell: (r) => <span className="font-bold text-gray-900">{r.role}</span> },
              { key: 'assigned', header: 'Assigned', align: 'center', cell: (r) => <span className="font-semibold">{r.assigned}</span> },
              { key: 'coverage', header: '% Coverage', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
            ]}
            data={ownershipStewardship}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Data Purpose Registry & Limitation">
          <DataTable
            columns={[
              { key: 'purposeCategory', header: 'Purpose Category', cell: (r) => <span className="font-bold text-gray-900">{r.purposeCategory}</span> },
              { key: 'assets', header: 'Assets', align: 'center', cell: (r) => <span className="font-semibold">{r.assets}</span> },
              { key: 'compliance', header: 'Compliance', cell: (r) => <StatusBadge status={r.compliance} size="xs" /> },
            ]}
            data={dataPurposes}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Retention Policies">
          <DataTable
            columns={[
              { key: 'policyRef', header: 'Policy Ref', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.policyRef}</span> },
              { key: 'policyName', header: 'Policy Name', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.policyName}</span> },
              { key: 'assets', header: 'Assets', align: 'center', cell: (r) => <span className="font-semibold">{r.assets}</span> },
              { key: 'retention', header: 'Retention', align: 'right', cell: (r) => <span className="font-bold text-gray-900">{r.retention}</span> },
            ]}
            data={retentionPolicies}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 3: Retention Schedule, Retention Breaches, Archival Portfolio, Disposal Queue, Governance Holds */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <SectionCard title="Retention Schedule (Next 30 Days)">
          <DataTable
            columns={[
              { key: 'policyRef', header: 'Policy Ref', cell: (r) => <span className="font-mono text-gray-500 text-[9px]">{r.policyRef}</span> },
              { key: 'asset', header: 'Asset', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.asset}</span> },
              { key: 'retentionDue', header: 'Retention Due', cell: (r) => <span className="text-[9px] text-gray-500">{r.retentionDue}</span> },
              { key: 'action', header: 'Action', cell: (r) => <StatusBadge status={r.action} size="xs" /> },
            ]}
            data={retentionSchedule}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Retention Breaches (4)">
          <DataTable
            columns={[
              { key: 'asset', header: 'Asset', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.asset}</span> },
              { key: 'breachType', header: 'Breach Type' },
              { key: 'daysOverdue', header: 'Days Overdue', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.daysOverdue}</span> },
              { key: 'severity', header: 'Severity', cell: (r) => <StatusBadge status={r.severity} size="xs" /> },
            ]}
            data={retentionBreaches}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Archival Portfolio">
          <DataTable
            columns={[
              { key: 'archiveType', header: 'Archive Type', cell: (r) => <span className="font-bold text-gray-900">{r.archiveType}</span> },
              { key: 'assets', header: 'Assets', align: 'center', cell: (r) => <span className="font-semibold">{r.assets}</span> },
              { key: 'size', header: 'Size', align: 'right', cell: (r) => <span className="font-bold text-gray-900">{r.size}</span> },
              { key: 'lastArchived', header: 'Last Archived', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastArchived}</span> },
            ]}
            data={archivalPortfolio}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Data Disposal Queue">
          <DataTable
            columns={[
              { key: 'asset', header: 'Asset', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.asset}</span> },
              { key: 'disposalType', header: 'Disposal Type' },
              { key: 'scheduledDate', header: 'Scheduled Date', cell: (r) => <span className="text-[9px] text-gray-500">{r.scheduledDate}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={disposalQueue}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Governance Holds">
          <DataTable
            columns={[
              { key: 'holdType', header: 'Hold Type', cell: (r) => <span className="font-bold text-gray-900">{r.holdType}</span> },
              { key: 'assets', header: 'Assets', align: 'center', cell: (r) => <span className="font-bold text-blue-700">{r.assets}</span> },
              { key: 'reason', header: 'Reason' },
              { key: 'expiryOn', header: 'Expires On', cell: (r) => <span className="text-[9px] text-gray-500">{r.expiryOn}</span> },
            ]}
            data={governanceHolds}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 4: Privacy Controls, Personal Data Assets, Minimization, Residency, Sharing, Endpoints, Access Governance, Reviews */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3">
        <SectionCard title="Privacy Controls">
          <DataTable
            columns={[
              { key: 'control', header: 'Control', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.control}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={privacyControls}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Personal Data Assets">
          <DataTable
            columns={[
              { key: 'category', header: 'Category', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.category}</span> },
              { key: 'assets', header: 'Assets', align: 'center', cell: (r) => <span className="font-semibold">{r.assets}</span> },
              { key: 'percentage', header: '% of Total', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.percentage}</span> },
            ]}
            data={personalDataAssets}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Data Minimization Review">
          <DataTable
            columns={[
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'assets', header: 'Assets', align: 'center', cell: (r) => <span className="font-semibold">{r.assets}</span> },
              { key: 'percentage', header: '% of Total', align: 'right', cell: (r) => <span className="font-bold text-gray-800">{r.percentage}</span> },
            ]}
            data={minimizationReview}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Residency & Location">
          <DataTable
            columns={[
              { key: 'location', header: 'Location', cell: (r) => <span className="font-bold text-gray-900">{r.location}</span> },
              { key: 'assets', header: 'Assets', align: 'center', cell: (r) => <span className="font-semibold">{r.assets}</span> },
              { key: 'percentage', header: '% Total', align: 'right' },
              { key: 'residencyStatus', header: 'Status', cell: (r) => <StatusBadge status={r.residencyStatus} size="xs" /> },
            ]}
            data={residencyLocations}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Sharing Controls Matrix">
          <DataTable
            columns={[
              { key: 'sharingType', header: 'Sharing Type', cell: (r) => <span className="font-bold text-gray-900">{r.sharingType}</span> },
              { key: 'agreements', header: 'Agreements', align: 'center', cell: (r) => <span className="font-semibold">{r.agreements}</span> },
              { key: 'compliance', header: 'Compliant', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.compliance}</span> },
              { key: 'exceptions', header: 'Exceptions', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.exceptions}</span> },
            ]}
            data={sharingControls}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Source Data Endpoints">
          <DataTable
            columns={[
              { key: 'source', header: 'Source', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.source}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={sourceEndpoints}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Data Access Governance (Summary)">
          <DataTable
            columns={[
              { key: 'controlArea', header: 'Control Area', cell: (r) => <span className="font-bold text-gray-900">{r.controlArea}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'coverage', header: 'Coverage', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
            ]}
            data={accessGovernance}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="Data Governance Reviews">
          <DataTable
            columns={[
              { key: 'reviewType', header: 'Review Type', cell: (r) => <span className="font-bold text-gray-900">{r.reviewType}</span> },
              { key: 'due', header: 'Due', align: 'center', cell: (r) => <span className="font-semibold">{r.due}</span> },
              { key: 'overdue', header: 'Overdue', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.overdue}</span> },
              { key: 'completed', header: 'Completed', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.completed}</span> },
            ]}
            data={governanceReviews}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 5: Trends, Activity, Donut Charts, Governance Gates */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3">
        <SectionCard title="Retention & Disposal Trend — Last 30 Days">
          <ResponsiveLineChart
            data={charts.retentionDisposalTrend}
            xAxisKey="label"
            series={[
              { key: 'Retention Due', label: 'Retention Due', color: '#f59e0b' },
              { key: 'Archived', label: 'Archived', color: '#3b82f6' },
              { key: 'Disposed', label: 'Disposed', color: '#10b981' },
            ]}
            height={130}
          />
        </SectionCard>

        <SectionCard title="Data Governance Health Trend — Last 30 Days">
          <ResponsiveLineChart
            data={charts.healthTrend}
            xAxisKey="label"
            series={[
              { key: 'Health Score', label: 'Health Score', color: '#10b981' },
            ]}
            height={130}
          />
        </SectionCard>

        <SectionCard title="Data Risk Trend — Last 30 Days">
          <ResponsiveLineChart
            data={charts.riskTrend}
            xAxisKey="label"
            series={[
              { key: 'High Risk', label: 'High Risk', color: '#f43f5e' },
              { key: 'Medium Risk', label: 'Medium Risk', color: '#f59e0b' },
              { key: 'Low Risk', label: 'Low Risk', color: '#10b981' },
            ]}
            height={130}
          />
        </SectionCard>

        <SectionCard title="Recent Data Governance Activity">
          <DataTable
            columns={[
              { key: 'time', header: 'Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.time}</span> },
              { key: 'activity', header: 'Activity', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.activity}</span> },
              { key: 'assetDomain', header: 'Asset / Domain', cell: (r) => <span className="font-mono text-[9px]">{r.assetDomain}</span> },
              { key: 'performedBy', header: 'Performed By' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>

        <SectionCard title="AI & Analytics Data Use">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.aiAnalyticsDataUse}
              totalValue="28"
              totalLabel="Used"
              height={130}
            />
          </div>
        </SectionCard>

        <SectionCard title="Governance Exceptions">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.governanceExceptions}
              totalValue="7"
              totalLabel="Total"
              height={130}
            />
          </div>
        </SectionCard>

        <SectionCard title="Governance Risks">
          <div className="flex flex-col items-center justify-center p-2">
            <ReusableDonutChart
              data={charts.governanceRisks}
              totalValue="11"
              totalLabel="Total"
              height={130}
            />
          </div>
        </SectionCard>

        <SectionCard title="Governance Gates">
          <DataTable
            columns={[
              { key: 'gate', header: 'Gate', cell: (r) => <span className="font-bold text-gray-900 truncate block">{r.gate}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={governanceGates}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
export default DataGovernanceOverviewTab;
