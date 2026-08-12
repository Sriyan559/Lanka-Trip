/**
 * Shared formatting utilities for Enterprise Analytics.
 */

export function formatCurrency(value: number | string | undefined | null, currencyCode: string = "LKR"): string {
  if (value === undefined || value === null) return "-";
  
  // If it's already a string with a formatting suffix, return as is or ensure it has currency
  if (typeof value === "string") {
    if (value.startsWith(currencyCode) || value.startsWith("$") || value.startsWith("£")) return value;
    if (value.includes("M") || value.includes("K") || value.includes("B")) return `${currencyCode} ${value}`;
    
    // Try to parse string to number if it doesn't have suffix
    const num = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(num)) value = num;
  }

  if (typeof value === "number") {
    if (value >= 1_000_000_000) return `${currencyCode} ${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${currencyCode} ${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${currencyCode} ${(value / 1_000).toFixed(1)}K`;
    return `${currencyCode} ${value.toLocaleString()}`;
  }

  return String(value);
}

export function formatPercentage(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return "-";
  
  if (typeof value === "string") {
    if (value.endsWith("%") || value.endsWith("pp")) return value;
    const num = parseFloat(value);
    if (!isNaN(num)) value = num;
  }

  if (typeof value === "number") {
    return `${value.toFixed(1)}%`;
  }

  return String(value);
}

export function formatNumber(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return "-";
  
  if (typeof value === "string") {
    // Return formatted strings (e.g., "1.2M", "1,200", "5.1x") as is
    if (value.includes("M") || value.includes("K") || value.includes("B") || value.endsWith("x")) return value;
    const num = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(num)) value = num;
  }

  if (typeof value === "number") {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 10_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toLocaleString();
  }

  return String(value);
}
