import React from 'react';
import { ShieldCheck, AlertCircle, AlertOctagon, HelpCircle } from 'lucide-react';

interface QuickFiltersProps {
  selectedChips: string[];
  onToggleChip: (chipId: string) => void;
}

export function AdministrationQuickFilters({ selectedChips, onToggleChip }: QuickFiltersProps) {
  const chips = [
    { id: 'healthy', label: 'Healthy', color: 'border-green-300 text-green-700 bg-green-50' },
    { id: 'warning', label: 'Warning', color: 'border-orange-300 text-orange-700 bg-orange-50' },
    { id: 'critical', label: 'Critical', color: 'border-red-300 text-red-700 bg-red-50' },
    { id: 'pending', label: 'Pending Approval', color: 'border-blue-300 text-blue-700 bg-blue-50' },
    { id: 'privileged', label: 'Privileged Access', color: 'border-purple-300 text-purple-700 bg-purple-50' },
    { id: 'config', label: 'Configuration Issue', color: 'border-amber-300 text-amber-700 bg-amber-50' },
    { id: 'security', label: 'Security Warning', color: 'border-rose-300 text-rose-700 bg-rose-50' },
    { id: 'failed-job', label: 'Failed Job', color: 'border-red-400 text-red-800 bg-red-50' },
    { id: 'workflow', label: 'Workflow Exception', color: 'border-indigo-300 text-indigo-700 bg-indigo-50' },
    { id: 'provider', label: 'Provider Issue', color: 'border-sky-300 text-sky-700 bg-sky-50' },
    { id: 'governance', label: 'Governance Exception', color: 'border-teal-300 text-teal-700 bg-teal-50' },
    { id: 'overdue', label: 'Overdue Review', color: 'border-pink-300 text-pink-700 bg-pink-50' },
    { id: 'attention', label: 'Needs Attention', color: 'border-[#741d35] text-[#741d35] bg-red-50' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-[10px] font-bold text-gray-500 mr-1 uppercase tracking-wider">Quick Filters:</span>
      {chips.map((chip) => {
        const isSelected = selectedChips.includes(chip.id);
        return (
          <button
            key={chip.id}
            onClick={() => onToggleChip(chip.id)}
            className={`px-3 py-1 text-[10px] font-bold border rounded-full transition-all duration-150 outline-none ${
              isSelected
                ? `${chip.color} ring-1 ring-offset-1 ring-[#741d35]`
                : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
