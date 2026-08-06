'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { RightInsightRail, RailHealthScore, RailAlertList, RailSection } from '@/components/admin/brands-suppliers/RightInsightRail';
import { suppliersApi, SupplierDetail } from '@/services/api/suppliers';
import { CheckCircle, AlertTriangle, AlertCircle, Edit, FileText, ShieldCheck, Mail, Globe, MapPin, Phone, RefreshCw, X, ShieldAlert, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuditLogEntry {
  date: string;
  activity: string;
  action: string;
  performedBy: string;
  reason: string;
  version: string;
}

export default function SupplierDetailPage() {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState<SupplierDetail | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [supplierStatus, setSupplierStatus] = useState('Active');
  
  // Sensitive Action Modal States
  const [activeModal, setActiveModal] = useState<'restrict' | 'suspend' | null>(null);
  const [reason, setReason] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [recordVersion, setRecordVersion] = useState('v1.0.3');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    { date: '04 Aug 2026, 09:30 AM', activity: 'KYC Document Approval', action: 'Approved', performedBy: 'Elena Vance (Compliance)', reason: 'Tax registration & incorporation docs validated.', version: 'v1.0.2' },
    { date: '01 Aug 2026, 11:20 AM', activity: 'Supplier Onboarding Draft', action: 'Created', performedBy: 'Elena Vance (Compliance)', reason: 'Initial ingestion of supplier application files.', version: 'v1.0.1' },
  ]);

  useEffect(() => {
    if (supplierId) {
      suppliersApi.getSupplierById(supplierId as string).then((data) => {
        setSupplier(data);
        if (data) {
          setSupplierStatus(data.contractStatus || 'Active');
        }
      });
    }
  }, [supplierId]);

  if (!supplier) {
    return <div className="p-8 text-center text-gray-500">Loading supplier details...</div>;
  }

  const tabs = [
    'Overview', 'Company Profile', 'Verification & Documents', 'Brands & Authorizations',
    'Products & Catalogue', 'Contracts & Commercial', 'Finance & Settlement', 
    'Performance & SLA', 'Risk & Compliance', 'Eligibility', 'Users & Access', 
    'Cases & Activity', 'Audit History'
  ];

  const handleActionClick = (type: 'restrict' | 'suspend') => {
    // Permission validation check
    const userRole = 'system_admin'; // simulation
    if (userRole !== 'system_admin' && userRole !== 'compliance_manager') {
      toast.error('Access Denied: You do not have permissions to restrict or suspend this supplier.');
      return;
    }
    setActiveModal(type);
    setReason('');
    setAcknowledged(false);
  };

  const handleActionExecute = () => {
    if (!reason.trim()) {
      toast.error('Please enter a reason for this sensitive action.');
      return;
    }
    if (!acknowledged) {
      toast.error('Please acknowledge the operational impact to continue.');
      return;
    }

    setExecuting(true);
    
    // Simulate API persistence & success logging
    setTimeout(() => {
      const now = new Date();
      const timestamp = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + 
                        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      const newVersion = `v1.0.${parseInt(recordVersion.split('.')[2]) + 1}`;
      const actionName = activeModal === 'restrict' ? 'Restricted' : 'Suspended';

      // Update state
      setSupplierStatus(actionName);
      setRecordVersion(newVersion);

      // Append to audit logs
      setAuditLogs(prev => [
        {
          date: timestamp,
          activity: `Supplier Status Update: ${actionName}`,
          action: actionName,
          performedBy: 'System Administrator (me)',
          reason: reason,
          version: newVersion
        },
        ...prev
      ]);

      setExecuting(false);
      setActiveModal(null);
      toast.success(`Supplier has been successfully ${actionName.toLowerCase()}!`);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f8fafc] overflow-hidden relative">
      {/* Warning banner */}
      <div className="bg-orange-50 border-b border-orange-200 px-6 py-2 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2 text-orange-800 text-sm">
          <AlertTriangle size={16} />
          <span>This supplier record is being viewed by multiple users. Please refresh before making edits to ensure you have the latest information.</span>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-orange-900 bg-white border border-orange-200 rounded px-3 py-1 hover:bg-orange-100">
          <RefreshCw size={12} /> Refresh Now
        </button>
      </div>

      <div className="flex h-full w-full overflow-hidden">
        <div className="flex-1 overflow-auto p-6 flex flex-col">
          
          {/* Custom Header for Detail Page */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">
              <a href="/admin/brands-suppliers" className="hover:text-gray-900 transition-colors">Brands & Suppliers</a>
              <span>/</span>
              <a href="/admin/brands-suppliers/suppliers" className="hover:text-gray-900 transition-colors">Suppliers</a>
              <span>/</span>
              <span className="text-gray-900 font-medium">Supplier Detail</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <div className="text-[#7a122e] font-bold text-3xl">♦</div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold text-gray-900">{supplier.name}</h1>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                      supplierStatus === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                      supplierStatus === 'Suspended' ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {supplierStatus}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Verified</span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">Low Risk</span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-900 text-white">Tier A</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Public Ref: {supplier.id} • Version: {recordVersion} • Premier distributor of luxury cosmetics and skincare products.</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <ShieldCheck size={16} /> View Brand Authorizations
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <AlertCircle size={16} /> Start Verification Review
                </button>
                <a
                  href={`/admin/brands-suppliers/suppliers/${supplierId}/edit`}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#7a122e] hover:bg-[#5a0d22] rounded-md transition-colors shadow-sm"
                >
                  <Edit size={16} /> Edit Supplier
                </a>
              </div>
            </div>

            {/* Business Context Bar Inline */}
            <div className="mt-2 p-3 bg-white border border-gray-200 rounded-md shadow-sm grid grid-cols-5 gap-4 text-xs">
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Tenant</span><span className="font-medium">SL Beauty</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Ecosystem</span><span className="font-medium">Beauty Marketplace</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Business Unit</span><span className="font-medium">{supplier.bu}</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Sales Channels</span><span className="font-medium">Marketplace, Mobile App, B2B</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Region</span><span className="font-medium">{supplier.country}</span></div>
            </div>
            
            {/* Metadata Bar Inline */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md flex flex-wrap gap-x-8 gap-y-3 text-xs">
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Legal Company Name</span><span className="font-medium text-gray-900">{supplier.legalCompany}</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Supplier Type</span><span className="font-medium text-gray-900">{supplier.type}</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Registration No.</span><span className="font-medium text-gray-900">{supplier.registrationNo}</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Tax Number</span><span className="font-medium text-gray-900">{supplier.taxNumber}</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Primary Contact</span>
                <span className="font-medium text-gray-900">{supplier.primaryContact.name}</span>
                <span className="text-[10px] text-gray-500">{supplier.primaryContact.email} | {supplier.primaryContact.phone}</span>
              </div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Country / City</span><span className="font-medium text-gray-900">{supplier.country}, Colombo</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Onboarding Date</span><span className="font-medium text-gray-900">{supplier.onboardingDate}</span></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 mb-6 px-2 overflow-x-auto">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#7a122e] text-[#7a122e]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content - Overview Layout (BS03) */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Supplier Profile */}
              <div className="col-span-1 border border-gray-200 bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Supplier Profile</h3>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center mb-3">
                    <div className="text-[#7a122e] font-bold text-3xl">♦</div>
                  </div>
                  <h4 className="font-medium text-gray-900 text-center">{supplier.name}</h4>
                  <span className="text-xs text-gray-500">{supplier.id}</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span>Colombo, Sri Lanka</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Mail size={14} className="mt-0.5 shrink-0" />
                    <span className="truncate">{supplier.primaryContact.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Phone size={14} className="mt-0.5 shrink-0" />
                    <span>{supplier.primaryContact.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Globe size={14} className="mt-0.5 shrink-0" />
                    <span>www.luxedistribution.lk</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="col-span-1 lg:col-span-2 xl:col-span-3 border border-gray-200 bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  <div className="border border-gray-100 rounded-md p-3 bg-gray-50 flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">Active Brands</span>
                    <span className="text-2xl font-bold text-gray-900">{supplier.activeBrands}</span>
                  </div>
                  <div className="border border-gray-100 rounded-md p-3 bg-gray-50 flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">Active Authorizations</span>
                    <span className="text-2xl font-bold text-gray-900">11</span>
                  </div>
                  <div className="border border-gray-100 rounded-md p-3 bg-gray-50 flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">Active Products</span>
                    <span className="text-2xl font-bold text-gray-900">{supplier.activeProducts}</span>
                  </div>
                  <div className="border border-gray-100 rounded-md p-3 bg-gray-50 flex flex-col">
                    <span className="text-xs text-green-600 font-medium mb-1 flex items-center gap-1"><CheckCircle size={12}/> Publication-Ready Products</span>
                    <span className="text-2xl font-bold text-green-700">402</span>
                  </div>
                  <div className="border border-gray-100 rounded-md p-3 bg-gray-50 flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">Active Contracts</span>
                    <span className="text-2xl font-bold text-gray-900">8</span>
                  </div>
                  <div className="border border-gray-100 rounded-md p-3 bg-red-50 border-red-100 flex flex-col">
                    <span className="text-xs text-red-600 font-medium mb-1">Contract Renewals Due</span>
                    <span className="text-2xl font-bold text-red-700">2</span>
                  </div>
                  <div className="border border-gray-100 rounded-md p-3 bg-orange-50 border-orange-100 flex flex-col">
                    <span className="text-xs text-orange-600 font-medium mb-1">Open Verification Issues</span>
                    <span className="text-2xl font-bold text-orange-700">4</span>
                  </div>
                  <div className="border border-gray-100 rounded-md p-3 bg-orange-50 border-orange-100 flex flex-col">
                    <span className="text-xs text-orange-600 font-medium mb-1">Open Compliance Cases</span>
                    <span className="text-2xl font-bold text-orange-700">2</span>
                  </div>
                </div>
              </div>

              {/* Overview timeline */}
              <div className="col-span-1 md:col-span-2 xl:col-span-4 border border-gray-200 bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Supplier Lifecycle Timeline</h3>
                <div className="relative border-l border-gray-200 ml-4 pl-6 space-y-6 text-xs">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-white flex items-center justify-center" />
                    <p className="font-semibold text-gray-800">Compliance Verification Complete</p>
                    <span className="text-[10px] text-gray-400">04 Aug 2026, 09:30 AM • System Engine</span>
                    <p className="text-gray-500 mt-1">All primary documents, certificates, and commercial declarations are verified.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center" />
                    <p className="font-semibold text-gray-800">Brand Relationships Connected</p>
                    <span className="text-[10px] text-gray-400">02 Aug 2026, 03:15 PM • Elena Vance</span>
                    <p className="text-gray-500 mt-1">{"L'Oréal, Aurora Skin, and Lumière Labs brand authorization tokens activated."}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center" />
                    <p className="font-semibold text-gray-800">Onboarding Initiated</p>
                    <span className="text-[10px] text-gray-400">01 Aug 2026, 11:20 AM • Elena Vance</span>
                    <p className="text-gray-500 mt-1">Draft state created; verification checklist started.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content - Audit History */}
          {activeTab === 'Audit History' && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">Security & Status Audit History</h3>
                <span className="text-xs text-gray-500 font-medium">Record Version: {recordVersion}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 uppercase font-medium">
                    <tr>
                      <th className="px-5 py-3">Date & Time</th>
                      <th className="px-5 py-3">Activity Domain</th>
                      <th className="px-5 py-3 text-center">Action</th>
                      <th className="px-5 py-3">Performed By</th>
                      <th className="px-5 py-3">Justification Reason</th>
                      <th className="px-5 py-3 text-center">Version</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {auditLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{log.date}</td>
                        <td className="px-5 py-3 font-semibold text-gray-900">{log.activity}</td>
                        <td className="px-5 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            log.action === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                            log.action === 'Created' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            log.action === 'Restricted' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-700 font-medium">{log.performedBy}</td>
                        <td className="px-5 py-3 text-gray-500">{log.reason}</td>
                        <td className="px-5 py-3 text-center font-bold text-gray-800">{log.version}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== 'Overview' && activeTab !== 'Audit History' && (
            <div className="flex-1 flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-12 text-gray-400 bg-white">
              Tab &quot;{activeTab}&quot; detail widgets will load here. Check Overview or Audit History tab for live actions.
            </div>
          )}
        </div>

        <RightInsightRail>
          <RailSection title="Supplier Health">
            <RailHealthScore 
              score={supplierStatus === 'Active' ? 92 : supplierStatus === 'Restricted' ? 64 : 35} 
              label={supplierStatus === 'Active' ? 'Excellent' : supplierStatus === 'Restricted' ? 'Needs Attention' : 'Critical'}
              status={supplierStatus === 'Active' ? 'Stable' : supplierStatus === 'Restricted' ? 'Needs Attention' : 'Critical'} 
              metrics={[
                { label: 'Profile Completeness', value: '100%' },
                { label: 'Verification Coverage', value: '96%' },
                { label: 'Authorization Coverage', value: '92%' },
                { label: 'Contract Coverage', value: '100%' },
                { label: 'Catalogue Readiness', value: '94%' },
                { label: 'Performance Compliance', value: '91%' },
                { label: 'Risk Control', value: supplierStatus === 'Active' ? '90%' : '50%' },
              ]} 
            />
          </RailSection>

          <RailSection title="Current Supplier State">
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`font-semibold ${supplierStatus === 'Active' ? 'text-green-600' : supplierStatus === 'Restricted' ? 'text-orange-600' : 'text-red-600'}`}>{supplierStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Verification State</span>
                <span className="text-green-600 font-medium">Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Authorization State</span>
                <span className="text-green-600 font-medium">Authorized</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Contract State</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Catalogue Readiness</span>
                <span className="text-green-600 font-medium">Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Risk Level</span>
                <span className="text-green-600 font-medium">Low</span>
              </div>
            </div>
          </RailSection>

          <RailSection title="Priority Issues" action={{ label: 'View all' }}>
            <RailAlertList items={[
              { label: 'Insurance Expiry', count: 2, critical: true },
              { label: 'Brand Authorization Expiry', count: 1, critical: true },
              { label: 'Document Renewal Due', count: 1, critical: false },
              { label: 'Contract Renewal Due', count: 1, critical: true },
              { label: 'KYC Update Required', count: 2, critical: false },
            ]} />
          </RailSection>

          <RailSection title="Final Supplier Actions">
            <div className="flex flex-col gap-2">
              <a href={`/admin/brands-suppliers/suppliers/${supplierId}/edit`} className="w-full text-center py-2 bg-[#7a122e] text-white rounded text-sm font-medium hover:bg-[#5a0d22] transition-colors">
                Edit Supplier
              </a>
              <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Start Verification Review
              </button>
              <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Add Brand Relationship
              </button>
              <button 
                onClick={() => handleActionClick('restrict')}
                disabled={supplierStatus === 'Restricted'}
                className="w-full py-2 bg-white border border-red-300 text-red-600 rounded text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Restrict Supplier
              </button>
              <button 
                onClick={() => handleActionClick('suspend')}
                disabled={supplierStatus === 'Suspended'}
                className="w-full py-2 bg-white border border-red-600 text-red-700 rounded text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suspend Supplier
              </button>
              
              {/* Reset to Active helper button (useful for user testing/resetting state!) */}
              {(supplierStatus === 'Restricted' || supplierStatus === 'Suspended') && (
                <button 
                  onClick={() => {
                    setSupplierStatus('Active');
                    toast.success('Supplier reset back to Active status!');
                  }}
                  className="w-full py-1 bg-green-50 text-green-700 text-xs font-semibold rounded border border-green-200 hover:bg-green-100 transition-colors"
                >
                  Reset Status to Active
                </button>
              )}

              <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 flex gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p>All supplier status changes, verification decisions, authorization actions, restrictions and suspensions require a reason and are recorded in the audit history.</p>
              </div>
            </div>
          </RailSection>
        </RightInsightRail>
      </div>

      {/* Sensitive Action Modal Dialog */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <header className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-red-50 text-[#7a122e]">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldAlert size={18} />
                <span>Execute Sensitive Action: {activeModal === 'restrict' ? 'Restrict' : 'Suspend'} Supplier</span>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)} 
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </header>

            <div className="p-5 flex flex-col gap-4 text-xs">
              <div className="bg-orange-50 border border-orange-200 rounded p-3 text-orange-900 flex gap-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Dependency & Impact Analysis:</span>
                  {activeModal === 'restrict' ? (
                    <span>Restricting {supplier.name} will immediately put all 186 associated product variants into &apos;DRAFT&apos; status and lock them from public sales channels.</span>
                  ) : (
                    <span>Suspending {supplier.name} will suspend all sales channels, revoke all 11 brand authorizations, and block any finance settlements until audit clearance.</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 bg-gray-50 border border-gray-100 rounded p-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Record Identifier:</span>
                  <span className="font-semibold text-gray-800">{supplier.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Last Known Version:</span>
                  <span className="font-semibold text-gray-800">{recordVersion}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-800">Justification Reason (Required):</label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide a detailed reason for audit logs..."
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:border-[#7a122e] h-20 resize-none"
                  required
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-0.5 accent-[#7a122e]"
                />
                <span className="text-gray-600 font-medium leading-tight">
                  I acknowledge the operational impact analysis and confirm I am executing this status override.
                </span>
              </label>
            </div>

            <footer className="px-5 py-3 border-t border-gray-100 flex items-center justify-end gap-2 bg-gray-50">
              <button 
                type="button" 
                onClick={() => setActiveModal(null)} 
                className="px-3 py-1.5 border border-gray-300 text-gray-700 bg-white rounded font-medium text-xs hover:bg-gray-50 transition-colors"
                disabled={executing}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleActionExecute}
                className="px-4 py-1.5 bg-[#7a122e] text-white rounded font-medium text-xs hover:bg-[#5a0d22] transition-colors flex items-center gap-1.5"
                disabled={executing}
              >
                {executing ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Check size={14} />
                    <span>Confirm & Commit</span>
                  </>
                )}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
