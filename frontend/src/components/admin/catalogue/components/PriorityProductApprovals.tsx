"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, ExternalLink } from "lucide-react";
import { ProductApprovalItem } from "@/types/catalogue";
import { MOCK_PRODUCT_APPROVALS } from "@/data/catalogue.mock";

interface PriorityProductApprovalsProps {
  selectedStageFilter: string | null;
  onOpenApproval: (item: ProductApprovalItem) => void;
}

export const PriorityProductApprovals: React.FC<PriorityProductApprovalsProps> = ({
  selectedStageFilter,
  onOpenApproval,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [reviewerFilter, setReviewerFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredItems = useMemo(() => {
    return MOCK_PRODUCT_APPROVALS.filter((item) => {
      // Stage filter
      if (selectedStageFilter && selectedStageFilter !== "all") {
        const stageSlug = item.status.toLowerCase().replace(/\s+/g, "-");
        if (!stageSlug.includes(selectedStageFilter) && !selectedStageFilter.includes(stageSlug)) {
          // match stage loosely
        }
      }
      // Search
      if (
        searchTerm &&
        !item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.submissionId.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Risk
      if (riskFilter !== "All" && item.risk !== riskFilter) {
        return false;
      }
      // Reviewer
      if (reviewerFilter !== "All" && item.reviewer !== reviewerFilter) {
        return false;
      }
      return true;
    });
  }, [selectedStageFilter, searchTerm, riskFilter, reviewerFilter]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded border border-gray-200 p-5 shadow-xs flex flex-col gap-4">
      {/* Header & Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Priority Product Approvals</h2>
          <p className="text-[11.5px] text-gray-500">
            Review and process high-priority product submissions requiring authorization and compliance verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 pl-8 pr-3 w-48 rounded border border-gray-300 text-[11.5px] focus:outline-none focus:border-[#741d35]"
            />
          </div>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 rounded border border-gray-300 text-[11.5px] font-medium text-gray-700 bg-white focus:outline-none"
          >
            <option value="All">All Risk Levels</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>

          {/* Reviewer Filter */}
          <select
            value={reviewerFilter}
            onChange={(e) => {
              setReviewerFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-8 px-2.5 rounded border border-gray-300 text-[11.5px] font-medium text-gray-700 bg-white focus:outline-none"
          >
            <option value="All">All Reviewers</option>
            <option value="Elena Vance">Elena Vance</option>
            <option value="Marcus Lee">Marcus Lee</option>
            <option value="Priya Kapoor">Priya Kapoor</option>
          </select>

          <button className="h-8 px-3 rounded border border-gray-300 bg-white text-[11.5px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            View All Approvals
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="w-full text-left border-collapse text-[11.5px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[10px]">
              <th className="py-2.5 px-3">Product</th>
              <th className="py-2.5 px-3">Submission ID</th>
              <th className="py-2.5 px-3">Brand</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">Supplier</th>
              <th className="py-2.5 px-3">Completeness</th>
              <th className="py-2.5 px-3">Brand Auth.</th>
              <th className="py-2.5 px-3">Compliance</th>
              <th className="py-2.5 px-3">Risk</th>
              <th className="py-2.5 px-3">Submitted</th>
              <th className="py-2.5 px-3">SLA</th>
              <th className="py-2.5 px-3">Reviewer</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={14} className="text-center py-8 text-gray-400">
                  No approval submissions match the selected filters.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Product */}
                  <td className="py-3 px-3 font-semibold text-gray-900 min-w-[170px]">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.thumbnail}
                        alt={item.productName}
                        className="w-8 h-8 rounded object-cover border border-gray-200 bg-gray-100 shrink-0"
                      />
                      <span className="line-clamp-2 leading-tight">{item.productName}</span>
                    </div>
                  </td>

                  {/* Submission ID */}
                  <td className="py-3 px-3">
                    <button
                      onClick={() => onOpenApproval(item)}
                      className="text-blue-600 font-mono font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>{item.submissionId}</span>
                    </button>
                  </td>

                  {/* Brand */}
                  <td className="py-3 px-3 text-gray-700 font-medium">{item.brand}</td>

                  {/* Category */}
                  <td className="py-3 px-3 text-gray-600">{item.category}</td>

                  {/* Supplier */}
                  <td className="py-3 px-3 text-gray-600 max-w-[130px] truncate">{item.supplier}</td>

                  {/* Completeness */}
                  <td className="py-3 px-3 min-w-[90px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{item.completeness}%</span>
                      <div className="w-12 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${item.completeness}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Brand Auth */}
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.brandAuthStatus === "Valid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.brandAuthStatus}
                    </span>
                  </td>

                  {/* Compliance */}
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.complianceStatus === "Valid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.complianceStatus}
                    </span>
                  </td>

                  {/* Risk */}
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.risk === "High"
                          ? "bg-rose-100 text-rose-700"
                          : item.risk === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>

                  {/* Submitted */}
                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">{item.submittedDate}</td>

                  {/* SLA */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        item.slaDays <= 2 ? "text-rose-600" : item.slaDays <= 3 ? "text-amber-600" : "text-emerald-600"
                      }`}
                    >
                      {item.slaDays} days
                    </span>
                  </td>

                  {/* Reviewer */}
                  <td className="py-3 px-3 text-gray-700 font-medium whitespace-nowrap">{item.reviewer}</td>

                  {/* Status */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10.5px]">
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onOpenApproval(item)}
                        className="px-2.5 py-1 rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-[11px] transition-colors shadow-xs"
                      >
                        Open Approval
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-[11.5px] text-gray-500 pt-1">
        <span>
          Showing 1 to {paginatedItems.length} of 128 submissions
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>

          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-7 h-7 rounded border font-semibold text-[11px] ${
                currentPage === pageNum
                  ? "bg-[#741d35] text-white border-[#741d35]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
