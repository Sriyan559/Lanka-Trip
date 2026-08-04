'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Truck,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  User,
  ShieldCheck,
  Calendar,
  Target,
  Check,
} from 'lucide-react';
import type { CaseDetailFullData, ChecklistItem } from '@/types/customerSupportDetail';
import { CaseLifecycle } from './CaseLifecycle';

interface CaseOverviewTabProps {
  data: CaseDetailFullData;
  onToggleChecklist: (item: ChecklistItem) => void;
}

export function CaseOverviewTab({ data, onToggleChecklist }: CaseOverviewTabProps) {
  const { caseInfo, customerStatement, lifecycleStages, orderContext, shipmentContext, supplierContext, checklist } = data;

  const metaLabelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1";
  const contextRowClass = "flex justify-between items-center py-2 border-b border-slate-100 last:border-0 text-[11px] font-bold";
  const contextLabelClass = "text-slate-500 font-semibold";

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Customer Statement Quote Card */}
      <div className="bg-slate-50 border border-line rounded-xl p-6 shadow-inner relative overflow-hidden">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          CUSTOMER STATEMENT
        </div>
        <p className="text-[14px] text-slate-700 italic font-medium leading-relaxed max-w-4xl relative z-10">
          &ldquo;{customerStatement}&rdquo;
        </p>
        <div className="absolute top-4 right-6 text-9xl text-slate-200/50 font-serif leading-none opacity-50 select-none pointer-events-none">
          &rdquo;
        </div>
      </div>

      {/* 2. Overview Metadata Grid (2 compact rows) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-5 bg-white border border-line rounded-xl p-5 shadow-sm">
        {/* Row 1 */}
        <div>
          <span className={metaLabelClass}>Category</span>
          <span className="text-[13px] font-bold text-ink">{caseInfo.caseCategory}</span>
        </div>

        <div>
          <span className={metaLabelClass}>Issue Type</span>
          <span className="text-[13px] font-bold text-ink">{caseInfo.issueType}</span>
        </div>

        <div>
          <span className={metaLabelClass}>Current Owner</span>
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
            <User size={14} className="text-slate-500 shrink-0" />
            <span>{caseInfo.assignedAgentName || 'Amaya Perera'}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Assigned Team</span>
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
            <ShieldCheck size={14} className="text-slate-500 shrink-0" />
            <span>{caseInfo.assignedTeam || 'Customer Operations'}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Current Status</span>
          <div className="flex items-center gap-1.5 text-[13px] font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="text-blue-700">{caseInfo.caseStatus}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Priority</span>
          <div className="flex items-center gap-1.5 text-[13px] font-bold">
            <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
            <span className="text-red-700">{caseInfo.priority}</span>
          </div>
        </div>

        {/* Row 2 */}
        <div>
          <span className={metaLabelClass}>Customer Sentiment</span>
          <div className="flex items-center gap-1.5 text-[13px] font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span className="text-amber-800">{caseInfo.sentiment}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Risk</span>
          <div className="flex items-center gap-1.5 text-[13px] font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span className="text-amber-800">{caseInfo.riskLevel}</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Repeat Contact</span>
          <div className="flex items-center gap-1.5 text-[13px] font-bold text-ink">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span>No</span>
          </div>
        </div>

        <div>
          <span className={metaLabelClass}>Previous Related Cases</span>
          <span className="text-[13px] font-bold text-ink">0</span>
        </div>
      </div>

      {/* 3. Nine-Stage Case Lifecycle */}
      <CaseLifecycle stages={lifecycleStages} />

      {/* 4. Related Commerce Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Order Context Card */}
        {orderContext && (
          <div className="bg-white border border-line rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-line bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShoppingBag size={16} />
                </div>
                <span className="text-[13px] font-bold text-ink">
                  Order: {orderContext.orderReference}
                </span>
              </div>
              <Link
                href={`/admin/marketplace/orders/${orderContext.orderReference}`}
                className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-blue-700 uppercase tracking-widest transition-colors"
              >
                <span>View Original Order</span>
                <ExternalLink size={12} />
              </Link>
            </div>
            <div className="p-4 flex flex-col">
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Order Status:</span>
                <span className="text-blue-700">{orderContext.orderStatus}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Payment Status:</span>
                <span className="text-emerald-700">{orderContext.paymentStatus}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Order Total:</span>
                <span className="text-slate-900">{orderContext.orderTotal}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Fulfilment Status:</span>
                <span className="text-amber-700">{orderContext.fulfilmentStatus}</span>
              </div>
            </div>
          </div>
        )}

        {/* Shipment Context Card */}
        {shipmentContext && (
          <div className="bg-white border border-line rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-line bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Truck size={16} />
                </div>
                <span className="text-[13px] font-bold text-ink">
                  Shipment: {shipmentContext.shipmentReference}
                </span>
              </div>
              <Link
                href={`/admin/logistics/shipments/${shipmentContext.shipmentReference}`}
                className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-purple-700 uppercase tracking-widest transition-colors"
              >
                <span>View Shipment</span>
                <ExternalLink size={12} />
              </Link>
            </div>
            <div className="p-4 flex flex-col">
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Shipment Status:</span>
                <span className="text-blue-700">{shipmentContext.shipmentStatus}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Pickup Status:</span>
                <span className="text-blue-700">{shipmentContext.pickupStatus}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Delivery Status:</span>
                <span className="text-red-700">{shipmentContext.deliveryStatus}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Carrier:</span>
                <span className="text-slate-800">{shipmentContext.carrierName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Supplier Context Card */}
        {supplierContext && (
          <div className="bg-white border border-line rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-line bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Building size={16} />
                </div>
                <span className="text-[13px] font-bold text-ink truncate" title={`Supplier: ${supplierContext.supplierName}`}>
                  Supplier: {supplierContext.supplierName}
                </span>
              </div>
              <button type="button" className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-teal-700 uppercase tracking-widest transition-colors">
                <span>View Supplier Fulfilment</span>
                <ExternalLink size={12} />
              </button>
            </div>
            <div className="p-4 flex flex-col">
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Supplier Fulfilment:</span>
                <span className="text-blue-700 font-mono">{supplierContext.fulfilmentReference}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Supplier Status:</span>
                <span className="text-emerald-700">{supplierContext.supplierStatus}</span>
              </div>
              <div className={contextRowClass}>
                <span className={contextLabelClass}>Operational Issue:</span>
                <span className="text-red-700">{supplierContext.operationalIssue}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Dispatch Investigation Checklist */}
      <div className="bg-white border border-line rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-5 py-4 border-b border-line flex flex-col gap-2">
          <div className="text-[12px] font-bold text-ink uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary-900" />
            DISPATCH INVESTIGATION CHECKLIST
          </div>
          <div className="flex items-center gap-6 text-[11px] text-slate-500">
            <span>Investigation Owner: <strong className="text-ink">{data.checklistOwner}</strong></span>
            <span>Started: <strong className="text-ink">{data.checklistStarted}</strong></span>
            <span>Due: <strong className="text-ink">{data.checklistDue}</strong></span>
          </div>
        </div>

        <div className="flex flex-col">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-5 text-[11px] font-mono text-slate-400">{item.id}</span>
                <span className={`text-[13px] font-semibold ${item.status === 'Completed' ? 'text-slate-500 line-through' : 'text-ink'}`}>
                  {item.task}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onToggleChecklist(item)}
                className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full transition-colors ${
                  item.status === 'Completed'
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item.status === 'Completed' ? (
                  <>
                    <CheckCircle2 size={12} />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Clock size={12} />
                    <span>Pending</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Bottom Assignment & SLA Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-line border border-line rounded-xl overflow-hidden shadow-sm">
        <div className="bg-white p-4 flex items-center gap-3">
          <User size={18} className="text-slate-400 shrink-0" />
          <div className="flex flex-col">
            <span className={metaLabelClass + " !mb-0"}>Assigned Agent</span>
            <span className="text-[12px] font-bold text-ink">{caseInfo.assignedAgentName || 'Amaya Perera'}</span>
          </div>
        </div>

        <div className="bg-white p-4 flex items-center gap-3">
          <ShieldCheck size={18} className="text-slate-400 shrink-0" />
          <div className="flex flex-col">
            <span className={metaLabelClass + " !mb-0"}>Assigned Team</span>
            <span className="text-[12px] font-bold text-ink">{caseInfo.assignedTeam || 'Customer Operations'}</span>
          </div>
        </div>

        <div className="bg-white p-4 flex items-center gap-3">
          <Clock size={18} className="text-slate-400 shrink-0" />
          <div className="flex flex-col">
            <span className={metaLabelClass + " !mb-0"}>First Response</span>
            <span className="text-[12px] font-bold text-emerald-700">{caseInfo.firstResponseDue || 'Completed in 9 Minutes'}</span>
          </div>
        </div>

        <div className="bg-white p-4 flex items-center gap-3">
          <Calendar size={18} className="text-slate-400 shrink-0" />
          <div className="flex flex-col">
            <span className={metaLabelClass + " !mb-0"}>Resolution Due</span>
            <span className="text-[12px] font-bold text-ink">{caseInfo.resolutionDue}</span>
          </div>
        </div>

        <div className="bg-white p-4 flex items-center gap-3">
          <Target size={18} className="text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className={metaLabelClass + " !mb-0"}>SLA Status</span>
            <span className="text-[12px] font-bold text-emerald-700">Within Target</span>
          </div>
        </div>

        <div className="bg-white p-4 flex items-center gap-3">
          <Check size={18} className="text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className={metaLabelClass + " !mb-0"}>Escalation</span>
            <span className="text-[12px] font-bold text-emerald-700">None</span>
          </div>
        </div>
      </div>
    </div>
  );
}
