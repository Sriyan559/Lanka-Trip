"use client";

import React, { useState } from "react";
import { ProductDetailHeader } from "./ProductDetailHeader";
import { ProductSummaryCard } from "./ProductSummaryCard";
import { ProductDetailTabs, TabKey } from "./ProductDetailTabs";
import { ProductIdentityCard } from "./ProductIdentityCard";
import { ReviewMetricsGrid } from "./ReviewMetricsGrid";
import { MarketplacePreviewSummary } from "./MarketplacePreviewSummary";
import { RightReviewSidebar } from "./RightReviewSidebar";

import { ApproveProductModal } from "../modals/ApproveProductModal";
import { ApproveConditionsModal } from "../modals/ApproveConditionsModal";
import { RequestInfoModal } from "../modals/RequestInfoModal";
import { RejectProductModal } from "../modals/RejectProductModal";
import { SuspendReviewModal } from "../modals/SuspendReviewModal";
import { AssignReviewerModal } from "../modals/AssignReviewerModal";

import styles from "../product-approval-detail.module.css";

export interface DetailProductData {
  id: string;
  productRef: string;
  name: string;
  sku: string;
  brand: string;
  supplier: string;
  category: string;
  status: string;
  riskLevel: string;
  reviewAge: string;
  dbId: string;
  submittedDate: string;
  assignedReviewer: string;
  submissionVersion: string;
  imageUrl?: string;

  barcode: string;
  manufacturer: string;
  activeStatus: string;
  updatedAt: string;
  type: string;
  subcategory: string;
  countryOfOrigin: string;

  price: string;
  description: string;
  contentCompleteness: number;
  complianceCompleteness: number;
  authStatus: string;
  authId: string;
  variantReadiness: number;
  mediaReadiness: number;
  duplicateRisk: string;
  riskScore: number;
  riskLabel: string;
  openIssuesCount: number;
  slaDeadline: string;
  slaDaysLeft: string;
  variantsCount: number;
}

interface ProductApprovalDetailViewProps {
  product: DetailProductData;
}

