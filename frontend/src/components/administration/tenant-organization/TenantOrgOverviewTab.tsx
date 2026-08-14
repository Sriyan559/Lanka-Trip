'use client';

import React from 'react';
import { TenantOrgFullData, TenantOrgRegistryItem } from '@/lib/administration/tenant-organization/tenant-organization.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { OrgHierarchyTree } from '@/components/shared/Hierarchy/OrgHierarchyTree';
import { OrgHealthHeatmap } from '@/components/shared/Chart/OrgHealthHeatmap';
import { CheckCircle2, ChevronRight, AlertTriangle, GitCommit, FileText } from 'lucide-react';

interface TenantOrgOverviewTabProps {
  data: TenantOrgFullData;
  selectedTenantItem: TenantOrgRegistryItem;
  onSelectRegistryItem: (item: TenantOrgRegistryItem) => void;
  onNavigateTab: (tabId: string) => void;
}

export function TenantOrgOverviewTab({
  data,
  selectedTenantItem,
  onSelectRegistryItem,
  onNavigateTab,
}: TenantOrgOverviewTabProps) {
  const {
    registry,
    selectedTenant,
    hierarchyRoot,
    relationships,
    integrity,
    tenantPortfolio,
    ecosystemPortfolio,
    legalEntities,
    operatingEntities,
    scopeInheritance,
    ownershipRecords,
    ownershipCoverage,
    lifecycleMatrix,
    pendingChanges,
    structureReviews,
    exceptions,
    risks,
    governanceGates,
    healthMatrix,
    recentActivity,
  } = data;

  // 1. Main Registry Columns
  const registryColumns: ColumnDef<TenantOrgRegistryItem>[] = [
    {
      key: 'name',
      header: 'Tenant / Ecosystem / Org',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectRegistryItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left"
        >
          {r.name}
        </button>
      ),
    },
    { key: 'type', header: 'Type', cell: (r) => <span className="font-semibold text-gray-700">{r.type}</span> },
    { key: 'keyRef', header: 'Key / Reference', cell: (r) => <span className="font-mono text-[9px] text-gray-500">{r.keyRef}</span> },
    { key: 'ecosystem', header: 'Ecosystem' },
    { key: 'region', header: 'Region' },
    { key: 'country', header: 'Country' },
    { key: 'legalEntity', header: 'Legal Entity', cell: (r) => <span className="font-mono text-[9px] text-gray-600">{r.legalEntity}</span> },
    { key: 'operatingEntity', header: 'Operating Entity', cell: (r) => <span className="font-mono text-[9px] text-gray-600">{r.operatingEntity}</span> },
    { key: 'parentOrg', header: 'Parent Org' },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
    { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
    { key: 'risk', header: 'Risk', align: 'center', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
    { key: 'lastUpdated', header: 'Last Updated', cell: (r) => <span className="text-[9px] text-gray-400 whitespace-nowrap">{r.lastUpdated}</span> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================================= */}
      {/* ROW 1: Registry Table, Selected Tenant Panel, Organizational Hierarchy Topology */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Registry Table (6 of 12) */}
        <div className="lg:col-span-6 min-w-0">
          <SectionCard
            title="Tenant, Ecosystem & Organization Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('tenants')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all registry</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={registryColumns} data={registry} density="compact" />
          </SectionCard>
        </div>

        {/* Selected Tenant Panel (3 of 12) */}
        <div className="lg:col-span-3 min-w-0">
          <SectionCard title={`Selected Tenant — ${selectedTenantItem.name || 'SL Beauty'}`}>
            <div className="flex flex-col justify-between h-full text-[10px]">
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Tenant Reference</span>
                  <span className="font-bold text-gray-900">{selectedTenant.tenantRef}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Status</span>
                  <StatusBadge status="Active" size="xs" />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Ecosystem Key</span>
                  <span className="font-mono text-gray-700">{selectedTenant.ecosystemKey}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Environment</span>
                  <span className="font-semibold text-gray-800">{selectedTenant.environment}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Organization Key</span>
                  <span className="font-mono text-gray-700">{selectedTenant.organizationKey}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Production</span>
                  <span className="font-semibold text-emerald-700">Enforced</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Public Reference</span>
                  <span className="font-semibold text-gray-800">{selectedTenant.publicRef}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Legal Entity Count</span>
                  <span className="font-bold text-gray-900">{selectedTenant.legalEntityCount}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Operating Entity Count</span>
                  <span className="font-bold text-gray-900">{selectedTenant.operatingEntityCount}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Administrative Scope</span>
                  <span className="font-semibold text-gray-800">{selectedTenant.adminScope}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Region / Country</span>
                  <span className="font-semibold text-gray-800">{selectedTenant.regionCountry}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Health Score</span>
                  <span className="font-extrabold text-emerald-700 text-xs">97/100</span>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-3 pt-2 border-t border-gray-150 flex items-center justify-between gap-1 flex-wrap text-[9px]">
                <button type="button" onClick={() => onNavigateTab('hierarchy')} className="text-[#741d35] font-bold hover:underline">Review Structure</button>
                <button type="button" onClick={() => onNavigateTab('ownership')} className="text-[#741d35] font-bold hover:underline">Review Ownership</button>
                <button type="button" onClick={() => onNavigateTab('scope-inheritance')} className="text-[#741d35] font-bold hover:underline">Review Scope Inheritance</button>
                <button type="button" onClick={() => onNavigateTab('tenants')} className="text-[#741d35] font-bold hover:underline">Compare Tenant</button>
                <button type="button" onClick={() => onNavigateTab('audit-history')} className="text-[#741d35] font-bold hover:underline">View Audit History</button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Organizational Hierarchy Topology (3 of 12) */}
        <div className="lg:col-span-3 min-w-0">
          <SectionCard
            title="Organizational Hierarchy Topology"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('hierarchy')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>Full Topology</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <OrgHierarchyTree root={hierarchyRoot} />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Hierarchy Relationships, Integrity, Portfolios, Scope Inheritance */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-3">
        {/* Hierarchy Relationships (Pre-Change) */}
        <SectionCard title="Hierarchy Relationships (Pre-Change)">
          <DataTable
            columns={[
              { key: 'relationshipType', header: 'Relationship Type', cell: (r) => <span className="font-bold text-gray-900">{r.relationshipType}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.count}</span> },
              { key: 'valid', header: 'Valid', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.valid}</span> },
              { key: 'conflicts', header: 'Conflicts', align: 'center', cell: (r) => <span className="text-rose-700 font-bold">{r.conflicts}</span> },
              { key: 'orphaned', header: 'Orphaned', align: 'center', cell: (r) => <span className="text-amber-700 font-bold">{r.orphaned}</span> },
              { key: 'total', header: 'Total', align: 'center', cell: (r) => <span className="font-extrabold text-gray-900">{r.total}</span> },
            ]}
            data={relationships}
            density="compact"
          />
        </SectionCard>

        {/* Hierarchy Integrity */}
        <SectionCard title="Hierarchy Integrity">
          <div className="grid grid-cols-2 gap-2 text-center p-1">
            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded">
              <span className="text-xl font-extrabold text-emerald-800 block leading-none">{integrity.valid}</span>
              <span className="text-[9px] font-bold text-emerald-900 uppercase">Valid Relationships</span>
              <span className="block text-[8px] font-medium text-emerald-700 mt-0.5">+2 vs last 30d</span>
            </div>
            <div className="p-2 bg-rose-50 border border-rose-200 rounded">
              <span className="text-xl font-extrabold text-rose-800 block leading-none">{integrity.conflicts}</span>
              <span className="text-[9px] font-bold text-rose-900 uppercase">Conflicts</span>
              <span className="block text-[8px] font-medium text-rose-700 mt-0.5">+1 vs last 30d</span>
            </div>
            <div className="p-2 bg-amber-50 border border-amber-200 rounded">
              <span className="text-xl font-extrabold text-amber-800 block leading-none">{integrity.orphaned}</span>
              <span className="text-[9px] font-bold text-amber-900 uppercase">Orphaned Nodes</span>
              <span className="block text-[8px] font-medium text-amber-700 mt-0.5">0 vs last 30d</span>
            </div>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded">
              <span className="text-xl font-extrabold text-gray-800 block leading-none">{integrity.circular}</span>
              <span className="text-[9px] font-bold text-gray-700 uppercase">Circular References</span>
              <span className="block text-[8px] font-medium text-gray-500 mt-0.5">0 vs last 30d</span>
            </div>
          </div>
        </SectionCard>

        {/* Tenant Portfolio */}
        <SectionCard title="Tenant Portfolio">
          <DataTable
            columns={[
              { key: 'name', header: 'Tenant', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
              { key: 'subCount1', header: 'Ecosystems', align: 'center', cell: (r) => <span className="font-semibold text-gray-700">{r.subCount1}</span> },
              { key: 'subCount2', header: 'Orgs', align: 'center', cell: (r) => <span className="font-semibold text-gray-700">{r.subCount2}</span> },
              { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
            ]}
            data={tenantPortfolio}
            density="compact"
          />
        </SectionCard>

        {/* Ecosystem Portfolio */}
        <SectionCard title="Ecosystem Portfolio">
          <DataTable
            columns={[
              { key: 'name', header: 'Ecosystem', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
              { key: 'subCount1', header: 'Orgs', align: 'center', cell: (r) => <span className="font-semibold text-gray-700">{r.subCount1}</span> },
              { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
            ]}
            data={ecosystemPortfolio}
            density="compact"
          />
        </SectionCard>

        {/* Legal Entities */}
        <SectionCard title="Legal Entities">
          <DataTable
            columns={[
              { key: 'key', header: 'Key', cell: (r) => <span className="font-mono text-[9px] text-gray-500">{r.key}</span> },
              { key: 'name', header: 'Entity', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
              { key: 'country', header: 'Country' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
            ]}
            data={legalEntities}
            density="compact"
          />
        </SectionCard>

        {/* Operating Entities */}
        <SectionCard title="Operating Entities">
          <DataTable
            columns={[
              { key: 'key', header: 'Key', cell: (r) => <span className="font-mono text-[9px] text-gray-500">{r.key}</span> },
              { key: 'name', header: 'Entity', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
              { key: 'country', header: 'Country' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
            ]}
            data={operatingEntities}
            density="compact"
          />
        </SectionCard>

        {/* Scope Inheritance Analysis Donut */}
        <SectionCard title="Scope Inheritance Analysis">
          <ReusableDonutChart
            data={[
              { name: 'Inherited', value: scopeInheritance.inherited, color: '#10b981' },
              { name: 'Direct', value: scopeInheritance.direct, color: '#2563eb' },
              { name: 'Overridden', value: scopeInheritance.overridden, color: '#f59e0b' },
            ]}
            totalValue={`${scopeInheritance.coverage}%`}
            totalLabel="Coverage"
            height={150}
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 3: Ownership, Coverage, Lifecycle Matrix, Pending Changes, Reviews */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        {/* Organizational Ownership */}
        <SectionCard title="Organizational Ownership">
          <DataTable
            columns={[
              { key: 'ownerType', header: 'Owner Type', cell: (r) => <span className="font-bold text-gray-900">{r.ownerType}</span> },
              { key: 'total', header: 'Total', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.total}</span> },
              { key: 'inherited', header: 'Inherited', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.inherited}</span> },
              { key: 'direct', header: 'Direct', align: 'center', cell: (r) => <span className="text-blue-700 font-semibold">{r.direct}</span> },
              { key: 'overridden', header: 'Overridden', align: 'center', cell: (r) => <span className="text-amber-700 font-semibold">{r.overridden}</span> },
              { key: 'unassigned', header: 'Unassigned', align: 'center', cell: (r) => <span className="text-rose-700 font-bold">{r.unassigned}</span> },
            ]}
            data={ownershipRecords}
            density="compact"
          />
        </SectionCard>

        {/* Ownership Coverage */}
        <SectionCard title="Ownership Coverage">
          <ReusableDonutChart
            data={[
              { name: 'Fully Owned', value: ownershipCoverage.fullyOwned, color: '#10b981' },
              { name: 'Partially Owned', value: ownershipCoverage.partiallyOwned, color: '#f59e0b' },
              { name: 'Unowned', value: ownershipCoverage.unowned, color: '#e11d48' },
            ]}
            totalValue={`${ownershipCoverage.coverage}%`}
            totalLabel="Coverage"
            height={150}
          />
        </SectionCard>

        {/* Structure Lifecycle Matrix */}
        <SectionCard title="Structure Lifecycle Matrix">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1">Lifecycle Stage</th>
                  <th className="pb-1 text-center">Tenants</th>
                  <th className="pb-1 text-center">Ecosystems</th>
                  <th className="pb-1 text-center">Organizations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {lifecycleMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-1 font-bold text-gray-900">{row.stage}</td>
                    <td className="py-1 text-center">{row.tenants}</td>
                    <td className="py-1 text-center">{row.ecosystems}</td>
                    <td className="py-1 text-center font-bold text-gray-900">{row.organizations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Pending Organizational Changes */}
        <SectionCard title="Pending Organizational Changes (Requires Approval)">
          <DataTable
            columns={[
              { key: 'changeType', header: 'Change Type', cell: (r) => <span className="font-bold text-gray-900">{r.changeType}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.count}</span> },
              { key: 'high', header: 'High', align: 'center', cell: (r) => <span className="text-rose-700 font-bold">{r.high}</span> },
              { key: 'medium', header: 'Medium', align: 'center', cell: (r) => <span className="text-amber-700 font-semibold">{r.medium}</span> },
              { key: 'low', header: 'Low', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.low}</span> },
            ]}
            data={pendingChanges}
            density="compact"
          />
        </SectionCard>

        {/* Structure Reviews (Next 30 Days) */}
        <SectionCard title="Structure Reviews (Next 30 Days)">
          <DataTable
            columns={[
              { key: 'reviewType', header: 'Review Type', cell: (r) => <span className="font-bold text-gray-900">{r.reviewType}</span> },
              { key: 'dueDate', header: 'Due Date', cell: (r) => <span className="text-gray-600 text-[9px]">{r.dueDate}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
            ]}
            data={structureReviews}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 4: Exceptions, Risks, Governance Gates, Health Heatmap, Recent Activity */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        {/* Organization Exceptions */}
        <SectionCard title="Organization Exceptions">
          <DataTable
            columns={[
              { key: 'exceptionType', header: 'Exception Type', cell: (r) => <span className="font-bold text-gray-900">{r.exceptionType}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.count}</span> },
              { key: 'critical', header: 'Critical', align: 'center', cell: (r) => <span className="text-rose-700 font-bold">{r.critical}</span> },
              { key: 'high', header: 'High', align: 'center', cell: (r) => <span className="text-amber-700 font-semibold">{r.high}</span> },
              { key: 'medium', header: 'Medium', align: 'center', cell: (r) => <span className="text-blue-700 font-semibold">{r.medium}</span> },
              { key: 'low', header: 'Low', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.low}</span> },
            ]}
            data={exceptions}
            density="compact"
          />
        </SectionCard>

        {/* Organization Risks */}
        <SectionCard title="Organization Risks">
          <DataTable
            columns={[
              { key: 'riskCategory', header: 'Risk Category', cell: (r) => <span className="font-bold text-gray-900">{r.riskCategory}</span> },
              { key: 'high', header: 'High', align: 'center', cell: (r) => <span className="text-rose-700 font-bold">{r.high}</span> },
              { key: 'medium', header: 'Medium', align: 'center', cell: (r) => <span className="text-amber-700 font-semibold">{r.medium}</span> },
              { key: 'low', header: 'Low', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.low}</span> },
              { key: 'total', header: 'Total', align: 'center', cell: (r) => <span className="font-extrabold text-gray-900">{r.total}</span> },
            ]}
            data={risks}
            density="compact"
          />
        </SectionCard>

        {/* Organization Governance Gates */}
        <SectionCard title="Organization Governance Gates">
          <div className="space-y-1.5 p-1 text-[10px]">
            {governanceGates.map((gate, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 bg-gray-50 rounded border border-gray-150">
                <span className="font-bold text-gray-800">{gate.gate}</span>
                <div className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{gate.status}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Enterprise Organization Health Matrix */}
        <SectionCard title="Enterprise Organization Health Matrix">
          <OrgHealthHeatmap data={healthMatrix} />
        </SectionCard>

        {/* Recent Tenant & Organization Activity */}
        <SectionCard title="Recent Tenant & Organization Activity">
          <DataTable
            columns={[
              { key: 'dateTime', header: 'Date / Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.dateTime}</span> },
              { key: 'entity', header: 'Entity', cell: (r) => <span className="font-bold text-gray-900">{r.entity}</span> },
              { key: 'type', header: 'Type' },
              { key: 'action', header: 'Action', cell: (r) => <span className="font-semibold text-gray-800">{r.action}</span> },
              { key: 'performedBy', header: 'Performed By', cell: (r) => <span className="text-[9px] text-gray-500 truncate max-w-[100px] inline-block">{r.performedBy}</span> },
              { key: 'impact', header: 'Impact' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
