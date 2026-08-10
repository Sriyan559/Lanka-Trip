"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Clock, FileText } from 'lucide-react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';

export default function SupplierVerificationDetailDecisionPage() {
  const params = useParams();
  const router = useRouter();
  const verificationId = params?.verificationId as string;
  const [decisionNotes, setDecisionNotes] = useState('');

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/verification-compliance/supplier-verification" className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Verification &amp; Compliance / Supplier Verification / Case #{verificationId}</div>
              <h1 className="text-xl font-bold text-gray-900">Supplier Verification Case Review</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              Approve Verification
            </button>
            <button type="button" className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded hover:bg-rose-700 flex items-center gap-1.5">
              <XCircle size={14} />
              Reject Application
            </button>
          </div>
        </div>

        <ContextScopeBar items={[{ label: 'Case Ref', value: verificationId }]} lastSynced="Just now" accessNote="Confidential regulatory audit case" />

        <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b pb-2">Verification Decision &amp; Audit Notes</h2>
          <textarea
            rows={4}
            value={decisionNotes}
            onChange={(e) => setDecisionNotes(e.target.value)}
            placeholder="Enter regulatory verification notes, auditor findings, or decision rationale..."
            className="w-full text-xs p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

      </div>

      <RightIntelligenceRail>
        <RailSection title="Case Risk Score">
          <HealthScoreGauge score={92} label="Low Risk" statusText="Eligible" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
