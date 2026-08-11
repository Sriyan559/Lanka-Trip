"use client";

import React from "react";
import { AudienceContextData, AudienceKpiItem } from "@/data/marketingAudience.mock";
import { Users, Filter, ShieldCheck, Zap, HeartPulse, RefreshCw } from "lucide-react";

export function AudienceContextStrip({
  context,
  onRefresh,
}: {
  context: AudienceContextData;
  onRefresh?: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs font-sans text-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-3">
      <div className="flex items-center gap-3.5 flex-wrap">
        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Tenant</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.tenant}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Ecosystem</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.ecosystem}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Business Unit</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.businessUnit}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Region</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.region}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Audience Scope</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.scope}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Customer Source</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.customerSource}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Consent Sync</span>
          <span className="font-bold text-emerald-700 text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {context.consentSync}
          </span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Audience Refresh</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.refresh}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div>
          <span className="text-gray-400 font-medium text-[10px] block uppercase tracking-tight">Date Range</span>
          <span className="font-semibold text-gray-900 text-[11px]">{context.dateRange}</span>
        </div>

        <div className="w-[1px] h-6 bg-gray-200" />

        <div className="flex flex-col min-w-[100px]">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-gray-400 font-medium uppercase tracking-tight">Completeness</span>
            <span className="font-bold text-gray-900">{context.completenessPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-0.5">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${context.completenessPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <span className="text-gray-400 text-[10px] block">Last Synced</span>
          <span className="font-medium text-gray-700 text-[10px]">{context.lastSynced}</span>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh Context"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

const KPI_ICONS: Record<string, React.ElementType> = {
  "1": Users,
  "2": ShieldCheck,
  "3": Filter,
  "4": Zap,
  "5": RefreshCw,
  "6": Users,
  "7": Zap,
  "8": HeartPulse,
};

export function AudienceKpiStrip({
  kpis = [],
}: {
  kpis: AudienceKpiItem[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 font-sans">
      {kpis.map((kpi) => {
        const IconComp = KPI_ICONS[kpi.id] || Users;
        const isHealth = kpi.id === "8";

        return (
          <div
            key={kpi.id}
            className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-tight leading-tight">
                {kpi.label}
              </span>
              <div className="w-6 h-6 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                <IconComp className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-1">
              <div className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
                {kpi.value}
              </div>

              {isHealth ? (
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-1">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "94%" }} />
                </div>
              ) : (
                <p className="text-[10px] text-gray-500 font-medium truncate mt-0.5">
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
