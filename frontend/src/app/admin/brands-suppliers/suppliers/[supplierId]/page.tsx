"use client";

import React, { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, AlertTriangle, CheckCircle2, Clock, 
  RefreshCw, FileText, ChevronDown, Edit, Award, ExternalLink, Lock
} from 'lucide-react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { Tabs } from '@/components/admin/shared/Tabs';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';
import { brandsSuppliersApi } from '@/lib/api/brandsSuppliers';

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
];

export default function SupplierDetailPage({ params }: { params: { supplierId: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await brandsSuppliersApi.getSupplierDetail(params.supplierId);
      setData(res);
    } catch (err: any) {
      console.error("Error fetching supplier detail:", err);
      setError(err?.message || "Supplier record not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [params.supplierId]);

  if (loading) {
    return (
      <div className="flex w-full h-full min-h-screen bg-[#faf8f8] items-center justify-center p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RefreshCw size={16} className="animate-spin" />
          <span>Loading supplier workspace...</span>
        </div>
      </div>
    );
  }

  if (error || !data?.supplier) {
    return (
      <div className="flex w-full h-full min-h-screen bg-[#faf8f8] items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-md p-8 text-center max-w-md shadow-sm">
          <AlertTriangle size={32} className="text-amber-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900">Supplier Not Found</h2>
          <p className="text-xs text-gray-500 mt-1 mb-4">No supplier record matched the requested ID: <span className="font-mono text-gray-700">{params.supplierId}</span></p>
          <a href="/admin/brands-suppliers/suppliers" className="inline-block bg-[#7a0023] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#a0002b]">
            Return to Supplier Directory
          </a>
        </div>
      </div>
    );
  }

  const s = data.supplier;
  const contracts = data.contracts || [];
  const certificates = data.certificates || [];
  const brandAuths = data.brandAuthorizations || [];
  const products = data.products || [];

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Page Header */}
        <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Suppliers / {s.id}</div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-gray-400">
              <Building2 size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{s.company_name || s.store_name}</h1>
                <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold capitalize">{s.status}</span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold capitalize">{s.verification_status}</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold capitalize">{s.risk_level} Risk</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Public Ref: {s.id}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a href={`/admin/brands-suppliers/suppliers/${s.raw_id}/edit`} className="bg-[#7a0023] text-white px-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-[#a0002b]">Edit Supplier</a>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced="Just now" 
          accessNote="Access limited to assigned business context"
        />

        {/* Legal & Ownership Metadata Strip */}
        <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 grid grid-cols-5 gap-4 text-[11px]">
          <div><div className="text-gray-400">Legal Company Name</div><div className="font-bold text-gray-900 mt-0.5">{s.legal_name || s.company_name}</div></div>
          <div><div className="text-gray-400">Supplier Type</div><div className="font-bold text-gray-900 mt-0.5 capitalize">{s.business_type}</div></div>
          <div><div className="text-gray-400">Email</div><div className="font-bold text-gray-900 mt-0.5">{s.email || 'N/A'}</div></div>
          <div><div className="text-gray-400">Phone</div><div className="font-bold text-gray-900 mt-0.5">{s.phone || 'N/A'}</div></div>
          <div><div className="text-gray-400">Country</div><div className="font-bold text-gray-900 mt-0.5">{s.country}</div></div>
        </div>

        {/* Tabs */}
        <Tabs tabs={DETAIL_TABS} activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab Content Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white border border-gray-200 rounded-md p-4">
              <h3 className="font-bold text-xs text-gray-900 mb-3">Contracts &amp; Commercial ({contracts.length})</h3>
              {contracts.length === 0 ? (
                <div className="text-xs text-gray-400 border border-dashed border-gray-200 rounded p-4 text-center">No contracts found for this supplier.</div>
              ) : (
                <div className="flex flex-col gap-2 text-xs">
                  {contracts.map((c: any) => (
                    <div key={c.id} className="p-2 border border-gray-100 rounded flex justify-between items-center">
                      <div>
                        <div className="font-bold text-gray-900">{c.contract_name}</div>
                        <div className="text-[10px] text-gray-400">{c.contract_number}</div>
                      </div>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-semibold">{c.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-4">
              <h3 className="font-bold text-xs text-gray-900 mb-3">Certificates &amp; Credentials ({certificates.length})</h3>
              {certificates.length === 0 ? (
                <div className="text-xs text-gray-400 border border-dashed border-gray-200 rounded p-4 text-center">No uploaded certificates found.</div>
              ) : (
                <div className="flex flex-col gap-2 text-xs">
                  {certificates.map((cert: any) => (
                    <div key={cert.id} className="p-2 border border-gray-100 rounded flex justify-between items-center">
                      <div>
                        <div className="font-bold text-gray-900">{cert.certificate_type || 'Certificate'}</div>
                        <div className="text-[10px] text-gray-400">Issuer: {cert.issuing_organization || 'Official'}</div>
                      </div>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-semibold">{cert.status || 'Active'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Supplier Risk &amp; Health">
          <HealthScoreGauge 
            score={s.verification_status === 'verified' ? 90 : 50} 
            label={s.verification_status === 'verified' ? 'Healthy' : 'Pending'} 
            statusText={s.verification_status === 'verified' ? 'Verified' : 'Under Review'}
            statusColor={s.verification_status === 'verified' ? '#16a34a' : '#d97706'}
            metrics={[
              { label: 'Contracts', value: contracts.length > 0 ? 'Active' : 'Missing', progress: contracts.length > 0 ? 100 : 0 },
              { label: 'Products', value: `${products.length} Items`, progress: products.length > 0 ? 80 : 0 },
            ]}
          />
        </RailSection>
      </RightIntelligenceRail>

    </div>
  );
}
