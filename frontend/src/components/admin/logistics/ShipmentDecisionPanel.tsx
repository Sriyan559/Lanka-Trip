"use client";

import React, { useState } from "react";
import { Check, XCircle, AlertTriangle, Truck } from "lucide-react";
import { updateShipmentCarrier, markShipmentException } from "@/services/api/logisticsService";

interface ShipmentDecisionPanelProps {
  shipmentId: string;
  capabilities: {
    canConfirmPickup: boolean;
    canChangeCarrier: boolean;
    canMarkException: boolean;
    canCancel: boolean;
  };
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function ShipmentDecisionPanel({ shipmentId, capabilities, onSuccess, onError }: ShipmentDecisionPanelProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleConfirmPickup = async () => {
    setLoadingAction("confirm");
    // Mock API call
    setTimeout(() => {
      onSuccess("Pickup confirmed successfully.");
      setLoadingAction(null);
    }, 800);
  };

  const handleChangeCarrier = async () => {
    const newCarrier = window.prompt("Enter new Carrier ID (e.g., car_2):");
    if (!newCarrier) return;
    
    setLoadingAction("changeCarrier");
    try {
      const res = await updateShipmentCarrier(shipmentId, newCarrier);
      onSuccess(res.message);
    } catch (err) {
      onError("Failed to update carrier");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleMarkException = async () => {
    const reason = window.prompt("Enter exception reason (required):");
    if (!reason) {
      onError("Exception reason is required.");
      return;
    }
    
    setLoadingAction("exception");
    try {
      const res = await markShipmentException(shipmentId, reason);
      onSuccess(res.message);
    } catch (err) {
      onError("Failed to log exception");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this shipment? This cannot be undone.")) return;
    
    setLoadingAction("cancel");
    setTimeout(() => {
      onSuccess("Shipment cancelled.");
      setLoadingAction(null);
    }, 800);
  };

  return (
    <div className="side-panel-card decision-panel">
      <h4>Decision & Actions</h4>
      <div className="decision-btn-group">
        <button 
          className="btn-decision primary" 
          disabled={!capabilities.canConfirmPickup || loadingAction !== null}
          onClick={handleConfirmPickup}
        >
          <Check size={16} /> 
          {loadingAction === "confirm" ? "Confirming..." : "Confirm Pickup Handover"}
        </button>
        
        <button 
          className="btn-decision" 
          disabled={!capabilities.canChangeCarrier || loadingAction !== null}
          onClick={handleChangeCarrier}
        >
          <Truck size={16} /> 
          {loadingAction === "changeCarrier" ? "Changing..." : "Change Carrier"}
        </button>

        <button 
          className="btn-decision danger-outline" 
          disabled={!capabilities.canMarkException || loadingAction !== null}
          onClick={handleMarkException}
        >
          <AlertTriangle size={16} /> 
          {loadingAction === "exception" ? "Logging..." : "Mark Exception"}
        </button>

        <button 
          className="btn-decision danger-outline" 
          disabled={!capabilities.canCancel || loadingAction !== null}
          onClick={handleCancel}
        >
          <XCircle size={16} /> 
          {loadingAction === "cancel" ? "Cancelling..." : "Cancel Shipment"}
        </button>
      </div>
    </div>
  );
}

