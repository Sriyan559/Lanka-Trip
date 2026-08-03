import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DashboardOverview } from './DashboardOverview';

const getDashboardOverview = vi.fn();

vi.mock('@/services/api/dashboardOverview', () => ({
  getDashboardOverview: (...args: unknown[]) => getDashboardOverview(...args),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    loading: false,
    isAuthenticated: true,
    isAdmin: true,
  }),
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Area: () => <div />,
  CartesianGrid: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Cell: () => <div />,
}));

const liveOverview = {
  reporting_range: { from: '2026-07-02', to: '2026-07-31' },
  revenue: {
    availability: 'available',
    by_currency: [{ currency: 'USD', gross: 2000, completed_refunds: 125, net: 1875 }],
    lkr_aggregate: {
      value: null,
      availability: 'unavailable',
      reason: 'validated_exchange_rate_missing',
    },
  },
  paid_payouts: {
    availability: 'unavailable',
    reason: 'payout_domain_not_configured',
    by_currency: [],
  },
  orders: { value: 1, availability: 'available' },
  active_accounts: { value: 5, availability: 'available', definition: 'active_buyer_accounts' },
  purchasing_customers: { value: 1, availability: 'available' },
  active_brands: { value: 16, availability: 'available' },
  pending_approvals: { value: 0, availability: 'available', breakdown: {} },
  sales_trend: {
    availability: 'available',
    by_currency: [{
      currency: 'USD',
      items: [{ date: '2026-07-31', gross: 2000, completed_refunds: 125, net: 1875 }],
    }],
  },
  ecosystem_composition: {
    availability: 'available',
    basis: 'approved_active_products_by_category',
    items: [{ category_id: 7, category_name: 'Face Care', product_count: 3, percentage: 100 }],
  },
  recent_orders: [{
    id: 91,
    order_number: 'ORD-REAL-91',
    currency: 'USD',
    total_amount: '4850.00',
    payment_status: 'partial',
    status: 'confirmed',
    created_at: '2026-07-31T08:00:00Z',
    buyer: { id: 3, name: 'Database Buyer' },
    supplier: { id: 4, company_name: 'Database Supplier' },
  }],
  pending_verifications: [],
  high_risk_alerts: { availability: 'available', items: [] },
  data_availability_notices: [{
    code: 'validated_exchange_rate_missing',
    message: 'LKR conversion unavailable. Original currency totals are provided.',
  }],
  generated_at: '2026-07-31T12:00:00+05:30',
};

describe('DashboardOverview', () => {
  beforeEach(() => {
    getDashboardOverview.mockReset();
  });

  it('shows a loading state while the real API request is pending', () => {
    getDashboardOverview.mockReturnValue(new Promise(() => {}));
    render(<DashboardOverview />);
    expect(screen.getByRole('status', { name: 'Loading live dashboard data' })).toBeInTheDocument();
  });

  it('renders verified API values, currency labels, empty states, and real order links', async () => {
    getDashboardOverview.mockResolvedValue(liveOverview);
    render(<DashboardOverview />);

    expect(await screen.findByText(/\$1,875\.00|USD\s*1,875\.00/)).toBeInTheDocument();
    expect(screen.getByText('Not configured')).toBeInTheDocument();
    expect(screen.getByText('Sales Trend — USD')).toBeInTheDocument();
    expect(screen.getByText('Face Care')).toBeInTheDocument();
    expect(screen.getByText('ORD-REAL-91')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open Order' }))
      .toHaveAttribute('href', '/admin/marketplace/orders/91');
    expect(screen.getByText('No pending verification or compliance items.')).toBeInTheDocument();
    expect(screen.getByText('No high-risk alerts.')).toBeInTheDocument();
    expect(screen.queryByText('Sample aggregate')).not.toBeInTheDocument();
    expect(screen.queryByText(/Mock/i)).not.toBeInTheDocument();
    expect(screen.queryByText('LKR 45.2M')).not.toBeInTheDocument();
    expect(screen.queryByText('12,450')).not.toBeInTheDocument();
  });

  it('shows retry UI after an API failure and never renders fixture values', async () => {
    getDashboardOverview
      .mockRejectedValueOnce(Object.assign(new Error('The live API could not be reached.'), { status: 500 }))
      .mockResolvedValueOnce(liveOverview);
    render(<DashboardOverview />);

    expect(await screen.findByText('Live dashboard data is unavailable')).toBeInTheDocument();
    expect(screen.queryByText('LKR 45.2M')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Retry/i }));

    await waitFor(() => expect(getDashboardOverview).toHaveBeenCalledTimes(2));
    expect(await screen.findByText('ORD-REAL-91')).toBeInTheDocument();
  });

  it('shows access denied for a forbidden API response', async () => {
    getDashboardOverview.mockRejectedValue(
      Object.assign(new Error('Forbidden'), { status: 403 }),
    );
    render(<DashboardOverview />);
    expect(await screen.findByText('Administrator access required')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Retry/i })).not.toBeInTheDocument();
  });
});
