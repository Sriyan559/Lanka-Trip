"use client";

import React from "react";
import {
  FileEdit,
  Send,
  Eye,
  Award,
  ShieldCheck,
  HelpCircle,
  CheckSquare,
  CheckCircle,
  XCircle,
  Globe,
  ChevronRight,
} from "lucide-react";
import { ApprovalStageItem } from "@/types/catalogue";

const STAGE_ICON_MAP: Record<string, React.ElementType> = {
  FileEdit,
  Send,
  Eye,
  Award,
  ShieldCheck,
  HelpCircle,
  CheckSquare,
  CheckCircle,
  XCircle,
  Globe,
};

interface ApprovalWorkflowProps {
  selectedStage: string | null;
  onSelectStage: (stageId: string | null) => void;
  stages: ApprovalStageItem[];
}

export const ApprovalWorkflow: React.FC<ApprovalWorkflowProps> = ({
  selectedStage,
  onSelectStage,
  stages,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Product Approval Operations
        </h2>
        {selectedStage && (
          <button
            onClick={() => onSelectStage(null)}
            className="text-[11px] font-semibold text-[#741d35] hover:underline"
          >
            Clear workflow filter
          </button>
        )}
      </div>

      {/* Horizontal Pipeline */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
        {stages.map((stage, idx) => {
          const IconComp = STAGE_ICON_MAP[stage.iconName] || FileEdit;
          const isSelected = selectedStage === stage.id;
          const isApproved = stage.id === "approved" || stage.id === "published";
          const isRejected = stage.id === "rejected";

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => onSelectStage(isSelected ? null : stage.id)}
                className={`flex flex-col items-center p-2 rounded transition-all shrink-0 min-w-[70px] ${
                  isSelected
                    ? "bg-[#741d35] text-white shadow-xs"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : isApproved
                      ? "bg-emerald-100 text-emerald-600"
                      : isRejected
                      ? "bg-rose-100 text-rose-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <IconComp size={14} />
                </div>
                <span className="text-[10px] font-semibold line-clamp-1 text-center">
                  {stage.label}
                </span>
                <span
                  className={`text-[12px] font-extrabold mt-0.5 ${
                    isSelected ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stage.count}
                </span>
              </button>

              {idx < stages.length - 1 && (
                <ChevronRight size={14} className="text-gray-300 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
