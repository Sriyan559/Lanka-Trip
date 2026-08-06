"use client";

import React from "react";
import {
  FileX,
  Tag,
  Image,
  Copy,
  Barcode,
  FolderTree,
  Briefcase,
  AlertOctagon,
  ChevronRight,
} from "lucide-react";
import {
  QUALITY_ISSUES,
  PRODUCT_COMPLETENESS_SUMMARY,
  CATEGORY_COVERAGE_DATA,
  BRAND_COVERAGE_DATA,
} from "@/data/catalogue.mock";

const ISSUE_ICON_MAP: Record<string, React.ElementType> = {
  FileX,
  Tag,
  Image,
  Copy,
  Barcode,
  FolderTree,
  Briefcase,
  AlertOctagon,
};

interface CatalogueQualityReadinessProps {
  onIssueClick?: (issueTitle: string) => void;
}

export const CatalogueQualityReadiness: React.FC<CatalogueQualityReadinessProps> = ({
  onIssueClick,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Quality Issues Cards */}
      <div className="bg-white rounded border border-gray-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Catalogue Quality & Data Readiness</h2>
            <p className="text-[11.5px] text-gray-500">
              Identify data gaps, structural issues, media deficiencies and publication blockers.
            </p>
          </div>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
            <span>View all issues</span>
            <ChevronRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUALITY_ISSUES.map((issue) => {
            const IconComponent = ISSUE_ICON_MAP[issue.iconName] || FileX;

            return (
              <button
                key={issue.id}
                onClick={() => onIssueClick?.(issue.title)}
                className="text-left bg-gray-50/70 hover:bg-gray-100/80 rounded border border-gray-200 p-3 transition-colors group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <IconComponent size={16} className="text-[#741d35]" />
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase ${
                      issue.severity === "High"
                        ? "bg-rose-100 text-rose-700"
                        : issue.severity === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-gray-700 line-clamp-1 group-hover:text-[#741d35]">
                  {issue.title}
                </div>
                <div className="text-base font-extrabold text-gray-900 mt-1">
                  {issue.count}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Panels: Completeness Summary, Category Coverage, Brand Coverage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Completeness Summary */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Product Completeness Summary
            </h3>
            <div className="space-y-2.5">
              {PRODUCT_COMPLETENESS_SUMMARY.map((item) => (
                <div key={item.label} className="text-[11px]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-gray-600 font-medium">{item.label}</span>
                    <span className="font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Coverage */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Category Coverage
              </h3>
              <button className="text-[10.5px] font-semibold text-[#741d35] hover:underline">
                View all categories
              </button>
            </div>

            <div className="space-y-2 text-[11px] mb-4 pb-3 border-b border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Categories</span>
                <span className="font-bold text-gray-900">{CATEGORY_COVERAGE_DATA.totalCategories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Categories</span>
                <span className="font-bold text-emerald-600">{CATEGORY_COVERAGE_DATA.activeCategories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Empty Categories</span>
                <span className="font-bold text-amber-600">{CATEGORY_COVERAGE_DATA.emptyCategories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Products Missing Category</span>
                <span className="font-bold text-rose-600">{CATEGORY_COVERAGE_DATA.productsMissingCategory}</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-gray-700 mb-2">Top Category Gaps</div>
              <div className="space-y-1.5 text-[11px]">
                {CATEGORY_COVERAGE_DATA.topCategoryGaps.map((gap) => (
                  <div key={gap.name} className="flex items-center justify-between p-1.5 rounded bg-gray-50">
                    <span className="text-gray-700 font-medium truncate">{gap.name}</span>
                    <span className="font-bold text-rose-600 shrink-0">{gap.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand Coverage */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Brand Coverage
            </h3>

            <div className="space-y-2 text-[11px] mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Brands</span>
                <span className="font-bold text-gray-900">{BRAND_COVERAGE_DATA.totalBrands}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Verified Brands</span>
                <span className="font-bold text-emerald-600">{BRAND_COVERAGE_DATA.verifiedBrands}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pending Verification</span>
                <span className="font-bold text-amber-600">{BRAND_COVERAGE_DATA.pendingVerification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Unauthorized Brand Use</span>
                <span className="font-bold text-rose-600">{BRAND_COVERAGE_DATA.unauthorizedBrandUse}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Products Missing Brand</span>
                <span className="font-bold text-gray-700">{BRAND_COVERAGE_DATA.productsMissingBrand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Expiring Authorization</span>
                <span className="font-bold text-amber-600">{BRAND_COVERAGE_DATA.expiringAuthorization}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100 text-[11px]">
              <button className="text-left font-semibold text-[#741d35] hover:underline flex items-center gap-1">
                <span>View brand coverage report</span>
                <ChevronRight size={12} />
              </button>
              <button className="text-left font-semibold text-[#741d35] hover:underline flex items-center gap-1">
                <span>Manage brand authorizations</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
