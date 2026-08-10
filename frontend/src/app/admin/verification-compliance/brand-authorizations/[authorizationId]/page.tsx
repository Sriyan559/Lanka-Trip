"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle, Award } from 'lucide-react';
import { ContextScopeBar } from '@/components/admin/shared/ContextScopeBar';
import { RightIntelligenceRail, RailSection, HealthScoreGauge } from '@/components/admin/shared/RightIntelligenceRail';

export default function ComplianceBrandAuthorizationDetailDecisionPage() {
  const params = useParams();
  const authorizationId = params?.authorizationId as string;

  return (
    <div className="flex w-full h-full min-h-screen bg-[#faf8f8] text-gray-900 pb-12">
      <div className="flex-grow flex flex-col min-w-0 px-6 py-4 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/verification-compliance/brand-authorizations" className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Verification &amp; Compliance / Brand Authorizations / LOA #{authorizationId}</div>
              <h1 className="text-xl font-bold text-gray-900">Brand Authorization Decision &amp; Audit Review</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              Approve LOA Rights
            </button>
            <button type="button" className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded hover:bg-rose-700 flex items-center gap-1.5">
              <XCircle size={14} />
              Reject &amp; Revoke
            </button>
          </div>
        </div>

        <ContextScopeBar items={[{ label: 'LOA Ref', value: authorizationId }]} lastSynced="Just now" accessNote="Legal brand authorization review" />

        <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b pb-2">Authorization Legal Audit</h2>
          <p className="text-xs text-gray-600">Review brand owner authorization covenants, territory restriction clauses, and exclusive reseller agreements.</p>
        </div>

      </div>

      <RightIntelligenceRail>
        <RailSection title="Legal Risk Score">
          <HealthScoreGauge score={90} label="Low Risk" statusText="Compliant" statusColor="#16a34a" metrics={[]} />
        </RailSection>
      </RightIntelligenceRail>
    </div>
  );
}
