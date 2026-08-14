import { describe, expect, it } from 'vitest';

import {
  ADMIN_NAVIGATION,
  getActiveAdminNavigation,
  getActiveChildHref,
} from '@/constants/adminNavigation';

const EXPECTED_ROUTES = [
  ['Command Center', '/admin/customer-support'],
  ['Cases & Queues', '/admin/customer-support/cases'],
  ['Conversations', '/admin/customer-support/conversations'],
  ['Complaints & Escalations', '/admin/customer-support/complaints'],
  ['Order & Delivery Support', '/admin/customer-support/order-delivery'],
  ['Returns & Refund Support', '/admin/customer-support/returns-refunds'],
  ['Product & Supplier Support', '/admin/customer-support/product-supplier'],
  ['SLA & Routing', '/admin/customer-support/sla-routing'],
  ['Knowledge & Agent Assistance', '/admin/customer-support/knowledge'],
  ['Teams & Performance', '/admin/customer-support/teams-performance'],
  ['Satisfaction & QA', '/admin/customer-support/satisfaction-qa'],
  ['Reports / Audit', '/admin/customer-support/reports-audit'],
] as const;

describe('Customer Support admin navigation', () => {
  const customerSupport = ADMIN_NAVIGATION.find(
    (item) => item.id === 'customer-support',
  );

  it('defines every submenu item with its canonical absolute route', () => {
    expect(customerSupport?.href).toBe('/admin/customer-support');
    expect(customerSupport?.exact).toBe(true);
    expect(customerSupport?.children).toHaveLength(EXPECTED_ROUTES.length);

    for (const [label, href] of EXPECTED_ROUTES) {
      expect(customerSupport?.children).toContainEqual(
        expect.objectContaining({ label, href }),
      );
      expect(href.startsWith('/admin/customer-support')).toBe(true);
    }
  });

  it.each(EXPECTED_ROUTES)(
    'keeps Customer Support expanded and highlights %s',
    (_label, href) => {
      expect(getActiveAdminNavigation(href)?.id).toBe('customer-support');
      expect(getActiveChildHref(customerSupport, href)).toBe(href);
    },
  );

  it('keeps Cases & Queues active for create and dynamic detail routes', () => {
    expect(
      getActiveChildHref(
        customerSupport,
        '/admin/customer-support/cases/create',
      ),
    ).toBe('/admin/customer-support/cases');
    expect(
      getActiveChildHref(
        customerSupport,
        '/admin/customer-support/cases/CASE-2026-0001',
      ),
    ).toBe('/admin/customer-support/cases');
  });

  it('matches Command Center only at the Customer Support root', () => {
    expect(
      getActiveChildHref(customerSupport, '/admin/customer-support'),
    ).toBe('/admin/customer-support');
    expect(
      getActiveChildHref(
        customerSupport,
        '/admin/customer-support/conversations',
      ),
    ).toBe('/admin/customer-support/conversations');
  });
});
