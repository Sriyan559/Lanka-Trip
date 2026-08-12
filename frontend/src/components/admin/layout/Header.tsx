'use client';

import React, { useRef, useState } from 'react';
import { Search, Bell, HelpCircle, Settings, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useClickOutside } from '@/lib/useClickOutside';

export function Header({
  onMenuClick,
  searchPlaceholder = 'Search case, customer, order, return, shipment, product, supplier or message...',
}: {
  onMenuClick: () => void;
  searchPlaceholder?: string;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  useClickOutside(notifRef, () => setNotifOpen(false));

  return (
    <header className="header-rich h-[52px] bg-white border-b border-line px-5 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative flex items-center w-full">
          <Search size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full h-8 pl-9 pr-3 text-[12px] bg-canvas border border-line rounded-md text-ink focus:outline-none focus:ring-1 focus:ring-primary-900 placeholder:text-slate-400"
            aria-label="Global search"
          />
        </div>
      </div>

      {/* Right User & Actions Bar */}
      <div className="flex items-center gap-3">
        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => toast('Quick Actions menu')}
          className="h-8 px-3 bg-[#7a0016] text-white text-[12px] font-semibold rounded-md hover:bg-[#600011] transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>Quick Action</span>
          <ChevronDown size={13} />
        </button>

        {/* Notifications Icon with Badge 12 */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((p) => !p)}
            className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              12
            </span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-line rounded-lg shadow-lg p-3 z-50">
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Notifications</p>
              <div className="space-y-2 text-[11px]">
                <div className="p-2 hover:bg-slate-50 rounded cursor-pointer">
                  <strong className="block text-ink">CS-2026-008238 SLA Breach</strong>
                  <span className="text-slate-500">Critical safety complaint overdue</span>
                </div>
                <div className="p-2 hover:bg-slate-50 rounded cursor-pointer">
                  <strong className="block text-ink">Payment Failure Escalation</strong>
                  <span className="text-slate-500">Order ORD-2026-009018 charge issue</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Center Icon */}
        <button
          type="button"
          onClick={() => toast('Help & Documentation')}
          className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Help"
        >
          <HelpCircle size={17} />
        </button>

        {/* Settings Icon */}
        <button
          type="button"
          onClick={() => toast('Admin Settings')}
          className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Settings"
        >
          <Settings size={17} />
        </button>

        <div className="w-[1px] h-5 bg-line mx-1" />

        {/* User Profile Info */}
        <div className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-slate-50 transition-colors">
          <div className="w-7 h-7 rounded-full bg-primary-900 text-white text-[11px] font-bold flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
              alt="Elena Vance"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-bold">EV</span>
          </div>
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-[12px] font-bold text-ink whitespace-nowrap">Elena Vance</span>
            <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">Support Operations Lead</span>
          </div>
          <ChevronDown size={13} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
