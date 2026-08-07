"use client";

import React, { useState } from 'react';
import { 
  Building2, CheckCircle2, AlertTriangle, Clock, RefreshCw, 
  FileText, ShieldAlert, ArrowRight, Upload, ChevronDown, Check, Lock
} from 'lucide-react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';

const CONTEXT_ITEMS = [
  { label: 'Tenant', value: 'SL Beauty' },
  { label: 'Ecosystem', value: 'Beauty Marketplace' },
  { label: 'Business Unit', value: 'Consumer Beauty' },
  { label: 'Sales Channels', value: 'Marketplace, Mobile App, B2B' },
  { label: 'Region', value: 'Sri Lanka' },
  { label: 'Currency', value: 'LKR' },
  { label: 'Form Mode', value: 'Edit Draft' },
  { label: 'Draft ID', value: 'SUP-DRAFT-2026-0042' },
  { label: 'Record Version', value: 'v0.6' },
];

const STEPPER = [
  { step: 1, label: 'Company Identity', current: true },
  { step: 2, label: 'Legal Registration' },
  { step: 3, label: 'Supplier Classification' },
  { step: 4, label: 'Contacts & Ownership' },
  { step: 5, label: 'Business Units' },
  { step: 6, label: 'Channels & Regions' },
  { step: 7, label: 'Brands & Relationships' },
  { step: 8, label: 'Documents & Certificates' },
  { step: 9, label: 'Finance & Settlement' },
  { step: 10, label: 'Contracts & Commercial' },
  { step: 11, label: 'Catalogue Responsibilities' },
  { step: 12, label: 'Users & Access' },
  { step: 13, label: 'Review & Submit' },
];

const CROSS_STEP_SUMMARY = [
  { step: 1, label: 'Company Identity', pct: '92%', status: 'Complete', color: 'text-green-600 border-green-200 bg-green-50' },
  { step: 2, label: 'Legal Registration', pct: '78%', status: 'Partial', color: 'text-amber-600 border-amber-200 bg-amber-50' },
  { step: 3, label: 'Supplier Classification', pct: '88%', status: 'Complete', color: 'text-green-600 border-green-200 bg-green-50' },
  { step: 4, label: 'Contacts & Ownership', pct: '80%', status: 'Partial', color: 'text-amber-600 border-amber-200 bg-amber-50' },
  { step: 5, label: 'Business Units', pct: '100%', status: 'Complete', color: 'text-green-600 border-green-200 bg-green-50' },
  { step: 6, label: 'Channels & Regions', pct: '84%', status: 'Partial', color: 'text-amber-600 border-amber-200 bg-amber-50' },
  { step: 7, label: 'Brands & Relationships', pct: '66%', status: 'Partial', color: 'text-amber-600 border-amber-200 bg-amber-50' },
  { step: 8, label: 'Documents & Certificates', pct: '71%', status: 'Partial', color: 'text-amber-600 border-amber-200 bg-amber-50' },
  { step: 9, label: 'Finance & Settlement', pct: '60%', status: 'Partial', color: 'text-amber-600 border-amber-200 bg-amber-50' },
  { step: 10, label: 'Contracts & Commercial', pct: '54%', status: 'Partial', color: 'text-amber-600 border-amber-200 bg-amber-50' },
  { step: 11, label: 'Catalogue Responsibilities', pct: '83%', status: 'Complete', color: 'text-green-600 border-green-200 bg-green-50' },
  { step: 12, label: 'Users & Access', pct: '40%', status: 'Blocked', color: 'text-red-600 border-red-200 bg-red-50' },
  { step: 13, label: 'Review & Submit', pct: '0%', status: 'Not Ready', color: 'text-gray-500 border-gray-200 bg-gray-50' },
];

