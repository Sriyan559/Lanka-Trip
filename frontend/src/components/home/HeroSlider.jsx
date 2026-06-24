'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { HERO_SLIDES } from '@/lib/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSlider({ banners }) {
  const slides = banners ?? HERO_SLIDES;

  if (!slides.length) return null;

  return (
    <div className="flex-1 min-w-0 rounded-xl overflow-hidden shadow-sm">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="h-[340px] md:h-[380px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full flex flex-col justify-center px-10"
              style={{ background: slide.bg || '#155e2c' }}
            >
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                width={1200}
                height={600}
                unoptimized
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              {/* Content */}
              <div className="relative z-10 max-w-xs">
                <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
                  {slide.title}
                </h2>
                <p className="text-white/80 text-sm mb-5">{slide.subtitle}</p>
                <div className="flex gap-3">
                  <Link
                    href={slide.link || '/search'}
                    className="px-5 py-2 bg-white text-primary-800 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Source Now
                  </Link>
                  <Link
                    href="/rfq"
                    className="px-5 py-2 bg-accent-500 text-white text-sm font-semibold rounded-full hover:bg-accent-600 transition-colors"
                  >
                    Post RFQ
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
