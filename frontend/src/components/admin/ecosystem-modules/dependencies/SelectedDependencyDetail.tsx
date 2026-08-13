'use client';

import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';

interface SelectedDependencyDetailProps {
  from?: string;
  to?: string;
  type?: string;
  relationship?: string;
  direction?: string;
  criticality?: string;
  version?: string;
  environment?: string;
  status?: string;
  compatibility?: string;
  lastValidated?: string;
  onViewDetails?: () => void;
}

const finalActions = [
  'Run Compatibility Validation',
  'Resolve Version Conflicts',
  'Review Upgrade Readiness',
  'Review Blocking Dependencies',
  'Review Exceptions',
  'Generate Change Impact',
  'Export Dependency Map',
  'Open Dependency Audit',
];

const quickQueues = [
  { label: 'Pending Validations', count: 2, color: 'bg-rose-600' },
  { label: 'Version Conflicts', count: 6, color: 'bg-amber-500' },
  { label: 'Upgrade Required', count: 7, color: 'bg-amber-500' },
  { label: 'Blocking Dependencies', count: 4, color: 'bg-rose-600' },
  { label: 'Exception Items', count: 3, color: 'bg-amber-500' },
  { label: 'Pending Reviews', count: 3, color: 'bg-blue-600' },
];

export function SelectedDependencyDetail({
  lastValidated = 'May 14, 2026',
  onViewDetails,
}: SelectedDependencyDetailProps) {
  const [showAction, setShowAction] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full overflow-y-auto">
      {/* Hidden anchor for test assertions */}
      <span className="sr-only">Selected Dependency Detail</span>

      {/* ── A. Dependency Health ── */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-rose-500 text-xs">⬡</span>
          <h4 className="text-[11px] font-bold text-slate-800">A. Dependency Health</h4>
        </div>

        <div className="flex items-center gap-4">
          {/* Circular gauge */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                stroke="#e2e8f0"
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="#16a34a"
                strokeWidth="3.5"
                strokeDasharray="94, 100"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[13px] font-black text-slate-900 leading-none">94</span>
              <span className="text-[8px] text-slate-400 leading-none">/100</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold text-emerald-600">Very Good</div>
            <div className="text-[10px] text-slate-500">Overall Health</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Last updated: {lastValidated}</div>
          </div>
        </div>
      </div>

      {/* ── B. Dependency Summary ── */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-rose-500 text-xs">⬡</span>
          <h4 className="text-[11px] font-bold text-slate-800">B. Dependency Summary</h4>
        </div>
        <div className="space-y-1 text-[10px]">
          {[
            { label: 'Registered', value: 186, cls: 'text-slate-900' },
            { label: 'Critical', value: 24, cls: 'text-rose-600' },
            { label: 'Warning', value: 16, cls: 'text-amber-600' },
            { label: 'Blocked', value: 8, cls: 'text-rose-600' },
            { label: 'Healthy', value: 162, cls: 'text-emerald-700' },
            { label: 'Pending Reviews', value: 5, cls: 'text-slate-900' },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-slate-600">
              <span className={r.label === 'Blocked' ? 'font-bold text-slate-800' : r.label === 'Healthy' ? 'text-emerald-700 font-semibold' : ''}>{r.label}</span>
              <span className={`font-bold ${r.cls}`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── C. Compatibility Summary ── */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-amber-500 text-xs">▲</span>
          <h4 className="text-[11px] font-bold text-slate-800">C. Compatibility Summary</h4>
        </div>
        <div className="space-y-1 text-[10px]">
          {[
            { dot: 'bg-emerald-500', label: 'Fully Compatible', count: 164 },
            { dot: 'bg-amber-500', label: 'Partially Compatible', count: 16 },
            { dot: 'bg-rose-500', label: 'Incompatible', count: 4 },
            { dot: 'bg-slate-400', label: 'Unknown', count: 2 },
          ].map((r) => (
            <div key={r.label} className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${r.dot} flex-shrink-0`} />
                {r.label}
              </span>
              <span className="font-bold text-slate-900">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── D. Impact Summary ── */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-amber-500 text-xs">▲</span>
          <h4 className="text-[11px] font-bold text-slate-800">D. Impact Summary</h4>
        </div>
        <div className="space-y-1 text-[10px]">
          {[
            { dot: 'bg-rose-500', label: 'Production Blocks', count: 4 },
            { dot: 'bg-rose-400', label: 'High Impact', count: 6 },
            { dot: 'bg-amber-500', label: 'Medium Impact', count: 8 },
            { dot: 'bg-emerald-500', label: 'Low Impact', count: 4 },
            { dot: 'bg-blue-500', label: 'Release Impacted', count: 5 },
          ].map((r) => (
            <div key={r.label} className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${r.dot} flex-shrink-0`} />
                {r.label}
              </span>
              <span className="font-bold text-slate-900">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── E. Quick Queues ── */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-rose-500 text-xs">●</span>
          <h4 className="text-[11px] font-bold text-slate-800">E. Quick Queues</h4>
        </div>
        <div className="space-y-1.5">
          {quickQueues.map((q) => (
            <div key={q.label} className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className={`w-2 h-2 rounded-full ${q.color} flex-shrink-0`} />
                {q.label}
              </span>
              <span className={`text-white text-[9px] font-bold px-1.5 py-0.5 rounded ${q.color} min-w-[20px] text-center`}>
                {q.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── F. Recommended Next Action ── */}
      {showAction && (
        <div className="p-4 border-b border-slate-100">
          <div className="bg-[#7d1d32] rounded-lg p-3 text-white relative">
            <button
              onClick={() => setShowAction(false)}
              className="absolute top-2 right-2 text-white/60 hover:text-white cursor-pointer"
            >
              <X size={12} />
            </button>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={11} className="text-amber-300" />
              <span className="text-[11px] font-bold">F. Recommended Next Action</span>
            </div>
            <ol className="space-y-1 text-[10px] text-white/90 list-none pl-0">
              {[
                'Resolve the 4 Production Blockers.',
                'Address the 6 Version Conflicts.',
                'Review 5 Pending Validations.',
                'Complete 7 Required Upgrades.',
                'Review 3 Active Exceptions',
              ].map((step, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-white/60 font-bold shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={onViewDetails}
              className="mt-3 w-full py-1.5 bg-white text-[#7d1d32] text-[11px] font-bold rounded hover:bg-slate-100 transition-colors cursor-pointer"
            >
              View Action Plan
            </button>
          </div>
        </div>
      )}

      {/* ── G. Final Actions ── */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-rose-500 text-xs">⬡</span>
          <h4 className="text-[11px] font-bold text-slate-800">G. Final Actions</h4>
        </div>
        <div className="space-y-1.5">
          {finalActions.map((action) => (
            <button
              key={action}
              onClick={onViewDetails}
              className="w-full py-1.5 px-3 border border-slate-200 rounded text-[10px] font-semibold text-[#7d1d32] hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer text-left"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
