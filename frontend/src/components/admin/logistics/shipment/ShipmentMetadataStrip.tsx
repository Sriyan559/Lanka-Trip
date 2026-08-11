"use client";

import React from "react";
import { HealthBadge } from "../shared/HealthBadge";
import { ShipmentDetail } from "@/types/logistics/shipment";

interface ShipmentMetadataStripProps {
  shipment: ShipmentDetail;
}

export function ShipmentMetadataStrip({ shipment }: ShipmentMetadataStripProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs mb-3 space-y-2">
      {/* Context Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-4 text-[11px] text-gray-600 border-b border-gray-100 pb-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div>
            <span className="text-gray-400 font-normal">Tenant: </span>
            <span className="font-bold text-gray-900">{shipment.tenant}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Ecosystem: </span>
            <span className="font-semibold text-gray-900">{shipment.ecosystem}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Business Unit: </span>
            <span className="font-semibold text-gray-900">{shipment.businessUnit}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Sales Channel: </span>
            <span className="font-semibold text-gray-900">{shipment.salesChannel}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Region: </span>
            <span className="font-semibold text-gray-900">{shipment.region}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Base Currency: </span>
            <span className="font-semibold text-gray-900">{shipment.baseCurrency}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Shipment Scope: </span>
            <span className="font-semibold text-gray-900">{shipment.shipmentScope}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Operational Period: </span>
            <span className="font-semibold text-gray-900">{shipment.operationalPeriod}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 font-normal">Live Data:</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              On
            </span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Data Completeness: </span>
            <span className="font-bold text-gray-900">{shipment.dataCompleteness}%</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Last Updated: </span>
            <span className="font-semibold text-gray-900">{shipment.updated}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Updated By: </span>
            <span className="font-semibold text-gray-900">{shipment.updatedBy}</span>
          </div>
        </div>
      </div>

      {/* Service Health Indicators Row (8 Badges + Access Context & Record Version) */}
      <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-2 pt-0.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <HealthBadge label="Shipment Service Health" status="Healthy" />
          <HealthBadge label="Carrier Gateway Health" status="Healthy" />
          <HealthBadge label="Tracking Service Health" status="Healthy" />
          <HealthBadge label="Pickup Service Health" status="Healthy" />
          <HealthBadge label="Delivery Notification Health" status="Healthy" />
          <HealthBadge label="POD Service Health" status="Healthy" />
          <HealthBadge label="COD Service Health" status="Healthy" />
          <HealthBadge label="Reconciliation Service Health" status="Healthy" />
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <div>
            <span className="text-gray-400 font-normal">Access Context: </span>
            <span className="font-bold text-gray-800">Full Access</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Record Version: </span>
            <span className="font-mono font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">
              {shipment.recordVersion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
