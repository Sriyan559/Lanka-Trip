import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SupplierPayablesPage from '@/app/admin/finance/supplier-payables/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/admin/finance/supplier-payables',
}));

describe('FN06 — Supplier Payables Page', () => {
  it('renders the header title and key section headings', () => {
    render(<SupplierPayablesPage />);
    expect(screen.getAllByText('Supplier Payables')[0]).toBeInTheDocument();
    expect(screen.getByText('Payable, Payment & Overdue Trend (Last 30 Days)')).toBeInTheDocument();
    expect(screen.getByText('Payable Type Distribution')).toBeInTheDocument();
    expect(screen.getAllByText('Payable Status Summary')[0]).toBeInTheDocument();
  });

  it('renders KPI cards and portfolio table', () => {
    render(<SupplierPayablesPage />);
    expect(screen.getByText('Total Supplier Payables')).toBeInTheDocument();
    expect(screen.getByText('Payables Due This Week')).toBeInTheDocument();
    expect(screen.getByText('Supplier Payables Portfolio')).toBeInTheDocument();
  });

  it('renders the right sidebar health scorecard and quick queues', () => {
    render(<SupplierPayablesPage />);
    expect(screen.getByText('Supplier Payables Health')).toBeInTheDocument();
    expect(screen.getByText('Priority Payable Alerts (8)')).toBeInTheDocument();
    expect(screen.getByText('Final Payable Actions')).toBeInTheDocument();
  });
});
