'use client';

import React from 'react';
import { BuChannelsFullData, BuChannelRegistryItem } from '@/lib/administration/business-units-channels/bu-channels.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { BuTopologyTree } from '@/components/shared/Hierarchy/BuTopologyTree';
import { OperatingHealthHeatmap } from '@/components/shared/Chart/OperatingHealthHeatmap';
import { ReusableSparkline } from '@/components/shared/Chart/ReusableSparkline';
import { ChevronRight, ArrowRight, ShieldAlert, GitCommit, FileText, CheckCircle2 } from 'lucide-react';

interface BuChannelsOverviewTabProps {
  data: BuChannelsFullData;
  selectedBuItem: BuChannelRegistryItem;
  onSelectRegistryItem: (item: BuChannelRegistryItem) => void;
  onNavigateTab: (tabId: string) => void;
}

export function BuChannelsOverviewTab({
  data,
  selectedBuItem,
  onSelectRegistryItem,
  onNavigateTab,
}: BuChannelsOverviewTabProps) {
  const {
    registry,
    selectedBu,
    topologyRoot,
    scopeInheritance,
    buPortfolio,
    channelPortfolio,
    regionalAvailability,
    countryRestrictions,
    environmentMatrix,
    eligibility,
    channelReadiness,
    sharedChannelPortfolio,
    sharedRelationships,
    ownership,
    pendingChanges,
    changeImpact,
    conflicts,
    exceptions,
    risks,
    healthMatrix,
    recentActivity,
  } = data;

  // 1. Registry Columns
  const registryColumns: ColumnDef<BuChannelRegistryItem>[] = [
    {
      key: 'name',
      header: 'Business Unit / Channel',
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
    { key: 'type', header: 'Type' },
    { key: 'primaryOwner', header: 'Primary Owner' },
    { key: 'lifecycleState', header: 'Lifecycle State', cell: (r) => <StatusBadge status={r.lifecycleState} size="xs" /> },
    { key: 'eligibilityState', header: 'Eligibility State', cell: (r) => <StatusBadge status={r.eligibilityState} size="xs" /> },
    { key: 'productionReadiness', header: 'Readiness' },
    { key: 'scopeType', header: 'Scope Type' },
    { key: 'inheritedFrom', header: 'Inherited From' },
    { key: 'sharedChannel', header: 'Shared Channel' },
    { key: 'ownershipMode', header: 'Ownership Mode' },
    { key: 'restrictionSources', header: 'Restriction Sources' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================================= */}
      {/* ROW 1: Registry Table, Selected BU detail card, Business Unit & Channel Topology */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Registry Table (6 of 12) */}
        <div className="lg:col-span-6 min-w-0">
          <SectionCard
            title="Business Unit, Channel & Operating Scope Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('business-units')}
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

        {/* Selected BU Panel (3 of 12) */}
        <div className="lg:col-span-3 min-w-0">
          <SectionCard title={`Selected Business Unit — ${selectedBuItem.name || 'Beauty Retail'}`}>
            <div className="flex flex-col justify-between h-full text-[10px]">
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Public Unit Reference</span>
                  <span className="font-bold text-gray-900">{selectedBu.publicRef}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Lifecycle State</span>
                  <StatusBadge status={selectedBuItem.lifecycleState || 'Active'} size="xs" />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Business Unit Key</span>
                  <span className="font-mono text-gray-700">{selectedBu.buKey}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Production Readiness</span>
                  <StatusBadge status={selectedBuItem.eligibilityState || 'Eligible'} size="xs" />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Parent Organization</span>
                  <span className="font-semibold text-gray-800">{selectedBu.parentOrg}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Review State</span>
                  <span className="font-semibold text-emerald-700">{selectedBu.reviewState}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Ecosystem</span>
                  <span className="font-semibold text-gray-800">{selectedBu.ecosystem}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Last Scope Change</span>
                  <span className="text-gray-500 text-[8.5px] leading-tight block">{selectedBu.lastScopeChange}</span>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-3 pt-2 border-t border-gray-150 flex items-center justify-between gap-1 flex-wrap text-[9px]">
                <button type="button" onClick={() => onNavigateTab('hierarchy')} className="text-[#741d35] font-bold hover:underline">Review Structure</button>
                <button type="button" onClick={() => onNavigateTab('ownership')} className="text-[#741d35] font-bold hover:underline">Review Ownership</button>
                <button type="button" onClick={() => onNavigateTab('restrictions')} className="text-[#741d35] font-bold hover:underline">Review Restrictions</button>
                <button type="button" onClick={() => onNavigateTab('activity')} className="text-[#741d35] font-bold hover:underline">View History</button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Business Unit & Channel Topology (3 of 12) */}
        <div className="lg:col-span-3 min-w-0">
          <SectionCard
            title="Business Unit & Channel Topology"
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
            <BuTopologyTree root={topologyRoot} />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Scope Inheritance, Topology, BU Portfolio, Channel Portfolio, Region & Country */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {/* Scope Inheritance Analysis Donut */}
        <SectionCard title="Scope Inheritance Analysis">
          <ReusableDonutChart
            data={[
              { name: 'Inherited', value: scopeInheritance.inherited, color: '#10b981' },
              { name: 'Direct', value: scopeInheritance.direct, color: '#2563eb' },
              { name: 'Conditional', value: scopeInheritance.conditional, color: '#8b5cf6' },
              { name: 'Blocked', value: scopeInheritance.blocked, color: '#e11d48' },
            ]}
            totalValue={scopeInheritance.total}
            totalLabel="Total Scopes"
            height={150}
          />
        </SectionCard>

        {/* Scope Inheritance Topology */}
        <SectionCard title="Scope Inheritance Topology">
          <div className="flex flex-col items-center justify-center p-2 text-center text-[10px] space-y-1.5 h-full">
            <div className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded font-bold">Parent Scope</div>
            <div className="w-px h-2 bg-gray-300" />
            <div className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded font-bold text-emerald-800">
              Inherited (24)
            </div>
            <div className="w-px h-2 bg-gray-300" />
            <div className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded font-bold text-blue-800">
              Direct (12)
            </div>
            <div className="w-px h-2 bg-gray-300" />
            <div className="grid grid-cols-2 gap-1">
              <div className="px-1.5 py-0.5 bg-purple-50 border border-purple-200 rounded text-purple-800 font-semibold">
                Conditional (4)
              </div>
              <div className="px-1.5 py-0.5 bg-rose-50 border border-rose-200 rounded text-rose-800 font-semibold">
                Blocked (2)
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Business Unit Portfolio */}
        <SectionCard title="Business Unit Portfolio">
          <DataTable
            columns={[
              { key: 'lifecycle', header: 'Lifecycle', cell: (r) => <span className="font-bold text-gray-900">{r.lifecycle}</span> },
              { key: 'units', header: 'Units', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.units}</span> },
              { key: 'active', header: 'Active', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.active}</span> },
              { key: 'pilot', header: 'Pilot', align: 'center', cell: (r) => <span className="text-amber-700 font-semibold">{r.pilot}</span> },
            ]}
            data={buPortfolio}
            density="compact"
          />
        </SectionCard>

        {/* Channel Portfolio */}
        <SectionCard title="Channel Portfolio">
          <DataTable
            columns={[
              { key: 'type', header: 'Type', cell: (r) => <span className="font-bold text-gray-900">{r.type}</span> },
              { key: 'channels', header: 'Channels', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.channels}</span> },
              { key: 'active', header: 'Active', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.active}</span> },
              { key: 'shared', header: 'Shared', align: 'center', cell: (r) => <span className="text-indigo-700 font-semibold">{r.shared}</span> },
            ]}
            data={channelPortfolio}
            density="compact"
          />
        </SectionCard>

        {/* Regional & Country Availability */}
        <SectionCard title="Regional & Country Availability">
          <DataTable
            columns={[
              { key: 'region', header: 'Region', cell: (r) => <span className="font-bold text-gray-900">{r.region}</span> },
              { key: 'countries', header: 'Countries', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.countries}</span> },
              { key: 'units', header: 'Units', align: 'center' },
              { key: 'channels', header: 'Channels', align: 'center' },
              { key: 'scopes', header: 'Scopes', align: 'center', cell: (r) => <span className="font-bold text-[#741d35]">{r.scopes}</span> },
            ]}
            data={regionalAvailability}
            density="compact"
          />
        </SectionCard>

        {/* Country Restrictions */}
        <SectionCard title="Country Restrictions">
          <DataTable
            columns={[
              { key: 'country', header: 'Country', cell: (r) => <span className="font-bold text-gray-900">{r.country}</span> },
              { key: 'restrictedUnits', header: 'Restricted Units', align: 'center', cell: (r) => <span className="font-semibold text-rose-700">{r.restrictedUnits}</span> },
              { key: 'restrictedChannels', header: 'Restricted Channels', align: 'center', cell: (r) => <span className="font-semibold text-rose-750">{r.restrictedChannels}</span> },
              { key: 'restrictions', header: 'Restrictions', cell: (r) => <StatusBadge status={r.restrictions} size="xs" /> },
            ]}
            data={countryRestrictions}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 3: Environment Matrix, Eligibility, Readiness, Shared Channel, Relationships */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {/* Environment Matrix */}
        <SectionCard title="Environment Matrix">
          <DataTable
            columns={[
              { key: 'environment', header: 'Environment', cell: (r) => <span className="font-bold text-gray-900">{r.environment}</span> },
              { key: 'units', header: 'Units', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.units}</span> },
              { key: 'active', header: 'Active', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.active}</span> },
              { key: 'channels', header: 'Channels', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.channels}</span> },
              { key: 'availability', header: 'Availability', align: 'center', cell: (r) => <span className="font-extrabold text-emerald-700">{r.availability}</span> },
            ]}
            data={environmentMatrix}
            density="compact"
          />
        </SectionCard>

        {/* Production Eligibility Donut */}
        <SectionCard title="Production Eligibility">
          <ReusableDonutChart
            data={[
              { name: 'Eligible', value: eligibility.eligible, color: '#10b981' },
              { name: 'Conditional', value: eligibility.conditional, color: '#f59e0b' },
              { name: 'Blocked', value: eligibility.blocked, color: '#e11d48' },
            ]}
            totalValue={eligibility.total}
            totalLabel="Units Eligible"
            height={150}
          />
        </SectionCard>

        {/* Channel Readiness Donut */}
        <SectionCard title="Channel Readiness">
          <ReusableDonutChart
            data={[
              { name: 'High', value: channelReadiness.high, color: '#10b981' },
              { name: 'Medium', value: channelReadiness.medium, color: '#f59e0b' },
              { name: 'Low', value: channelReadiness.low, color: '#e11d48' },
            ]}
            totalValue={channelReadiness.total}
            totalLabel="Channels Ready"
            height={150}
          />
        </SectionCard>

        {/* Shared Channel Portfolio */}
        <SectionCard title="Shared Channel Portfolio">
          <DataTable
            columns={[
              { key: 'bu', header: 'Business Unit', cell: (r) => <span className="font-bold text-gray-900">{r.bu}</span> },
              { key: 'channels', header: 'Channels', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.channels}</span> },
              { key: 'shared', header: 'Shared', align: 'center', cell: (r) => <span className="font-bold text-indigo-700">{r.shared}</span> },
            ]}
            data={sharedChannelPortfolio}
            density="compact"
          />
        </SectionCard>

        {/* Shared Operating Relationships */}
        <SectionCard title="Shared Operating Relationships">
          <DataTable
            columns={[
              { key: 'primaryOwner', header: 'Primary Owner', cell: (r) => <span className="font-bold text-gray-900">{r.primaryOwner}</span> },
              { key: 'participatingBu', header: 'Participating BU', cell: (r) => <span className="font-bold text-gray-950">{r.participatingBu}</span> },
              { key: 'connections', header: 'Connections', align: 'center' },
              { key: 'sharedChannels', header: 'Shared Channels', align: 'center' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={sharedRelationships}
            density="compact"
          />
        </SectionCard>

        {/* Business Unit & Channel Ownership Donut */}
        <SectionCard title="Business Unit & Channel Ownership">
          <ReusableDonutChart
            data={[
              { name: 'Owned', value: ownership.owned, color: '#10b981' },
              { name: 'Shared', value: ownership.shared, color: '#2563eb' },
              { name: 'Unassigned', value: ownership.unassigned, color: '#e2e8f0' },
            ]}
            totalValue={ownership.coverage}
            totalLabel="Coverage"
            height={150}
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 4: Pending Changes, Scope Conflicts, Operating Exceptions, Overdue Unit Reviews */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {/* Pending Scope Changes */}
        <SectionCard title="Pending Scope Changes">
          <DataTable
            columns={[
              { key: 'change', header: 'Change', cell: (r) => <span className="font-bold text-gray-900">{r.change}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.count}</span> },
              { key: 'impact', header: 'Impact', cell: (r) => <StatusBadge status={r.impact} size="xs" /> },
              { key: 'targetDate', header: 'Target Date', cell: (r) => <span className="text-gray-500 text-[9px]">{r.targetDate}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={pendingChanges}
            density="compact"
          />
        </SectionCard>

        {/* Scope Change Impact (Summary) */}
        <SectionCard title="Scope Change Impact (Summary)">
          <DataTable
            columns={[
              { key: 'riskType', header: 'Risk Type', cell: (r) => <span className="font-bold text-gray-900">{r.riskType}</span> },
              { key: 'high', header: 'High', align: 'center', cell: (r) => <span className="text-rose-700 font-bold">{r.high}</span> },
              { key: 'medium', header: 'Medium', align: 'center', cell: (r) => <span className="text-amber-700 font-semibold">{r.medium}</span> },
              { key: 'low', header: 'Low', align: 'center', cell: (r) => <span className="text-emerald-700 font-semibold">{r.low}</span> },
              { key: 'total', header: 'Total', align: 'center', cell: (r) => <span className="font-extrabold text-gray-900">{r.total}</span> },
            ]}
            data={changeImpact}
            density="compact"
          />
        </SectionCard>

        {/* Operating Scope Conflicts */}
        <SectionCard title="Operating Scope Conflicts">
          <DataTable
            columns={[
              { key: 'conflictType', header: 'Conflict Type', cell: (r) => <span className="font-bold text-gray-900">{r.conflictType}</span> },
              { key: 'businessUnit', header: 'BU', cell: (r) => <span className="font-bold text-gray-905">{r.businessUnit}</span> },
              { key: 'severity', header: 'Severity', cell: (r) => <StatusBadge status={r.severity} size="xs" /> },
              { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
            ]}
            data={conflicts}
            density="compact"
          />
        </SectionCard>

        {/* Operating Exceptions */}
        <SectionCard title="Operating Exceptions">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1">Exception Type</th>
                  <th className="pb-1 text-center">Count</th>
                  <th className="pb-1 text-center">Trend</th>
                  <th className="pb-1 text-center">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {exceptions.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/60">
                    <td className="py-1 font-bold text-gray-900">{row.exceptionType}</td>
                    <td className="py-1 text-center font-bold text-gray-900">{row.count}</td>
                    <td className="py-1 text-center">
                      <ReusableSparkline data={row.trend} color="#f43f5e" width={30} height={10} className="inline-block" />
                    </td>
                    <td className="py-1 text-center">
                      <StatusBadge status={row.severity} size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Operating Risks */}
        <SectionCard title="Operating Risks">
          <DataTable
            columns={[
              { key: 'riskType', header: 'Risk Type', cell: (r) => <span className="font-bold text-gray-900">{r.riskType}</span> },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.count}</span> },
              { key: 'severity', header: 'Severity', cell: (r) => <StatusBadge status={r.severity} size="xs" /> },
            ]}
            data={risks}
            density="compact"
          />
        </SectionCard>

        {/* Overdue Unit Reviews Donut */}
        <SectionCard title="Overdue Unit Reviews">
          <ReusableDonutChart
            data={[
              { name: 'On Time', value: 17, color: '#10b981' },
              { name: 'Overdue', value: 1, color: '#e11d48' },
            ]}
            totalValue="95%"
            totalLabel="On Time"
            height={150}
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 5: Heatmap, Activity, Line Chart, Channel Reviews */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        {/* Operational Exceptions */}
        <SectionCard title="Operational Exceptions">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="pb-1">Type</th>
                  <th className="pb-1 text-center">Count</th>
                  <th className="pb-1 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                <tr className="hover:bg-gray-50/60">
                  <td className="py-1.5 font-bold text-gray-900">Configuration Exceptions</td>
                  <td className="py-1.5 text-center font-bold text-gray-900">2</td>
                  <td className="py-1.5 text-center">
                    <ReusableSparkline data={[1, 2, 2, 2, 2, 2]} color="#f43f5e" width={30} height={10} className="inline-block" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/60">
                  <td className="py-1.5 font-bold text-gray-900">Restriction Violations</td>
                  <td className="py-1.5 text-center font-bold text-gray-900">1</td>
                  <td className="py-1.5 text-center">
                    <ReusableSparkline data={[2, 1, 1, 1, 1, 1]} color="#f43f5e" width={30} height={10} className="inline-block" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/60">
                  <td className="py-1.5 font-bold text-gray-900">Data Exceptions</td>
                  <td className="py-1.5 text-center font-bold text-gray-900">1</td>
                  <td className="py-1.5 text-center">
                    <ReusableSparkline data={[1, 1, 1, 1, 1, 1]} color="#f43f5e" width={30} height={10} className="inline-block" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Channel Reviews */}
        <SectionCard title="Channel Reviews">
          <ReusableDonutChart
            data={[
              { name: 'On Time', value: 7, color: '#10b981' },
              { name: 'Overdue', value: 1, color: '#e11d48' },
            ]}
            totalValue="88%"
            totalLabel="On Time"
            height={150}
          />
        </SectionCard>

        {/* Operating Health Matrix Heatmap */}
        <SectionCard title="Operating Health Matrix">
          <OperatingHealthHeatmap data={healthMatrix} />
        </SectionCard>

        {/* Operating Scope Changes — Last 30 Days Line Chart */}
        <SectionCard title="Operating Scope Changes — Last 30 Days">
          <ResponsiveLineChart
            data={[
              { label: 'Jul 15', 'Created': 12, 'Updated': 18, 'Expired': 4 },
              { label: 'Jul 22', 'Created': 15, 'Updated': 22, 'Expired': 6 },
              { label: 'Jul 29', 'Created': 14, 'Updated': 28, 'Expired': 5 },
              { label: 'Aug 5', 'Created': 18, 'Updated': 32, 'Expired': 7 },
              { label: 'Aug 12', 'Created': 22, 'Updated': 36, 'Expired': 8 },
            ]}
            xAxisKey="label"
            series={[
              { key: 'Created', label: 'Created', color: '#10b981' },
              { key: 'Updated', label: 'Updated', color: '#2563eb' },
              { key: 'Expired', label: 'Expired', color: '#e11d48' },
            ]}
            height={140}
          />
        </SectionCard>

        {/* Enterprise Operating Unit & Channel Activity */}
        <SectionCard title="Enterprise Operating Unit & Channel Activity">
          <DataTable
            columns={[
              { key: 'dateTime', header: 'Date / Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.dateTime}</span> },
              { key: 'action', header: 'Action', cell: (r) => <span className="font-semibold text-gray-800">{r.action}</span> },
              { key: 'entity', header: 'Entity', cell: (r) => <span className="font-bold text-gray-900">{r.entity}</span> },
              { key: 'performedBy', header: 'Performed By', cell: (r) => <span className="text-[9px] text-gray-550 truncate max-w-[100px] inline-block">{r.performedBy}</span> },
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
