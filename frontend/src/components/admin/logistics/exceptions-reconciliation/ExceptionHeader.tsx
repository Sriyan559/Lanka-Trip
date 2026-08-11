"use client";

import React from "react";
import Link from "next/link";
import { ActionButton } from "../shared/ActionButton";
import { Download, AlertCircle, FileCheck, RefreshCw, Plus, ShieldAlert } from "lucide-react";

interface ExceptionHeaderProps {
  onExportReport?: () => void;
  onReviewCritical?: () => void;
  onReviewClaims?: () => void;
  onRunReconciliation?: () => void;
  onCreateException?: () => void;
  onRefresh?: () => void;
}

export function ExceptionHeader({
  onExportReport,
  onReviewCritical,
  onReviewClaims,
  onRunReconciliation,
  onCreateException,
  onRefresh,
}: ExceptionHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs mb-3 space-y-2">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
        <Link href="/admin/logistics" className="hover:text-rose-700 transition-colors">
          Logistics
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">Exceptions, Claims &amp; Reconciliation</span>
      </div>

      {/* Main Title & Action Toolbar Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-0.5">
        <div className="space-y-0.5">
          <h1 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            Logistics Exceptions, Claims, Cost &amp; Reconciliation
          </h1>
          <p className="text-[11px] text-gray-600 font-normal leading-normal max-w-4xl">
            Monitor, investigate, and resolve logistics anomalies, claims, carrier/supplier liabilities, cost variances, reconciliation issues and recovery actions across the logistics network.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <ActionButton
            label="Export Logistics Control Report"
            icon={<Download className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onExportReport}
          />
          <ActionButton
            label="Review Critical Exceptions"
            icon={<AlertCircle className="w-3 h-3 text-rose-600" />}
            variant="outline"
            size="xs"
            onClick={onReviewCritical}
          />
          <ActionButton
            label="Review Claims"
            icon={<FileCheck className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onReviewClaims}
          />
          <ActionButton
            label="Run Reconciliation"
            icon={<RefreshCw className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onRunReconciliation}
          />
          <button
            type="button"
            onClick={onCreateException}
            className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Exception / Claim</span>
          </button>
          <ActionButton
            label="Refresh"
            icon={<RefreshCw className="w-3 h-3 text-gray-500" />}
            variant="outline"
            size="xs"
            onClick={onRefresh}
          />
        </div>
      </div>
    </div>
  );
}
