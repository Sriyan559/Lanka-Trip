"use client";

import React from "react";
import { Clock, Store, Layers, Globe, LifeBuoy, CheckCircle2, RefreshCw, MessageSquare } from "lucide-react";

export function ConversationsScopeBar() {
  return (
    <div className="w-full bg-slate-50/80 border border-slate-200 rounded-md p-2 mb-4 text-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-4 shadow-2xs">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-slate-400" />
          <span className="text-slate-500 font-medium">Time</span>
          <span className="font-semibold text-slate-900">St. Beauty</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Ecosystem */}
        <div className="flex items-center gap-1.5">
          <Store size={13} className="text-slate-400" />
          <span className="text-slate-500 font-medium">Ecosystem</span>
          <span className="font-semibold text-slate-900">Beauty Marketplace</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Business Unit */}
        <div className="flex items-center gap-1.5">
          <Layers size={13} className="text-slate-400" />
          <span className="text-slate-500 font-medium">Business Unit</span>
          <span className="font-semibold text-slate-900">All Business Units</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Region */}
        <div className="flex items-center gap-1.5">
          <Globe size={13} className="text-slate-400" />
          <span className="text-slate-500 font-medium">Region</span>
          <span className="font-semibold text-slate-900">Sri Lanka</span>
        </div>

        <div className="h-3 w-px bg-slate-200 hidden sm:block" />

        {/* Support Scope */}
        <div className="flex items-center gap-1.5">
          <LifeBuoy size={13} className="text-slate-400" />
          <span className="text-slate-500 font-medium">Support Scope</span>
          <span className="font-semibold text-slate-900">All Customer Support</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {/* Customer Source */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium">Customer Source</span>
          <div className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 size={11} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        {/* Case Source */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium">Case Source</span>
          <div className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 size={11} className="text-emerald-600" />
            <span>Connected</span>
          </div>
        </div>

        {/* Content Sync */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium">Content Sync</span>
          <div className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            <RefreshCw size={11} className="text-emerald-600" />
            <span>Healthy</span>
          </div>
        </div>

        {/* Channel Scope */}
        <div className="flex items-center gap-1.5">
          <MessageSquare size={13} className="text-slate-400" />
          <span className="text-slate-500 font-medium">Channel Scope</span>
          <span className="font-semibold text-slate-900">All Channels</span>
        </div>
      </div>
    </div>
  );
}
