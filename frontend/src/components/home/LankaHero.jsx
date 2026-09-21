'use client';

import React from 'react';
import { Droplet, ShieldCheck, Heart } from 'lucide-react';

export default function LankaHero() {
  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] bg-slate-900 overflow-hidden flex flex-col justify-start">
      {/* Background Image: Coastal lighthouse panorama */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-lighthouse.jpg')`,
        }}
        aria-hidden="true"
      >
        {/* Left-side dark vignette gradient for text contrast + subtle top/bottom scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-slate-950/60" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-36 sm:pb-40 w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        
        {/* Left Column: Heading, Subtitle, Feature Badges */}
        <div className="max-w-2xl text-white space-y-5">
          {/* Eyebrow / Kicker */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.18em] text-slate-200 uppercase">
              YOUR SRI LANKA, YOUR WAY
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-white leading-[1.12] drop-shadow-md">
            Build Your Perfect <br />
            Sri Lanka Itinerary
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-100/95 leading-relaxed font-normal max-w-xl drop-shadow">
            Discover amazing places, book trusted local services,
            and create unforgettable travel experiences.
          </p>

          {/* Feature Badges matching reference */}
          <div className="pt-3 flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm text-white/95 font-medium">
            <div className="flex items-center gap-2 drop-shadow">
              <Droplet className="w-4 h-4 fill-white text-white" />
              <span>Authentic experiences</span>
            </div>
            <div className="flex items-center gap-2 drop-shadow">
              <ShieldCheck className="w-4 h-4 text-white stroke-[2.2]" />
              <span>Trusted local partners</span>
            </div>
            <div className="flex items-center gap-2 drop-shadow">
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>Support local communities</span>
            </div>
          </div>
        </div>

        {/* Right Cursive Script Element matching reference */}
        <div className="hidden lg:flex flex-col items-end text-right pr-4 pt-4 select-none">
          <div className="font-handwriting text-white text-3xl xl:text-4xl leading-tight font-bold tracking-wide drop-shadow-lg rotate-[-3deg]">
            <p>More</p>
            <p className="-mt-1">than a trip</p>
            <p className="mt-1">A deeper</p>
            <p className="-mt-1">Sri Lanka</p>
          </div>
        </div>

      </div>
    </section>
  );
}
