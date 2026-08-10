"use client";

import React from "react";
import { Warehouse, MapPin, CheckCircle2 } from "lucide-react";

interface FacilityIdentityHeroProps {
  facilityId: string;
}

export function FacilityIdentityHero({ facilityId }: FacilityIdentityHeroProps) {
  const isCmb = facilityId.includes("CMB");
  const facName = isCmb ? "Colombo Central Warehouse" : facilityId.includes("KDU") ? "Kadawatha Hub" : facilityId.includes("KND") ? "Kandy Regional Warehouse" : "Gampaha FC";

  return (
    <div className="bg-white rounded-xl border border-line p-3 shadow-sm text-[10px] space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* THUMBNAIL & TITLE */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-14 bg-gradient-to-br from-primary-900 to-rose-900 text-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
            <Warehouse size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-ink leading-tight">{facName}</h2>
              <span className="px-2 py-0.5 rounded text-[9.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-600" />
                Operational
              </span>
            </div>
            <p className="text-[10.5px] text-muted mt-0.5">
              Tier 1 National Fulfilment Hub • Established 2021
            </p>
          </div>
        </div>

        {/* METADATA GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-line text-[10px]">
          <div>
            <span className="text-muted block text-[9px]">Facility Reference:</span>
            <strong className="font-mono text-primary-900 font-bold">{facilityId}</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Facility Status:</span>
            <span className="font-bold text-emerald-700">Operational</span>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Capacity State:</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200">
              High Utilization
            </span>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Operator:</span>
            <strong className="text-ink font-semibold">SL Beauty</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Facility Owner:</span>
            <strong className="text-ink font-semibold">Ops Directorate</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Operations Manager:</span>
            <strong className="text-ink font-semibold">Elena Vance</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Sales Channels:</span>
            <strong className="text-ink font-semibold">Marketplace / Web / App</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Business Units:</span>
            <strong className="text-ink font-semibold">Consumer Beauty / Marketplace</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Service Areas:</span>
            <strong className="text-ink font-semibold">Colombo Metro / Western Province</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Delivery Zones:</span>
            <strong className="text-ink font-semibold">Same-Day / Next-Day</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Created At:</span>
            <strong className="text-ink font-semibold">Jan 12 2021</strong>
          </div>

          <div>
            <span className="text-muted block text-[9px]">Activated At:</span>
            <strong className="text-ink font-semibold">Feb 01 2021</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
