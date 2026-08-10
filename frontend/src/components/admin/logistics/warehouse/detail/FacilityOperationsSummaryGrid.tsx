"use client";

import React from "react";

export function FacilityOperationsSummaryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-2 text-[10px]">
      {/* 1. FULFILMENT WORKLOAD */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Fulfilment Workload</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>New Assignments:</span><strong className="text-blue-700">312</strong></div>
          <div className="flex justify-between"><span>Allocation Pending:</span><strong className="text-amber-700">126</strong></div>
          <div className="flex justify-between"><span>Picking:</span><strong className="text-purple-700">126</strong></div>
          <div className="flex justify-between"><span>Packing:</span><strong className="text-sky-700">96</strong></div>
          <div className="flex justify-between"><span>Quality Review:</span><strong className="text-amber-700">10</strong></div>
          <div className="flex justify-between"><span>Ready for Dispatch:</span><strong className="text-emerald-700 font-bold">142</strong></div>
          <div className="flex justify-between"><span>Blocked:</span><strong className="text-rose-700 font-bold">12</strong></div>
          <div className="flex justify-between"><span>SLA Breached:</span><strong className="text-rose-700 font-bold">2</strong></div>
        </div>
      </div>

      {/* 2. PICKING OPERATIONS */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Picking Operations</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>Queue:</span><strong className="text-purple-700 font-bold">126</strong></div>
          <div className="flex justify-between"><span>Assigned:</span><strong className="text-ink">106</strong></div>
          <div className="flex justify-between"><span>In Progress:</span><strong className="text-blue-700">114</strong></div>
          <div className="flex justify-between"><span>Completed Today:</span><strong className="text-emerald-700 font-bold">612</strong></div>
          <div className="flex justify-between"><span>Short Picks:</span><strong className="text-amber-700">6</strong></div>
          <div className="flex justify-between"><span>Exceptions:</span><strong className="text-rose-700">5</strong></div>
          <div className="flex justify-between"><span>Avg Pick Time:</span><strong className="text-ink">8.1 min</strong></div>
          <div className="flex justify-between"><span>Pick Accuracy:</span><strong className="text-emerald-700 font-bold">98.3%</strong></div>
        </div>
      </div>

      {/* 3. PACKING OPERATIONS */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Packing Operations</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>Queue:</span><strong className="text-sky-700 font-bold">96</strong></div>
          <div className="flex justify-between"><span>Active Stations:</span><strong className="text-ink">16</strong></div>
          <div className="flex justify-between"><span>Completed Today:</span><strong className="text-emerald-700 font-bold">406</strong></div>
          <div className="flex justify-between"><span>Packing Required:</span><strong className="text-blue-700">7</strong></div>
          <div className="flex justify-between"><span>Quality Pending:</span><strong className="text-amber-700">3</strong></div>
          <div className="flex justify-between"><span>Packing Errors:</span><strong className="text-rose-700">4</strong></div>
          <div className="flex justify-between"><span>Avg Pack Time:</span><strong className="text-ink">6.5 min</strong></div>
          <div className="flex justify-between"><span>Pack Accuracy:</span><strong className="text-emerald-700 font-bold">97.6%</strong></div>
        </div>
      </div>

      {/* 4. QUALITY CONTROL */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Quality Control</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>Inspection Today:</span><strong className="text-ink">40</strong></div>
          <div className="flex justify-between"><span>Passed:</span><strong className="text-emerald-700 font-bold">38</strong></div>
          <div className="flex justify-between"><span>Failed:</span><strong className="text-rose-700">1</strong></div>
          <div className="flex justify-between"><span>Exception:</span><strong className="text-amber-700">1</strong></div>
          <div className="flex justify-between"><span>Hold Requests:</span><strong className="text-ink">0</strong></div>
          <div className="flex justify-between"><span>Rework:</span><strong className="text-amber-700">1</strong></div>
          <div className="flex justify-between"><span>Release Rate:</span><strong className="text-emerald-700 font-bold">94.2%</strong></div>
        </div>
      </div>

      {/* 5. DISPATCH & DOCKS */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Dispatch &amp; Docks</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>Ready for Dispatch:</span><strong className="text-indigo-700 font-bold">142</strong></div>
          <div className="flex justify-between"><span>Pickup Scheduled:</span><strong className="text-blue-700">88</strong></div>
          <div className="flex justify-between"><span>Carriers Awaiting:</span><strong className="text-amber-700">21</strong></div>
          <div className="flex justify-between"><span>Loaded:</span><strong className="text-emerald-700">12</strong></div>
          <div className="flex justify-between"><span>Delayed:</span><strong className="text-rose-700 font-bold">4</strong></div>
          <div className="flex justify-between"><span>Uncollected:</span><strong className="text-rose-700">6</strong></div>
          <div className="flex justify-between"><span>Dock Congestion:</span><strong className="text-amber-700">Medium</strong></div>
        </div>
      </div>

      {/* 6. CARRIER PICKUPS */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Carrier Pickups</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>Scheduled Today:</span><strong className="text-ink font-bold">98</strong></div>
          <div className="flex justify-between"><span>On Time:</span><strong className="text-emerald-700">12</strong></div>
          <div className="flex justify-between"><span>In Transit:</span><strong className="text-blue-700">43</strong></div>
          <div className="flex justify-between"><span>Completed Today:</span><strong className="text-emerald-700 font-bold">66</strong></div>
          <div className="flex justify-between"><span>Failed:</span><strong className="text-rose-700">1</strong></div>
          <div className="flex justify-between"><span>SLA Breached:</span><strong className="text-emerald-700 font-bold">0</strong></div>
        </div>
      </div>

      {/* 7. TRANSFERS */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Transfers</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>Incoming:</span><strong className="text-blue-700">18</strong></div>
          <div className="flex justify-between"><span>Outgoing:</span><strong className="text-purple-700">20</strong></div>
          <div className="flex justify-between"><span>Pending:</span><strong className="text-amber-700 font-bold">12</strong></div>
          <div className="flex justify-between"><span>In Transit:</span><strong className="text-blue-700">24</strong></div>
          <div className="flex justify-between"><span>Received Today:</span><strong className="text-emerald-700">14</strong></div>
          <div className="flex justify-between"><span>Failed:</span><strong className="text-rose-700">2</strong></div>
          <div className="flex justify-between"><span>SLA Breached:</span><strong className="text-emerald-700 font-bold">0</strong></div>
        </div>
      </div>

      {/* 8. RETURN RECEIVING */}
      <div className="p-2.5 bg-white border border-line rounded-xl shadow-sm space-y-1">
        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block border-b border-line pb-1">Return Receiving</span>
        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between"><span>Awaiting Receipt:</span><strong className="text-rose-700 font-bold">23</strong></div>
          <div className="flex justify-between"><span>Received Today:</span><strong className="text-emerald-700">15</strong></div>
          <div className="flex justify-between"><span>Inspection Pending:</span><strong className="text-amber-700">6</strong></div>
          <div className="flex justify-between"><span>Return Handling:</span><strong className="text-blue-700">7</strong></div>
          <div className="flex justify-between"><span>Quarantine:</span><strong className="text-purple-700">3</strong></div>
          <div className="flex justify-between"><span>Capacity Used:</span><strong className="text-amber-700 font-bold">54%</strong></div>
        </div>
      </div>
    </div>
  );
}
