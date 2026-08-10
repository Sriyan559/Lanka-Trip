"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertTriangle, 
  PauseCircle, Award, Clock, AlertCircle, FileText, ShieldAlert, RefreshCw
} from 'lucide-react';
import { DashboardGrid, KpiCard } from '@/components/admin/shared/KpiCard';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'All Business Units' },
  { label: 'Sales Channels', value: 'All Channels' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'suppliers', label: 'Suppliers' },
  { id: 'contracts', label: 'Contracts' },
  { id: 'catalogue', label: 'Catalogue Coverage' },
  { id: 'performance', label: 'Performance' },
  { id: 'risk', label: 'Risk & Compliance' },
  { id: 'users', label: 'Users & Access' },
];

const ICON_MAP: Record<string, any> = {
  Users, UserCheck, ShieldCheck, Hourglass, FilePlus, AlertCircle, AlertTriangle, PauseCircle, FileText, Clock, Award, ShieldAlert
};

export default function BrandsSuppliersCommandCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await brandsSuppliersApi.getSuppliersDashboard();
      setDashboardData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const kpis = dashboardData?.kpis || [];
  const health = dashboardData?.health || { score: null, status: 'Not Assessed' };

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Command Center</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Brands &amp; Suppliers Command Center</h1>
            <p className="text-xs text-gray-500 mt-1">Overview of supplier network operations, verification readiness, contracts, catalogue coverage, and risk management.</p>
          </div>
          <button 
            onClick={fetchDashboard} 
            className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded text-gray-600 hover:text-gray-900"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sync Live Data</span>
          </button>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced={dashboardData?.lastSynced || 'Just now'} accessNote="Access limited to assigned business context" />

        {/* KPI Grid */}
        <DashboardGrid>
          {kpis.map((kpi: any) => {
            const IconComponent = ICON_MAP[kpi.icon] || Users;
            return <KpiCard key={kpi.index} {...kpi} icon={IconComponent} />;
          })}
        </DashboardGrid>

        {/* Tabs */}
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        <div className="bg-white border border-gray-200 rounded-md p-6 mt-2 text-center text-xs text-gray-500">
          Brands &amp; Suppliers network statistics loaded live from database.
        </div>

      </div>

      {/* RIGHT RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Module Health">
          <HealthScoreGauge 
            score={health.score ?? 0} 
            label={health.status} 
            statusText={health.score === null ? 'Not Assessed' : (health.score >= 80 ? 'Healthy' : 'At Risk')}
            statusColor={health.score === null ? '#6b7280' : (health.score >= 80 ? '#16a34a' : '#dc2626')}
            metrics={[]} 
          />
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
