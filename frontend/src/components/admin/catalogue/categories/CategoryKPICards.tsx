"use client";

import React from "react";
import { FolderTree, CheckCircle2, Building2, LayoutList, Ghost, CircleSlash } from "lucide-react";
import { SharedKPICards, SharedKPI } from "../shared/SharedKPICards";

export function CategoryKPICards() {
  const KPIS: SharedKPI[] = [
    { label: "Total Categories", value: "148", trend: "2.4%", trendUp: true, icon: FolderTree, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Active Categories", value: "132", trend: "3.1%", trendUp: true, icon: CheckCircle2, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Departments", value: "8", trend: "0%", trendUp: true, icon: Building2, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Subcategories", value: "96", trend: "", trendUp: true, icon: LayoutList, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Empty Categories", value: "8", trend: "11.1%", trendUp: false, icon: Ghost, color: "text-[#d97706]", bg: "bg-amber-50", isWarning: true },
    { label: "Uncategorized Products", value: "22", trend: "8.3%", trendUp: false, icon: CircleSlash, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
  ];

  return <SharedKPICards kpis={KPIS} />;
}
