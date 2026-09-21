'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Heart, ArrowRight, Compass } from 'lucide-react';
import SriLankaRouteMap from './SriLankaRouteMap';
import toast from 'react-hot-toast';

export default function ItineraryPreview({ itinerary }) {
  const [activeDay, setActiveDay] = useState(1);

  const handleCreateOwnTrip = () => {
    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewFull = () => {
    toast('Opening full 7-day Sri Lanka detailed breakdown (Phase 1 demo).', {
      icon: '🗺️',
    });
  };

  const days = itinerary?.days || [];

  return (
    <section id="itinerary-preview" className="relative w-full bg-[#EEF7F7] py-14 sm:py-20 border-y border-teal-100/60 overflow-hidden">
      {/* Background Scenic Landscape Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none transition-all"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(238, 247, 247, 0.96) 0%,
              rgba(238, 247, 247, 0.82) 28%,
              rgba(238, 247, 247, 0.35) 46%,
              rgba(238, 247, 247, 0.15) 60%,
              rgba(238, 247, 247, 0.85) 90%,
              rgba(238, 247, 247, 0.98) 100%
            ),
            url('/images/trip-inspiration-bg.webp')
          `,
          backgroundPosition: 'center 42%',
          backgroundSize: 'cover',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          
          {/* Left Column: Copy, CTAs, Summary Badges */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-7">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-teal-700 uppercase block">
                TRIP INSPIRATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {itinerary?.title || 'A 7-Day Sri Lanka Itinerary Preview'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {itinerary?.summary ||
                  'From ancient cities to tea country and golden beaches, see how an unforgettable journey comes together.'}
              </p>

              {/* CTAs matching reference */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCreateOwnTrip}
                  className="px-5 py-3 bg-[#E86339] hover:bg-[#D5532A] text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Create Your Own Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleViewFull}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-teal-800 hover:text-teal-950 transition-colors"
                >
                  <Compass className="w-4 h-4 text-teal-600" />
                  <span>View Full Itinerary</span>
                </button>
              </div>
            </div>

            {/* Stats Highlight Pill Container */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-teal-100 shadow-sm space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">7 Days</span>
                  <span className="text-slate-300 mx-1.5">•</span>
                  <span className="text-slate-500">Perfect balance</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">6 Destinations</span>
                  <span className="text-slate-300 mx-1.5">•</span>
                  <span className="text-slate-500">Cities, nature & coast</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                </div>
                <div>
                  <span className="font-bold text-slate-900">Amazing Experiences</span>
                  <span className="text-slate-300 mx-1.5">•</span>
                  <span className="text-slate-500">Culture, wildlife, food & more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Vertical Day-by-Day Timeline */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-teal-100/80">
            <div className="space-y-4">
              {days.map((item, idx) => {
                const isSelected = activeDay === item.dayNumber;
                return (
                  <div
                    key={item.dayNumber}
                    onClick={() => setActiveDay(item.dayNumber)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveDay(item.dayNumber);
                      }
                    }}
                    className={`flex items-center gap-3.5 p-2 rounded-xl transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-teal-50/90 ring-1 ring-teal-600/30'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Destination Circular Photo */}
                    <div className="relative shrink-0">
                      <div className={`w-11 h-11 rounded-full overflow-hidden border-2 ${
                        isSelected ? 'border-[#E86339]' : 'border-teal-600/40'
                      }`}>
                        <img
                          src={item.image}
                          alt={item.destination}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {/* Timeline connecting line */}
                      {idx < days.length - 1 && (
                        <div className="absolute left-1/2 -bottom-4 w-0.5 h-3.5 bg-teal-200 -translate-x-1/2" />
                      )}
                    </div>

                    {/* Timeline Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-teal-800">
                          Day {item.dayNumber}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900">
                          {item.destination}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Illustrated Sri Lanka Map */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <SriLankaRouteMap
              activeDay={activeDay}
              onSelectDay={(day) => setActiveDay(day)}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
