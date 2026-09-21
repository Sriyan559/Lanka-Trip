'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Palmtree, Sun, Waves } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LankaHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Planner', href: '#planner' },
    { label: 'Stays', href: '#services' },
    { label: 'Drivers', href: '#services' },
    { label: 'Guides', href: '#services' },
    { label: 'Activities', href: '#services' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    toast(`Searching for "${searchQuery}" in Sri Lanka... (Phase 1 demo)`, {
      icon: '🔍',
    });
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleAction = (label) => {
    toast(`Demo preview: ${label} feature will connect to Laravel auth in Phase 2.`, {
      icon: '🌴',
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo matching reference screenshot */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 flex items-center justify-center text-teal-600 transition-transform group-hover:scale-105">
            <Sun className="w-6 h-6 text-amber-500 absolute -top-1 -right-0.5" />
            <Palmtree className="w-7 h-7 text-emerald-600 relative z-10 -ml-1 mt-0.5" />
            <Waves className="w-8 h-4 text-teal-500 absolute bottom-0 right-0" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
              LankaTrip
            </span>
            <span className="text-xs font-bold tracking-wider text-teal-700 uppercase mt-0.5">
              Planner
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors py-1 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Tools & CTAs */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search destinations, stays..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-48 sm:w-60 pl-3 pr-8 py-1.5 text-xs bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            onClick={() => handleAction('Sign In')}
            className="px-4 py-2 text-sm font-semibold text-slate-800 hover:text-slate-950 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all active:scale-95"
          >
            Sign In
          </button>

          {/* Get Started Button */}
          <button
            type="button"
            onClick={() => {
              const plannerElement = document.getElementById('planner');
              if (plannerElement) {
                plannerElement.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleAction('Get Started');
              }
            }}
            className="px-4 py-2 text-sm font-bold text-white bg-[#E86339] hover:bg-[#D5532A] rounded-lg shadow-sm shadow-orange-500/25 transition-all hover:shadow active:scale-95 flex items-center gap-1.5"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
            className="p-2 text-slate-700 hover:text-slate-900"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="sm:hidden px-4 pb-3 pt-1 border-t border-slate-100 bg-white">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search destinations, stays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          </form>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleAction('Sign In');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                const plannerElement = document.getElementById('planner');
                if (plannerElement) {
                  plannerElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#E86339] hover:bg-[#D5532A] rounded-lg shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
