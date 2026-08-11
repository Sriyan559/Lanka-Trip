"use client";

import React from "react";
import { DeliveryConfigurationIntelligenceData } from "@/types/logistics/deliveryConfiguration";
import { AlertCircle, AlertTriangle, ArrowUpRight, ShieldAlert, Sparkles } from "lucide-react";

interface DeliveryConfigurationIntelligenceProps {
  data: DeliveryConfigurationIntelligenceData;
  onSelectAction?: (actionName: string) => void;
}

export function DeliveryConfigurationIntelligence({
  data,
  onSelectAction,
}: DeliveryConfigurationIntelligenceProps) {
  return (
    <aside className="w-full xl:w-[320px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-3">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-700" />
          Delivery Configuration Intelligence
        </h3>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* A. Overall Health Score */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-md p-2.5 flex items-center gap-3">
        <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="18" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * (1 - data.healthScore / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-xs font-black text-emerald-900">{data.healthScore}</span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-emerald-900">{data.healthLabel}</span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1 py-0.2 rounded">
              / 100
            </span>
          </div>
          <p className="text-[10px] text-emerald-800 font-normal leading-tight mt-0.5">
            Strong configuration health across zones, rates, capacity and SLA.
          </p>
          <span className="text-[9.5px] font-bold text-emerald-700 block mt-0.5">
            Trend: {data.healthTrend}
          </span>
        </div>
      </div>

      {/* B. Priority Configuration Alerts */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            Priority Configuration Alerts ({data.alerts.length})
          </h4>
        </div>
        <div className="space-y-1">
          {data.alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-1.5 rounded border text-[10.5px] flex items-center justify-between ${
                alt.severity === "High"
                  ? "bg-rose-50 border-rose-200 text-rose-800"
                  : "bg-amber-50 border-amber-200 text-amber-800"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {alt.severity === "High" ? (
                  <AlertCircle className="w-3 h-3 text-rose-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0" />
                )}
                <span className="font-semibold">{alt.message}</span>
              </div>
              <span className="font-bold text-[10px] px-1 rounded bg-white/70">
                {alt.count}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelectAction && onSelectAction("View All Alerts")}
          className="text-[10px] font-bold text-rose-700 hover:underline mt-1 w-full text-right block"
        >
          View All Alerts &rarr;
        </button>
      </div>

      {/* C. Coverage Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Coverage Summary</h4>
        <div className="flex justify-between text-gray-600">
          <span>Zones Coverage:</span>
          <span className="font-bold text-emerald-700">
            {data.coverageSummary.zonesCoveredRatio} ({data.coverageSummary.zonesPercentage}%)
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Services Coverage:</span>
          <span className="font-bold text-emerald-700">
            {data.coverageSummary.servicesCoveredRatio} ({data.coverageSummary.servicesPercentage}%)
          </span>
        </div>
      </div>

      {/* D. Rate Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Rate Summary</h4>
        <div className="grid grid-cols-3 gap-1 text-center bg-gray-50 p-1.5 rounded border border-gray-200">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Active Rates</span>
            <span className="font-bold text-gray-900">{data.rateSummary.activeRateRules}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Expiring</span>
            <span className="font-bold text-amber-700">{data.rateSummary.expiring}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Conflicts</span>
            <span className="font-bold text-emerald-700">{data.rateSummary.conflicts}</span>
          </div>
        </div>
      </div>

      {/* E. Capacity Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Capacity Summary</h4>
        <div className="flex justify-between text-gray-600">
          <span>Utilisation:</span>
          <span className="font-bold text-blue-700">{data.capacitySummary.utilisationPercentage}%</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>At Risk Zones:</span>
          <span className="font-bold text-amber-700">{data.capacitySummary.atRiskZones}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Capacity Limit:</span>
          <span className="font-mono font-bold text-gray-900">{data.capacitySummary.capacityLimitText}</span>
        </div>
      </div>

      {/* F. SLA Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">SLA Summary</h4>
        <div className="flex justify-between text-gray-600">
          <span>SLA Compliance:</span>
          <span className="font-bold text-emerald-700">{data.slaSummary.slaCompliancePercentage}%</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Breach-Risk Rules:</span>
          <span className="font-bold text-amber-700">{data.slaSummary.breachRiskRules}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Breached (30D):</span>
          <span className="font-bold text-rose-700">{data.slaSummary.breached30D}</span>
        </div>
      </div>

      {/* G. Carrier Eligibility Summary */}
      <div className="border-t border-gray-100 pt-2 text-[11px] space-y-1">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Carrier Eligibility Summary</h4>
        <div className="grid grid-cols-3 gap-1 text-center bg-gray-50 p-1.5 rounded border border-gray-200">
          <div>
            <span className="text-gray-400 block text-[9.5px]">Eligible</span>
            <span className="font-bold text-emerald-700">{data.carrierEligibilitySummary.eligible}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Restricted</span>
            <span className="font-bold text-amber-700">{data.carrierEligibilitySummary.restricted}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9.5px]">Ineligible</span>
            <span className="font-bold text-rose-700">{data.carrierEligibilitySummary.ineligible}</span>
          </div>
        </div>
      </div>

      {/* H. Quick Queues */}
      <div className="border-t border-gray-100 pt-2">
        <h4 className="font-bold text-gray-900 uppercase text-[10px] mb-1.5">Quick Queues</h4>
        <div className="grid grid-cols-2 gap-1.5 text-center">
          <div className="bg-rose-50 border border-rose-200 p-1.5 rounded text-[10.5px]">
            <span className="text-rose-800 font-bold block">Conflicts</span>
            <span className="text-sm font-black text-rose-900">{data.quickQueues.conflicts}</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-1.5 rounded text-[10.5px]">
            <span className="text-blue-800 font-bold block">Pending Approval</span>
            <span className="text-sm font-black text-blue-900">{data.quickQueues.pendingApproval}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-1.5 rounded text-[10.5px]">
            <span className="text-amber-800 font-bold block">Exceptions</span>
            <span className="text-sm font-black text-amber-900">{data.quickQueues.exceptions}</span>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-1.5 rounded text-[10.5px]">
            <span className="text-purple-800 font-bold block">Audit Trail</span>
            <span className="text-sm font-black text-purple-900">View</span>
          </div>
        </div>
      </div>

      {/* I. Final Configuration Actions Buttons */}
      <div className="border-t border-gray-100 pt-2 space-y-1.5">
        <h4 className="font-bold text-gray-900 uppercase text-[10px]">Final Configuration Actions</h4>
        {[
          "Review Conflicts",
          "Review Pending Changes",
          "Run Impact Simulation",
          "Open Exception Queue",
          "View Audit Trail",
        ].map((act) => (
          <button
            key={act}
            type="button"
            onClick={() => onSelectAction && onSelectAction(act)}
            className="w-full text-left px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-[10.5px] font-semibold text-gray-800 flex items-center justify-between transition-colors"
          >
            <span>{act}</span>
            <ArrowUpRight className="w-3 h-3 text-gray-400" />
          </button>
        ))}
      </div>
    </aside>
  );
}
