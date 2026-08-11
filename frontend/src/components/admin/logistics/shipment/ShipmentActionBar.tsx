"use client";

import React from "react";
import {
  RefreshCw,
  UserCheck,
  Calendar,
  PackageCheck,
  RotateCcw,
  MapPin,
  Undo2,
  FileSearch,
  PauseCircle,
  PlayCircle,
  DollarSign,
  XCircle,
} from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

interface ShipmentActionBarProps {
  onRefreshTracking: () => void;
  onReassignCarrier: () => void;
  onReschedulePickup: () => void;
  onConfirmHandoff: () => void;
  onStartDeliveryRetry: () => void;
  onRequestAddressValidation: () => void;
  onStartRTO: () => void;
  onReviewPOD: () => void;
  onPlaceHold: () => void;
  onReleaseHold: () => void;
  onStartReconciliation: () => void;
  onCloseShipment: () => void;
  loadingAction?: string | null;
}

export function ShipmentActionBar({
  onRefreshTracking,
  onReassignCarrier,
  onReschedulePickup,
  onConfirmHandoff,
  onStartDeliveryRetry,
  onRequestAddressValidation,
  onStartRTO,
  onReviewPOD,
  onPlaceHold,
  onReleaseHold,
  onStartReconciliation,
  onCloseShipment,
  loadingAction,
}: ShipmentActionBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-2xs mb-2.5 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1.5 min-w-max">
        <ActionButton
          label="Refresh Tracking"
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "refreshTracking"}
          onClick={onRefreshTracking}
        />
        <ActionButton
          label="Reassign Carrier"
          icon={<UserCheck className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "reassignCarrier"}
          onClick={onReassignCarrier}
        />
        <ActionButton
          label="Reschedule Pickup"
          icon={<Calendar className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "reschedulePickup"}
          onClick={onReschedulePickup}
        />
        <ActionButton
          label="Confirm Carrier Handoff"
          icon={<PackageCheck className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "confirmHandoff"}
          onClick={onConfirmHandoff}
        />
        <ActionButton
          label="Start Delivery Retry"
          icon={<RotateCcw className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "startDeliveryRetry"}
          onClick={onStartDeliveryRetry}
        />
        <ActionButton
          label="Request Address Validation"
          icon={<MapPin className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "requestAddressValidation"}
          onClick={onRequestAddressValidation}
        />
        <ActionButton
          label="Start Return to Origin"
          icon={<Undo2 className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "startRTO"}
          onClick={onStartRTO}
        />
        <ActionButton
          label="Review POD"
          icon={<FileSearch className="w-3.5 h-3.5" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "reviewPOD"}
          onClick={onReviewPOD}
        />
        <ActionButton
          label="Place Shipment Hold"
          icon={<PauseCircle className="w-3.5 h-3.5 text-amber-600" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "placeHold"}
          onClick={onPlaceHold}
        />
        <ActionButton
          label="Release Approved Hold"
          icon={<PlayCircle className="w-3.5 h-3.5 text-emerald-600" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "releaseHold"}
          onClick={onReleaseHold}
        />
        <ActionButton
          label="Start Reconciliation"
          icon={<DollarSign className="w-3.5 h-3.5 text-blue-600" />}
          variant="outline"
          size="xs"
          loading={loadingAction === "startReconciliation"}
          onClick={onStartReconciliation}
        />
        <ActionButton
          label="Close Shipment"
          icon={<XCircle className="w-3.5 h-3.5 text-rose-600" />}
          variant="destructive"
          size="xs"
          loading={loadingAction === "closeShipment"}
          onClick={onCloseShipment}
        />
      </div>
    </div>
  );
}
