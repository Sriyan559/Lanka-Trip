"use client";

import React, { useState, useEffect } from "react";
import { LogisticsExceptionsPage } from "@/components/logistics/LogisticsExceptionsPage";
import { ConfirmationModal } from "@/components/admin/logistics/shared/ConfirmationModal";
import { exceptionsReconciliationService } from "@/services/logistics/exceptionsReconciliationService";
import {
  LogisticsExceptionRecord,
  LogisticsControlIntelligence,
} from "@/types/logistics/exceptionsReconciliation";

export default function ExceptionsReconciliationPage() {
  const [records, setRecords] = useState<LogisticsExceptionRecord[]>([]);
  const [intelligence, setIntelligence] = useState<LogisticsControlIntelligence | null>(null);
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
        exceptionsReconciliationService.getExceptions(),
        exceptionsReconciliationService.getIntelligence(),
      ]);
      setRecords(recRes);
      setIntelligence(intelRes);
    } catch (err) {
      console.error("Failed to load exceptions reconciliation data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleRunReconciliation = () => {
    setConfirmModal({
      isOpen: true,
      title: "Run Automated Cost Reconciliation",
      message: "Are you sure you want to execute automated cost reconciliation engine across all open carrier and warehouse charge feeds?",
      onConfirm: () => {
        void exceptionsReconciliationService.runReconciliation().then((res) => {
          alert(res.message);
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
          void loadData();
        });
      },
    });
  };

  const handleCreateException = () => {
    void exceptionsReconciliationService.createExceptionClaim({
      exceptionType: "Carrier Charge Variance",
      severity: "High",
    }).then((res) => {
      alert(`Created exception case: ${res.record.referenceId}`);
      void loadData();
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f8] p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center space-y-2">
          <div className="w-8 h-8 border-4 border-rose-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-gray-800">Loading Logistics Exceptions &amp; Reconciliation...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <LogisticsExceptionsPage
        records={records}
        intelligence={intelligence}
        onRefresh={loadData}
        onRunReconciliation={handleRunReconciliation}
        onCreateException={handleCreateException}
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
