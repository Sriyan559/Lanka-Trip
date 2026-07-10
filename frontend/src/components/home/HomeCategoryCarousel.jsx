'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';

const HOME_CATEGORY_CAROUSEL = [
  {
    name: 'Makeup',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=720&q=85',
    link: '/categories/makeup',
  },
  {
    name: 'Skincare',
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=720&q=85',
    link: '/categories/skincare',
  },
  {
    name: 'Hair',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=720&q=85',
    link: '/categories/hair-care',
  },
  {
    name: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=720&q=85',
    link: '/categories/fragrance',
  },
  {
    name: 'Bath & Body',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=720&q=85',
    link: '/categories/bath-body',
  },
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&q=85',
    link: '/categories/mens-grooming',
  },
  {
    name: 'Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=720&q=85',
    link: '/categories/wellness',
  },
];

export default function HomeCategoryCarousel() {
  const [swiper, setSwiper] = useState(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updatePosition = (instance) => {
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  return (
    <section aria-label="Shop product categories" className="bg-white pb-5 pt-6 sm:pb-6 sm:pt-7 lg:pt-8">
      <div className="relative overflow-hidden">
        <Swiper
          onSwiper={(instance) => {
            setSwiper(instance);
            updatePosition(instance);
          }}
          onSlideChange={updatePosition}
          onResize={updatePosition}
          slidesPerView={1.65}
          spaceBetween={16}
          watchOverflow
          className="home-category-carousel"
          breakpoints={{
            480: { slidesPerView: 2.2, spaceBetween: 18 },
            640: { slidesPerView: 3.2, spaceBetween: 18 },
            768: { slidesPerView: 4.1, spaceBetween: 20 },
            1024: { slidesPerView: 5.15, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {HOME_CATEGORY_CAROUSEL.map((category, index) => (
            <SwiperSlide key={category.name} className="pb-1">
              <Link
                href={category.link}
                className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
              >
                <span className="relative block aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={category.image}
                    alt={`${category.name} beauty category`}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 640px) 56vw, (max-width: 1024px) 24vw, 190px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                  />
                </span>
                <span className="mt-3 block text-left text-base font-medium leading-snug text-gray-950 sm:text-[17px]">
                  {category.name}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous categories"
          onClick={() => swiper?.slidePrev()}
          disabled={!swiper || atStart}
          className={`absolute left-2 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-[0_6px_18px_rgba(15,23,42,0.16)] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 sm:flex ${
            atStart ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <ChevronLeft size={23} />
        </button>

        <button
          type="button"
          aria-label="Next categories"
          onClick={() => swiper?.slideNext()}
          disabled={!swiper || atEnd}
          className={`absolute right-2 top-[42%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-[0_6px_18px_rgba(15,23,42,0.16)] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 ${
            atEnd ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <ChevronRight size={23} />
        </button>
      </div>
    </section>
  );
}
