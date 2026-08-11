"use client";

import React from "react";
import { ChannelRecord } from "@/data/marketingChannels.mock";
import { ChannelStatusBadge } from "./ChannelStatusBadge";
import { MoreVertical, Mail, MessageSquare, Bell, Send, Globe } from "lucide-react";

interface ChannelTableProps {
  channels: ChannelRecord[];
  selectedId: string;
  onSelectChannel: (channel: ChannelRecord) => void;
  selectedCheckboxes: string[];
  onToggleCheckbox: (id: string) => void;
  onToggleAllCheckboxes: () => void;
}

export function ChannelTable({
  channels = [],
  selectedId,
  onSelectChannel,
  selectedCheckboxes = [],
  onToggleCheckbox,
  onToggleAllCheckboxes,
}: ChannelTableProps) {
  const isAllSelected =
    channels.length > 0 && selectedCheckboxes.length === channels.length;

  const getChannelIcon = (type: ChannelRecord["type"]) => {
    switch (type) {
      case "Email":
        return <Mail className="w-3.5 h-3.5 text-blue-600" />;
      case "SMS":
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />;
      case "Push":
        return <Bell className="w-3.5 h-3.5 text-purple-600" />;
      case "WhatsApp":
        return <Send className="w-3.5 h-3.5 text-emerald-500" />;
      case "Web-Push":
        return <Globe className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Mail className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs text-gray-700 font-sans border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleAllCheckboxes}
                  className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3">Channel</th>
              <th className="py-2.5 px-3">Channel ID</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Provider</th>
              <th className="py-2.5 px-3">Business Unit</th>
              <th className="py-2.5 px-3">Market</th>
              <th className="py-2.5 px-3">Sender / Account</th>
              <th className="py-2.5 px-3">Consent Scope</th>
              <th className="py-2.5 px-3 text-right">Messages (30D)</th>
              <th className="py-2.5 px-3 text-right">Delivery Rate</th>
              <th className="py-2.5 px-3 text-right">Engagement</th>
              <th className="py-2.5 px-3 text-right">Failure Rate</th>
              <th className="py-2.5 px-3 text-right">Suppression Rate</th>
              <th className="py-2.5 px-3 text-right">Queue</th>
              <th className="py-2.5 px-3">Provider Sync</th>
              <th className="py-2.5 px-3">Governance</th>
              <th className="py-2.5 px-3">Last Activity</th>
              <th className="py-2.5 px-3 text-center w-10">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {channels.length === 0 ? (
              <tr>
                <td colSpan={20} className="py-8 text-center text-gray-500 font-normal">
                  No channels found for the selected filters.
                </td>
              </tr>
            ) : (
              channels.map((ch) => {
                const isSelected = selectedId === ch.id;
                const isChecked = selectedCheckboxes.includes(ch.id);

                return (
                  <tr
                    key={ch.id}
                    onClick={() => onSelectChannel(ch)}
                    className={`transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-rose-50/50 hover:bg-rose-50"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCheckbox(ch.id)}
                        className="rounded border-gray-300 text-[#800020] focus:ring-[#800020] cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-2">
                      {getChannelIcon(ch.type)}
                      <span>{ch.channelName}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-gray-600">
                      {ch.channelId}
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">{ch.type}</td>
                    <td className="py-2.5 px-3">
                      <ChannelStatusBadge status={ch.status} />
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{ch.provider}</td>
                    <td className="py-2.5 px-3 text-gray-600">{ch.businessUnit}</td>
                    <td className="py-2.5 px-3 text-gray-600">{ch.market}</td>
                    <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">
                      {ch.senderAccount}
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">{ch.consentScope}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                      {ch.messages30D}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">
                      {ch.deliveryRate}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-blue-700">
                      {ch.engagement}
                    </td>
                    <td className="py-2.5 px-3 text-right text-rose-600">
                      {ch.failureRate}
                    </td>
                    <td className="py-2.5 px-3 text-right text-amber-600">
                      {ch.suppressionRate}
                    </td>
                    <td className="py-2.5 px-3 text-right text-gray-700">
                      {ch.queue}
                    </td>
                    <td className="py-2.5 px-3">
                      <ChannelStatusBadge status={ch.providerSync} type="providerSync" />
                    </td>
                    <td className="py-2.5 px-3 text-gray-600">
                      <span className="text-emerald-700 font-semibold">{ch.governance}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 text-[11px]">
                      {ch.lastActivity}
                    </td>
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
