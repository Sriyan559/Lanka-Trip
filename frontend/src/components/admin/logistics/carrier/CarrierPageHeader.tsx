"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  ShieldCheck,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface CarrierPageHeaderProps {
  onExport?: () => void;
  onReviewExceptions?: () => void;
  onReviewSLABreaches?: () => void;
  onCreateReview?: () => void;
  onAddCarrier?: () => void;
}

export function CarrierPageHeader({
  onExport,
  onReviewExceptions,
  onReviewSLABreaches,
  onCreateReview,
  onAddCarrier,
}: CarrierPageHeaderProps) {
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
          <span className="font-bold text-gray-900">Carriers & Delivery Partners</span>
        </nav>

        {/* Primary Page Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <ActionButton
            label="Export Carrier Operations Report"
            icon={<Download className="w-3.5 h-3.5" />}
            variant="outline"
            size="sm"
            onClick={onExport}
          />

          <ActionButton
            label="Review Carrier Exceptions"
            icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
            variant="outline"
            size="sm"
            onClick={onReviewExceptions}
          />

          <div className="relative">
            <ActionButton
              label="Bulk Actions"
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
                    alert("Bulk status update workflow active.");
                  }}
                >
                  Bulk Update Status
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Bulk SLA threshold review triggered.");
                  }}
                >
                  Bulk SLA Review
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Exporting carrier master dataset...");
                  }}
                >
                  Export All Carrier CSV
                </button>
              </div>
            )}
          </div>

          <ActionButton
            label="Review SLA Breaches"
            icon={<ShieldCheck className="w-3.5 h-3.5 text-rose-600" />}
            variant="outline"
            size="sm"
            onClick={onReviewSLABreaches}
          />

          <ActionButton
            label="Create Carrier Review"
            icon={<FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />}
            variant="outline"
            size="sm"
            onClick={onCreateReview}
          />

          <ActionButton
            label="+ Add Carrier / Delivery Partner"
            icon={<Plus className="w-3.5 h-3.5" />}
            variant="primary"
            size="sm"
            onClick={onAddCarrier}
          />
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>Carriers, Couriers & Delivery Partners</span>
        </h1>
        <p className="text-xs text-gray-500 font-normal leading-tight">
          Govern carrier partners, service coverage, shipment capacity, tracking integrations,
          delivery performance, SLA, COD, claims, compliance and operational eligibility across the logistics network.
        </p>
      </div>
    </div>
  );
}