export function ProductApprovalDetailView({ product: initialProduct }: ProductApprovalDetailViewProps) {
  const [product, setProduct] = useState<DetailProductData>(initialProduct);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // Modal States
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showConditionsModal, setShowConditionsModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Decision Handlers
  const handleConfirmApprove = (comment: string) => {
    setShowApproveModal(false);
    setProduct((prev) => ({
      ...prev,
      status: "Approved",
      activeStatus: "Active",
    }));
    alert(`Product "${product.name}" approved successfully! ${comment ? `Note: ${comment}` : ""}`);
  };

  const handleConfirmConditions = (conditions: string, deadline: string) => {
    setShowConditionsModal(false);
    setProduct((prev) => ({
      ...prev,
      status: "Approved with Conditions",
    }));
    alert(`Approved "${product.name}" with conditions: ${conditions} (Deadline: ${deadline})`);
  };

  const handleConfirmRequestInfo = (category: string, message: string) => {
    setShowRequestInfoModal(false);
    setProduct((prev) => ({
      ...prev,
      status: "Info Requested",
    }));
    alert(`Request sent to supplier for ${category}: ${message}`);
  };

  const handleConfirmReject = (reasonCategory: string, notes: string) => {
    setShowRejectModal(false);
    setProduct((prev) => ({
      ...prev,
      status: "Rejected",
      activeStatus: "Rejected",
    }));
    alert(`Product "${product.name}" rejected: [${reasonCategory}] ${notes}`);
  };

  const handleConfirmSuspend = (reason: string) => {
    setShowSuspendModal(false);
    setProduct((prev) => ({
      ...prev,
      status: "Suspended",
    }));
    alert(`Review suspended for "${product.name}": ${reason}`);
  };

  const handleConfirmAssign = (reviewerName: string) => {
    setShowAssignModal(false);
    setProduct((prev) => ({
      ...prev,
      assignedReviewer: reviewerName,
    }));
    alert(`Assigned review to ${reviewerName}`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header & Breadcrumb */}
      <ProductDetailHeader productRef={product.productRef} />

      {/* Summary Card */}
      <ProductSummaryCard
        productId={product.id}
        productRef={product.productRef}
        name={product.name}
        sku={product.sku}
        brand={product.brand}
        supplier={product.supplier}
        category={product.category}
        status={product.status}
        riskLevel={product.riskLevel}
        reviewAge={product.reviewAge}
        dbId={product.dbId}
        submittedDate={product.submittedDate}
        assignedReviewer={product.assignedReviewer}
        submissionVersion={product.submissionVersion}
        imageUrl={product.imageUrl}
        onRequestInfo={() => setShowRequestInfoModal(true)}
        onReject={() => setShowRejectModal(true)}
        onApprove={() => setShowApproveModal(true)}
        onAssignReviewer={() => setShowAssignModal(true)}
        onSuspend={() => setShowSuspendModal(true)}
        onPreviewMarketplace={() =>
          alert(`Opening Marketplace Preview for ${product.name}...`)
        }
      />

      {/* Horizontal Detail Navigation Tabs */}
      <ProductDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Workspace Grid Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column Content */}
        <div className={styles.mainContentColumn}>
          {activeTab === "overview" && (
            <>
              {/* Product Identity */}
              <ProductIdentityCard
                productRef={product.productRef}
                sku={product.sku}
                brand={product.brand}
                supplier={product.supplier}
                createdAt={product.submittedDate}
                dbId={product.dbId}
                barcode={product.barcode}
                manufacturer={product.manufacturer}
                status={product.activeStatus}
                updatedAt={product.updatedAt}
                category={product.category}
                type={product.type}
                subcategory={product.subcategory}
                countryOfOrigin={product.countryOfOrigin}
              />

              {/* Review Metrics */}
              <ReviewMetricsGrid
                contentCompleteness={product.contentCompleteness}
                complianceCompleteness={product.complianceCompleteness}
                authStatus={product.authStatus}
                authId={product.authId}
                variantReadiness={product.variantReadiness}
                mediaReadiness={product.mediaReadiness}
                duplicateRisk={product.duplicateRisk}
                riskScore={product.riskScore}
                riskLabel={`${product.riskLevel} Risk`}
                openIssuesCount={product.openIssuesCount}
                submissionVersion={product.submissionVersion}
                slaDeadline={product.slaDeadline}
                slaDaysLeft={product.slaDaysLeft}
                onViewIssues={() => setActiveTab("ingredients_safety")}
              />

              {/* Marketplace Preview Summary */}
              <MarketplacePreviewSummary
                name={product.name}
                price={product.price}
                description={product.description}
                category={product.category}
                variantsCount={product.variantsCount}
                brand={product.brand}
                imageUrl={product.imageUrl}
                onPreviewMarketplace={() =>
                  alert(`Opening Marketplace Preview for ${product.name}...`)
                }
              />
            </>
          )}

          {activeTab === "content" && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Product Content &amp; Copy</h2>
              <div className={styles.contentDetailBox}>
                <div className={styles.contentFieldGroup}>
                  <label className={styles.fieldLabel}>Product Title</label>
                  <div className={styles.fieldValueBold}>{product.name} - 30ml</div>
                </div>
                <div className={styles.contentFieldGroup}>
                  <label className={styles.fieldLabel}>Short Description</label>
                  <div className={styles.fieldValue}>{product.description}</div>
                </div>
                <div className={styles.contentFieldGroup}>
                  <label className={styles.fieldLabel}>Marketing Claims</label>
                  <ul className={styles.claimsList}>
                    <li>15% Pure L-Ascorbic Acid for maximum brightening</li>
                    <li>Antioxidant shield against environmental pollution</li>
                    <li><span className={styles.unsupportedFlag}>[Unsupported Claim]</span> Clinically reduces deep wrinkles by 85% in 3 days</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "beauty_profile" && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Beauty &amp; Dermatological Profile</h2>
              <div className={styles.beautyProfileGrid}>
                <div className={styles.beautyItem}>
                  <span className={styles.beautyLabel}>Target Concern:</span> Dullness, Hyperpigmentation, Uneven Tone
                </div>
                <div className={styles.beautyItem}>
                  <span className={styles.beautyLabel}>Skin Compatibility:</span> Normal, Combination, Oily, Sensitive
                </div>
                <div className={styles.beautyItem}>
                  <span className={styles.beautyLabel}>Formulation Finish:</span> Lightweight Liquid Serum, Radiance Glow
                </div>
                <div className={styles.beautyItem}>
                  <span className={styles.beautyLabel}>Cruelty-Free / Vegan:</span> Yes (Certified Leaping Bunny)
                </div>
              </div>
            </div>
          )}

          {activeTab === "ingredients_safety" && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Ingredients &amp; Safety Compliance</h2>
              <div className={styles.ingredientsBox}>
                <div className={styles.inciTitle}>Full INCI Ingredient List</div>
                <p className={styles.inciText}>
                  Aqua/Water/Eau, Ascorbic Acid (15%), Glycerin, Propylene Glycol, Sodium Hyaluronate, Tocopherol, Ferulic Acid, Phenoxyethanol, Ethylhexylglycerin.
                </p>

                <div className={styles.safetyIssueAlert}>
                  <strong>Safety Compliance Alert:</strong> Missing 15% Vitamin C stability lab test certificate. Please upload verified lab documentation.
                </div>
              </div>
            </div>
          )}

          {activeTab === "variants" && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Product Variants ({product.variantsCount})</h2>
              <table className={styles.variantsTable}>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Variant Name</th>
                    <th>Volume / Size</th>
                    <th>Selling Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>RAD-VITC-15ML</td>
                    <td>Radiance Vitamin C Serum 15ml</td>
                    <td>15 ml</td>
                    <td>LKR 6,800.00</td>
                    <td>120 units</td>
                  </tr>
                  <tr className={styles.selectedRow}>
                    <td>RAD-VITC-30ML</td>
                    <td>Radiance Vitamin C Serum 30ml (Primary)</td>
                    <td>30 ml</td>
                    <td>LKR 12,450.00</td>
                    <td>450 units</td>
                  </tr>
                  <tr>
                    <td>RAD-VITC-50ML</td>
                    <td>Radiance Vitamin C Serum 50ml Value Pack</td>
                    <td>50 ml</td>
                    <td>LKR 18,900.00</td>
                    <td>85 units</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "media" && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Images &amp; Media Assets</h2>
              <div className={styles.mediaGallery}>
                <div className={styles.mediaCard}>
                  <img src={product.imageUrl || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80"} alt="Primary" />
                  <span>Primary Image</span>
                </div>
                <div className={styles.mediaCard}>
                  <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80" alt="Texture" />
                  <span>Texture / Swatch</span>
                </div>
                <div className={`${styles.mediaCard} ${styles.missingMediaCard}`}>
                  <div className={styles.missingMediaText}>Back Packaging Image Missing</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "brand_auth" && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Brand Authorization Case ({product.authId})</h2>
              <div className={styles.authCaseBox}>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Authorized Distributor:</strong> {product.supplier}</p>
                <p><strong>Authorization Status:</strong> <span className={`${styles.badge} ${styles.green}`}>{product.authStatus}</span></p>
                <p><strong>Territory:</strong> Sri Lanka &amp; Maldives</p>
                <p><strong>Expiry Date:</strong> 2026-12-31</p>
              </div>
            </div>
          )}

          {(activeTab === "batch_expiry" || activeTab === "pricing_inventory" || activeTab === "audit_logs" || activeTab === "supplier_docs") && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Section Details</h2>
              <p className={styles.sectionDesc}>
                Detailed breakdown for section &quot;{activeTab}&quot; is loaded and verified for product {product.productRef}.
              </p>
            </div>
          )}
        </div>

        {/* Right Review Sidebar */}
        <div className={styles.sidebarColumn}>
          <RightReviewSidebar
            progressPercent={78}
            stepsCompleted={14}
            totalSteps={18}
            reviewerName={product.assignedReviewer}
            onOpenTab={setActiveTab}
            onApprove={() => setShowApproveModal(true)}
            onApproveConditions={() => setShowConditionsModal(true)}
            onRequestInfo={() => setShowRequestInfoModal(true)}
            onReject={() => setShowRejectModal(true)}
            onSuspend={() => setShowSuspendModal(true)}
          />
        </div>
      </div>

      {/* Decision Modals */}
      <ApproveProductModal
        isOpen={showApproveModal}
        productName={product.name}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleConfirmApprove}
      />

      <ApproveConditionsModal
        isOpen={showConditionsModal}
        productName={product.name}
        onClose={() => setShowConditionsModal(false)}
        onConfirm={handleConfirmConditions}
      />

      <RequestInfoModal
        isOpen={showRequestInfoModal}
        productName={product.name}
        onClose={() => setShowRequestInfoModal(false)}
        onConfirm={handleConfirmRequestInfo}
      />

      <RejectProductModal
        isOpen={showRejectModal}
        productName={product.name}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleConfirmReject}
      />

      <SuspendReviewModal
        isOpen={showSuspendModal}
        productName={product.name}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleConfirmSuspend}
      />

      <AssignReviewerModal
        isOpen={showAssignModal}
        productName={product.name}
        currentReviewer={product.assignedReviewer}
        onClose={() => setShowAssignModal(false)}
        onConfirm={handleConfirmAssign}
      />
    </div>
  );
}