export default function SupplierOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-16">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4">
        
        {/* Page Header */}
        <div className="text-[11px] text-gray-500 font-medium mb-1">Brands &amp; Suppliers / Supplier Onboarding / SUP-DRAFT-2026-0042</div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Supplier Onboarding / Edit</h1>
            <p className="text-xs text-gray-500 mt-0.5">Configure supplier identity, legal registration, channel eligibility, brand relationships, documents, contracts, users, and submission readiness across the beauty marketplace.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-bold">Edit Draft</span>
            <span className="text-xs text-gray-500 font-semibold">v0.6</span>
          </div>
        </div>

        {/* Context Scope Bar */}
        <ContextScopeBar 
          items={CONTEXT_ITEMS} 
          lastSynced="04 Aug 2026, 12:57 AM" 
          accessNote="Access limited to assigned business context"
        />

        {/* 13-Step Horizontal Stepper Header */}
        <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[1100px]">
            {STEPPER.map((s, idx) => (
              <div key={s.step} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    s.current ? 'bg-[#7a0023] text-white ring-4 ring-[#7a0023]/10' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {s.step}
                  </div>
                  <span className={`text-[10px] font-semibold truncate max-w-[80px] text-center ${s.current ? 'text-[#7a0023]' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < STEPPER.length - 1 && (
                  <div className="w-6 h-0.5 bg-gray-200 mx-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Completeness Summary Row */}
        <div className="grid grid-cols-8 gap-3 mb-4">
          <div className="bg-white border border-gray-200 rounded-md p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xs">82%</div>
            <div>
              <div className="text-[10px] text-gray-400">Overall</div>
              <div className="text-[11px] font-bold text-gray-900">Completeness</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-3"><div className="text-[10px] text-gray-500">Required Fields</div><div className="text-base font-bold text-gray-900 mt-0.5">96 / 128</div></div>
          <div className="bg-white border border-gray-200 rounded-md p-3"><div className="text-[10px] text-gray-500">Optional Fields</div><div className="text-base font-bold text-gray-900 mt-0.5">24 / 42</div></div>
          <div className="bg-white border border-gray-200 rounded-md p-3"><div className="text-[10px] text-gray-500">Open Validation</div><div className="text-base font-bold text-amber-600 mt-0.5">7</div></div>
          <div className="bg-white border border-gray-200 rounded-md p-3"><div className="text-[10px] text-gray-500">Blocking Issues</div><div className="text-base font-bold text-red-600 mt-0.5">3</div></div>
          <div className="bg-white border border-gray-200 rounded-md p-3"><div className="text-[10px] text-gray-500">Warnings</div><div className="text-base font-bold text-amber-600 mt-0.5">6</div></div>
          <div className="bg-white border border-gray-200 rounded-md p-3"><div className="text-[10px] text-gray-500">Autosave Status</div><div className="text-xs font-bold text-green-600 mt-0.5">Saved</div></div>
          <div className="bg-white border border-gray-200 rounded-md p-3"><div className="text-[10px] text-gray-500">Current Step</div><div className="text-xs font-bold text-gray-900 mt-0.5">Company Identity</div></div>
        </div>

        {/* Concurrency Banner */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded-md text-[11px] flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-600" />
            <span>This supplier draft was updated by Marcus Lee 4 minutes ago. Refresh before continuing to avoid overwriting recent changes.</span>
          </div>
          <button className="bg-white border border-amber-300 text-amber-900 px-2.5 py-0.5 rounded text-[10px] font-semibold hover:bg-amber-100">
            Refresh Now
          </button>
        </div>

        {/* Main Step Form: 1. Company Identity */}
        <div className="bg-white border border-gray-200 rounded-md p-5 mb-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">1. Company Identity</h2>
            <div className="bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5">
              <AlertTriangle size={12} className="text-amber-600" />
              Potential duplicate match: Luxe Distributors Lanka (86% similarity)
              <button className="underline font-bold ml-1">Compare</button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            
            {/* Logo Upload Box */}
            <div className="col-span-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md p-6 bg-gray-50 text-center">
              <div className="w-12 h-12 bg-red-100 text-red-800 rounded-full flex items-center justify-center mb-2">
                <Upload size={20} />
              </div>
              <span className="text-xs font-bold text-gray-700">Drag &amp; drop or click to upload</span>
              <span className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 2MB</span>
            </div>

            {/* Inputs Grid */}
            <div className="col-span-9 grid grid-cols-3 gap-4 text-[11px]">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Supplier Display Name *</label>
                <input type="text" defaultValue="Luxe Distribution Pvt Ltd" className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Legal Company Name *</label>
                <input type="text" defaultValue="Luxe Distribution (Pvt) Ltd" className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Trading Name</label>
                <input type="text" defaultValue="Luxe Distribution" className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Proposed Supplier ID</label>
                <input type="text" defaultValue="SUP-DRAFT-2026-0042" disabled className="w-full px-3 py-1.5 border border-gray-200 bg-gray-50 rounded text-xs text-gray-500 font-mono" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Company Type</label>
                <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none bg-white">
                  <option>Distributor</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Parent Company</label>
                <input type="text" defaultValue="None" className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Year Established</label>
                <input type="text" defaultValue="2014" className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Employee Range</label>
                <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none bg-white">
                  <option>51–200</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Revenue Band</label>
                <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#7a0023] outline-none bg-white">
                  <option>LKR 500M – 1B</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Cross-Step Summary Bar */}
        <div className="bg-white border border-gray-200 rounded-md p-3 mb-4">
          <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">Cross-Step Summary</h3>
          <div className="grid grid-cols-13 gap-1.5 text-center">
            {CROSS_STEP_SUMMARY.map((cs) => (
              <div key={cs.step} className={`p-2 border rounded flex flex-col justify-between h-20 ${cs.color}`}>
                <div className="text-[9px] font-bold line-clamp-2 leading-tight">{cs.step}. {cs.label}</div>
                <div className="text-xs font-extrabold my-1">{cs.pct}</div>
                <div className="text-[8px] font-bold uppercase">{cs.status}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT INTELLIGENCE RAIL */}
      <RightIntelligenceRail>
        <RailSection title="Supplier Onboarding Health">
          <HealthScoreGauge 
            score={82} 
            label="Needs Attention" 
            statusText="Needs Attention"
            statusColor="#eab308"
            metrics={[
              { label: 'Identity', value: '94%', progress: 94 },
              { label: 'Legal', value: '81%', progress: 81 },
              { label: 'Classification', value: '88%', progress: 88 },
              { label: 'Contacts', value: '84%', progress: 84 },
              { label: 'Channel Eligibility', value: '86%', progress: 86 },
            ]}
          />
        </RailSection>

        <RailSection title="Required Fields">
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span className="text-gray-500">Completed</span><span className="font-bold text-gray-900">96</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Remaining</span><span className="font-bold text-gray-900">32</span></div>
            <div className="flex justify-between border-t border-gray-100 pt-1"><span className="text-gray-500">Required Missing</span><span className="font-bold text-red-600">12</span></div>
          </div>
        </RailSection>

        <RailSection title="Blocking Issues (3)">
          <div className="space-y-1 text-[10px] text-red-600 font-semibold">
            <div>• Insurance certificate expired</div>
            <div>• Beneficial owner declaration missing</div>
            <div>• B2B channel owner not assigned</div>
          </div>
        </RailSection>

        <RailSection title="Final Actions">
          <div className="flex flex-col gap-2 mt-2">
            <button className="bg-[#7a0023] text-white py-1.5 rounded text-[11px] font-semibold hover:bg-[#a0002b]">Save Draft</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Validate Supplier</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Preview Supplier</button>
            <button className="border border-gray-300 text-gray-700 py-1.5 rounded text-[11px] font-semibold hover:bg-gray-50">Save &amp; Continue</button>
            <button className="bg-gray-200 text-gray-400 py-1.5 rounded text-[11px] font-semibold cursor-not-allowed">Submit for Verification 🔒</button>
          </div>
        </RailSection>
      </RightIntelligenceRail>

      {/* FIXED BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2.5 flex items-center justify-between z-40 shadow-lg text-[12px]">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-900">Step 1/13 — Company Identity</span>
          <span className="text-green-600 font-semibold flex items-center gap-1"><Check size={14} /> Saved 2 minutes ago</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-semibold">Cancel</button>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-semibold">Back</button>
          <button className="px-4 py-1.5 bg-[#7a0023] text-white rounded font-semibold hover:bg-[#a0002b]">Save Draft</button>
          <button className="px-4 py-1.5 bg-[#7a0023] text-white rounded font-semibold hover:bg-[#a0002b]">Save &amp; Continue</button>
          <button className="px-4 py-1.5 bg-[#7a0023] text-white rounded font-semibold hover:bg-[#a0002b]">Validate</button>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-semibold">Preview</button>
          <button className="px-4 py-1.5 bg-gray-200 text-gray-400 rounded font-semibold cursor-not-allowed">Submit Changes 🔒</button>
        </div>
      </div>

    </div>
  );
}
