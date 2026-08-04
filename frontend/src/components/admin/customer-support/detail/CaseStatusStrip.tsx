'use client';

import React from 'react';
import {
  RotateCcw,
  Flag,
  Clock,
  ShieldCheck,
  Search,
  Smile,
  AlertTriangle,
} from 'lucide-react';
import type { SupportCaseItem } from '@/types/customerSupport';

interface CaseStatusStripProps {
  caseInfo: SupportCaseItem;
  escalationStatus?: string;
  resolutionStatus?: string;
}

export function CaseStatusStrip({
  caseInfo,
  escalationStatus = 'None',
  resolutionStatus = 'Investigation Required',
}: CaseStatusStripProps) {
  const statusItemClass = "flex items-center gap-3 px-4 py-2 border-r border-line last:border-0";
  const statusLabelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5";

  return (
    <div className="flex flex-wrap items-center bg-slate-50 border-b border-line p-2">
      {/* 1. Case Status */}
      <div className={statusItemClass}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
          <RotateCcw size={14} />
        </div>
        <div>
          <span className={statusLabelClass}>Case Status</span>
          <span className="text-[13px] font-bold text-blue-700">
            {caseInfo.caseStatus}
          </span>
        </div>
      </div>

      {/* 2. Priority */}
      <div className={statusItemClass}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-600 shrink-0">
          <Flag size={14} />
        </div>
        <div>
          <span className={statusLabelClass}>Priority</span>
          <span className="text-[13px] font-bold text-red-700">
            {caseInfo.priority}
          </span>
        </div>
      </div>

      {/* 3. SLA Status */}
      <div className={statusItemClass}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 text-amber-600 shrink-0">
          <Clock size={14} />
        </div>
        <div>
          <span className={statusLabelClass}>SLA Status</span>
          <span className="text-[13px] font-bold text-amber-800">
            {caseInfo.slaStatus}
          </span>
        </div>
      </div>

      {/* 4. Escalation Status */}
      <div className={statusItemClass}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 shrink-0">
          <ShieldCheck size={14} />
        </div>
        <div>
          <span className={statusLabelClass}>Escalation Status</span>
          <span className="text-[13px] font-bold text-emerald-800">
            {escalationStatus}
          </span>
        </div>
      </div>

      {/* 5. Resolution Status */}
      <div className={statusItemClass}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-50 text-purple-600 shrink-0">
          <Search size={14} />
        </div>
        <div>
          <span className={statusLabelClass}>Resolution Status</span>
          <span className="text-[13px] font-bold text-purple-800">
            {resolutionStatus}
          </span>
        </div>
      </div>

      {/* 6. Sentiment */}
      <div className={statusItemClass}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 text-amber-600 shrink-0">
          <Smile size={14} />
        </div>
        <div>
          <span className={statusLabelClass}>Sentiment</span>
          <span className="text-[13px] font-bold text-amber-800">
            {caseInfo.sentiment}
          </span>
        </div>
      </div>

      {/* 7. Risk Level */}
      <div className={statusItemClass}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 text-amber-600 shrink-0">
          <AlertTriangle size={14} />
        </div>
        <div>
          <span className={statusLabelClass}>Risk Level</span>
          <span className="text-[13px] font-bold text-amber-900">
            {caseInfo.riskLevel}
          </span>
        </div>
      </div>
    </div>
  );
}
