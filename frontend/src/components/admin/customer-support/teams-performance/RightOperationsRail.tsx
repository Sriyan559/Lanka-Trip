'use client';

import React from 'react';
import {
  RotateCw,
  Shuffle,
  Users,
  AlertTriangle,
  Layers,
  FileCheck,
  TrendingUp,
  Award,
} from 'lucide-react';

interface RightOperationsRailProps {
  onRebalanceWorkloads?: () => void;
  onReviewOverloaded?: () => void;
  onReviewQueueCapacity?: () => void;
  onReviewStaffingGaps?: () => void;
  onSkillGapRecs?: () => void;
  onReviewCoachingQueue?: () => void;
  onRunForecast?: () => void;
  onOpenAudit?: () => void;
}

export function RightOperationsRail({
  onRebalanceWorkloads,
  onReviewOverloaded,
  onReviewQueueCapacity,
  onReviewStaffingGaps,
  onSkillGapRecs,
  onReviewCoachingQueue,
  onRunForecast,
  onOpenAudit,
}: RightOperationsRailProps) {
  return (
    <div className="w-full space-y-2.5 text-xs">
      {/* 1. Workforce Operations Health */}
      <div className="bg-white border border-slate-200 rounded-md p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-slate-900 text-xs">Workforce Operations Health</h4>
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
                strokeDasharray="93, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">93</span>
              <span className="text-[9px] text-slate-400 leading-none">/100</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-emerald-600 text-xs block">Excellent</span>
            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
              Overall workforce operations health
            </span>
          </div>
        </div>
      </div>

      {/* 2. Workforce Health Drivers */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Workforce Health Drivers</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> At Capacity
          </span>
          <span className="font-bold text-amber-600">18</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Overloaded
          </span>
          <span className="font-bold text-rose-600">6</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> SLA At Risk
          </span>
          <span className="font-bold text-amber-600">29</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Coaching Due
          </span>
          <span className="font-bold text-purple-600">11</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Skill Gap
          </span>
          <span className="font-bold text-indigo-600">14</span>
        </div>
      </div>

      {/* 3. Critical Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Critical Summary</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#881337]" /> Open Cases
          </span>
          <span className="font-bold text-slate-900">1,286</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Avg Handle Time</span>
          <span className="font-bold text-slate-900">18m</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Avg Resolution</span>
          <span className="font-bold text-slate-900">6.4h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">First Contact Resolution</span>
          <span className="font-bold text-emerald-600">72%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">CSAT</span>
          <span className="font-bold text-emerald-600">96%</span>
        </div>
      </div>

      {/* 4. Team Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Team Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total Teams</span>
          <span className="font-bold text-slate-900">8</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Active Teams</span>
          <span className="font-bold text-emerald-600">8</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">High Risk Teams</span>
          <span className="font-bold text-rose-600">2</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Teams At Risk</span>
          <span className="font-bold text-amber-600">3</span>
        </div>
      </div>

      {/* 5. Performance Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Performance Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">SLA Compliance</span>
          <span className="font-bold text-slate-900">92%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">CSAT</span>
          <span className="font-bold text-emerald-600">96%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">QA Score</span>
          <span className="font-bold text-emerald-600">95%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">First Response</span>
          <span className="font-bold text-slate-900">18m</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Resolution Time</span>
          <span className="font-bold text-slate-900">6.4h</span>
        </div>
      </div>

      {/* 6. Capacity Summary */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Capacity Summary</h5>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Utilisation</span>
          <span className="font-bold text-slate-900">81%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Available Agents</span>
          <span className="font-bold text-emerald-600">34</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">At Capacity</span>
          <span className="font-bold text-amber-600">18</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Overloaded Agents</span>
          <span className="font-bold text-rose-600">6</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Forecasted Gap</span>
          <span className="font-bold text-rose-600">12</span>
        </div>
      </div>

      {/* 7. Queue Health */}
      <div className="bg-white border border-slate-200 rounded-md p-2.5 shadow-2xs space-y-1 text-[11px]">
        <h5 className="font-bold text-slate-900 text-[11px] mb-1">Queue Health</h5>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> At Risk Queues
          </span>
          <span className="font-bold text-rose-600">7</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> High Volume Queues
          </span>
          <span className="font-bold text-slate-900">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Backlog Queues
          </span>
          <span className="font-bold text-slate-900">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Rising Queues
          </span>
          <span className="font-bold text-emerald-600">4</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> SLA Breached Queues
          </span>
          <span className="font-bold text-rose-600">2</span>
        </div>
      </div>

      {/* 8. Final Actions (8 Dark Crimson Buttons) */}
      <div className="space-y-1.5 pt-1">
        <button
          type="button"
          onClick={onRebalanceWorkloads}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Shuffle size={13} /> Rebalance Workloads</span>
        </button>

        <button
          type="button"
          onClick={onReviewOverloaded}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><AlertTriangle size={13} /> Review Overloaded Agents</span>
        </button>

        <button
          type="button"
          onClick={onReviewQueueCapacity}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Layers size={13} /> Review Queue Capacity</span>
        </button>

        <button
          type="button"
          onClick={onReviewStaffingGaps}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Users size={13} /> Review Staffing Gaps</span>
        </button>

        <button
          type="button"
          onClick={onSkillGapRecs}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><Award size={13} /> Skill Gap Recommendations</span>
        </button>

        <button
          type="button"
          onClick={onReviewCoachingQueue}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><FileCheck size={13} /> Review Coaching Queue</span>
        </button>

        <button
          type="button"
          onClick={onRunForecast}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><TrendingUp size={13} /> Run Capacity Forecast</span>
        </button>

        <button
          type="button"
          onClick={onOpenAudit}
          className="w-full py-1.5 px-3 bg-[#881337] hover:bg-[#70102e] text-white font-semibold rounded text-xs transition-colors flex items-center justify-between shadow-2xs"
        >
          <span className="flex items-center gap-1.5"><RotateCw size={13} /> Open Workforce Audit</span>
        </button>
      </div>
    </div>
  );
}
