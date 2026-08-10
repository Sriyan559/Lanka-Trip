"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { logisticsApi } from "@/lib/api/logistics";

interface DeleteShipmentModalProps {
  shipment: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteShipmentModal({ shipment, isOpen, onClose, onSuccess }: DeleteShipmentModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !shipment) return null;

  const handleDelete = async () => {
    setSubmitting(true);
    setError(null);

    try {
      await logisticsApi.deleteShipment(shipment.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to delete shipment record.");
    } finally {
      setSubmitting(false);
    }
  };

  const shipmentRef = shipment.shipment_number || shipment.reference || `ID #${shipment.id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-line animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle size={24} />
          </div>

          <div>
            <h3 className="text-base font-bold text-ink">Delete Logistics Record?</h3>
            <p className="text-xs text-muted mt-1">
              You are about to delete / soft-delete shipment reference:
            </p>
            <div className="font-mono font-bold text-ink text-sm bg-canvas p-2 rounded mt-2 border border-line">
              {shipmentRef}
            </div>
            <p className="text-[11px] text-muted mt-2">
              This operational record will be soft-deleted in the database and audit logged.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs text-left">
              {error}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-line text-ink rounded font-semibold hover:bg-canvas transition-colors text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleDelete}
              className="px-4 py-2 bg-rose-600 text-white rounded font-semibold hover:bg-rose-700 flex items-center gap-2 transition-colors text-xs disabled:opacity-50"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              Delete Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
