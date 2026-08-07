"use client";

import React from "react";
import { Image, Video, HardDrive, FileWarning, Globe, ShieldAlert, AlertTriangle, Layers, Box, ImageOff, Ban, Copy } from "lucide-react";
import { SharedKPICards, SharedKPI } from "../shared/SharedKPICards";

export function MediaKPICards() {
  const KPIS: SharedKPI[] = [
    { label: "Total Assets", value: "284,912", trend: "3.2%", trendUp: true, icon: Image, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Storage Used", value: "8.4 TB", trend: "1.1%", trendUp: true, icon: HardDrive, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Main Images", value: "142,400", trend: "2.4%", trendUp: true, icon: Image, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Variant Swatches", value: "98,124", trend: "4.1%", trendUp: true, icon: Layers, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Video Assets", value: "14,892", trend: "8.3%", trendUp: true, icon: Video, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Missing Mandatory", value: "1,204", trend: "4.1%", trendUp: false, icon: AlertTriangle, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    
    { label: "Unmapped Swatches", value: "482", trend: "8.3%", trendUp: false, icon: ShieldAlert, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Orphaned Media", value: "3,142", trend: "2.4%", trendUp: false, icon: FileWarning, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Low Res Assets", value: "846", trend: "1.2%", trendUp: false, icon: ImageOff, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Watermark Conflicts", value: "124", trend: "5.4%", trendUp: false, icon: Ban, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Duplicate Assets", value: "2,410", trend: "2.1%", trendUp: false, icon: Copy, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "CDN Cache Hit", value: "98.8%", trend: "0.2%", trendUp: true, icon: Globe, color: "text-[#059669]", bg: "bg-green-50" },
  ];

  return <SharedKPICards kpis={KPIS} />;
}
