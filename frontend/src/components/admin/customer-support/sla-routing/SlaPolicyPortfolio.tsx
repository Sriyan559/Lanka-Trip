'use client';

import React from 'react';
import { Eye, Edit2, Copy, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { SlaPolicyItem } from '@/types/slaRouting';

interface SlaPolicyPortfolioProps {
  policies: SlaPolicyItem[];
  selectedPolicyId: string;
  onSelectPolicy: (id: string) => void;
  onViewPolicy?: (policy: SlaPolicyItem) => void;
  onEditPolicy?: (policy: SlaPolicyItem) => void;
  onClonePolicy?: (policy: SlaPolicyItem) => void;
}

export function SlaPolicyPortfolio({
  policies,
  selectedPolicyId,
  onSelectPolicy,
  onViewPolicy,
  onEditPolicy,
  onClonePolicy,
}: SlaPolicyPortfolioProps) {
  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-2xs overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold text-slate-900">SLA Policy Portfolio</h2>
          <span className="text-[11px] text-slate-500 font-normal">({policies.length} policies)</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
              <th className="py-2 px-2.5">Policy Name</th>
              <th className="py-2 px-2">Policy ID</th>
              <th className="py-2 px-2">Type</th>
              <th className="py-2 px-2">Scope</th>
              <th className="py-2 px-2">Category</th>
              <th className="py-2 px-2">Priority</th>
              <th className="py-2 px-2">Customer Tier</th>
              <th className="py-2 px-2">Channel</th>
              <th className="py-2 px-2">First Response</th>
              <th className="py-2 px-2">Update Interval</th>
              <th className="py-2 px-2">Resolution</th>
              <th className="py-2 px-2">Escalation Threshold</th>
              <th className="py-2 px-2">Business Calendar</th>
              <th className="py-2 px-2">Version</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Approval</th>
              <th className="py-2 px-2">Last Updated</th>
              <th className="py-2 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {policies.map((p) => {
              const isSelected = selectedPolicyId === p.id;
              return (
                <tr
                  key={p.id}
                  onClick={() => onSelectPolicy(p.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-rose-50/60 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-2 px-2.5 font-bold text-slate-900">{p.policyName}</td>
                  <td className="py-2 px-2 font-mono text-[10px] text-slate-500">{p.policyId}</td>
                  <td className="py-2 px-2 text-slate-600">{p.type}</td>
                  <td className="py-2 px-2 text-slate-600">{p.scope}</td>
                  <td className="py-2 px-2">{p.category}</td>
                  <td className="py-2 px-2">
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${getPriorityBadge(p.priority)}`}>
                      {p.priority}
                    </span>
                  </td>
                  <td className="py-2 px-2">{p.customerTier}</td>
                  <td className="py-2 px-2">{p.channel}</td>
                  <td className="py-2 px-2 font-semibold text-slate-900">{p.firstResponse}</td>
                  <td className="py-2 px-2 font-semibold text-slate-900">{p.updateInterval}</td>
                  <td className="py-2 px-2 font-semibold text-slate-900">{p.resolution}</td>
                  <td className="py-2 px-2">{p.escalationThreshold}</td>
                  <td className="py-2 px-2 text-slate-600">{p.businessCalendar}</td>
                  <td className="py-2 px-2 font-mono text-slate-600">{p.version}</td>
                  <td className="py-2 px-2">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                      <CheckCircle2 size={11} className="text-emerald-600" />
                      {p.approvalState}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-slate-500 text-[10px] whitespace-nowrap">{p.lastUpdated}</td>
                  <td className="py-2 px-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 text-slate-400 hover:text-slate-600">
                      <button
                        type="button"
                        onClick={() => onViewPolicy && onViewPolicy(p)}
                        className="p-1 hover:bg-slate-100 rounded"
                        title="View Policy"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditPolicy && onEditPolicy(p)}
                        className="p-1 hover:bg-slate-100 rounded"
                        title="Edit Policy"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onClonePolicy && onClonePolicy(p)}
                        className="p-1 hover:bg-slate-100 rounded"
                        title="Clone Policy"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
