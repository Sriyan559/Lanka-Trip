"use client";

import React from "react";
import { FileText, CheckCircle2, ShieldCheck, Clock, AlertTriangle, XCircle, HelpCircle, UserX, Copy, Ban, Archive } from "lucide-react";
import { SharedKPICards, SharedKPI } from "../shared/SharedKPICards";

export function BrandKPICards() {
  const KPIS: SharedKPI[] = [
    { label: "Total Brands", value: "486", trend: "2.4%", trendUp: true, icon: FileText, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Active Brands", value: "438", trend: "3.1%", trendUp: true, icon: CheckCircle2, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Verified Brands", value: "412", trend: "2.7%", trendUp: true, icon: ShieldCheck, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Pending Verification", value: "24", trend: "14.3%", trendUp: false, icon: Clock, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Conditional Authorization", value: "18", trend: "2.3%", trendUp: false, icon: AlertTriangle, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Expiring Authorizations", value: "18", trend: "28.6%", trendUp: false, icon: Clock, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    
    { label: "Expired Authorizations", value: "6", trend: "20.0%", trendUp: false, icon: XCircle, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Unauthorized Brand Use", value: "9", trend: "12.5%", trendUp: false, icon: HelpCircle, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Brands Missing Owner", value: "12", trend: "9.1%", trendUp: false, icon: UserX, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Duplicate Brand Risks", value: "14", trend: "7.7%", trendUp: false, icon: Copy, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Channel Eligibility Conflicts", value: "7", trend: "16.7%", trendUp: false, icon: Ban, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Archived Brands", value: "16", trend: "5.9%", trendUp: true, icon: Archive, color: "text-slate-500", bg: "bg-slate-50" },
  ];

  return <SharedKPICards kpis={KPIS} />;
}
