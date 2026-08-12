"use client";

import React from "react";

export type ConversationTabId =
  | "inbox"
  | "unread"
  | "unassigned"
  | "my-conversations"
  | "team-inbox"
  | "waiting-for-agent"
  | "waiting-for-customer"
  | "priority"
  | "escalated"
  | "closed"
  | "archived";

interface ConversationsTabsProps {
  activeTab: ConversationTabId;
  onTabChange: (tab: ConversationTabId) => void;
}

const TABS: { id: ConversationTabId; label: string }[] = [
  { id: "inbox", label: "Inbox" },
  { id: "unread", label: "Unread" },
  { id: "unassigned", label: "Unassigned" },
  { id: "my-conversations", label: "My Conversations" },
  { id: "team-inbox", label: "Team Inbox" },
  { id: "waiting-for-agent", label: "Waiting for Agent" },
  { id: "waiting-for-customer", label: "Waiting for Customer" },
  { id: "priority", label: "Priority" },
  { id: "escalated", label: "Escalated" },
  { id: "closed", label: "Closed" },
  { id: "archived", label: "Archived" },
];

export function ConversationsTabs({ activeTab, onTabChange }: ConversationsTabsProps) {
  return (
    <div className="w-full border-b border-slate-200 mb-4 overflow-x-auto custom-scrollbar scrollbar-none">
      <div className="flex items-center gap-6 text-xs font-semibold whitespace-nowrap min-w-max">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2 transition-colors relative ${
                isActive
                  ? "text-[#800020] font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800020] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
