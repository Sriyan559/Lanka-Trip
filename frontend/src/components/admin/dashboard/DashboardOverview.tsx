'use client';

import Link from 'next/link';
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import {
  AlertTriangle, ClipboardCheck, Landmark, RefreshCw,
  ShoppingCart, Tags, Users, Wallet,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBadge } from '@/components/admin/common/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { adminRoute } from '@/lib/admin';
import {
  DashboardOverview as DashboardOverviewData,
  Metric,
  getDashboardOverview,
} from '@/services/api/dashboardOverview';

const icons = {
  revenue: Wallet,
  payouts: Landmark,
  orders: ShoppingCart,
  customers: Users,
  brands: Tags,
  approvals: ClipboardCheck,
};
const chartColors = ['#741d35', '#c96686', '#c9a227', '#63748a', '#34765f', '#8b5ca8'];
const operationalActions = [
  { label: 'Catalogue Command Center', href: '/admin/catalogue' },
  { label: 'Product Masters', href: '/admin/catalogue/products' },
  { label: 'Brand Management', href: '/admin/catalogue/brands' },
  { label: 'Catalogue Quality', href: '/admin/catalogue/quality' },
  { label: 'Orders', href: '/admin/marketplace/orders' },
  { label: 'Returns', href: '/admin/marketplace/returns' },
];

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-LK').format(value);
}

function formatMoney(currency: string, value: number | string): string {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return `${currency} —`;
  try {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-LK', {
    dateStyle: 'medium',
    timeZone: 'Asia/Colombo',
  }).format(new Date(value));
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('en-LK', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Colombo',
  }).format(new Date(value));
}

function metricValue(metric: Metric | undefined): string {
  if (!metric || metric.availability === 'unavailable' || metric.value === null) {
    return 'Data unavailable';
  }
  return formatNumber(metric.value);
}

function metricReason(metric: Metric | undefined): string | null {
  if (!metric || metric.availability === 'available') return null;
  return metric.reason.replaceAll('_', ' ');
}

function DashboardLoading() {
  return (
    <div className="dashboard-stack" role="status" aria-label="Loading live dashboard data">
      <div className="dashboard-stat-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="card dashboard-stat dashboard-skeleton" key={index} />
        ))}
      </div>
      <div className="grid dashboard-chart-grid">
        <div className="card dashboard-chart-skeleton dashboard-skeleton" />
        <div className="card dashboard-chart-skeleton dashboard-skeleton" />
      </div>
    </div>
  );
}

function DashboardError({
  error,
  onRetry,
}: {
  error: Error & { status?: number };
  onRetry: () => void;
}) {
  const forbidden = error.status === 403;
  return (
    <section className="card dashboard-error" role="alert">
      <AlertTriangle size={24} />
      <div>
        <h2>{forbidden ? 'Administrator access required' : 'Live dashboard data is unavailable'}</h2>
        <p>
          {forbidden
            ? 'Your signed-in account is not permitted to view the Executive Command Center.'
            : error.message}
        </p>
      </div>
      {!forbidden && (
        <button className="button primary" type="button" onClick={onRetry}>
          <RefreshCw size={15} /> Retry
        </button>
      )}
    </section>
  );
}

