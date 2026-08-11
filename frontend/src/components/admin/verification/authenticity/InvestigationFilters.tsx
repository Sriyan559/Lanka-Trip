import React, { useState } from 'react';
import { FilterToolbar } from '@/components/admin/shared/FilterToolbar';

const FILTER_DEFINITIONS = [
  {
    id: 'investigation_type',
    label: 'Investigation Type',
    options: [
      { label: 'Counterfeit', value: 'counterfeit' },
      { label: 'Unauthorized Brand Use', value: 'unauthorized_brand' },
      { label: 'Packaging Conflict', value: 'packaging' },
      { label: 'Identifier Conflict', value: 'identifier' },
      { label: 'Duplicate Listing', value: 'duplicate' },
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
    id: 'detection_source',
    label: 'Detection Source',
    options: [
      { label: 'Consumer Reports', value: 'consumer' },
      { label: 'Brand Reports', value: 'brand' },
      { label: 'Marketplace Monitoring', value: 'marketplace' },
      { label: 'Image Scanner', value: 'image_scanner' },
      { label: 'GTIN Monitor', value: 'gtin_monitor' },
    ],
  },
  {
    id: 'risk_level',
    label: 'Risk Level',
    options: [
      { label: 'Critical', value: 'critical' },
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    options: [
      { label: 'New', value: 'new' },
      { label: 'Under Investigation', value: 'under_investigation' },
      { label: 'Awaiting Evidence', value: 'awaiting_evidence' },
      { label: 'Restricted', value: 'restricted' },
      { label: 'Resolved', value: 'resolved' },
    ],
  },
  {
    id: 'owner',
    label: 'Owner',
    options: [],
  },
  {
    id: 'region',
    label: 'Region',
    options: [{ label: 'Sri Lanka', value: 'lk' }],
  },
  {
    id: 'business_unit',
    label: 'Business Unit',
    options: [{ label: 'All Business Units', value: 'all' }],
  },
  {
    id: 'updated_date',
    label: 'Updated Date',
    options: [
      { label: 'Last 7 Days', value: '7d' },
      { label: 'Last 30 Days', value: '30d' },
      { label: 'Last 90 Days', value: '90d' },
    ],
  },
];

const QUICK_CHIPS = [
  { id: 'assigned_to_me',     label: 'Assigned to Me' },
  { id: 'critical_risk',      label: 'Critical Risk' },
  { id: 'packaging_conflict', label: 'Packaging Conflict' },
  { id: 'identifier_conflict',label: 'Identifier Conflict' },
  { id: 'evidence_pending',   label: 'Evidence Pending' },
  { id: 'restricted',         label: 'Restricted' },
  { id: 'duplicate_listing',  label: 'Duplicate Listing' },
];

interface InvestigationFiltersProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onClearAll?: () => void;
  onSaveView?: () => void;
  activeChips?: string[];
  onToggleChip?: (id: string) => void;
  chipCounts?: Record<string, number>;
}

export function InvestigationFilters({
  searchValue = '',
  onSearchChange,
  onClearAll,
  onSaveView,
  activeChips = [],
  onToggleChip,
  chipCounts = {},
}: InvestigationFiltersProps) {
  const chips = QUICK_CHIPS.map((chip) => ({
    ...chip,
    count: chipCounts[chip.id],
    active: activeChips.includes(chip.id),
  }));

  return (
    <FilterToolbar
      searchPlaceholder="Search by case, product, supplier, brand, GTIN, identifier..."
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      filters={FILTER_DEFINITIONS}
      onClearAll={onClearAll}
      onSaveView={onSaveView}
      quickChips={chips}
      onToggleChip={onToggleChip}
    />
  );
}
