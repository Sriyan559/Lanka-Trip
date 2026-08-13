"use client";

import React from "react";
import Link from "next/link";
import { Download, ChevronDown, Send, UserCheck, Plus, AlertCircle } from "lucide-react";

interface ConversationsPageHeaderProps {
  onExport?: () => void;
  onBulkActions?: () => void;
  onSendBulkUpdate?: () => void;
  onAssignConversations?: () => void;
  onStartConversation?: () => void;
  onReviewPriority?: () => void;
}

export function ConversationsPageHeader({
  onExport,
  onBulkActions,
  onSendBulkUpdate,
  onAssignConversations,
  onStartConversation,
  onReviewPriority,
}: ConversationsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link href="/admin/customer-support" className="hover:text-slate-800 transition-colors">
          Customer Support
        </Link>
        <span>&gt;</span>
        <span className="text-slate-900 font-semibold">Conversations</span>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            CS05 — Omnichannel Conversations &amp; Customer Inbox
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-4xl">
            Manage customer conversations, unread messages, channel responses, case links and communication SLAs across all authorized support channels.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onExport}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download size={14} className="text-slate-500" />
            <span>Export Conversation Report</span>
          </button>

          <button
            onClick={onBulkActions}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Bulk Actions</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <button
            onClick={onSendBulkUpdate}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Send size={14} className="text-slate-500" />
            <span>Send Bulk Update</span>
          </button>

          <button
            onClick={onAssignConversations}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <UserCheck size={14} className="text-slate-500" />
            <span>Assign Conversations</span>
          </button>

          <button
            onClick={onStartConversation}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} className="text-slate-500" />
            <span>Start Conversation</span>
          </button>

          <button
            onClick={onReviewPriority}
            className="px-3 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertCircle size={14} />
            <span>Review Priority Conversations</span>
          </button>
        </div>
      </div>
    </div>
  );
}
