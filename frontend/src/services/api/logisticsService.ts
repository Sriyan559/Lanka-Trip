import { Shipment, LogisticsPartner, LogisticsMetrics } from "@/types/logistics";
import type {
  LogisticsShipment,
  PriorityAlertItem,
  ShipmentDetailViewModel,
  ShipmentFilterParams,
  ShipmentMetrics,
} from "@/types/admin";
import {
  mockLogisticsMetrics,
  mockPriorityAlerts,
  mockShipments,
} from "@/mocks/admin/logistics.mock";

// TODO(api): Replace these isolated mock adapters when Laravel exposes Admin
// logistics endpoints with equivalent hub and shipment-operation contracts.
const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const fetchLogisticsMetrics = async (): Promise<LogisticsMetrics> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockLogisticsMetrics), 400));
};

export const fetchShipments = async (filters: any = {}): Promise<{ data: Shipment[]; total: number; totalPages: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockShipments];
      
      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter(s => s.status === filters.status);
      }
      
      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(s => 
          s.trackingNumber.toLowerCase().includes(query) || 
          s.orderReference.toLowerCase().includes(query)
        );
      }

      resolve({
        data: filtered,
        total: filtered.length,
        totalPages: 1
      });
    }, 600);
  });
};

export const fetchLogisticsPartners = async (): Promise<LogisticsPartner[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([]), 500));
};

export async function fetchShipmentOperations(
  params: ShipmentFilterParams = {},
): Promise<{ data: LogisticsShipment[]; total: number; totalPages: number }> {
  await delay(300);
  return {
    data: [],
    total: 0,
    totalPages: 1,
  };
}

export async function fetchShipmentDetail(id: string): Promise<ShipmentDetailViewModel> {
  await delay(300);
  return {} as ShipmentDetailViewModel;
}

export async function fetchShipmentMetrics(): Promise<ShipmentMetrics> {
  await delay(200);
  return {} as ShipmentMetrics;
}

export async function fetchLogisticsPriorityAlerts(): Promise<PriorityAlertItem[]> {
  await delay(200);
  return (mockPriorityAlerts as unknown as PriorityAlertItem[]).map((alert) => ({ ...alert }));
}

export async function updateShipmentCarrier(
  id: string,
  newCarrierId: string,
): Promise<{ success: boolean; message: string }> {
  await delay(300);
  return { success: true, message: `Successfully updated carrier for shipment ${id}` };
}

export async function markShipmentException(
  id: string,
  reason: string,
): Promise<{ success: boolean; message: string }> {
  await delay(300);
  return { success: true, message: `Exception logged for shipment ${id}` };
}
