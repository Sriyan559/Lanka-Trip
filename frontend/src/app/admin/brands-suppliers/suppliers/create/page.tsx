"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, CheckCircle2, AlertTriangle, Clock, RefreshCw, 
  Upload, Check, ArrowRight
} from 'lucide-react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
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

const STEPPER = [
  { step: 1, label: 'Company Identity', current: true },
  { step: 2, label: 'Legal Registration' },
  { step: 3, label: 'Supplier Classification' },
  { step: 4, label: 'Contacts & Ownership' },
  { step: 5, label: 'Business Units' },
  { step: 6, label: 'Review & Submit' },
];

export default function SupplierOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    legal_name: '',
    email: '',
    phone: '',
    business_type: 'distributor',
    country: 'Sri Lanka',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name || !formData.email) {
      alert('Please fill in required fields: Supplier Display Name and Email.');
      return;
    }

    setSaving(true);
    try {
      const res = await brandsSuppliersApi.createSupplier(formData);
      alert('Supplier draft created successfully in database!');
      router.push('/admin/brands-suppliers/suppliers');
    } catch (err: any) {
      console.error('Save failed:', err);
      alert(err?.message || 'Failed to save supplier to backend.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-16">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Page Header */}
        <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Supplier Onboarding / Create New</div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Onboarding / Create</h1>
            <p className="text-xs text-gray-500 mt-0.5">Configure supplier identity, legal registration, business units, and submission readiness across the beauty marketplace.</p>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar items={CONTEXT_ITEMS} lastSynced="Just now" accessNote="Access limited to assigned business context" />

        {/* Stepper Header */}
        <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px]">
            {STEPPER.map((s, idx) => (
              <div key={s.step} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    s.current ? 'bg-[#7a0023] text-white ring-4 ring-[#7a0023]/10' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {s.step}
                  </div>
                  <span className={`text-[10px] font-semibold truncate max-w-[100px] text-center ${s.current ? 'text-[#7a0023]' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < STEPPER.length - 1 && <div className="w-6 h-0.5 bg-gray-200 mx-1"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Main Step Form */}
        <div className="bg-white border border-gray-200 rounded-md p-5 mb-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">1. Company Identity &amp; Details</h2>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 grid grid-cols-3 gap-4 text-[11px]">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Supplier Display Name *</label>
                <input 
                  type="text" 
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="e.g. Luxe Cosmetics"
                  required
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" 
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Legal Company Name</label>
                <input 
                  type="text" 
                  name="legal_name"
                  value={formData.legal_name}
                  onChange={handleChange}
                  placeholder="e.g. Luxe Cosmetics (Pvt) Ltd"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" 
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="supplier@domain.com"
                  required
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" 
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+94 11 234 5678"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" 
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Company Type</label>
                <select 
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none bg-white"
                >
                  <option value="distributor">Distributor</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="wholesaler">Wholesaler</option>
                  <option value="brand_owner">Brand Owner</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Country</label>
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Onboarding Health">
          <HealthScoreGauge score={100} label="Ready" statusText="Complete" statusColor="#16a34a" metrics={[]} />
        </RailSection>

        <RailSection title="Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button 
              type="submit"
              disabled={saving}
              className="bg-[#7a0023] text-white py-2 rounded text-[11px] font-semibold hover:bg-[#a0002b] disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Create & Save Supplier'}
            </button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2.5 flex items-center justify-between z-40 shadow-lg text-[12px]">
        <span className="font-bold text-gray-900">Step 1 — Company Identity</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => router.back()} className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 font-semibold">Cancel</button>
          <button type="submit" disabled={saving} className="px-4 py-1.5 bg-[#7a0023] text-white rounded font-semibold hover:bg-[#a0002b]">
            {saving ? 'Saving...' : 'Save & Submit'}
          </button>
        </div>
      </div>

    </form>
  );
}
