'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { ArrowLeft, CheckCircle2, LifeBuoy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateSupportCasePage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Support Case created successfully!');
    router.push('/admin/customer-support/cases');
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <PageHeader
        crumbs={['Customer Support', 'Cases & Queues', 'Create Case']}
        title="CS04 — Create Support Case"
        description="Create a new customer support case with automated routing, priority tagging, and SLA assignment."
        actions={
          <button
            type="button"
            onClick={() => router.push('/admin/customer-support/cases')}
            className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
          >
            <ArrowLeft size={15} />
            Back to Cases & Queues
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-900 flex items-center justify-center font-bold">
            <LifeBuoy size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-ink">New Support Case Handoff</h2>
            <p className="text-xs text-slate-500">Fill in the case metadata to dispatch to the appropriate support queue.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
            <input required type="text" placeholder="e.g. Elena Rodriguez" className="w-full h-9 px-3 border border-line rounded-lg text-xs" />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Customer ID / Email</label>
            <input type="text" placeholder="e.g. CUS-2026-01842 or elena@example.com" className="w-full h-9 px-3 border border-line rounded-lg text-xs" />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Case Category *</label>
            <select required className="w-full h-9 px-3 border border-line rounded-lg text-xs bg-white">
              <option value="">Select Category...</option>
              <option value="Delivery Issue">Delivery Issue</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Return & Refund">Return & Refund</option>
              <option value="Product Safety">Product Safety</option>
              <option value="Authenticity">Authenticity</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Priority Level *</label>
            <select required className="w-full h-9 px-3 border border-line rounded-lg text-xs bg-white">
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Subject / Summary *</label>
            <input required type="text" placeholder="Brief issue description" className="w-full h-9 px-3 border border-line rounded-lg text-xs" />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
            <textarea rows={4} placeholder="Full customer message or agent notes..." className="w-full p-3 border border-line rounded-lg text-xs" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-line">
          <button
            type="button"
            onClick={() => router.push('/admin/customer-support/cases')}
            className="px-4 py-2 bg-white border border-line text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary-900 text-white text-xs font-semibold rounded-lg hover:bg-primary-800 flex items-center gap-1.5"
          >
            <CheckCircle2 size={15} />
            Create Case & Dispatch
          </button>
        </div>
      </form>
    </div>
  );
}
