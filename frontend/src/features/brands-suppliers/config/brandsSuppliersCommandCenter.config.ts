/**
 * Page-level configuration for the Brands & Suppliers Command Center
 * (/admin/brands-suppliers).
 *
 * This file owns ALL Command Center bottom-panel data. The shared
 * BrandsSuppliersBottomPanels component imports nothing from mocks —
 * it only renders whatever is passed through its `rows` prop.
 */
import React from 'react';
import type { BrandsSuppliersBottomPanelProps } from '@/features/brands-suppliers/types/brandsSuppliers.types';
import {
  prioritySuppliers,
  priorityAuthorizations,
  supplierMasterOverview,
  brandSupplierMatrix,
  catalogueCoverageStats,
  performanceSLA,
  riskComplianceStats,
  channelRegionEligibility,
  verificationSLA,
} from '@/mocks/admin/brandsSuppliersData';

// Helper badge renderer (pure function, no imports needed from component)
function slaStatusClass(sla: string): string {
  if (sla === 'Completed') return 'bg-green-50 text-green-700 border border-green-100';
  if (sla === 'Overdue') return 'bg-red-50 text-red-700 border border-red-100';
  return 'bg-orange-50 text-orange-700 border border-orange-100';
}
function conflictClass(conflict: string): string {
  if (conflict === 'Clear') return 'bg-green-50 text-green-700 border border-green-100';
  if (conflict === 'Overlap') return 'bg-red-50 text-red-700 border border-red-100';
  return 'bg-orange-50 text-orange-700 border border-orange-100';
}
function matrixStatusClass(status: string): string {
  if (status === 'Active') return 'bg-green-50 text-green-700 border border-green-100';
  if (status === 'Suspended') return 'bg-red-50 text-red-700 border border-red-100';
  return 'bg-orange-50 text-orange-700 border border-orange-100';
}
function perfStatusClass(status: string): string {
  if (status === 'Excellent') return 'bg-green-50 text-green-700 border border-green-100';
  if (status === 'Critical') return 'bg-red-50 text-red-700 border border-red-100';
  return 'bg-orange-50 text-orange-700 border border-orange-100';
}
function riskLevelClass(level: string): string {
  if (level === 'Low') return 'text-green-600 bg-green-50 border border-green-100';
  if (level === 'High') return 'text-red-600 bg-red-50 border border-red-100';
  return 'text-orange-600 bg-orange-50 border border-orange-100';
}
function eligibilityClass(val: string): string {
  if (val === 'Eligible') return 'text-green-700';
  if (val === 'Restricted') return 'text-red-700 font-semibold';
  if (val === 'Not Offered') return 'text-gray-400';
  return 'text-orange-700';
}

