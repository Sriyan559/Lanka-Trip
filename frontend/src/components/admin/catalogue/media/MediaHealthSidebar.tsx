"use client";

import React from "react";
import { AlertTriangle, FileWarning, Layers, AlertCircle, Image as ImageIcon, Video, Droplets } from "lucide-react";
import { SharedCircularHealth, SharedHealthMetric } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function MediaHealthSidebar() {
  const HEALTH_METRICS: SharedHealthMetric[] = [
    { label: "Full Kit Coverage", value: "88%", color: "bg-[#059669]" },
    { label: "Missing Primary", value: "2%", color: "bg-[#ea580c]" },
    { label: "Missing Swatch", value: "14%", color: "bg-[#ea580c]" },
    { label: "Has Video Asset", value: "34%", color: "bg-[#059669]" },
  ];

  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "Low resolution (<1000px)", count: "142", level: "High", icon: AlertTriangle },
    { id: 2, text: "Unsupported format (TIFF)", count: "8", level: "High", icon: FileWarning },
    { id: 3, text: "Missing alt text tags", count: "1.2K", level: "Medium", icon: AlertCircle },
    { id: 4, text: "Exceeds size limits (>5MB)", count: "48", level: "Low", icon: Layers },
  ];

  const STORAGE: ProgressItem[] = [
    { label: "Product Images", value: "4.2 TB", pct: 50, color: "bg-[#0284c7]" },
    { label: "Videos", value: "3.1 TB", pct: 36, color: "bg-[#ea580c]" },
    { label: "Swatches", value: "0.8 TB", pct: 10, color: "bg-[#741d35]" },
    { label: "Documents", value: "0.3 TB", pct: 4, color: "bg-[#059669]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Media Kit Completeness"
        score={88}
        statusText="Good Health"
        linkText="View gap analysis report"
        layout="horizontal"
        metrics={HEALTH_METRICS}
      />

      <SharedPriorityAlerts 
        title="Quality Alerts"
        alerts={ALERTS}
        layout="list"
      />

      <SharedProgressList 
        title="Storage Breakdown"
        items={STORAGE}
        layout="vertical"
      />
    </div>
  );
}
