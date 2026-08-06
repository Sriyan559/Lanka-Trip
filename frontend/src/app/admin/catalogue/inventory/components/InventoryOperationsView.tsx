"use client";

import React, { useState, useMemo } from "react";
import { InventoryPageHeader } from "./InventoryPageHeader";
import { InventoryKpisRow } from "./InventoryKpisRow";
import { ProductInventoryContextCard } from "./ProductInventoryContextCard";
import { CatalogueTopFilterBar } from "@/components/admin/catalogue/shared/CatalogueTopFilterBar";
import { InventoryFiltersBar } from "./InventoryFiltersBar";
import { InventoryTable, InventoryRowData } from "./InventoryTable";
import { RightInventorySidebar } from "./RightInventorySidebar";

import { CreateBatchModal } from "../modals/CreateBatchModal";
import { StockAdjustmentModal } from "../modals/StockAdjustmentModal";
import { RecallReviewModal } from "../modals/RecallReviewModal";
import { MoreFiltersDrawer } from "../modals/MoreFiltersDrawer";

import styles from "../inventory.module.css";

const MOCK_ROWS: InventoryRowData[] = [
  {
    id: "1",
    dbId: "421",
    publicRef: "PROD-2024-00421",
    name: "Radiance Vitamin C Serum",
    variant: "30 ml",
    brand: "Estée Lauder",
    supplier: "Luxe Distribution Pvt Ltd",
    sku: "RAD-VITC-30ML",
    batchNumber: "BT-2024-0098",
    location: "Colombo Main Hub",
    availableStock: 2450,
    reservedStock: 200,
    quarantinedStock: 0,
    mfgDate: "15 Jan 2024",
    expDate: "15 Jan 2027",
    shelfLife: "30 Months",
    shelfLifeStatus: "Healthy",
    batchStatus: "Active",
    recallStatus: "None",
    riskScore: "Low",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100&h=100",
    productId: "product-uuid-001",
  },
  {
    id: "2",
    dbId: "436",
    publicRef: "PROD-2024-00436",
    name: "Luxe Skin Cream",
    variant: "50 ml",
    brand: "Innisfree",
    supplier: "Glow Global Exports",
    sku: "HYDRA-RICH-50ML",
    batchNumber: "BT-2024-0112",
    location: "Colombo Main Hub",
    availableStock: 12,
    reservedStock: 8,
    quarantinedStock: 0,
    mfgDate: "01 Mar 2024",
    expDate: "12 Aug 2026",
    shelfLife: "22 Days",
    shelfLifeStatus: "Critical",
    batchStatus: "Near Expiry",
    recallStatus: "None",
    riskScore: "High",
    imageUrl:
      "https://images.unsplash.com/photo-1615397323286-90f7725dc012?auto=format&fit=crop&q=80&w=100&h=100",
    productId: "product-uuid-002",
  },
  {
    id: "3",
    dbId: "451",
    publicRef: "PROD-2024-00451",
    name: "Matte Silk Lipstick",
    variant: "Ruby Red",
    brand: "Chanel Beauty",
    supplier: "Vortex Logistics Hub",
    sku: "MSL-RED-001",
    batchNumber: "RECALL-442",
    location: "Kandy Regional Hub",
    availableStock: 1100,
    reservedStock: 0,
    quarantinedStock: 1100,
    mfgDate: "10 Sep 2023",
    expDate: "15 Dec 2026",
    shelfLife: "17 Months",
    shelfLifeStatus: "Normal",
    batchStatus: "Quarantined",
    recallStatus: "Active Recall",
    riskScore: "Critical",
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=100&h=100",
    productId: "product-uuid-003",
  },
  {
    id: "4",
    dbId: "462",
    publicRef: "PROD-2024-00462",
    name: "Nourishing Glow Oil",
    variant: "100 ml",
    brand: "Botanica Pure",
    supplier: "Pure Organic Co.",
    sku: "NGO-100ML",
    batchNumber: "BT-2024-0211",
    location: "Galle Supplier Hub",
    availableStock: 450,
    reservedStock: 0,
    quarantinedStock: 450,
    mfgDate: "10 Apr 2024",
    expDate: "05 Nov 2027",
    shelfLife: "16 Months",
    shelfLifeStatus: "Normal",
    batchStatus: "Quarantined",
    recallStatus: "Safety Review Open",
    riskScore: "High",
    imageUrl:
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=100&h=100",
    productId: "product-uuid-004",
  },
];

interface InventoryOperationsViewProps {
  productId?: string;
  productData?: any;
}

