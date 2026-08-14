'use client';

import React from 'react';
import { SelectedTemplateDetails } from '@/lib/administration/communications/communications.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { Eye, History } from 'lucide-react';

interface SelectedTemplatePanelProps {
  template: SelectedTemplateDetails;
  onViewVariants: () => void;
  onViewHistory: () => void;
}

export function SelectedTemplatePanel({ template, onViewVariants, onViewHistory }: SelectedTemplatePanelProps) {
  return (
    <SectionCard title={`Selected Template — Payment Failed`}>
      <div className="flex flex-col justify-between h-full text-[10px]">
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Template Ref</span>
            <span className="font-mono font-bold text-gray-900">{template.ref}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Channel</span>
            <span className="font-semibold text-gray-800">{template.channel}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Domain</span>
            <span className="font-semibold text-gray-800">{template.domain}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Source Locale</span>
            <span className="font-mono font-bold text-gray-800">{template.sourceLocale}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Default Variables</span>
            <span className="font-bold text-gray-900">{template.defaultVariables}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Owner</span>
            <span className="font-semibold text-gray-800">{template.owner}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Status</span>
            <StatusBadge status={template.status} size="xs" />
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-150 flex items-center justify-between gap-1 text-[9px]">
          <button
            type="button"
            onClick={onViewVariants}
            className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors flex items-center gap-1"
          >
            <Eye className="w-3 h-3 text-gray-500" />
            <span>View Variants</span>
          </button>
          <button
            type="button"
            onClick={onViewHistory}
            className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors flex items-center gap-1"
          >
            <History className="w-3 h-3 text-gray-500" />
            <span>View History</span>
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
export default SelectedTemplatePanel;
