'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Database,
  User,
  Tag,
  HelpCircle,
  MessageSquare,
  Clock,
  UserCheck,
  Users,
  ShoppingBag,
  Truck,
  RotateCcw,
  Package,
  Building,
} from 'lucide-react';
import type { SupportCaseItem } from '@/types/customerSupport';

interface CaseIdentitySummaryProps {
  caseInfo: SupportCaseItem;
}

export function CaseIdentitySummary({ caseInfo }: CaseIdentitySummaryProps) {
  const metaLabelClass = "text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1";
  const metaValueClass = "flex items-center gap-1.5 text-[13px] font-bold text-ink";

  return (
    <div className="bg-slate-50 px-6 py-5 border-y border-line border-dashed">
      {/* 2 Metadata Grid Rows (6 columns each) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-6 mb-6">
        {/* Row 1 */}
        <div>
          <span className={metaLabelClass}>Public Case Reference</span>
          <div className={metaValueClass}>
            <FileText size={14} className="text-primary-900 shrink-0" />
            <span className="font-mono text-primary-900">{caseInfo.caseReference}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Database Support Case ID</span>
          <div className={metaValueClass}>
            <Database size={14} className="text-slate-400 shrink-0" />
            <span className="font-mono text-slate-700">{caseInfo.dbCaseId}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Case Category</span>
          <div className={metaValueClass}>
            <Tag size={14} className="text-blue-500 shrink-0" />
            <span>{caseInfo.caseCategory}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Issue Type</span>
          <div className={metaValueClass}>
            <HelpCircle size={14} className="text-amber-500 shrink-0" />
            <span>{caseInfo.issueType}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Created</span>
          <div className={metaValueClass}>
            <Clock size={14} className="text-slate-400 shrink-0" />
            <span>{caseInfo.createdAt}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Customer</span>
          <div className={metaValueClass}>
            <User size={14} className="text-slate-600 shrink-0" />
            <span>{caseInfo.customerName}</span>
          </div>
        </div>

        {/* Row 2 */}
        <div>
          <span className={metaLabelClass}>Subject</span>
          <div className={metaValueClass}>
            <span className="truncate" title={caseInfo.subject}>
              {caseInfo.subject}
            </span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Channel</span>
          <div className={metaValueClass}>
            <MessageSquare size={14} className="text-purple-500 shrink-0" />
            <span>{caseInfo.channel}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Last Updated</span>
          <div className={metaValueClass}>
            <Clock size={14} className="text-slate-400 shrink-0" />
            <span>{caseInfo.lastUpdated}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Customer ID</span>
          <div className={metaValueClass}>
            <User size={14} className="text-slate-400 shrink-0" />
            <span className="font-mono text-slate-600">{caseInfo.customerId}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Assigned Agent</span>
          <div className={metaValueClass}>
            <UserCheck size={14} className="text-slate-600 shrink-0" />
            <span>{caseInfo.assignedAgentName || 'Unassigned'}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Assigned Team</span>
          <div className={metaValueClass}>
            <Users size={14} className="text-slate-600 shrink-0" />
            <span>{caseInfo.assignedTeam || 'Customer Operations'}</span>
          </div>
        </div>
      </div>

      {/* Relationship Row (5 items with vertical divider lines) */}
      <div className="flex flex-wrap items-center bg-white border border-line rounded-lg p-3 overflow-hidden">
        <div className="flex-1 px-4 first:pl-2 last:pr-2 border-r border-slate-200 last:border-0 min-w-[150px]">
          <span className={metaLabelClass}>Related Order</span>
          <div className={metaValueClass}>
            <ShoppingBag size={14} className="text-slate-500 shrink-0" />
            {caseInfo.relatedOrderReference ? (
              <Link
                href={`/admin/marketplace/orders/${caseInfo.relatedOrderReference}`}
                className="font-mono text-blue-600 hover:underline"
              >
                {caseInfo.relatedOrderReference}
              </Link>
            ) : (
              <span className="text-slate-400 font-normal">None</span>
            )}
          </div>
        </div>

        <div className="flex-1 px-4 border-r border-slate-200 last:border-0 min-w-[150px]">
          <span className={metaLabelClass}>Related Shipment</span>
          <div className={metaValueClass}>
            <Truck size={14} className="text-slate-500 shrink-0" />
            {caseInfo.relatedShipmentReference ? (
              <span className="font-mono text-slate-800">
                {caseInfo.relatedShipmentReference}
              </span>
            ) : (
              <span className="text-slate-400 font-normal">None</span>
            )}
          </div>
        </div>

        <div className="flex-1 px-4 border-r border-slate-200 last:border-0 min-w-[150px]">
          <span className={metaLabelClass}>Related Return</span>
          <div className={metaValueClass}>
            <RotateCcw size={14} className="text-slate-500 shrink-0" />
            {caseInfo.relatedReturnReference ? (
              <span className="font-mono text-slate-800">
                {caseInfo.relatedReturnReference}
              </span>
            ) : (
              <span className="text-slate-400 font-normal">None</span>
            )}
          </div>
        </div>

        <div className="flex-1 px-4 border-r border-slate-200 last:border-0 min-w-[150px]">
          <span className={metaLabelClass}>Related Product</span>
          <div className={metaValueClass}>
            <Package size={14} className="text-slate-500 shrink-0" />
            <span className="truncate" title={caseInfo.relatedProductName}>
              {caseInfo.relatedProductName || 'None'}
            </span>
          </div>
        </div>

        <div className="flex-1 px-4 border-r border-slate-200 last:border-0 min-w-[150px]">
          <span className={metaLabelClass}>Supplier</span>
          <div className={metaValueClass}>
            <Building size={14} className="text-slate-500 shrink-0" />
            <span className="truncate" title={caseInfo.supplierName}>
              {caseInfo.supplierName || 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
