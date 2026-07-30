import { Shipment, LogisticsPartner, LogisticsMetrics } from "@/types/logistics";
import { mockShipments, mockPartners, mockLogisticsMetrics } from "@/mocks/admin/logistics.mock";

// In a real application, these would use fetch/axios to call the backend

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
  return new Promise((resolve) => setTimeout(() => resolve(mockPartners), 500));
};
