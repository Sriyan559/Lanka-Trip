"use client";

import React from "react";
import { X, GitMerge } from "lucide-react";
import { DuplicateAttributePair } from "@/types/attributeManagement";

interface DuplicateAttributeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pair: DuplicateAttributePair | null;
  onMerge: (pair: DuplicateAttributePair) => void;
  onIgnore: (pair: DuplicateAttributePair) => void;
}

export const DuplicateAttributeComparisonModal: React.FC<DuplicateAttributeComparisonModalProps> = ({
  isOpen,
  onClose,
  pair,
  onMerge,
  onIgnore,
}) => {
  if (!isOpen || !pair) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <GitMerge size={16} className="text-[#741d35]" />
            <h3 className="text-sm font-bold text-gray-900">
              Duplicate Attribute Comparison ({pair.similarityPercent}% Similarity)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-5 flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            {/* Candidate A */}
            <div className="p-4 rounded border-2 border-emerald-500 bg-emerald-50/20 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-gray-900">{pair.attributeName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Primary Candidate
                </span>
              </div>
              <div className="text-[11px] text-gray-600 space-y-1 mt-2">
                <div><span className="font-semibold text-gray-500">Database ID:</span> {pair.attributeIds?.[0] || "Unavailable"}</div>
                <div><span className="font-semibold text-gray-500">Name:</span> {pair.attributeName}</div>
              </div>
            </div>

            {/* Candidate B */}
            <div className="p-4 rounded border border-gray-300 bg-gray-50 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-gray-900">{pair.attributeName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Duplicate Candidate
                </span>
              </div>
              <div className="text-[11px] text-gray-600 space-y-1 mt-2">
                <div><span className="font-semibold text-gray-500">Database ID:</span> {pair.attributeIds?.[1] || "Unavailable"}</div>
                <div><span className="font-semibold text-gray-500">Name:</span> {pair.attributeName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            disabled
            title="Unavailable because no duplicate-ignore persistence schema is installed"
            className="cursor-not-allowed rounded border border-gray-200 bg-gray-100 px-3.5 py-1.5 text-xs font-bold text-gray-400"
          >
            Ignore Match
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
            <button
              disabled={!pair.attributeIds || pair.attributeIds.length < 2}
              onClick={() => void onMerge(pair)}
              className="px-4 py-1.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a]"
            >
              Merge Attributes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
