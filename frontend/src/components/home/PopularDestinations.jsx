'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PopularDestinations({ destinations }) {
  const handleDestinationClick = (name) => {
    toast(`Viewing destination guide for ${name} (Phase 1 demo).`, {
      icon: '📍',
    });
  };

  const handleViewAll = () => {
    toast('View All Destinations directory will be integrated in Phase 2.', {
      icon: '🏝️',
    });
  };

  return (
    <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase mb-1.5 block">
            EXPLORE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            From cultural wonders to pristine beaches, explore the best of Sri Lanka.
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors group shrink-0 self-start sm:self-auto"
        >
          <span>View All Destinations</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => handleDestinationClick(dest.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDestinationClick(dest.name);
              }
            }}
            className="group cursor-pointer flex flex-col focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-2xl"
          >
            {/* Image Container with smooth zoom */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-sm border border-slate-100">
              <img
                src={dest.image}
                alt={dest.imageAlt || dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Destination Info */}
            <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              {dest.name}
            </h3>
            <p className="text-xs text-slate-500 leading-snug mt-0.5">
              {dest.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
