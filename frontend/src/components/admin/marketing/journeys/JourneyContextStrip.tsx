"use client";

import React from "react";
import { JourneyContextData, JourneyKpiItem } from "@/data/customerJourneys.mock";
import { GitCommit, Layers, Activity, Zap, HeartPulse, RefreshCw } from "lucide-react";

export function JourneyContextStrip({
  context,
  onRefresh,
}: {
  context: JourneyContextData;
  onRefresh?: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-2.5 py-1.5 shadow-2xs font-sans text-[10px] flex flex-nowrap items-center justify-between gap-x-2.5 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2.5 flex-nowrap shrink-0">
        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">TENANT</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.tenant}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">ECOSYSTEM</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.ecosystem}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">BUSINESS UNIT</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.businessUnit}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">REGION</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.region}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">BASE CURRENCY</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.baseCurrency}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">JOURNEY SCOPE</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.scope}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">CUSTOMER SOURCE</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.customerSource}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">AUTOMATION ENGINE</span>
          <span className="font-bold text-emerald-700 text-[10px] flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {context.automationEngine}
          </span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">CONSENT SYNC</span>
          <span className="font-bold text-emerald-700 text-[10px] flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {context.consentSync}
          </span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div>
          <span className="text-gray-400 font-bold text-[8.5px] block uppercase tracking-tight">DATE RANGE</span>
          <span className="font-semibold text-gray-900 text-[10px] whitespace-nowrap">{context.dateRange}</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

        <div className="flex flex-col min-w-[85px] shrink-0">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-gray-400 font-bold uppercase tracking-tight">COMPLETENESS</span>
            <span className="font-bold text-gray-900">{context.completenessPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden mt-0.5">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${context.completenessPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto pl-2 border-l border-gray-100">
        <div className="text-right">
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">LAST SYNCED</span>
          <span className="font-medium text-gray-700 text-[9.5px] whitespace-nowrap">{context.lastSynced}</span>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1 border border-gray-200 shadow-2xs h-6 text-[9.5px] font-bold px-1.5"
            title="Refresh Context"
          >
            <RefreshCw className="w-3 h-3 text-gray-500" />
            <span>Refresh</span>
          </button>
        )}
      </div>
    </div>
  );
}

const KPI_ICONS: Record<string, React.ElementType> = {
  "1": GitCommit,
  "2": Activity,
  "3": Layers,
  "4": Zap,
  "5": Activity,
  "6": Zap,
  "7": Activity,
  "8": HeartPulse,
};

export function JourneyKpiStrip({
  kpis = [],
}: {
  kpis: JourneyKpiItem[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-sans">
      {kpis.map((kpi) => {
        const IconComp = KPI_ICONS[kpi.id] || GitCommit;
        const isHealth = kpi.id === "8";

        return (
          <div
            key={kpi.id}
            className="bg-white border border-gray-200/80 rounded-xl p-2 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-tight">
                {kpi.label}
              </span>
              <div className="w-5 h-5 rounded-md bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
                <IconComp className="w-3 h-3" />
              </div>
            </div>

            <div className="mt-0.5">
              <div className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
                {kpi.value}
              </div>

              {isHealth ? (
                <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden mt-1">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "93%" }} />
                </div>
              ) : (
                <p className="text-[9.5px] text-gray-500 font-medium truncate mt-0.5">
                  {kpi.subtext}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
