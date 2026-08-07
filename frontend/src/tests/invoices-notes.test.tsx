import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import InvoicesNotesPage from '@/app/admin/finance/invoices-notes/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

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

describe('FN11 — Invoices, Credit Notes & Debit Notes Page', () => {
  it('renders the page heading', () => {
    render(<InvoicesNotesPage />);
    expect(
      screen.getByRole('heading', { name: /Invoices, Credit Notes.*Debit Notes/i })
    ).toBeInTheDocument();
  });

  it('renders KPI cards', () => {
    render(<InvoicesNotesPage />);
    expect(screen.getByText('Total Financial Documents')).toBeInTheDocument();
    expect(screen.getByText('Invoice Value This Period')).toBeInTheDocument();
    expect(screen.getByText('Document SLA Breaches')).toBeInTheDocument();
  });

  it('renders the overview section charts', () => {
    render(<InvoicesNotesPage />);
    expect(screen.getByText(/Invoice.*Note Value Trend/i)).toBeInTheDocument();
    expect(screen.getByText('Document Type Distribution')).toBeInTheDocument();
    expect(screen.getByText('Document Status Summary')).toBeInTheDocument();
    expect(screen.getByText('Document Operations Health Scorecard')).toBeInTheDocument();
  });

  it('renders the portfolio table', () => {
    render(<InvoicesNotesPage />);
    expect(screen.getByText('Financial Document Portfolio')).toBeInTheDocument();
    // Table headers
    expect(screen.getAllByText('Document Reference')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/18,420 records/)[0]).toBeInTheDocument();
  });

  it('renders the selected document preview area', () => {
    render(<InvoicesNotesPage />);
    expect(screen.getByText(/Selected Document Preview/i)).toBeInTheDocument();
    expect(screen.getByText('View Full Record')).toBeInTheDocument();
  });

  it('renders document operations bottom grid cards', () => {
    render(<InvoicesNotesPage />);
    expect(screen.getAllByText(/Document Lifecycle/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Tax Validation/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Recent Activity/)[0]).toBeInTheDocument();
  });

  it('renders the right intelligence sidebar with health score gauge', () => {
    render(<InvoicesNotesPage />);
    expect(screen.getByText('Invoice & Notes Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Quick Queues')).toBeInTheDocument();
    expect(screen.getByText('Final Document Actions')).toBeInTheDocument();
  });

  it('renders priority alerts', () => {
    render(<InvoicesNotesPage />);
    expect(screen.getByText(/Priority Document Alerts/)).toBeInTheDocument();
  });
});
