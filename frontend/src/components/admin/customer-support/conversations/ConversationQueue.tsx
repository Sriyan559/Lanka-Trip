"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Settings,
  RefreshCw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Smartphone,
  Mail,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react";
import { ConversationQueueItem } from "./types";

interface ConversationQueueProps {
  conversations: ConversationQueueItem[];
  selectedId: string;
  onSelect: (conversation: ConversationQueueItem) => void;
}

export function ConversationQueue({
  conversations,
  selectedId,
  onSelect,
}: ConversationQueueProps) {
  const [queueSearch, setQueueSearch] = useState("");

  const filteredConversations = conversations.filter(
    (c) =>
      c.customerName.toLowerCase().includes(queueSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(queueSearch.toLowerCase()) ||
      c.assignedAgentName.toLowerCase().includes(queueSearch.toLowerCase())
  );

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <Smartphone size={13} className="text-emerald-600" />;
      case "email":
        return <Mail size={13} className="text-blue-600" />;
      case "web":
        return <Globe size={13} className="text-purple-600" />;
      case "instagram":
        return <Instagram size={13} className="text-pink-600" />;
      case "facebook":
        return <Facebook size={13} className="text-blue-700" />;
      default:
        return <MessageSquare size={13} className="text-sky-600" />;
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200";
      case "Medium":
      case "Normal":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getSentimentBadgeClass = (sentiment: string) => {
    switch (sentiment) {
      case "Concerned":
      case "Frustrated":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Positive":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight">Conversation Queue</h3>
        <div className="flex items-center gap-1.5 text-slate-500">
          <button className="p-1 hover:bg-slate-200 rounded transition-colors" title="Toggle Layout">
            <SlidersHorizontal size={13} />
          </button>
          <button className="p-1 hover:bg-slate-200 rounded transition-colors" title="Queue Settings">
            <Settings size={13} />
          </button>
          <button className="p-1 hover:bg-slate-200 rounded transition-colors" title="Refresh Queue">
            <RefreshCw size={13} />
          </button>
          <button className="p-1 hover:bg-slate-200 rounded transition-colors" title="More Options">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>

      {/* Queue Search Input */}
      <div className="p-2 border-b border-slate-200 bg-white">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={queueSearch}
            onChange={(e) => setQueueSearch(e.target.value)}
            placeholder="Search or queue..."
            className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white"
          />
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 gap-1 px-3 py-1.5 bg-slate-100/70 border-b border-slate-200 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
        <div className="col-span-4">Customer / ID</div>
        <div className="col-span-1 text-center">Channel</div>
        <div className="col-span-1 text-center">Prio.</div>
        <div className="col-span-2 text-center">Sentiment</div>
        <div className="col-span-1 text-center">Unread</div>
        <div className="col-span-1 text-center">SLA</div>
        <div className="col-span-1 text-center">Agent</div>
        <div className="col-span-1 text-right">Activity</div>
      </div>

      {/* Queue Items List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 font-medium">
            No conversations found
          </div>
        ) : (
          filteredConversations.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`grid grid-cols-12 gap-1 items-center px-3 py-2.5 text-xs cursor-pointer transition-all border-l-3 ${
                  isSelected
                    ? "bg-rose-50/70 border-l-[#800020] text-slate-900 shadow-2xs font-medium"
                    : "border-l-transparent hover:bg-slate-50 text-slate-700"
                }`}
              >
                {/* Customer / ID */}
                <div className="col-span-4 flex items-center gap-2 overflow-hidden">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={item.customerAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
                      alt={item.customerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-slate-900 truncate leading-tight flex items-center gap-1">
                      <span>{item.customerName}</span>
                      {item.isVip && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 rounded">VIP</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{item.id}</div>
                  </div>
                </div>

                {/* Channel */}
                <div className="col-span-1 flex justify-center">
                  <div className="p-1 rounded bg-slate-100">{getChannelIcon(item.channel)}</div>
                </div>

                {/* Priority */}
                <div className="col-span-1 flex justify-center">
                  <span className={`text-[10px] px-1 py-0.5 rounded border font-semibold ${getPriorityBadgeClass(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>

                {/* Sentiment */}
                <div className="col-span-2 flex justify-center">
                  <span className={`text-[10px] px-1 py-0.5 rounded border font-medium ${getSentimentBadgeClass(item.sentiment)}`}>
                    {item.sentiment}
                  </span>
                </div>

                {/* Unread */}
                <div className="col-span-1 flex justify-center">
                  {item.unreadCount > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">
                      {item.unreadCount}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-300">0</span>
                  )}
                </div>

                {/* SLA */}
                <div className="col-span-1 flex justify-center">
                  <span
                    className={`text-[10px] font-semibold ${
                      item.isSlaAtRisk ? "text-rose-600 font-bold" : "text-slate-500"
                    }`}
                  >
                    {item.slaRemaining}
                  </span>
                </div>

                {/* Agent Avatar */}
                <div className="col-span-1 flex justify-center">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-300" title={item.assignedAgentName}>
                    <Image
                      src={item.assignedAgentAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                      alt={item.assignedAgentName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Last Activity */}
                <div className="col-span-1 text-right text-[10px] text-slate-400 font-medium whitespace-nowrap">
                  {item.lastActivityAt}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Queue Pagination */}
      <div className="p-2 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span>Show</span>
          <select className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[11px] text-slate-700">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        <div>1–{filteredConversations.length} of 864</div>

        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-slate-200 text-slate-400 disabled:opacity-50">
            <ChevronLeft size={13} />
          </button>
          <span className="px-1.5 py-0.5 rounded bg-[#800020] text-white font-bold text-[10px]">1</span>
          <span className="px-1 py-0.5 text-slate-600 text-[10px]">2</span>
          <span className="px-1 py-0.5 text-slate-600 text-[10px]">3</span>
          <span className="px-1 py-0.5 text-slate-600 text-[10px]">4</span>
          <span className="px-1 py-0.5 text-slate-600 text-[10px]">5</span>
          <span className="text-slate-400 text-[10px]">...</span>
          <span className="px-1 py-0.5 text-slate-600 text-[10px]">35</span>
          <button className="p-1 rounded hover:bg-slate-200 text-slate-600">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
