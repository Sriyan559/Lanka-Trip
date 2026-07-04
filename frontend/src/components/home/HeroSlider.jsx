'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { HERO_SLIDES } from '@/lib/constants';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroSlider() {
  const slides = HERO_SLIDES;

  if (!slides.length) return null;

  return (
    <section className="min-w-0 flex-1 overflow-hidden bg-white">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4600, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="beauty-hero-swiper pb-9 [&_.swiper-pagination]:bottom-0 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:h-2 [&_.swiper-pagination-bullet-active]:w-8 [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:bg-black"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative mx-auto min-h-[520px] max-w-[1280px] overflow-hidden rounded-xl bg-black shadow-sm sm:min-h-[430px] lg:min-h-[430px]">
              
              {/* Full background image */}
              <Image
                src={slide.image}
                alt={slide.imageAlt || slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />

              {/* Light overlay for readable text */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent" />

              {/* Text content */}
              <div className="relative z-10 flex min-h-[520px] max-w-[560px] flex-col justify-center px-6 pb-20 pt-8 text-center sm:min-h-[430px] sm:px-10 lg:min-h-[430px] lg:px-14 lg:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/70 sm:text-sm">
                  {slide.eyebrow}
                </p>

                <h1 className="mt-3 whitespace-pre-line text-[42px] font-black leading-[0.95] tracking-normal text-black sm:text-6xl lg:text-[64px] xl:text-[72px]">
                  {slide.title}
                </h1>

                <p className="mt-3 text-lg font-medium text-black/70 sm:text-xl">
                  {slide.subtitle}
                </p>

                <div className="mt-7">
                  <Link
                    href={slide.link || '/products'}
                    className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    {slide.buttonLabel}
                  </Link>
                </div>
              </div>

              {/* Brand strip */}
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/50 bg-[#fff2e4]/95 px-4 py-3 backdrop-blur">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-black/68 sm:text-xs lg:justify-start lg:pl-8">
                  {slide.brands.map((brand) => (
                    <span key={`${slide.id}-${brand}`}>{brand}</span>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}