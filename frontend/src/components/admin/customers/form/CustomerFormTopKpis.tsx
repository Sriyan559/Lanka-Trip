"use client";

import React from "react";
import { CustomerFormFullData } from "@/types/customer-form";
import { CheckCircle2, FileText, AlertTriangle, MinusCircle, Users, Save, UserCheck, ShieldAlert } from "lucide-react";

interface CustomerFormTopKpisProps {
  metrics: CustomerFormFullData["completenessMetrics"];
}

export function CustomerFormTopKpis({ metrics }: CustomerFormTopKpisProps) {
  const kpis = [
    {
      id: "overall-completeness",
      label: "Overall Completeness",
      value: `${metrics.overallCompleteness}%`,
      isScoreGauge: true,
    },
    {
      id: "required-fields",
      label: "Required Fields Completed",
      value: `${metrics.requiredCompleted} / ${metrics.totalRequired}`,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "optional-fields",
      label: "Optional Fields Completed",
      value: `${metrics.optionalCompleted} / ${metrics.totalOptional}`,
      icon: FileText,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "open-validation-issues",
      label: "Open Validation Issues",
      value: metrics.openValidationIssues.toString(),
      icon: AlertTriangle,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      id: "blocking-issues",
      label: "Blocking Issues",
      value: metrics.blockingIssues.toString(),
      icon: MinusCircle,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      id: "warnings",
      label: "Warnings",
      value: metrics.warnings.toString(),
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "duplicate-candidates",
      label: "Duplicate Candidates",
      value: metrics.duplicateCandidates.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "autosave-status",
      label: "Autosave Status",
      value: metrics.autosaveStatus,
      icon: Save,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "current-step",
      label: "Current Step",
      value: metrics.currentStepLabel,
      icon: UserCheck,
      color: "text-slate-700",
      bgColor: "bg-slate-100",
    },
    {
      id: "approval-required",
      label: "Approval Required",
      value: metrics.approvalRequired,
      icon: ShieldAlert,
      color: "text-amber-700",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-2">
      {kpis.map((kpi) => {
        if (kpi.isScoreGauge) {
          return (
            <div
              key={kpi.id}
              className="bg-white border border-line rounded-lg p-2 px-2.5 shadow-2xs flex items-center gap-2"
            >
              <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle cx="16" cy="16" r="13" stroke="#e2e8f0" strokeWidth="3" fill="transparent" />
                  <circle
                    cx="16"
                    cy="16"
                    r="13"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeDasharray="82"
                    strokeDashoffset="15"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[9.5px] font-black text-ink font-mono">{metrics.overallCompleteness}%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9.5px] font-bold text-slate-800 leading-tight">Overall Completeness</span>
              </div>
            </div>
          );
        }

        const IconComp = kpi.icon!;
        return (
          <div
            key={kpi.id}
            className="bg-white border border-line rounded-lg p-2 px-2.5 shadow-2xs flex items-center gap-2"
          >
            <div className={`w-6 h-6 rounded-md ${kpi.bgColor} flex items-center justify-center flex-shrink-0`}>
              <IconComp className={`w-3.5 h-3.5 ${kpi.color}`} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[8.5px] font-semibold text-slate-400 truncate block leading-tight">
                {kpi.label}
              </span>
              <span className="text-[11px] font-black text-ink font-mono tracking-tight truncate leading-tight">
                {kpi.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
