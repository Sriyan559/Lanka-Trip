import { getMockShipmentById } from "@/data/logistics/shipments/shipmentMockData";
import {
  CarrierAlternative,
  DeliveryAttempt,
  ExceptionSummaryData,
  PODGovernanceData,
  PickupOperation,
  ReconciliationSummaryData,
  ShipmentDetail,
  ShipmentPackage,
  TrackingEvent,
} from "@/types/logistics/shipment";

/**
 * Service abstraction for LG08 Shipment Detail & Carrier Tracking.
 * Resolves trusted business context and supports server API integration.
 */
export const shipmentService = {
  async getShipment(shipmentId: string): Promise<ShipmentDetail> {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 150));
    return getMockShipmentById(shipmentId);
  },

  async getShipmentPackages(shipmentId: string): Promise<ShipmentPackage[]> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.packages;
  },

  async getTrackingEvents(shipmentId: string): Promise<TrackingEvent[]> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.trackingEvents;
  },

  async getCarrierAlternatives(shipmentId: string): Promise<CarrierAlternative[]> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.carrierAlternatives;
  },

  async getPickupOperations(shipmentId: string): Promise<PickupOperation> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.pickup;
  },

  async getDeliveryAttempts(shipmentId: string): Promise<DeliveryAttempt[]> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.deliveryAttemptsList;
  },

  async getPODGovernance(shipmentId: string): Promise<PODGovernanceData> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.pod;
  },

  async getExceptions(shipmentId: string): Promise<ExceptionSummaryData> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.exceptions;
  },

  async getReconciliation(shipmentId: string): Promise<ReconciliationSummaryData> {
    const shipment = await this.getShipment(shipmentId);
    return shipment.reconciliation;
  },

  // Operational Action Handlers
  async refreshTracking(shipmentId: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Tracking refreshed for shipment ${shipmentId}. Standardized 10 events.`,
    };
  },

  async reassignCarrier(shipmentId: string, carrierId: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Carrier reassigned to ${carrierId} for shipment ${shipmentId}.`,
    };
  },

  async reschedulePickup(shipmentId: string, windowStr: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Pickup rescheduled to ${windowStr} for shipment ${shipmentId}.`,
    };
  },

  async placeHold(shipmentId: string, reason: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Operational hold placed on ${shipmentId}: ${reason}`,
    };
  },

  async releaseHold(shipmentId: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Approved hold released for shipment ${shipmentId}.`,
    };
  },

  async startDeliveryRetry(shipmentId: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Delivery retry initiated for shipment ${shipmentId}.`,
    };
  },

  async startReturnToOrigin(shipmentId: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Return to Origin (RTO) initiated for shipment ${shipmentId}.`,
    };
  },
};
