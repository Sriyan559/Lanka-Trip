'use client';

import React, { useState } from 'react';
import { Send, Paperclip, MessageSquare, ShieldCheck, User } from 'lucide-react';
import type { ConversationMessage } from '@/types/customerSupportDetail';

interface ConversationTabProps {
  messages: ConversationMessage[];
  onSendMessage: (text: string) => void;
}

export function ConversationTab({ messages, onSendMessage }: ConversationTabProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <MessageSquare size={16} className="text-primary-900" />
          <span>Customer Conversation Record</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          Showing {messages.length} messages • All messages visible to customer
        </span>
      </div>

      {/* Message List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {messages.map((msg) => {
          const isCustomer = msg.senderRole === 'Customer';
          const isSystem = msg.senderRole === 'System';

          return (
            <div
              key={msg.id}
              className={`p-4 rounded-lg border ${
                isCustomer
                  ? 'bg-slate-50 border-slate-200'
                  : isSystem
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-primary-50/30 border-primary-900/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCustomer
                        ? 'bg-emerald-100 text-emerald-800'
                        : isSystem
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-primary-900 text-white'
                    }`}
                  >
                    {isCustomer ? <User size={12} /> : isSystem ? 'S' : <ShieldCheck size={12} />}
                  </div>
                  <span className="font-bold text-ink text-[12px]">{msg.senderName}</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-white border border-slate-200 rounded text-slate-600">
                    {msg.senderRole}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">({msg.channel})</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{msg.timestamp}</span>
              </div>

              <p className="text-[13px] text-slate-700 leading-relaxed font-medium">{msg.messageBody}</p>

              {msg.deliveryStatus && (
                <div className="mt-2 text-[10px] text-slate-400 font-bold text-right uppercase tracking-wider">
                  Status: {msg.deliveryStatus}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reply Composer */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-line rounded-lg space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-slate-700">Reply to Customer</span>
          <span className="text-[11px] font-semibold text-slate-500">Channel: In-App Chat</span>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message to the customer..."
          className="w-full min-h-[90px] p-3 bg-white border border-line rounded-lg text-[13px] text-ink focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 transition-shadow resize-y"
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-line text-slate-700 text-[12px] font-bold rounded hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Paperclip size={14} />
            <span>Attach Evidence / Image</span>
          </button>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex items-center gap-1.5 px-5 py-2 bg-primary-900 text-white text-[13px] font-bold rounded-lg hover:bg-primary-800 transition-colors shadow-sm disabled:opacity-70"
          >
            <Send size={14} />
            <span>Send Message</span>
          </button>
        </div>
      </form>
    </div>
  );
}
