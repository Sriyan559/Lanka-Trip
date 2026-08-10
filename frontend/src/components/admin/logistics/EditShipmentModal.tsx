"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { logisticsApi } from "@/lib/api/logistics";

interface EditShipmentModalProps {
  shipment: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditShipmentModal({ shipment, isOpen, onClose, onSuccess }: EditShipmentModalProps) {
  const [partners, setPartners] = useState<any[]>([]);

  const [logisticsPartnerId, setLogisticsPartnerId] = useState<string>("");
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [carrierReference, setCarrierReference] = useState<string>("");
  const [estimatedShipDate, setEstimatedShipDate] = useState<string>("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && shipment) {
      logisticsApi.getReferenceData()
        .then((res: any) => {
          if (res?.data) {
            setPartners(res.data.logistics_partners || []);
          }
        })
        .catch(() => {});

      setLogisticsPartnerId(shipment.logistics_partner_id ? String(shipment.logistics_partner_id) : "");
      setTrackingNumber(shipment.tracking_number || "");
      setCarrierReference(shipment.carrier_reference || "");
      setEstimatedShipDate(shipment.estimated_ship_date ? String(shipment.estimated_ship_date).substring(0, 10) : "");
      setEstimatedDeliveryDate(shipment.estimated_delivery_date ? String(shipment.estimated_delivery_date).substring(0, 10) : "");
      setStatus(shipment.status || "pending");
    }
  }, [isOpen, shipment]);

  if (!isOpen || !shipment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload: Record<string, any> = {
        status,
        tracking_number: trackingNumber,
        carrier_reference: carrierReference,
      };
      if (logisticsPartnerId) payload.logistics_partner_id = Number(logisticsPartnerId);
      if (estimatedShipDate) payload.estimated_ship_date = estimatedShipDate;
      if (estimatedDeliveryDate) payload.estimated_delivery_date = estimatedDeliveryDate;

      await logisticsApi.updateShipment(shipment.id, payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to update shipment record.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-line animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-canvas">
          <div>
            <h2 className="text-base font-bold text-ink">Edit Shipment Record</h2>
            <p className="text-[11px] text-muted">{shipment.shipment_number || `ID #${shipment.id}`}</p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-muted hover:text-ink transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block font-semibold text-ink mb-1">Logistics Partner</label>
            <select
              value={logisticsPartnerId}
              onChange={(e) => setLogisticsPartnerId(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-line rounded text-ink focus:outline-none"
            >
              <option value="">-- Select Carrier --</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink mb-1">Tracking Number</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full h-9 px-3 bg-white border border-line rounded text-ink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink mb-1">Carrier Reference</label>
              <input
                type="text"
                value={carrierReference}
                onChange={(e) => setCarrierReference(e.target.value)}
                className="w-full h-9 px-3 bg-white border border-line rounded text-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink mb-1">Estimated Ship Date</label>
              <input
                type="date"
                value={estimatedShipDate}
                onChange={(e) => setEstimatedShipDate(e.target.value)}
                className="w-full h-9 px-3 bg-white border border-line rounded text-ink focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-ink mb-1">Estimated Delivery Date</label>
              <input
                type="date"
                value={estimatedDeliveryDate}
                onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                className="w-full h-9 px-3 bg-white border border-line rounded text-ink focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-ink mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-line rounded text-ink focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="booked">Booked</option>
              <option value="in_transit">In Transit</option>
              <option value="delayed">Delayed</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-line text-ink rounded font-semibold hover:bg-canvas transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-primary-900 text-white rounded font-semibold hover:bg-primary-800 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
