import { beforeEach, describe, expect, it, vi } from 'vitest';

const get = vi.fn();

vi.mock('@/lib/api', () => ({
  api: { get: (...args: unknown[]) => get(...args) },
  withQuery: (endpoint: string) => endpoint,
}));

import { getDashboardOverview } from './dashboardOverview';

describe('dashboardOverview service', () => {
  beforeEach(() => get.mockReset());

  it('requests the authenticated live Admin overview endpoint without a fixture fallback', async () => {
    get.mockResolvedValue({ overview: { generated_at: '2026-07-31T12:00:00+05:30' } });

    await expect(getDashboardOverview()).resolves.toEqual({
      generated_at: '2026-07-31T12:00:00+05:30',
    });
    expect(get).toHaveBeenCalledWith(
      '/admin/dashboard/overview',
      expect.objectContaining({ signal: undefined }),
    );
  });

  it('rejects malformed responses instead of returning sample data', async () => {
    get.mockResolvedValue({ success: true });
    await expect(getDashboardOverview()).rejects.toThrow(
      'The dashboard response is missing its overview data.',
    );
  });
});
