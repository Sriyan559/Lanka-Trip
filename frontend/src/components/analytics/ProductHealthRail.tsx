"use client";

import React from "react";
import { ProductHealthRailData } from "@/data/analytics/productsBrandsData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ProductHealthRailProps {
  data: ProductHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function ProductHealthRail({
  data,
  className = "",
  onActionClick,
}: ProductHealthRailProps) {
  const {
    healthScore,
    label,
    productSummary,
    performanceSummary,
    catalogueSummary,
    inventorySummary,
    riskSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Product Analytics Report",
    "Review Product Risks",
    "Review Catalogue Quality",
    "Run Product Forecast",
    "Review High Risk Products",
    "Run Product Financials",
    "Open Product Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Product Analytics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={90} strokeWidth={8} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block mt-1">{label}</span>
      </div>

      {/* Product Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Product Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Total Products</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{productSummary.totalProducts}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {productSummary.productsDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Active Products</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{productSummary.activeProducts}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {productSummary.activeDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">New Products (30D)</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{productSummary.newProducts}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {productSummary.newDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Discontinued (30D)</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{productSummary.discontinued}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowDown size={9} /> {productSummary.discontinuedDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Performance Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Product Revenue</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.productRevenue}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {performanceSummary.revenueDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Gross Profit</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.grossProfit}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {performanceSummary.profitDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Avg Margin</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.avgMargin}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {performanceSummary.marginDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Conversion Rate</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.conversionRate}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {performanceSummary.convDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Return Rate</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{performanceSummary.returnRate}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowDown size={9} /> {performanceSummary.returnDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Catalogue Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Catalogue Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Catalogue Quality</span>
          <span className="font-bold text-emerald-600">{catalogueSummary.quality}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Attribute Completeness</span>
          <span className="font-bold text-emerald-600">{catalogueSummary.completeness}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Image Coverage</span>
          <span className="font-bold text-emerald-600">{catalogueSummary.imageCoverage}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Data Consistency</span>
          <span className="font-bold text-emerald-600">{catalogueSummary.dataConsistency}</span>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Inventory Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Inventory Turnover</span>
          <span className="font-bold text-slate-900">{inventorySummary.turnover}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Days of Inventory</span>
          <span className="font-bold text-slate-900">{inventorySummary.daysOfInventory}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Stock-Out Rate</span>
          <span className="font-bold text-emerald-600">{inventorySummary.stockOutRate}</span>
        </div>
      </div>

      {/* Product Risk Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Product Risk Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">At Risk Products</span>
          <span className="font-bold text-rose-700">{riskSummary.atRiskProducts}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Margin At Risk</span>
          <span className="font-bold text-amber-600">{riskSummary.marginAtRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Compliance At Risk</span>
          <span className="font-bold text-amber-600">{riskSummary.complianceAtRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Quality At Risk</span>
          <span className="font-bold text-rose-700">{riskSummary.qualityAtRisk}</span>
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
