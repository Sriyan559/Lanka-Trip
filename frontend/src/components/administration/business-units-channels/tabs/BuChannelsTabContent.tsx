'use client';

import React from 'react';
import { BuChannelsFullData } from '@/lib/administration/business-units-channels/bu-channels.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { BuTopologyTree } from '@/components/shared/Hierarchy/BuTopologyTree';
import { OperatingHealthHeatmap } from '@/components/shared/Chart/OperatingHealthHeatmap';

interface BuChannelsTabContentProps {
  activeTab: string;
  data: BuChannelsFullData;
  onNavigateTab: (tabId: string) => void;
}

export function BuChannelsTabContent({ activeTab, data }: BuChannelsTabContentProps) {
  const {
    registry,
    topologyRoot,
    buPortfolio,
    channelPortfolio,
    regionalAvailability,
    countryRestrictions,
    environmentMatrix,
    sharedRelationships,
    ownership,
    pendingChanges,
    conflicts,
    exceptions,
    risks,
    healthMatrix,
    recentActivity,
  } = data;

  switch (activeTab) {
    case 'business-units':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Business Units Directory">
            <DataTable
              columns={[
                { key: 'name', header: 'Business Unit Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'primaryOwner', header: 'Primary Owner' },
                { key: 'lifecycleState', header: 'Lifecycle State', cell: (r) => <StatusBadge status={r.lifecycleState} size="xs" /> },
                { key: 'eligibilityState', header: 'Readiness State', cell: (r) => <StatusBadge status={r.eligibilityState} size="xs" /> },
                { key: 'productionReadiness', header: 'Production Readiness' },
                { key: 'ownershipMode', header: 'Ownership Mode' },
              ]}
              data={registry.filter((r) => r.type === 'Business Unit')}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'channels':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Channels Directory">
            <DataTable
              columns={[
                { key: 'name', header: 'Channel Name', cell: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
                { key: 'type', header: 'Type' },
                { key: 'primaryOwner', header: 'Primary Owner' },
                { key: 'lifecycleState', header: 'Lifecycle State', cell: (r) => <StatusBadge status={r.lifecycleState} size="xs" /> },
                { key: 'sharedChannel', header: 'Shared Channel' },
              ]}
              data={registry.filter((r) => r.type === 'Channel' || r.sharedChannel === 'Yes')}
              density="normal"
              searchable
              pagination
            />
          </SectionCard>
        </div>
      );

    case 'regional-availability':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Regional Availability Summary">
            <DataTable
              columns={[
                { key: 'region', header: 'Region', cell: (r) => <span className="font-bold text-gray-900">{r.region}</span> },
                { key: 'countries', header: 'Countries Assigned', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.countries}</span> },
                { key: 'units', header: 'Units', align: 'center' },
                { key: 'channels', header: 'Channels', align: 'center' },
                { key: 'scopes', header: 'Scopes', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.scopes}</span> },
              ]}
              data={regionalAvailability}
              density="normal"
            />
          </SectionCard>

          <SectionCard title="Country Restrictions">
            <DataTable
              columns={[
                { key: 'country', header: 'Country', cell: (r) => <span className="font-bold text-gray-900">{r.country}</span> },
                { key: 'restrictedUnits', header: 'Restricted Units', align: 'center', cell: (r) => <span className="text-rose-700 font-bold">{r.restrictedUnits}</span> },
                { key: 'restrictedChannels', header: 'Restricted Channels', align: 'center', cell: (r) => <span className="text-rose-750 font-bold">{r.restrictedChannels}</span> },
                { key: 'restrictions', header: 'Restrictions', cell: (r) => <StatusBadge status={r.restrictions} size="xs" /> },
              ]}
              data={countryRestrictions}
              density="normal"
            />
          </SectionCard>
        </div>
      );

    case 'environment-applicability':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Environment Applicability Matrix">
            <DataTable
              columns={[
                { key: 'environment', header: 'Environment', cell: (r) => <span className="font-bold text-gray-900">{r.environment}</span> },
                { key: 'units', header: 'Units Available', align: 'center' },
                { key: 'active', header: 'Active Units', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.active}</span> },
                { key: 'channels', header: 'Channels Available', align: 'center' },
                { key: 'availability', header: 'Availability Score', align: 'center', cell: (r) => <span className="font-extrabold text-emerald-700">{r.availability}</span> },
              ]}
              data={environmentMatrix}
              density="normal"
            />
          </SectionCard>
        </div>
      );

    case 'ownership':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Shared Operations Relationships">
            <DataTable
              columns={[
                { key: 'primaryOwner', header: 'Primary Owner BU', cell: (r) => <span className="font-bold text-gray-900">{r.primaryOwner}</span> },
                { key: 'participatingBu', header: 'Participating BU', cell: (r) => <span className="font-semibold text-gray-800">{r.participatingBu}</span> },
                { key: 'connections', header: 'Connections', align: 'center' },
                { key: 'sharedChannels', header: 'Shared Channels', align: 'center' },
                { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              ]}
              data={sharedRelationships}
              density="normal"
            />
          </SectionCard>

          <SectionCard title="BU & Channel Ownership Coverage">
            <ReusableDonutChart
              data={[
                { name: 'Owned', value: ownership.owned, color: '#10b981' },
                { name: 'Shared', value: ownership.shared, color: '#2563eb' },
                { name: 'Unassigned', value: ownership.unassigned, color: '#e2e8f0' },
              ]}
              totalValue={ownership.coverage}
              totalLabel="Coverage"
              height={180}
            />
          </SectionCard>
        </div>
      );

    case 'activity':
      return (
        <div className="flex flex-col gap-3">
          <SectionCard title="Business Unit & Channel Activity Audit Log">
            <DataTable
              columns={[
                { key: 'dateTime', header: 'Date / Time', cell: (r) => <span className="text-gray-500 text-[10px] whitespace-nowrap">{r.dateTime}</span> },
                { key: 'action', header: 'Action', cell: (r) => <span className="font-bold text-gray-900">{r.action}</span> },
                { key: 'entity', header: 'Entity', cell: (r) => <span className="font-semibold text-gray-800">{r.entity}</span> },
                { key: 'performedBy', header: 'Performed By' },
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
          <SectionCard title={`${activeTab.replace('-', ' ').toUpperCase()} Workspace`}>
            <p className="text-xs text-gray-500 p-4 text-center">
              Displaying detailed configuration and analytical records for: <span className="font-bold text-gray-800">{activeTab}</span>.
            </p>
          </SectionCard>
        </div>
      );
  }
}
