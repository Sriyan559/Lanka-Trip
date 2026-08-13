'use client';

import React from 'react';
import { CheckCircle2, Eye, GitCompare, Copy, Plus } from 'lucide-react';
import { PolicyVersionItem } from '@/types/slaRouting';

interface DetailRow4Props {
  versions: PolicyVersionItem[];
  onNewVersion?: () => void;
  onCompareVersions?: () => void;
  onCloneVersion?: () => void;
  onRollbackProposal?: () => void;
}

export function DetailRow4({
  versions,
  onNewVersion,
  onCompareVersions,
  onCloneVersion,
  onRollbackProposal,
}: DetailRow4Props) {
  const workflowSteps = [
    { name: 'Draft', date: 'Jul 12, 2026', done: true },
    { name: 'Validation', date: 'Jul 13, 2026', done: true },
    { name: 'Support Ops Review', date: 'Jul 13, 2026', done: true },
    { name: 'Governance Review', date: 'Jul 14, 2026', done: true },
    { name: 'Approved', date: 'Jul 14, 2026', done: true },
    { name: 'Scheduled', date: 'Jul 15, 2026', done: true },
    { name: 'Active', date: 'Jul 15, 2026', done: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.10fr)_minmax(0,1.30fr)_minmax(0,2.50fr)_minmax(0,1.30fr)_minmax(0,1.40fr)] gap-2 text-xs items-start">
      {/* 16. Evaluation Trace */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">16. Evaluation Trace</h4>
          <ul className="space-y-1 text-[10px]">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                Target matched
              </span>
              <span className="text-emerald-600 font-bold">Success</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                SLA parameters validated
              </span>
              <span className="text-emerald-600 font-bold">Success</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                Capacity available
              </span>
              <span className="text-emerald-600 font-bold">Success</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                Policy matched
              </span>
              <span className="text-emerald-600 font-bold">Success</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                Escalation path valid
              </span>
              <span className="text-emerald-600 font-bold">Success</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-700">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                Routing assigned
              </span>
              <span className="text-emerald-600 font-bold">Success</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 17. Validation Matrix */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">17. Validation Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Criterion</th>
                  <th className="py-1 px-1">Status</th>
                  <th className="py-1 px-1">Rule</th>
                  <th className="py-1 px-1">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Service Level Valid</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                  <td className="py-1 px-1 text-slate-600 whitespace-nowrap">Escalation Target</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Non-Overlapping Breach</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                  <td className="py-1 px-1 text-slate-600 whitespace-nowrap">Queue Status</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Queue Status</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                  <td className="py-1 px-1 text-slate-600 whitespace-nowrap">Authorized Scope</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Team Criteria</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                  <td className="py-1 px-1 text-slate-600 whitespace-nowrap">Authorization Present</td>
                  <td className="py-1 px-1 text-emerald-600 font-bold">Valid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1 mt-1 border-t border-slate-100 text-center">
          <span className="text-emerald-700 font-bold text-[10px]">
            Overall Validation — <strong className="text-emerald-600">96% Valid</strong>
          </span>
        </div>
      </div>

      {/* 18. Approval Workflow */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-2 text-xs">18. Approval Workflow</h4>

          {/* 7-Stage Horizontal Workflow */}
          <div className="grid grid-cols-7 gap-1 text-center relative py-1.5 items-start">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center z-10 min-w-0">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1 text-[10px] shrink-0">
                  <CheckCircle2 size={12} />
                </div>
                <span className="text-[10px] font-bold text-slate-800 leading-tight block whitespace-normal break-words w-full">
                  {step.name}
                </span>
                <span className="text-[8px] text-slate-400 font-medium block whitespace-nowrap mt-0.5">
                  {step.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 19. Version History */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">19. Version History</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Version</th>
                  <th className="py-1 px-1">Status</th>
                  <th className="py-1 px-1">Effective From</th>
                  <th className="py-1 px-1">Changes</th>
                  <th className="py-1 px-1 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {versions.map((v) => (
                  <tr key={v.version} className="hover:bg-slate-50">
                    <td className="py-1 px-1 font-mono font-bold text-slate-900">{v.version}</td>
                    <td className="py-1 px-1">
                      <span
                        className={`px-1 py-0.2 rounded font-semibold text-[8px] ${
                          v.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-1 px-1 text-slate-500 whitespace-nowrap">{v.effectiveFrom}</td>
                    <td className="py-1 px-1 font-medium whitespace-nowrap">{v.changesCount} Changes</td>
                    <td className="py-1 px-1 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-400">
                        <Eye size={10} className="hover:text-slate-700 cursor-pointer" />
                        <GitCompare size={10} className="hover:text-slate-700 cursor-pointer" />
                        <Copy size={10} className="hover:text-slate-700 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1.5 mt-1 border-t border-slate-100 flex flex-wrap items-center gap-1 text-[9px]">
          <button type="button" onClick={onNewVersion} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold hover:bg-slate-200 flex items-center gap-0.5">
            <Plus size={8} /> New
          </button>
          <button type="button" onClick={onCompareVersions} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold hover:bg-slate-200">
            Compare
          </button>
          <button type="button" onClick={onCloneVersion} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold hover:bg-slate-200">
            Clone
          </button>
          <button type="button" onClick={onRollbackProposal} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold hover:bg-slate-200 text-rose-700">
            Create rollback proposal
          </button>
        </div>
      </div>

      {/* 20. Change Impact Analysis */}
      <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs flex flex-col justify-between h-auto min-h-0 self-start min-w-0">
        <div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-xs">20. Change Impact Analysis</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="py-1 px-1">Impact Area</th>
                  <th className="py-1 px-1">First Response</th>
                  <th className="py-1 px-1">Update Interval</th>
                  <th className="py-1 px-1">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Queue Capacity</td>
                  <td className="py-1 px-1 text-slate-700">15m</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">-10m</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">-33%</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Workload</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">+7%</td>
                  <td className="py-1 px-1 text-emerald-600 font-semibold">+6%</td>
                  <td className="py-1 px-1 text-slate-300">—</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Compliance</td>
                  <td className="py-1 px-1 text-amber-700">Fair</td>
                  <td className="py-1 px-1 text-amber-700">Fair</td>
                  <td className="py-1 px-1 text-amber-700">Fair</td>
                </tr>
                <tr>
                  <td className="py-1 px-1 font-medium whitespace-nowrap">Escalation Risk</td>
                  <td className="py-1 px-1 text-emerald-700 font-bold">Low</td>
                  <td className="py-1 px-1 text-amber-700 font-bold">Medium</td>
                  <td className="py-1 px-1 text-rose-600 font-bold">-5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-1 mt-1 border-t border-slate-100 flex items-center justify-between">
          <span className="text-slate-500 font-medium text-[10px]">Risk Level:</span>
          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">
            Medium
          </span>
        </div>
      </div>
    </div>
  );
}
