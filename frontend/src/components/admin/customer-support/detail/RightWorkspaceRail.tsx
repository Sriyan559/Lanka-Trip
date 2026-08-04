'use client';

import React from 'react';
import {
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Send,
  UserCheck,
  Flag,
  MessageSquare,
  Building,
  Truck,
  ShieldAlert,
  FileCheck,
  CheckCircle,
  XCircle,
  Activity,
  ClipboardList,
  ClipboardCheck,
} from 'lucide-react';
import type { CaseDetailFullData } from '@/types/customerSupportDetail';

interface RightWorkspaceRailProps {
  data: CaseDetailFullData;
  onOpenSendUpdate: () => void;
  onOpenAssign: () => void;
  onOpenChangePriority: () => void;
  onOpenEscalate: () => void;
  onOpenMarkResolved: () => void;
  onOpenCloseCase: () => void;
}

export function RightWorkspaceRail({
  data,
  onOpenSendUpdate,
  onOpenAssign,
  onOpenChangePriority,
  onOpenEscalate,
  onOpenMarkResolved,
  onOpenCloseCase,
}: RightWorkspaceRailProps) {
  const { metrics, blockingIssues, recommendedAction, caseInfo } = data;

  const panelClass = "bg-white rounded-xl border border-line shadow-sm overflow-hidden flex flex-col";
  const panelHeaderClass = "flex items-center justify-between px-5 py-4 border-b border-line bg-slate-50";
  const panelHeadingClass = "text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2";
  const actionButtonClass = "flex items-center gap-2.5 w-full text-left px-5 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors text-[13px] font-semibold text-slate-700 hover:text-primary-900 group";

  return (
    <aside className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0">
      {/* 1. HEALTH & METRICS PANEL */}
      <div className={panelClass}>
        <div className={panelHeaderClass}>
          <span className={panelHeadingClass}>
            <Activity size={14} className="text-primary-900" />
            HEALTH & METRICS
          </span>
          <span className="font-bold text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
            {metrics.healthScore}/100
          </span>
        </div>

        {/* Case Health Score Progress Bar */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between text-[12px] mb-2">
            <span className="font-semibold text-slate-600">Case Health Score</span>
            <strong className="text-green-700">{metrics.healthScore}/100</strong>
          </div>
          <div
            className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={metrics.healthScore}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.healthScore}%` }}
            />
          </div>
        </div>

        {/* 4-Cell Health Metric Grid */}
        <div className="grid grid-cols-2 gap-[1px] bg-slate-100 border-b border-slate-100">
          <div className="bg-white p-4 flex flex-col items-center justify-center text-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Score</span>
            <span className="text-[16px] font-bold text-red-600">{metrics.riskScore}/100</span>
          </div>

          <div className="bg-white p-4 flex flex-col items-center justify-center text-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SLA Remaining</span>
            <span className="text-[16px] font-bold text-amber-600">{metrics.slaRemaining}</span>
          </div>

          <div className="bg-white p-4 flex flex-col items-center justify-center text-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resolution Conf.</span>
            <span className="text-[16px] font-bold text-green-700">{metrics.resolutionConfidencePercent}%</span>
          </div>

          <div className="bg-white p-4 flex flex-col items-center justify-center text-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Evidence Complete</span>
            <span className="text-[16px] font-bold text-ink">{metrics.evidenceCompletenessPercent}%</span>
          </div>
        </div>

        {/* Health Status Rows */}
        <div className="flex flex-col p-5 gap-3 bg-slate-50">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-medium text-slate-600">Customer Sentiment</span>
            <div className="flex items-center gap-1.5 font-bold text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {metrics.customerSentiment}
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <span className="font-medium text-slate-600">Repeat Contact Risk</span>
            <div className="flex items-center gap-1.5 font-bold text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {metrics.repeatContactRisk}
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <span className="font-medium text-slate-600">Escalation Risk</span>
            <div className="flex items-center gap-1.5 font-bold text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              {metrics.escalationRisk}
            </div>
          </div>
        </div>
      </div>

      {/* 2. BLOCKING ISSUES PANEL */}
      <div className={panelClass}>
        <div className={`${panelHeaderClass} bg-red-50 border-red-100`}>
          <span className={`${panelHeadingClass} text-red-700`}>
            <AlertTriangle size={14} className="text-red-600" />
            BLOCKING ISSUES
          </span>
          <span className="font-bold text-[11px] text-white bg-red-600 px-2 py-0.5 rounded-full shadow-sm">
            {blockingIssues.length}
          </span>
        </div>

        <div className="flex flex-col">
          {blockingIssues.map((issue) => (
            <div key={issue.id} className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
              <div className="text-[13px] font-semibold text-ink mb-2 leading-snug" title={issue.title}>
                {issue.title}
              </div>
              <button type="button" className="text-[11px] font-bold text-primary-900 bg-primary-50 px-2.5 py-1 rounded hover:bg-primary-100 transition-colors">
                {issue.suggestedAction}
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <button type="button" className="text-[11px] font-bold text-slate-500 hover:text-primary-900 transition-colors">
            View all blocking issues ({blockingIssues.length})
          </button>
        </div>
      </div>

      {/* 3. RECOMMENDED NEXT ACTION PANEL */}
      <div className={`${panelClass} border-blue-200 shadow-md shadow-blue-900/5`}>
        <div className={`${panelHeaderClass} bg-blue-50 border-blue-100`}>
          <span className={`${panelHeadingClass} text-blue-800`}>
            <Lightbulb size={14} className="text-blue-600" />
            RECOMMENDED NEXT ACTION
          </span>
        </div>

        <div className="p-5">
          <p className="text-[13px] text-ink font-medium leading-relaxed mb-4">
            {recommendedAction.text}
          </p>

          <div className="bg-slate-50 rounded-lg p-3 border border-line flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-500 uppercase">Recommended Owner</span>
              <span className="font-bold text-ink">{recommendedAction.recommendedOwner}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-500 uppercase">Due</span>
              <span className="font-bold text-ink">{recommendedAction.dueBy}</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 italic">
            {recommendedAction.disclaimer}
          </div>
        </div>
      </div>

      {/* 4. CASE ACTIONS PANEL */}
      <div className={panelClass}>
        <div className={panelHeaderClass}>
          <span className={panelHeadingClass}>
            <ClipboardList size={14} className="text-slate-600" />
            CASE ACTIONS
          </span>
        </div>

        <div className="flex flex-col">
          <button type="button" className={actionButtonClass} onClick={onOpenSendUpdate}>
            <Send size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            <span className="flex-1">Send Customer Update</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-900 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass} onClick={onOpenAssign}>
            <UserCheck size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            <span className="flex-1">Assign or Reassign Agent</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-900 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass} onClick={onOpenChangePriority}>
            <Flag size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            <span className="flex-1">Change Priority</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-900 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass} onClick={onOpenSendUpdate}>
            <MessageSquare size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            <span className="flex-1">Contact Customer</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-900 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass}>
            <Building size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            <span className="flex-1">Contact Supplier</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-900 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass}>
            <Truck size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            <span className="flex-1">Contact Carrier</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-900 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass} onClick={onOpenEscalate}>
            <ShieldAlert size={14} className="text-amber-500 group-hover:text-amber-600 transition-colors" />
            <span className="flex-1">Escalate Case</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-600 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass} onClick={onOpenMarkResolved}>
            <FileCheck size={14} className="text-slate-400 group-hover:text-primary-900 transition-colors" />
            <span className="flex-1">Propose Resolution</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-primary-900 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass} onClick={onOpenMarkResolved}>
            <CheckCircle size={14} className="text-green-600 group-hover:text-green-700 transition-colors" />
            <span className="flex-1 text-green-700">Mark Resolved</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-green-700 transition-colors" />
          </button>

          <button type="button" className={actionButtonClass} onClick={onOpenCloseCase}>
            <XCircle size={14} className="text-red-500 group-hover:text-red-600 transition-colors" />
            <span className="flex-1 text-red-600">Close Case</span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-red-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* 5. ASSIGNMENT & SLA SUMMARY PANEL */}
      <div className={panelClass}>
        <div className={panelHeaderClass}>
          <span className={panelHeadingClass}>
            <ClipboardCheck size={14} className="text-slate-600" />
            ASSIGNMENT & SLA SUMMARY
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-slate-100 text-[12px]">
            <span className="font-semibold text-slate-500">Assigned Agent</span>
            <span className="font-bold text-ink">
              {caseInfo.assignedAgentName || 'Amaya Perera'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border-b border-slate-100 text-[12px]">
            <span className="font-semibold text-slate-500">Assigned Team</span>
            <span className="font-bold text-ink">
              {caseInfo.assignedTeam || 'Customer Operations'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border-b border-slate-100 text-[12px]">
            <span className="font-semibold text-slate-500">First Response</span>
            <span className="font-bold text-green-700">
              Completed in 9 Minutes
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border-b border-slate-100 text-[12px]">
            <span className="font-semibold text-slate-500">Resolution Due</span>
            <span className="font-bold text-ink">
              {caseInfo.resolutionDue}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border-b border-slate-100 text-[12px]">
            <span className="font-semibold text-slate-500">SLA Status</span>
            <span className="font-bold text-green-700">
              Within Target
            </span>
          </div>

          <div className="flex items-center justify-between p-3 text-[12px]">
            <span className="font-semibold text-slate-500">Escalation</span>
            <span className="font-bold text-green-700">
              None
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
