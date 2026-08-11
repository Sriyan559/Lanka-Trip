"use client";

import React from "react";
import Link from "next/link";
import { StatusBadge } from "../shared/StatusBadge";
import { ProgressBar } from "../shared/ProgressBar";
import {
  CODSummaryData,
  CostDetailData,
  ReconciliationSummaryData,
  HoldSummaryData,
  ExceptionSummaryData,
  SLASummaryData,
} from "@/types/logistics/shipment";
import { DollarSign, PauseCircle, AlertTriangle, ShieldCheck } from "lucide-react";

interface FinancialHoldSLAGridProps {
  cod: CODSummaryData;
  costs: CostDetailData;
  reconciliation: ReconciliationSummaryData;
  holds: HoldSummaryData;
  exceptions: ExceptionSummaryData;
  sla: SLASummaryData;
}

export function FinancialHoldSLAGrid({
  cod,
  costs,
  reconciliation,
  holds,
  exceptions,
  sla,
}: FinancialHoldSLAGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-3">
      {/* 9A. COD Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-100 pb-1.5 mb-2 flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 uppercase flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-gray-500" />
              9A. COD Summary
            </h4>
            <StatusBadge status={cod.reconciliationStatus} size="sm" />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">COD Required:</span>
              <span className="font-semibold text-gray-900">{cod.codRequired ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">COD Amount:</span>
              <span className="font-bold text-gray-900">{cod.codAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Collection Status:</span>
              <span className="font-semibold text-gray-900">{cod.collectionStatus}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 italic">
          Not Required for Online Paid Order
        </div>
      </div>

      {/* 9B. Cost Detail */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-100 pb-1.5 mb-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase">9B. Cost Detail</h4>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-gray-500">Base Shipping Charge:</span>
              <span className="font-semibold text-gray-900">{costs.baseShippingCharge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fuel Surcharge:</span>
              <span className="font-semibold text-gray-900">{costs.fuelSurcharge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Remote Area Charge:</span>
              <span className="font-semibold text-gray-900">{costs.remoteAreaCharge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Handling Charge:</span>
              <span className="font-semibold text-gray-900">{costs.handlingCharge}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-baseline font-bold text-xs">
          <span className="text-rose-700 uppercase">Total Carrier Charge:</span>
          <span className="text-rose-700">{costs.totalCarrierCharge}</span>
        </div>
      </div>

      {/* 9C. Reconciliation Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-100 pb-1.5 mb-2 flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 uppercase">9C. Reconciliation</h4>
            <StatusBadge status={reconciliation.shipmentChargeReconciledStatus} size="sm" />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Reconciled Amount:</span>
              <span className="font-semibold text-gray-900">{reconciliation.reconciledAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Variance:</span>
              <span className="font-semibold text-gray-900">{reconciliation.variance}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100">
          <Link
            href="/admin/logistics/exceptions-reconciliation"
            className="text-[11px] font-bold text-rose-700 hover:underline flex items-center gap-1"
          >
            View Audit Trail →
          </Link>
        </div>
      </div>

      {/* 10. Holds Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-100 pb-1.5 mb-2 flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 uppercase flex items-center gap-1">
              <PauseCircle className="w-3.5 h-3.5 text-gray-500" />
              10. Holds Summary
            </h4>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              0 Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 text-[11px] text-center my-1">
            <div className="bg-gray-50 p-1.5 rounded">
              <div className="text-gray-400 text-[10px]">Placed</div>
              <div className="font-bold text-gray-900">{holds.placed}</div>
            </div>
            <div className="bg-gray-50 p-1.5 rounded">
              <div className="text-gray-400 text-[10px]">Active</div>
              <div className="font-bold text-gray-900">{holds.activeHolds}</div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-gray-500 italic mt-2">
          {holds.notes || "No holds on this shipment."}
        </div>
      </div>

      {/* 11. Exception Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-100 pb-1.5 mb-2 flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 uppercase flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-gray-500" />
              11. Exceptions
            </h4>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              0 Total
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1 text-[10px] text-center my-1">
            <div className="bg-rose-50 p-1 rounded font-bold text-rose-700">
              C: {exceptions.critical}
            </div>
            <div className="bg-amber-50 p-1 rounded font-bold text-amber-700">
              H: {exceptions.high}
            </div>
            <div className="bg-blue-50 p-1 rounded font-bold text-blue-700">
              M: {exceptions.medium}
            </div>
            <div className="bg-gray-50 p-1 rounded font-bold text-gray-700">
              L: {exceptions.low}
            </div>
          </div>
        </div>

        <div className="text-[10px] text-gray-500 italic mt-2">
          No exceptions on this shipment.
        </div>
      </div>

      {/* 12. SLA Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-100 pb-1.5 mb-2 flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              12. SLA Summary
            </h4>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              On Track
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">SLA Plan:</span>
              <span className="font-semibold text-gray-900">{sla.slaPlan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Promised Delivery:</span>
              <span className="font-bold text-gray-900">{sla.promisedDelivery}</span>
            </div>
            <div className="space-y-0.5 mt-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-500">SLA Progress:</span>
                <span className="font-bold text-emerald-700">{sla.slaProgress}%</span>
              </div>
              <ProgressBar value={sla.slaProgress} color="emerald" size="xs" />
            </div>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-gray-100 flex justify-between text-[10px]">
          <span className="text-gray-400">Risk Level:</span>
          <span className="font-bold text-emerald-700 uppercase">{sla.slaRisk} Risk</span>
        </div>
      </div>
    </div>
  );
}
