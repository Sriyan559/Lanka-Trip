"use client";

import React from "react";
import Link from "next/link";
import { ReusableProgressChart } from "../charts/ReusableProgressChart";
import { ActionButton } from "../shared/ActionButton";
import { ShipmentIntelligenceData } from "@/types/logistics/shipment";
import {
  AlertTriangle,
  RefreshCw,
  UserCheck,
  Calendar,
  RotateCcw,
  FileSearch,
  Undo2,
  ListFilter,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface ShipmentIntelligencePanelProps {
  intelligence: ShipmentIntelligenceData;
  onRefreshTracking?: () => void;
  onReassignCarrier?: () => void;
  onReschedulePickup?: () => void;
  onStartDeliveryRetry?: () => void;
  onReviewPOD?: () => void;
  onStartRTO?: () => void;
  onReviewException?: () => void;
}

export function ShipmentIntelligencePanel({
  intelligence,
  onRefreshTracking,
  onReassignCarrier,
  onReschedulePickup,
  onStartDeliveryRetry,
  onReviewPOD,
  onStartRTO,
  onReviewException,
}: ShipmentIntelligencePanelProps) {
  return (
    <aside className="w-full xl:w-[320px] flex-shrink-0 space-y-3">
      {/* Shipment Intelligence Container */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-rose-700" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
              Shipment Intelligence
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Live AI SLA Engine
          </span>
        </div>

        {/* A. Shipment Record Health Score */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col items-center justify-center">
          <div className="text-[11px] font-bold text-gray-700 uppercase mb-2">
            Shipment Record Health
          </div>
          <ReusableProgressChart
            score={intelligence.healthScore}
            label={intelligence.healthLabel}
            sublabel={intelligence.healthPercentile}
            size={100}
            strokeWidth={8}
            color="#10b981"
          />
        </div>

        {/* B. Priority Record Alerts */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-900 uppercase flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Priority Record Alerts ({intelligence.alerts.length})
            </span>
          </div>

          <div className="space-y-1">
            {intelligence.alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between p-2 rounded bg-amber-50/40 border border-amber-100 text-[11px]"
              >
                <div className="flex items-start gap-1.5 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-800 font-medium leading-tight">
                    {alert.message}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 flex-shrink-0">
                  {alert.timeAgo}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="text-[11px] font-semibold text-rose-700 hover:underline w-full text-center py-0.5"
            onClick={() => alert("All alerts view modal")}
          >
            View All Alerts
          </button>
        </div>

        {/* C. Shipment Snapshot */}
        <div className="border-t border-gray-100 pt-2 space-y-1 text-xs">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-1">
            Shipment Snapshot
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">State:</span>
            <span className="font-bold text-emerald-700">{intelligence.snapshot.state}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Delivery State:</span>
            <span className="font-semibold text-gray-900">{intelligence.snapshot.deliveryState}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">SLA Progress:</span>
            <span className="font-bold text-emerald-700">{intelligence.snapshot.slaProgress}%</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Promised Delivery:</span>
            <span className="font-bold text-gray-900">{intelligence.snapshot.eta}</span>
          </div>
        </div>

        {/* D. Package Summary */}
        <div className="border-t border-gray-100 pt-2 text-xs space-y-1">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-1">
            Package Summary
          </div>
          <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
            <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
              <div className="text-gray-400">Total Packages</div>
              <div className="font-bold text-gray-900 text-xs">{intelligence.packageSummary.count}</div>
            </div>
            <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
              <div className="text-gray-400">Weight</div>
              <div className="font-bold text-gray-900 text-xs">{intelligence.packageSummary.weight}</div>
            </div>
            <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
              <div className="text-gray-400">Value</div>
              <div className="font-bold text-gray-900 text-xs">{intelligence.packageSummary.value}</div>
            </div>
          </div>
        </div>

        {/* E. Carrier & Pickup Summary */}
        <div className="border-t border-gray-100 pt-2 text-xs space-y-1">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-1">
            Carrier & Pickup Summary
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Carrier:</span>
            <span className="font-bold text-gray-900">{intelligence.carrierSummary.name}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Pickup Status:</span>
            <span className="font-bold text-emerald-700">{intelligence.carrierSummary.status}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">SLA Met:</span>
            <span className="font-semibold text-emerald-700">{intelligence.carrierSummary.slaMet ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* F. Tracking Summary */}
        <div className="border-t border-gray-100 pt-2 text-xs space-y-1">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-1">
            Tracking Summary
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Tracking Completeness:</span>
            <span className="font-bold text-emerald-700">{intelligence.trackingSummary.completeness}%</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Events (Norm.):</span>
            <span className="font-semibold text-gray-900">{intelligence.trackingSummary.normalizedEvents}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Tracking Gaps:</span>
            <span className="font-semibold text-gray-900">{intelligence.trackingSummary.gaps}</span>
          </div>
        </div>

        {/* G. Delivery Summary */}
        <div className="border-t border-gray-100 pt-2 text-xs space-y-1">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-1">
            Delivery Summary
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Delivery Attempts:</span>
            <span className="font-semibold text-gray-900">{intelligence.deliverySummary.attempts}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">Delivery Status:</span>
            <span className="font-bold text-amber-700">{intelligence.deliverySummary.status}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">ETA Variance:</span>
            <span className="font-semibold text-amber-600">{intelligence.deliverySummary.etaVariance}</span>
          </div>
        </div>

        {/* H. POD / COD Summary */}
        <div className="border-t border-gray-100 pt-2 text-xs space-y-1">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-1">
            POD / COD Summary
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">POD Status:</span>
            <span className="font-bold text-amber-700">{intelligence.podCodSummary.podStatus}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">COD Required:</span>
            <span className="font-semibold text-gray-900">{intelligence.podCodSummary.codRequired ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-gray-500">COD Collected:</span>
            <span className="font-semibold text-gray-900">{intelligence.podCodSummary.codCollected}</span>
          </div>
        </div>

        {/* I. Quick Actions Grid */}
        <div className="border-t border-gray-100 pt-2.5">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-2">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={onRefreshTracking}
              className="flex items-center gap-1.5 p-1.5 border border-gray-200 rounded hover:bg-gray-50 text-[11px] font-medium text-gray-700"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Refresh Tracking</span>
            </button>
            <button
              type="button"
              onClick={onReassignCarrier}
              className="flex items-center gap-1.5 p-1.5 border border-gray-200 rounded hover:bg-gray-50 text-[11px] font-medium text-gray-700"
            >
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Reassign Carrier</span>
            </button>
            <button
              type="button"
              onClick={onReschedulePickup}
              className="flex items-center gap-1.5 p-1.5 border border-gray-200 rounded hover:bg-gray-50 text-[11px] font-medium text-gray-700"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reschedule Pickup</span>
            </button>
            <button
              type="button"
              onClick={onStartDeliveryRetry}
              className="flex items-center gap-1.5 p-1.5 border border-gray-200 rounded hover:bg-gray-50 text-[11px] font-medium text-gray-700"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Start Retry</span>
            </button>
            <button
              type="button"
              onClick={onReviewPOD}
              className="flex items-center gap-1.5 p-1.5 border border-gray-200 rounded hover:bg-gray-50 text-[11px] font-medium text-gray-700"
            >
              <FileSearch className="w-3.5 h-3.5 text-sky-600" />
              <span>Review POD</span>
            </button>
            <button
              type="button"
              onClick={onStartRTO}
              className="flex items-center gap-1.5 p-1.5 border border-gray-200 rounded hover:bg-gray-50 text-[11px] font-medium text-gray-700 text-rose-700"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Start RTO</span>
            </button>
          </div>
        </div>

        {/* J. Final Shipment Actions */}
        <div className="border-t border-gray-100 pt-2.5 space-y-1.5">
          <div className="font-bold text-gray-900 text-[11px] uppercase mb-1">
            Final Shipment Actions
          </div>
          <ActionButton
            label="Review Shipment Exception"
            variant="outline"
            size="xs"
            className="w-full justify-center text-rose-700 border-rose-200 hover:bg-rose-50"
            onClick={onReviewException}
          />
          <Link href="/admin/logistics/shipments" className="block w-full">
            <ActionButton
              label="Open Shipment Queue"
              variant="outline"
              size="xs"
              className="w-full justify-center"
              icon={<ListFilter className="w-3 h-3" />}
            />
          </Link>
          <Link href="/admin/logistics/exceptions-reconciliation" className="block w-full">
            <ActionButton
              label="Review Delayed Shipments"
              variant="outline"
              size="xs"
              className="w-full justify-center"
              icon={<AlertTriangle className="w-3 h-3 text-amber-600" />}
            />
          </Link>
          <Link href="/admin/logistics/exceptions-reconciliation" className="block w-full">
            <ActionButton
              label="Review SLA Breaches"
              variant="outline"
              size="xs"
              className="w-full justify-center"
              icon={<ShieldCheck className="w-3 h-3 text-rose-600" />}
            />
          </Link>
          <Link href="/admin/logistics/reports-import-export-audit" className="block w-full">
            <ActionButton
              label="View Audit Trail"
              variant="outline"
              size="xs"
              className="w-full justify-center"
              icon={<ExternalLink className="w-3 h-3" />}
            />
          </Link>
        </div>
      </div>
    </aside>
  );
}
