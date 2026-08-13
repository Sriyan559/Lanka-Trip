'use client';

import React from 'react';
import { Plus, Sliders, AlertTriangle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface SatisfactionQaHeaderProps {
  onReviewLowCsat?: () => void;
  onReviewExceptions?: () => void;
  onRunCalibration?: () => void;
  onCreateEvaluation?: () => void;
  onMoreActions?: () => void;
}

export function SatisfactionQaHeader({
  onReviewLowCsat,
  onReviewExceptions,
  onRunCalibration,
  onCreateEvaluation,
  onMoreActions,
}: SatisfactionQaHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span>Customer Support</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Satisfaction &amp; QA</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          CS13 — Customer Satisfaction, Support Quality Assurance &amp; Service Excellence
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
          Monitor customer satisfaction, support quality, service-excellence outcomes, quality defects, calibration, coaching triggers, and continuous improvement initiatives across the support ecosystem.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onReviewLowCsat}
          className="px-3 py-1.5 bg-white border border-slate-300 text-rose-700 text-xs font-semibold rounded hover:bg-rose-50 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <AlertTriangle size={14} className="text-rose-600" />
          Review Low-CSAT Cases
        </button>

        <button
          type="button"
          onClick={onReviewExceptions}
          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Sliders size={14} className="text-slate-500" />
          Review QA Exceptions
        </button>

        <button
          type="button"
          onClick={onRunCalibration}
          className="px-3 py-1.5 bg-white border border-slate-300 text-purple-700 text-xs font-semibold rounded hover:bg-purple-50 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <CheckCircle2 size={14} className="text-purple-600" />
          Run Calibration
        </button>

        <button
          type="button"
          onClick={onCreateEvaluation}
          className="px-3 py-1.5 bg-[#881337] hover:bg-[#70102e] text-white text-xs font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <Plus size={14} />
          Create QA Evaluation
        </button>

        <button
          type="button"
          onClick={onMoreActions}
          className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
        >
          More Actions
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
