import {
  mockReverseLogisticsMetrics,
  mockReverseLogisticsIntelligence,
  mockReturnCasesList,
  sampleReturnDetailRecord,
} from "@/data/logistics/reverseLogistics/reverseLogisticsMockData";
import {
  ReturnCase,
  ReverseLogisticsMetrics,
  ReverseLogisticsIntelligenceData,
} from "@/types/logistics/reverseLogistics";

/**
 * Service abstraction for LG11 & LG12 Returns, Collections & Reverse Logistics.
 */
export const reverseLogisticsService = {
  async getMetrics(): Promise<ReverseLogisticsMetrics> {
    await new Promise((res) => setTimeout(res, 120));
    return mockReverseLogisticsMetrics;
  },

  async getIntelligence(): Promise<ReverseLogisticsIntelligenceData> {
    await new Promise((res) => setTimeout(res, 120));
    return mockReverseLogisticsIntelligence;
  },

  async getReturnCases(filters?: {
    search?: string;
    returnType?: string;
    collectionStatus?: string;
    inspectionStatus?: string;
    tab?: string;
  }): Promise<ReturnCase[]> {
    await new Promise((res) => setTimeout(res, 150));
    let list = [...mockReturnCasesList];

    if (!filters) return list;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.returnRef.toLowerCase().includes(q) ||
          c.orderRef.toLowerCase().includes(q) ||
          c.customerName.toLowerCase().includes(q) ||
          c.productSku.toLowerCase().includes(q)
      );
    }

    if (filters.returnType && filters.returnType !== "all") {
      list = list.filter((c) => c.returnType.toLowerCase() === filters.returnType?.toLowerCase());
    }

    if (filters.collectionStatus && filters.collectionStatus !== "all") {
      list = list.filter(
        (c) => c.collectionStatus.toLowerCase() === filters.collectionStatus?.toLowerCase()
      );
    }

    if (filters.tab && filters.tab !== "Overview" && filters.tab !== "All Returns") {
      const tabLower = filters.tab.toLowerCase();
      if (tabLower.includes("approved")) {
        list = list.filter((c) => c.returnApproval === "Approved");
      } else if (tabLower.includes("collection scheduled")) {
        list = list.filter((c) => c.collectionStatus === "Scheduled");
      } else if (tabLower.includes("collection failed")) {
        list = list.filter((c) => c.collectionStatus === "Failed");
      } else if (tabLower.includes("in transit")) {
        list = list.filter((c) => c.shipmentStatus === "In Transit");
      } else if (tabLower.includes("inspection pending")) {
        list = list.filter((c) => c.inspectionStatus === "Pending");
      }
    }

    return list;
  },

  async getReturnCaseById(id: string): Promise<ReturnCase | null> {
    await new Promise((res) => setTimeout(res, 120));
    const found = mockReturnCasesList.find((c) => c.id === id || c.returnRef === id);
    if (found) return found;
    return {
      ...sampleReturnDetailRecord,
      id: id,
      returnRef: id,
    };
  },

  async createReturnCollection(
    data: Partial<ReturnCase>
  ): Promise<{ success: boolean; returnCase: ReturnCase }> {
    await new Promise((res) => setTimeout(res, 250));
    const newId = `RET-2025-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCase: ReturnCase = {
      ...sampleReturnDetailRecord,
      id: newId,
      returnRef: newId,
      customerName: data.customerName || "Customer",
      returnReason: data.returnReason || "Customer Request",
      collectionStatus: "Scheduled",
      returnApproval: "Approved",
    };
    return { success: true, returnCase: newCase };
  },

  async updateReturnStatus(
    id: string,
    status: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 200));
    return {
      success: true,
      message: `Return case ${id} status updated to ${status}.`,
    };
  },
};
