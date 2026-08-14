'use client';

import React from 'react';
import { SelectedPolicyDetails } from '@/lib/administration/security-authentication/security-authentication.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';

interface SelectedPolicyPanelProps {
  policy: SelectedPolicyDetails;
  onReviewPolicy: () => void;
  onReviewMfa: () => void;
  onReviewSessions: () => void;
}

export function SelectedPolicyPanel({ policy, onReviewPolicy, onReviewMfa, onReviewSessions }: SelectedPolicyPanelProps) {
  return (
    <SectionCard title={`Selected Policy — Privileged Admin Authentication`}>
      <div className="flex flex-col justify-between h-full text-[10px]">
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">SSO Required</span>
            <span className="font-bold text-gray-900">{policy.ssoRequired}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Session Duration</span>
            <span className="font-bold text-gray-900">{policy.sessionDuration}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">MFA Required</span>
            <span className="font-bold text-emerald-700">{policy.mfaRequired}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Idle Timeout</span>
            <span className="font-bold text-gray-900">{policy.idleTimeout}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Phishing-Resistant Preferred</span>
            <span className="font-bold text-gray-900">{policy.phishingResistantPreferred}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Trusted Device Required</span>
            <span className="font-bold text-emerald-700">{policy.trustedDeviceRequired}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Step-Up for Critical Actions</span>
            <span className="font-bold text-emerald-700">{policy.stepUpForCriticalActions}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Owner</span>
            <span className="font-semibold text-gray-800">{policy.owner}</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Status</span>
            <StatusBadge status={policy.status} size="xs" />
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Compliance</span>
            <span className="font-extrabold text-emerald-700">{policy.compliance}%</span>
          </div>
          <div>
            <span className="text-gray-400 font-semibold block text-[9px] uppercase">Risk Level</span>
            <StatusBadge status={policy.riskLevel} size="xs" />
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-150 flex items-center justify-between gap-1 text-[9px]">
          <button
            type="button"
            onClick={onReviewPolicy}
            className="px-2 py-1 bg-[#741d35] hover:bg-[#5d172a] text-white font-bold rounded shadow-2xs transition-colors"
          >
            Review Policy
          </button>
          <button
            type="button"
            onClick={onReviewMfa}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review MFA Requirements
          </button>
          <button
            type="button"
            onClick={onReviewSessions}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review Session Controls
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
export default SelectedPolicyPanel;
