'use client';

import React, { useState } from 'react';
import { Sliders, Maximize2, ZoomOut, ZoomIn, Search } from 'lucide-react';

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
  selectedNodeId?: string;
}

const nodeTypeStyles = {
  module: 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold',
  capability: 'bg-blue-50 border-blue-200 text-blue-900 font-semibold',
  shared: 'bg-blue-50 border-blue-200 text-blue-900 font-medium',
  external: 'bg-purple-50/80 border-purple-200 text-purple-900 font-semibold',
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
  selectedNodeId,
}: DependencyNetworkGraphProps) {
  const [zoom, setZoom] = useState(100);
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);

  React.useEffect(() => {
    if (selectedNodeId) {
      const found = [
        ...sourceModules,
        ...capabilities,
        ...sharedServices,
        ...externalServices,
      ].find((n) => n.id === selectedNodeId);
      if (found) {
        setSelectedNode(found);
      }
    }
  }, [selectedNodeId, sourceModules, capabilities, sharedServices, externalServices]);

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
        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 p-1 rounded-md border border-slate-100">
          <button
            onClick={() => handleZoom(0)}
            className="px-2 py-0.5 hover:bg-white hover:shadow-sm rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer border border-transparent hover:border-slate-200"
            title="Layout"
          >
            <Sliders size={11} /> Layout
          </button>
          <button
            onClick={() => setZoom(100)}
            className="px-2 py-0.5 hover:bg-white hover:shadow-sm rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer border border-transparent hover:border-slate-200"
            title="Fit"
          >
            <Search size={11} /> Fit
          </button>
          <div className="h-4 w-px bg-slate-200 mx-0.5"></div>
          <button
            onClick={() => handleZoom(-10)}
            className="w-5 h-5 flex items-center justify-center hover:bg-white hover:shadow-sm rounded cursor-pointer border border-transparent hover:border-slate-200"
            title="Zoom Out"
          >
            <span className="text-xs font-bold font-mono">-</span>
          </button>
          <span className="text-[10px] font-bold text-slate-700 px-1 text-center min-w-8">{zoom}%</span>
          <button
            onClick={() => handleZoom(10)}
            className="w-5 h-5 flex items-center justify-center hover:bg-white hover:shadow-sm rounded cursor-pointer border border-transparent hover:border-slate-200"
            title="Zoom In"
          >
            <span className="text-xs font-bold font-mono">+</span>
          </button>
          <div className="h-4 w-px bg-slate-200 mx-0.5"></div>
          <button
            className="p-1 hover:bg-white hover:shadow-sm rounded cursor-pointer border border-transparent hover:border-slate-200"
            title="Search"
          >
            <Search size={11} />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1 hover:bg-white hover:shadow-sm rounded cursor-pointer border border-transparent hover:border-slate-200"
            title="Fullscreen"
          >
            <Maximize2 size={11} />
          </button>
        </div>
      </div>

      {/* Graph Grid */}
      <div className="flex-1 overflow-auto relative">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
          className="transition-transform duration-200 relative min-w-max min-h-[310px]"
        >
          {/* SVG Connection Lines Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0" style={{ minWidth: '640px', minHeight: '300px' }}>
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="4.5"
                markerHeight="4.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#cbd5e1" />
              </marker>
            </defs>

            {/* Column 1 (Source Modules) -> Column 2 (Capabilities) */}
            {/* Green lines representing Required/Healthy connections */}
            <path d="M 125 72 C 145 72, 145 42, 185 42" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 72 C 145 72, 145 77, 185 77" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 72 C 145 72, 145 112, 185 112" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 72 C 145 72, 145 147, 185 147" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />

            <path d="M 125 180 C 145 180, 145 112, 185 112" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 180 C 145 180, 145 147, 185 147" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 180 C 145 180, 145 182, 185 182" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 180 C 145 180, 145 217, 185 217" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />

            <path d="M 125 288 C 145 288, 145 217, 185 217" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 288 C 145 288, 145 252, 185 252" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />
            <path d="M 125 288 C 145 288, 145 287, 185 287" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" markerEnd="url(#arrowhead)" />

            {/* Column 2 (Capabilities) -> Column 3 (Shared Services) */}
            <path d="M 285 42 C 305 42, 305 42, 345 42" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 285 77 C 305 77, 305 77, 345 77" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 285 112 C 305 112, 305 112, 345 112" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 285 147 C 305 147, 305 147, 345 147" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 285 182 C 305 182, 305 182, 345 182" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 285 217 C 305 217, 305 217, 345 217" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 285 252 C 305 252, 305 252, 345 252" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />

            {/* Column 3 (Shared Services) -> Column 4 (External Services) */}
            <path d="M 445 42 C 465 42, 465 42, 505 42" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 445 77 C 465 77, 465 87, 505 87" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 445 112 C 465 112, 465 132, 505 132" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 445 147 C 465 147, 465 177, 505 177" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 445 182 C 465 182, 465 222, 505 222" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.65" markerEnd="url(#arrowhead)" />
            <path d="M 445 217 C 465 217, 465 267, 505 267" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.65" markerEnd="url(#arrowhead)" />
          </svg>

          <div className="grid grid-cols-4 gap-4 p-2 min-h-[300px] min-w-max relative z-10">
            {/* Column 1: Source Modules */}
            <div className="space-y-3 pt-6 w-28">
              <span className="block font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-2">
                Source Modules
              </span>
              {sourceModules.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-2 rounded border text-center shadow-xs cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{ minHeight: '36px' }}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {/* Column 2: Capabilities */}
            <div className="space-y-2 w-32">
              <span className="block font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-2">
                Capabilities
              </span>
              {capabilities.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-1.5 rounded border text-center shadow-xs cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{ minHeight: '27px' }}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {/* Column 3: Shared Services */}
            <div className="space-y-2 w-32">
              <span className="block font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-2">
                Shared Services
              </span>
              {sharedServices.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-1.5 rounded border text-center shadow-xs cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{ minHeight: '27px' }}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {/* Column 4: External Services */}
            <div className="space-y-2 w-32">
              <span className="block font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-2">
                External Services
              </span>
              {externalServices.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-1.5 rounded border text-center shadow-xs cursor-pointer transition-all ${nodeTypeStyles[node.type]} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                  style={{ minHeight: '27px' }}
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
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <span className="w-3 h-0.5 bg-emerald-500 rounded"></span> Required (Healthy)
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-600">
            <span className="w-3 h-0.5 bg-amber-500 rounded"></span> Warning / Conditional
          </span>
          <span className="flex items-center gap-1 font-semibold text-rose-600">
            <span className="w-3 h-0.5 bg-rose-500 rounded"></span> Blocked / Incompatible
          </span>
          <span className="flex items-center gap-1 font-semibold text-blue-600">
            <span className="w-3 h-0.5 bg-blue-500 rounded"></span> Shared Dependencies
          </span>
        </div>
      </div>
    </div>
  );
}
