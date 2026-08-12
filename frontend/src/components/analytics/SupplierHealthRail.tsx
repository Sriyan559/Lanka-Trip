"use client";

import React from "react";
import { SupplierHealthRailData } from "@/data/analytics/suppliersData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp, ArrowDown } from "lucide-react";

interface SupplierHealthRailProps {
  data: SupplierHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function SupplierHealthRail({
  data,
  className = "",
  onActionClick,
}: SupplierHealthRailProps) {
  const {
    healthScore,
    label,
    supplierSummary,
    procurementSummary,
    performanceSummary,
    dependencySummary,
    riskSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Supplier Analytics Report",
    "Review Supplier Risks",
    "Review Supplier Quality",
    "Review Procurement Costs",
    "Review Lead-Time Risks",
    "Review Dependency Exposure",
    "Run Procurement Forecast",
    "Open Supplier Analytics Audit",
    "Contract Expiry Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Supplier Analytics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={90} strokeWidth={8} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block mt-1">{label}</span>
      </div>

      {/* Supplier Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Supplier Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Active Suppliers</span>
          <span className="font-bold text-slate-900">{supplierSummary.activeSuppliers}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Strategic Suppliers</span>
          <span className="font-bold text-slate-900">{supplierSummary.strategicSuppliers}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Preferred Suppliers</span>
          <span className="font-bold text-slate-900">{supplierSummary.preferredSuppliers}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">At Risk Suppliers</span>
          <span className="font-bold text-rose-700">{supplierSummary.atRiskSuppliers}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Restricted Suppliers</span>
          <span className="font-bold text-slate-900">{supplierSummary.restrictedSuppliers}</span>
        </div>
      </div>

      {/* Procurement Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Procurement Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Procurement Spend (LKR)</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{procurementSummary.spend}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {procurementSummary.spendDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Purchase Orders</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{procurementSummary.purchaseOrders}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {procurementSummary.ordersDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">PPV vs Budget</span>
          <span className="font-bold text-emerald-600">{procurementSummary.ppvVsBudget}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Avg Lead Time</span>
          <span className="font-bold text-slate-900">{procurementSummary.avgLeadTime}</span>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Performance Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Avg Fill Rate</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.fillRate}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {performanceSummary.fillDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">On-Time Supply</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.onTimeSupply}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {performanceSummary.onTimeDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Quality Score</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.qualityScore}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {performanceSummary.qualityDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">SLA Compliance</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.slaCompliance}</span>
            <span className="text-[10px] font-bold text-rose-600 inline-flex items-center">
              <ArrowDown size={9} /> {performanceSummary.slaDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Dependency Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Dependency Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Single-Source Products</span>
          <span className="font-bold text-slate-900">{dependencySummary.singleSource}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Multi-Source Products</span>
          <span className="font-bold text-slate-900">{dependencySummary.multiSource}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Alternate Coverage</span>
          <span className="font-bold text-emerald-600">{dependencySummary.alternateCoverage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Spend Exposure (LKR)</span>
          <span className="font-bold text-slate-900">{dependencySummary.spendExposure}</span>
        </div>
      </div>

      {/* Supplier Risk Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Supplier Risk Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Operational Risk</span>
          <span className="font-bold text-rose-700">{riskSummary.operationalRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Quality Risk</span>
          <span className="font-bold text-amber-600">{riskSummary.qualityRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Compliance Risk</span>
          <span className="font-bold text-emerald-600">{riskSummary.complianceRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cost Risk</span>
          <span className="font-bold text-amber-600">{riskSummary.costRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Continuity Risk</span>
          <span className="font-bold text-emerald-600">{riskSummary.continuityRisk}</span>
        </div>
      </div>

      {/* Quick Queues */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Quick Queues
        </h4>
        <div className="space-y-1 text-[11px]">
          {quickQueues.map((q, idx) => (
            <div key={idx} className="flex items-center justify-between py-0.5">
              <span className="text-slate-600 font-medium truncate max-w-[140px]">{q.queueName}</span>
              <span className="font-extrabold text-rose-700 text-[11px]">{q.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Actions */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Final Actions
        </h4>
        <div className="space-y-1.5">
          {actionButtons.map((btnText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick?.(btnText)}
              className={`w-full py-1 px-2.5 font-semibold text-[11px] border rounded transition-colors text-center cursor-pointer shadow-2xs ${
                idx === 0
                  ? "bg-burgundy text-white border-burgundy hover:bg-burgundy-dark font-bold"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              {btnText}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
