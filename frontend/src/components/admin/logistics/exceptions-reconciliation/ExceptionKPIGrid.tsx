"use client";

import React from "react";
import { MetricCard } from "../shared/MetricCard";
import { ReusableSparkline } from "../charts/ReusableSparkline";
import { ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";

export function ExceptionKPIGrid() {
  return (
    <div className="space-y-2 mb-3">
      {/* 12 Mini Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
        {/* 1. Open Logistics Exceptions */}
        <MetricCard
          number={1}
          title="Open Exceptions"
          value={186}
          varianceText="+12 this week"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[160, 172, 178, 186]} />}
        />

        {/* 2. Critical Exceptions */}
        <MetricCard
          number={2}
          title="Critical Exceptions"
          value={24}
          varianceText="High Severity"
          isWarning
          sparklineNode={<ReusableSparkline color="#ef4444" data={[18, 20, 22, 24]} />}
        />

        {/* 3. Claims Open */}
        <MetricCard
          number={3}
          title="Claims Open"
          value={38}
          varianceText="30 Carrier / 8 Supp"
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[28, 32, 35, 38]} />}
        />

        {/* 4. Claims Pending Response */}
        <MetricCard
          number={4}
          title="Claims Pending Carrier"
          value={14}
          varianceText="Awaiting Carrier"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[10, 12, 14, 14]} />}
        />

        {/* 5. Claim Value */}
        <MetricCard
          number={5}
          title="Claim Value"
          value="LKR 4.8M"
          varianceText="Total Value"
          sparklineNode={<ReusableSparkline color="#8b5cf6" data={[4.1, 4.3, 4.6, 4.8]} />}
        />

        {/* 6. Unreconciled Logistics Cost */}
        <MetricCard
          number={6}
          title="Unreconciled Cost"
          value="LKR 6.8M"
          varianceText="Variance Queue"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[6.0, 6.2, 6.5, 6.8]} />}
        />

        {/* 7. Cost Variance Cases */}
        <MetricCard
          number={7}
          title="Cost Variance Cases"
          value={42}
          varianceText="Active Cases"
          sparklineNode={<ReusableSparkline color="#3b82f6" data={[35, 38, 40, 42]} />}
        />

        {/* 8. Unmatched Records */}
        <MetricCard
          number={8}
          title="Unmatched Records"
          value={214}
          varianceText="Pending Match"
          sparklineNode={<ReusableSparkline color="#8b5cf6" data={[190, 200, 208, 214]} />}
        />

        {/* 9. Reconciliation Exceptions */}
        <MetricCard
          number={9}
          title="Reconciliation Ex."
          value={18}
          varianceText="Feed Discrepancy"
          isWarning
          sparklineNode={<ReusableSparkline color="#f59e0b" data={[12, 15, 16, 18]} />}
        />

        {/* 10. Recoveries Pending */}
        <MetricCard
          number={10}
          title="Recoveries Pending"
          value={12}
          varianceText="LKR 1.2M Pending"
          isSuccess
          sparklineNode={<ReusableSparkline color="#10b981" data={[8, 10, 11, 12]} />}
        />

        {/* 11. Control Breaches */}
        <MetricCard
          number={11}
          title="Control Breaches"
          value={7}
          varianceText="Audit Alerts"
          isWarning
          sparklineNode={<ReusableSparkline color="#ef4444" data={[4, 5, 6, 7]} />}
        />

        {/* 12. Control SLA Breaches */}
        <MetricCard
          number={12}
          title="SLA Breaches"
          value={8}
          varianceText="SLA Overdue"
          isWarning
          sparklineNode={<ReusableSparkline color="#ef4444" data={[5, 6, 7, 8]} />}
        />
      </div>

      {/* Secondary Control Metrics Row */}
      <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs flex flex-wrap items-center justify-between text-[11px] gap-2">
        <div className="flex items-center gap-1.5 font-bold text-gray-900">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secondary Control Metrics:</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Reconciliation Match Rate:</span>
            <span className="font-bold text-gray-900">92%</span>
            <span className="text-emerald-700 font-bold text-[10px] flex items-center">
              <ArrowUpRight className="w-3 h-3" />2%
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Claim Recovery Rate:</span>
            <span className="font-bold text-gray-900">71%</span>
            <span className="text-emerald-700 font-bold text-[10px] flex items-center">
              <ArrowUpRight className="w-3 h-3" />4%
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Avg Claim Resolution Time:</span>
            <span className="font-bold text-gray-900">5.6 days</span>
            <span className="text-emerald-700 font-bold text-[10px] flex items-center">
              <ArrowDownRight className="w-3 h-3" />0.8
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Cost Accuracy:</span>
            <span className="font-bold text-gray-900">88%</span>
            <span className="text-rose-700 font-bold text-[10px] flex items-center">
              <ArrowDownRight className="w-3 h-3" />2%
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Exception Resolution Rate:</span>
            <span className="font-bold text-gray-900">93%</span>
            <span className="text-emerald-700 font-bold text-[10px] flex items-center">
              <ArrowUpRight className="w-3 h-3" />1%
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Audit Completeness:</span>
            <span className="font-bold text-gray-900">93%</span>
            <span className="text-emerald-700 font-bold text-[10px] flex items-center">
              <ArrowUpRight className="w-3 h-3" />1%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
