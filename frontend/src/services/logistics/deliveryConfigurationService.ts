import {
  mockConfigurationMetrics,
  mockConfigurationIntelligence,
  mockConfigurationsList,
  mockImpactScenario,
} from "@/data/logistics/deliveryConfiguration/deliveryConfigurationMockData";
import {
  ConfigurationMetrics,
  DeliveryConfigurationIntelligenceData,
  ConfigurationRecord,
  ImpactSimulationScenario,
} from "@/types/logistics/deliveryConfiguration";

/**
 * Service layer for LG10 Delivery Zones, Rates, Capacity & SLA.
 */
export const deliveryConfigurationService = {
  async getMetrics(): Promise<ConfigurationMetrics> {
    await new Promise((res) => setTimeout(res, 120));
    return mockConfigurationMetrics;
  },

  async getIntelligence(): Promise<DeliveryConfigurationIntelligenceData> {
    await new Promise((res) => setTimeout(res, 120));
    return mockConfigurationIntelligence;
  },

  async getConfigurations(filters?: {
    search?: string;
    ruleType?: string;
    activationStatus?: string;
    approvalStatus?: string;
    tab?: string;
  }): Promise<ConfigurationRecord[]> {
    await new Promise((res) => setTimeout(res, 150));
    let list = [...mockConfigurationsList];

    if (!filters) return list;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.configName.toLowerCase().includes(q) ||
          c.configRef.toLowerCase().includes(q) ||
          c.zoneName.toLowerCase().includes(q) ||
          c.carrier.toLowerCase().includes(q)
      );
    }

    if (filters.ruleType && filters.ruleType !== "all") {
      list = list.filter((c) => c.ruleType.toLowerCase() === filters.ruleType?.toLowerCase());
    }

    if (filters.activationStatus && filters.activationStatus !== "all") {
      list = list.filter(
        (c) => c.activationStatus.toLowerCase() === filters.activationStatus?.toLowerCase()
      );
    }

    if (filters.tab && filters.tab !== "Overview") {
      const tabLower = filters.tab.toLowerCase();
      if (tabLower.includes("active")) {
        list = list.filter((c) => c.activationStatus === "Active");
      } else if (tabLower.includes("pending approval")) {
        list = list.filter((c) => c.approvalStatus === "Pending Approval");
      } else if (tabLower.includes("suspended")) {
        list = list.filter((c) => c.activationStatus === "Suspended");
      } else if (tabLower.includes("at capacity")) {
        list = list.filter((c) => c.activationStatus === "At Capacity");
      }
    }

    return list;
  },

  async getConfigurationById(id: string): Promise<ConfigurationRecord | null> {
    await new Promise((res) => setTimeout(res, 120));
    const found = mockConfigurationsList.find((c) => c.id === id || c.configRef === id);
    return found || mockConfigurationsList[0];
  },

  async runImpactSimulation(percentIncrease: number): Promise<ImpactSimulationScenario> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      ...mockImpactScenario,
      orderVolumeIncreasePercentage: percentIncrease,
      projectedCapacityUtilisation: Math.min(100, Math.round(76 * (1 + percentIncrease / 100))),
    };
  },

  async createDeliveryRule(
    ruleData: Partial<ConfigurationRecord>
  ): Promise<{ success: boolean; rule: ConfigurationRecord }> {
    await new Promise((res) => setTimeout(res, 250));
    const newId = `DZC-2025-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRule: ConfigurationRecord = {
      ...mockConfigurationsList[0],
      id: newId,
      configRef: newId,
      configName: ruleData.configName || "New Delivery Rule",
      ruleType: ruleData.ruleType || "Delivery Zone",
      zoneName: ruleData.zoneName || "New Zone",
      activationStatus: "Active",
      approvalStatus: "Approved",
    };
    return { success: true, rule: newRule };
  },

  async updateConfigurationStatus(
    id: string,
    status: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 200));
    return {
      success: true,
      message: `Configuration ${id} status updated to ${status}.`,
    };
  },
};
