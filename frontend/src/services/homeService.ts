import { HomePageData } from '@/types/home';
import { mockHomePageData } from '@/data/mock/home';

/**
 * Data access function for LankaTrip homepage.
 * In Phase 1 (Mock Data First), returns reliable local mock data.
 * In Phase 2, this function seamlessly maps to the Laravel API.
 */
export async function getHomePageData(): Promise<HomePageData> {
  return Promise.resolve(mockHomePageData);
}
