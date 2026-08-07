import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SalesRevenueReceivablesPage from '@/app/admin/finance/revenue-receivables/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/finance/revenue-receivables',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Sales, Revenue & Receivables (FN02)', () => {
  it('renders title and essential sections', () => {
    render(<SalesRevenueReceivablesPage />);
    
    // Page Title
    expect(screen.getByRole('heading', { level: 1, name: /Sales, Revenue & Receivables/i })).toBeInTheDocument();
    
    // Section tabs
    expect(screen.getByRole('button', { name: 'Revenue Overview' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Receivables & Ageing' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collections & Disputes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adjustments & Deferred' })).toBeInTheDocument();
    
    // Table heading
    expect(screen.getByText('Revenue & Receivables Portfolio')).toBeInTheDocument();
  });
});
