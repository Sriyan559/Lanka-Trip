'use client';

import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TestimonialsSection({ testimonials }) {
  const handleReadMore = () => {
    toast('Customer reviews archive will be available in Phase 2.', {
      icon: '💬',
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase mb-1.5 block">
            TRAVELERS SPEAK
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Real Stories, Unforgettable Journeys
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            See what travelers say about their LankaTrip Planner experiences.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReadMore}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors group shrink-0 self-start sm:self-auto"
        >
          <span>Read More Reviews</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            {/* Quote Message */}
            <div className="mb-6">
              <p className="text-sm text-slate-700 leading-relaxed font-normal italic">
                {item.message}
              </p>
            </div>

            {/* Author Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.country}
                  </div>
                </div>
              </div>

              {/* 5 Golden Stars */}
              <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
