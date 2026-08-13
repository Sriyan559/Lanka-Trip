'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { DependencyNetworkGraph } from './DependencyNetworkGraph';
import { SelectedDependencyDetail } from './SelectedDependencyDetail';
import { DependencyRegistry, DependencyRegistryRow } from './DependencyRegistry';
import { CompatibilityScore } from './CompatibilityScore';
import {
  DEPENDENCY_MAP_DATA,
  SELECTED_DEPENDENCY,
  DEPENDENCY_REGISTRY,
} from '@/data/ecosystem-modules/dependencyMapData';

export function DependencyMapPage() {
  const [selectedDependency, setSelectedDependency] = useState(SELECTED_DEPENDENCY);
  const [selectedRow, setSelectedRow] = useState<DependencyRegistryRow | null>(null);

  const handleNodeClick = (node: any) => {
    // Update selected dependency based on node click
    console.log('Node clicked:', node);
  };

  const handleRegistryRowClick = (row: DependencyRegistryRow) => {
    setSelectedRow(row);
    // Update selected dependency detail
    setSelectedDependency({
      from: `${row.fromModule} (${row.fromType})`,
      to: `${row.toModuleService} (${row.toType})`,
      type: 'Dependency Link',
      relationship: row.status === 'Required' ? 'Required' : 'Optional',
      direction: 'Outbound',
      criticality: row.criticality as 'High' | 'Medium' | 'Low',
      version: row.version,
      environment: 'Production',
      status: row.status,
      compatibility: String(row.compatibility),
      lastValidated: row.lastValidated,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Module Dependencies & Compatibility Map</h1>
          <p className="text-sm text-gray-600 mt-1">
            Visualize module, capability, service, and external dependency relationships, compatibility,
            version conflicts, and upgrade impact
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded shadow-sm flex items-center gap-1">
            <Download size={14} /> Export Map
          </button>
        </div>
      </div>

      {/* Three-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr_1.2fr] gap-4 items-stretch">
        {/* Left Panel: Ecosystem Dependency Map */}
        <div className="min-h-96">
          <DependencyNetworkGraph
            sourceModules={DEPENDENCY_MAP_DATA.sourceModules}
            capabilities={DEPENDENCY_MAP_DATA.capabilities}
            sharedServices={DEPENDENCY_MAP_DATA.sharedServices}
            externalServices={DEPENDENCY_MAP_DATA.externalServices}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* Center Panel: Selected Dependency Detail */}
        <div className="min-h-96">
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

        {/* Right Panel: Dependency Registry */}
        <div className="min-h-96">
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

      {/* Optional: Add additional sections below if needed */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Compatibility Health</h3>
          <div className="flex justify-center">
            <CompatibilityScore score={94} size="sm" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Total Dependencies</h3>
          <div className="text-3xl font-bold text-gray-900">{DEPENDENCY_REGISTRY.length}</div>
          <p className="text-xs text-gray-600 mt-1">Active relationships</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Risk Assessment</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">High</span>
              <span className="font-bold text-red-600">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Medium</span>
              <span className="font-bold text-orange-600">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low</span>
              <span className="font-bold text-green-600">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Compatibility Status</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Compatible</span>
              <span className="font-bold text-green-600">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Warning</span>
              <span className="font-bold text-orange-600">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Blocked</span>
              <span className="font-bold text-red-600">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
