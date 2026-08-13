"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ProductSupplierHeader } from "@/components/admin/customer-support/product-supplier/ProductSupplierHeader";
import { ProductSupplierContextBar } from "@/components/admin/customer-support/product-supplier/ProductSupplierContextBar";
import { ProductSupplierKpis } from "@/components/admin/customer-support/product-supplier/ProductSupplierKpis";
import { ProductSupplierTabs, ProductTabId } from "@/components/admin/customer-support/product-supplier/ProductSupplierTabs";
import { ProductSupplierFilters } from "@/components/admin/customer-support/product-supplier/ProductSupplierFilters";
import { ProductSupplierPortfolioTable } from "@/components/admin/customer-support/product-supplier/ProductSupplierPortfolioTable";
import { SelectedProductSupplierCaseWorkspace } from "@/components/admin/customer-support/product-supplier/SelectedProductSupplierCaseWorkspace";
import { ProductSupplierOperationsRail } from "@/components/admin/customer-support/product-supplier/ProductSupplierOperationsRail";

import {
  MOCK_PRODUCT_SUPPLIER_CASES,
  MOCK_SELECTED_PRODUCT_CASE_DETAILS,
  MOCK_OPERATIONS_RAIL_DATA,
} from "@/components/admin/customer-support/product-supplier/mockData";
import { ProductSupplierCase } from "@/components/admin/customer-support/product-supplier/types";

export default function ProductSupplierPage() {
  const [cases, setCases] = useState<ProductSupplierCase[]>(MOCK_PRODUCT_SUPPLIER_CASES);
  const [selectedCase, setSelectedCase] = useState<ProductSupplierCase>(MOCK_PRODUCT_SUPPLIER_CASES[0]);
  const [activeTab, setActiveTab] = useState<ProductTabId>("active-cases");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState("product-quality");

  // Header Actions
  const handleReviewCritical = () => {
    setActiveTab("escalated");
    toast.success("Filtered to critical product cases");
  };

  const handleReviewSupplierIssues = () => {
    setActiveTab("supplier-issues");
    toast.success("Filtered to supplier issues");
  };

  const handleReviewAuthenticityAlerts = () => {
    setActiveTab("authenticity");
    toast.success("Filtered to authenticity alerts");
  };

  // Filter cases list
  const filteredCases = cases.filter((c) => {
    if (activeTab === "product-quality" && c.issueType !== "Product Quality") return false;
    if (activeTab === "supplier-issues" && c.issueType !== "Supplier") return false;
    if (activeTab === "authenticity" && c.issueType !== "Authenticity") return false;
    if (activeTab === "damaged-defective" && c.issueType !== "Damaged") return false;
    if (activeTab === "product-usage" && c.issueType !== "Usage / Ingredient") return false;
    if (activeTab === "sla-risk" && c.slaStatus !== "At Risk") return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchCustomer = c.customerName.toLowerCase().includes(q);
      const matchProduct = c.productName.toLowerCase().includes(q);
      const matchSku = c.sku.toLowerCase().includes(q);
      const matchSupplier = c.supplier.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchProduct && !matchSku && !matchSupplier) return false;
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col p-4 bg-slate-50/50 min-h-screen">
      {/* 1. Page Header */}
      <ProductSupplierHeader
        onReviewCritical={handleReviewCritical}
        onReviewSupplierIssues={handleReviewSupplierIssues}
        onReviewAuthenticityAlerts={handleReviewAuthenticityAlerts}
      />

      {/* 2. Tenant / Source / Policy Context Bar */}
      <ProductSupplierContextBar />

      {/* 3. Top KPI Summary Cards */}
      <ProductSupplierKpis />

      {/* 4. Horizontal Support Tabs */}
      <ProductSupplierTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filters (Toolbar Search, 16 Selects, Date Range, Readiness status chips) */}
      <ProductSupplierFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedChip={selectedChip}
        onChipChange={setSelectedChip}
        onClearAll={() => {
          setSearchQuery("");
          setSelectedChip("");
          toast.success("Filters cleared");
        }}
        onRefresh={() => toast.success("Product & supplier cases refreshed")}
        onSaveView={() => toast.success("Current view saved")}
        onMoreFilters={() => toast.success("More filters panel opened")}
      />

      {/* 6. Main 2-Column Desktop Area (Main Workspace ~83% | Operations Rail ~17%) */}
      <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
        {/* Main Content Workspace (~83% width) */}
        <div className="w-full xl:w-[83%] flex flex-col">
          {/* Portfolio Table */}
          <ProductSupplierPortfolioTable
            cases={filteredCases}
            selectedId={selectedCase.id}
            onSelect={setSelectedCase}
          />

          {/* Selected Product / Supplier Case Workspace */}
          <SelectedProductSupplierCaseWorkspace details={MOCK_SELECTED_PRODUCT_CASE_DETAILS} />
        </div>

        {/* Right Operations Summary Rail (~17% width) */}
        <div className="w-full xl:w-[17%] shrink-0">
          <ProductSupplierOperationsRail data={MOCK_OPERATIONS_RAIL_DATA} />
        </div>
      </div>
    </div>
  );
}
