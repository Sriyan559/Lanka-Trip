"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  Clock,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface ReverseLogisticsHeaderProps {
  onExport?: () => void;
  onReviewExceptions?: () => void;
  onReviewOverdueCollections?: () => void;
  onLogisticsReview?: () => void;
  onCreateCollection?: () => void;
}

export function ReverseLogisticsHeader({
  onExport,
  onReviewExceptions,
  onReviewOverdueCollections,
  onLogisticsReview,
  onCreateCollection,
}: ReverseLogisticsHeaderProps) {
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
          <span className="font-bold text-gray-900">Returns &amp; Reverse Logistics</span>
        </nav>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <ActionButton
            label="Export Reverse Logistics Operations Report"
            icon={<Download className="w-3.5 h-3.5" />}
            variant="outline"
            size="sm"
            onClick={onExport}
          />

          <ActionButton
            label="Review Return Exceptions"
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
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1 text-xs">
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Bulk collection rescheduling active.");
                  }}
                >
                  Bulk Reschedule Collections
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Bulk disposition approval active.");
                  }}
                >
                  Bulk Approve Dispositions
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Exporting returns portfolio CSV...");
                  }}
                >
                  Export All Returns CSV
                </button>
              </div>
            )}
          </div>

          <ActionButton
            label="Review Overdue Collections"
            icon={<Clock className="w-3.5 h-3.5 text-rose-600" />}
            variant="outline"
            size="sm"
            onClick={onReviewOverdueCollections}
          />

          <ActionButton
            label="Logistics Review"
            icon={<FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />}
            variant="outline"
            size="sm"
            onClick={onLogisticsReview}
          />

          <ActionButton
            label="+ Create Return Collection"
            icon={<Plus className="w-3.5 h-3.5" />}
            variant="primary"
            size="sm"
            onClick={onCreateCollection}
          />
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>Returns, Collections &amp; Reverse Logistics</span>
        </h1>
        <p className="text-xs text-gray-500 font-normal leading-tight">
          Manage approved returns, reverse collections, reverse shipments, warehouse receipt, inspection, disposition, restock, quarantine, supplier returns, exchange, refund dependencies, exceptions, reconciliation, and reverse-logistics SLA.
        </p>
      </div>
    </div>
  );
}
