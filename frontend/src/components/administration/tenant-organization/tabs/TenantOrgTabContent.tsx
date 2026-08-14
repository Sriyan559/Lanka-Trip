'use client';

import React from 'react';
import { TenantOrgFullData } from '@/lib/administration/tenant-organization/tenant-organization.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { OrgHierarchyTree } from '@/components/shared/Hierarchy/OrgHierarchyTree';
import { OrgHealthHeatmap } from '@/components/shared/Chart/OrgHealthHeatmap';

interface TenantOrgTabContentProps {
  activeTab: string;
  data: TenantOrgFullData;
  onNavigateTab: (tabId: string) => void;
}

export function TenantOrgTabContent({ activeTab, data }: TenantOrgTabContentProps) {
  const {
    registry,
    hierarchyRoot,
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
    healthMatrix,
    recentActivity,
  } = data;

  switch (activeTab) {
    case 'tenants':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Enterprise Tenants Directory">
            <DataTable
              columns={[
                { key: 'name', header: 'Tenant Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'keyRef', header: 'Key Reference', cell: (r) => <span className="font-mono text-[9px] text-gray-500">{r.keyRef}</span> },
                { key: 'region', header: 'Region' },
                { key: 'country', header: 'Country' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
                { key: 'lastUpdated', header: 'Last Updated' },
              ]}
              data={registry.filter((r) => r.type === 'Tenant')}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'ecosystems':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Ecosystems Portfolio">
            <DataTable
              columns={[
                { key: 'name', header: 'Ecosystem Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'subCount1', header: 'Organizations', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.subCount1}</span> },
                { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
              ]}
              data={ecosystemPortfolio}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'organizations':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Organizations Directory">
            <DataTable
              columns={[
                { key: 'name', header: 'Organization Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'keyRef', header: 'Key Reference', cell: (r) => <span className="font-mono text-[9px] text-gray-500">{r.keyRef}</span> },
                { key: 'ecosystem', header: 'Ecosystem' },
                { key: 'parentOrg', header: 'Parent Org' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
              ]}
              data={registry.filter((r) => r.type === 'Organization')}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'hierarchy':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Full Organizational Hierarchy Topology">
            <div className="p-4 flex items-center justify-center">
              <OrgHierarchyTree root={hierarchyRoot} />
            </div>
          </SectionCard>

          <SectionCard title="Enterprise Health Matrix & Integrity">
            <OrgHealthHeatmap data={healthMatrix} />
          </SectionCard>
        </div>
      );

    case 'legal-entities':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Legal Entities Directory">
            <DataTable
              columns={[
                { key: 'key', header: 'Key', cell: (r) => <span className="font-mono text-[9px] text-gray-500">{r.key}</span> },
                { key: 'name', header: 'Legal Entity Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'country', header: 'Country' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
              ]}
              data={legalEntities}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'operating-entities':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Operating Entities Directory">
            <DataTable
              columns={[
                { key: 'key', header: 'Key', cell: (r) => <span className="font-mono text-[9px] text-gray-500">{r.key}</span> },
                { key: 'name', header: 'Operating Entity Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'country', header: 'Country' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
              ]}
              data={operatingEntities}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'ownership':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Organizational Ownership Records">
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
              density="normal"
            />
          </SectionCard>

          <SectionCard title="Ownership Coverage Distribution">
            <ReusableDonutChart
              data={[
                { name: 'Fully Owned', value: ownershipCoverage.fullyOwned, color: '#10b981' },
                { name: 'Partially Owned', value: ownershipCoverage.partiallyOwned, color: '#f59e0b' },
                { name: 'Unowned', value: ownershipCoverage.unowned, color: '#e11d48' },
              ]}
              totalValue={`${ownershipCoverage.coverage}%`}
              totalLabel="Coverage"
              height={180}
            />
          </SectionCard>
        </div>
      );

    case 'reviews':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Structure Reviews Schedule">
            <DataTable
              columns={[
                { key: 'reviewType', header: 'Review Type', cell: (r) => <span className="font-bold text-gray-900">{r.reviewType}</span> },
                { key: 'dueDate', header: 'Due Date' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                { key: 'health', header: 'Health', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.health}%</span> },
              ]}
              data={structureReviews}
              density="normal"
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'activity':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Tenant & Organization Activity Log">
            <DataTable
              columns={[
                { key: 'dateTime', header: 'Date / Time' },
                { key: 'entity', header: 'Entity', cell: (r) => <span className="font-bold text-gray-900">{r.entity}</span> },
                { key: 'type', header: 'Type' },
                { key: 'action', header: 'Action', cell: (r) => <span className="font-semibold text-gray-800">{r.action}</span> },
                { key: 'performedBy', header: 'Performed By' },
                { key: 'impact', header: 'Impact' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={recentActivity}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    default:
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title={`${activeTab.replace('-', ' ').toUpperCase()} View`}>
            <p className="text-xs text-gray-500 p-4 text-center">
              Displaying detailed configuration and analytical records for tab: <span className="font-bold text-gray-800">{activeTab}</span>.
            </p>
          </SectionCard>
        </div>
      );
  }
}
