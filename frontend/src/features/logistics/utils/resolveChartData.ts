/**
 * Utility to resolve chart data between real database records and illustrative fallback data.
 * 
 * Rules:
 * 1. If realData exists and has non-zero length/records, return realData with isDemo = false.
 * 2. If realData is null/empty, return fallbackData with isDemo = true.
 * 3. Never mix real database values with fallback values.
 */

export interface ResolvedChartResult<T> {
  data: T[];
  isDemo: boolean;
  dataSource: "live" | "demo";
}

export function resolveChartData<T>(
  realData: T[] | undefined | null,
  fallbackData: T[]
): ResolvedChartResult<T> {
  // Check if realData contains actual records with non-zero values
  const hasRealRecords = Array.isArray(realData) && realData.length > 0 && realData.some((item: any) => {
    // If array items have count/value/Booked keys, check if total > 0
    if (typeof item === 'object' && item !== null) {
      const val = item.count ?? item.value ?? item.Booked ?? item.Shipped ?? item.Delivered ?? 0;
      return Number(val) > 0;
    }
    return true;
  });

  if (hasRealRecords && realData) {
    return {
      data: realData,
      isDemo: false,
      dataSource: "live",
    };
  }

  return {
    data: fallbackData,
    isDemo: true,
    dataSource: "demo",
  };
}
