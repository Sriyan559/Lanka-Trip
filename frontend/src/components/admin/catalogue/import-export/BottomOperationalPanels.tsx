"use client";

import React from "react";
import {
  MOCK_SCHEDULED_EXPORTS,
  MOCK_IMPORT_TEMPLATES,
  MOCK_RECONCILIATION_RECORDS,
  MOCK_IMPORT_EXPORT_ACTIVITIES,
} from "@/data/importExport.mock";

interface BottomOperationalPanelsProps {
  showToast: (msg: string) => void;
}

export function BottomOperationalPanels({ showToast }: BottomOperationalPanelsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 5 Operational Cards Grid with balanced column widths */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-[0.9fr_1.45fr_1.45fr_1.45fr_1.8fr] gap-3.5 items-stretch">
        {/* Panel 1: Catalogue Export Operations */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3
              className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate"
              title="Catalogue Export Operations"
            >
              Catalogue Export Operations
            </h3>

            <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
              <div>
                <span className="text-slate-500 font-medium block">Delivered Today</span>
                <span className="font-bold text-slate-800 font-mono text-[12px]">12</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Scheduled</span>
                <span className="font-bold text-slate-800 font-mono text-[12px]">18</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Avg Duration</span>
                <span className="font-bold text-slate-800 font-mono text-[12px]">00:12:48</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Destinations</span>
                <span className="font-bold text-slate-800 font-mono text-[12px]">6</span>
              </div>
            </div>

            <div className="border-t border-line pt-2.5">
              <span className="font-bold text-slate-700 block mb-1 text-[9.5px]">
                Export Performance (Last 30 Days)
              </span>
              <div className="flex justify-between text-[10px] py-0.5">
                <span className="text-slate-500">Success Rate</span>
                <span className="font-bold text-emerald-600 font-mono">98.2%</span>
              </div>
              <div className="flex justify-between text-[10px] py-0.5">
                <span className="text-slate-500">Failures</span>
                <span className="font-bold text-rose-600 font-mono">9</span>
              </div>
              <div className="flex justify-between text-[10px] py-0.5">
                <span className="text-slate-500">Records Delivered</span>
                <span className="font-bold text-slate-800 font-mono">1.2M</span>
              </div>
              <div className="flex justify-between text-[10px] py-0.5">
                <span className="text-slate-500">Data Volume</span>
                <span className="font-bold text-slate-800 font-mono">4.8 GB</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Export Analytics...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View export analytics &rarr;
          </button>
        </div>

        {/* Panel 2: Scheduled Exports */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3
              className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate"
              title="Scheduled Exports"
            >
              Scheduled Exports
            </h3>

            <div className="w-full overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.1fr)_auto] gap-x-1.5 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Feed Name</div>
                <div>Frequency</div>
                <div>Destination</div>
                <div>Next Run</div>
                <div className="text-right">Status</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {MOCK_SCHEDULED_EXPORTS.map((sch) => (
                  <div
                    key={sch.id}
                    className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.1fr)_auto] gap-x-1.5 py-1 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate" title={sch.feedName}>
                      {sch.feedName}
                    </div>
                    <div className="text-slate-500 truncate">{sch.frequency}</div>
                    <div className="text-slate-500 truncate" title={sch.destination}>
                      {sch.destination}
                    </div>
                    <div className="text-slate-500 font-mono text-[9px] truncate">{sch.nextRun}</div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-emerald-600 font-bold font-sans text-[8.5px]">Scheduled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Scheduled Exports Queue...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View all scheduled exports &rarr;
          </button>
        </div>

        {/* Panel 3: Import Templates & Mapping Profiles */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3
              className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate"
              title="Import Templates & Mapping Profiles"
            >
              Import Templates & Mapping Profiles
            </h3>

            <div className="w-full overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1.1fr)_auto] gap-x-1.5 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Template Name</div>
                <div>Type</div>
                <div className="text-right">Records</div>
                <div>Last Used</div>
                <div className="text-right">Status</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {MOCK_IMPORT_TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.8fr)_minmax(0,1.1fr)_auto] gap-x-1.5 py-1 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate" title={tpl.templateName}>
                      {tpl.templateName}
                    </div>
                    <div className="text-slate-500">{tpl.type}</div>
                    <div className="text-right font-bold text-slate-700 font-mono">{tpl.records}</div>
                    <div className="text-slate-500 font-mono text-[9px] truncate">{tpl.lastUsed}</div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-emerald-600 font-bold font-sans text-[8.5px]">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Templates Manager...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            Manage templates & mappings &rarr;
          </button>
        </div>

        {/* Panel 4: Reconciliation & Audit Summary */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3
              className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate"
              title="Reconciliation & Audit Summary"
            >
              Reconciliation & Audit Summary
            </h3>

            {/* Top Summary Metrics */}
            <div className="grid grid-cols-4 gap-1 text-[9px] mb-2.5 pb-2 border-b border-line">
              <div>
                <span className="text-slate-400 block font-medium">Reconciled</span>
                <span className="font-bold text-slate-800 font-mono text-[11px]">1,048</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Exceptions</span>
                <span className="font-bold text-amber-600 font-mono text-[11px]">36</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Variances</span>
                <span className="font-bold text-[#671021] font-mono text-[11px]">18</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Audit-ready</span>
                <span className="font-bold text-emerald-600 font-mono text-[11px]">98%</span>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,0.6fr)_auto] gap-x-1.5 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Job ID</div>
                <div>Type</div>
                <div>Reconciled At</div>
                <div className="text-right">Variance</div>
                <div className="text-right">Status</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {MOCK_RECONCILIATION_RECORDS.map((rec) => (
                  <div
                    key={rec.id}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,0.6fr)_auto] gap-x-1.5 py-1 items-center text-[9.5px]"
                  >
                    <div className="font-mono font-bold text-[#671021] truncate">{rec.jobId}</div>
                    <div className="font-sans font-semibold text-slate-600">{rec.type}</div>
                    <div className="text-slate-500 font-mono text-[9px] truncate">{rec.reconciledAt}</div>
                    <div className="text-right font-mono font-bold text-slate-800">{rec.variancesCount}</div>
                    <div className="text-right whitespace-nowrap">
                      {rec.status === "Matched" ? (
                        <span className="text-emerald-600 font-bold font-sans text-[8.5px]">Matched</span>
                      ) : (
                        <span className="text-amber-600 font-bold font-sans text-[8.5px]">Variance</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Reconciliation Dashboard...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View reconciliation dashboard &rarr;
          </button>
        </div>

        {/* Panel 5: Recent Import & Export Activity */}
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm flex flex-col justify-between h-full min-w-0 text-[11px]">
          <div>
            <h3
              className="text-[11px] font-black text-ink uppercase tracking-wider mb-2 font-mono truncate"
              title="Recent Import & Export Activity"
            >
              Recent Import & Export Activity
            </h3>

            <div className="w-full overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.3fr)_auto] gap-x-1.5 pb-1 mb-1 border-b border-line text-[9px] font-bold text-slate-700 items-center">
                <div>Action</div>
                <div>User</div>
                <div>Job ID</div>
                <div>Date & Time</div>
                <div className="text-right">Result</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {MOCK_IMPORT_EXPORT_ACTIVITIES.map((act) => (
                  <div
                    key={act.id}
                    className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.3fr)_auto] gap-x-1.5 py-1 items-center text-[9.5px]"
                  >
                    <div className="font-sans font-semibold text-slate-700 truncate" title={act.action}>
                      {act.action}
                    </div>
                    <div className="text-slate-600 truncate">{act.user}</div>
                    <div className="font-mono font-bold text-[#671021] truncate">{act.jobId}</div>
                    <div className="text-slate-500 font-mono text-[9px] truncate">{act.dateTime}</div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-emerald-600 font-bold font-sans text-[8.5px]">Success</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast("Opening Full Audit Log...")}
            className="mt-auto pt-2.5 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block"
          >
            View full audit log &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
