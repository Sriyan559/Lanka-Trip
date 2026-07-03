'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, FileText, Search, ShieldCheck, Ship } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const trustPoints = [
  { label: 'Verified exporters', icon: ShieldCheck },
  { label: 'RFQ quote matching', icon: FileText },
  { label: 'Export-ready products', icon: Ship },
];

const marketplaceMetrics = [
  { value: '500+', label: 'supplier profiles' },
  { value: '14', label: 'export categories' },
  { value: '24h', label: 'RFQ response target' },
];

const heroVisualTiles = [
  { label: 'Ceylon tea', value: 'MOQ + FOB ready' },
  { label: 'Coconut wellness', value: 'resort amenity sourcing' },
  { label: 'Spices and packaging', value: 'Maldives buyer fit' },
];

export default function HeroSlider({ banners }) {
  const slides = banners ?? HERO_SLIDES;

  if (!slides.length) return null;

  return (
    <section className="flex-1 min-w-0 overflow-hidden rounded-xl border border-primary-900/10 bg-primary-950 shadow-sm">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="h-[460px] sm:h-[430px] lg:h-[390px] xl:h-[410px] [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden lg:[&_.swiper-button-next]:flex lg:[&_.swiper-button-prev]:flex [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:after:text-[18px] [&_.swiper-button-prev]:after:text-[18px] [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:bg-accent-400 [&_.swiper-pagination-bullet-active]:opacity-100"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden bg-primary-950">
              <Image
                src={slide.image}
                alt={slide.title}
                width={1200}
                height={600}
                unoptimized
                priority={index === 0}
                className="absolute inset-0 h-full w-full object-cover opacity-45"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    slide.bg ||
                    'linear-gradient(115deg, rgba(7, 46, 31, 0.96) 0%, rgba(9, 72, 52, 0.82) 47%, rgba(11, 25, 43, 0.62) 100%)',
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,13,0.82)_0%,rgba(3,18,13,0.54)_52%,rgba(3,18,13,0.22)_100%)]" />

              <div className="relative z-10 grid h-full grid-cols-1 gap-6 px-5 py-6 sm:px-7 md:px-9 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-center lg:px-10 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div className="flex max-w-2xl flex-col justify-center">
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur">
                    <BadgeCheck size={15} className="text-accent-300" />
                    Sri Lanka national B2B export marketplace
                  </div>

                  <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[42px]">
                    {slide.title}
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/86 sm:text-base">
                    {slide.subtitle}
                    <span className="hidden sm:inline">
                      {' '}Connect Maldives buyers with verified Sri Lankan suppliers, export pricing,
                      MOQ details, and RFQ-ready product lines.
                    </span>
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={slide.link || '/products'}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary-900 shadow-sm transition-colors hover:bg-primary-50"
                    >
                      Explore export products
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/rfq"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
                    >
                      Post an RFQ
                      <FileText size={16} />
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {trustPoints.map(({ label, icon: Icon }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 rounded-lg border border-white/14 bg-white/8 px-3 py-2 text-xs font-medium text-white/88 backdrop-blur"
                      >
                        <Icon size={15} className="text-accent-300" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="hidden rounded-xl border border-white/16 bg-white/12 p-4 text-white shadow-xl backdrop-blur-md lg:block">
                  <div className="flex items-center gap-2 border-b border-white/14 pb-3">
                    <Search size={17} className="text-accent-300" />
                    <div>
                      <p className="text-sm font-semibold">Buyer sourcing desk</p>
                      <p className="text-xs text-white/68">Built for Maldives procurement teams</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {heroVisualTiles.map((item) => (
                      <div key={item.label} className="rounded-lg bg-white/10 p-3">
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="mt-1 text-xs text-white/68">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/14 pt-4">
                    {marketplaceMetrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="text-lg font-bold text-accent-300">{metric.value}</p>
                        <p className="mt-1 text-[11px] leading-4 text-white/66">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
