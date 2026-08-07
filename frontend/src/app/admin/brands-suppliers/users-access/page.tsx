'use client';

import React, { useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailSection } from '@/components/admin/brands-suppliers/RightInsightRail';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { Download, SlidersHorizontal, Search, UserPlus, Key, Eye, HelpCircle, Lock, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UsersAccessPage() {
  const [activeTab, setActiveTab] = useState('All Users');

  const trendData = [
    { name: 'Jul 6', active: 2100, lockouts: 2 },
    { name: 'Jul 13', active: 2240, lockouts: 5 },
    { name: 'Jul 20', active: 2310, lockouts: 4 },
    { name: 'Jul 27', active: 2380, lockouts: 8 },
    { name: 'Aug 3', active: 2412, lockouts: 3 },
  ];

  const trendSeries = [
    { key: 'active', name: 'Active Login Sessions', color: '#3b82f6', type: 'line' as const },
    { key: 'lockouts', name: 'Security Lockouts', color: '#ef4444', type: 'bar' as const },
  ];

  const composition = [
    { name: 'Store Staff', value: 1612, percentage: '66.8%', color: '#2563eb' },
    { name: 'Supplier Manager', value: 412, percentage: '17.1%', color: '#f59e0b' },
    { name: 'Catalogue Lead', value: 246, percentage: '10.2%', color: '#10b981' },
    { name: 'Admin Manager', value: 142, percentage: '5.9%', color: '#8b5cf6' },
  ];

  const kpis = [
    { label: 'Active Users', value: '2,412', trend: '+54', color: 'text-gray-900' },
    { label: 'MFA Enrollment', value: '98.5%', trend: '+1.2%', color: 'text-green-600' },
    { label: 'Pending Invitations', value: '28', trend: '-5', color: 'text-orange-600' },
    { label: 'Security Lockouts', value: '3', trend: '-2', color: 'text-green-600' },
    { label: 'Active API Keys', value: '86', trend: '+2', color: 'text-blue-600' },
    { label: 'Revoked Access Keys', value: '12', trend: '+1', color: 'text-red-600' }
  ];

  const handleMfaReset = (email: string) => {
    toast.success(`MFA reset link successfully sent to ${email}!`);
  };

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Supplier Users, Roles & Access"
          description="Manage supplier corporate user accounts, configure hierarchical security roles, audit MFA statuses and monitor active developer API keys."
          breadcrumbs={[
            { label: 'Brands & Suppliers', href: '/admin/brands-suppliers' },
            { label: 'Users & Access' }
          ]}
          primaryAction={{ label: 'Invite Corporate User', onClick: () => {}, icon: UserPlus }}
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] text-gray-400 font-semibold uppercase truncate">{kpi.label}</span>
              <div className="flex items-end gap-2 mt-3">
                <span className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</span>
                <span className="text-[10px] text-green-500 font-medium">{kpi.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <TrendChartCard
              title="User Login Activity Trend"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="Role Distribution"
              data={composition}
              totalLabel="Total Users"
              totalValue={2412}
            />
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2 overflow-x-auto">
          {['All Users', 'Supplier Manager', 'Catalogue Lead', 'Admin Manager', 'Pending Invitations'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#7a122e] text-[#7a122e]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search supplier users..." className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md outline-none" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>MFA Enrollment</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white outline-none min-w-[140px]">
              <option>User Status</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <SlidersHorizontal size={14} /> More Filters
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm">Supplier User Management</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                <tr>
                  <th className="px-5 py-3">User Name / Email</th>
                  <th className="px-5 py-3 text-center">Assigned Supplier</th>
                  <th className="px-5 py-3 text-center">System Role</th>
                  <th className="px-5 py-3 text-center">MFA Status</th>
                  <th className="px-5 py-3 text-center">Last Active Login</th>
                  <th className="px-5 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">
                    <div className="flex flex-col">
                      <span>Priya Nair</span>
                      <span className="text-[10px] text-gray-400 font-medium">priya.nair@luxedistribution.lk</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">Luxe Distribution Pvt Ltd</td>
                  <td className="px-5 py-3 text-center">Supplier Manager</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[10px] font-semibold">Enabled</span>
                  </td>
                  <td className="px-5 py-3 text-center text-gray-500">04 Aug, 09:30 AM</td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => handleMfaReset('priya.nair@luxedistribution.lk')} className="text-[#7a122e] hover:underline font-semibold">Reset MFA</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">
                    <div className="flex flex-col">
                      <span>Elena Vance</span>
                      <span className="text-[10px] text-gray-400 font-medium">elena.vance@serenebotanics.lk</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">Serene Botanics Lanka</td>
                  <td className="px-5 py-3 text-center">Admin Manager</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[10px] font-semibold">Enabled</span>
                  </td>
                  <td className="px-5 py-3 text-center text-gray-500">04 Aug, 11:35 AM</td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => handleMfaReset('elena.vance@serenebotanics.lk')} className="text-[#7a122e] hover:underline font-semibold">Reset MFA</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">
                    <div className="flex flex-col">
                      <span>Marco Lee</span>
                      <span className="text-[10px] text-gray-400 font-medium">marco.lee@ceylonglow.com</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">Ceylon Glow Exports</td>
                  <td className="px-5 py-3 text-center">Catalogue Lead</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[10px] font-semibold">Not Configured</span>
                  </td>
                  <td className="px-5 py-3 text-center text-gray-500">04 Aug, 10:30 AM</td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => handleMfaReset('marco.lee@ceylonglow.com')} className="text-[#7a122e] hover:underline font-semibold">Enforce MFA</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Security Health">
          <RailHealthScore 
            score={94} 
            label="Secure" 
            status="Stable" 
            metrics={[
              { label: 'MFA Coverage', value: '98.5%' },
              { label: 'Access Keys Audited', value: '100%' },
              { label: 'Roles Synced', value: '99.4%' },
              { label: 'Idle Account Policy', value: '96.2%' },
            ]} 
          />
        </RailSection>

        <RailSection title="Security Risks" action={{ label: 'View all' }}>
          <RailAlertList items={[
            { label: 'Suspicious API activity (CON)', count: 2, critical: true },
            { label: 'Non-MFA user login attempt', count: 5, critical: true },
            { label: 'Pending account invites expired', count: 14, critical: false },
          ]} />
        </RailSection>

        <RailSection title="Developer Access Keys">
          <div className="flex flex-col gap-2">
            <button onClick={() => toast.success('New API Key successfully provisioned.')} className="w-full py-2 bg-[#7a122e] text-white rounded text-sm font-medium hover:bg-[#5a0d22] transition-colors flex items-center justify-center gap-1.5">
              <Key size={14} /> Provision Developer Access Key
            </button>
            <button onClick={() => toast.error('Key revocation requires super-admin password check.')} className="w-full py-2 bg-white border border-red-300 text-red-600 rounded text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5">
              <ShieldAlert size={14} /> Revoke Developer Credentials
            </button>
          </div>
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
