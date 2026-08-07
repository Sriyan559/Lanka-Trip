"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { ClipboardCheck, Landmark, ShoppingCart, Tags, TrendingDown, TrendingUp, Users, Wallet, AlertCircle, RefreshCw } from "lucide-react";
import { dashboardActions, dashboardOrders, dashboardRiskAlert, dashboardStats, ecosystem, salesTrend, verificationAlerts } from "@/mocks/admin/dashboard.mock";
import { StatusBadge } from "@/components/admin/common/StatusBadge";
import { adminRoute } from "@/lib/admin";
import { getDashboardOverview, DashboardOverview as DashboardData } from "@/services/api/dashboardOverview";

const icons = { wallet: Wallet, landmark: Landmark, cart: ShoppingCart, users: Users, tags: Tags, clipboard: ClipboardCheck };

export function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboardOverview();
      setData(res);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div role="status" aria-label="Loading live dashboard data" className="p-8 text-center bg-white rounded-xl border border-line shadow-sm my-6">
        <div className="w-8 h-8 border-4 border-[#741d35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-muted font-medium">Loading live dashboard data...</p>
      </div>
    );
  }

  if (error) {
    const is403 = error?.status === 403 || error?.response?.status === 403;
    if (is403) {
      return (
        <div className="p-8 text-center bg-white rounded-xl border border-rose-200 shadow-sm my-6">
          <AlertCircle size={32} className="text-rose-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-ink">Administrator access required</h3>
          <p className="text-xs text-muted mt-1">You do not have permission to view live dashboard data.</p>
        </div>
      );
    }

    return (
      <div className="p-8 text-center bg-white rounded-xl border border-amber-200 shadow-sm my-6">
        <AlertCircle size={32} className="text-amber-500 mx-auto mb-2" />
        <h3 className="text-base font-bold text-ink">Live dashboard data is unavailable</h3>
        <p className="text-xs text-muted mt-1 mb-4">Unable to fetch real-time overview metrics from the API.</p>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#741d35] text-white text-xs font-bold rounded hover:bg-[#5a1629] transition-colors"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  // Live Data Rendering
  if (data) {
    const revenueUsd = data.revenue?.by_currency?.find(c => c.currency === 'USD')?.net;
    const revenueLabel = revenueUsd != null ? `USD ${revenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : 'Not configured';
    
    const payoutsLabel = data.paid_payouts?.availability === 'available'
      ? `${data.paid_payouts.by_currency?.[0]?.currency || 'LKR'} ${data.paid_payouts.by_currency?.[0]?.amount}`
      : 'Not configured';

    const salesTrendData = data.sales_trend?.by_currency?.[0]?.items?.map(i => ({
      day: i.date,
      value: i.net,
    })) || salesTrend;

    const ecosystemItems = data.ecosystem_composition?.items?.map((item, idx) => ({
      label: item.category_name,
      value: item.percentage,
      color: ['#741d35', '#059669', '#0284c7', '#ea580c', '#6b7280'][idx % 5],
    })) || ecosystem;

    const ordersList = data.recent_orders?.map((o) => ({
      id: String(o.id),
      reference: o.order_number,
      brand: o.supplier?.company_name || o.buyer?.name || 'Marketplace Item',
      amount: `${o.currency || 'USD'} ${o.total_amount}`,
      status: o.payment_status || o.status || 'Paid',
    })) || [];

    const pendingVerifications = data.pending_verifications || [];
    const highRiskAlerts = data.high_risk_alerts?.items || [];

    return (
      <div className="dashboard-stack">
        <div className="dashboard-stat-grid">
          <article className="card dashboard-stat">
            <div className="dashboard-stat-label">
              <span className="dashboard-icon"><Wallet size={17} /></span>
              <span>Total Revenue</span>
            </div>
            <div className="dashboard-stat-value">{revenueLabel}</div>
          </article>

          <article className="card dashboard-stat">
            <div className="dashboard-stat-label">
              <span className="dashboard-icon"><Landmark size={17} /></span>
              <span>Total Payouts</span>
            </div>
            <div className="dashboard-stat-value">{payoutsLabel}</div>
          </article>

          <article className="card dashboard-stat">
            <div className="dashboard-stat-label">
              <span className="dashboard-icon"><ShoppingCart size={17} /></span>
              <span>Total Orders</span>
            </div>
            <div className="dashboard-stat-value">{data.orders?.value ?? 0}</div>
          </article>

          <article className="card dashboard-stat">
            <div className="dashboard-stat-label">
              <span className="dashboard-icon"><Users size={17} /></span>
              <span>Active Accounts</span>
            </div>
            <div className="dashboard-stat-value">{data.active_accounts?.value ?? 0}</div>
          </article>

          <article className="card dashboard-stat">
            <div className="dashboard-stat-label">
              <span className="dashboard-icon"><Tags size={17} /></span>
              <span>Active Brands</span>
            </div>
            <div className="dashboard-stat-value">{data.active_brands?.value ?? 0}</div>
          </article>

          <article className="card dashboard-stat">
            <div className="dashboard-stat-label">
              <span className="dashboard-icon"><ClipboardCheck size={17} /></span>
              <span>Pending Approvals</span>
            </div>
            <div className="dashboard-stat-value">{data.pending_approvals?.value ?? 0}</div>
          </article>
        </div>

        <div className="grid dashboard-chart-grid">
          <section className="card chart-card">
            <div className="card-heading">
              <h2>Sales Trend — USD</h2>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={salesTrendData}>
                <defs>
                  <linearGradient id="salesFillTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#741d35" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#741d35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis axisLine={false} tickLine={false} width={70} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#741d35" strokeWidth={3} fill="url(#salesFillTarget)" />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          <section className="card">
            <h2>Ecosystem Composition</h2>
            <div className="donut-wrap">
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie data={ecosystemItems} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={2}>
                    {ecosystemItems.map((item) => (
                      <Cell key={item.label} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="composition-list">
              {ecosystemItems.map((item) => (
                <li key={item.label}>
                  <span>
                    <i style={{ background: item.color }} />
                    {item.label}
                  </span>
                  <strong>{item.value}%</strong>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid dashboard-operations-grid">
          <section className="card recent-orders">
            <div className="card-heading">
              <h2>Recent Marketplace Orders</h2>
              <Link href="/admin/marketplace/orders">View all &rarr;</Link>
            </div>
            <div className="table-wrap embedded">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Brand</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((order) => (
                    <tr key={order.id}>
                      <td>{order.reference}</td>
                      <td>{order.brand}</td>
                      <td>{order.amount}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td>
                        <Link className="button primary" href={adminRoute.order(order.id)}>
                          Open Order
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid">
            <section className="card">
              <h2>Pending Verification &amp; Compliance</h2>
              {pendingVerifications.length > 0 ? (
                pendingVerifications.map((alert: any) => (
                  <Link className="dashboard-alert-row" href={adminRoute.supplier(alert.id)} key={alert.id}>
                    <span className={`alert-dot ${alert.tone || 'warning'}`} />
                    <span>
                      <strong>{alert.supplier}</strong>
                      <small>{alert.issue}</small>
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-muted p-4">No pending verification or compliance items.</p>
              )}
            </section>

            <section className="card">
              <h2>High Risk Alerts</h2>
              {highRiskAlerts.length > 0 ? (
                highRiskAlerts.map((alert: any, idx: number) => (
                  <div key={idx} className="p-2 text-xs font-semibold text-red-600">{alert.message}</div>
                ))
              ) : (
                <p className="text-xs text-muted p-4">No high-risk alerts.</p>
              )}
            </section>
          </div>
        </div>

        <section className="card">
          <h2>Operational Actions</h2>
          <div className="operational-actions">
            {dashboardActions.map((action, index) => (
              <Link href={action.href} key={action.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {action.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Static Fallback View
  return (
    <div className="dashboard-stack">
      <div className="dashboard-stat-grid">
        {dashboardStats.map((stat) => {
          const Icon = icons[stat.icon as keyof typeof icons] || Wallet;
          const Trend = stat.direction === "down" ? TrendingDown : TrendingUp;
          return (
            <article className="card dashboard-stat" key={stat.id}>
              <div className="dashboard-stat-label">
                <span className="dashboard-icon">
                  <Icon size={17} />
                </span>
                <span>{stat.label}</span>
              </div>
              <div className="dashboard-stat-value">{stat.value}</div>
              <span className={`dashboard-trend ${stat.direction}`}>
                <Trend size={13} />
                {stat.trend}
              </span>
              <small className="muted">Sample aggregate</small>
            </article>
          );
        })}
      </div>

      <div className="grid dashboard-chart-grid">
        <section className="card chart-card">
          <div className="card-heading">
            <h2>System Performance &amp; Sales Trend</h2>
            <span className="badge">Last 30 Days · Mock</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesTrend}>
              <defs>
                <linearGradient id="salesFillTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#741d35" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#741d35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `LKR ${v / 1_000_000}M`} width={70} />
              <Tooltip formatter={(v) => `LKR ${(Number(v) / 1_000_000).toFixed(2)}M`} />
              <Area type="monotone" dataKey="value" stroke="#741d35" strokeWidth={3} fill="url(#salesFillTarget)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        <section className="card">
          <h2>Ecosystem Composition</h2>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={ecosystem} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={2}>
                  {ecosystem.map((item) => (
                    <Cell key={item.label} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="composition-list">
            {ecosystem.map((item) => (
              <li key={item.label}>
                <span>
                  <i style={{ background: item.color }} />
                  {item.label}
                </span>
                <strong>{item.value}%</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid dashboard-operations-grid">
        <section className="card recent-orders">
          <div className="card-heading">
            <h2>Recent Marketplace Orders</h2>
            <Link href="/admin/marketplace/orders">View all &rarr;</Link>
          </div>
          <div className="table-wrap embedded">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Brand</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dashboardOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.reference}</td>
                    <td>{order.brand}</td>
                    <td>{order.amount}</td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>
                      <Link className="button primary" href={adminRoute.order(order.id)}>
                        Open Order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid">
          <section className="card">
            <h2>Pending Verification &amp; Compliance</h2>
            {verificationAlerts.map((alert) => (
              <Link className="dashboard-alert-row" href={adminRoute.supplier(alert.id)} key={alert.id}>
                <span className={`alert-dot ${alert.tone}`} />
                <span>
                  <strong>{alert.supplier}</strong>
                  <small>{alert.issue}</small>
                </span>
              </Link>
            ))}
          </section>
          <Link className="risk-alert" href={dashboardRiskAlert.href}>
            <strong>{dashboardRiskAlert.title}</strong>
            <span>{dashboardRiskAlert.message}</span>
            <small>Immediate review required &rarr;</small>
          </Link>
        </div>
      </div>

      <section className="card">
        <h2>Operational Actions</h2>
        <div className="operational-actions">
          {dashboardActions.map((action, index) => (
            <Link href={action.href} key={action.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
