"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  User,
  FileText,
  Package,
  Brain,
  Clock,
  GitBranch,
  Zap,
  ExternalLink,
  AlertCircle,
  UserCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
} from "lucide-react";
import { IntelligenceData } from "./types";

interface ConversationIntelligenceRailProps {
  data: IntelligenceData;
}

export function ConversationIntelligenceRail({ data }: ConversationIntelligenceRailProps) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar pr-1">
      {/* 1. Selected Conversation Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Activity size={14} className="text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900">Selected Conversation Health</h4>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-emerald-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray={`${data.healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-900 leading-none">{data.healthScore}</span>
              <span className="text-[9px] text-slate-400 font-semibold">/100</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Response SLA</span>
              <span className="font-bold text-emerald-700">{data.responseSlaPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Resolution Stability</span>
              <span className="font-bold text-amber-700">{data.resolutionStabilityPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Resolution Confidence</span>
              <span className="font-bold text-amber-700">{data.resolutionConfidencePercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Communication Continuity</span>
              <span className="font-bold text-emerald-700">{data.communicationContinuityPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Customer Context */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <User size={14} className="text-blue-600" />
          <h4 className="text-xs font-bold text-slate-900">Customer Context</h4>
        </div>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <Image
              src={data.customerContext.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
              alt={data.customerContext.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">{data.customerContext.name}</span>
              {data.customerContext.isVip && (
                <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1 py-0.2 rounded">VIP</span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-medium">{data.customerContext.country}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded border border-slate-100">
          <div>
            <span className="text-slate-400 block font-medium">Open Cases</span>
            <span className="font-bold text-slate-800">{data.customerContext.openCases}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Recent Cases</span>
            <span className="font-bold text-slate-800">{data.customerContext.recentCases}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Preferred Channel</span>
            <span className="font-semibold text-blue-600">{data.customerContext.preferredChannel}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Repeat Contact Rate</span>
            <span className="font-semibold text-emerald-700">{data.customerContext.repeatContactRate}</span>
          </div>
        </div>
      </div>

      {/* 3. Linked Support Case (Navigates to CS03) */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <FileText size={14} className="text-purple-600" />
            <h4 className="text-xs font-bold text-slate-900">Linked Support Case</h4>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Case ID:</span>
            <Link
              href={`/admin/customer-support/cases/${data.linkedCase.caseId}`}
              className="font-bold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              <span>{data.linkedCase.caseId}</span>
              <ExternalLink size={10} />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Priority:</span>
            <span className="font-bold text-red-700 bg-red-50 px-1 py-0.2 rounded text-[10px]">{data.linkedCase.priority}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Subject:</span>
            <span className="font-semibold text-slate-800 text-[11px]">{data.linkedCase.subject}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Assigned Agent:</span>
            <span className="font-semibold text-slate-800">{data.linkedCase.assignedAgent}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Order ID:</span>
            <span className="font-mono text-slate-700">{data.linkedCase.orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">First Response:</span>
            <span className="font-semibold text-emerald-700">{data.linkedCase.firstResponse}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Status:</span>
            <span className="font-semibold text-blue-700 bg-blue-50 px-1 py-0.2 rounded text-[10px]">{data.linkedCase.status}</span>
          </div>
        </div>
      </div>

      {/* 4. Related Records */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Package size={14} className="text-sky-600" />
          <h4 className="text-xs font-bold text-slate-900">Related Records</h4>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Order:</span>
            <span className="font-mono font-semibold text-blue-600">{data.relatedRecords.orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Shipment:</span>
            <span className="font-mono font-semibold text-blue-600">{data.relatedRecords.shipmentId}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Product:</span>
            <span className="font-medium text-slate-800">{data.relatedRecords.productName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Supplier:</span>
            <span className="font-medium text-slate-800">{data.relatedRecords.supplierName}</span>
          </div>
          <Link href="#" className="text-blue-600 font-semibold hover:underline text-[10px] mt-1 inline-block">
            View more
          </Link>
        </div>
      </div>

      {/* 5. Message Intelligence */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Brain size={14} className="text-purple-600" />
          <h4 className="text-xs font-bold text-slate-900">Message Intelligence</h4>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Current Sentiment:</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded text-[10px]">{data.messageIntelligence.currentSentiment}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Tone:</span>
            <span className="font-semibold text-slate-700">{data.messageIntelligence.tone}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Detected Intent:</span>
            <span className="font-semibold text-slate-800">{data.messageIntelligence.detectedIntent}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Urgency:</span>
            <span className="font-bold text-red-700 bg-red-50 px-1.5 py-0.2 rounded text-[10px]">{data.messageIntelligence.urgency}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Resolution Risk:</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded text-[10px]">{data.messageIntelligence.resolutionRisk}</span>
          </div>
        </div>
      </div>

      {/* 6. SLA Prognosis */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Clock size={14} className="text-rose-600" />
          <h4 className="text-xs font-bold text-slate-900">SLA Prognosis</h4>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">First Response:</span>
            <span className="font-semibold text-emerald-700">{data.slaPrognosis.firstResponse}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Next Response Due:</span>
            <span className="font-bold text-red-600">{data.slaPrognosis.nextResponseDue}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Resolution Target:</span>
            <span className="font-semibold text-slate-800">{data.slaPrognosis.resolutionTarget}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">SLA Policy:</span>
            <span className="font-mono text-slate-700">{data.slaPrognosis.slaPolicy}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Status:</span>
            <span className="font-bold text-red-700 bg-red-50 px-1.5 py-0.2 rounded text-[10px]">{data.slaPrognosis.status}</span>
          </div>
        </div>
      </div>

      {/* 7. Routing Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <GitBranch size={14} className="text-indigo-600" />
          <h4 className="text-xs font-bold text-slate-900">Routing Summary</h4>
        </div>

        <div className="flex flex-col gap-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Queue:</span>
            <span className="font-semibold text-slate-800">{data.routingSummary.queue}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Team:</span>
            <span className="font-semibold text-slate-800">{data.routingSummary.team}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Agent:</span>
            <span className="font-semibold text-slate-800">{data.routingSummary.agent}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Workload:</span>
            <span className="font-bold text-amber-700">{data.routingSummary.workload}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Availability:</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 size={11} />
              {data.routingSummary.availability}
            </span>
          </div>
        </div>
      </div>

      {/* 8. Quick Actions */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
          <Zap size={14} className="text-amber-500" />
          <h4 className="text-xs font-bold text-slate-900">Quick Actions</h4>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <button className="p-2 bg-white border border-rose-200 hover:bg-rose-50 text-[#800020] rounded font-semibold flex items-center gap-1.5 transition-colors text-left">
            <AlertCircle size={13} className="shrink-0 text-[#800020]" />
            <span className="leading-tight">Review Priority Conversation</span>
          </button>

          <button className="p-2 bg-white border border-rose-200 hover:bg-rose-50 text-[#800020] rounded font-semibold flex items-center gap-1.5 transition-colors text-left">
            <UserCheck size={13} className="shrink-0 text-[#800020]" />
            <span className="leading-tight">Assign Immediately</span>
          </button>

          <button className="p-2 bg-white border border-rose-200 hover:bg-rose-50 text-[#800020] rounded font-semibold flex items-center gap-1.5 transition-colors text-left">
            <Clock size={13} className="shrink-0 text-[#800020]" />
            <span className="leading-tight">Review SLA Risk</span>
          </button>

          <button className="p-2 bg-white border border-rose-200 hover:bg-rose-50 text-[#800020] rounded font-semibold flex items-center gap-1.5 transition-colors text-left">
            <ShieldAlert size={13} className="shrink-0 text-[#800020]" />
            <span className="leading-tight">Review Escalation</span>
          </button>

          <button className="p-2 bg-white border border-rose-200 hover:bg-rose-50 text-[#800020] rounded font-semibold flex items-center gap-1.5 transition-colors text-left">
            <Search size={13} className="shrink-0 text-[#800020]" />
            <span className="leading-tight">Open Conversation Audit</span>
          </button>

          <button className="p-2 bg-white border border-rose-200 hover:bg-rose-50 text-[#800020] rounded font-semibold flex items-center gap-1.5 transition-colors text-left">
            <Activity size={13} className="shrink-0 text-[#800020]" />
            <span className="leading-tight">View Channel Health</span>
          </button>
        </div>
      </div>
    </div>
  );
}
