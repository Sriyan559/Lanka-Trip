/**
 * FN07 — Supplier Payable Detail
 * Unit tests: verifies page renders core sections for a known payableId.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SupplierPayableDetailPage from '../app/admin/finance/supplier-payables/[id]/page';

/* ── Mock next/navigation ── */
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'PAY-2025-008426' }),
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

/* ── Mock recharts to avoid SVG measurement issues ── */
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ComposedChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => null,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => null,
  Cell: () => null,
}));

describe('FN07 — Supplier Payable Detail Page', () => {
  it('renders the page header and breadcrumb', () => {
    render(<SupplierPayableDetailPage />);
    expect(screen.getAllByText('Supplier Payable Detail')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Finance')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Supplier Payables')[0]).toBeInTheDocument();
  });

  it('renders the payable identity summary panels', () => {
    render(<SupplierPayableDetailPage />);
    expect(screen.getAllByText('Payable Identity')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Linked Records')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Amount Summary')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Status Snapshot')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Lifecycle Dates')[0]).toBeInTheDocument();
  });

  it('renders the financial KPI strip and lifecycle timeline', () => {
    render(<SupplierPayableDetailPage />);
    expect(screen.getAllByText('Gross Liability')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Net Payable')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Due Date')[0]).toBeInTheDocument();
    // Lifecycle timeline
    expect(screen.getByText('1. Payable Lifecycle (Workflow)')).toBeInTheDocument();
    expect(screen.getByText('Initiated')).toBeInTheDocument();
    expect(screen.getAllByText('Pending Approval')[0]).toBeInTheDocument();
  });

  it('renders the overview analytics grid sections', () => {
    render(<SupplierPayableDetailPage />);
    expect(screen.getByText('2. Payment & Amount Trend (Last 90 Days)')).toBeInTheDocument();
    expect(screen.getByText('3. Payable Type / Composition')).toBeInTheDocument();
    expect(screen.getAllByText('4. Payable Status Summary')[0]).toBeInTheDocument();
    expect(screen.getByText('5. Detailed Calculation Summary')).toBeInTheDocument();
    expect(screen.getByText('6. Matching Summary')).toBeInTheDocument();
    expect(screen.getByText('7. Approval Details')).toBeInTheDocument();
  });

  it('renders the lower operations grid', () => {
    render(<SupplierPayableDetailPage />);
    expect(screen.getByText('8. Payment Schedule')).toBeInTheDocument();
    expect(screen.getByText('9. Settlements & Payouts')).toBeInTheDocument();
    expect(screen.getByText('10. Reconciliation Summary')).toBeInTheDocument();
    expect(screen.getByText('11. Recent Payable Activity')).toBeInTheDocument();
    expect(screen.getByText('12. Audit Summary')).toBeInTheDocument();
    expect(screen.getByText('13. Quick Actions / Queues')).toBeInTheDocument();
  });

  it('renders the right intelligence rail', () => {
    render(<SupplierPayableDetailPage />);
    expect(screen.getByText('Supplier Payable Intelligence')).toBeInTheDocument();
    expect(screen.getAllByText('Priority Payable Alerts')[0]).toBeInTheDocument();
    expect(screen.getByText('Payable Quick Summary')).toBeInTheDocument();
    expect(screen.getByText('Find Payable Actions')).toBeInTheDocument();
  });
});
