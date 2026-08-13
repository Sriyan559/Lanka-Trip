"use client";

import React from "react";
import { InventoryLogisticsHealthRailData } from "@/data/analytics/inventoryLogisticsData";
import { CircularScore } from "./charts/CircularScore";
import { ArrowUp, ArrowDown } from "lucide-react";

interface InventoryLogisticsHealthRailProps {
  data: InventoryLogisticsHealthRailData;
  className?: string;
  onActionClick?: (actionName: string) => void;
}

export function InventoryLogisticsHealthRail({
  data,
  className = "",
  onActionClick,
}: InventoryLogisticsHealthRailProps) {
  const {
    healthScore,
    label,
    subtext,
    inventorySummary,
    warehouseSummary,
    fulfilmentSummary,
    deliverySummary,
    logisticsCostSummary,
    riskSummary,
    quickQueues,
  } = data;

  const actionButtons = [
    "Generate Logistics Analytics Report",
    "Review Inventory Risks",
    "Review Warehouse Capacity",
    "Review Fulfilment SLA",
    "Review Carrier Performance",
    "Review Delivery Exceptions",
    "Run Inventory Forecast",
    "Open Logistics Analytics Audit",
  ];

  return (
    <aside
      className={`an02-health-rail bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-4 text-xs ${className}`}
    >
      {/* Top Health Score Card */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 text-center">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
          Inventory &amp; Logistics Health
        </h4>
        <div className="my-2 flex justify-center">
          <CircularScore score={healthScore} maxScore={100} size={90} strokeWidth={8} />
        </div>
        <span className="font-bold text-emerald-700 text-xs block">{label}</span>
        <span className="text-[10px] text-slate-500 block mt-0.5">{subtext}</span>
      </div>

      {/* Inventory Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Inventory Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Inventory Value</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{inventorySummary.inventoryValue}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {inventorySummary.inventoryDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Available Stock</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{inventorySummary.availableStock}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {inventorySummary.availableDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Reserved Stock</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{inventorySummary.reservedStock}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {inventorySummary.reservedDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Allocated Stock</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{inventorySummary.allocatedStock}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {inventorySummary.allocatedDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Discontinued Stock</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{inventorySummary.discontinuedStock}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowDown size={9} /> {inventorySummary.discontinuedDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Warehouse Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Warehouse Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Warehouses / FCs</span>
          <span className="font-bold text-slate-900">{warehouseSummary.totalWarehouses}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Avg Utilisation</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{warehouseSummary.avgUtilisation}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {warehouseSummary.utilDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Near Capacity</span>
          <span className="font-bold text-slate-900">{warehouseSummary.nearCapacity}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Inventory Accuracy</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-emerald-600">{warehouseSummary.inventoryAccuracy}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {warehouseSummary.accuracyDelta}
            </span>
          </div>
        </div>
      </div>

      {/* Fulfilment Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Fulfilment Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Orders (Total)</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{fulfilmentSummary.totalOrders}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {fulfilmentSummary.ordersDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Fulfilment SLA</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{fulfilmentSummary.fulfilmentSla}</span>
            <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center">
              <ArrowUp size={9} /> {fulfilmentSummary.slaDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Pick Accuracy</span>
          <span className="font-bold text-emerald-600">{fulfilmentSummary.pickAccuracy}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Pack Accuracy</span>
          <span className="font-bold text-emerald-600">{fulfilmentSummary.packAccuracy}</span>
        </div>
      </div>

      {/* Delivery Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Delivery Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Shipments</span>
          <span className="font-bold text-slate-900">{deliverySummary.totalShipments}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">On-Time Delivery</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900">{deliverySummary.onTimeDelivery}</span>
            <span className="text-[10px] font-bold text-rose-600 inline-flex items-center">
              <ArrowDown size={9} /> {deliverySummary.onTimeDelta}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Open Exceptions</span>
          <span className="font-bold text-rose-700">{deliverySummary.openExceptions}</span>
        </div>
      </div>

      {/* Logistics Cost Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Logistics Cost Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Total Logistics Cost</span>
          <span className="font-bold text-slate-900">{logisticsCostSummary.totalCost}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Cost / Shipment (LKR)</span>
          <span className="font-bold text-emerald-600">{logisticsCostSummary.costPerShipment}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Warehousing Cost</span>
          <span className="font-bold text-slate-900">{logisticsCostSummary.warehousingCost}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Delivery Cost</span>
          <span className="font-bold text-slate-900">{logisticsCostSummary.deliveryCost}</span>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
        <h4 className="font-bold text-slate-700 text-xs mb-1 uppercase tracking-wide">
          Risk Summary
        </h4>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Stockout Risk</span>
          <span className="font-bold text-rose-700">{riskSummary.stockoutRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Overstock Risk</span>
          <span className="font-bold text-amber-600">{riskSummary.overstockRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Capacity Risk</span>
          <span className="font-bold text-slate-900">{riskSummary.capacityRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">Carrier Risk</span>
          <span className="font-bold text-amber-600">{riskSummary.carrierRisk}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-slate-500">SLA Risk</span>
          <span className="font-bold text-rose-700">{riskSummary.slaRisk}</span>
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
