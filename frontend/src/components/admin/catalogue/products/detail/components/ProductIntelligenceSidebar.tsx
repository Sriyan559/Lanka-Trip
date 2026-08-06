"use client";

import React from "react";
import {
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Edit3,
  Send,
  ExternalLink,
  Archive,
  Download,
  AlertOctagon,
  FileQuestion,
  PauseCircle,
} from "lucide-react";
import { MOCK_PRODUCT_DETAIL_RECORD } from "@/data/productDetail.mock";

interface ProductIntelligenceSidebarProps {
  onEdit: () => void;
  onSubmitApproval: () => void;
  onRequestInfo: () => void;
  onPreviewMarketplace: () => void;
  onSuspend: () => void;
  onArchive: () => void;
  onEscalate: () => void;
  onExport: () => void;
  onOpenIssueModal: (issueId: string) => void;
}

export const ProductIntelligenceSidebar: React.FC<ProductIntelligenceSidebarProps> = ({
  onEdit,
  onSubmitApproval,
  onRequestInfo,
  onPreviewMarketplace,
  onSuspend,
  onArchive,
  onEscalate,
  onExport,
  onOpenIssueModal,
}) => {
  const p = MOCK_PRODUCT_DETAIL_RECORD;

  return (
    <div className="flex flex-col gap-4">
      {/* A. Product Health */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-3">Product Health</h3>

        <div className="flex items-center justify-around py-2 border-b border-gray-100 mb-3">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-500"
                strokeDasharray="84, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black text-gray-900 leading-none">84</span>
              <span className="text-[9px] text-gray-400 font-semibold">/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-fit">
              <AlertTriangle size={12} />
              <span>Needs Attention</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-[11px] mb-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Identity</span>
            <span className="font-bold text-emerald-600">98%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Classification</span>
            <span className="font-bold text-emerald-600">94%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Brand Verification</span>
            <span className="font-bold text-emerald-600">96%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Compliance</span>
            <span className="font-bold text-amber-600">72%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Variants</span>
            <span className="font-bold text-emerald-600">100%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Media</span>
            <span className="font-bold text-amber-600">80%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Inventory</span>
            <span className="font-bold text-emerald-600">90%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Publication</span>
            <span className="font-bold text-rose-600">68%</span>
          </div>
        </div>

        <button className="w-full text-center text-[11px] font-semibold text-[#741d35] hover:underline flex items-center justify-center gap-0.5">
          <span>View health dashboard</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* B. Current Product State */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2.5">Current Product State</h3>
        <div className="space-y-1.5 text-[11.5px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="font-bold text-emerald-700">{p.productStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Approval Stage</span>
            <span className="font-bold text-amber-700">{p.approvalStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Publication Status</span>
            <span className="font-bold text-rose-600">{p.publicationStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Risk Level</span>
            <span className="font-bold text-amber-600">{p.riskLevel} Risk</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Record Version</span>
            <span className="font-bold text-gray-800">{p.recordVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Updated</span>
            <span className="text-gray-700 text-[10.5px]">{p.updatedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Owner</span>
            <span className="font-bold text-gray-800">{p.ownerName}</span>
          </div>
        </div>

        <button className="mt-3 w-full text-center text-[11px] font-semibold text-[#741d35] hover:underline flex items-center justify-center gap-0.5">
          <span>View product timeline</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* C. Priority Issues */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-900">Priority Issues</h3>
          <button className="text-[11px] font-semibold text-[#741d35] hover:underline">View all</button>
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="p-2 rounded bg-rose-50 border border-rose-100 flex items-start justify-between gap-1">
            <div>
              <span className="px-1.5 py-0.2 rounded bg-rose-200 text-rose-800 text-[9.5px] font-bold">High</span>
              <div className="font-semibold text-gray-900 mt-1">Missing safety evidence (15% Vit C)</div>
            </div>
            <button
              onClick={() => onOpenIssueModal("bi-1")}
              className="px-2 py-0.5 rounded bg-white border border-rose-300 text-rose-700 text-[10px] font-bold hover:bg-rose-100"
            >
              Review
            </button>
          </div>

          <div className="p-2 rounded bg-rose-50 border border-rose-100 flex items-start justify-between gap-1">
            <div>
              <span className="px-1.5 py-0.2 rounded bg-rose-200 text-rose-800 text-[9.5px] font-bold">High</span>
              <div className="font-semibold text-gray-900 mt-1">Unsupported anti-ageing claim</div>
            </div>
            <button
              onClick={() => onOpenIssueModal("bi-2")}
              className="px-2 py-0.5 rounded bg-white border border-rose-300 text-rose-700 text-[10px] font-bold hover:bg-rose-100"
            >
              Review
            </button>
          </div>

          <div className="p-2 rounded bg-amber-50 border border-amber-100 flex items-start justify-between gap-1">
            <div>
              <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-800 text-[9.5px] font-bold">Medium</span>
              <div className="font-semibold text-gray-900 mt-1">Back packaging image missing</div>
            </div>
            <button
              onClick={() => onOpenIssueModal("bi-3")}
              className="px-2 py-0.5 rounded bg-white border border-amber-300 text-amber-800 text-[10px] font-bold hover:bg-amber-100"
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* D. Approval & SLA */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Approval & SLA</h3>
        <div className="text-[11px] space-y-1.5 mb-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Compliance Review</span>
            <span className="font-bold text-gray-800">14 of 18 steps (78%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-[#741d35] h-full rounded-full" style={{ width: "78%" }} />
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-gray-500">SLA Remaining</span>
            <span className="font-bold text-[#741d35]">18h 45m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reviewer</span>
            <span className="font-semibold text-gray-800">{p.ownerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Final Decision</span>
            <span className="font-bold text-amber-600">Pending</span>
          </div>
        </div>

        <button
          onClick={onSubmitApproval}
          className="w-full py-1.5 rounded border border-[#741d35] text-[#741d35] font-bold text-[11px] hover:bg-[#f5ebed]/60"
        >
          Open Approval Detail
        </button>
      </div>

      {/* E. Publication Summary */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-900">Publication Summary</h3>
        </div>

        <div className="grid grid-cols-3 gap-1 text-center bg-gray-50 p-2 rounded mb-3 text-[10.5px]">
          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-semibold">Eligible</span>
            <span className="font-extrabold text-gray-800">2 / 6</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-semibold">Published</span>
            <span className="font-bold text-emerald-700">0</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px] uppercase font-semibold">Blocked</span>
            <span className="font-extrabold text-rose-600">4</span>
          </div>
        </div>

        <button className="w-full text-center text-[11px] font-semibold text-[#741d35] hover:underline flex items-center justify-center gap-0.5">
          <span>View publication dashboard</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* F. Inventory Risk */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Inventory Risk</h3>
        <div className="space-y-1.5 text-[11.5px] mb-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Available Stock</span>
            <span className="font-extrabold text-gray-900">2,450</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Active Batches</span>
            <span className="font-bold text-gray-800">4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Inventory Risk</span>
            <span className="font-bold text-emerald-600">Low</span>
          </div>
        </div>

        <button className="w-full text-center text-[11px] font-semibold text-[#741d35] hover:underline flex items-center justify-center gap-0.5">
          <span>View inventory detail</span>
          <ChevronRight size={12} />
        </button>
      </div>

      {/* G. Final Product Actions */}
      <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col gap-2">
        <h3 className="text-xs font-bold text-gray-900 mb-1">Final Product Actions</h3>

        <button
          onClick={onEdit}
          className="h-9 px-3.5 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] flex items-center justify-start gap-2 transition-colors"
        >
          <Edit3 size={14} />
          <span>Edit Product</span>
        </button>

        <button
          onClick={onSubmitApproval}
          className="h-9 px-3.5 rounded bg-[#741d35] text-white text-[12px] font-bold hover:bg-[#5c172a] flex items-center justify-start gap-2 transition-colors"
        >
          <Send size={14} />
          <span>Submit for Approval</span>
        </button>

        <button
          onClick={onRequestInfo}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-start gap-2 transition-colors"
        >
          <FileQuestion size={14} className="text-gray-500" />
          <span>Request Additional Info</span>
        </button>

        <button
          onClick={onPreviewMarketplace}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-start gap-2 transition-colors"
        >
          <ExternalLink size={14} className="text-gray-500" />
          <span>Preview Marketplace Listing</span>
        </button>

        <button
          onClick={onSuspend}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-start gap-2 transition-colors"
        >
          <PauseCircle size={14} className="text-amber-600" />
          <span>Suspend Publication</span>
        </button>

        <button
          onClick={onArchive}
          className="h-9 px-3.5 rounded border border-rose-200 bg-rose-50 text-[12px] font-semibold text-rose-700 hover:bg-rose-100 flex items-center justify-start gap-2 transition-colors"
        >
          <Archive size={14} />
          <span>Archive Product</span>
        </button>

        <button
          onClick={onEscalate}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-start gap-2 transition-colors"
        >
          <AlertOctagon size={14} className="text-amber-600" />
          <span>Escalate Product</span>
        </button>

        <button
          onClick={onExport}
          className="h-9 px-3.5 rounded border border-gray-300 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-start gap-2 transition-colors"
        >
          <Download size={14} className="text-gray-500" />
          <span>Export Product Record</span>
        </button>
      </div>
    </div>
  );
};
