'use client';

import React from 'react';
import { SelectedRuleDetails } from '@/lib/administration/communications/communications.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { Edit2, Eye, Route } from 'lucide-react';

interface SelectedRulePanelProps {
  rule: SelectedRuleDetails;
  onEditRule: () => void;
  onViewTemplate: () => void;
  onViewRouting: () => void;
}

export function SelectedRulePanel({ rule, onEditRule, onViewTemplate, onViewRouting }: SelectedRulePanelProps) {
  return (
    <SectionCard title={`Selected Rule — ${rule.eventKey}`}>
      <div className="flex flex-col justify-between h-full text-[10px]">
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Event Key</span>
            <span className="font-mono font-bold text-gray-900">{rule.eventKey}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Domain</span>
            <span className="font-semibold text-gray-800">{rule.domain}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Audience</span>
            <span className="font-semibold text-gray-800">{rule.audience}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Primary Channel</span>
            <span className="font-semibold text-gray-800">{rule.primaryChannel}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Secondary Channel</span>
            <span className="font-semibold text-gray-800">{rule.secondaryChannel || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Template</span>
            <span className="font-mono font-bold text-gray-900">{rule.templateRef}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Primary Provider</span>
            <span className="font-semibold text-gray-800">{rule.primaryProvider}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Fallback Provider</span>
            <span className="font-semibold text-gray-800">{rule.fallbackProvider || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Owner</span>
            <span className="font-semibold text-gray-800">{rule.owner}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Status</span>
            <StatusBadge status={rule.status} size="xs" />
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-150 flex items-center justify-between gap-1 text-[9px]">
          <button
            type="button"
            onClick={onEditRule}
            className="px-2 py-1 bg-[#741d35] hover:bg-[#5d172a] text-white font-bold rounded shadow-2xs transition-colors flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit Rule</span>
          </button>
          <button
            type="button"
            onClick={onViewTemplate}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors flex items-center gap-1"
          >
            <Eye className="w-3 h-3 text-gray-500" />
            <span>View Template</span>
          </button>
          <button
            type="button"
            onClick={onViewRouting}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors flex items-center gap-1"
          >
            <Route className="w-3 h-3 text-gray-500" />
            <span>View Routing</span>
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
export default SelectedRulePanel;
