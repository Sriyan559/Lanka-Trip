import React from 'react';
import { Download, Eye, ChevronDown, ArrowRight, ShieldAlert } from 'lucide-react';

interface AuthenticityPageHeaderProps {
  onExport?: () => void;
  onReviewCritical?: () => void;
  onReviewNext?: () => void;
  loading?: boolean;
}

export function AuthenticityPageHeader({
  onExport,
  onReviewCritical,
  onReviewNext,
}: AuthenticityPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
      {/* Left: breadcrumb + title + description */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium mb-1">
          <ShieldAlert size={11} className="text-[#7a0023]" />
          <span>Verification &amp; Compliance</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-semibold">Authenticity Investigations</span>
        </div>
        <h1 className="text-[22px] font-bold text-gray-900 leading-tight mb-1">
          Authenticity &amp; Counterfeit Investigations
        </h1>
        <p className="text-[12px] text-gray-500 leading-relaxed max-w-3xl">
          Monitor, investigate, and resolve supply-chain authenticity risks including unauthorized sellers,
          counterfeit products, packaging conflicts, identifier conflicts, and brand infringements across
          the beauty marketplace.
        </p>
      </div>

      {/* Right: action buttons */}
      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1.5 text-[12px] bg-white border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-medium whitespace-nowrap"
        >
          <Download size={13} />
          Export Authenticity Report
        </button>

        <button
          type="button"
          onClick={onReviewCritical}
          className="flex items-center gap-1.5 text-[12px] bg-white border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-medium whitespace-nowrap"
        >
          <Eye size={13} />
          Review Critical Investigations
        </button>

        {/* Bulk Actions dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1.5 text-[12px] bg-white border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-50 shadow-sm font-medium whitespace-nowrap"
          >
            Bulk Actions
            <ChevronDown size={13} />
          </button>
        </div>

        <button
          type="button"
          onClick={onReviewNext}
          className="flex items-center gap-1.5 text-[12px] bg-[#7a0023] text-white px-3 py-1.5 rounded hover:bg-[#6a001f] shadow-sm font-bold whitespace-nowrap"
        >
          Review Next Investigation
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
