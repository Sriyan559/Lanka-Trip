"use client";

import React from "react";
import { MarketplaceHealthRailData } from "@/data/analytics/marketplaceSellersData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MarketplaceHealthRailProps {
  data: MarketplaceHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function MarketplaceHealthRail({
  data,
  className = "",
  onActionClick,
}: MarketplaceHealthRailProps) {
  const {
    healthScore,
    label,
    marketplaceSummary,
    sellerSummary,
    channelSummary,
    sellerOperations,
    riskSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Marketplace Report",
    "Review Seller Risks",
    "Compare Channels",
    "Run Seller Forecast",
    "Review Listing Quality",
    "Review Commission Exceptions",
    "Review Seller Compliance",
    "Open Marketplace Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Marketplace Analytics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={90} strokeWidth={8} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block mt-1">{label}</span>
      </div>

      {/* Marketplace Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Marketplace Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">GMV (LKR)</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketplaceSummary.gmv}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketplaceSummary.gmvDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Orders</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketplaceSummary.orders}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketplaceSummary.ordersDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Active Sellers</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketplaceSummary.activeSellers}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketplaceSummary.sellersDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Active Listings</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{marketplaceSummary.activeListings}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {marketplaceSummary.listingsDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Seller Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Seller Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">New Sellers</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{sellerSummary.newSellers}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {sellerSummary.newDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Growing Sellers</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{sellerSummary.growingSellers}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {sellerSummary.growingDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">At Risk Sellers</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{sellerSummary.atRiskSellers}</span>
            <span className="text-[10px] font-bold text-rose-600 inline-flex items-center">
              <ArrowUp size={9} /> {sellerSummary.atRiskDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Dormant Sellers</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{sellerSummary.dormantSellers}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowDown size={9} /> {sellerSummary.dormantDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Churn Rate</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{sellerSummary.churnRate}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowDown size={9} /> {sellerSummary.churnDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Channel Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Channel Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Top Channel</span>
          <span className="font-bold text-slate-900">{channelSummary.topChannel}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Fastest Growth</span>
          <span className="font-bold text-emerald-600">{channelSummary.fastestGrowth}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Highest Margin</span>
          <span className="font-bold text-emerald-600">{channelSummary.highestMargin}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Highest Return</span>
          <span className="font-bold text-rose-600">{channelSummary.highestReturn}</span>
        </div>
      </div>

      {/* Seller Operations */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Seller Operations
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Fulfilment SLA</span>
          <span className="font-bold text-emerald-600">{sellerOperations.fulfilmentSla}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Return Rate</span>
          <span className="font-bold text-slate-900">{sellerOperations.returnRate}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cancellation Rate</span>
          <span className="font-bold text-slate-900">{sellerOperations.cancellationRate}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Listing Quality Score</span>
          <span className="font-bold text-emerald-600">{sellerOperations.qualityScore}</span>
        </div>
      </div>

      {/* Marketplace Risk */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Marketplace Risk
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">High Risk Sellers</span>
          <span className="font-bold text-rose-700">{riskSummary.highRiskSellers}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Compliance Warnings</span>
          <span className="font-bold text-amber-600">{riskSummary.complianceWarnings}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Listing Risks</span>
          <span className="font-bold text-amber-600">{riskSummary.listingRisks}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Commission Exceptions</span>
          <span className="font-bold text-rose-700">{riskSummary.commissionExceptions}</span>
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
