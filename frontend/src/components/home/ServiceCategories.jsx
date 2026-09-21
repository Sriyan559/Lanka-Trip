'use client';

import React from 'react';
import { Bed, Car, Compass, Mountain, Utensils } from 'lucide-react';
import toast from 'react-hot-toast';

function ElephantIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 18v-5c0-4 3-7 7-7h4a4 4 0 0 1 4 4v4" />
      <path d="M19 14v4" />
      <path d="M15 18v-5" />
      <path d="M11 18v-5" />
      <path d="M4 14h3" />
      <circle cx="16" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

export default function ServiceCategories({ categories }) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'stays':
        return <Bed className="w-6 h-6 text-teal-600" />;
      case 'drivers':
        return <Car className="w-6 h-6 text-teal-600" />;
      case 'guides':
        return <Compass className="w-6 h-6 text-teal-600" />;
      case 'activities':
        return <Mountain className="w-6 h-6 text-teal-600" />;
      case 'restaurants':
        return <Utensils className="w-6 h-6 text-rose-500" />;
      case 'safari':
        return <ElephantIcon className="w-6 h-6 text-slate-800" />;
      default:
        return <Compass className="w-6 h-6 text-teal-600" />;
    }
  };

  const handleClick = (title) => {
    toast(`Viewing verified local ${title} (Phase 1 demo).`, {
      icon: '✨',
    });
  };

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleClick(cat.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(cat.title);
              }
            }}
            className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-pointer flex flex-col items-center text-center hover:-translate-y-1 select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-teal-50/70 flex items-center justify-center mb-3 transition-colors">
              {getCategoryIcon(cat.iconName)}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-teal-700 transition-colors mb-1">
              {cat.title}
            </h3>
            <p className="text-xs text-slate-500 leading-snug">
              {cat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
