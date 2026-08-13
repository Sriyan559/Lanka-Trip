'use client';

import React, { useState } from 'react';
import { Download, ChevronDown, RefreshCw, Save, Filter } from 'lucide-react';
import { DependencyNetworkGraph } from './DependencyNetworkGraph';
import { SelectedDependencyDetail } from './SelectedDependencyDetail';
import { DependencyRegistry, DependencyRegistryRow } from './DependencyRegistry';
import { CompatibilityScore } from './CompatibilityScore';
import { AnalyticsShell } from '@/components/analytics/AnalyticsShell';
import { CircularScore } from '@/components/analytics/charts/CircularScore';
import { TabNavigation } from '@/components/analytics/TabNavigation';
import { AnalyticsPanel } from '@/components/analytics/AnalyticsPanel';
import { AnalyticsTable, ColumnDef } from '@/components/analytics/AnalyticsTable';
import {
  PRIMARY_KPIS,
  SECONDARY_KPIS,
  DEPENDENCY_TABS,
  DEPENDENCY_MAP_DATA,
  SELECTED_DEPENDENCY,
  DEPENDENCY_REGISTRY,
  OWNERSHIP_DATA,
  GOVERNANCE_GATES,
  DEPENDENCY_ACTIVITY,
  SUMMARY_CARDS,
  OwnershipRow,
  GovernanceGateRow,
  DependencyActivityRow,
} from '@/data/ecosystem-modules/dependencyMapData';

