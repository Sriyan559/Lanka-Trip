'use client';

import React, { useEffect, useState } from 'react';
import { BrandsSuppliersPageHeader } from '@/components/admin/brands-suppliers/BrandsSuppliersPageHeader';
import { RightInsightRail, RailHealthScore, RailAlertList, RailQueueList, RailSection } from '@/components/admin/brands-suppliers/RightInsightRail';
import { DonutChartCard } from '@/components/admin/brands-suppliers/charts/DonutChartCard';
import { TrendChartCard } from '@/components/admin/brands-suppliers/charts/TrendChartCard';
import { brandsSuppliersApi, KPIMetric } from '@/services/api/brandsSuppliers';
import { Download, FileText, UserPlus, CheckCircle, Clock, AlertTriangle, AlertCircle, Pause, FileWarning, HelpCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { BrandsSuppliersBottomPanels } from '@/components/admin/brands-suppliers/BrandsSuppliersBottomPanels';
import { getCommandCenterBottomPanelConfig } from '@/features/brands-suppliers/config/brandsSuppliersCommandCenter.config';

export default function BrandsSuppliersCommandCenter() {
  const [kpis, setKpis] = useState<KPIMetric[]>([]);
  const [composition, setComposition] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    brandsSuppliersApi.getCommandCenterKPIs().then(setKpis);
    brandsSuppliersApi.getSupplierComposition().then(setComposition);
    brandsSuppliersApi.getRecentActivity().then(setActivity);
  }, []);

  const getStatusIcon = (status?: string, id?: string) => {
    if (id === '1') return <UserPlus size={18} className="text-gray-500" />;
    if (status === 'success') return <CheckCircle size={18} className="text-green-600" />;
    if (status === 'warning') return <Clock size={18} className="text-orange-500" />;
    if (status === 'danger') return <AlertTriangle size={18} className="text-red-500" />;
    if (status === 'info') return <HelpCircle size={18} className="text-blue-500" />;
    if (id === '9') return <Pause size={18} className="text-purple-500" />;
    if (id === '11') return <FileWarning size={18} className="text-orange-500" />;
    return <AlertCircle size={18} className="text-gray-500" />;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'danger': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-900';
    }
  };

  const trendData = [
    { name: 'Jul 6', new: 10, approved: 8, rejected: 2 },
    { name: 'Jul 13', new: 15, approved: 12, rejected: 3 },
    { name: 'Jul 20', new: 25, approved: 20, rejected: 5 },
    { name: 'Jul 27', new: 30, approved: 28, rejected: 4 },
    { name: 'Aug 3', new: 42, approved: 35, rejected: 6 },
  ];

  const trendSeries = [
    { key: 'new', name: 'New Applications', color: '#3b82f6', type: 'line' as const },
    { key: 'approved', name: 'Approved', color: '#10b981', type: 'line' as const },
    { key: 'rejected', name: 'Rejected', color: '#ef4444', type: 'bar' as const },
  ];

  return (
    <div className="flex h-full w-full bg-[#f8fafc]">
      <div className="flex-1 overflow-auto p-6 flex flex-col">
        <BrandsSuppliersPageHeader
          title="Brands & Suppliers Command Center"
          description="Monitor supplier onboarding, verification, brand authorization, contracts, catalogue coverage, performance, risk and compliance across the beauty marketplace."
          breadcrumbs={[
            { label: 'Brands & Suppliers' },
            { label: 'Command Center' }
          ]}
          primaryAction={{ label: 'Add Supplier', onClick: () => {}, icon: Plus }}
          secondaryActions={[
            { label: 'Export Operations Report', onClick: () => {}, icon: Download },
            { label: 'Review Pending Applications', onClick: () => {}, icon: FileText }
          ]}
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{kpi.id} {kpi.label}</span>
                <div className={`p-1.5 rounded-full bg-gray-50 border border-gray-100`}>
                  {getStatusIcon(kpi.status, kpi.id)}
                </div>
              </div>
              <div className="flex items-end gap-2 mt-auto">
                <span className={`text-2xl font-bold ${getStatusColor(kpi.status)}`}>{kpi.value}</span>
                {kpi.trend && (
                  <span className={`text-xs font-medium mb-1 ${kpi.trendDirection === 'down' ? 'text-red-500' : 'text-green-500'}`}>
                    {kpi.trendDirection === 'down' ? '↓' : '↑'} {kpi.trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <TrendChartCard
              title="Supplier Onboarding Trend"
              data={trendData}
              series={trendSeries}
              timeRange="Last 30 Days"
            />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard
              title="Supplier Composition"
              data={composition}
              totalLabel="Total"
              totalValue={842}
            />
          </div>
        </div>

        {/* Verification & Auth Summaries Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Supplier Verification Operations</h3>
             </div>
             <div className="grid grid-cols-5 gap-4 divide-x divide-gray-100">
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Submitted</span>
                 <span className="text-xl font-bold text-gray-900">142</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 5.9%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Under Review</span>
                 <span className="text-xl font-bold text-gray-900">98</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 3.2%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">KYC Check</span>
                 <span className="text-xl font-bold text-gray-900">76</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 5.1%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Commercial Review</span>
                 <span className="text-xl font-bold text-gray-900">64</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 6.7%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Approved</span>
                 <span className="text-xl font-bold text-gray-900">512</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 4.3%</span>
               </div>
             </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Brand Authorization Operations</h3>
             </div>
             <div className="grid grid-cols-4 gap-4 divide-x divide-gray-100">
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Submitted</span>
                 <span className="text-xl font-bold text-gray-900">68</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 7.9%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Legal Review</span>
                 <span className="text-xl font-bold text-gray-900">44</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 6.6%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Approved</span>
                 <span className="text-xl font-bold text-gray-900">486</span>
                 <span className="text-[10px] text-green-500 font-medium">↑ 5.3%</span>
               </div>
               <div className="flex flex-col text-center">
                 <span className="text-xs text-gray-500 mb-1">Rejected</span>
                 <span className="text-xl font-bold text-gray-900">12</span>
                 <span className="text-[10px] text-red-500 font-medium">↓ 2.3%</span>
               </div>
             </div>
          </div>
        </div>

        {/* Bottom Panels Matrix and Stats */}
        <div className="mb-6">
          <BrandsSuppliersBottomPanels {...getCommandCenterBottomPanelConfig()} />
        </div>

        {/* More sections below... */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Brands & Suppliers Activity</h3>
            <button className="text-sm font-medium text-[#7a122e] hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 border-b border-gray-200 uppercase font-medium">
                <tr>
                  <th className="px-5 py-3">Date & Time</th>
                  <th className="px-5 py-3">Activity</th>
                  <th className="px-5 py-3">Entity Type</th>
                  <th className="px-5 py-3">Entity Name</th>
                  <th className="px-5 py-3">Reference ID</th>
                  <th className="px-5 py-3">Performed By</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activity.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 whitespace-nowrap text-gray-500">{act.date}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{act.activity}</td>
                    <td className="px-5 py-3 text-gray-500">{act.entityType}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{act.entityName}</td>
                    <td className="px-5 py-3 text-gray-500">{act.reference}</td>
                    <td className="px-5 py-3 text-gray-700">{act.user}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full 
                        ${act.status === 'New' ? 'bg-blue-50 text-blue-700' : 
                          act.status === 'Approved' ? 'bg-green-50 text-green-700' :
                          act.status === 'Updated' ? 'bg-blue-50 text-blue-700' :
                          act.status === 'Info' ? 'bg-gray-100 text-gray-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 truncate max-w-xs">{act.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <RightInsightRail>
        <RailSection title="Brands & Suppliers Health" action={{ label: 'View health dashboard' }}>
          <RailHealthScore 
            score={89} 
            label=""
            status="Stable" 
            metrics={[
              { label: 'Verification Coverage', value: '92%' },
              { label: 'Authorization Readiness', value: '88%' },
              { label: 'Contract Compliance', value: '85%' },
              { label: 'Catalogue Coverage', value: '91%' },
              { label: 'Supplier Performance', value: '86%' },
              { label: 'SLA Health', value: '84%' },
              { label: 'Risk Control', value: '82%' },
              { label: 'Audit Readiness', value: '94%' },
            ]} 
          />
        </RailSection>

        <RailSection title="Priority Alerts" action={{ label: 'View all' }}>
          <RailAlertList items={[
            { label: 'High-risk supplier application', count: 12, critical: true },
            { label: 'Expiring authorizations (30 days)', count: 18, critical: true },
            { label: 'SLA breach - verification', count: 7, critical: true },
            { label: 'Unauthorized brand use detected', count: 5, critical: true },
            { label: 'Missing KYC documents', count: 14, critical: false },
            { label: 'Contract renewal overdue', count: 9, critical: true },
          ]} />
        </RailSection>

        <RailSection title="Verification Status Summary">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-green-500 rounded-full" />
                <span className="text-gray-700">Verified</span>
              </div>
              <span className="text-gray-500">612 <span className="text-gray-400 text-[10px]">(72.7%)</span></span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1.5 bg-orange-400 rounded-full" />
                <span className="text-gray-700">Pending</span>
              </div>
              <span className="text-gray-500">128 <span className="text-gray-400 text-[10px]">(15.2%)</span></span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-1.5 bg-blue-500 rounded-full" />
                <span className="text-gray-700">Under Review</span>
              </div>
              <span className="text-gray-500">90 <span className="text-gray-400 text-[10px]">(10.7%)</span></span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-1.5 bg-red-500 rounded-full" />
                <span className="text-gray-700">Rejected</span>
              </div>
              <span className="text-gray-500">12 <span className="text-gray-400 text-[10px]">(1.4%)</span></span>
            </div>
          </div>
        </RailSection>
        
        <RailSection title="Quick Queues">
          <RailQueueList items={[
            { label: 'My Reviews', count: 24, icon: <UserPlus size={16} /> },
            { label: 'Pending Verification', count: 128, icon: <Clock size={16} /> },
            { label: 'High-Risk Cases', count: 12, icon: <AlertTriangle size={16} /> },
            { label: 'Expiring Authorizations', count: 18, icon: <FileWarning size={16} /> },
            { label: 'Contract Renewals', count: 26, icon: <FileText size={16} /> },
            { label: 'Catalogue Gaps', count: 42, icon: <AlertCircle size={16} /> },
          ]} />
        </RailSection>
      </RightInsightRail>
    </div>
  );
}
