import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FinanceCommandCenterPage from '@/app/admin/finance/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/finance',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'Elona Vance',
      email: 'elona@slbeauty.test',
      role: 'Compliance Lead / Finance Operations',
    },
    logout: vi.fn(),
  }),
}));

describe('FN01 — Finance Command Center', () => {
  it('renders the main heading and description', () => {
    render(<FinanceCommandCenterPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Finance Command Center/i })).toBeInTheDocument();
    expect(screen.getByText(/Centralized monitoring and governance for ecosystem revenue/i)).toBeInTheDocument();
  });

  it('renders context bar fields and live data indicator', () => {
    render(<FinanceCommandCenterPage />);
    expect(screen.getByText('SL Beauty')).toBeInTheDocument();
    expect(screen.getByText('Beauty Marketplace')).toBeInTheDocument();
    expect(screen.getByText('May 2025')).toBeInTheDocument();
  });

  it('renders KPI grid metrics', () => {
    render(<FinanceCommandCenterPage />);
    expect(screen.getByText('LKR 486.2M')).toBeInTheDocument();
    expect(screen.getByText('LKR 432.8M')).toBeInTheDocument();
    expect(screen.getByText('LKR 368.4M')).toBeInTheDocument();
  });

  it('renders Finance Operations Portfolio table and records', () => {
    render(<FinanceCommandCenterPage />);
    expect(screen.getByText('Finance Operations Portfolio')).toBeInTheDocument();
    expect(screen.getAllByText('FIN-2025-00692')[0]).toBeInTheDocument();
  });

  it('renders Right Finance Operations Sidebar with health circular score', () => {
    render(<FinanceCommandCenterPage />);
    expect(screen.getByText('Finance Operations Health')).toBeInTheDocument();
    expect(screen.getByText('Priority Finance Alerts')).toBeInTheDocument();
  });
});
