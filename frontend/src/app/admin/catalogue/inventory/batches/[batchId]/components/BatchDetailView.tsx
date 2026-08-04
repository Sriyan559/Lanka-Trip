"use client";

import React, { useState } from "react";
import { BatchDetailHeader } from "./BatchDetailHeader";
import { BatchSummaryCard } from "./BatchSummaryCard";
import { BatchNavigationTabs } from "./BatchNavigationTabs";

import { BatchIdentityCard } from "./BatchIdentityCard";
import { StockSummaryCard } from "./StockSummaryCard";
import { InventoryValuationCard } from "./InventoryValuationCard";
import { StorageHandlingCard } from "./StorageHandlingCard";

import { RightBatchSidebar } from "./RightBatchSidebar";

// Modals
import { StockAdjustmentModal } from "../../../modals/StockAdjustmentModal";
import { RecallReviewModal } from "../../../modals/RecallReviewModal";
import { TransferStockModal } from "../modals/TransferStockModal";
import { QuarantineBatchModal } from "../modals/QuarantineBatchModal";
import { MarkDamagedModal } from "../modals/MarkDamagedModal";
import { NotifySupplierModal } from "../modals/NotifySupplierModal";
import { SuspendMarketplaceModal } from "../modals/SuspendMarketplaceModal";

import styles from "../batch-detail.module.css";

interface BatchDetailViewProps {
  batchId: string;
}

