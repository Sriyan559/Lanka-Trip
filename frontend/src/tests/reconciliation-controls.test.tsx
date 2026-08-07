import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReconciliationControlsPage from '@/app/admin/finance/reconciliation-controls/page';

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

describe('FN13 — Reconciliation, Exceptions & Financial Controls Page', () => {
  it('renders the page heading', () => {
    render(<ReconciliationControlsPage />);
    const headings = screen.getAllByRole('heading', { name: /Reconciliation, Exceptions.*Financial Controls/i });
    expect(headings[0].tagName).toBe('H1');
  });

  it('renders the breadcrumb navigation', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText('Reconciliation & Controls')[0]).toBeInTheDocument();
  });

  it('renders 9 primary KPI cards and secondary control strip', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText('Total Records Reconciled')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Reconciliation Coverage')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Control Breaches')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Financial Holds Active')[0]).toBeInTheDocument();
  });

  it('renders overview analytics section', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText(/Reconciliation Coverage.*Variance Trend/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Reconciliation Domain Distribution')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Reconciliation Status Summary')[0]).toBeInTheDocument();
  });

  it('renders health scorecard', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText('Financial Control Health Scorecard')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Reconciliation Coverage')[0]).toBeInTheDocument();
  });

  it('renders portfolio table', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText(/Reconciliation & Financial Controls Portfolio/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/5,632 records/)[0]).toBeInTheDocument();
  });

  it('renders selected reconciliation preview', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText(/Selected Reconciliation Preview/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Variance Investigation')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Manual Match Governance')[0]).toBeInTheDocument();
  });

  it('renders bottom operational grid cards', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText(/Matching Engine Performance/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Balance Certification/)[0]).toBeInTheDocument();
  });

  it('renders right sidebar with intelligence gauge and alerts', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText('Financial Control Intelligence')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Priority Financial Alerts/)[0]).toBeInTheDocument();
    expect(screen.getAllByText('Quick Queues')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Final Reconciliation Actions')[0]).toBeInTheDocument();
  });

  it('renders action buttons in the header toolbar', () => {
    render(<ReconciliationControlsPage />);
    expect(screen.getAllByText('Create Reconciliation Review')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Run Reconciliation')[0]).toBeInTheDocument();
  });
});
