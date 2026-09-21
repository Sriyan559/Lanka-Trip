'use client';

import React from 'react';
import { X, Calendar, Users, Coins, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DemoItineraryModal({ isOpen, onClose, plannerState }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-teal-700 to-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Your Custom Sri Lanka Trip</h3>
              <p className="text-xs text-teal-100">Phase 1 Interactive Preview</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
            <span className="text-base leading-none">ℹ️</span>
            <div>
              <p className="font-semibold">Demo preview mode active</p>
              <p className="text-amber-800/90 mt-0.5">
                Live itinerary generation with our AI advisor and Laravel backend will be connected in Phase 2. Below is your selected trip configuration:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>Trip Duration</span>
              </div>
              <div className="text-sm font-bold text-slate-800">{plannerState.tripLength}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Users className="w-3.5 h-3.5 text-teal-600" />
                <span>Travelers</span>
              </div>
              <div className="text-sm font-bold text-slate-800">{plannerState.travelers}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <Coins className="w-3.5 h-3.5 text-teal-600" />
                <span>Budget tier</span>
              </div>
              <div className="text-sm font-bold text-slate-800">{plannerState.budget}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Starting Point</span>
              </div>
              <div className="text-sm font-bold text-slate-800">{plannerState.startCity}</div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-2">Selected Interests:</div>
            <div className="flex flex-wrap gap-1.5">
              {plannerState.interests.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200/70 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-teal-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#E86339] hover:bg-[#D5532A] text-white font-bold rounded-xl text-sm transition-colors shadow-md shadow-orange-500/20"
            >
              Explore Sample Itinerary Below ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