export function BatchDetailView({ batchId }: BatchDetailViewProps) {
  const [activeTab, setActiveTab] = useState("Batch Overview");

  // Modal States
  const [showStockAdjustment, setShowStockAdjustment] = useState(false);
  const [showTransferStock, setShowTransferStock] = useState(false);
  const [showQuarantineBatch, setShowQuarantineBatch] = useState(false);
  const [showInitiateRecall, setShowInitiateRecall] = useState(false);
  const [showMarkDamaged, setShowMarkDamaged] = useState(false);
  const [showNotifySupplier, setShowNotifySupplier] = useState(false);
  const [showSuspendMarketplace, setShowSuspendMarketplace] = useState(false);

  const batchData = {
    batchId: batchId || "BT-2024-0098",
    productId: "421",
    productSku: "RAD-VITC-30ML",
    productName: "Radiance Vitamin C Serum (30 ml)",
    productRef: "PROD-2024-00421",
    brand: "Estée Lauder",
    supplier: "Luxe Distribution Pvt Ltd",
    complianceCert: "GMP/C-2024-V3",
    country: "United Kingdom",
    classification: "Premium Skincare",
    status: "ACTIVE",
    risk: "Low Risk",
    mfgDate: "Jan 15, 2024",
    expiryDate: "Jan 15, 2027",
    shelfLife: "36 Months",
    recallStatus: "None",
    locationName: "Colombo Main Hub",
    available: 2450,
    reserved: 200,
    quarantined: 0,
    damaged: 0,
    recalled: 0,
    inTransit: 450,
    totalPhysical: 3100,
    avgUnitCost: "3,450.00",
    availableValue: "8,452,500.00",
    reservedValue: "690,000.00",
    quarantinedValue: "0.00",
    inTransitValue: "1,552,500.00",
    totalValue: "10,695,000.00",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80",
  };

  const handleExportRecord = () => {
    alert(`Exporting official batch record for ${batchData.batchId}...`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Back Link & Breadcrumb Header */}
      <BatchDetailHeader batchId={batchData.batchId} />

      {/* Main 2-Column Desktop Grid Layout */}
      <div className={styles.mainDesktopLayoutGrid}>
        {/* Main Workspace Column (~77% width) */}
        <div className={styles.mainWorkspaceColumn}>
          {/* Top Batch Summary Header Card */}
          <BatchSummaryCard
            batchData={batchData}
            onRecordAdjustment={() => setShowStockAdjustment(true)}
            onTransferStock={() => setShowTransferStock(true)}
            onQuarantineBatch={() => setShowQuarantineBatch(true)}
            onInitiateRecall={() => setShowInitiateRecall(true)}
            onMarkDamaged={() => setShowMarkDamaged(true)}
            onNotifySupplier={() => setShowNotifySupplier(true)}
            onExportRecord={handleExportRecord}
            onSuspendMarketplace={() => setShowSuspendMarketplace(true)}
          />

          {/* Tab Navigation */}
          <BatchNavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content Panels */}
          {activeTab === "Batch Overview" && (
            <div className={styles.overviewCardsGrid}>
              <div className={styles.cardsRow2}>
                <BatchIdentityCard batchData={batchData} />
                <StockSummaryCard batchData={batchData} />
              </div>

              <div className={styles.cardsRow2}>
                <InventoryValuationCard batchData={batchData} />
                <StorageHandlingCard batchData={batchData} />
              </div>
            </div>
          )}

          {activeTab !== "Batch Overview" && (
            <div className={styles.placeholderTabCard}>
              <h3 className={styles.placeholderTabTitle}>{activeTab} Details</h3>
              <p className={styles.placeholderTabText}>
                Displaying detailed logs, history, and records for {activeTab} linked to batch {batchData.batchId}.
              </p>
            </div>
          )}
        </div>

        {/* Right Batch Health Sidebar Column (~23% width) */}
        <div className={styles.sidebarColumn}>
          <RightBatchSidebar
            onRecordAdjustment={() => setShowStockAdjustment(true)}
            onTransferStock={() => setShowTransferStock(true)}
            onQuarantineBatch={() => setShowQuarantineBatch(true)}
            onInitiateRecall={() => setShowInitiateRecall(true)}
            onMarkDamaged={() => setShowMarkDamaged(true)}
            onNotifySupplier={() => setShowNotifySupplier(true)}
            onExportRecord={handleExportRecord}
            onSuspendMarketplace={() => setShowSuspendMarketplace(true)}
          />
        </div>
      </div>

      {/* Action Modals */}
      <StockAdjustmentModal
        isOpen={showStockAdjustment}
        batchNumber={batchData.batchId}
        onClose={() => setShowStockAdjustment(false)}
        onConfirm={(adj: any) => {
          setShowStockAdjustment(false);
          alert(`Stock adjustment recorded for batch ${batchData.batchId}!`);
        }}
      />

      <TransferStockModal
        isOpen={showTransferStock}
        batchNumber={batchData.batchId}
        onClose={() => setShowTransferStock(false)}
        onConfirm={(transfer: any) => {
          setShowTransferStock(false);
          alert(`Transferred ${transfer.qty} units from ${transfer.sourceLoc} to ${transfer.destLoc}.`);
        }}
      />

      <QuarantineBatchModal
        isOpen={showQuarantineBatch}
        batchNumber={batchData.batchId}
        onClose={() => setShowQuarantineBatch(false)}
        onConfirm={(qData: any) => {
          setShowQuarantineBatch(false);
          alert(`Quarantined ${qData.qty} units of batch ${batchData.batchId}.`);
        }}
      />

      <RecallReviewModal
        isOpen={showInitiateRecall}
        batchNumber={batchData.batchId}
        onClose={() => setShowInitiateRecall(false)}
        onConfirm={(recall: any) => {
          setShowInitiateRecall(false);
          alert(`Initiated product recall review for batch ${batchData.batchId}.`);
        }}
      />

      <MarkDamagedModal
        isOpen={showMarkDamaged}
        batchNumber={batchData.batchId}
        onClose={() => setShowMarkDamaged(false)}
        onConfirm={(dmg: any) => {
          setShowMarkDamaged(false);
          alert(`Marked ${dmg.damagedQty} units as damaged for batch ${batchData.batchId}.`);
        }}
      />

      <NotifySupplierModal
        isOpen={showNotifySupplier}
        batchNumber={batchData.batchId}
        supplierName={batchData.supplier}
        onClose={() => setShowNotifySupplier(false)}
        onConfirm={(note: any) => {
          setShowNotifySupplier(false);
          alert(`Notification sent to ${note.recipient} for batch ${batchData.batchId}.`);
        }}
      />

      <SuspendMarketplaceModal
        isOpen={showSuspendMarketplace}
        batchNumber={batchData.batchId}
        productName={batchData.productName}
        onClose={() => setShowSuspendMarketplace(false)}
        onConfirm={(susp: any) => {
          setShowSuspendMarketplace(false);
          alert(`Marketplace availability suspended for batch ${batchData.batchId}.`);
        }}
      />
    </div>
  );
}
