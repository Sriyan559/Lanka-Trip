"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ReturnReverseLogisticsDetails } from "@/components/logistics/ReturnReverseLogisticsDetails";
import { CreateReturnCollectionModal } from "@/components/admin/logistics/reverse-logistics/CreateReturnCollectionModal";
import { ConfirmationModal } from "@/components/admin/logistics/shared/ConfirmationModal";
import { reverseLogisticsService } from "@/services/logistics/reverseLogisticsService";
import {
  ReturnCase,
  ReverseLogisticsIntelligenceData,
} from "@/types/logistics/reverseLogistics";

export default function ReturnDetailPage() {
  const params = useParams();
  const returnId = typeof params?.returnId === "string" ? params.returnId : "RET-2026-004281";

  const [returnCase, setReturnCase] = useState<ReturnCase | null>(null);
  const [portfolioCases, setPortfolioCases] = useState<ReturnCase[]>([]);
  const [intelligence, setIntelligence] = useState<ReverseLogisticsIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
      const [rRes, pRes, iRes] = await Promise.all([
        reverseLogisticsService.getReturnCaseById(returnId),
        reverseLogisticsService.getReturnCases(),
        reverseLogisticsService.getIntelligence(),
      ]);
      setReturnCase(rRes);
      setPortfolioCases(pRes);
      setIntelligence(iRes);
    } catch (err) {
      console.error("Failed to load return detail data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [returnId]);

  const handleUpdateStatus = (status: string) => {
    if (!returnCase) return;
    setConfirmModal({
      isOpen: true,
      title: "Confirm Status Transition",
      message: `Are you sure you want to change status of return case ${returnCase.returnRef} to ${status}?`,
      onConfirm: () => {
        void reverseLogisticsService.updateReturnStatus(returnCase.id, status).then((res) => {
          alert(res.message);
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
          void loadData();
        });
      },
    });
  };

  const handleCreateCollection = (formData: Partial<ReturnCase>) => {
    void reverseLogisticsService.createReturnCollection(formData).then((res) => {
      alert(`Return collection created successfully: ${res.returnCase.returnRef}`);
      setIsCreateModalOpen(false);
      void loadData();
    });
  };

  if (loading || !returnCase) {
    return (
      <div className="min-h-screen bg-[#faf8f8] p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center space-y-2">
          <div className="w-8 h-8 border-4 border-rose-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-gray-800">Loading Return Case {returnId}...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReturnReverseLogisticsDetails
        returnCase={returnCase}
        portfolioCases={portfolioCases}
        intelligence={intelligence}
        onRefresh={loadData}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Create Return Collection Modal */}
      <CreateReturnCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCollection}
      />

      {/* Confirmation Modal */}
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