export function DependencyMapPage() {
  const [selectedDependency, setSelectedDependency] = useState(SELECTED_DEPENDENCY);
  const [selectedRow, setSelectedRow] = useState<DependencyRegistryRow | null>(null);
  const [activeTab, setActiveTab] = useState('Dependency Overview');

  const handleNodeClick = (node: any) => {
    console.log('Node clicked:', node);
  };

  const handleRegistryRowClick = (row: DependencyRegistryRow) => {
    setSelectedRow(row);
    setSelectedDependency({
      from: `${row.fromModule} (${row.fromType})`,
      to: `${row.toModuleService} (${row.toType})`,
      type: 'Dependency Link',
      relationship: row.status === 'Required' ? 'Required' : 'Optional',
      direction: 'Outbound',
      criticality: row.criticality,
      version: row.version,
      environment: 'Production',
      status: row.status,
      compatibility: String(row.compatibility),
      lastValidated: row.lastValidated,
    });
  };

  // Table column definitions
  const ownershipCols: ColumnDef<OwnershipRow>[] = [
    { header: 'Owner', accessorKey: 'owner', align: 'left' },
    { header: 'Owned Dependencies', accessorKey: 'ownedDependencies', align: 'right', cellType: 'number' },
    { header: 'Health', accessorKey: 'health', align: 'right', cellType: 'text' },
  ];

  const governanceCols: ColumnDef<GovernanceGateRow>[] = [
    { header: 'Gate', accessorKey: 'gate', align: 'left' },
    { header: 'Design', accessorKey: 'review', align: 'center', cellType: 'text' },
    { header: 'Security', accessorKey: 'compliance', align: 'center', cellType: 'text' },
    { header: 'Compliance', accessorKey: 'performance', align: 'center', cellType: 'text' },
    { header: 'Performance', accessorKey: 'change', align: 'center', cellType: 'text' },
    { header: 'Change', accessorKey: 'advisory', align: 'center', cellType: 'text' },
  ];

  const activityCols: ColumnDef<DependencyActivityRow>[] = [
    { header: 'Activity', accessorKey: 'activity', align: 'left' },
    { header: 'Source', accessorKey: 'source', align: 'left' },
    { header: 'Target', accessorKey: 'target', align: 'left' },
    { header: 'Type', accessorKey: 'type', align: 'center', cellType: 'text' },
    { header: 'Status', accessorKey: 'status', align: 'center', cellType: 'text' },
    { header: 'User', accessorKey: 'user', align: 'center', cellType: 'text' },
    { header: 'Time', accessorKey: 'time', align: 'right', cellType: 'text' },
  ];

  return (
    <AnalyticsShell>
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Module Dependencies & Compatibility Map
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            Visualize module, capability, service and sector pack relationships, compatibility, version conflicts, upgrade impact, risk, and orchestration logs across the target impact.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors">
            View Change Impact
          </button>
          <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1">
            <Download size={11} /> Export Map
          </button>
          <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors">
            Compare Versions
          </button>
          <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors">
            Service Mesh
          </button>
          <button className="px-3 py-1.5 bg-red-900 hover:bg-red-950 text-white text-xs font-semibold rounded shadow-xs transition-colors">
            Run Compatibility Validation
          </button>
          <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1">
            More Actions <ChevronDown size={11} />
          </button>
        </div>
      </div>

      {/* SCOPE/ENVIRONMENT FILTERS */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs flex-1">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Tenant</span>
            <select className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer">
              <option>SL Beauty</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Environment</span>
            <select className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer">
              <option>Beauty Manufacturing</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Environment Type</span>
            <select className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer">
              <option>Production</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Sector</span>
            <select className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer">
              <option>All</option>
            </select>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Version Scope</span>
            <select className="w-full text-[11px] font-bold text-slate-800 border-0 bg-transparent p-0 focus:ring-0 cursor-pointer">
              <option>All Versions</option>
            </select>
          </div>
        </div>

        {/* DEPENDENCY ENGINE STATUS */}
        <div className="flex items-center gap-3 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-2 md:pt-0 md:pl-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Dependency Engine</span>
            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Healthy
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Compatibility Engine</span>
            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Healthy
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8.5px] font-bold text-slate-400 uppercase block">Last Updated</span>
            <span className="text-[10px] font-semibold text-slate-700">May 14, 2026, 10:15 AM</span>
          </div>
        </div>
      </div>

      {/* PRIMARY KPI ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-2">
        {PRIMARY_KPIS.map((kpi) => {
          const toneColors = {
            success: 'text-emerald-700 bg-emerald-50',
            warning: 'text-orange-700 bg-orange-50',
            danger: 'text-red-700 bg-red-50',
            neutral: 'text-slate-700 bg-slate-50',
          };
          const toneColor = toneColors[kpi.tone] || toneColors.neutral;

          return (
            <div
              key={kpi.id}
              className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs hover:border-slate-300 transition-colors"
            >
              <p className="text-[9px] font-bold text-slate-400 uppercase truncate mb-1">{kpi.label}</p>
              <p className={`text-lg md:text-xl font-bold ${toneColor.split(' ')[0]} truncate`}>{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* SECONDARY KPI ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2">
        {SECONDARY_KPIS.map((kpi) => {
          const toneColors = {
            success: 'text-emerald-700 bg-emerald-50',
            warning: 'text-orange-700 bg-orange-50',
            danger: 'text-red-700 bg-red-50',
            neutral: 'text-slate-700 bg-slate-50',
          };
          const toneColor = toneColors[kpi.tone] || toneColors.neutral;

          return (
            <div
              key={kpi.id}
              className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs hover:border-slate-300 transition-colors"
            >
              <p className="text-[9px] font-bold text-slate-400 uppercase truncate mb-1">{kpi.label}</p>
              <p className={`text-lg md:text-xl font-bold ${toneColor.split(' ')[0]} truncate`}>{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* TAB NAVIGATION */}
      <TabNavigation
        tabs={DEPENDENCY_TABS}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* THREE-COLUMN MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* LEFT: DEPENDENCY NETWORK GRAPH */}
        <div className="lg:col-span-1 min-h-96">
          <DependencyNetworkGraph
            sourceModules={DEPENDENCY_MAP_DATA.sourceModules}
            capabilities={DEPENDENCY_MAP_DATA.capabilities}
            sharedServices={DEPENDENCY_MAP_DATA.sharedServices}
            externalServices={DEPENDENCY_MAP_DATA.externalServices}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* CENTER: SELECTED DEPENDENCY DETAIL */}
        <div className="lg:col-span-1 min-h-96">
          <SelectedDependencyDetail
            from={selectedDependency.from}
            to={selectedDependency.to}
            type={selectedDependency.type}
            relationship={selectedDependency.relationship}
            direction={selectedDependency.direction}
            criticality={selectedDependency.criticality}
            version={selectedDependency.version}
            environment={selectedDependency.environment}
            status={selectedDependency.status}
            compatibility={selectedDependency.compatibility}
            lastValidated={selectedDependency.lastValidated}
            onViewDetails={() => console.log('View details')}
          />
        </div>

        {/* RIGHT: DEPENDENCY REGISTRY */}
        <div className="lg:col-span-1 min-h-96">
          <DependencyRegistry
            data={DEPENDENCY_REGISTRY}
            onApplyFilters={() => console.log('Apply filters')}
            onClearAll={() => console.log('Clear all')}
            onSaveView={() => console.log('Save view')}
            onRefresh={() => console.log('Refresh')}
            onExport={() => console.log('Export')}
            onRowClick={handleRegistryRowClick}
            selectedRowId={selectedRow?.id}
          />
        </div>
      </div>

      {/* SUMMARY CARDS ROW 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {/* Module Dependency Summary */}
        <AnalyticsPanel title="Module Dependency Summary" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Total Modules</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.moduleDependency.totalModules}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">With Dependencies</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.moduleDependency.withDependencies}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Without Dependencies</span><span className="font-semibold text-slate-700">{SUMMARY_CARDS.moduleDependency.withoutDependencies}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Critical Modules</span><span className="font-bold text-red-600">{SUMMARY_CARDS.moduleDependency.criticalModules}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">High Risk Modules</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.moduleDependency.highRiskModules}</span></div>
          </div>
        </AnalyticsPanel>

        {/* Capability Dependency Summary */}
        <AnalyticsPanel title="Capability Dependency Summary" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Total Capabilities</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.capabilityDependency.totalCapabilities}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Required</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.capabilityDependency.required}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Optional</span><span className="font-semibold text-slate-700">{SUMMARY_CARDS.capabilityDependency.optional}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Conditional</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.capabilityDependency.conditional}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Incompatible</span><span className="font-bold text-red-600">{SUMMARY_CARDS.capabilityDependency.incompatible}</span></div>
          </div>
        </AnalyticsPanel>

        {/* Sector Pack Dependency Summary */}
        <AnalyticsPanel title="Sector Pack Dependency Summary" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Total Sector Packs</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.sectorPackDependency.totalSectorPacks}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Fully Compatible</span><span className="font-bold text-green-700">{SUMMARY_CARDS.sectorPackDependency.fullyCompatible}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Partially Compatible</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.sectorPackDependency.partiallyCompatible}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Incompatible</span><span className="font-bold text-red-600">{SUMMARY_CARDS.sectorPackDependency.incompatible}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Not Used</span><span className="font-semibold text-slate-500">{SUMMARY_CARDS.sectorPackDependency.notUsed}</span></div>
          </div>
        </AnalyticsPanel>

        {/* Shared Services Portfolio */}
        <AnalyticsPanel title="Shared Services Portfolio" number="">
          <div className="space-y-1 text-[10px]">
            {SUMMARY_CARDS.sharedServicesPortfolio.map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span className="font-medium">{item.status}</span>
                <span className="font-semibold text-slate-800">{item.services} <span className="text-[9px] text-slate-400">({item.health})</span></span>
              </div>
            ))}
          </div>
        </AnalyticsPanel>

        {/* External Services Portfolio */}
        <AnalyticsPanel title="External Services Portfolio" number="">
          <div className="space-y-1 text-[10px]">
            {SUMMARY_CARDS.externalServicesPortfolio.map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span className="font-medium">{item.status}</span>
                <span className="font-semibold text-slate-800">{item.services} <span className="text-[9px] text-slate-400">({item.health})</span></span>
              </div>
            ))}
          </div>
        </AnalyticsPanel>

        {/* Version Compatibility Matrix */}
        <AnalyticsPanel title="Version Compatibility Matrix" number="">
          <table className="w-full text-[9px] text-center">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="p-0.5">From/To</th>
                {SUMMARY_CARDS.versionCompatibilityMatrix.columns.map((c, i) => (
                  <th key={i} className="p-0.5">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUMMARY_CARDS.versionCompatibilityMatrix.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td className="p-0.5 font-semibold text-slate-700">{row.from}</td>
                  {row.values.map((v, cIdx) => (
                    <td key={cIdx} className="p-0.5 font-bold text-slate-800">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </AnalyticsPanel>

        {/* Version Conflicts */}
        <AnalyticsPanel title="Version Conflicts" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Major Conflicts</span><span className="font-bold text-red-600">{SUMMARY_CARDS.versionConflicts.majorConflicts}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Minor Conflicts</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.versionConflicts.minorConflicts}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Deprecated Versions</span><span className="font-semibold text-slate-800">{SUMMARY_CARDS.versionConflicts.deprecatedVersions}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Pending Migrations</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.versionConflicts.pendingMigrations}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Pending Resolutions</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.versionConflicts.pendingResolutions}</span></div>
          </div>
        </AnalyticsPanel>
      </div>

      {/* SUMMARY CARDS ROW 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        <AnalyticsPanel title="Upgrade Readiness" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-green-700 font-semibold">Ready</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.upgradeReadiness.ready} ({SUMMARY_CARDS.upgradeReadiness.readyPct})</span></div>
            <div className="flex justify-between"><span className="text-orange-600 font-semibold">Needs Upgrade</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.upgradeReadiness.needsUpgrade} ({SUMMARY_CARDS.upgradeReadiness.needsUpgradePct})</span></div>
            <div className="flex justify-between"><span className="text-red-600 font-semibold">Blocked</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.upgradeReadiness.blocked} ({SUMMARY_CARDS.upgradeReadiness.blockedPct})</span></div>
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel title="Circular Dependencies" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Total Detected</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.circularDependencies.totalDetected}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Critical</span><span className="font-bold text-red-600">{SUMMARY_CARDS.circularDependencies.critical}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Resolved</span><span className="font-bold text-green-700">{SUMMARY_CARDS.circularDependencies.resolved}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Pending</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.circularDependencies.pending}</span></div>
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel title="Orphaned Services" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Total Orphaned</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.orphanedServices.totalOrphaned}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">High Impact</span><span className="font-bold text-red-600">{SUMMARY_CARDS.orphanedServices.highImpact}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Medium Impact</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.orphanedServices.mediumImpact}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Low Impact</span><span className="font-bold text-green-700">{SUMMARY_CARDS.orphanedServices.lowImpact}</span></div>
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel title="Blocking Dependencies" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Total Blocking</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.blockingDependencies.totalBlocking}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">By External Service</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.blockingDependencies.byExternalService}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">By Module</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.blockingDependencies.byModule}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">By Version</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.blockingDependencies.byVersion}</span></div>
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel title="Impact & Change Analysis" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Changes Pending</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.impactAnalysis.changesPending}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">High Impact</span><span className="font-bold text-red-600">{SUMMARY_CARDS.impactAnalysis.highImpact}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Medium Impact</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.impactAnalysis.mediumImpact}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Low Impact</span><span className="font-bold text-green-700">{SUMMARY_CARDS.impactAnalysis.lowImpact}</span></div>
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel title="Release Impact Summary" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Next Release Impacted</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.releaseImpact.nextReleaseImpacted}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Modules Impacted</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.releaseImpact.modulesImpacted}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Capabilities Impacted</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.releaseImpact.capabilitiesImpacted}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Services Impacted</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.releaseImpact.servicesImpacted}</span></div>
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel title="Environment Drift" number="">
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Total Drift Items</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.environmentDrift.totalDriftItems}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Critical Drift</span><span className="font-bold text-red-600">{SUMMARY_CARDS.environmentDrift.criticalDrift}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Warning Drift</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.environmentDrift.warningDrift}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Info Drift</span><span className="font-bold text-blue-600">{SUMMARY_CARDS.environmentDrift.infoDrift}</span></div>
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel title="Dependency Health Matrix" number="">
          <div className="flex items-center justify-center mb-2">
            <CompatibilityScore score={94} size="sm" />
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-slate-600">Overall Health</span><span className="font-bold text-slate-900">{SUMMARY_CARDS.dependencyHealth.overallHealth}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Warning</span><span className="font-bold text-orange-600">{SUMMARY_CARDS.dependencyHealth.warning}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Critical</span><span className="font-bold text-red-600">{SUMMARY_CARDS.dependencyHealth.critical}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Blocked</span><span className="font-bold text-red-600">{SUMMARY_CARDS.dependencyHealth.blocked}</span></div>
          </div>
        </AnalyticsPanel>
      </div>

      {/* OWNERSHIP & ACCOUNTABILITY */}
      <AnalyticsPanel title="Ownership & Accountability" number="">
        <AnalyticsTable
          columns={ownershipCols}
          data={OWNERSHIP_DATA}
        />
      </AnalyticsPanel>

      {/* GOVERNANCE GATES */}
      <AnalyticsPanel title="Governance Gates" number="">
        <AnalyticsTable
          columns={governanceCols}
          data={GOVERNANCE_GATES}
        />
      </AnalyticsPanel>

      {/* RECENT DEPENDENCY ACTIVITY */}
      <AnalyticsPanel title="Recent Dependency Activity" number="">
        <AnalyticsTable
          columns={activityCols}
          data={DEPENDENCY_ACTIVITY}
        />
      </AnalyticsPanel>
    </AnalyticsShell>
  );
}
