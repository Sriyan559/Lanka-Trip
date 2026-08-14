'use client';

import React from 'react';
import { Plus, Eye, Share2, ShieldAlert, Download, MoreHorizontal, Search } from 'lucide-react';

interface BuChannelsHeaderProps {
  onCreateBusinessUnit: () => void;
  onCreateChannel: () => void;
  onReviewConflicts: () => void;
  onReviewReadiness: () => void;
  onExportRegistry: () => void;
}

export function BuChannelsHeader({
  onCreateBusinessUnit,
  onCreateChannel,
  onReviewConflicts,
  onReviewReadiness,
  onExportRegistry,
}: BuChannelsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      {/* Title & Description */}
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Business Units, Channels & Operating Scope
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-3xl leading-normal">
          Define and govern where business units and channels operate, including scope, regional availability, environment applicability, ownership, restrictions, and operational readiness.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onCreateBusinessUnit}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Business Unit</span>
        </button>

        <button
          type="button"
          onClick={onCreateChannel}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5 text-gray-500" />
          <span>Create Channel</span>
        </button>

        <button
          type="button"
          onClick={onReviewConflicts}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Review Scope Conflicts</span>
        </button>

        <button
          type="button"
          onClick={onReviewReadiness}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5 text-gray-500" />
          <span>Review Operating Readiness</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Operating Structure</span>
        </button>

        <button
          type="button"
          className="p-1.5 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 rounded shadow-2xs transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default BuChannelsHeader;
