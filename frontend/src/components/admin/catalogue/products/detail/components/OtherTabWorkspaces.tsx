"use client";

import React from "react";
import {
  FileText,
  Tag,
  BookOpen,
  ShieldCheck,
  Layers,
  Image as ImageIcon,
  Boxes,
  DollarSign,
  Globe,
  Clock,
} from "lucide-react";
import { MOCK_PRODUCT_DETAIL_RECORD } from "@/data/productDetail.mock";

interface OtherTabWorkspacesProps {
  activeTab: string;
}

export const OtherTabWorkspaces: React.FC<OtherTabWorkspacesProps> = ({
  activeTab,
}) => {
  const p = MOCK_PRODUCT_DETAIL_RECORD;

  switch (activeTab) {
    case "identity":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <FileText size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Identity & Classification Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <span className="text-gray-400 font-semibold uppercase text-[10px] block">Public Ref</span>
              <span className="font-mono font-bold text-gray-900 text-sm">{p.publicId}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <span className="text-gray-400 font-semibold uppercase text-[10px] block">Database ID</span>
              <span className="font-mono font-bold text-gray-900 text-sm">{p.dbProductId}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <span className="text-gray-400 font-semibold uppercase text-[10px] block">SKU Barcode</span>
              <span className="font-mono font-bold text-gray-900 text-sm">{p.sku}</span>
            </div>
          </div>
        </div>
      );

    case "brand":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Tag size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Brand & Supplier Relationship Workspace</h2>
          </div>
          <p className="text-xs text-gray-600">
            Authorized distributor contracts for {p.brand} provided by {p.supplier}. Valid through {p.brandAuthExpiry}.
          </p>
        </div>
      );

    case "content":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <BookOpen size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Product Content & Localization</h2>
          </div>
          <div className="text-xs space-y-2">
            <div className="font-bold text-gray-900">{p.productName}</div>
            <div className="text-gray-600">{p.shortDescription}</div>
            <div className="text-gray-500 font-medium">Languages: {p.languages.join(", ")}</div>
          </div>
        </div>
      );

    case "ingredients":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <ShieldCheck size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Ingredients, Safety & Compliance Records</h2>
          </div>
          <p className="text-xs text-gray-600">
            Total {p.totalIngredients} ingredients registered. Active ingredients: 15% L-Ascorbic Acid (Vitamin C), Ferulic Acid, Hyaluronic Acid.
          </p>
        </div>
      );

    case "variants":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Layers size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Variants & Attribute Matrix</h2>
          </div>
          <p className="text-xs text-gray-600">
            3 Active variants configured (30ml, 50ml, 15ml). All variants mapped to active warehouse SKUs.
          </p>
        </div>
      );

    case "media":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <ImageIcon size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Media Assets & Gallery</h2>
          </div>
          <p className="text-xs text-gray-600">
            12 Assets uploaded (1:1 Square product shot, lifestyle packaging, video demo). Media readiness score: 80%.
          </p>
        </div>
      );

    case "compliance":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <ShieldCheck size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Compliance Review & Approval Workflow</h2>
          </div>
          <p className="text-xs text-gray-600">
            14 of 18 approval steps completed (78%). Current stage: Compliance Review by Elena Vance.
          </p>
        </div>
      );

    case "inventory":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Boxes size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Inventory & Batch Tracking Workspace</h2>
          </div>
          <p className="text-xs text-gray-600">
            2,450 units available across 4 active batches in Colombo Central FC.
          </p>
        </div>
      );

    case "pricing":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <DollarSign size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Pricing, Tax & Margin Matrix</h2>
          </div>
          <p className="text-xs text-gray-600">
            MRP: LKR 12,450.00 | Cost: LKR 8,250.00 | Margin: 33.7% | Tax: 15% VAT.
          </p>
        </div>
      );

    case "publication":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Globe size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Publication & Channel Readiness Dashboard</h2>
          </div>
          <p className="text-xs text-gray-600">
            2 of 6 channels eligible. Corporate Sales published; Online Marketplace blocked due to pending safety evidence.
          </p>
        </div>
      );

    case "audit":
      return (
        <div className="bg-white rounded border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Clock size={18} className="text-[#741d35]" />
            <h2 className="text-sm font-bold text-gray-900">Audit History & Event Trail</h2>
          </div>
          <p className="text-xs text-gray-600">
            Complete audit trail logged for PROD-2024-00421 across version 1 to version 2.
          </p>
        </div>
      );

    default:
      return null;
  }
};
