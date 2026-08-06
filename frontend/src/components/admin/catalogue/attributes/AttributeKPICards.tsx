"use client";

import React from "react";
import { FileText, CheckCircle2, Layers, GitBranch, ClipboardCheck, AlertTriangle, XCircle, Copy, Box, PackageX, ImageOff, Tag } from "lucide-react";
import { SharedKPICards, SharedKPI } from "../shared/SharedKPICards";

export function AttributeKPICards() {
  const KPIS: SharedKPI[] = [
    { label: "Total Attributes", value: "1,842", trend: "2.4%", trendUp: true, icon: FileText, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Active Attributes", value: "1,521", trend: "3.1%", trendUp: true, icon: CheckCircle2, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Attribute Groups", value: "9", trend: "- 0%", trendUp: true, icon: Layers, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Variant Attributes", value: "312", trend: "2.1%", trendUp: true, icon: GitBranch, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Required Attributes", value: "842", trend: "1.8%", trendUp: true, icon: ClipboardCheck, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Missing Attribute Values", value: "248", trend: "8.3%", trendUp: false, icon: AlertTriangle, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    
    { label: "Invalid Variant Combos", value: "36", trend: "14.3%", trendUp: false, icon: XCircle, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Duplicate SKUs", value: "16", trend: "7.7%", trendUp: false, icon: Copy, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Duplicate Barcodes", value: "22", trend: "5.9%", trendUp: false, icon: Box, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Products w/o Default Variant", value: "42", trend: "11.1%", trendUp: false, icon: PackageX, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Variant Media Gaps", value: "78", trend: "6.2%", trendUp: false, icon: ImageOff, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Variant Pricing Gaps", value: "54", trend: "4.0%", trendUp: false, icon: Tag, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
  ];

  return <SharedKPICards kpis={KPIS} />;
}
