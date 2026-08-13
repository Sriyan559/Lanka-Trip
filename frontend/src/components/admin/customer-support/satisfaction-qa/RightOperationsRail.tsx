'use client';

import React from 'react';
import {
  RotateCw,
  Plus,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  FileText,
  Shield,
  Layers,
} from 'lucide-react';

interface RightOperationsRailProps {
  onCreateEvaluation?: () => void;
  onReviewLowCsat?: () => void;
  onReviewExceptions?: () => void;
  onReviewCriticalDefects?: () => void;
  onRunCalibration?: () => void;
  onReviewAppeals?: () => void;
  onReviewCorrectiveActions?: () => void;
  onOpenAudit?: () => void;
}

export function RightOperationsRail({
  onCreateEvaluation,
  onReviewLowCsat,
  onReviewExceptions,
  onReviewCriticalDefects,
  onRunCalibration,
  onReviewAppeals,
  onReviewCorrectiveActions,
  onOpenAudit,
}: RightOperationsRailProps) {
  return (
    <div className="w-full space-y-2.5 text-xs">
      {/* 1. Service Excellence Health */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-slate-900 text-xs">Service Excellence Health</h4>
          <RotateCw size={12} className="text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>

        <div className="flex items-center gap-3">
          {/* Circular Gauge */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="94, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">94</span>
              <span className="text-[9px] text-slate-400 leading-none">/100</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-emerald-600 text-xs block">▲ 3 pts vs last 30 days</span>
            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
              Service Excellence Health
            </span>
          </div>
        </div>
      </div>

      {/* 2. Satisfaction Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Satisfaction Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">CSAT</span>
          <span className="font-bold text-emerald-600">92%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Positive
          </span>
          <span className="font-bold text-slate-900">81%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Neutral
          </span>
          <span className="font-bold text-slate-900">12%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Negative
          </span>
          <span className="font-bold text-rose-600">7%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Response Rate</span>
          <span className="font-bold text-slate-900">34%</span>
        </div>
      </div>

      {/* 3. QA Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">QA Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Evaluations</span>
          <span className="font-bold text-slate-900">1,248</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Passed
          </span>
          <span className="font-bold text-emerald-600">1,162</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Needs Attention
          </span>
          <span className="font-bold text-amber-600">62</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Critical
          </span>
          <span className="font-bold text-rose-600">7</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Pending
          </span>
          <span className="font-bold text-purple-600">24</span>
        </div>
      </div>

      {/* 4. Quality Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Quality Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Communication</span>
          <span className="font-bold text-slate-900">21</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Policy Adherence</span>
          <span className="font-bold text-slate-900">16</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Resolution Accuracy</span>
          <span className="font-bold text-slate-900">14</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Escalation Quality</span>
          <span className="font-bold text-slate-900">8</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Knowledge Quality</span>
          <span className="font-bold text-slate-900">9</span>
        </div>
      </div>

      {/* 5. Customer Outcome */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Customer Outcome</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">FCR</span>
          <span className="font-bold text-emerald-600">81%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Repeat Contact</span>
          <span className="font-bold text-slate-900">7%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Complaint Conversion</span>
          <span className="font-bold text-slate-900">2.4%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Response Time</span>
          <span className="font-bold text-slate-900">4h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Customer Effort (CES)</span>
          <span className="font-bold text-emerald-600">4.3 /5</span>
        </div>
      </div>

      {/* 6. Quick Queues */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Quick Queues</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Low-CSAT Cases
          </span>
          <span className="font-bold text-rose-600">38</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> QA Reviews Pending
          </span>
          <span className="font-bold text-amber-600">24</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Critical Defects
          </span>
          <span className="font-bold text-rose-600">7</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Coaching Triggers
          </span>
          <span className="font-bold text-purple-600">18</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Calibration Due
          </span>
          <span className="font-bold text-purple-600">6</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> QA Appeals
          </span>
          <span className="font-bold text-blue-600">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Corrective Actions
          </span>
          <span className="font-bold text-slate-900">12</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Knowledge Quality Issues
          </span>
          <span className="font-bold text-slate-900">9</span>
        </div>
      </div>

      {/* 7. Final Actions (8 Dark Crimson Buttons) */}
      <div className="space-y-1.5 pt-1">
        <button
          type="button"
          onClick={onCreateEvaluation}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Plus size={13} /> Create QA Evaluation</span>
        </button>

        <button
          type="button"
          onClick={onReviewLowCsat}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><AlertTriangle size={13} /> Review Low-CSAT Cases</span>
        </button>

        <button
          type="button"
          onClick={onReviewExceptions}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Sliders size={13} /> Review QA Exceptions</span>
        </button>

        <button
          type="button"
          onClick={onReviewCriticalDefects}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Shield size={13} /> Review Critical Defects</span>
        </button>

        <button
          type="button"
          onClick={onRunCalibration}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><CheckCircle2 size={13} /> Run Calibration</span>
        </button>

        <button
          type="button"
          onClick={onReviewAppeals}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><FileText size={13} /> Review QA Appeals</span>
        </button>

        <button
          type="button"
          onClick={onReviewCorrectiveActions}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Layers size={13} /> Review Corrective Actions</span>
        </button>

        <button
          type="button"
          onClick={onOpenAudit}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><RotateCw size={13} /> Open Satisfaction &amp; QA Audit</span>
        </button>
      </div>
    </div>
  );
}
