"use client";

import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, AlertTriangle, CheckCircle2, Clock, 
  RefreshCw, FileText, ChevronDown, Edit, Award, ExternalLink, Lock
} from 'lucide-react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'Consumer Beauty' },
  { label: 'Sales Channels', value: 'Marketplace, Mobile App, B2B' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
];

const DETAIL_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'profile', label: 'Company Profile' },
  { id: 'verification', label: 'Verification & Documents' },
  { id: 'brands', label: 'Brands & Authorizations' },
  { id: 'products', label: 'Products & Catalogue' },
  { id: 'contracts', label: 'Contracts & Commercial' },
  { id: 'finance', label: 'Finance & Settlement' },
  { id: 'performance', label: 'Performance & SLA' },
  { id: 'risk', label: 'Risk & Compliance' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'users', label: 'Users & Access' },
  { id: 'cases', label: 'Cases & Activity' },
  { id: 'audit', label: 'Audit History' },
];

export default function SupplierDetailPage({ params }: { params: { supplierId: string } }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Multi-user warning banner */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded-md text-[12px] flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-amber-600" />
            <span>This supplier record is being viewed by multiple users. Please refresh before making edits to ensure you have the latest information.</span>
          </div>
          <button className="bg-white border border-amber-300 text-amber-900 px-2.5 py-1 rounded text-[11px] font-semibold hover:bg-amber-100 transition-colors">
            Refresh Now
          </button>
        </div>

        {/* Page Header */}
        <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Suppliers / Supplier Detail</div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-gray-400">
              <Building2 size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">Luxe Distribution Pvt Ltd</h1>
                <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold">Active</span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">Verified</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">Low Risk</span>
                <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded text-[10px] font-bold">Tier A</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Public Ref: SUP-2024-00124</div>
              <p className="text-xs text-gray-600 mt-1 max-w-3xl">Premier distributor of luxury cosmetics and skincare products across the South Asian region. Primary partner for premium catalogue expansion.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">View Brand Authorizations</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-semibold hover:bg-gray-50">Start Verification Review</button>
            <button className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">Edit Supplier</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-2.5 py-1.5 rounded-md text-[13px] font-semibold flex items-center gap-1 hover:bg-gray-50">More Actions <ChevronDown size={14} /></button>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced="04 Aug 2026, 12:57 AM" 
          accessNote="Access limited to assigned business context"
        />

        {/* Legal & Ownership Metadata Strip */}
        <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 grid grid-cols-6 gap-4 text-[11px]">
          <div><div className="text-gray-400">Legal Company Name</div><div className="font-bold text-gray-900 mt-0.5">Luxe Distribution (Pvt) Ltd</div></div>
          <div><div className="text-gray-400">Supplier Type</div><div className="font-bold text-gray-900 mt-0.5">Distributor</div></div>
          <div><div className="text-gray-400">Registration No.</div><div className="font-bold text-gray-900 mt-0.5">PV 123456</div></div>
          <div><div className="text-gray-400">Tax Number</div><div className="font-bold text-gray-900 mt-0.5">114-254-789-000</div></div>
          <div><div className="text-gray-400">Primary Contact</div><div className="font-bold text-gray-900 mt-0.5">Priya Nair</div></div>
          <div><div className="text-gray-400">Country / City</div><div className="font-bold text-gray-900 mt-0.5">Sri Lanka / Colombo</div></div>
        </div>

        {/* Detail Tabs */}
        <Tabs tabs={DETAIL_TABS} activeTab={activeTab} onChange={setActiveTab} />

        {/* TAB CONTENT (OVERVIEW) */}
        <div className="flex flex-col gap-4 mt-2">
          
          {/* Top Overview Grid */}
          <div className="grid grid-cols-12 gap-4">
            
            {/* Supplier Profile Card */}
            <div className="col-span-3 bg-white border border-gray-200 rounded-md p-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-2">
                <Building2 size={32} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Luxe Distribution Pvt Ltd</h3>
              <span className="text-[10px] text-gray-400">SUP-2024-00124</span>
              <div className="mt-3 text-[11px] text-gray-600 space-y-1 w-full text-left border-t border-gray-100 pt-3">
                <div>📍 Colombo, Sri Lanka</div>
                <div>✉️ contact@luxedistribution.lk</div>
                <div>📞 +94 11 234 5678</div>
                <div>🌐 www.luxedistribution.lk</div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="col-span-6 bg-white border border-gray-200 rounded-md p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Key Metrics</h3>
              <div className="grid grid-cols-4 gap-3 text-[11px]">
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Active Brands</div><div className="text-lg font-bold text-gray-900">12</div></div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Active Authorizations</div><div className="text-lg font-bold text-gray-900">11</div></div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Active Products</div><div className="text-lg font-bold text-gray-900">428</div></div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Publication-Ready</div><div className="text-lg font-bold text-green-600">402</div></div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Active Contracts</div><div className="text-lg font-bold text-gray-900">8</div></div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Renewals Due</div><div className="text-lg font-bold text-amber-600">2</div></div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Open Verification</div><div className="text-lg font-bold text-gray-900">4</div></div>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-100"><div className="text-gray-500">Open Compliance</div><div className="text-lg font-bold text-red-600">2</div></div>
              </div>
            </div>

            {/* Lifecycle Actions */}
            <div className="col-span-3 bg-white border border-gray-200 rounded-md p-4 flex flex-col">
              <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Lifecycle Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-1.5 border border-gray-200 rounded text-[11px] font-semibold hover:bg-gray-50 flex items-center justify-between">
                  <span>Add Brand Relationship</span> <Award size={12} className="text-gray-400" />
                </button>
                <button className="w-full text-left px-3 py-1.5 border border-amber-200 bg-amber-50 text-amber-900 rounded text-[11px] font-semibold hover:bg-amber-100 flex items-center justify-between">
                  <span>Restrict Supplier</span> <Lock size={12} className="text-amber-600" />
                </button>
                <button className="w-full text-left px-3 py-1.5 border border-red-200 bg-red-50 text-red-900 rounded text-[11px] font-semibold hover:bg-red-100 flex items-center justify-between">
                  <span>Suspend Supplier</span> <AlertTriangle size={12} className="text-red-600" />
                </button>
              </div>
            </div>

          </div>

          {/* Middle Operational Summaries */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-md p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-2">Company Profile Summary</h3>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">Incorporation Country</span><span className="font-semibold">Sri Lanka</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">Entity Type</span><span className="font-semibold">Private Limited</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">Tax Registration</span><span className="font-semibold">114-254-789-000</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">Years Active</span><span className="font-semibold">6 Years</span></div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-2">Verification &amp; Documents Summary</h3>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">ISO 9001 Certificate</span><span className="text-green-600 font-bold">Verified</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">GMP Certificate</span><span className="text-green-600 font-bold">Verified</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">Financial Audit 2025</span><span className="text-green-600 font-bold">Verified</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="text-gray-500">Tax Registration</span><span className="text-green-600 font-bold">Verified</span></div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-4">
              <h3 className="text-xs font-bold text-gray-900 mb-2">Brands &amp; Authorizations (6)</h3>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="font-bold">Estée Lauder</span><span className="text-green-600 font-bold">Active</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="font-bold">MAC Cosmetics</span><span className="text-green-600 font-bold">Active</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="font-bold">Clinique</span><span className="text-green-600 font-bold">Active</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-1"><span className="font-bold">The Ordinary</span><span className="text-green-600 font-bold">Active</span></div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Supplier Health">
          <HealthScoreGauge 
            score={92} 
            label="Excellent" 
            statusText="Excellent"
            statusColor="#16a34a"
            metrics={[
              { label: 'Profile Completeness', value: '94%', progress: 94 },
              { label: 'Verification Coverage', value: '92%', progress: 92 },
              { label: 'Document Readiness', value: '90%', progress: 90 },
              { label: 'Authorization Coverage', value: '94%', progress: 94 },
              { label: 'Contract Coverage', value: '88%', progress: 88 },
            ]}
          />
        </RailSection>

        <RailSection title="Current Supplier State">
          <div className="space-y-1.5 text-[11px] border-t border-gray-200 pt-2">
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-bold text-green-600">Active</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Verification State</span><span className="font-bold text-green-600">Verified</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Authorization State</span><span className="font-bold text-green-600">Authorized</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Contract State</span><span className="font-bold text-green-600">Active</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Catalogue Readiness</span><span className="font-bold text-green-600">Ready</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Risk Level</span><span className="font-bold text-green-600">Low</span></div>
          </div>
        </RailSection>

        <RailSection title="Priority Issues">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between items-center"><span className="text-gray-700">Insurance Expiry</span><span className="font-bold text-amber-600">2</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Brand Authorization Expiry</span><span className="font-bold text-amber-600">1</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-700">Missing Financial Audit</span><span className="font-bold text-amber-600">1</span></div>
          </div>
        </RailSection>

        <RailSection title="Final Supplier Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Edit Supplier</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Start Verification Review</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Add Brand Relationship</button>
            <button className="border border-amber-300 text-amber-900 bg-amber-50 py-1.5 rounded text-[11px] font-semibold hover:bg-amber-100">Restrict Supplier</button>
            <button className="border border-red-300 text-red-900 bg-red-50 py-1.5 rounded text-[11px] font-semibold hover:bg-red-100">Suspend Supplier</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
