"use client";

import React from "react";
import { MetricCard } from "../shared/MetricCard";
import { ReusableSparkline } from "../charts/ReusableSparkline";
import { ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";

export function ReportKPIGrid() {
  return (
    <div className="space-y-2 mb-3">
      {/* 11 Mini Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2">
        {/* 1. Reports Generated This Period */}
        <MetricCard
          number={1}
          title="Reports Generated"
          value="1,248"
          varianceText="+12.4%"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[1100, 1150, 1200, 1248]} />}
        />

        {/* 2. Scheduled Reports Active */}
        <MetricCard
          number={2}
          title="Scheduled Reports"
          value="84"
          varianceText="+5.3%"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[75, 78, 80, 84]} />}
        />

        {/* 3. Report Failures */}
        <MetricCard
          number={3}
          title="Report Failures"
          value="12"
          varianceText="-33.3%"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[18, 16, 14, 12]} />}
        />

        {/* 4. Import Jobs This Period */}
        <MetricCard
          number={4}
          title="Import Jobs"
          value="842"
          varianceText="+8.7%"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[780, 800, 820, 842]} />}
        />

        {/* 5. Records Imported */}
        <MetricCard
          number={5}
          title="Records Imported"
          value="4.8M"
          varianceText="+15.6%"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[4.1, 4.3, 4.5, 4.8]} />}
        />

        {/* 6. Import Records Rejected */}
        <MetricCard
          number={6}
          title="Records Rejected"
          value="31,240"
          varianceText="-25.6%"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[40000, 36000, 33000, 31240]} />}
        />

        {/* 7. Import Jobs Quarantined */}
        <MetricCard
          number={7}
          title="Jobs Quarantined"
          value="38"
          varianceText="-2.7%"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[45, 42, 40, 38]} />}
        />

        {/* 8. Exports Generated */}
        <MetricCard
          number={8}
          title="Exports Generated"
          value="512"
          varianceText="+9.8%"
          sparklineNode={<ReusableSparkline color="#8b5cf6" data={[460, 480, 500, 512]} />}
        />

        {/* 9. Export Requests Pending Approval */}
        <MetricCard
          number={9}
          title="Export Pending Appr."
          value="24"
          varianceText="+14.3%"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[18, 20, 22, 24]} />}
        />

        {/* 10. Audit Events Processed */}
        <MetricCard
          number={10}
          title="Audit Events"
          value="1,284"
          varianceText="+11.2%"
          sparklineNode={<ReusableSparkline color="#8b5cf6" data={[1100, 1150, 1220, 1284]} />}
        />

        {/* 11. Data Reconciliation Exceptions */}
        <MetricCard
          number={11}
          title="Reconciliation Ex."
          value="186"
          varianceText="-9.4%"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[210, 200, 192, 186]} />}
        />
      </div>

      {/* Secondary Governance Metric Row */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs flex flex-wrap items-center justify-between text-[11px] gap-2">
        <div className="flex items-center gap-1.5 font-bold text-gray-900">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Governance &amp; Operations SLA Metrics:</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Report Delivery Success Rate:</span>
            <span className="font-bold text-emerald-700 font-mono">98.4%</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Import Validation Pass Rate:</span>
            <span className="font-bold text-emerald-700 font-mono">94.2%</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Export Approval Compliance:</span>
            <span className="font-bold text-gray-900 font-mono">91.0%</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Audit Completeness:</span>
            <span className="font-bold text-emerald-700 font-mono">92%</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Reconciliation Match Rate:</span>
            <span className="font-bold text-emerald-700 font-mono">95.6%</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Retention Compliance:</span>
            <span className="font-bold text-emerald-700 font-mono">98.7%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
