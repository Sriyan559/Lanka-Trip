import {
  LogisticsOperationRecord,
  GovernanceIntelligence,
} from "@/types/logistics/reportsImportExportAudit";
import {
  sampleOperationRecord,
  sampleOperationsList,
  sampleGovernanceIntelligence,
} from "@/data/logistics/reportsImportExportAudit/reportsImportExportAuditMockData";

export const reportsImportExportAuditService = {
  async getOperations(): Promise<LogisticsOperationRecord[]> {
    return Promise.resolve(sampleOperationsList);
  },

  async getOperationById(id: string): Promise<LogisticsOperationRecord> {
    const found = sampleOperationsList.find(
      (item) => item.id === id || item.operationRef === id
    );
    return Promise.resolve(found || sampleOperationRecord);
  },

  async getIntelligence(): Promise<GovernanceIntelligence> {
    return Promise.resolve(sampleGovernanceIntelligence);
  },

  async createOperation(
    payload: Partial<LogisticsOperationRecord>
  ): Promise<{ success: boolean; record: LogisticsOperationRecord }> {
    const newRecord: LogisticsOperationRecord = {
      ...sampleOperationRecord,
      id: `IMP-2025-${Math.floor(100000 + Math.random() * 900000)}`,
      operationRef: `IMP-2025-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      ...payload,
    };
    return Promise.resolve({
      success: true,
      record: newRecord,
    });
  },

  async updateOperationStatus(
    id: string,
    status: string
  ): Promise<{ success: boolean; message: string }> {
    return Promise.resolve({
      success: true,
      message: `Operation record ${id} updated to status ${status}.`,
    });
  },
};
