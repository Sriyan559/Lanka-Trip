"use client";

import React, { useState, useMemo } from "react";
import { ProductApprovalHeader } from "./ProductApprovalHeader";
import { ProductApprovalKpis } from "./ProductApprovalKpis";
import {
  ProductApprovalFilters,
  QuickViewKey,
} from "./ProductApprovalFilters";
import {
  ProductApprovalTable,
  ProductApprovalItem,
} from "./ProductApprovalTable";
import { RightContextSidebar } from "./RightContextSidebar";
import styles from "../product-approvals.module.css";

const MOCK_PRODUCTS: ProductApprovalItem[] = [
  {
    id: "product-uuid-001",
    name: "Radiance Vitamin C Serum",
    sku: "RAD-VITC-30ML",
    type: "Face Serum",
    version: "v2",
    productId: "PROD-2024-00421",
    brand: "Estée Lauder",
    supplier: "Luxe Distribution Pvt Ltd",
    category: "Skincare > Face Serum",
    variantsCount: 3,
    sellingPrice: "LKR 12,450.00",
    authorizationStatus: "Valid",
    authorizationId: "AUTH-2023-0892",
    contentCompleteness: 85,
    complianceStatus: "Safety Evidence Pending",
    complianceVariant: "amber",
    duplicateRisk: "Low",
    riskLevel: "Medium",
    submittedDate: "Oct 24, 2024",
    assignedReviewer: "Elena Vance",
    reviewStatus: "Compliance Review",
    reviewStatusVariant: "blue",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=100&q=80",
    isAssignedToMe: true,
  },
  {
    id: "product-uuid-002",
    name: "Advanced Night Repair Synchronized Multi-Recovery",
    sku: "ANR-EST-50ML",
    type: "Night Treatment",
    version: "v1",
    productId: "PROD-2024-00422",
    brand: "Estée Lauder",
    supplier: "Luxe Distribution Pvt Ltd",
    category: "Skincare > Night Care",
    variantsCount: 2,
    sellingPrice: "LKR 24,800.00",
    authorizationStatus: "Valid",
    authorizationId: "AUTH-2023-0892",
    contentCompleteness: 94,
    complianceStatus: "Verified",
    complianceVariant: "green",
    duplicateRisk: "Low",
    riskLevel: "Low",
    submittedDate: "Oct 23, 2024",
    assignedReviewer: "Elena Vance",
    reviewStatus: "Ready for Final Approval",
    reviewStatusVariant: "green",
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=100&q=80",
    isAssignedToMe: true,
  },
  {
    id: "product-uuid-003",
    name: "Hydrating Botanical Cleansing Gel",
    sku: "HBC-BOT-200ML",
    type: "Cleanser",
    version: "v1",
    productId: "PROD-2024-00423",
    brand: "Serene Botanics",
    supplier: "Serene Botanics Lanka",
    category: "Skincare > Cleansers",
    variantsCount: 1,
    sellingPrice: "LKR 4,200.00",
    authorizationStatus: "Invalid",
    authorizationId: "AUTH-2024-0105",
    contentCompleteness: 60,
    complianceStatus: "Missing Ingredients",
    complianceVariant: "red",
    duplicateRisk: "High",
    riskLevel: "High",
    submittedDate: "Oct 22, 2024",
    assignedReviewer: "Marcus Chen",
    reviewStatus: "Info Requested",
    reviewStatusVariant: "amber",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80",
    isAssignedToMe: false,
  },
  {
    id: "product-uuid-004",
    name: "Mineral Sunscreen Fluid SPF 50+",
    sku: "MSS-LUM-50ML",
    type: "Sun Protection",
    version: "v3",
    productId: "PROD-2024-00424",
    brand: "Lumière Labs",
    supplier: "Ceylon Glow Exports",
    category: "Skincare > Sunscreen",
    variantsCount: 4,
    sellingPrice: "LKR 8,900.00",
    authorizationStatus: "Pending",
    authorizationId: "AUTH-2024-0112",
    contentCompleteness: 72,
    complianceStatus: "Safety Blocker",
    complianceVariant: "red",
    duplicateRisk: "Medium",
    riskLevel: "High",
    submittedDate: "Oct 21, 2024",
    assignedReviewer: "Elena Vance",
    reviewStatus: "Under Review",
    reviewStatusVariant: "blue",
    imageUrl:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=100&q=80",
    isAssignedToMe: true,
  },
  {
    id: "product-uuid-005",
    name: "Velvet Matte Moisture Lipstick (Ruby Red)",
    sku: "VML-GLA-04",
    type: "Lipstick",
    version: "v1",
    productId: "PROD-2024-00425",
    brand: "Glamour Lounge",
    supplier: "Luxe Distribution Pvt Ltd",
    category: "Makeup > Lips",
    variantsCount: 6,
    sellingPrice: "LKR 5,600.00",
    authorizationStatus: "Valid",
    authorizationId: "AUTH-2023-0892",
    contentCompleteness: 90,
    complianceStatus: "Verified",
    complianceVariant: "green",
    duplicateRisk: "Low",
    riskLevel: "Low",
    submittedDate: "Oct 20, 2024",
    assignedReviewer: "Unassigned",
    reviewStatus: "New Submission",
    reviewStatusVariant: "neutral",
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=100&q=80",
    isAssignedToMe: false,
  },
  {
    id: "product-uuid-006",
    name: "Organic Cold-Pressed Rosehip Face Oil",
    sku: "RFO-ORG-30ML",
    type: "Face Oil",
    version: "v2",
    productId: "PROD-2024-00426",
    brand: "Coco Lanka Naturals",
    supplier: "Coco Lanka Pvt Ltd",
    category: "Skincare > Face Oils",
    variantsCount: 2,
    sellingPrice: "LKR 6,400.00",
    authorizationStatus: "Valid",
    authorizationId: "AUTH-2024-0099",
    contentCompleteness: 78,
    complianceStatus: "Lab Report Required",
    complianceVariant: "amber",
    duplicateRisk: "Low",
    riskLevel: "Medium",
    submittedDate: "Oct 19, 2024",
    assignedReviewer: "Marcus Chen",
    reviewStatus: "Compliance Review",
    reviewStatusVariant: "blue",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597261-71752b047547?auto=format&fit=crop&w=100&q=80",
    isAssignedToMe: false,
  },
];

