'use client';

import React from 'react';
import { SelectedLocaleDetails } from '@/lib/administration/localization/localization.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { Edit2, Copy, Eye } from 'lucide-react';

interface SelectedLocalePanelProps {
  details: SelectedLocaleDetails;
  onEdit: () => void;
  onClone: () => void;
  onViewDetails: () => void;
}

export function SelectedLocalePanel({ details, onEdit, onClone, onViewDetails }: SelectedLocalePanelProps) {
  return (
    <SectionCard title="Selected Locale">
      <div className="flex flex-col justify-between h-full text-[10px]">
        <div className="grid grid-cols-2 gap-x-2 gap-y-2.5">
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Locale</span>
            <span className="font-bold text-gray-900">{details.locale}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Locale Code</span>
            <span className="font-mono font-bold text-gray-900">{details.localeCode}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Direction</span>
            <span className="font-bold text-gray-900">{details.direction}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Coverage</span>
            <span className="font-bold text-emerald-700">{details.coverage}%</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Primary Currency</span>
            <span className="font-bold text-gray-900">{details.primaryCurrency}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Timezone</span>
            <span className="font-bold text-gray-900">{details.timezone}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Date Format</span>
            <span className="font-bold text-gray-900">{details.dateFormat}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Number Format</span>
            <span className="font-bold text-gray-900">{details.numberFormat}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">FX Freshness</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
              <span className="font-bold text-emerald-700">{details.fxFreshness}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 py-1.5 px-2 bg-[#741d35] hover:bg-[#5d172a] text-white text-[10px] font-bold rounded shadow-2xs transition-colors text-center flex items-center justify-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit Locale</span>
          </button>
          
          <button
            type="button"
            onClick={onClone}
            className="py-1.5 px-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[10px] font-bold rounded shadow-2xs transition-colors flex items-center justify-center gap-1"
            title="Clone Locale"
          >
            <Copy className="w-3 h-3 text-gray-500" />
            <span>Clone</span>
          </button>

          <button
            type="button"
            onClick={onViewDetails}
            className="py-1.5 px-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[10px] font-bold rounded shadow-2xs transition-colors flex items-center justify-center gap-1"
            title="View Full Details"
          >
            <Eye className="w-3 h-3 text-gray-500" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
export default SelectedLocalePanel;
