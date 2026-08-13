"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  X,
  UserPlus,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Lock,
  Paperclip,
  Link as LinkIcon,
  Smile,
  MoreHorizontal,
  Bold,
  Italic,
  Send,
  FileText,
  Package,
  Truck,
  MessageSquare,
} from "lucide-react";
import { ConversationQueueItem, TimelineMessage, SuggestedReplyData } from "./types";

interface SelectedConversationWorkspaceProps {
  conversation: ConversationQueueItem;
  messages: TimelineMessage[];
  suggestedReply: SuggestedReplyData;
  onSendReply?: (text: string, isInternalNote: boolean) => void;
}

export function SelectedConversationWorkspace({
  conversation,
  messages,
  suggestedReply,
  onSendReply,
}: SelectedConversationWorkspaceProps) {
  const [replyText, setReplyText] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("In-App Chat");

  const handleUseDraft = () => {
    setReplyText(suggestedReply.text);
  };

  const handleSend = () => {
    if (!replyText.trim()) return;
    if (onSendReply) {
      onSendReply(replyText, isInternalNote);
    }
    setReplyText("");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col h-full overflow-hidden">
      {/* 1. Header Card */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/50 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Customer info */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
              <Image
                src={conversation.customerAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
                alt={conversation.customerName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">{conversation.customerName}</h2>
                {conversation.isVip && (
                  <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded border border-amber-300">
                    VIP
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <span>{conversation.customerId}</span>
                <span>•</span>
                <span>{conversation.country}</span>
              </div>
            </div>
          </div>

          {/* Quick detail grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-[11px] bg-white p-2 rounded border border-slate-200">
            <div>
              <span className="text-slate-400 font-medium">Conversation ID: </span>
              <span className="font-mono font-semibold text-slate-800">{conversation.id}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Channel: </span>
              <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{conversation.channelLabel}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Linked Case: </span>
              {conversation.linkedCaseId ? (
                <Link
                  href={`/admin/customer-support/cases/${conversation.linkedCaseId}`}
                  className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-0.5"
                >
                  {conversation.linkedCaseId}
                  <ArrowUpRight size={10} />
                </Link>
              ) : (
                <span className="text-slate-400 font-normal">None</span>
              )}
            </div>
            <div>
              <span className="text-slate-400 font-medium">Priority: </span>
              <span className="font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">{conversation.priority}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Status: </span>
              <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">{conversation.statusLabel}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Assigned Agent: </span>
              <span className="font-semibold text-slate-800">{conversation.assignedAgentName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Sentiment: </span>
              <span className="font-semibold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded">{conversation.sentiment}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Resolution Confidence: </span>
              <span className="font-semibold text-emerald-700">{conversation.resolutionConfidence}%</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">SLA: </span>
              <span className="font-bold text-red-600">{conversation.slaRemaining} remaining</span>
            </div>
          </div>
        </div>

        {/* 2. Action Bar */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
          <button className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded text-[11px] font-semibold flex items-center gap-1">
            <X size={12} className="text-slate-500" />
            <span>Close</span>
          </button>
          <button className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded text-[11px] font-semibold flex items-center gap-1">
            <UserPlus size={12} className="text-slate-500" />
            <span>Assign</span>
          </button>
          <button className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded text-[11px] font-semibold flex items-center gap-1">
            <span>Change Priority</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
          <button className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded text-[11px] font-semibold flex items-center gap-1">
            <AlertTriangle size={12} className="text-amber-500" />
            <span>Escalate</span>
          </button>
          <button className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded text-[11px] font-semibold flex items-center gap-1">
            <span>More Actions</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* 3. Message Timeline */}
      <div className="flex-1 p-3 overflow-y-auto custom-scrollbar flex flex-col gap-3 bg-slate-100/30">
        {messages.map((msg) => {
          if (msg.type === "customer") {
            return (
              <div key={msg.id} className="bg-rose-50/70 border border-rose-200/80 rounded-lg p-3 max-w-[90%] shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">{msg.content}</p>
              </div>
            );
          }

          if (msg.type === "system") {
            return (
              <div key={msg.id} className="bg-slate-100 border border-slate-200 rounded-md p-2 text-[11px] text-slate-600 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="font-bold text-slate-800">{msg.senderName}:</span>
                  <span>{msg.content}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
              </div>
            );
          }

          if (msg.type === "agent") {
            return (
              <div key={msg.id} className="bg-sky-50/80 border border-sky-200 rounded-lg p-3 max-w-[90%] ml-auto shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">{msg.content}</p>
              </div>
            );
          }

          if (msg.type === "internal_note") {
            return (
              <div key={msg.id} className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Lock size={12} className="text-amber-700" />
                    Internal Note
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">{msg.content}</p>
              </div>
            );
          }

          if (msg.type === "escalation") {
            return (
              <div key={msg.id} className="bg-white border border-red-200 rounded-md p-2 text-xs shadow-2xs flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-900">{msg.senderName}:</span>
                  <span className="text-slate-700">{msg.content}</span>
                  {msg.badges?.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                        badge.variant === "danger"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : badge.variant === "warning"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                      }`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* 4. Suggested Reply / CS11 Assistance Panel */}
      <div className="p-3 bg-red-50/30 border-t border-b border-red-200/60">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-purple-600" />
            <span className="text-xs font-bold text-slate-900">Suggested Reply</span>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">GenAI</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
              {suggestedReply.confidencePercent}%
            </span>
          </div>

          <button
            onClick={handleUseDraft}
            className="px-3 py-1 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold transition-colors shadow-2xs"
          >
            Use Draft
          </button>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-2 rounded border border-slate-200">
          &ldquo;{suggestedReply.text}&rdquo;
        </p>
      </div>

      {/* 5. Message Composer */}
      <div className="p-3 bg-white border-t border-slate-200 flex flex-col gap-2">
        {/* Top toolbar */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-800 font-semibold focus:outline-none"
            >
              <option>In-App Chat</option>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>SMS</option>
            </select>
          </div>

          {/* Formatting */}
          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-1 hover:bg-slate-100 rounded font-bold" title="Bold">
              <Bold size={13} />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded italic" title="Italic">
              <Italic size={13} />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Insert Link">
              <LinkIcon size={13} />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Insert Emoji">
              <Smile size={13} />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded" title="More Formatting">
              <MoreHorizontal size={13} />
            </button>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply..."
          rows={3}
          className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white resize-none"
        />

        {/* Quick insert row & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1">
              <FileText size={11} />
              <span>Template</span>
            </button>
            <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1">
              <Paperclip size={11} />
              <span>Attach</span>
            </button>
            <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1">
              <Package size={11} />
              <span>Insert Order Link</span>
            </button>
            <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1">
              <Truck size={11} />
              <span>Insert Shipment Update</span>
            </button>
            <button
              onClick={() => setIsInternalNote(!isInternalNote)}
              className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors ${
                isInternalNote
                  ? "bg-amber-200 text-amber-900 font-bold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Lock size={11} />
              <span>Internal Note</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-2xs">
              Save Draft
            </button>
            <button
              onClick={handleSend}
              className="px-3 py-1.5 bg-[#800020] hover:bg-[#660019] text-white rounded text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <Send size={13} />
              <span>Send Reply</span>
              <ChevronDown size={13} className="text-red-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
