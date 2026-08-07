import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SettlementDetailPage from '@/app/admin/finance/settlements-payouts/[settlementId]/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  useParams: () => ({ settlementId: 'SETTL-2025-005621' }),
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

describe('FN10 — Settlement / Payout Detail Page', () => {
  it('renders the page heading and settlement reference', () => {
    render(<SettlementDetailPage />);
    expect(screen.getAllByText(/Settlement/)[0]).toBeInTheDocument();
  });

  it('renders governed actions toolbar', () => {
    render(<SettlementDetailPage />);
    expect(screen.getByText('Governed Actions')).toBeInTheDocument();
    expect(screen.getByText('Approve Settlement')).toBeInTheDocument();
    expect(screen.getByText('Schedule Payout')).toBeInTheDocument();
  });

  it('renders 12 KPI metric cards', () => {
    render(<SettlementDetailPage />);
    expect(screen.getByText('1. Gross Earnings')).toBeInTheDocument();
    expect(screen.getByText('7. Net Settlement')).toBeInTheDocument();
    expect(screen.getByText('12. SLA Progress')).toBeInTheDocument();
  });

  it('renders lifecycle timeline', () => {
    render(<SettlementDetailPage />);
    expect(screen.getByText('Settlement / Payout Lifecycle')).toBeInTheDocument();
    expect(screen.getByText(/Invoice Received/)).toBeInTheDocument();
  });

  it('renders overview analytics section', () => {
    render(<SettlementDetailPage />);
    expect(screen.getByText(/Settlement.*Amount Trend/)).toBeInTheDocument();
    expect(screen.getByText('Beneficiary Type Distribution')).toBeInTheDocument();
    expect(screen.getByText(/Settlement.*Status Summary/)).toBeInTheDocument();
  });

  it('renders calculation summary table', () => {
    render(<SettlementDetailPage />);
    expect(screen.getByText('Settlement Calculation Summary')).toBeInTheDocument();
    expect(screen.getByText('Net Settlement')).toBeInTheDocument();
    expect(screen.getByText('Reconciliation Summary')).toBeInTheDocument();
  });

  it('renders right rail health score and quick summary', () => {
    render(<SettlementDetailPage />);
    expect(screen.getByText('Settlement / Payout Health Score')).toBeInTheDocument();
    expect(screen.getByText('Quick Summary')).toBeInTheDocument();
    expect(screen.getByText('Record Actions')).toBeInTheDocument();
  });
});
