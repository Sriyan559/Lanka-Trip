"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  Plus,
} from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface ReturnDetailHeaderProps {
  returnRef: string;
  onExport?: () => void;
  onReviewException?: () => void;
  onCreateReview?: () => void;
}

export function ReturnDetailHeader({
  returnRef,
  onExport,
  onReviewException,
  onCreateReview,
}: ReturnDetailHeaderProps) {
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
            href="/admin/logistics/reverse-logistics"
            className="hover:text-rose-700 transition-colors"
          >
            Returns &amp; Reverse Logistics
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-gray-900 font-mono">{returnRef}</span>
        </nav>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Link href="/admin/logistics/reverse-logistics">
            <ActionButton
              label="Back to Returns"
              icon={<ArrowLeft className="w-3.5 h-3.5" />}
              variant="outline"
              size="sm"
            />
          </Link>

          <ActionButton
            label="Export Return Detail"
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
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-30 py-1 text-xs">
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Re-triggering webhook notification...");
                  }}
                >
                  Re-send Customer Webhook
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Printing reverse logistics shipping label...");
                  }}
                >
                  Print Reverse Shipping Label
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Generating return audit history PDF...");
                  }}
                >
                  Export Audit PDF
                </button>
              </div>
            )}
          </div>

          <ActionButton
            label="Review Return Exception"
            icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
            variant="outline"
            size="sm"
            onClick={onReviewException}
          />

          <ActionButton
            label="+ Create Reverse Logistics Review"
            icon={<Plus className="w-3.5 h-3.5" />}
            variant="primary"
            size="sm"
            onClick={onCreateReview}
          />
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>Return / Reverse Logistics Detail</span>
        </h1>
        <p className="text-xs text-gray-500 font-normal leading-tight">
          Operational detail screen for a single approved return / reverse logistics case covering collection, reverse shipment, warehouse receipt, inspection, disposition, refund dependency and audit history.
        </p>
      </div>
    </div>
  );
}
