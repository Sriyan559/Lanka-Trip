'use client';

import React from 'react';
import { SelectedDataAssetDetails } from '@/lib/administration/data-governance/data-governance.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { HealthScore } from '@/components/shared/HealthScore/HealthScore';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';

interface SelectedDataAssetPanelProps {
  asset: SelectedDataAssetDetails;
  onReviewClassification: () => void;
  onReviewRetention: () => void;
  onReviewOwnership: () => void;
  onReviewDataQuality: () => void;
  onViewAssetLineage: () => void;
  onViewAuditHistory: () => void;
}

export function SelectedDataAssetPanel({
  asset,
  onReviewClassification,
  onReviewRetention,
  onReviewOwnership,
  onReviewDataQuality,
  onViewAssetLineage,
  onViewAuditHistory,
}: SelectedDataAssetPanelProps) {
  return (
    <SectionCard title={`Selected Data Asset — ${asset.assetName}`}>
      <div className="flex flex-col justify-between h-full text-[10px]">
        <div className="grid grid-cols-12 gap-2">
          {/* Main Info Columns */}
          <div className="col-span-8 grid grid-cols-2 gap-x-2 gap-y-1.5 border-r border-gray-150 pr-2">
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Asset Ref</span>
              <span className="font-mono font-bold text-gray-900">{asset.assetRef}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Primary Purpose</span>
              <span className="font-semibold text-gray-800 truncate block">{asset.primaryPurpose}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Domain</span>
              <span className="font-semibold text-gray-800">{asset.domain}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Retention Policy</span>
              <span className="font-mono text-gray-700">{asset.retentionPolicy}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Business Unit</span>
              <span className="font-semibold text-gray-800">{asset.businessUnit}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Retention</span>
              <span className="font-bold text-gray-900">{asset.retention}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Classification</span>
              <StatusBadge status={asset.classification} size="xs" />
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Retention Status</span>
              <StatusBadge status={asset.retentionStatus} size="xs" />
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Sensitivity</span>
              <StatusBadge status={asset.sensitivity} size="xs" />
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Residency</span>
              <span className="font-semibold text-gray-800">{asset.residency}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Risk Level</span>
              <StatusBadge status={asset.riskLevel} size="xs" />
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Residency Constraints</span>
              <span className="font-semibold text-gray-800">{asset.residencyConstraints}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Data Owner</span>
              <span className="font-semibold text-gray-800">{asset.dataOwner}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Privacy Status</span>
              <StatusBadge status={asset.privacyStatus} size="xs" />
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[9px] uppercase">Steward</span>
              <span className="font-semibold text-gray-800">{asset.steward}</span>
            </div>
          </div>

          {/* Right Ownership & Health Score */}
          <div className="col-span-4 flex flex-col justify-between pl-1">
            <div className="space-y-1.5">
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Owner</span>
                <span className="font-bold text-gray-900">{asset.ownerName}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Steward</span>
                <span className="font-semibold text-gray-800">{asset.stewardName}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Review Frequency</span>
                <span className="font-semibold text-gray-800">{asset.reviewFrequency}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Last Reviewed</span>
                <span className="text-gray-600 text-[9px]">{asset.lastReviewed}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block text-[9px] uppercase">Next Review</span>
                <span className="text-gray-600 text-[9px]">{asset.nextReview}</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-150 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-gray-400 block uppercase">Risk Score</span>
                <span className="text-xs font-extrabold text-emerald-700">{asset.riskScore} / 100</span>
              </div>
              <HealthScore score={asset.riskScore} max={100} label={asset.status} size="sm" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 pt-2 border-t border-gray-150 flex items-center justify-between gap-1 text-[9px] flex-wrap">
          <button
            type="button"
            onClick={onReviewClassification}
            className="px-2 py-1 bg-[#741d35] hover:bg-[#5d172a] text-white font-bold rounded shadow-2xs transition-colors"
          >
            Review Classification
          </button>
          <button
            type="button"
            onClick={onReviewRetention}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review Retention
          </button>
          <button
            type="button"
            onClick={onReviewOwnership}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review Ownership
          </button>
          <button
            type="button"
            onClick={onReviewDataQuality}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            Review Data Quality
          </button>
          <button
            type="button"
            onClick={onViewAssetLineage}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            View Asset Lineage
          </button>
          <button
            type="button"
            onClick={onViewAuditHistory}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded shadow-2xs transition-colors"
          >
            View Audit History
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
export default SelectedDataAssetPanel;
