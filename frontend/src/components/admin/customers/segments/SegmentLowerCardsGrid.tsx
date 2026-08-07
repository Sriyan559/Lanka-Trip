"use client";

import React from "react";
import { SelectedSegmentDetails } from "@/types/customer-segments";
import { SegmentSelectedPreviewPanel } from "./SegmentSelectedPreviewPanel";

interface SegmentLowerCardsGridProps {
  selectedDetails: SelectedSegmentDetails;
  showToast: (msg: string) => void;
}

export function SegmentLowerCardsGrid({ selectedDetails, showToast }: SegmentLowerCardsGridProps) {
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
                <circle cx="50" cy="50" r="38" stroke="#671021" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="85" />
                <circle cx="50" cy="50" r="38" stroke="#2563eb" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="170" />
                <circle cx="50" cy="50" r="38" stroke="#059669" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="210" />
              </svg>
              <span className="absolute text-[12px] font-black text-ink font-mono">128</span>
            </div>
            <div className="space-y-0.5 text-[9px] flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Dynamic</span>
                <span className="font-bold text-slate-800 font-mono">82 (64%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Static Group</span>
                <span className="font-bold text-slate-800 font-mono">46 (36%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">Lifecycle</span>
                <span className="font-bold text-slate-800 font-mono">16 (12%)</span>
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
              <span className="font-bold font-mono text-slate-800">286</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Entry Rules</span>
              <span className="font-bold font-mono text-emerald-600">132</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exit Rules</span>
              <span className="font-bold font-mono text-amber-600">98</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exclusions</span>
              <span className="font-bold font-mono text-rose-600">56</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Rule Accuracy</span>
              <span className="font-bold font-mono text-emerald-600">92%</span>
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
              <span className="font-bold font-mono text-slate-800">512</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Entry Conditions</span>
              <span className="font-bold font-mono text-slate-800">248</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exit Conditions</span>
              <span className="font-bold font-mono text-slate-800">184</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Exclusions</span>
              <span className="font-bold font-mono text-slate-800">80</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Avg. Rule Complexity</span>
              <span className="font-bold text-amber-600">Medium</span>
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
              <span className="font-mono font-bold text-emerald-600 text-[10px]">9,185</span>
            </div>
            <div className="bg-slate-50 p-1 rounded">
              <span className="text-slate-400 block text-[8px] uppercase">Removals</span>
              <span className="font-mono font-bold text-rose-600 text-[10px]">4,722</span>
            </div>
            <div className="bg-slate-50 p-1 rounded">
              <span className="text-slate-400 block text-[8px] uppercase">Net Change</span>
              <span className="font-mono font-bold text-slate-800 text-[10px]">+4,463</span>
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
                <circle cx="50" cy="50" r="38" stroke="#059669" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="40" />
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] font-black text-ink font-mono block leading-none">18,420</span>
                <span className="text-[7px] font-bold text-slate-400 block uppercase">Customers</span>
              </div>
            </div>
            <div className="space-y-0.5 text-[8.5px] flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">1 Segment</span>
                <span className="font-bold text-slate-800 font-mono">24,560 (13.2%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">2-3 Segments</span>
                <span className="font-bold text-slate-800 font-mono">9,340 (5.0%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 truncate">4-5 Segments</span>
                <span className="font-bold text-slate-800 font-mono">4,520 (2.4%)</span>
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
              <span className="font-bold font-mono text-[#671021]">11</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Critical</span>
              <span className="font-bold font-mono text-rose-600">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">High</span>
              <span className="font-bold font-mono text-rose-600">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Medium / Low</span>
              <span className="font-bold font-mono text-amber-600">4 / 4</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60">
              <span className="text-slate-500">Resolution Rate</span>
              <span className="font-bold font-mono text-emerald-600">76%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Left Cards (7-11) + Right Selected Segment / Custom Preview Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
        {/* Left Side: Cards 7 to 11 in a 3-column subgrid (5 Cols on XL) */}
        <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* CARD 7 — RECALCULATION & SCHEDULING */}
          <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-1.5">
              7. Recalculation & Scheduling
            </h4>
            <div className="space-y-1 text-[9px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled</span>
                <span className="font-bold font-mono text-purple-600">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">In Progress</span>
                <span className="font-bold font-mono text-amber-600">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Completed</span>
                <span className="font-bold font-mono text-emerald-600">86</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Failed</span>
                <span className="font-bold font-mono text-rose-600">3</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-line/60">
                <span className="text-slate-500">Success Rate</span>
                <span className="font-bold font-mono text-emerald-600">89%</span>
              </div>
            </div>
          </div>

          {/* CARD 8 — RECENT CUSTOMER SEGMENT ACTIVITY */}
          <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-1.5">
              8. Recent Activity
            </h4>
            <div className="space-y-1 text-[8.5px]">
              <div className="p-1 bg-slate-50 rounded">
                <div className="flex justify-between font-bold text-slate-800">
                  <span className="truncate">Segment updated</span>
                  <span className="text-slate-400 font-mono text-[8px]">10:00 AM</span>
                </div>
                <div className="text-slate-500 truncate">High-Value Beauty Buyers</div>
              </div>

              <div className="p-1 bg-slate-50 rounded">
                <div className="flex justify-between font-bold text-slate-800">
                  <span className="truncate">Recalculation completed</span>
                  <span className="text-slate-400 font-mono text-[8px]">09:45 AM</span>
                </div>
                <div className="text-slate-500 truncate">Mobile-App Repeat Buyers</div>
              </div>
            </div>
          </div>

          {/* CARD 9 — CONSENT & COMMUNICATION ELIGIBILITY */}
          <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-1.5">
              9. Consent & Eligibility
            </h4>
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-12 h-12 transform -rotate-90">
                  <circle cx="50" cy="50" r="38" stroke="#059669" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="50" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-[9px] font-black text-ink font-mono block leading-none">186.4K</span>
                </div>
              </div>
              <div className="space-y-0.5 text-[8.5px] flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="text-slate-500 truncate">Eligible</span>
                  <span className="font-bold text-emerald-600 font-mono">142.6K (76.5%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 truncate">Partial</span>
                  <span className="font-bold text-amber-600 font-mono">24.5K (13.2%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 truncate">Not Eligible</span>
                  <span className="font-bold text-rose-600 font-mono">19.1K (10.3%)</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-1 border-t border-line/60 text-[9px] mt-1">
              <span className="text-slate-500">Consent Coverage</span>
              <span className="font-bold font-mono text-emerald-600">84%</span>
            </div>
          </div>

          {/* CARD 10 — RISK & RESTRICTED SEGMENTS */}
          <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-1.5">
              10. Risk & Restricted
            </h4>
            <div className="space-y-1 text-[9px]">
              <div className="flex justify-between">
                <span className="text-slate-500">High-Risk Segments</span>
                <span className="font-bold font-mono text-rose-600">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Restricted Customers</span>
                <span className="font-bold font-mono text-slate-800">12,480</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">On Watchlist</span>
                <span className="font-bold font-mono text-amber-600">1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fraud Signals</span>
                <span className="font-bold font-mono text-slate-800">425</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-line/60">
                <span className="text-slate-500">Risk Coverage</span>
                <span className="font-bold font-mono text-emerald-600">87%</span>
              </div>
            </div>
          </div>

          {/* CARD 11 — SEGMENT VERSION CONTROL */}
          <div className="bg-white border border-line rounded-lg p-3 shadow-2xs flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider font-mono mb-1.5">
              11. Version Control
            </h4>
            <div className="space-y-1 text-[9px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Groups</span>
                <span className="font-bold font-mono text-slate-800">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">System Groups</span>
                <span className="font-bold font-mono text-slate-800">10</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-line/60">
                <span className="text-slate-500">Active Members</span>
                <span className="font-bold font-mono text-slate-800">28,640</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Selected Segment / Custom Preview Workspace Panel (7 Cols on XL) */}
        <div className="xl:col-span-7">
          <SegmentSelectedPreviewPanel details={selectedDetails} showToast={showToast} />
        </div>
      </div>
    </div>
  );
}
