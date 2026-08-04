"use client";

import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import styles from "../inventory.module.css";

interface InventoryFiltersBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;

  selectedBrand: string;
  onBrandChange: (value: string) => void;

  selectedSupplier: string;
  onSupplierChange: (value: string) => void;

  selectedCategory: string;
  onCategoryChange: (value: string) => void;

  selectedVariant: string;
  onVariantChange: (value: string) => void;

  selectedLocation: string;
  onLocationChange: (value: string) => void;

  activeQuickFilter: string | null;
  onQuickFilterToggle: (chip: string) => void;

  onClearAll: () => void;
  onOpenMoreFilters: () => void;
}

const QUICK_FILTERS = [
  "Near Expiry",
  "Expired",
  "Low Stock",
  "Out of Stock",
  "Quarantined",
  "Recalled",
  "Negative Stock",
  "Missing Batch No.",
  "Missing Expiry Date",
];

export function InventoryFiltersBar({
  searchTerm,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  selectedSupplier,
  onSupplierChange,
  selectedCategory,
  onCategoryChange,
  selectedVariant,
  onVariantChange,
  selectedLocation,
  onLocationChange,
  activeQuickFilter,
  onQuickFilterToggle,
  onClearAll,
  onOpenMoreFilters,
}: InventoryFiltersBarProps) {
  return (
    <div className={styles.filtersContainerCard}>
      {/* Top Filter Controls */}
      <div className={styles.filterControlsRow}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by SKU, Name, Batch No. or Variant..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className={styles.dropdownSelect}
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
        >
          <option value="ALL">All Brands</option>
          <option value="Estée Lauder">Estée Lauder</option>
          <option value="Innisfree">Innisfree</option>
          <option value="Chanel Beauty">Chanel Beauty</option>
          <option value="Botanica Pure">Botanica Pure</option>
        </select>

        <select
          className={styles.dropdownSelect}
          value={selectedSupplier}
          onChange={(e) => onSupplierChange(e.target.value)}
        >
          <option value="ALL">All Suppliers</option>
          <option value="Luxe Distribution Pvt Ltd">Luxe Distribution Pvt Ltd</option>
          <option value="Glow Global Exports">Glow Global Exports</option>
          <option value="Vortex Logistics Hub">Vortex Logistics Hub</option>
          <option value="Pure Organic Co.">Pure Organic Co.</option>
        </select>

        <select
          className={styles.dropdownSelect}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="Skincare">Skincare</option>
          <option value="Makeup">Makeup</option>
          <option value="Haircare">Haircare</option>
        </select>

        <select
          className={styles.dropdownSelect}
          value={selectedVariant}
          onChange={(e) => onVariantChange(e.target.value)}
        >
          <option value="ALL">All Variants</option>
          <option value="30 ml">30 ml</option>
          <option value="50 ml">50 ml</option>
          <option value="100 ml">100 ml</option>
          <option value="Ruby Red">Ruby Red</option>
        </select>

        <select
          className={styles.dropdownSelect}
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <option value="ALL">All Locations</option>
          <option value="Colombo Main Hub">Colombo Main Hub</option>
          <option value="Kandy Regional Hub">Kandy Regional Hub</option>
          <option value="Galle Supplier Hub">Galle Supplier Hub</option>
        </select>

        <button
          type="button"
          className={styles.moreFiltersBtn}
          onClick={onOpenMoreFilters}
        >
          <SlidersHorizontal size={14} /> More Filters
        </button>

        <button
          type="button"
          className={styles.clearAllBtn}
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>

      {/* Quick Filters Row */}
      <div className={styles.quickFiltersRow}>
        <span className={styles.quickFilterLabel}>Quick Filters:</span>
        <div className={styles.quickFilterChipsContainer}>
          {QUICK_FILTERS.map((chip) => {
            const isActive = activeQuickFilter === chip;
            return (
              <button
                key={chip}
                type="button"
                className={`${styles.quickFilterChip} ${
                  isActive ? styles.quickFilterChipActive : ""
                }`}
                onClick={() => onQuickFilterToggle(chip)}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
