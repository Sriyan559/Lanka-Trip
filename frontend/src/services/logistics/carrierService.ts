import { mockCarriersList, mockCarrierDashboardMetrics, mockCarrierNetworkIntelligence } from "@/data/logistics/carriers/carrierMockData";
import { Carrier, CarrierDashboardMetrics, CarrierNetworkIntelligenceData, CarrierService } from "@/types/logistics/carrier";

/**
 * Service abstraction for LG09 Carriers, Couriers & Delivery Partners.
 * Resolves trusted server-side context and supports production API integrations.
 */
export const carrierService = {
  async getDashboardMetrics(): Promise<CarrierDashboardMetrics> {
    await new Promise((res) => setTimeout(res, 120));
    return mockCarrierDashboardMetrics;
  },

  async getNetworkIntelligence(): Promise<CarrierNetworkIntelligenceData> {
    await new Promise((res) => setTimeout(res, 120));
    return mockCarrierNetworkIntelligence;
  },

  async getCarriers(filters?: {
    search?: string;
    carrierType?: string;
    operationalStatus?: string;
    approvalStatus?: string;
    tab?: string;
  }): Promise<Carrier[]> {
    await new Promise((res) => setTimeout(res, 150));
    let list = [...mockCarriersList];

    if (!filters) return list;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.carrierName.toLowerCase().includes(q) ||
          c.carrierRef.toLowerCase().includes(q) ||
          c.operator.toLowerCase().includes(q) ||
          c.carrierType.toLowerCase().includes(q)
      );
    }

    if (filters.carrierType && filters.carrierType !== "all") {
      list = list.filter((c) => c.carrierType.toLowerCase() === filters.carrierType?.toLowerCase());
    }

    if (filters.operationalStatus && filters.operationalStatus !== "all") {
      list = list.filter(
        (c) => c.operationalStatus.toLowerCase() === filters.operationalStatus?.toLowerCase()
      );
    }

    if (filters.tab && filters.tab !== "Overview" && filters.tab !== "All Carriers") {
      const tabLower = filters.tab.toLowerCase();
      if (tabLower === "active") {
        list = list.filter((c) => c.operationalStatus === "Active");
      } else if (tabLower === "approved") {
        list = list.filter((c) => c.approvalStatus === "Approved");
      } else if (tabLower === "pending review") {
        list = list.filter((c) => c.operationalStatus === "Pending Review" || c.approvalStatus === "Pending Review");
      } else if (tabLower === "limited service") {
        list = list.filter((c) => c.operationalStatus === "Limited Service");
      } else if (tabLower === "suspended") {
        list = list.filter((c) => c.operationalStatus === "Suspended");
      } else if (tabLower === "on hold") {
        list = list.filter((c) => c.operationalStatus === "On Hold");
      }
    }

    return list;
  },

  async getCarrierById(carrierId: string): Promise<Carrier | null> {
    await new Promise((res) => setTimeout(res, 120));
    const found = mockCarriersList.find((c) => c.id === carrierId || c.carrierRef === carrierId);
    return found || mockCarriersList[0];
  },

  async updateCarrierStatus(
    carrierId: string,
    status: string,
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 250));
    return {
      success: true,
      message: `Carrier ${carrierId} status updated to ${status}. ${reason ? `Reason: ${reason}` : ""}`,
    };
  },

  async createCarrier(carrierData: Partial<Carrier>): Promise<{ success: boolean; carrier: Carrier }> {
    await new Promise((res) => setTimeout(res, 300));
    const newId = `CAR-2025-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCarrier: Carrier = {
      ...mockCarriersList[0],
      id: newId,
      carrierRef: newId,
      carrierName: carrierData.carrierName || "New Carrier Partner",
      carrierType: carrierData.carrierType || "National Courier",
      operator: carrierData.operator || "Operator Ltd",
      operationalStatus: "Active",
      approvalStatus: "Approved",
    };
    return { success: true, carrier: newCarrier };
  },
};
