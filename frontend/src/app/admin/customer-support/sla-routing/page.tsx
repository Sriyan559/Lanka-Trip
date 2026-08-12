'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { ArrowLeft, GitBranch, Shield, Zap } from 'lucide-react';

export default function SlaRoutingPage() {
  const router = useRouter();

  const rules = [
    { issue: 'Shipment Issue', target: 'Logistics Team', sla: '4 Hours', priority: 'High' },
    { issue: 'Payment Issue', target: 'Payment Team', sla: '2 Hours', priority: 'Urgent' },
    { issue: 'Return Issue', target: 'Returns & Refunds', sla: '8 Hours', priority: 'Normal' },
    { issue: 'Product Defect', target: 'Product & Supplier', sla: '12 Hours', priority: 'High' },
    { issue: 'Safety Complaint', target: 'Safety & Compliance', sla: '1 Hour', priority: 'Critical' },
    { issue: 'High Priority / SLA At Risk', target: 'Fast Track Team', sla: '30 Minutes', priority: 'Urgent' },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <PageHeader
        crumbs={['Customer Support', 'SLA & Routing']}
        title="CS10 — SLA & Automated Case Routing Rules"
        description="Configure automated dispatch criteria, escalation paths, team queue assignments, and service level targets across beauty categories."
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

      <div className="bg-white border border-line rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-2 text-sm font-bold text-ink">
            <GitBranch size={18} className="text-primary-900" />
            Active Queue Dispatch Rules
          </div>
          <span className="text-xs text-slate-500 font-mono">Policy: SUP-SLA-015</span>
        </div>

        <div className="divide-y divide-line">
          {rules.map((r, i) => (
            <div key={i} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 font-bold text-slate-600 flex items-center justify-center text-[11px]">{i + 1}</span>
                <span className="font-bold text-slate-800">{r.issue}</span>
                <span className="text-slate-400">→</span>
                <span className="font-semibold text-primary-900 bg-primary-50 px-2 py-0.5 rounded">{r.target}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1"><Zap size={13} className="text-amber-500" /> SLA Target: <strong>{r.sla}</strong></span>
                <span className="flex items-center gap-1"><Shield size={13} className="text-blue-500" /> Priority: <strong>{r.priority}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
