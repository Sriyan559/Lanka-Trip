'use client';

import React from 'react';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { Flame, Plus, CheckSquare, Clock, AlertTriangle, ChevronRight, FileCheck, ShieldAlert } from 'lucide-react';

interface WorkflowRightRailProps {
  onNavigateTab: (tabId: string) => void;
  onActionClick: (actionKey: string) => void;
}

export function WorkflowRightRail({ onNavigateTab, onActionClick }: WorkflowRightRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Workflow Health */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Workflow Health
        </h4>
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
          <HealthScore score={96} max={100} label="Excellent" size="sm" />
          <div className="text-right">
            <span className="text-[9px] text-gray-400 block uppercase">Overall Status</span>
            <span className="text-xs font-bold text-emerald-700">96% Healthy</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('process-health')}
          className="w-full mt-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[10px] font-bold rounded text-center border border-gray-200 transition-colors"
        >
          View Health Scorecard →
        </button>
      </div>

      {/* 2. Workflow Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Workflow Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Definition Registry</span><span className="font-bold text-gray-900">42</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Active Workflows</span><span className="font-bold text-emerald-700">36</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Versions</span><span className="font-bold text-gray-900">78</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Stages</span><span className="font-bold text-gray-900">214</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Routing Rules</span><span className="font-bold text-gray-900">96</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Approval Policies</span><span className="font-bold text-gray-900">34</span></div>
        </div>
      </div>

      {/* 3. Runtime Summary */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Runtime Summary
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">Active Instances</span><span className="font-bold text-gray-900">1,284</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Pending Approval</span><span className="font-bold text-amber-700">28</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Deferred</span><span className="font-bold text-gray-900">3</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Request Changes</span><span className="font-bold text-amber-700">26</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Rejected</span><span className="font-bold text-rose-700">42</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">SLA Breaches</span><span className="font-bold text-rose-700">6</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Active Escalations</span><span className="font-bold text-amber-700">7</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Overdue Tasks</span><span className="font-bold text-rose-700">9</span></div>
        </div>
      </div>

      {/* 4. Workflow Risk */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Workflow Risk
        </h4>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center"><span className="text-gray-500">High Risk Workflows</span><span className="font-bold text-rose-700">4</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">High Risk Instances</span><span className="font-bold text-rose-700">12</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Step-Up Required</span><span className="font-bold text-amber-700">18</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Segregation Risk</span><span className="font-bold text-gray-900">2</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Potential Conflicts</span><span className="font-bold text-amber-700">5</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500">Review Overdue</span><span className="font-bold text-purple-700">3</span></div>
        </div>
      </div>

      {/* 5. Quick Queues */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[10px]">
          <button type="button" onClick={() => onNavigateTab('approval-queue')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Pending Approval</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">28</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('sla-escalation')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">SLA Breaches</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">6</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('active-instances')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Blocked Workflows</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">4</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('sla-escalation')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Escalated</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">7</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('active-instances')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Request Changes</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">26</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('reviews')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Reviews Due</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-1.5 py-0.25 rounded text-[9px]">3</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Exceptions</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.25 rounded text-[9px]">5</span>
          </button>
          <button type="button" onClick={() => onNavigateTab('activity')} className="w-full flex justify-between items-center p-1 hover:bg-gray-50 rounded text-left">
            <span className="text-gray-600">Overdue Tasks</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.25 rounded text-[9px]">9</span>
          </button>
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <div className="bg-rose-950 text-white rounded p-3 shadow-sm border border-rose-900 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended Next Action</span>
        </div>
        <p className="text-[10px] text-rose-100 leading-relaxed font-medium">
          Resolve the 6 SLA breaches before the next production deployment window. High-risk configuration Step-Up approvals need approval and extended review.
        </p>
        <div className="text-[9px] text-rose-200 font-semibold border-t border-rose-900 pt-1 mt-1">
          Owner: Workflow Administration | Due: Aug 13, 2025
        </div>
        <button
          type="button"
          onClick={() => onActionClick('review_sla_breaches')}
          className="w-full mt-1 py-1.5 bg-rose-900 hover:bg-rose-800 text-white text-[10px] font-bold rounded text-center transition-colors border border-rose-700 shadow-xs"
        >
          Review SLA Breaches
        </button>
      </div>

      {/* 7. Final Actions */}
      <div className="bg-white border border-gray-200 rounded p-3 shadow-2xs">
        <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
          Final Actions
        </h4>
        <div className="flex flex-col gap-1 text-[10px]">
          <button type="button" onClick={() => onActionClick('create_workflow')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Workflow</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('create_policy')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Create Approval Policy</span><Plus className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('approval-queue')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Pending Approvals</span><CheckSquare className="w-3 h-3 text-blue-600" /></button>
          <button type="button" onClick={() => onActionClick('review_sla_breaches')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review SLA Breaches</span><Clock className="w-3 h-3 text-rose-600" /></button>
          <button type="button" onClick={() => onNavigateTab('active-instances')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Blocked Workflows</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('sla-escalation')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Escalations</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('delegations')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Delegations</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('reassignments')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Reassignments</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('routing-rules')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Workflow Rules</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('versions')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Compare Workflow Versions</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('definitions')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Validate Workflow Definitions</span><FileCheck className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onNavigateTab('exceptions')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Review Workflow Exceptions</span><AlertTriangle className="w-3 h-3 text-amber-600" /></button>
          <button type="button" onClick={() => onActionClick('export_registry')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Export Workflow Registry</span><ChevronRight className="w-3 h-3 text-gray-400" /></button>
          <button type="button" onClick={() => onActionClick('open_audit')} className="p-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded text-left border border-gray-150 transition-colors flex items-center justify-between"><span>Open Workflow Audit</span><ShieldAlert className="w-3 h-3 text-rose-600" /></button>
        </div>
      </div>
    </div>
  );
}
export default WorkflowRightRail;
