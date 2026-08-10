"use client";

import React from "react";
import { Bookmark, RefreshCw, Search, SlidersHorizontal, X } from "lucide-react";
import type { CatalogueQualityDashboard, QualityFilterState } from "@/types/catalogueQuality";

interface Props {
  filters: QualityFilterState;
  options: CatalogueQualityDashboard["options"];
  onChange: (value: Partial<QualityFilterState>) => void;
  onToggleQuickChip: (chip: string) => void;
  onClearAll: () => void;
  onOpenSaveView: () => void;
  onOpenMoreFilters: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function QualityFilters({ filters, options, onChange, onToggleQuickChip, onClearAll, onOpenSaveView, onOpenMoreFilters, onRefresh, isRefreshing }: Props) {
  const chips = ["Assigned to Me", "Critical", "Duplicate Conflict", "Publication Blocked", "SLA Breach", "Compliance Risk"];
  const select = "h-8 rounded border border-line bg-slate-50 px-2 text-[11px] font-semibold";

  return <div className="mb-4 space-y-3 rounded-lg border border-line bg-white p-3.5 shadow-sm">
    <div className="flex flex-wrap gap-2">
      <div className="relative min-w-[240px] flex-1"><Search size={14} className="absolute left-3 top-2.5 text-muted"/><input className="h-8 w-full rounded border pl-9 text-[11px]" placeholder="Search product, SKU, issue or case ID..." value={filters.searchQuery} onChange={event => onChange({ searchQuery: event.target.value })}/></div>
      <select className={select} value={filters.issueType} onChange={event => onChange({ issueType: event.target.value })}><option value="All">Issue Type: All</option>{options.issueTypes.map(value => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select>
      <select className={select} value={filters.severity} onChange={event => onChange({ severity: event.target.value })}><option value="All">Severity: All</option>{options.severities.map(value => <option key={value} value={value}>{value}</option>)}</select>
      <select className={select} value={filters.status} onChange={event => onChange({ status: event.target.value })}><option value="All">Status: All</option><option value="open">Open (all active)</option>{options.statuses.map(value => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select>
      <select className={select} value={filters.category} onChange={event => onChange({ category: event.target.value })}><option value="All">Category: All</option>{options.categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
      <select disabled className={select}><option>Brand unavailable</option></select><select disabled className={select}><option>Channel unavailable</option></select>
      <select className={select} value={filters.owner} onChange={event => onChange({ owner: event.target.value })}><option value="All">Owner: All</option><option value="Unassigned">Unassigned</option>{options.users.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
      <button onClick={onOpenMoreFilters} className="flex h-8 items-center gap-1 rounded border px-2 text-[11px] font-bold"><SlidersHorizontal size={12}/>More Filters</button>
      <button onClick={onClearAll} className="h-8 px-2 text-[11px] font-bold text-[#671021]">Clear All</button>
      <button onClick={onOpenSaveView} className="flex h-8 items-center gap-1 rounded border px-2 text-[11px] font-bold"><Bookmark size={12}/>Save View</button>
      <button onClick={onRefresh} disabled={isRefreshing} className="flex h-8 items-center gap-1 rounded bg-[#671021] px-3 text-[11px] font-bold text-white"><RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""}/>Refresh</button>
    </div>
    <div className="flex flex-wrap gap-1.5 border-t pt-2 text-[10px]"><b className="text-muted">Quick Filters:</b>{chips.map(chip => <button key={chip} onClick={() => onToggleQuickChip(chip)} className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-bold ${filters.quickChips.includes(chip) ? "bg-[#671021] text-white" : "bg-slate-50"}`}>{chip}{filters.quickChips.includes(chip) && <X size={10}/>}</button>)}</div>
  </div>;
}
