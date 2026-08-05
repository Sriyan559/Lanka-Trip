"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";

export function DetailReadinessBadges() {
  const badges = [
    { label: "Data Completeness", value: "85%", icon: CheckCircle2, color: "text-emerald-600", borderColor: "border-emerald-200", bg: "bg-emerald-50" },
    { label: "Compliance Readiness", value: "72%", icon: AlertTriangle, color: "text-amber-600", borderColor: "border-amber-200", bg: "bg-amber-50" },
    { label: "Brand Authorization", value: "Valid", icon: ShieldCheck, color: "text-green-600", borderColor: "border-green-200", bg: "bg-green-50" },
    { label: "Variant Readiness", value: "100%", icon: CheckCircle2, color: "text-emerald-600", borderColor: "border-emerald-200", bg: "bg-emerald-50" },
    { label: "Media Readiness", value: "80%", icon: AlertTriangle, color: "text-amber-600", borderColor: "border-amber-200", bg: "bg-amber-50" },
    { label: "Inventory Linkage", value: "Linked", icon: CheckCircle2, color: "text-emerald-600", borderColor: "border-emerald-200", bg: "bg-emerald-50" },
    { label: "Publication Readiness", value: "Not Ready", icon: AlertTriangle, color: "text-red-600", borderColor: "border-red-200", bg: "bg-red-50" },
    { label: "Duplicate Risk", value: "Low", icon: ShieldCheck, color: "text-green-600", borderColor: "border-green-200", bg: "bg-green-50" },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      {badges.map((b, i) => (
        <div key={i} className={`flex flex-col gap-1 border ${b.borderColor} ${b.bg} rounded p-2 min-w-[120px]`}>
          <div className="flex justify-center mb-1">
             <b.icon size={16} className={b.color} />
          </div>
          <div className="text-[10px] text-center font-medium text-muted leading-tight">{b.label}</div>
          <div className={`text-[12px] text-center font-bold ${b.color}`}>{b.value}</div>
        </div>
      ))}
    </div>
  );
}
