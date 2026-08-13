'use client';

import React, { useState } from 'react';
import { Sliders, Maximize2, ZoomOut, ZoomIn } from 'lucide-react';

interface DependencyNode {
  id: string;
  label: string;
  type: 'module' | 'capability' | 'shared' | 'external';
  status?: 'required' | 'warning' | 'blocked' | 'shared';
}

interface DependencyEdge {
  from: string;
  to: string;
  status: 'required' | 'warning' | 'blocked' | 'shared';
}

interface DependencyNetworkGraphProps {
  sourceModules: DependencyNode[];
  capabilities: DependencyNode[];
  sharedServices: DependencyNode[];
  externalServices: DependencyNode[];
  edges?: DependencyEdge[];
  onNodeClick?: (node: DependencyNode) => void;
  onEdgeClick?: (edge: DependencyEdge) => void;
}

const nodeTypeStyles = {
  module: 'bg-green-50 border-green-300 text-green-900',
  capability: 'bg-blue-50 border-blue-200 text-blue-900',
  shared: 'bg-slate-50 border-slate-200 text-slate-800',
  external: 'bg-purple-50 border-purple-200 text-purple-900',
};

const edgeColors = {
  required: '#10b981',
  warning: '#f59e0b',
  blocked: '#ef4444',
  shared: '#3b82f6',
};

export function DependencyNetworkGraph({
  sourceModules,
  capabilities,
  sharedServices,
  externalServices,
  edges = [],
  onNodeClick,
  onEdgeClick,
}: DependencyNetworkGraphProps) {
  const [zoom, setZoom] = useState(100);
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);

  const handleNodeClick = (node: DependencyNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);
  };

  const handleZoom = (delta: number) => {
    setZoom(Math.max(50, Math.min(200, zoom + delta)));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-slate-200 p-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-slate-800">Ecosystem Dependency Map</h4>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9.5px] font-semibold rounded">
            Live Topology
          </span>
        </div>

        {/* Graph Controls */}
        <div className="flex items-center gap-1 text-slate-500">
          <button
            onClick={() => handleZoom(0)}
            className="p-1 hover:bg-slate-100 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
            title="Layout"
          >
            <Sliders size={11} /> Layout
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1 hover:bg-slate-100 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
            title="Fit"
          >
            <Maximize2 size={11} /> Fit
          </button>
          <button
            onClick={() => handleZoom(-10)}
            className="p-1 hover:bg-slate-100 rounded cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={11} />
          </button>
          <span className="text-[10px] font-bold text-slate-700 px-1 min-w-12">{zoom}%</span>
          <button
            onClick={() => handleZoom(10)}
            className="p-1 hover:bg-slate-100 rounded cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={11} />
          </button>
        </div>
      </div>

      {/* Graph Grid */}
      <div className="flex-1 overflow-auto">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
          className="transition-transform duration-200"
        >
          <div className="grid grid-cols-4 gap-4 p-2 min-h-[300px] min-w-max">
            {/* Column 1: Source Modules */}
            <div className="space-y-3">
              <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">
                Source Modules
              </span>
              {sourceModules.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-2 rounded border-2 font-bold text-[9px] shadow-sm cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                  }`}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {/* Column 2: Capabilities */}
            <div className="space-y-2">
              <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">
                Capabilities
              </span>
              {capabilities.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-1.5 rounded border-2 font-semibold text-[8.5px] shadow-sm cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                  }`}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {/* Column 3: Shared Services */}
            <div className="space-y-2">
              <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">
                Shared Services
              </span>
              {sharedServices.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-1.5 rounded border-2 font-medium text-[8.5px] shadow-sm cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                  }`}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {/* Column 4: External Services */}
            <div className="space-y-2">
              <span className="block font-bold text-slate-400 uppercase text-[8.5px] mb-2">
                External Services
              </span>
              {externalServices.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-1.5 rounded border-2 font-semibold text-[8.5px] shadow-sm cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                  }`}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[9.5px]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-green-700">
            <span className="w-3 h-0.5 bg-green-500 rounded"></span> Required (Healthy)
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-600">
            <span className="w-3 h-0.5 bg-amber-500 rounded"></span> Warning / Conditional
          </span>
          <span className="flex items-center gap-1 font-semibold text-red-600">
            <span className="w-3 h-0.5 bg-red-500 rounded"></span> Blocked / Incompatible
          </span>
          <span className="flex items-center gap-1 font-semibold text-blue-600">
            <span className="w-3 h-0.5 bg-blue-500 rounded"></span> Shared Dependencies
          </span>
        </div>
      </div>
    </div>
  );
}
