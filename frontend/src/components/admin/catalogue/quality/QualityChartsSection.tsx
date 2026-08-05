"use client";

import React from "react";
import { SharedLineChart } from "../shared/SharedLineChart";
import { SharedPieChart } from "../shared/SharedPieChart";

export function QualityChartsSection() {
  const trendData = [
    { name: 'Jul 6', open: 1200, resolved: 800, critical: 100, breaches: 50 },
    { name: 'Jul 13', open: 1300, resolved: 900, critical: 120, breaches: 60 },
    { name: 'Jul 20', open: 1400, resolved: 1000, critical: 150, breaches: 80 },
    { name: 'Jul 27', open: 1450, resolved: 1100, critical: 160, breaches: 90 },
    { name: 'Aug 3', open: 1600, resolved: 1248, critical: 200, breaches: 110 },
  ];

  const trendSeries = [
    { key: "open", label: "Open Issues", color: "#0284c7" },
    { key: "resolved", label: "Resolved Issues", color: "#059669" },
    { key: "critical", label: "Critical Issues", color: "#dc2626" },
    { key: "breaches", label: "SLA Breaches", color: "#8b5cf6" },
  ];

  const issueDistributionData = [
    { name: 'Duplicates', value: 432, color: '#0284c7' }, // Blue
    { name: 'Incomplete Data', value: 288, color: '#059669' }, // Green
    { name: 'Validation Failures', value: 192, color: '#f59e0b' }, // Yellow
    { name: 'Publication Blockers', value: 128, color: '#dc2626' }, // Red
    { name: 'Classification', value: 96, color: '#8b5cf6' }, // Purple
    { name: 'Media', value: 72, color: '#14b8a6' }, // Teal
  ];

  const statusSummaryData = [
    { name: 'New', value: 512, color: '#0284c7' },
    { name: 'In Review', value: 284, color: '#f59e0b' },
    { name: 'Waiting Owner', value: 196, color: '#f59e0b' },
    { name: 'Resolved', value: 214, color: '#059669' },
    { name: 'Escalated', value: 42, color: '#dc2626' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr_1.5fr] gap-0 bg-white rounded-xl border border-line shadow-sm overflow-hidden mb-6">
      <SharedLineChart 
        title="Catalogue Quality Trend" 
        data={trendData} 
        series={trendSeries} 
        xAxisKey="name" 
      />
      <SharedPieChart 
        title="Issue Distribution" 
        data={issueDistributionData} 
        totalLabel="Total Issues" 
      />
      <SharedPieChart 
        title="Issue Status Summary" 
        data={statusSummaryData} 
        totalLabel="Total Status" 
      />
    </div>
  );
}
