import {
  LogisticsExceptionRecord,
  LogisticsControlIntelligence,
} from "@/types/logistics/exceptionsReconciliation";
import {
  sampleExceptionRecord,
  sampleExceptionsList,
  sampleControlIntelligence,
} from "@/data/logistics/exceptionsReconciliation/exceptionsReconciliationMockData";

export const exceptionsReconciliationService = {
  async getExceptions(): Promise<LogisticsExceptionRecord[]> {
    return Promise.resolve(sampleExceptionsList);
  },

  async getExceptionById(id: string): Promise<LogisticsExceptionRecord> {
    const found = sampleExceptionsList.find((item) => item.id === id || item.referenceId === id);
    return Promise.resolve(found || sampleExceptionRecord);
  },

  async getIntelligence(): Promise<LogisticsControlIntelligence> {
    return Promise.resolve(sampleControlIntelligence);
  },

  async updateExceptionStatus(id: string, status: string): Promise<{ success: boolean; message: string }> {
    return Promise.resolve({
      success: true,
      message: `Exception record ${id} status updated to ${status}.`,
    });
  },

  async createExceptionClaim(payload: Partial<LogisticsExceptionRecord>): Promise<{ success: boolean; record: LogisticsExceptionRecord }> {
    const newRecord: LogisticsExceptionRecord = {
      ...sampleExceptionRecord,
      id: `LEX-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      referenceId: `LEX-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      createdDate: new Date().toLocaleString(),
      updatedDate: new Date().toLocaleString(),
      ...payload,
    };
    return Promise.resolve({
      success: true,
      record: newRecord,
    });
  },

  async runReconciliation(): Promise<{ success: boolean; reconciledCount: number; message: string }> {
    return Promise.resolve({
      success: true,
      reconciledCount: 42,
      message: "Automated logistics cost reconciliation executed cleanly for 42 records.",
    });
  },
};
