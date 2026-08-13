"use client";

import React from "react";
import { SelectedSegmentDetails, SegmentOperationsMetrics } from "@/types/customer-segments";

interface SegmentLowerCardsGridProps {
  selectedDetails: SelectedSegmentDetails | null;
  operationsMetrics?: SegmentOperationsMetrics | null;
  showToast: (msg: string) => void;
}

export function SegmentLowerCardsGrid({
  selectedDetails,
  operationsMetrics,
  showToast,
}: SegmentLowerCardsGridProps) {
  const ops = operationsMetrics ?? {
    totalSegments: 0,
    dynamicCount: 0,
    staticGroupCount: 0,
    lifecycleCount: 0,
    otherTypeCount: 0,
    totalRules: 0,
    entryRules: 0,
    exitRules: 0,
    exclusions: 0,
    ruleAccuracy: null,
    totalConditions: 0,
    entryConditions: 0,
    exitConditions: 0,
    exclusionConditions: 0,
    avgRuleComplexity: "—",
    membershipAdditions: 0,
    membershipRemovals: 0,
    netMembershipChange: 0,
    overlapCustomersCount: 0,
    totalConflicts: 0,
    conflictCritical: 0,
    conflictHigh: 0,
    conflictMediumLow: 0,
    resolutionRate: null,
    recalculationScheduled: 0,
    recalculationInProgress: 0,
    recalculationCompleted: 0,
    recalculationFailed: 0,
    recalculationSuccessRate: null,
    recentActivitiesCount: 0,
    consentEligible: 0,
    consentPending: 0,
    consentNotEligible: 0,
    highRiskSegments: 0,
    restrictedCustomers: 0,
    onWatchlist: 0,
    fraudSignals: 0,
    riskCoverage: null,
    totalGroups: 0,
    systemGroups: 0,
    activeMembers: 0,
  };

  const dynamicPct = ops.totalSegments > 0 ? Math.round((ops.dynamicCount / ops.totalSegments) * 100) : 0;
  const staticPct = ops.totalSegments > 0 ? Math.round((ops.staticGroupCount / ops.totalSegments) * 100) : 0;
  const lifecyclePct = ops.totalSegments > 0 ? Math.round((ops.lifecycleCount / ops.totalSegments) * 100) : 0;

  return (
    <div className="space-y-4 mb-6">
      {/* Top Row: Cards 1 to 6 in a 6-column desktop grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* CARD 1 — SEGMENT TYPE OPERATIONS */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            1. Segment Type Operations
          </h4>
          <div className="flex items-center gap-2">
            <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-14 h-14 transform -rotate-90">
                <circle cx="50" cy="50" r="38" stroke="#671021" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset={ops.totalSegments > 0 ? "85" : "238"} />
                <circle cx="50" cy="50" r="38" stroke="#2563eb" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset={ops.totalSegments > 0 ? "170" : "238"} />
              </svg>
              <span className="absolute text-[12px] font-black text-ink font-mono">{ops.totalSegments}</span>
            </div>
            <div className="space-y-0.5 text-[9px] flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Dynamic</span>
                <span className="font-bold text-slate-800 font-mono">{ops.dynamicCount} ({dynamicPct}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Static Group</span>
                <span className="font-bold text-slate-800 font-mono">{ops.staticGroupCount} ({staticPct}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Lifecycle</span>
                <span className="font-bold text-slate-800 font-mono">{ops.lifecycleCount} ({lifecyclePct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 — SEGMENT RULES & CONDITIONS */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            2. Segment Rules & Conditions
          </h4>
          <div className="space-y-1 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Rules</span>
              <span className="font-bold font-mono text-slate-800">{ops.totalRules}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Entry Rules</span>
              <span className="font-bold font-mono text-emerald-600">{ops.entryRules}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exit Rules</span>
              <span className="font-bold font-mono text-amber-600">{ops.exitRules}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exclusions</span>
              <span className="font-bold font-mono text-rose-600">{ops.exclusions}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Rule Accuracy</span>
              <span className="font-bold font-mono text-emerald-600">
                {ops.ruleAccuracy !== null ? `${ops.ruleAccuracy}%` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3 — ENTRY, EXIT & EXCLUSION CONTROLS */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            3. Entry, Exit & Exclusion Controls
          </h4>
          <div className="space-y-1 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Conditions</span>
              <span className="font-bold font-mono text-slate-800">{ops.totalConditions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Entry Conditions</span>
              <span className="font-bold font-mono text-slate-800">{ops.entryConditions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exit Conditions</span>
              <span className="font-bold font-mono text-slate-800">{ops.exitConditions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exclusions</span>
              <span className="font-bold font-mono text-slate-800">{ops.exclusionConditions}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Avg. Rule Complexity</span>
              <span className="font-bold text-amber-600">{ops.avgRuleComplexity}</span>
            </div>
          </div>
        </div>

        {/* CARD 4 — SEGMENT MEMBERSHIP OPERATIONS */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-1.5">
            4. Segment Membership Operations
          </h4>
          <div className="grid grid-cols-3 gap-1 text-center text-[9px] mb-1.5">
            <div className="bg-slate-50 p-1 rounded">
              <span className="text-slate-400 block text-[8px] uppercase">Additions</span>
              <span className="font-mono font-bold text-emerald-600 text-[10px]">
                {ops.membershipAdditions.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-50 p-1 rounded">
              <span className="text-slate-400 block text-[8px] uppercase">Removals</span>
              <span className="font-mono font-bold text-rose-600 text-[10px]">
                {ops.membershipRemovals.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-50 p-1 rounded">
              <span className="text-slate-400 block text-[8px] uppercase">Net Change</span>
              <span className="font-mono font-bold text-slate-800 text-[10px]">
                {ops.netMembershipChange >= 0 ? `+${ops.netMembershipChange.toLocaleString()}` : ops.netMembershipChange.toLocaleString()}
              </span>
            </div>
          </div>
          {/* Mini Bar Timeline Activity Chart */}
          <div className="flex items-end justify-between gap-1 h-5 w-full bg-slate-50 rounded p-1 pt-0">
            <div className="w-1/6 bg-emerald-400 h-2 rounded-t-xs" />
            <div className="w-1/6 bg-emerald-500 h-3.5 rounded-t-xs" />
            <div className="w-1/6 bg-emerald-600 h-3 rounded-t-xs" />
            <div className="w-1/6 bg-emerald-500 h-4 rounded-t-xs" />
            <div className="w-1/6 bg-emerald-700 h-5 rounded-t-xs" />
            <div className="w-1/6 bg-emerald-600 h-4.5 rounded-t-xs" />
          </div>
        </div>

        {/* CARD 5 — SEGMENT OVERLAP ANALYSIS */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            5. Segment Overlap Analysis
          </h4>
          <div className="flex items-center gap-2">
            <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-14 h-14 transform -rotate-90">
                <circle cx="50" cy="50" r="38" stroke="#059669" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset={ops.overlapCustomersCount > 0 ? "40" : "238"} />
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] font-black text-ink font-mono block leading-none">
                  {ops.overlapCustomersCount.toLocaleString()}
                </span>
                <span className="text-[7px] font-bold text-slate-400 block uppercase">Customers</span>
              </div>
            </div>
            <div className="space-y-0.5 text-[9px] flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">1 Segment</span>
                <span className="font-bold text-slate-800 font-mono">{ops.totalSegments > 0 ? ops.totalSegments : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">2–3 Segments</span>
                <span className="font-bold text-slate-800 font-mono">{ops.overlapCustomersCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">4+ Segments</span>
                <span className="font-bold text-slate-800 font-mono">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 6 — SEGMENT CONFLICT MANAGEMENT */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            6. Segment Conflict Management
          </h4>
          <div className="space-y-1 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Conflicts</span>
              <span className="font-bold font-mono text-rose-600">{ops.totalConflicts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Critical / High</span>
              <span className="font-bold font-mono text-slate-800">
                {ops.conflictCritical} / {ops.conflictHigh}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Medium / Low</span>
              <span className="font-bold font-mono text-slate-800">{ops.conflictMediumLow}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Resolution Rate</span>
              <span className="font-bold font-mono text-emerald-600">
                {ops.resolutionRate !== null ? `${ops.resolutionRate}%` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Cards 7 to 11 in a 5-column desktop grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {/* CARD 7 — RECALCULATION & SCHEDULING */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            7. Recalculation & Scheduling
          </h4>
          <div className="space-y-1 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled / In Progress</span>
              <span className="font-bold font-mono text-slate-800">
                {ops.recalculationScheduled} / {ops.recalculationInProgress}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Completed Jobs</span>
              <span className="font-bold font-mono text-emerald-600">{ops.recalculationCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Failed Jobs</span>
              <span className="font-bold font-mono text-rose-600">{ops.recalculationFailed}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Success Rate</span>
              <span className="font-bold font-mono text-emerald-600">
                {ops.recalculationSuccessRate !== null ? `${ops.recalculationSuccessRate}%` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 8 — RECENT ACTIVITY */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            8. Recent Segment Activity
          </h4>
          <div className="space-y-1.5 text-[9px]">
            {ops.recentActivitiesCount > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 truncate font-semibold">Recalculations completed</span>
                  <span className="text-slate-400 font-mono text-[8px]">Just now</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 truncate font-semibold">Segments updated</span>
                  <span className="text-slate-400 font-mono text-[8px]">Today</span>
                </div>
              </>
            ) : (
              <span className="text-slate-400 font-mono text-[9.5px]">No recent segment activity</span>
            )}
          </div>
        </div>

        {/* CARD 9 — CONSENT & ELIGIBILITY */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            9. Consent & Eligibility
          </h4>
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-12 h-12 transform -rotate-90">
                <circle cx="50" cy="50" r="38" stroke="#059669" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset={ops.consentEligible > 0 ? "40" : "238"} />
              </svg>
              <span className="absolute text-[10px] font-black text-ink font-mono">
                {ops.consentEligible.toLocaleString()}
              </span>
            </div>
            <div className="space-y-0.5 text-[9px] flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Eligible</span>
                <span className="font-bold text-emerald-600 font-mono">{ops.consentEligible.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Pending</span>
                <span className="font-bold text-slate-800 font-mono">{ops.consentPending}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Not Eligible</span>
                <span className="font-bold text-rose-600 font-mono">{ops.consentNotEligible}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 10 — RISK & RESTRICTED */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            10. Risk & Restricted
          </h4>
          <div className="space-y-1 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-slate-500">High-Risk Segments</span>
              <span className="font-bold font-mono text-rose-600">{ops.highRiskSegments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Restricted Customers</span>
              <span className="font-bold font-mono text-slate-800">{ops.restrictedCustomers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Watchlist / Signals</span>
              <span className="font-bold font-mono text-slate-800">
                {ops.onWatchlist} / {ops.fraudSignals}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Risk Coverage</span>
              <span className="font-bold font-mono text-emerald-600">
                {ops.riskCoverage !== null ? `${ops.riskCoverage}%` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 11 — VERSION CONTROL & GROUPS */}
        <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
          <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            11. Version Control & Groups
          </h4>
          <div className="space-y-1 text-[9.5px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Groups</span>
              <span className="font-bold font-mono text-slate-800">{ops.totalGroups}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">System Groups</span>
              <span className="font-bold font-mono text-slate-800">{ops.systemGroups}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Active Members</span>
              <span className="font-bold font-mono text-emerald-600">{ops.activeMembers.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
