import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CatalogueCommandCenter from '../../app/admin/catalogue/page';
import ProductMasters from '../../app/admin/catalogue/products/page';
import ProductApprovalQueuePage from '../../app/admin/catalogue/approvals/page';
import BrandManagement from '../../app/admin/catalogue/brands/page';
import AttributeManagement from '../../app/admin/catalogue/attributes/page';
import MediaManagement from '../../app/admin/catalogue/media/page';
import CatalogueImportExport from '../../app/admin/catalogue/import-export/page';
import QualityManagement from '../../app/admin/catalogue/quality/page';

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
  useParams: () => ({ productId: '123' }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/admin/catalogue',
}));

describe('Catalogue Management UI Integration', () => {
  it('renders the Command Center (C05) dashboard successfully', () => {
    render(<CatalogueCommandCenter />);
    expect(screen.getAllByText('Catalogue Command Center')[0]).toBeDefined();
  });

  it('renders the Product Master Management (C06) successfully', () => {
    render(<ProductMasters />);
    expect(screen.getAllByText('Product Master Management')[0]).toBeDefined();
  });

  it('renders the Product Approval Queue (C01) successfully', () => {
    render(<ProductApprovalQueuePage />);
    expect(screen.getAllByText('Product Approval Queue')[0]).toBeDefined();
  });

  it('renders the Brand Management (C10) successfully', () => {
    render(<BrandManagement />);
    expect(screen.getAllByText('Brand Management')[0]).toBeDefined();
  });

  it('renders the Attribute Management (C11) successfully', () => {
    render(<AttributeManagement />);
    expect(screen.getAllByText('Attribute & Variant Management')[0]).toBeDefined();
  });

  it('renders the Media Management (C12) successfully', () => {
    render(<MediaManagement />);
    expect(screen.getAllByText('Media Asset Management')[0]).toBeDefined();
  });

  it('renders the Import & Export (C13) successfully', () => {
    render(<CatalogueImportExport />);
    expect(screen.getAllByText('Catalogue Import & Export')[0]).toBeDefined();
  });

  it('renders the Quality Management (C14) successfully', () => {
    render(<QualityManagement />);
    expect(screen.getAllByText('Catalogue Quality & Duplicate Resolution')[0]).toBeDefined();
  });
});
