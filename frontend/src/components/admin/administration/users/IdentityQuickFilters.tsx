import React from 'react';

interface QuickFiltersProps {
  selectedChips: string[];
  onToggleChip: (chipId: string) => void;
}

export function IdentityQuickFilters({ selectedChips, onToggleChip }: QuickFiltersProps) {
  const chips = [
    { id: 'suspended', label: 'Suspended', count: 8, color: 'border-red-300 text-red-700 bg-red-50' },
    { id: 'dormant', label: 'Dormant', count: 11, color: 'border-gray-300 text-gray-700 bg-gray-50' },
    { id: 'temp_access', label: 'Temporary Access', count: 8, color: 'border-blue-300 text-blue-700 bg-blue-50' },
    { id: 'access_requests', label: 'Access Requests', count: 11, color: 'border-yellow-300 text-yellow-700 bg-yellow-50' },
    { id: 'high_risk', label: 'High Risk', count: 12, color: 'border-rose-300 text-rose-700 bg-rose-50' },
    { id: 'review_overdue', label: 'Review Overdue', count: 2, color: 'border-orange-300 text-orange-700 bg-orange-50' },
    { id: 'mfa_gaps', label: 'MFA-Gaps', count: 6, color: 'border-red-400 text-red-800 bg-red-50' },
    { id: 'identity_risks', label: 'Identity Risks', count: 20, color: 'border-amber-400 text-amber-800 bg-amber-50' },
    { id: 'attention', label: 'Needs Attention', count: 19, color: 'border-[#741d35] text-[#741d35] bg-red-50' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map((chip) => {
        const isSelected = selectedChips.includes(chip.id);
        return (
          <button
            key={chip.id}
            onClick={() => onToggleChip(chip.id)}
            className={`px-3 py-0.75 text-[10px] font-bold border rounded transition-all duration-150 outline-none flex items-center gap-1.5 ${
              isSelected
                ? `${chip.color} ring-1 ring-offset-1 ring-[#741d35]`
                : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
            }`}
          >
            <span>{chip.label}</span>
            <span className="bg-gray-100/80 px-1 py-0.1 rounded text-[9px] font-semibold text-gray-700">
              {chip.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