export function getCommandCenterBottomPanelConfig(): BrandsSuppliersBottomPanelProps {
  return {
    rows: [
      // ── Row 1: Priority Supplier Applications │ Priority Brand Authorization Cases ──
      [
        {
          id: 'priority-suppliers',
          title: 'Priority Supplier Applications',
          type: 'table',
          footerAction: { label: 'View verification queue', href: '/admin/brands-suppliers/verification' },
          columns: [
            { header: 'Supplier', accessor: 'nameCell' },
            { header: 'Type', accessor: 'type' },
            { header: 'Region', accessor: 'country' },
            { header: 'Progress', accessor: 'progressCell', align: 'center' },
            { header: 'SLA Status', accessor: 'slaCell', align: 'center' },
            { header: 'Assigned', accessor: 'assigned' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: prioritySuppliers.map((sup) => ({
            id: sup.id,
            type: sup.type,
            country: sup.country,
            assigned: sup.assigned,
            nameCell: { name: sup.name, id: sup.id },
            progressCell: { progress: sup.progress },
            slaCell: { sla: sup.sla, css: slaStatusClass(sup.sla) },
            actionCell: { href: '/admin/brands-suppliers/verification', label: 'Review' },
          })),
        },
        {
          id: 'priority-authorizations',
          title: 'Priority Brand Authorization Cases',
          type: 'table',
          footerAction: { label: 'View authorization queue', href: '/admin/brands-suppliers/brand-authorizations' },
          columns: [
            { header: 'Case ID', accessor: 'id' },
            { header: 'Brand', accessor: 'brand' },
            { header: 'Supplier', accessor: 'supplier' },
            { header: 'Type', accessor: 'type' },
            { header: 'Expiry', accessor: 'expiry' },
            { header: 'Conflict', accessor: 'conflictCell', align: 'center' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: priorityAuthorizations.map((auth) => ({
            id: auth.id,
            brand: auth.brand,
            supplier: auth.supplier,
            type: auth.type,
            expiry: auth.expiry,
            conflictCell: { label: auth.conflict, css: conflictClass(auth.conflict) },
            actionCell: { href: '/admin/brands-suppliers/brand-authorizations', label: 'Open Case' },
          })),
        },
      ],

      // ── Row 2: Supplier Master Overview │ Brand & Supplier Relationship Matrix ──
      [
        {
          id: 'supplier-master-overview',
          title: 'Supplier Master Overview',
          type: 'cards-grid',
          footerAction: { label: 'Generate Directory Report' },
          items: supplierMasterOverview.map((item, i) => ({
            id: `overview-${i}`,
            label: item.metric,
            value: item.value,
            percentage: undefined,
            status: 'neutral' as const,
          })),
        },
        {
          id: 'brand-supplier-matrix',
          title: 'Brand & Supplier Relationship Matrix',
          type: 'table',
          badgeLabel: '6 Brands Active',
          footerAction: { label: 'Manage', href: '/admin/brands-suppliers/brand-authorizations' },
          columns: [
            { header: 'Brand Name', accessor: 'brand' },
            { header: 'Active Suppliers', accessor: 'suppliers', align: 'center' },
            { header: 'Exclusive Partner', accessor: 'exclusive' },
            { header: 'Sales Channels', accessor: 'channels' },
            { header: 'Status', accessor: 'statusCell', align: 'center' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: brandSupplierMatrix.map((item, i) => ({
            id: `matrix-${i}`,
            brand: item.brand,
            suppliers: item.suppliers,
            exclusive: item.exclusive,
            channels: item.channels,
            statusCell: { label: item.status, css: matrixStatusClass(item.status) },
            actionCell: { href: '/admin/brands-suppliers/brand-authorizations', label: 'Manage' },
          })),
        },
      ],

      // ── Row 3: Catalogue Coverage │ Performance & SLA ──
      [
        {
          id: 'catalogue-coverage',
          title: 'Supplier Product & Catalogue Coverage',
          type: 'table',
          footerAction: { label: 'View detailed coverage', href: '/admin/brands-suppliers/catalogue-coverage' },
          columns: [
            { header: 'Category', accessor: 'category' },
            { header: 'Total Products', accessor: 'totalProducts', align: 'center' },
            { header: 'Ready Products', accessor: 'readyProducts', align: 'center' },
            { header: 'Ready %', accessor: 'readyPercentage', align: 'center' },
            { header: 'Gaps Detected', accessor: 'gapsCell', align: 'center' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: catalogueCoverageStats.map((item, i) => ({
            id: `coverage-${i}`,
            category: item.category,
            totalProducts: item.totalProducts,
            readyProducts: item.readyProducts,
            readyPercentage: item.readyPercentage,
            gapsCell: { gaps: item.gapsDetected, high: item.gapsDetected > 15 },
            actionCell: { href: '/admin/brands-suppliers/catalogue-coverage', label: 'Details' },
          })),
        },
        {
          id: 'performance-sla',
          title: 'Supplier Performance & SLA',
          type: 'table',
          footerAction: { label: 'View SLA dashboards', href: '/admin/brands-suppliers/performance' },
          columns: [
            { header: 'Supplier', accessor: 'supplier' },
            { header: 'Rating', accessor: 'rating', align: 'center' },
            { header: 'SLA Compliance', accessor: 'slaCompliance', align: 'center' },
            { header: 'Order Fulfilment', accessor: 'orderFulfilment', align: 'center' },
            { header: 'Performance Status', accessor: 'statusCell', align: 'center' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: performanceSLA.map((item, i) => ({
            id: `perf-${i}`,
            supplier: item.supplier,
            rating: item.rating,
            slaCompliance: item.slaCompliance,
            orderFulfilment: item.orderFulfilment,
            statusCell: { label: item.status, css: perfStatusClass(item.status) },
            actionCell: { href: '/admin/brands-suppliers/performance', label: 'View' },
          })),
        },
      ],

      // ── Row 4: Risk & Compliance │ Channel & Region Eligibility ──
      [
        {
          id: 'risk-compliance',
          title: 'Supplier Risk & Compliance',
          type: 'table',
          footerAction: { label: 'Risk Command Center', href: '/admin/brands-suppliers/risk-compliance' },
          columns: [
            { header: 'Compliance Domain', accessor: 'domain' },
            { header: 'Issues Detected', accessor: 'issueCount', align: 'center' },
            { header: 'Risk Level', accessor: 'riskCell', align: 'center' },
            { header: 'Assessment Status', accessor: 'status', align: 'center' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: riskComplianceStats.map((item, i) => ({
            id: `risk-${i}`,
            domain: item.domain,
            issueCount: item.issueCount,
            status: item.status,
            riskCell: { label: item.riskLevel, css: riskLevelClass(item.riskLevel) },
            actionCell: { href: '/admin/brands-suppliers/risk-compliance', label: 'Audit' },
          })),
        },
        {
          id: 'channel-region',
          title: 'Channel & Region Eligibility',
          type: 'table',
          badgeLabel: 'Rules applied globally',
          columns: [
            { header: 'Target Territory / Region', accessor: 'region' },
            { header: 'Marketplace', accessor: 'marketplaceCell', align: 'center' },
            { header: 'Mobile App', accessor: 'mobileCell', align: 'center' },
            { header: 'B2B Trade', accessor: 'b2bCell', align: 'center' },
            { header: 'Physical Retail', accessor: 'retailCell', align: 'center' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: channelRegionEligibility.map((item, i) => ({
            id: `channel-${i}`,
            region: item.region,
            marketplaceCell: { label: `✓ ${item.marketplace}`, css: eligibilityClass(item.marketplace) },
            mobileCell: { label: `✓ ${item.mobileApp}`, css: eligibilityClass(item.mobileApp) },
            b2bCell: { label: item.b2b, css: eligibilityClass(item.b2b) },
            retailCell: { label: item.retail ?? 'N/A', css: eligibilityClass(item.retail ?? 'N/A') },
            actionCell: { label: 'Configure', onClick: 'configure' },
          })),
        },
      ],

      // ── Row 5: SLA Tracker (full-width) ──
      [
        {
          id: 'sla-tracker',
          title: 'Active Verification & Authorization SLA Status',
          type: 'sla-tracker',
          items: verificationSLA.map((sla, i) => ({
            id: `sla-${i}`,
            label: sla.caseId,
            value: sla.elapsedHours,
            status: (sla.state.includes('Breached') ? 'danger'
              : sla.state.includes('Warning') ? 'warning'
              : 'success') as 'danger' | 'warning' | 'success',
            percentage: undefined,
          })),
          // Extra sla-specific data stored in rows
          rows: verificationSLA.map((sla, i) => ({
            id: `sla-row-${i}`,
            caseId: sla.caseId,
            type: sla.type,
            targetHours: sla.targetHours,
            elapsedHours: sla.elapsedHours,
            state: sla.state,
            stateClass: sla.state.includes('Breached') ? 'text-red-600'
              : sla.state.includes('Warning') ? 'text-orange-600'
              : 'text-green-600',
          })),
        },
      ],
    ],
  };
}

export function getSupplierDirectoryBottomPanelConfig(): BrandsSuppliersBottomPanelProps {
  // The Supplier Directory page shows a focused subset of panels —
  // only the ones relevant to the supplier-level context.
  return {
    rows: [
      [
        {
          id: 'priority-suppliers',
          title: 'Priority Supplier Applications',
          type: 'table',
          footerAction: { label: 'View verification queue', href: '/admin/brands-suppliers/verification' },
          columns: [
            { header: 'Supplier', accessor: 'nameCell' },
            { header: 'Type', accessor: 'type' },
            { header: 'Region', accessor: 'country' },
            { header: 'Progress', accessor: 'progressCell', align: 'center' },
            { header: 'SLA Status', accessor: 'slaCell', align: 'center' },
            { header: 'Assigned', accessor: 'assigned' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: prioritySuppliers.map((sup) => ({
            id: sup.id,
            type: sup.type,
            country: sup.country,
            assigned: sup.assigned,
            nameCell: { name: sup.name, id: sup.id },
            progressCell: { progress: sup.progress },
            slaCell: { sla: sup.sla, css: slaStatusClass(sup.sla) },
            actionCell: { href: '/admin/brands-suppliers/verification', label: 'Review' },
          })),
        },
        {
          id: 'performance-sla',
          title: 'Supplier Performance & SLA',
          type: 'table',
          footerAction: { label: 'View SLA dashboards', href: '/admin/brands-suppliers/performance' },
          columns: [
            { header: 'Supplier', accessor: 'supplier' },
            { header: 'Rating', accessor: 'rating', align: 'center' },
            { header: 'SLA Compliance', accessor: 'slaCompliance', align: 'center' },
            { header: 'Order Fulfilment', accessor: 'orderFulfilment', align: 'center' },
            { header: 'Performance Status', accessor: 'statusCell', align: 'center' },
            { header: 'Action', accessor: 'actionCell', align: 'center' },
          ],
          rows: performanceSLA.map((item, i) => ({
            id: `perf-${i}`,
            supplier: item.supplier,
            rating: item.rating,
            slaCompliance: item.slaCompliance,
            orderFulfilment: item.orderFulfilment,
            statusCell: { label: item.status, css: perfStatusClass(item.status) },
            actionCell: { href: '/admin/brands-suppliers/performance', label: 'View' },
          })),
        },
      ],
    ],
  };
}