export function InventoryOperationsView({
  productId,
  productData,
}: InventoryOperationsViewProps) {
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [selectedSupplier, setSelectedSupplier] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedVariant, setSelectedVariant] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [productFilterActive, setProductFilterActive] = useState(!!productId);

  const [currentPage, setCurrentPage] = useState(1);

  // Modal States
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [showStockAdjustment, setShowStockAdjustment] = useState(false);
  const [showRecallReview, setShowRecallReview] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [selectedBatchRow, setSelectedBatchRow] = useState<InventoryRowData | null>(null);

  // Filtered Rows Logic
  const filteredRows = useMemo(() => {
    return MOCK_ROWS.filter((r) => {
      // Product Filter Context
      if (productFilterActive && productId && r.dbId !== productId && r.productId !== productId) {
        // If demo single product filter, match product-uuid-001 or id
        if (r.dbId !== "421") return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = r.name.toLowerCase().includes(q);
        const matchSku = r.sku.toLowerCase().includes(q);
        const matchBatch = r.batchNumber.toLowerCase().includes(q);
        const matchBrand = r.brand.toLowerCase().includes(q);
        const matchSupplier = r.supplier.toLowerCase().includes(q);
        const matchPublicRef = r.publicRef.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchBatch && !matchBrand && !matchSupplier && !matchPublicRef) {
          return false;
        }
      }

      // Brand
      if (selectedBrand !== "ALL" && r.brand !== selectedBrand) return false;

      // Supplier
      if (selectedSupplier !== "ALL" && r.supplier !== selectedSupplier) return false;

      // Variant
      if (selectedVariant !== "ALL" && r.variant !== selectedVariant) return false;

      // Location
      if (selectedLocation !== "ALL" && r.location !== selectedLocation) return false;

      // Quick Filters
      if (activeQuickFilter) {
        if (activeQuickFilter === "Near Expiry" && r.batchStatus !== "Near Expiry") return false;
        if (activeQuickFilter === "Expired" && r.batchStatus !== "Expired") return false;
        if (activeQuickFilter === "Low Stock" && r.availableStock >= 50) return false;
        if (activeQuickFilter === "Out of Stock" && r.availableStock > 0) return false;
        if (activeQuickFilter === "Quarantined" && r.batchStatus !== "Quarantined") return false;
        if (activeQuickFilter === "Recalled" && r.recallStatus === "None") return false;
      }

      return true;
    });
  }, [
    productFilterActive,
    productId,
    searchTerm,
    selectedBrand,
    selectedSupplier,
    selectedVariant,
    selectedLocation,
    activeQuickFilter,
  ]);

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSelectedBrand("ALL");
    setSelectedSupplier("ALL");
    setSelectedCategory("ALL");
    setSelectedVariant("ALL");
    setSelectedLocation("ALL");
    setActiveQuickFilter(null);
  };

  const handleQuickFilterToggle = (chip: string) => {
    setActiveQuickFilter((prev) => (prev === chip ? null : chip));
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <InventoryPageHeader
        productId={productId}
        productRef={productData?.id}
        dbId={productData?.id}
        onCreateBatch={() => setShowCreateBatch(true)}
        onRecordAdjustment={() => setShowStockAdjustment(true)}
        onStartRecall={() => setShowRecallReview(true)}
      />

      {/* Top Filter Bar */}
      <CatalogueTopFilterBar />

      {/* Main Layout Grid */}
      <div className={styles.mainLayoutGrid}>
        {/* Main Content Area (~78% width) */}
        <div className={styles.mainWorkspaceColumn}>
          {/* 9 KPI Cards */}
          <InventoryKpisRow />

          {/* Product Inventory Context Card (if product filter active or displayed) */}
          {productFilterActive && (
            <ProductInventoryContextCard
              productRef={productData?.id || "PROD-2024-00421"}
              dbId={productId || "421"}
              productName={productData?.name || "Radiance Vitamin C Serum"}
              brand={productData?.brand || "Estée Lauder"}
              supplier={productData?.supplier || "Luxe Distribution Pvt Ltd"}
              productId={productId}
              onClearFilter={() => setProductFilterActive(false)}
            />
          )}

          {/* Filter Toolbar */}
          <InventoryFiltersBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            selectedSupplier={selectedSupplier}
            onSupplierChange={setSelectedSupplier}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            activeQuickFilter={activeQuickFilter}
            onQuickFilterToggle={handleQuickFilterToggle}
            onClearAll={handleClearAllFilters}
            onOpenMoreFilters={() => setShowMoreFilters(true)}
          />

          {/* Inventory Table */}
          <InventoryTable
            rows={filteredRows}
            totalRows={filteredRows.length}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onRecordAdjustment={(row) => {
              setSelectedBatchRow(row);
              setShowStockAdjustment(true);
            }}
            onStartRecall={(row) => {
              setSelectedBatchRow(row);
              setShowRecallReview(true);
            }}
          />
        </div>

        {/* Right Operational Sidebar (~22% width) */}
        <div className={styles.sidebarColumn}>
          <RightInventorySidebar
            productId={productId}
            productRef={productData?.id || "PROD-2024-00421"}
            dbId={productId || "421"}
            productName={productData?.name || "Radiance Vitamin C Serum"}
            brand={productData?.brand || "Estée Lauder"}
            supplier={productData?.supplier || "Luxe Distribution Pvt Ltd"}
            onClearFilter={() => setProductFilterActive(false)}
            onSelectQuickQueueBatch={(batchId) => {
              setSearchTerm(batchId);
            }}
          />
        </div>
      </div>

      {/* Modals & Drawers */}
      <CreateBatchModal
        isOpen={showCreateBatch}
        onClose={() => setShowCreateBatch(false)}
        onConfirm={(data) => {
          setShowCreateBatch(false);
          alert(`Created new batch ${data.batchNumber} for ${data.productName}`);
        }}
      />

      <StockAdjustmentModal
        isOpen={showStockAdjustment}
        batchNumber={selectedBatchRow?.batchNumber || "BT-2024-0098"}
        onClose={() => setShowStockAdjustment(false)}
        onConfirm={(adj) => {
          setShowStockAdjustment(false);
          alert(`Recorded adjustment of ${adj.qty} units for batch ${adj.targetBatch}`);
        }}
      />

      <RecallReviewModal
        isOpen={showRecallReview}
        batchNumber={selectedBatchRow?.batchNumber || "RECALL-442"}
        onClose={() => setShowRecallReview(false)}
        onConfirm={(recall) => {
          setShowRecallReview(false);
          alert(`Initiated recall review for batch ${recall.targetBatch}`);
        }}
      />

      <MoreFiltersDrawer
        isOpen={showMoreFilters}
        onClose={() => setShowMoreFilters(false)}
        onApply={() => {
          setShowMoreFilters(false);
          alert("Applied advanced inventory filters!");
        }}
      />
    </div>
  );
}
