"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ConversationsPageHeader } from "@/components/admin/customer-support/conversations/ConversationsPageHeader";
import { ConversationsScopeBar } from "@/components/admin/customer-support/conversations/ConversationsScopeBar";
import { ConversationsKpiCards } from "@/components/admin/customer-support/conversations/ConversationsKpiCards";
import { ConversationsTabs, ConversationTabId } from "@/components/admin/customer-support/conversations/ConversationsTabs";
import { ConversationsFilterSection } from "@/components/admin/customer-support/conversations/ConversationsFilterSection";
import { ConversationQueue } from "@/components/admin/customer-support/conversations/ConversationQueue";
import { SelectedConversationWorkspace } from "@/components/admin/customer-support/conversations/SelectedConversationWorkspace";
import { ConversationIntelligenceRail } from "@/components/admin/customer-support/conversations/ConversationIntelligenceRail";

import {
  MOCK_CONVERSATIONS,
  MOCK_TIMELINE_MESSAGES,
  MOCK_SUGGESTED_REPLY,
  MOCK_INTELLIGENCE,
} from "@/components/admin/customer-support/conversations/mockData";
import { ConversationQueueItem, TimelineMessage } from "@/components/admin/customer-support/conversations/types";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<ConversationQueueItem[]>(MOCK_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<ConversationQueueItem>(MOCK_CONVERSATIONS[0]);
  const [activeTab, setActiveTab] = useState<ConversationTabId>("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannelChip, setSelectedChannelChip] = useState("all");
  const [timelineMessages, setTimelineMessages] = useState<Record<string, TimelineMessage[]>>(MOCK_TIMELINE_MESSAGES);

  // Handle new reply submission
  const handleSendReply = (text: string, isInternalNote: boolean) => {
    const newMessage: TimelineMessage = {
      id: `msg-${Date.now()}`,
      type: isInternalNote ? "internal_note" : "agent",
      senderName: isInternalNote ? "Internal Note" : "Aneesh Perera",
      senderAvatar: isInternalNote ? undefined : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: text,
      isPrivateNote: isInternalNote,
    };

    setTimelineMessages((prev) => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage],
    }));

    toast.success(isInternalNote ? "Internal note added" : "Reply sent successfully");
  };

  // Header Actions
  const handleExport = () => {
    toast.success("Exporting conversation report CSV...");
  };

  const handleBulkActions = () => {
    toast.success("Bulk actions menu opened");
  };

  const handleSendBulkUpdate = () => {
    toast.success("Bulk update trigger opened");
  };

  const handleAssignConversations = () => {
    toast.success("Bulk conversation assignment modal opened");
  };

  const handleStartConversation = () => {
    toast.success("New outbound conversation workflow initialized");
  };

  const handleReviewPriority = () => {
    setActiveTab("priority");
    toast.success("Filtered to priority conversations");
  };

  // Filter conversations based on tab, search, channel chip
  const filteredConversations = conversations.filter((c) => {
    // Channel chip filter
    if (selectedChannelChip !== "all") {
      if (selectedChannelChip === "in-app-chat" && c.channel !== "in-app-chat") return false;
      if (selectedChannelChip === "whatsapp" && c.channel !== "whatsapp") return false;
      if (selectedChannelChip === "email" && c.channel !== "email") return false;
      if (selectedChannelChip === "web" && c.channel !== "web") return false;
      if (selectedChannelChip === "instagram" && c.channel !== "instagram") return false;
    }

    // Tab filter
    if (activeTab === "priority" && c.priority !== "High" && c.priority !== "Critical") return false;
    if (activeTab === "unread" && c.unreadCount === 0) return false;
    if (activeTab === "waiting-for-agent" && c.status !== "waiting-for-agent") return false;
    if (activeTab === "waiting-for-customer" && c.status !== "waiting-for-customer") return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.customerName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.assignedAgentName.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const currentMessages = timelineMessages[selectedConversation.id] || [];

  return (
    <div className="w-full flex flex-col p-4 bg-slate-50/50 min-h-screen">
      {/* 1. Page Header */}
      <ConversationsPageHeader
        onExport={handleExport}
        onBulkActions={handleBulkActions}
        onSendBulkUpdate={handleSendBulkUpdate}
        onAssignConversations={handleAssignConversations}
        onStartConversation={handleStartConversation}
        onReviewPriority={handleReviewPriority}
      />

      {/* 2. Scope Bar */}
      <ConversationsScopeBar />

      {/* 3. KPI Cards */}
      <ConversationsKpiCards />

      {/* 4. Horizontal Tabs */}
      <ConversationsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 5. Filter Section */}
      <ConversationsFilterSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedChannelChip={selectedChannelChip}
        onChannelChipChange={setSelectedChannelChip}
        onClearAll={() => {
          setSearchQuery("");
          setSelectedChannelChip("all");
          setActiveTab("inbox");
          toast.success("Filters cleared");
        }}
        onRefresh={() => {
          toast.success("Conversations refreshed");
        }}
      />

      {/* 6. Three-Column Main Workspace Layout */}
      <div className="flex flex-col xl:flex-row gap-4 h-[820px] min-h-[700px] w-full">
        {/* Left Column: Conversation Queue (~29% width) */}
        <div className="w-full xl:w-[29%] h-full shrink-0">
          <ConversationQueue
            conversations={filteredConversations}
            selectedId={selectedConversation.id}
            onSelect={setSelectedConversation}
          />
        </div>

        {/* Center Column: Selected Conversation Workspace (~45% width) */}
        <div className="w-full xl:w-[45%] h-full flex-1">
          <SelectedConversationWorkspace
            conversation={selectedConversation}
            messages={currentMessages}
            suggestedReply={MOCK_SUGGESTED_REPLY}
            onSendReply={handleSendReply}
          />
        </div>

        {/* Right Column: Intelligence Rail (~26% width) */}
        <div className="w-full xl:w-[26%] h-full shrink-0">
          <ConversationIntelligenceRail data={MOCK_INTELLIGENCE} />
        </div>
      </div>
    </div>
  );
}
