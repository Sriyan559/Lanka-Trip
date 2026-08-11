"use client";

import React from "react";
import { HealthBadge } from "../shared/HealthBadge";
import { ActionButton } from "../shared/ActionButton";
import { RefreshCw } from "lucide-react";
import { ReturnCase } from "@/types/logistics/reverseLogistics";

interface ReturnDetailContextBarProps {
  returnCase: ReturnCase;
  onRefresh?: () => void;
}

export function ReturnDetailContextBar({
  returnCase,
  onRefresh,
}: ReturnDetailContextBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs mb-3 space-y-2">
      {/* Context Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-4 text-[11px] text-gray-600 border-b border-gray-100 pb-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div>
            <span className="text-gray-400 font-normal">Tenant: </span>
            <span className="font-bold text-gray-900">SL Beauty</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Ecosystem: </span>
            <span className="font-semibold text-gray-900">Beauty Marketplace</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Business Unit: </span>
            <span className="font-semibold text-gray-900">All Business Units</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Sales Channel: </span>
            <span className="font-semibold text-gray-900">All Channels</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Region: </span>
            <span className="font-semibold text-gray-900">Sri Lanka</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Base Currency: </span>
            <span className="font-semibold text-gray-900">LKR</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Reverse Scope: </span>
            <span className="font-semibold text-gray-900">Active Reverse Logistics Network</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Operational Period: </span>
            <span className="font-semibold text-gray-900">May 2025</span>
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
            <span className="font-bold text-gray-900">96%</span>
          </div>
          {onRefresh && (
            <ActionButton
              label="Refresh"
              icon={<RefreshCw className="w-3 h-3" />}
              variant="outline"
              size="xs"
              onClick={onRefresh}
            />
          )}
        </div>
      </div>

      {/* Health Badges + User Event Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-2 pt-0.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <HealthBadge label="Return Service Health" status="Healthy" />
          <HealthBadge label="Collection Service Health" status="Healthy" />
          <HealthBadge label="Reverse Tracking Health" status="Healthy" />
          <HealthBadge label="Warehouse Receiving Health" status="Healthy" />
          <HealthBadge label="Inspection Service Health" status="Healthy" />
          <HealthBadge label="Inventory Restock Integration Health" status="Healthy" />
          <HealthBadge label="Refund Dependency Health" status="Healthy" />
          <HealthBadge label="Reconciliation Service Health" status="Healthy" />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div>
            <span className="text-gray-400 font-normal">Access Context: </span>
            <span className="font-bold text-gray-800">Assigned business context</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Last Updated: </span>
            <span className="font-semibold text-gray-900">{returnCase.updatedAt}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Updated By: </span>
            <span className="font-bold text-gray-900">{returnCase.lastUpdatedBy || "Elena Vance"}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Last Event: </span>
            <span className="font-semibold text-gray-900">{returnCase.lastEventDescription || "Carrier scanned at Hub"}</span>
          </div>
          <div>
            <span className="text-gray-400 font-normal">Record Version: </span>
            <span className="font-mono font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">
              v2.6
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
