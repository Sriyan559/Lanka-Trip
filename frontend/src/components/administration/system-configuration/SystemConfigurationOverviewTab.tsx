'use client';

import React from 'react';
import { SysConfigFullData, ConfigurationRegistryItem } from '@/lib/administration/system-configuration/sys-config.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { EffectiveValueFlow } from '@/components/shared/Hierarchy/EffectiveValueFlow';
import { ChangeImpactPipeline } from '@/components/shared/Chart/ChangeImpactPipeline';
import { OperatingHealthHeatmap } from '@/components/shared/Chart/OperatingHealthHeatmap';
import { ChevronRight } from 'lucide-react';

interface SystemConfigurationOverviewTabProps {
  data: SysConfigFullData;
  selectedConfigItem: ConfigurationRegistryItem;
  onSelectRegistryItem: (item: ConfigurationRegistryItem) => void;
  onNavigateTab: (tabId: string) => void;
}

export function SystemConfigurationOverviewTab({
  data,
  selectedConfigItem,
  onSelectRegistryItem,
  onNavigateTab,
}: SystemConfigurationOverviewTabProps) {
  const {
    registry,
    selectedConfig,
    effectiveFlow,
    domainSummary,
    platformDefaults,
    scopedOverrides,
    overrideSpread,
    environmentMatrix,
    driftAnalysis,
    recentActivity,
    healthMatrix,
    governanceGates,
  } = data;

  const registryColumns: ColumnDef<ConfigurationRegistryItem>[] = [
    { key: 'id', header: 'Config ID', cell: (r) => <span className="text-gray-500 font-mono text-[9px]">{r.id}</span> },
    {
      key: 'configKey',
      header: 'Configuration Key',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectRegistryItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left"
        >
          {r.configKey}
        </button>
      ),
    },
    { key: 'domain', header: 'Domain' },
    { key: 'scopeLevel', header: 'Scope Level' },
    { key: 'valueType', header: 'Value Type' },
    { key: 'lifecycleState', header: 'Lifecycle State', cell: (r) => <StatusBadge status={r.lifecycleState} size="xs" /> },
    { key: 'validationStatus', header: 'Validation Status', cell: (r) => <StatusBadge status={r.validationStatus} size="xs" /> },
    { key: 'driftStatus', header: 'Drift Status' },
    { key: 'owner', header: 'Owner' },
    { key: 'prodReadiness', header: 'Prod Readiness', cell: (r) => <span className="font-semibold text-gray-800">{r.prodReadiness}</span> },
    { key: 'lastChanged', header: 'Last Changed', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastChanged}</span> },
    { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ========================================================================= */}
      {/* ROW 1: Registry Table, Selected Config detail card, Effective Value Flow */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Registry Table (6 of 12) */}
        <div className="lg:col-span-6 min-w-0">
          <SectionCard
            title="Enterprise Configuration Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('registry')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all keys</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={registryColumns} data={registry} density="compact" />
          </SectionCard>
        </div>

        {/* Selected Config Panel (3 of 12) */}
        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Selected Configuration">
            <div className="flex flex-col justify-between h-full text-[10px]">
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Config ID</span>
                  <span className="font-mono font-bold text-gray-900">{selectedConfig.configId}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Configuration Key</span>
                  <span className="font-bold text-gray-900 truncate block" title={selectedConfig.configKey}>{selectedConfig.configKey}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Domain</span>
                  <span className="font-semibold text-gray-800">{selectedConfig.domain}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Scope Level</span>
                  <span className="font-semibold text-gray-800">{selectedConfig.scopeLevel}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Value Type</span>
                  <span className="font-semibold text-gray-800">{selectedConfig.valueType}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Description</span>
                  <span className="text-gray-600 truncate block">{selectedConfig.description}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Lifecycle State</span>
                  <StatusBadge status={selectedConfig.lifecycleState} size="xs" />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Validation Status</span>
                  <StatusBadge status={selectedConfig.validationStatus} size="xs" />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Production Readiness</span>
                  <span className="font-semibold text-emerald-700">{selectedConfig.productionReadiness}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Drift Status</span>
                  <span className="font-semibold text-gray-800">{selectedConfig.driftStatus}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Owner</span>
                  <span className="font-semibold text-gray-800">{selectedConfig.owner}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Last Changed</span>
                  <span className="text-gray-500 text-[8.5px] leading-tight block">{selectedConfig.lastChanged}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Risk Level</span>
                  <StatusBadge status={selectedConfig.riskLevel} size="xs" />
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block text-[9px] uppercase">Version</span>
                  <span className="font-semibold text-gray-800">3</span>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-3 pt-2 border-t border-gray-150 flex flex-col gap-1.5 text-[9px]">
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <button type="button" onClick={() => onNavigateTab('effective-values')} className="text-[#741d35] font-bold hover:underline">Review Effective Value</button>
                  <button type="button" onClick={() => onNavigateTab('scoped-overrides')} className="text-[#741d35] font-bold hover:underline">Review Overrides</button>
                  <button type="button" onClick={() => onNavigateTab('environment-values')} className="text-[#741d35] font-bold hover:underline">Compare Environments</button>
                </div>
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <button type="button" onClick={() => onNavigateTab('change-requests')} className="text-[#741d35] font-bold hover:underline">Request Configuration Change</button>
                  <button type="button" onClick={() => onNavigateTab('activity')} className="text-[#741d35] font-bold hover:underline">View History</button>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Effective Value Resolution (Inheritance Flow) (3 of 12) */}
        <div className="lg:col-span-3 min-w-0">
          <SectionCard title="Effective Value Resolution (Inheritance Flow)">
            <EffectiveValueFlow nodes={effectiveFlow.nodes} resolution={effectiveFlow.resolution} />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: Configuration Domains (Summary), Platform Default Overrides, Scoped Overrides, Override Spread */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Configuration Domains (Summary) */}
        <SectionCard title="Configuration Domains (Summary)">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
              { key: 'keys', header: 'Keys', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.keys}</span> },
              { key: 'overrides', header: 'Overrides', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.overrides}</span> },
              { key: 'warnings', header: 'Warnings', align: 'center', cell: (r) => <span className="font-bold text-amber-700">{r.warnings}</span> },
              { key: 'critical', header: 'Critical', align: 'center', cell: (r) => <span className="font-bold text-rose-700">{r.critical}</span> },
              { key: 'drift', header: 'Drift', align: 'center' },
              { key: 'owner', header: 'Owner' },
              { key: 'health', header: 'Health', cell: (r) => <span className="font-extrabold text-emerald-700">{r.health}%</span> },
            ]}
            data={domainSummary}
            density="compact"
          />
        </SectionCard>

        {/* Platform Default Overrides (Top 5) */}
        <SectionCard title="Platform Default Overrides (Top 5)">
          <DataTable
            columns={[
              { key: 'configKey', header: 'Configuration Key', cell: (r) => <span className="font-bold text-gray-900 truncate max-w-[100px] block" title={r.configKey}>{r.configKey}</span> },
              { key: 'scope', header: 'Override Scope' },
              { key: 'value', header: 'Value' },
              { key: 'type', header: 'Type' },
              { key: 'lastChanged', header: 'Last Changed', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastChanged}</span> },
              { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
            ]}
            data={platformDefaults}
            density="compact"
          />
        </SectionCard>

        {/* Scoped Overrides (Top 5) */}
        <SectionCard title="Scoped Overrides (Top 5)">
          <DataTable
            columns={[
              { key: 'configKey', header: 'Configuration Key', cell: (r) => <span className="font-bold text-gray-900 truncate max-w-[100px] block" title={r.configKey}>{r.configKey}</span> },
              { key: 'scope', header: 'Scope' },
              { key: 'count', header: 'Count', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.count}</span> },
              { key: 'type', header: 'Type' },
              { key: 'risk', header: 'Risk', cell: (r) => <StatusBadge status={r.risk} size="xs" /> },
            ]}
            data={scopedOverrides}
            density="compact"
          />
        </SectionCard>

        {/* Override Spread by Domain */}
        <SectionCard title="Override Spread by Domain">
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
              { key: 'keys', header: 'Keys', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.keys}</span> },
              { key: 'overrides', header: 'Overrides', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.overrides}</span> },
              { key: 'highRisk', header: 'High Risk', align: 'center', cell: (r) => <span className={r.highRisk > 0 ? 'text-rose-700 font-bold' : ''}>{r.highRisk}</span> },
            ]}
            data={overrideSpread}
            density="compact"
          />
        </SectionCard>
      </div>

      {/* ========================================================================= */}
      {/* ROW 3: Environment Configuration Matrix, Configuration Drift */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8 min-w-0">
          <SectionCard title="Environment Configuration Matrix">
            <DataTable
              columns={[
                { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
                { key: 'dev', header: 'Dev', align: 'center', cell: (r) => <StatusBadge status={r.dev} size="xs" /> },
                { key: 'test', header: 'Test', align: 'center', cell: (r) => <StatusBadge status={r.test} size="xs" /> },
                { key: 'staging', header: 'Staging', align: 'center', cell: (r) => <StatusBadge status={r.staging} size="xs" /> },
                { key: 'pilot', header: 'Pilot', align: 'center', cell: (r) => <StatusBadge status={r.pilot} size="xs" /> },
                { key: 'prod', header: 'Prod', align: 'center', cell: (r) => <StatusBadge status={r.prod} size="xs" /> },
              ]}
              data={environmentMatrix}
              density="compact"
            />
          </SectionCard>
        </div>
        <div className="lg:col-span-4 min-w-0">
          <SectionCard title="Configuration Drift (Top 5)">
            <DataTable
              columns={[
                { key: 'configKey', header: 'Configuration Key', cell: (r) => <span className="font-bold text-gray-900 truncate block max-w-[120px]" title={r.configKey}>{r.configKey}</span> },
                { key: 'drift', header: 'Drift', cell: (r) => <StatusBadge status={r.drift} size="xs" /> },
                { key: 'environment', header: 'Environment', cell: (r) => <span className="font-semibold text-gray-800">{r.environment}</span> },
                { key: 'lastDetected', header: 'Last Detected', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastDetected}</span> },
              ]}
              data={driftAnalysis}
              density="compact"
            />
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 4: Changes Chart, Health Chart, Pipeline, Activity, Health Matrix, Gates */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {/* Configuration Changes — Last 30 Days Line Chart */}
        <SectionCard title="Configuration Changes — Last 30 Days">
          <ResponsiveLineChart
            data={[
              { label: 'Apr 16', 'Created': 10, 'Updated': 20, 'Deprecated': 5, 'Deleted': 2 },
              { label: 'Apr 23', 'Created': 12, 'Updated': 18, 'Deprecated': 6, 'Deleted': 3 },
              { label: 'Apr 30', 'Created': 15, 'Updated': 25, 'Deprecated': 4, 'Deleted': 1 },
              { label: 'May 7', 'Created': 8, 'Updated': 15, 'Deprecated': 8, 'Deleted': 4 },
              { label: 'May 14', 'Created': 18, 'Updated': 30, 'Deprecated': 5, 'Deleted': 2 },
            ]}
            xAxisKey="label"
            series={[
              { key: 'Created', label: 'Created', color: '#3b82f6' },
              { key: 'Updated', label: 'Updated', color: '#10b981' },
              { key: 'Deprecated', label: 'Deprecated', color: '#f59e0b' },
              { key: 'Deleted', label: 'Deleted', color: '#e11d48' },
            ]}
            height={140}
          />
        </SectionCard>

        {/* Configuration Health — Last 30 Days Line Chart */}
        <SectionCard title="Configuration Health — Last 30 Days">
          <ResponsiveLineChart
            data={[
              { label: 'Apr 16', 'Overall Health': 92, 'Validation Health': 94, 'Drift Health': 90, 'Readiness Health': 95 },
              { label: 'Apr 23', 'Overall Health': 93, 'Validation Health': 95, 'Drift Health': 92, 'Readiness Health': 95 },
              { label: 'Apr 30', 'Overall Health': 95, 'Validation Health': 97, 'Drift Health': 94, 'Readiness Health': 96 },
              { label: 'May 7', 'Overall Health': 94, 'Validation Health': 95, 'Drift Health': 92, 'Readiness Health': 95 },
              { label: 'May 14', 'Overall Health': 95, 'Validation Health': 96, 'Drift Health': 95, 'Readiness Health': 97 },
            ]}
            xAxisKey="label"
            series={[
              { key: 'Overall Health', label: 'Overall Health', color: '#10b981', strokeWidth: 2.5 },
              { key: 'Validation Health', label: 'Validation Health', color: '#3b82f6', dashed: true },
              { key: 'Drift Health', label: 'Drift Health', color: '#8b5cf6', dashed: true },
              { key: 'Readiness Health', label: 'Readiness Health', color: '#f59e0b', dashed: true },
            ]}
            height={140}
          />
        </SectionCard>

        {/* Configuration Change Impact Pipeline */}
        <SectionCard title="Configuration Change Impact Pipeline">
          <ChangeImpactPipeline currentStep={5} progressPercentage={51} />
        </SectionCard>

        {/* Recent Configuration Activity */}
        <SectionCard title="Recent Configuration Activity">
          <DataTable
            columns={[
              { key: 'dateTime', header: 'Date / Time', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.dateTime}</span> },
              { key: 'action', header: 'Action', cell: (r) => <span className="font-semibold text-gray-800">{r.action}</span> },
              { key: 'configKey', header: 'Configuration Key', cell: (r) => <span className="font-bold text-gray-900 truncate block max-w-[80px]" title={r.configKey}>{r.configKey}</span> },
              { key: 'changedBy', header: 'Changed By' },
              { key: 'scope', header: 'Scope' },
              { key: 'environment', header: 'Environment' },
              { key: 'details', header: 'Details', cell: (r) => <span className="text-gray-500 truncate block max-w-[80px]" title={r.details}>{r.details}</span> },
            ]}
            data={recentActivity}
            density="compact"
          />
        </SectionCard>

        {/* Enterprise Configuration Health Matrix */}
        <SectionCard title="Enterprise Configuration Health Matrix">
          <div className="w-full overflow-x-auto min-w-0">
            <table className="w-full text-center border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                  <th className="p-1 text-left text-gray-400">Domain</th>
                  <th className="p-1">Validation</th>
                  <th className="p-1">Drift</th>
                  <th className="p-1">Readiness</th>
                  <th className="p-1">Ownership</th>
                  <th className="p-1">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {healthMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60">
                    <td className="p-1 text-left font-bold text-gray-900">{row.category}</td>
                    <td className="p-1 text-emerald-700 font-bold">{row.validation}%</td>
                    <td className="p-1 text-emerald-700 font-bold">{row.drift}%</td>
                    <td className="p-1 text-emerald-700 font-bold">{row.readiness}%</td>
                    <td className="p-1 text-emerald-700 font-bold">{row.ownership}%</td>
                    <td className="p-1"><StatusBadge status={row.risk} size="xs" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Configuration Governance Gates */}
        <SectionCard title="Configuration Governance Gates">
          <DataTable
            columns={[
              { key: 'gate', header: 'Gate', cell: (r) => <span className="font-bold text-gray-900">{r.gate}</span> },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'lastChecked', header: 'Last Checked', cell: (r) => <span className="text-[9px] text-gray-500 whitespace-nowrap">{r.lastChecked}</span> },
            ]}
            data={governanceGates}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
export default SystemConfigurationOverviewTab;
