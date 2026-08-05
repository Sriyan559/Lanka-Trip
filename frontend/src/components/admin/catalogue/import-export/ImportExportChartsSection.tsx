"use client";

import React from "react";
import { SharedLineChart } from "../shared/SharedLineChart";
import { SharedPieChart } from "../shared/SharedPieChart";

export function ImportExportChartsSection() {
  const trendData = [
    { name: 'Jul 6', imports: 120, exports: 80, failures: 10, processing: 5 },
    { name: 'Jul 13', imports: 130, exports: 90, failures: 12, processing: 6 },
    { name: 'Jul 20', imports: 140, exports: 100, failures: 15, processing: 8 },
    { name: 'Jul 27', imports: 145, exports: 110, failures: 16, processing: 9 },
    { name: 'Aug 3', imports: 160, exports: 124, failures: 20, processing: 11 },
  ];

  const trendSeries = [
    { key: "imports", label: "Imports", color: "#0284c7" },
    { key: "exports", label: "Exports", color: "#059669" },
    { key: "failures", label: "Failures", color: "#dc2626" },
    { key: "processing", label: "Processing", color: "#f59e0b" },
  ];

  const distributionData = [
    { name: 'Completed', value: 842, color: '#059669' },
    { name: 'Failed', value: 124, color: '#dc2626' },
    { name: 'Partial Success', value: 218, color: '#f59e0b' },
    { name: 'Processing', value: 64, color: '#0284c7' },
  ];

  const methodDistributionData = [
    { name: 'API Sync', value: 540, color: '#8b5cf6' },
    { name: 'Manual Upload (CSV)', value: 420, color: '#0ea5e9' },
    { name: 'PIM Integration', value: 210, color: '#10b981' },
    { name: 'Scheduled Job', value: 78, color: '#64748b' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr_1.5fr] gap-0 bg-white rounded-xl border border-line shadow-sm overflow-hidden mb-6">
      <SharedLineChart 
        title="Data Operations Trend" 
        data={trendData} 
        series={trendSeries} 
        xAxisKey="name" 
      />
      <SharedPieChart 
        title="Job Status Distribution" 
        data={distributionData} 
        totalLabel="Total Jobs" 
      />
      <SharedPieChart 
        title="Import Methods" 
        data={methodDistributionData} 
        totalLabel="Total Methods" 
      />
    </div>
  );
}
