/**
 * Analytics sub-layout — scopes admin-analytics.css to /admin/analytics only.
 * Prevents 46KB of analytics-specific CSS from loading on every admin route.
 */
import "@/app/admin-analytics.css";

export default function AnalyticsLayout({ children }) {
  return <>{children}</>;
}
