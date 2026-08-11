"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  MoreVertical,
  AlertTriangle,
  FileCheck2,
  ChevronRight,
} from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface ShipmentTopHeaderProps {
  shipmentId: string;
  onRefresh?: () => void;
  onExport?: () => void;
  onReviewException?: () => void;
  onCreateReview?: () => void;
}

export function ShipmentTopHeader({
  shipmentId,
  onRefresh,
  onExport,
  onReviewException,
  onCreateReview,
}: ShipmentTopHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="space-y-2 mb-2">
      {/* Top Toolbar: Breadcrumb + Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <Link
            href="/admin/logistics"
            className="hover:text-rose-700 transition-colors"
          >
            Logistics
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href="/admin/logistics/shipments"
            className="hover:text-rose-700 transition-colors"
          >
            Shipments & Tracking
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-gray-900">{shipmentId}</span>
        </nav>

        {/* Primary Page Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Link href="/admin/logistics/shipments">
            <ActionButton
              label="Back to Shipments"
              icon={<ArrowLeft className="w-3.5 h-3.5" />}
              variant="outline"
              size="sm"
            />
          </Link>

          <ActionButton
            label="Export Shipment Detail"
            icon={<Download className="w-3.5 h-3.5" />}
            variant="outline"
            size="sm"
            onClick={onExport}
          />

          <div className="relative">
            <ActionButton
              label="More Actions"
              icon={<MoreVertical className="w-3.5 h-3.5" />}
              variant="outline"
              size="sm"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1 text-xs">
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    if (onRefresh) onRefresh();
                  }}
                >
                  Force Sync Gateway
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Printing shipping documents & manifest...");
                  }}
                >
                  Print Shipping Label
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Audit log exported.");
                  }}
                >
                  Download Raw JSON Audit
                </button>
              </div>
            )}
          </div>

          <ActionButton
            label="Review Shipment Exception"
            icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
            variant="outline"
            size="sm"
            onClick={onReviewException}
          />

          <ActionButton
            label="Create Shipment Review"
            icon={<FileCheck2 className="w-3.5 h-3.5 text-blue-600" />}
            variant="outline"
            size="sm"
            onClick={onCreateReview}
          />
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>Shipment Detail & Carrier Tracking</span>
        </h1>
        <p className="text-xs text-gray-500 font-normal leading-tight">
          Shipment execution, carrier tracking, pickup, transit, delivery attempts,
          proof of delivery, exceptions, SLA and reconciliation for one shipment.
        </p>
      </div>
    </div>
  );
}
