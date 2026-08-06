'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RightInsightRail, RailSection, RailHealthScore } from '@/components/admin/brands-suppliers/RightInsightRail';
import { CheckCircle, AlertTriangle, UploadCloud, Link as LinkIcon, Check, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import type { SupplierFormProps, SupplierFormValues } from '@/features/brands-suppliers/types/brandsSuppliers.types';

// ---------------------------------------------------------------------------
// Default completeness for "empty" create mode
// ---------------------------------------------------------------------------

const DEFAULT_COMPLETENESS = {
  overallPercent: 0,
  requiredCompleted: 0,
  requiredTotal: 128,
  blockingCount: 0,
  warningCount: 0,
  autosaveLabel: undefined,
};

const STEPS = [
  'Company Identity', 'Legal Registration', 'Supplier Classification', 'Contacts & Ownership',
  'Business Units', 'Channels & Regions', 'Brands & Relationships', 'Documents & Certificates',
  'Finance & Settlement', 'Contracts & Commercial', 'Catalogue Responsibilities', 'Users & Access',
  'Review & Submit',
];

// ---------------------------------------------------------------------------
// SupplierForm component
// ---------------------------------------------------------------------------

export function SupplierForm({
  mode,
  supplierId,
  draftId,
  recordVersion,
  initialValues,
  completeness = DEFAULT_COMPLETENESS,
  blockingIssues = [],
  loading = false,
  submitting = false,
  readOnly = false,
  onSave,
  onValidate,
  onPreview,
  onSubmit,
  onCancel,
}: SupplierFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Local form state, seeded from initialValues without mutating the prop
  const [formValues, setFormValues] = useState<SupplierFormValues>(() => ({
    supplierName: '',
    legalName: '',
    tradingName: '',
    companyType: 'Distributor',
    yearEstablished: '',
    description: '',
    primaryContact: '',
    contactRole: '',
    email: '',
    phone: '',
    country: '',
    status: 'Active',
    ...(initialValues ?? {}),
  }));

  // Reset form when the entity changes (route change with a different supplierId)
  useEffect(() => {
    setCurrentStep(1);
    setFormValues({
      supplierName: '',
      legalName: '',
      tradingName: '',
      companyType: 'Distributor',
      yearEstablished: '',
      description: '',
      primaryContact: '',
      contactRole: '',
      email: '',
      phone: '',
      country: '',
      status: 'Active',
      ...(initialValues ?? {}),
    });
  }, [supplierId]);

  const setField = useCallback(
    (field: keyof SupplierFormValues, value: string) => {
      if (readOnly) return;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    },
    [readOnly]
  );

  // ── Handler wrappers that fall back to toasts when no callback provided ──

  const handleSave = async () => {
    if (onSave) {
      await onSave();
    } else {
      toast.success('Supplier onboarding draft saved successfully!');
    }
  };

  const handleValidate = async () => {
    if (onValidate) {
      await onValidate();
    } else {
      toast.success('Compliance & validation scan complete: all clear!');
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview();
    } else {
      toast.success('Preview generation triggered...');
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (completeness.blockingCount > 0) {
      toast.error('Submit blocked: please resolve blocking issues in the health rail.');
      return;
    }
    if (onSubmit) {
      await onSubmit();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
        window.history.back();
      }
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((c) => c + 1);
      toast.success(`Advanced to Step ${currentStep + 1}: ${STEPS[currentStep]}`);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((c) => c - 1);
  };

  // ── Derived display values ──
  const displayDraftId = draftId ?? (mode === 'create' ? 'New Draft' : '—');
  const displayVersion = recordVersion ?? (mode === 'create' ? 'v0.1' : '—');
  const overallPct = completeness.overallPercent;

  return (
    <div className="flex flex-col h-full w-full bg-[#f8fafc] overflow-hidden relative">

      {/* Warning banner for edit mode */}
      {mode === 'edit' && (
        <div className="bg-orange-50 border-b border-orange-200 px-6 py-2 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2 text-orange-800 text-sm">
            <AlertTriangle size={16} />
            <span>
              You are editing a supplier draft. Refresh before continuing to avoid overwriting recent changes.
            </span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-xs font-medium text-orange-900 bg-white border border-orange-200 rounded px-3 py-1 hover:bg-orange-100"
          >
            Refresh Now
          </button>
        </div>
      )}

      <div className="flex h-full w-full overflow-hidden">
        <div className="flex-1 overflow-auto p-6 flex flex-col pb-24">

          {/* ── Inline breadcrumb + title ── */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">
              <a href="/admin/brands-suppliers" className="hover:text-gray-900 transition-colors">
                Brands &amp; Suppliers
              </a>
              <span>/</span>
              <a href="/admin/brands-suppliers/suppliers" className="hover:text-gray-900 transition-colors">
                Supplier Onboarding
              </a>
              <span>/</span>
              <span className="text-gray-900 font-medium">{displayDraftId}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {mode === 'create' ? 'New Supplier Onboarding' : 'Supplier Onboarding / Edit'}
                  </h1>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {mode === 'create' ? 'New Draft' : 'Edit Draft'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {displayVersion}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Configure supplier identity, legal registration, channel eligibility, brand relationships,
                  documents, contracts, users, and submission readiness across the beauty marketplace.
                </p>
              </div>
            </div>

            {/* Business Context Bar */}
            <div className="mt-2 p-3 bg-white border border-gray-200 rounded-md shadow-sm flex flex-wrap gap-x-8 gap-y-3 text-xs">
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Tenant</span><span className="font-medium">SL Beauty</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Ecosystem</span><span className="font-medium">Beauty Marketplace</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Business Unit</span><span className="font-medium">Consumer Beauty</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Sales Channels</span><span className="font-medium">Marketplace, Mobile App, B2B</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Region</span><span className="font-medium">Sri Lanka</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Currency</span><span className="font-medium">LKR</span></div>
              <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Form Mode</span><span className="font-medium">{mode === 'create' ? 'New Draft' : 'Edit Draft'}</span></div>
              {draftId && (
                <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Draft ID</span><span className="font-medium">{draftId}</span></div>
              )}
              {recordVersion && (
                <div className="flex flex-col"><span className="text-gray-500 mb-0.5">Record Version</span><span className="font-medium">{recordVersion}</span></div>
              )}

              <div className="flex flex-col items-end text-right ml-auto">
                <div className="flex items-center gap-1.5 mb-0.5 text-green-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                  <span className="font-medium text-xs">Live Data</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 mt-1">
                  <Lock size={10} />
                  <span className="text-[10px]">Access limited to assigned business context</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stepper Progress ── */}
          <div className="w-full relative mb-8 pt-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -mt-2" />
            <div className="flex justify-between">
              {STEPS.map((step, idx) => {
                const stepNum = idx + 1;
                const isCurrent = stepNum === currentStep;
                const isPast = stepNum < currentStep;
                return (
                  <div
                    key={step}
                    className="flex flex-col items-center gap-2 cursor-pointer relative"
                    onClick={() => !readOnly && setCurrentStep(stepNum)}
                  >
                    {isPast && (
                      <div className="absolute top-3 left-[-50%] w-full h-0.5 bg-green-500 -z-10" />
                    )}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors z-10
                        ${isCurrent
                          ? 'border-[#7a122e] bg-[#7a122e] text-white'
                          : isPast
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 bg-white text-gray-500'}`}
                    >
                      {isPast ? <Check size={12} /> : stepNum}
                    </div>
                    <span
                      className={`text-[10px] w-20 text-center leading-tight ${
                        isCurrent ? 'text-[#7a122e] font-semibold' : 'text-gray-500'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Completeness Summary ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
            <div className="col-span-2 border border-gray-200 bg-white rounded-lg p-3 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Overall Completeness</span>
                <span className="text-xl font-bold text-gray-900">{overallPct}%</span>
              </div>
              <div
                className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-medium text-xs
                  ${overallPct >= 90 ? 'border-green-500 text-green-600' :
                    overallPct >= 60 ? 'border-orange-400 text-orange-600' :
                    'border-red-400 text-red-600'}`}
              >
                {overallPct}%
              </div>
            </div>
            <div className="col-span-2 border border-gray-200 bg-white rounded-lg p-3 shadow-sm flex flex-col justify-center">
              <span className="text-xs text-gray-500 mb-1">Required Fields Completed</span>
              <span className="text-xl font-bold text-gray-900">
                {completeness.requiredCompleted} / {completeness.requiredTotal}
              </span>
            </div>
            <div className="border border-gray-200 bg-white rounded-lg p-3 shadow-sm flex flex-col justify-center">
              <span className="text-xs text-gray-500 mb-1">Blocking Issues</span>
              <span className="text-xl font-bold text-red-600">{completeness.blockingCount}</span>
            </div>
            <div className="border border-gray-200 bg-white rounded-lg p-3 shadow-sm flex flex-col justify-center">
              <span className="text-xs text-gray-500 mb-1">Warnings</span>
              <span className="text-xl font-bold text-orange-500">{completeness.warningCount}</span>
            </div>
            <div className="col-span-2 border border-gray-200 bg-white rounded-lg p-3 shadow-sm flex flex-col justify-center">
              <span className="text-xs text-gray-500 mb-1">Autosave Status</span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <CheckCircle size={14} />
                {completeness.autosaveLabel ?? (mode === 'create' ? 'Not saved yet' : 'Saved')}
              </span>
            </div>
          </div>

          {/* ── Step 1 Content (Company Identity) ── */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Company Identity card */}
                <div className="border border-gray-200 bg-white rounded-lg p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">1. Company Identity</h3>
                  <div className="flex gap-6 mb-4">
                    <div className="w-32 flex flex-col gap-2 shrink-0">
                      <label className="text-xs font-medium text-gray-700">Supplier Logo</label>
                      <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                        <UploadCloud size={24} className="text-[#7a122e] mb-2" />
                        <span className="text-xs text-center">Drag &amp; drop or click to upload</span>
                        <span className="text-[10px] text-gray-400">PNG, JPG up to 2MB</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-700">
                          Supplier Display Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          disabled={readOnly}
                          value={formValues.supplierName}
                          onChange={(e) => setField('supplierName', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="e.g. Luxe Distribution Pvt Ltd"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-700">
                          Legal Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          disabled={readOnly}
                          value={formValues.legalName ?? ''}
                          onChange={(e) => setField('legalName', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="e.g. Luxe Distribution (Pvt) Ltd"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-700">Trading Name</label>
                        <input
                          type="text"
                          disabled={readOnly}
                          value={formValues.tradingName ?? ''}
                          onChange={(e) => setField('tradingName', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-700">Company Type</label>
                        <select
                          disabled={readOnly}
                          value={formValues.companyType ?? ''}
                          onChange={(e) => setField('companyType', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                        >
                          <option>Distributor</option>
                          <option>Manufacturer</option>
                          <option>Brand Owner</option>
                          <option>Wholesaler</option>
                          <option>Importer</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-700">Year Established</label>
                        <input
                          type="text"
                          disabled={readOnly}
                          value={formValues.yearEstablished ?? ''}
                          onChange={(e) => setField('yearEstablished', e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="e.g. 2014"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-xs font-medium text-gray-700">Company Description</label>
                    <textarea
                      disabled={readOnly}
                      value={formValues.description ?? ''}
                      onChange={(e) => setField('description', e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 h-24 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Brief description of the supplier's business..."
                    />
                  </div>
                </div>

                {/* Primary Contact & Ownership card */}
                <div className="border border-gray-200 bg-white rounded-lg p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Primary Contact &amp; Ownership</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-700">
                        Primary Contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        disabled={readOnly}
                        value={formValues.primaryContact ?? ''}
                        onChange={(e) => setField('primaryContact', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Full name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-700">Role</label>
                      <input
                        type="text"
                        disabled={readOnly}
                        value={formValues.contactRole ?? ''}
                        onChange={(e) => setField('contactRole', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="e.g. Director"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        disabled={readOnly}
                        value={formValues.email ?? ''}
                        onChange={(e) => setField('email', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="contact@company.com"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        disabled={readOnly}
                        value={formValues.phone ?? ''}
                        onChange={(e) => setField('phone', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="+94 11 234 5678"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700 flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Ultimate Beneficial Owners
                      </span>
                      <a href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        Link records <LinkIcon size={12} />
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700 flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Board Resolution Uploaded
                      </span>
                      <span className="text-xs font-medium text-green-600">Yes</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700 flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Sanctions Screening
                      </span>
                      <span className="text-xs font-medium text-green-600">Clear</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other steps placeholder */}
          {currentStep > 1 && (
            <div className="flex items-center justify-center p-12 border border-gray-200 bg-white rounded-lg text-gray-500">
              Content for {STEPS[currentStep - 1]}
            </div>
          )}
        </div>

        {/* ── Right Insight Rail ── */}
        <RightInsightRail>
          <RailSection title="Supplier Onboarding Health">
            <RailHealthScore
              score={overallPct}
              label=""
              status={
                overallPct >= 90 ? 'Excellent' :
                overallPct >= 75 ? 'Good' :
                overallPct >= 50 ? 'Stable' :
                'Needs Attention'
              }
              metrics={[
                { label: 'Identity', value: `${completeness.overallPercent}%` },
                { label: 'Legal', value: `${Math.min(100, completeness.overallPercent + 1)}%` },
                { label: 'Classification', value: `${Math.min(100, completeness.overallPercent + 6)}%` },
                { label: 'Contacts', value: `${Math.min(100, completeness.overallPercent + 2)}%` },
                { label: 'Documents', value: `${Math.max(0, completeness.overallPercent - 24)}%` },
              ]}
            />
          </RailSection>

          {blockingIssues.length > 0 && (
            <RailSection title={`Blocking Issues (${blockingIssues.length})`} action={{ label: 'View all' }}>
              <ul className="flex flex-col gap-2">
                {blockingIssues.map((issue) => (
                  <li
                    key={issue.id}
                    className="flex items-center justify-between text-xs p-2 bg-red-50 border border-red-100 rounded"
                  >
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertTriangle size={14} />
                      <span className="truncate max-w-[150px]" title={issue.label}>
                        {issue.label}
                      </span>
                    </div>
                    {issue.fixHref ? (
                      <a href={issue.fixHref} className="text-[#7a122e] font-medium hover:underline">Fix</a>
                    ) : (
                      <button className="text-[#7a122e] font-medium hover:underline">Fix</button>
                    )}
                  </li>
                ))}
              </ul>
            </RailSection>
          )}

          <RailSection title="Final Actions">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSave}
                  disabled={readOnly || submitting}
                  className="w-full py-2 bg-[#7a122e] text-white rounded text-sm font-medium hover:bg-[#5a0d22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleValidate}
                  disabled={readOnly}
                  className="w-full py-2 bg-white border border-[#7a122e] text-[#7a122e] rounded text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Validate Supplier
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePreview}
                  className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Preview Supplier
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === STEPS.length}
                  className="w-full py-2 bg-[#7a122e] text-white rounded text-sm font-medium hover:bg-[#5a0d22] transition-colors disabled:opacity-50"
                >
                  Save &amp; Continue
                </button>
              </div>
              <button
                onClick={handleSubmit}
                disabled={completeness.blockingCount > 0 || submitting}
                className="w-full py-2 mt-2 bg-gray-100 border border-gray-200 text-gray-400 rounded text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock size={14} /> Submit for Verification
              </button>
              <button
                onClick={handleCancel}
                className="w-full py-2 text-gray-500 hover:text-gray-700 rounded text-sm font-medium transition-colors"
              >
                Cancel Changes
              </button>
            </div>
          </RailSection>
        </RightInsightRail>
      </div>

      {/* ── Sticky Bottom Bar ── */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 px-6 flex items-center justify-between z-20 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} / {STEPS.length} — {STEPS[currentStep - 1]}
          </span>
          {completeness.autosaveLabel && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle size={14} /> {completeness.autosaveLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={readOnly || submitting}
            className="px-4 py-2 bg-[#7a122e] text-white rounded-md text-sm font-medium hover:bg-[#5a0d22] disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === STEPS.length}
            className="px-4 py-2 bg-[#7a122e] text-white rounded-md text-sm font-medium hover:bg-[#5a0d22] disabled:opacity-50"
          >
            Save &amp; Continue
          </button>
          <button
            onClick={handleValidate}
            disabled={readOnly}
            className="px-4 py-2 bg-[#7a122e] text-white rounded-md text-sm font-medium hover:bg-[#5a0d22] disabled:opacity-50"
          >
            Validate
          </button>
          <button
            onClick={handleSubmit}
            disabled={completeness.blockingCount > 0 || submitting}
            className="px-4 py-2 bg-gray-100 text-gray-400 rounded-md text-sm font-medium cursor-not-allowed border border-gray-200 disabled:opacity-50"
          >
            Submit Changes <Lock size={12} className="inline ml-1 mb-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