interface ProductApprovalQueueViewProps {
  filterAuthId?: string;
}

export function ProductApprovalQueueView({
  filterAuthId = "AUTH-2023-0892",
}: ProductApprovalQueueViewProps) {
  const [productList, setProductList] = useState<ProductApprovalItem[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviewerFilter, setReviewerFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [activeQuickView, setActiveQuickView] = useState<QuickViewKey>("assigned_to_me");

  // Filter logic
  const filteredProducts = useMemo(() => {
    return productList.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.productId.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.supplier.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);

        if (!matchesSearch) return false;
      }

      // 2. Status Dropdown
      if (statusFilter !== "all" && item.reviewStatus !== statusFilter) {
        return false;
      }

      // 3. Reviewer Dropdown
      if (reviewerFilter !== "all") {
        if (reviewerFilter === "me" && !item.isAssignedToMe) return false;
        if (reviewerFilter === "unassigned" && item.assignedReviewer !== "Unassigned") return false;
        if (
          reviewerFilter !== "me" &&
          reviewerFilter !== "unassigned" &&
          item.assignedReviewer !== reviewerFilter
        ) {
          return false;
        }
      }

      // 4. Risk Level Dropdown
      if (riskFilter !== "all" && item.riskLevel !== riskFilter) {
        return false;
      }

      // 5. Quick Views
      if (activeQuickView === "assigned_to_me" && !item.isAssignedToMe) {
        return false;
      }
      if (activeQuickView === "new_submissions" && item.reviewStatus !== "New Submission") {
        return false;
      }
      if (activeQuickView === "high_risk" && item.riskLevel !== "High") {
        return false;
      }
      if (activeQuickView === "info_requested" && item.reviewStatus !== "Info Requested") {
        return false;
      }
      if (
        activeQuickView === "globally_pending" &&
        (item.reviewStatus === "Approved" || item.reviewStatus === "Rejected")
      ) {
        return false;
      }
      if (
        activeQuickView === "ready_for_approval" &&
        item.reviewStatus !== "Ready for Final Approval"
      ) {
        return false;
      }

      return true;
    });
  }, [productList, searchQuery, statusFilter, reviewerFilter, riskFilter, activeQuickView]);

  // Actions
  const handleApproveProduct = (id: string) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, reviewStatus: "Approved", reviewStatusVariant: "green" }
          : p
      )
    );
  };

  const handleRejectProduct = (id: string) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, reviewStatus: "Rejected", reviewStatusVariant: "red" }
          : p
      )
    );
  };

  const handleAssignReviewer = (id: string) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, assignedReviewer: "Elena Vance", isAssignedToMe: true }
          : p
      )
    );
  };

  const handleRequestInfo = (id: string) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, reviewStatus: "Info Requested", reviewStatusVariant: "amber" }
          : p
      )
    );
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <ProductApprovalHeader
        onReviewNext={() => setActiveQuickView("assigned_to_me")}
        onBulkAssign={() => alert("Bulk assign triggered")}
        onViewHistory={() => alert("View approval history triggered")}
        onImportReview={() => alert("Product import review triggered")}
      />

      {/* 9 KPI Cards */}
      <ProductApprovalKpis
        onKpiClick={(kpiId) => {
          if (kpiId === "high_risk") setActiveQuickView("high_risk");
          else if (kpiId === "new") setActiveQuickView("new_submissions");
          else if (kpiId === "info_requested") setActiveQuickView("info_requested");
        }}
      />

      {/* Filter Bar & Quick Views */}
      <ProductApprovalFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        reviewerFilter={reviewerFilter}
        onReviewerChange={setReviewerFilter}
        riskFilter={riskFilter}
        onRiskChange={setRiskFilter}
        activeQuickView={activeQuickView}
        onQuickViewChange={setActiveQuickView}
      />

      {/* Main Grid: Data Table + Right Contextual Sidebar */}
      <div className={styles.mainGrid}>
        {/* Table Container */}
        <div className={styles.tableColumn}>
          <ProductApprovalTable
            products={filteredProducts}
            filterAuthId={filterAuthId}
            onApproveProduct={handleApproveProduct}
            onRejectProduct={handleRejectProduct}
            onAssignReviewer={handleAssignReviewer}
            onRequestInfo={handleRequestInfo}
          />
        </div>

        {/* Right Contextual Panel */}
        <div className={styles.sidebarColumn}>
          <RightContextSidebar
            authId={filterAuthId}
            onFilterBlockingIssue={(issueType) => {
              setSearchQuery(issueType);
            }}
            onInvestigateRisks={() => {
              setActiveQuickView("high_risk");
              setRiskFilter("High");
            }}
            onSelectQuickQueue={(queueKey) => {
              setActiveQuickView(queueKey);
            }}
          />
        </div>
      </div>
    </div>
  );
}
