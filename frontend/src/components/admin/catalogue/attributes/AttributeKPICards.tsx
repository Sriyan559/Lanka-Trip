"use client";

import React from "react";
import { ListTree, Tags, Layers, FileWarning, ShieldAlert, GitBranch } from "lucide-react";
import { SharedKPICards, SharedKPI } from "../shared/SharedKPICards";

export function AttributeKPICards() {
  const KPIS: SharedKPI[] = [
    { label: "Global Attributes", value: "482", trend: "1.2%", trendUp: true, icon: Tags, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Attribute Sets", value: "86", trend: "0.5%", trendUp: true, icon: Layers, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Variant Families", value: "1,204", trend: "4.1%", trendUp: true, icon: GitBranch, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Mapped Values", value: "14,892", trend: "8.3%", trendUp: true, icon: ListTree, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Unmapped Values", value: "342", trend: "12.4%", trendUp: false, icon: FileWarning, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Normalization Conflicts", value: "28", trend: "18.2%", trendUp: false, icon: ShieldAlert, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
  ];

  return <SharedKPICards kpis={KPIS} />;
}
