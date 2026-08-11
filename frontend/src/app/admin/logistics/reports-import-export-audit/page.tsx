"use client";

import React, { useState, useEffect } from "react";
import { LogisticsReportsAuditPage } from "@/components/logistics/LogisticsReportsAuditPage";
import { ConfirmationModal } from "@/components/admin/logistics/shared/ConfirmationModal";
import { reportsImportExportAuditService } from "@/services/logistics/reportsImportExportAuditService";
import {
  LogisticsOperationRecord,
  GovernanceIntelligence,
} from "@/types/logistics/reportsImportExportAudit";

export default function ReportsImportExportAuditPage() {
  const [records, setRecords] = useState<LogisticsOperationRecord[]>([]);
  const [intelligence, setIntelligence] = useState<GovernanceIntelligence | null>(null);
  const [loading, setLoading] = useState(true);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [recRes, intelRes] = await Promise.all([
        reportsImportExportAuditService.getOperations(),
        reportsImportExportAuditService.getIntelligence(),
      ]);
      setRecords(recRes);
      setIntelligence(intelRes);
    } catch (err) {
      console.error("Failed to load reports import export audit data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleCreateOperation = (type: string) => {
    setConfirmModal({
      isOpen: true,
      title: `Create ${type} Job`,
      message: `Are you sure you want to initiate a new ${type} job for the active operational period?`,
      onConfirm: () => {
        void reportsImportExportAuditService.createOperation({
          operationType: type.includes("Import") ? "Import" : type.includes("Export") ? "Export" : "Report",
          reportOrTemplateName: `New_${type}_May25.csv`,
        }).then((res) => {
          alert(`Initiated operation: ${res.record.operationRef}`);
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
          void loadData();
        });
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f8] p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center space-y-2">
          <div className="w-8 h-8 border-4 border-rose-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-gray-800">Loading Logistics Reports, Import, Export &amp; Audit...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <LogisticsReportsAuditPage
        records={records}
        intelligence={intelligence}
        onRefresh={loadData}
        onCreateOperation={handleCreateOperation}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}
