"use client";

import React from "react";
import { ActionButton } from "../shared/ActionButton";
import { ReturnCase } from "@/types/logistics/reverseLogistics";

interface ReturnWorkflowActionsProps {
  returnCase: ReturnCase;
  onRescheduleCollection?: () => void;
  onReassignCarrier?: () => void;
  onPlaceHold?: () => void;
  onConfirmReceipt?: () => void;
  onStartInspection?: () => void;
}

export function ReturnWorkflowActions({
  returnCase,
  onRescheduleCollection,
  onReassignCarrier,
  onPlaceHold,
  onConfirmReceipt,
  onStartInspection,
}: ReturnWorkflowActionsProps) {
  // State-dependent enabled/disabled logic
  const isCollected = returnCase.collectionStatus === "Collected";
  const isReceiptPending = returnCase.receiptStatus === "Pending" || returnCase.receiptStatus === "Awaiting Receipt";
  const isInspectionStarted = returnCase.inspectionStatus === "In Progress";
  const isDispositionApproved = returnCase.proposedDisposition !== "Pending";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs mb-3 space-y-2">
      {/* Primary Workflow Actions Row 1 */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 pb-2">
        <ActionButton
          label="Reschedule Collection"
          variant="primary"
          size="sm"
          onClick={onRescheduleCollection}
        />
        <ActionButton
          label="Reassign Carrier"
          variant="primary"
          size="sm"
          onClick={onReassignCarrier}
        />
        <button
          type="button"
          disabled={isCollected}
          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${
            isCollected
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-rose-700 text-white hover:bg-rose-800"
          }`}
          onClick={() => alert("Confirm Collection triggered.")}
        >
          Confirm Collection
        </button>
        <button
          type="button"
          disabled={!isReceiptPending}
          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${
            !isReceiptPending
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-rose-700 text-white hover:bg-rose-800"
          }`}
          onClick={onConfirmReceipt}
        >
          Confirm Warehouse Receipt
        </button>
        <button
          type="button"
          disabled={isInspectionStarted}
          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${
            isInspectionStarted
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-rose-700 text-white hover:bg-rose-800"
          }`}
          onClick={onStartInspection}
        >
          Start Inspection
        </button>
        <button
          type="button"
          disabled={!isInspectionStarted}
          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${
            !isInspectionStarted
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-rose-700 text-white hover:bg-rose-800"
          }`}
        >
          Complete Inspection
        </button>
        <button
          type="button"
          disabled={!isInspectionStarted}
          className="text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded cursor-not-allowed"
        >
          Submit Disposition
        </button>
        <button
          type="button"
          disabled={!isDispositionApproved}
          className="text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded cursor-not-allowed"
        >
          Approve Disposition
        </button>
        <button
          type="button"
          disabled
          className="text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded cursor-not-allowed"
        >
          Request Quarantine
        </button>
        <button
          type="button"
          disabled
          className="text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded cursor-not-allowed"
        >
          Release Quarantine
        </button>
        <button
          type="button"
          disabled
          className="text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded cursor-not-allowed"
        >
          Create Supplier Return
        </button>
      </div>

      {/* Secondary Workflow Actions Row 2 */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <ActionButton
          label="Start Exchange"
          variant="outline"
          size="sm"
          onClick={() => alert("Exchange flow initiated.")}
        />
        <ActionButton
          label="Clear Refund Dependency"
          variant="outline"
          size="sm"
          onClick={() => alert("Refund dependency clearance requested.")}
        />
        <ActionButton
          label="Place Return Hold"
          variant="primary"
          size="sm"
          onClick={onPlaceHold}
        />
        <ActionButton
          label="Release Approved Hold"
          variant="outline"
          size="sm"
          onClick={() => alert("Hold released.")}
        />
        <ActionButton
          label="Start Reconciliation"
          variant="outline"
          size="sm"
          onClick={() => alert("Reconciliation initiated.")}
        />
        <ActionButton
          label="Close Return"
          variant="outline"
          size="sm"
          onClick={() => alert("Close case requested.")}
        />
      </div>
    </div>
  );
}
