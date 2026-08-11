"use client";

import React from "react";
import Link from "next/link";
import { ChannelRailData } from "@/data/marketingChannels.mock";
import {
  AlertTriangle,
  Bell,
  List,
  ShieldAlert,
  Plus,
  Zap,
  Send,
  Shield,
  FileText,
} from "lucide-react";

interface ChannelOperationsRailProps {
  railData: ChannelRailData;
  onAddChannel?: () => void;
}

export function ChannelOperationsRail({
  railData,
  onAddChannel,
}: ChannelOperationsRailProps) {
  const {
    healthScore,
    updatedTime,
    healthMetrics,
    channelSummary,
    deliverySummary,
    messagingSummary,
    queueSummary,
    suppressionSummary,
    providerSummary,
    quickQueues,
  } = railData;

  // Radial score progress calculation (stroke-dasharray for 100 max)
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="w-full xl:w-[280px] shrink-0 flex flex-col gap-3 text-xs text-gray-700 font-sans">
      {/* 1. CHANNEL OPERATIONS HEALTH */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Channel Operations Health</h3>

        {/* Radial Score Gauge */}
        <div className="flex items-center justify-center my-3">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-gray-100"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-emerald-600 transition-all duration-500 ease-out"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-gray-900 leading-none">
                {healthScore}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">/100</span>
            </div>
          </div>
        </div>

        {/* Health Metrics List */}
        <div className="space-y-1.5 text-[11px] pt-2 border-t border-gray-100">
          {healthMetrics.map((m) => (
            <div key={m.name} className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">{m.name}</span>
              <span className="font-bold text-gray-900">{m.score}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-gray-100 text-right text-[10px] text-gray-400">
          Updated: {updatedTime}
        </div>
      </div>

      {/* 2. CHANNEL SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Channel Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Total Channels</span>
          <span className="font-bold text-gray-900">{channelSummary.totalChannels}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Owned</span>
          <span className="font-semibold text-gray-900">{channelSummary.owned}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Reference / Outside Send Control</span>
          <span className="text-gray-600">{channelSummary.referenceOutside}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Healthy</span>
          <span className="font-bold text-emerald-700">{channelSummary.healthy}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warning</span>
          <span className="font-bold text-amber-700">{channelSummary.warning}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Degraded</span>
          <span className="font-bold text-orange-700">{channelSummary.degraded}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Disconnected</span>
          <span className="text-gray-600">{channelSummary.disconnected}</span>
        </div>
      </div>

      {/* 3. DELIVERY SUMMARY (LAST 30 DAYS) */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100 flex justify-between">
          <span>Delivery Summary</span>
          <span className="text-[10px] text-gray-400 font-normal">(Last 30 Days)</span>
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Messages Sent</span>
          <span className="font-bold text-gray-900">{deliverySummary.messagesSent}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Delivery Rate</span>
          <span className="font-bold text-emerald-700">{deliverySummary.deliveryRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Engagement Rate</span>
          <span className="font-bold text-blue-700">{deliverySummary.engagementRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Failed Deliveries</span>
          <span className="font-bold text-rose-600">{deliverySummary.failedDeliveries}</span>
        </div>
      </div>

      {/* 4. MESSAGING SUMMARY (LAST 30 DAYS) */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100 flex justify-between">
          <span>Messaging Summary</span>
          <span className="text-[10px] text-gray-400 font-normal">(Last 30 Days)</span>
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Messages Sent</span>
          <span className="font-bold text-gray-900">{messagingSummary.messagesSent}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Open Rate</span>
          <span className="font-semibold text-gray-900">{messagingSummary.openRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Click Rate</span>
          <span className="font-semibold text-gray-900">{messagingSummary.clickRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Bounce Rate</span>
          <span className="text-rose-600 font-medium">{messagingSummary.bounceRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Complaint Rate</span>
          <span className="text-rose-600 font-medium">{messagingSummary.complaintRate}</span>
        </div>
      </div>

      {/* 5. QUEUE SUMMARY (REAL-TIME) */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100 flex justify-between">
          <span>Queue Summary</span>
          <span className="text-[10px] text-gray-400 font-normal">(Real-time)</span>
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Waiting</span>
          <span className="font-bold text-blue-600">{queueSummary.waiting}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Processing</span>
          <span className="font-bold text-blue-600">{queueSummary.processing}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Delayed</span>
          <span className="font-bold text-amber-600">{queueSummary.delayed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Failed</span>
          <span className="font-bold text-rose-600">{queueSummary.failed}</span>
        </div>
        <div className="pt-1 border-t border-gray-100 flex justify-between font-bold text-gray-900">
          <span>Total in Queue</span>
          <span>{queueSummary.totalInQueue}</span>
        </div>
      </div>

      {/* 6. SUPPRESSION SUMMARY (SELECTED SCOPE) */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Suppression Summary
        </h3>
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total Suppressions</span>
          <span className="text-blue-600">{suppressionSummary.totalSuppressions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Unsubscribed</span>
          <span className="text-gray-900">{suppressionSummary.unsubscribed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Hard Bounced</span>
          <span className="text-gray-900">{suppressionSummary.hardBounced}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Spam Complaints</span>
          <span className="text-rose-600 font-medium">{suppressionSummary.spamComplaints}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Do Not Contact</span>
          <span className="text-gray-900">{suppressionSummary.doNotContact}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Legal / Compliance</span>
          <span className="text-gray-900">{suppressionSummary.legalCompliance}</span>
        </div>
      </div>

      {/* 7. PROVIDER SUMMARY */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-1.5">
        <h3 className="text-xs font-bold text-gray-900 pb-1.5 border-b border-gray-100">
          Provider Summary
        </h3>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Total Providers</span>
          <span className="font-bold text-gray-900">{providerSummary.totalProviders}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Healthy</span>
          <span className="font-bold text-emerald-700">{providerSummary.healthy}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Warning</span>
          <span className="font-bold text-amber-700">{providerSummary.warning}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Disconnected</span>
          <span className="text-gray-600">{providerSummary.disconnected}</span>
        </div>
      </div>

      {/* 8. QUICK QUEUES */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Quick Queues
        </h3>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Delivery Exceptions</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.deliveryExceptions}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-rose-600" />
            <span>Channel Alerts</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.channelAlerts}
          </span>
        </Link>

        <Link
          href="/admin/marketing/channels"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <List className="w-3.5 h-3.5 text-rose-600" />
            <span>Message Queue</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.messageQueue}
          </span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="flex items-center justify-between p-2 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-gray-700 font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Sender Identity Issues</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            {quickQueues.senderIdentityIssues}
          </span>
        </Link>
      </div>

      {/* 9. FINAL CHANNEL ACTIONS */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-2">
        <h3 className="text-xs font-bold text-gray-900 pb-1 border-b border-gray-100">
          Final Channel Actions
        </h3>

        <button
          onClick={onAddChannel}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-bold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Channel</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Test Connection</span>
        </button>

        <button
          onClick={() => {}}
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Test Message</span>
        </button>

        <Link
          href="/admin/marketing/governance"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Review Delivery Exceptions</span>
        </Link>

        <Link
          href="/admin/marketing/channels"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <List className="w-3.5 h-3.5" />
          <span>Open Message Queue</span>
        </Link>

        <Link
          href="/admin/marketing/governance"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Review Suppressions</span>
        </Link>

        <Link
          href="/admin/marketing/reports-audit"
          className="w-full flex items-center justify-start gap-2 p-2 rounded-lg border border-rose-200 text-[#800020] hover:bg-rose-50 font-semibold transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Audit Trail</span>
        </Link>
      </div>
    </aside>
  );
}
