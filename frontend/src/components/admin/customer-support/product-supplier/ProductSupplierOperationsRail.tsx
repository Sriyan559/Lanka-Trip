"use client";

import React from "react";
import {
  Activity,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Search,
  Truck,
  FileText,
  Package,
} from "lucide-react";
import { ProductSupplierOperationsRailData } from "./types";

interface ProductSupplierOperationsRailProps {
  data: ProductSupplierOperationsRailData;
}

export function ProductSupplierOperationsRail({ data }: ProductSupplierOperationsRailProps) {
  return (
    <div className="flex flex-col gap-3 w-full h-auto self-start">
      {/* 0. Product & Supplier Support Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Activity size={14} className="text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900">Product &amp; Supplier Support Health</h4>
        </div>

        <div className="flex items-center gap-4">
          {/* Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-emerald-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${data.supportHealthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">{data.supportHealthScore}</span>
              <span className="text-[9px] text-slate-400 font-semibold">/100</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-0.5 text-[11px]">
            <span className="font-extrabold text-emerald-700">{data.supportHealthLabel}</span>
            <p className="text-[10px] text-slate-500 leading-tight">Healthy operations with strong response performance.</p>
            <span className="text-[10px] text-slate-400 font-medium">Target: {data.targetScore}</span>
          </div>
        </div>
      </div>

      {/* 1. Selected Case Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Selected Case Health</h4>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-emerald-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-600" strokeDasharray={`${data.selectedCaseHealthScore}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-xs font-extrabold text-slate-900">{data.selectedCaseHealthScore}%</span>
          </div>
          <div className="flex flex-col text-[11px]">
            <span className="font-bold text-emerald-700">{data.selectedCaseHealthLabel}</span>
            <span className="text-[10px] text-slate-500">On track with minor risks.</span>
          </div>
        </div>
      </div>

      {/* 2. Case Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Case Summary (198 Active Cases)</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Open</span><span className="font-bold text-slate-900 text-xs">{data.caseSummary.open}</span></div>
          <div><span className="text-slate-400 block font-medium">At Risk</span><span className="font-bold text-amber-700 text-xs">{data.caseSummary.atRisk}</span></div>
          <div><span className="text-slate-400 block font-medium">Reopened</span><span className="font-bold text-purple-700 text-xs">{data.caseSummary.reopened}</span></div>
          <div><span className="text-slate-400 block font-medium">Critical</span><span className="font-bold text-red-600 text-xs">{data.caseSummary.critical}</span></div>
          <div><span className="text-slate-400 block font-medium">Escalated</span><span className="font-bold text-red-600 text-xs">{data.caseSummary.escalated}</span></div>
        </div>
      </div>

      {/* 3. Product & Issue Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Product &amp; Issue Summary</h4>
        <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Quality</span><span className="font-bold text-blue-700 text-xs">{data.productIssueSummary.quality}</span></div>
          <div><span className="text-slate-400 block font-medium">Defective</span><span className="font-bold text-slate-900 text-xs">{data.productIssueSummary.defective}</span></div>
          <div><span className="text-slate-400 block font-medium">Ingredient</span><span className="font-bold text-purple-700 text-xs">{data.productIssueSummary.usageIngredient}</span></div>
          <div><span className="text-slate-400 block font-medium">Damaged</span><span className="font-bold text-amber-700 text-xs">{data.productIssueSummary.damaged}</span></div>
          <div><span className="text-slate-400 block font-medium">Packaging</span><span className="font-bold text-slate-700 text-xs">{data.productIssueSummary.packaging}</span></div>
        </div>
      </div>

      {/* 4. Authenticity Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Authenticity Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Concerns</span><span className="font-bold text-amber-700 text-xs">{data.authenticitySummary.concerns}</span></div>
          <div><span className="text-slate-400 block font-medium">Compliance</span><span className="font-bold text-purple-700 text-xs">{data.authenticitySummary.complianceCases}</span></div>
          <div><span className="text-slate-400 block font-medium">Review Req</span><span className="font-bold text-amber-700 text-xs">{data.authenticitySummary.reviewRequired}</span></div>
          <div><span className="text-slate-400 block font-medium">Suspected</span><span className="font-bold text-red-600 text-xs">{data.authenticitySummary.counterfeitSuspected}</span></div>
        </div>
      </div>

      {/* 5. Supplier Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Supplier Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Supplier Issues</span><span className="font-bold text-[#800020] text-xs">{data.supplierSummary.supplierIssues}</span></div>
          <div><span className="text-slate-400 block font-medium">SLA Risk</span><span className="font-bold text-amber-700 text-xs">{data.supplierSummary.slaRisk}</span></div>
          <div><span className="text-slate-400 block font-medium">Waiting Supplier</span><span className="font-bold text-blue-700 text-xs">{data.supplierSummary.waitingSupplier}</span></div>
          <div><span className="text-slate-400 block font-medium">Quality Incidents</span><span className="font-bold text-red-600 text-xs">{data.supplierSummary.qualityIncidents}</span></div>
        </div>
      </div>

      {/* 6. Safety Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Safety Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Concerns</span><span className="font-bold text-rose-700 text-xs">{data.safetySummary.safetyConcerns}</span></div>
          <div><span className="text-slate-400 block font-medium">Escalated</span><span className="font-bold text-purple-700 text-xs">{data.safetySummary.complianceEscalated}</span></div>
          <div><span className="text-slate-400 block font-medium">High Severity</span><span className="font-bold text-red-700 text-xs">{data.safetySummary.highSeverity}</span></div>
          <div><span className="text-slate-400 block font-medium">Open Safety</span><span className="font-bold text-slate-900 text-xs">{data.safetySummary.openSafetyCases}</span></div>
        </div>
      </div>

      {/* 7. Dependency Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Dependency Summary</h4>
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <div><span className="text-slate-400 block font-medium">Compliance</span><span className="font-bold text-[#800020] text-xs">{data.dependencySummary.waitingCompliance}</span></div>
          <div><span className="text-slate-400 block font-medium">Customer</span><span className="font-bold text-amber-700 text-xs">{data.dependencySummary.waitingCustomer}</span></div>
          <div><span className="text-slate-400 block font-medium">Supplier</span><span className="font-bold text-blue-700 text-xs">{data.dependencySummary.waitingSupplier}</span></div>
          <div><span className="text-slate-400 block font-medium">Catalogue</span><span className="font-bold text-slate-700 text-xs">{data.dependencySummary.waitingCatalogue}</span></div>
        </div>
      </div>

      {/* 8. Quick Queues */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Quick Queues</h4>
        <div className="flex flex-col gap-1 text-[11px]">
          {data.quickQueues.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-50 last:border-0">
              <span className="text-slate-700 font-medium">{q.label}</span>
              <span className={`font-bold font-mono px-1.5 py-0.2 rounded text-[10px] ${
                q.variant === "danger"
                  ? "bg-red-100 text-red-800"
                  : q.variant === "warning"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
              }`}>{q.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Next Actions */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100">Next Actions</h4>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Initiate Compliance Escalation", icon: ShieldAlert },
            { label: "Initiate Authenticity Review", icon: Search },
            { label: "Initiate Safety Review", icon: AlertTriangle },
            { label: "Initiate SLA Risk Review", icon: Clock },
            { label: "Contact Supplier Team", icon: Truck },
            { label: "Assign Customer Update", icon: FileText },
            { label: "Open Product Support Audit", icon: Package },
          ].map((act, idx) => {
            const IconComp = act.icon;
            return (
              <button
                key={idx}
                className="w-full py-1.5 px-2.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs text-left"
              >
                <div className="flex items-center gap-1.5">
                  <IconComp size={13} />
                  <span className="truncate">{act.label}</span>
                </div>
                <ChevronRight size={13} className="text-red-200 shrink-0 ml-1" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
