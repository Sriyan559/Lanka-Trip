'use client';

import React from 'react';
import { Plus, CheckSquare, Download, Play, MoreHorizontal } from 'lucide-react';

interface LocalizationHeaderProps {
  onAddLocale: () => void;
  onAddLanguage: () => void;
  onAddCurrency: () => void;
  onReviewReadiness: () => void;
  onExportRegistry: () => void;
}

export function LocalizationHeader({
  onAddLocale,
  onAddLanguage,
  onAddCurrency,
  onReviewReadiness,
  onExportRegistry,
}: LocalizationHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
      <div className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Localization, Languages, Currency & Regional Settings
        </h1>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-3xl leading-normal">
          Govern locales, languages, localization formats, timezones, and translation readiness across regions and channels with visibility into coverage, freshness, and fallback readiness.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
        <button
          type="button"
          onClick={onAddLocale}
          className="px-3 py-1.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Locale</span>
        </button>

        <button
          type="button"
          onClick={onAddLanguage}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-gray-500" />
          <span>Add Language</span>
        </button>

        <button
          type="button"
          onClick={onAddCurrency}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-gray-500" />
          <span>Add Currency</span>
        </button>

        <button
          type="button"
          onClick={onReviewReadiness}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <CheckSquare className="w-3.5 h-3.5 text-rose-600" />
          <span>Review Regional Readiness</span>
        </button>

        <button
          type="button"
          onClick={onExportRegistry}
          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[11px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Localization Registry</span>
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
export default LocalizationHeader;
