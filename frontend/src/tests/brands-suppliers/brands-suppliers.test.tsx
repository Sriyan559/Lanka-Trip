import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import BrandsSuppliersCommandCenter from '../../app/admin/brands-suppliers/page';
import SupplierManagementPage from '../../app/admin/brands-suppliers/suppliers/page';
import ContractsAgreementsPage from '../../app/admin/brands-suppliers/contracts/page';
import CatalogueCoveragePage from '../../app/admin/brands-suppliers/catalogue-coverage/page';
import PerformancePage from '../../app/admin/brands-suppliers/performance/page';
import RiskCompliancePage from '../../app/admin/brands-suppliers/risk-compliance/page';
import UsersAccessPage from '../../app/admin/brands-suppliers/users-access/page';
import ImportExportAuditPage from '../../app/admin/brands-suppliers/import-export-audit/page';

// Mock matchMedia for Recharts
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver for Recharts
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/admin/brands-suppliers',
  useParams: () => ({ supplierId: 'SUP-1002' })
}));

describe('Brands & Suppliers Module', () => {
  it('renders Command Center page without crashing', () => {
    render(<BrandsSuppliersCommandCenter />);
    expect(screen.getByText('Brands & Suppliers Command Center')).toBeInTheDocument();
  });

  it('renders Supplier Management page without crashing', () => {
    render(<SupplierManagementPage />);
    expect(screen.getByText('Supplier Management')).toBeInTheDocument();
  });

  it('renders Contracts page without crashing', () => {
    render(<ContractsAgreementsPage />);
    expect(screen.getByText('Supplier Contracts & Agreements')).toBeInTheDocument();
  });

  it('renders Catalogue Coverage page without crashing', () => {
    render(<CatalogueCoveragePage />);
    expect(screen.getByText('Supplier Product & Catalogue Coverage')).toBeInTheDocument();
  });

  it('renders Performance page without crashing', () => {
    render(<PerformancePage />);
    expect(screen.getByText('Supplier Performance & SLA')).toBeInTheDocument();
  });

  it('renders Risk Compliance page without crashing', () => {
    render(<RiskCompliancePage />);
    expect(screen.getByText('Supplier Risk & Compliance')).toBeInTheDocument();
  });

  it('renders Users Access page without crashing', () => {
    render(<UsersAccessPage />);
    expect(screen.getByText('Supplier Users, Roles & Access')).toBeInTheDocument();
  });

  it('renders Import Export page without crashing', () => {
    render(<ImportExportAuditPage />);
    expect(screen.getAllByText(/Import, Export & Audit/i)[0]).toBeInTheDocument();
  });
});
