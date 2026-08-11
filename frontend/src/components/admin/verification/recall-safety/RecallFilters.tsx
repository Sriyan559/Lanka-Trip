import React from 'react';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';

const FILTER_DEFS = [
  {
    id: 'incident_type',
    label: 'Incident Type',
    options: [
      { label: 'Adverse Reaction', value: 'adverse_reaction' },
      { label: 'Contamination',    value: 'contamination' },
      { label: 'Packaging Failure',value: 'packaging_failure' },
      { label: 'Labelling Error',  value: 'labelling_error' },
      { label: 'Foreign Matter',   value: 'foreign_matter' },
    ],
  },
  {
    id: 'recall_class',
    label: 'Recall Class',
    options: [
      { label: 'Class I',              value: 'class_i' },
      { label: 'Class II',             value: 'class_ii' },
      { label: 'Class III',            value: 'class_iii' },
      { label: 'Safety Advisory',      value: 'safety_advisory' },
      { label: 'Market Withdrawal',    value: 'market_withdrawal' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    options: [
      { label: 'New',             value: 'new' },
      { label: 'Under Review',    value: 'under_review' },
      { label: 'Quarantine',      value: 'quarantine' },
      { label: 'Investigating',   value: 'investigating' },
      { label: 'Resolved',        value: 'resolved' },
    ],
  },
  {
    id: 'priority',
    label: 'Priority',
    options: [
      { label: 'Critical', value: 'critical' },
      { label: 'High',     value: 'high' },
      { label: 'Medium',   value: 'medium' },
      { label: 'Low',      value: 'low' },
    ],
  },
  {
    id: 'supplier',
    label: 'Supplier',
    options: [],
  },
  {
    id: 'brand',
    label: 'Brand',
    options: [],
  },
  {
    id: 'date_range',
    label: 'Date Range',
    options: [
      { label: 'Last 7 Days',  value: '7d' },
      { label: 'Last 30 Days', value: '30d' },
      { label: 'Last 90 Days', value: '90d' },
    ],
  },
];

const QUICK_CHIPS = [
  { id: 'assigned_to_me',   label: 'Assigned to Me' },
  { id: 'critical',         label: 'Critical' },
  { id: 'quarantined',      label: 'Quarantined' },
  { id: 'customer_pending', label: 'Customer Pending' },
  { id: 'batch_level',      label: 'Batch-Level' },
  { id: 'recall_class_i',   label: 'Recall Class I' },
];

interface RecallFiltersProps {
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  onClearAll?: () => void;
  onSaveView?: () => void;
  activeChips?: string[];
  onToggleChip?: (id: string) => void;
  chipCounts?: Record<string, number>;
}

export function RecallFilters({
  searchValue = '',
  onSearchChange,
  onClearAll,
  onSaveView,
  activeChips = [],
  onToggleChip,
  chipCounts = {},
}: RecallFiltersProps) {
  const chips = QUICK_CHIPS.map((c) => ({
    ...c,
    count: chipCounts[c.id],
    active: activeChips.includes(c.id),
  }));

  return (
    <FilterToolbar
      searchPlaceholder="Search case / incident ID, product, supplier, brand..."
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      filters={FILTER_DEFS}
      onClearAll={onClearAll}
      onSaveView={onSaveView}
      quickChips={chips}
      onToggleChip={onToggleChip}
    />
  );
}
