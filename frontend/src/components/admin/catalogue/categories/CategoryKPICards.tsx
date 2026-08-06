"use client";

import React from "react";
import { FolderTree, CheckCircle2, Building2, LayoutList, Ghost, CircleSlash } from "lucide-react";
import { SharedKPICards, SharedKPI } from "../shared/SharedKPICards";

export function CategoryKPICards() {
  const KPIS: SharedKPI[] = [
    { label: "Total Categories", value: "148", trend: "2.4%", trendUp: true, icon: FolderTree, color: "text-slate-500", bg: "bg-slate-50 border-line" },
    { label: "Active Categories", value: "132", trend: "3.1%", trendUp: true, icon: CheckCircle2, color: "text-[#059669]", bg: "bg-green-50 border-green-200" },
    { label: "Departments", value: "8", trend: "—", trendUp: true, icon: Building2, color: "text-slate-500", bg: "bg-slate-50 border-line" },
    { label: "Subcategories", value: "96", trend: "1.8%", trendUp: true, icon: LayoutList, color: "text-slate-500", bg: "bg-slate-50 border-line" },
    { label: "Empty Categories", value: "8", trend: "11.1%", trendUp: false, icon: Ghost, color: "text-[#d97706]", bg: "bg-amber-50 border-amber-200", isWarning: true },
    { label: "Uncategorized Products", value: "22", trend: "8.3%", trendUp: false, icon: CircleSlash, color: "text-[#dc2626]", bg: "bg-red-50 border-red-200", isWarning: true },
    
    { label: "Review Required", value: "14", trend: "6.7%", trendUp: false, icon: Ghost, color: "text-[#d97706]", bg: "bg-amber-50 border-amber-200", isWarning: true },
    { label: "Missing Attributes", value: "18", trend: "5.9%", trendUp: false, icon: CircleSlash, color: "text-[#dc2626]", bg: "bg-red-50 border-red-200", isWarning: true },
    { label: "Duplicate Risks", value: "6", trend: "14.3%", trendUp: false, icon: CircleSlash, color: "text-[#dc2626]", bg: "bg-red-50 border-red-200", isWarning: true },
    { label: "Channel Conflicts", value: "9", trend: "12.5%", trendUp: false, icon: CircleSlash, color: "text-[#dc2626]", bg: "bg-red-50 border-red-200", isWarning: true },
    { label: "Compliance Gaps", value: "12", trend: "7.7%", trendUp: false, icon: CircleSlash, color: "text-[#dc2626]", bg: "bg-red-50 border-red-200", isWarning: true },
    { label: "Archived", value: "16", trend: "2.1%", trendUp: true, icon: FolderTree, color: "text-slate-500", bg: "bg-slate-50 border-line" },
  ];

  return <SharedKPICards kpis={KPIS} />;
}
