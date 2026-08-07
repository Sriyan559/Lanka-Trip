import React from "react";
import { products } from "@/mocks/admin/fixtures";
import {
  ProductApprovalDetailView,
  DetailProductData,
} from "./components/ProductApprovalDetailView";

export default async function ProductApprovalDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const fixtureProduct = products.find((x) => x.id === productId) || products[0];

  const detailData: DetailProductData = {
    id: productId || fixtureProduct.id,
    productRef:
      fixtureProduct.publicReference === "PRD-2026-101"
        ? "PROD-2024-00421"
        : fixtureProduct.publicReference,
    name:
      fixtureProduct.name === "Barrier Repair Serum"
        ? "Radiance Vitamin C Serum"
        : fixtureProduct.name,
    sku: "RAD-VITC-30ML",
    brand:
      fixtureProduct.brand === "Aurora Skin"
        ? "Estée Lauder"
        : fixtureProduct.brand,
    supplier:
      fixtureProduct.supplier === "Serene Botanics Lanka"
        ? "Luxe Distribution Pvt Ltd"
        : fixtureProduct.supplier,
    category: "Skincare > Face Serum",
    status: fixtureProduct.status || "Compliance Review",
    riskLevel: fixtureProduct.risk || "Medium",
    reviewAge: "2 Days",
    dbId: "421",
    submittedDate: "Oct 24, 2024",
    assignedReviewer: "Elena Vance",
    submissionVersion: "v2",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80",

    barcode: "8901234567895",
    manufacturer: "Estée Lauder Companies Inc.",
    activeStatus: "Active",
    updatedAt: "Oct 26, 2024",
    type: "Finished Cosmetic Product",
    subcategory: "Vitamin C Serums",
    countryOfOrigin: "USA",

    price: "LKR 12,450.00",
    description:
      "An advanced Vitamin C serum designed to brighten dull skin, even out complexion, and provide powerful antioxidant protection. Formulated with 15% Pure Vitamin C and Hyaluronic Acid for a hydrated, radiant glow.",
    contentCompleteness: fixtureProduct.completeness || 85,
    complianceCompleteness: 72,
    authStatus: "Valid",
    authId: fixtureProduct.authorizationId || "AUTH-2023-0892",
    variantReadiness: 100,
    mediaReadiness: 80,
    duplicateRisk: "Low",
    riskScore: 38,
    riskLabel: "Medium Risk",
    openIssuesCount: 3,
    slaDeadline: "Oct 31, 2024",
    slaDaysLeft: "5 days left",
    variantsCount: 3,
  };

  return <ProductApprovalDetailView product={detailData} />;
}
