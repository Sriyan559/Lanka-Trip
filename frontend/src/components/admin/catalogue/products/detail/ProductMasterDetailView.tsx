"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, RefreshCw, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_PRODUCT_DETAIL_RECORD } from "@/data/productDetail.mock";
import { ProductDetailHeader } from "./components/ProductDetailHeader";
import { ProductSummaryCard } from "./components/ProductSummaryCard";
import { ProductBusinessContext } from "./components/ProductBusinessContext";
import { ProductReadinessCards } from "./components/ProductReadinessCards";
import { ProductDetailTabs } from "./components/ProductDetailTabs";
import { OverviewTabContent } from "./components/OverviewTabContent";
import { OtherTabWorkspaces } from "./components/OtherTabWorkspaces";
import { ProductIntelligenceSidebar } from "./components/ProductIntelligenceSidebar";
import { EditProductDrawer } from "./components/EditProductDrawer";
import { SubmitApprovalModal } from "./components/SubmitApprovalModal";
import { MarketplacePreviewModal } from "./components/MarketplacePreviewModal";

export function ProductMasterDetailView({ productId }: { productId: string }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals & Drawers
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Controlled Not Found screen if productId is invalid or unknown
  if (productId === "invalid-id" || productId === "404") {
    return (
      <div className="p-6 max-w-4xl mx-auto w-full min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Product master not found</h1>
        <p className="text-xs text-gray-500 mb-6 max-w-md">
          The requested Product Master reference ID <span className="font-mono font-bold text-gray-800">&quot;{productId}&quot;</span> does not exist in the catalogue registry or has been archived.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/catalogue/products"
            className="h-9 px-4 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a] flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Product Masters</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Product Master data updated.");
    }, 600);
  };

  const handleMoreAction = (action: string) => {
    toast.success(`Executed action "${action}" for ${MOCK_PRODUCT_DETAIL_RECORD.productName}`);
  };

  const handleOpenIssueModal = (issueId: string) => {
    toast(`Opening issue resolution context for ${issueId}`, { icon: "⚠️" });
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8fafc] p-4 sm:p-6 pb-12">
      {/* 1. Page Header & Conflict Warning Banner */}
      <ProductDetailHeader
        productId={productId || MOCK_PRODUCT_DETAIL_RECORD.publicId}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <div className="flex flex-col gap-5 max-w-[1920px] mx-auto w-full">
        {/* 2. Product Summary Card */}
        <ProductSummaryCard
          product={MOCK_PRODUCT_DETAIL_RECORD}
          onEdit={() => setIsEditDrawerOpen(true)}
          onSubmitApproval={() => setIsSubmitModalOpen(true)}
          onPreviewMarketplace={() => setIsPreviewModalOpen(true)}
          onMoreAction={handleMoreAction}
        />

        {/* 3. Business Context Strip */}
        <ProductBusinessContext onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        {/* 4. Product Readiness KPI Cards */}
        <ProductReadinessCards onSelectTab={setActiveTab} />

        {/* 5. Detail Navigation Tabs */}
        <ProductDetailTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* 2-Column Layout: Main Tab Workspace & Right Intelligence Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Main Left Workspace */}
          <div className="flex flex-col gap-6 min-w-0">
            {activeTab === "overview" ? (
              <OverviewTabContent
                onSelectTab={setActiveTab}
                onOpenIssueModal={handleOpenIssueModal}
              />
            ) : (
              <OtherTabWorkspaces activeTab={activeTab} />
            )}
          </div>

          {/* Right Product Intelligence Sidebar */}
          <div className="sticky top-4">
            <ProductIntelligenceSidebar
              onEdit={() => setIsEditDrawerOpen(true)}
              onSubmitApproval={() => setIsSubmitModalOpen(true)}
              onRequestInfo={() => toast("Opening Request Info dialog", { icon: "📝" })}
              onPreviewMarketplace={() => setIsPreviewModalOpen(true)}
              onSuspend={() => toast.success("Publication suspended for product.")}
              onArchive={() => toast.success("Product master archived.")}
              onEscalate={() => toast("Escalated product issue to Senior Director", { icon: "🚨" })}
              onExport={() => toast.success("Exported product record file.")}
              onOpenIssueModal={handleOpenIssueModal}
            />
          </div>
        </div>
        {/* Sidebar */}
        <div>
          <DetailSidebar productId={productId} />
        </div>
      </div>

      {/* Modals & Drawers */}
      <EditProductDrawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
      />

      <SubmitApprovalModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      <MarketplacePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </div>
  );
}