export function DashboardOverview() {
  const { loading: authLoading, isAuthenticated, isAdmin } = useAuth();
  const [overview, setOverview] = useState<DashboardOverviewData | null>(null);
  const [error, setError] = useState<(Error & { status?: number }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const requestSequence = useRef(0);
  const activeController = useRef<AbortController | null>(null);

  const load = useCallback(async (background = false) => {
    const sequence = ++requestSequence.current;
    activeController.current?.abort();
    const controller = new AbortController();
    activeController.current = controller;
    if (background) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await getDashboardOverview({ signal: controller.signal });
      if (sequence !== requestSequence.current) return;
      setOverview(data);
      setError(null);
    } catch (requestError) {
      if (controller.signal.aborted || sequence !== requestSequence.current) return;
      setOverview(null);
      setError(requestError as Error & { status?: number });
    } finally {
      if (sequence === requestSequence.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    if (authLoading || !isAuthenticated || !isAdmin) return;
    void load(false);
    return () => activeController.current?.abort();
  }, [authLoading, isAdmin, isAuthenticated, load]);

  useEffect(() => {
    if (authLoading || !isAuthenticated || !isAdmin) return;
    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') void load(true);
    };
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') void load(true);
    }, 60_000);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    window.addEventListener('focus', refreshWhenVisible);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      window.removeEventListener('focus', refreshWhenVisible);
    };
  }, [authLoading, isAdmin, isAuthenticated, load]);

  if (authLoading || loading) return <DashboardLoading />;
  if (error) return <DashboardError error={error} onRetry={() => void load(false)} />;
  if (!overview) return null;

  const revenueTotals = overview.revenue.by_currency ?? [];
  const payoutTotals = overview.paid_payouts.by_currency ?? [];
  const composition = overview.ecosystem_composition.items ?? [];
  const riskAlerts = overview.high_risk_alerts.items ?? [];
  const kpis = [
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: revenueTotals.length
        ? revenueTotals.map((item) => formatMoney(item.currency, item.net))
        : ['No successful payments'],
      note: overview.revenue.availability === 'unavailable'
        ? overview.revenue.reason?.replaceAll('_', ' ')
        : 'Successful payments less completed refunds',
    },
    {
      id: 'payouts',
      label: 'Total Payouts',
      value: overview.paid_payouts.availability === 'unavailable'
        ? ['Not configured']
        : payoutTotals.length
          ? payoutTotals.map((item) => formatMoney(item.currency, item.amount))
          : ['No paid payouts'],
      note: overview.paid_payouts.availability === 'unavailable'
        ? overview.paid_payouts.reason?.replaceAll('_', ' ')
        : 'Paid payout records in the selected period',
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: [metricValue(overview.orders)],
      note: metricReason(overview.orders) ?? 'Orders created in the selected period',
    },
    {
      id: 'customers',
      label: 'Active Customers',
      value: [metricValue(overview.active_accounts)],
      note: metricReason(overview.active_accounts)
        ?? `${metricValue(overview.purchasing_customers)} purchasing customers in period`,
    },
    {
      id: 'brands',
      label: 'Active Brands',
      value: [metricValue(overview.active_brands)],
      note: metricReason(overview.active_brands) ?? 'Active and verified brands',
    },
    {
      id: 'approvals',
      label: 'Pending Approvals',
      value: [metricValue(overview.pending_approvals)],
      note: metricReason(overview.pending_approvals) ?? 'Verified pending approval queues',
    },
  ];

  return (
    <div className="dashboard-stack">
      <div className="dashboard-live-toolbar">
        <div>
          <strong>Live database overview</strong>
          <small>
            {formatDate(overview.reporting_range.from)} – {formatDate(overview.reporting_range.to)}
            {' · '}Last updated {formatDateTime(overview.generated_at)}
          </small>
        </div>
        <button
          className="button secondary"
          type="button"
          onClick={() => void load(true)}
          disabled={refreshing}
        >
          <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <div className="dashboard-stat-grid">
        {kpis.map((stat) => {
          const Icon = icons[stat.id as keyof typeof icons];
          return (
            <article className="card dashboard-stat" key={stat.id}>
              <div className="dashboard-stat-label">
                <span className="dashboard-icon"><Icon size={17} /></span>
                <span>{stat.label}</span>
              </div>
              <div className="dashboard-stat-value">
                {stat.value.map((value) => <span key={value}>{value}</span>)}
              </div>
              <small className="muted dashboard-stat-note">{stat.note}</small>
            </article>
          );
        })}
      </div>

      {overview.data_availability_notices.length > 0 && (
        <div className="dashboard-notices" aria-label="Data availability notices">
          {overview.data_availability_notices.map((notice) => (
            <p key={notice.code}><AlertTriangle size={15} />{notice.message}</p>
          ))}
        </div>
      )}

      <div className="grid dashboard-chart-grid">
        <section className="card chart-card">
          <div className="card-heading">
            <h2>Sales Trend</h2>
            <span className="badge">
              {formatDate(overview.reporting_range.from)} – {formatDate(overview.reporting_range.to)}
            </span>
          </div>
          {overview.sales_trend.availability === 'unavailable' ? (
            <div className="dashboard-empty">Sales trend data unavailable.</div>
          ) : (overview.sales_trend.by_currency ?? []).length === 0 ? (
            <div className="dashboard-empty">No successful payment records in this period.</div>
          ) : (
            <div className="dashboard-currency-charts">
              {(overview.sales_trend.by_currency ?? []).map((series, index) => (
                <div className="dashboard-currency-chart" key={series.currency}>
                  <h3>Sales Trend — {series.currency}</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={series.items}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tickFormatter={(value) => String(value).slice(5)} />
                      <YAxis tickFormatter={(value) => formatNumber(Number(value))} width={72} />
                      <Tooltip formatter={(value) => formatMoney(series.currency, Number(value))} />
                      <Area
                        type="monotone"
                        dataKey="net"
                        stroke={chartColors[index % chartColors.length]}
                        fill={chartColors[index % chartColors.length]}
                        fillOpacity={0.14}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <h2>Ecosystem Composition</h2>
          {overview.ecosystem_composition.availability === 'unavailable' ? (
            <div className="dashboard-empty">Ecosystem composition data unavailable.</div>
          ) : composition.length === 0 ? (
            <div className="dashboard-empty">No approved active product composition data available.</div>
          ) : (
            <>
              <div className="donut-wrap">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie
                      data={composition}
                      dataKey="percentage"
                      innerRadius={62}
                      outerRadius={88}
                      paddingAngle={2}
                    >
                      {composition.map((item, index) => (
                        <Cell key={item.category_id} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="composition-list">
                {composition.map((item, index) => (
                  <li key={item.category_id}>
                    <span>
                      <i style={{ background: chartColors[index % chartColors.length] }} />
                      {item.category_name}
                    </span>
                    <strong>{item.percentage}% · {item.product_count}</strong>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>

      <div className="grid dashboard-operations-grid">
        <section className="card recent-orders">
          <div className="card-heading">
            <h2>Recent Marketplace Orders</h2>
            <Link href="/admin/marketplace/orders">View all →</Link>
          </div>
          {overview.recent_orders.length === 0 ? (
            <div className="dashboard-empty">No marketplace orders are available.</div>
          ) : (
            <div className="table-wrap embedded">
              <table>
                <thead>
                  <tr>
                    <th>Order</th><th>Customer</th><th>Supplier</th><th>Amount</th>
                    <th>Payment</th><th>Status</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.recent_orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_number}</td>
                      <td>{order.buyer?.name ?? 'Not recorded'}</td>
                      <td>{order.supplier?.company_name ?? 'Not recorded'}</td>
                      <td>{formatMoney(order.currency, order.total_amount)}</td>
                      <td><StatusBadge status={order.payment_status ?? 'Not recorded'} /></td>
                      <td><StatusBadge status={order.status} /></td>
                      <td>
                        <Link className="button primary" href={adminRoute.order(String(order.id))}>
                          Open Order
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="grid dashboard-side-stack">
          <section className="card">
            <h2>Pending Verification &amp; Compliance</h2>
            {overview.pending_verifications.length === 0 ? (
              <div className="dashboard-empty compact">No pending verification or compliance items.</div>
            ) : overview.pending_verifications.map((item) => (
              <Link
                className="dashboard-alert-row"
                href={item.detail_route}
                key={`${item.entity_type}-${item.id}`}
              >
                <span className="alert-dot warning" />
                <span>
                  <strong>{item.entity_name}</strong>
                  <small>{item.required_action} · {item.status}</small>
                </span>
              </Link>
            ))}
          </section>
          <section className="card">
            <h2>High-Risk Alerts</h2>
            {overview.high_risk_alerts.availability === 'unavailable' ? (
              <div className="dashboard-empty compact">Risk information is unavailable.</div>
            ) : riskAlerts.length === 0 ? (
              <div className="dashboard-empty compact">No high-risk alerts.</div>
            ) : riskAlerts.map((alert) => (
              <div className="risk-alert" key={alert.id}>
                <strong>{alert.event_type.replaceAll('_', ' ')}</strong>
                <span>{alert.risk_level} risk · score {alert.risk_score}</span>
                <small>{formatDateTime(alert.created_at)}</small>
              </div>
            ))}
          </section>
        </div>
      </div>

      <section className="card">
        <h2>Operational Actions</h2>
        <div className="operational-actions">
          {operationalActions.map((action, index) => (
            <Link href={action.href} key={action.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>{action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
