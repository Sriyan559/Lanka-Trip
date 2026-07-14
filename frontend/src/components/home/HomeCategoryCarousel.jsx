'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useCategories from '@/hooks/useCategories';

const CATEGORY_CAROUSEL_ITEMS = [
  {
    slug: 'makeup',
    name: 'Makeup',
    fallbackImage: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Hp-Makeup-Top-categories-1775901570015.jpeg',
    link: '/categories/makeup',
  },
  {
    slug: 'skincare',
    name: 'Skincare',
    fallbackImage: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Skincare-1775740065304.jpeg',
    link: '/categories/skincare',
  },
  {
    slug: 'hair-care',
    name: 'Hair',
    fallbackImage: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Hair-1775743606558.jpeg',
    link: '/categories/hair-care',
  },
  {
    slug: 'fragrance',
    name: 'Fragrance',
    fallbackImage: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Frag-1775742093518.jpeg',
    link: '/categories/fragrance',
  },
  {
    slug: 'bath-body',
    name: 'Bath & Body',
    fallbackImage: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Bath-and-body-1775741959054.jpeg',
    link: '/categories/bath-body',
  },
  {
    slug: 'mens-grooming',
    name: 'Men',
    fallbackImage: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Men-1775742004145.jpeg',
    link: '/categories/mens-grooming',
  },
  {
    slug: 'wellness',
    name: 'Wellness',
    fallbackImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=720&q=85',
    link: '/categories/wellness',
  },
];

export default function HomeCategoryCarousel() {
  const { categories } = useCategories();
  const [swiper, setSwiper] = useState(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updatePosition = (instance) => {
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  const carouselItems = CATEGORY_CAROUSEL_ITEMS.map((item) => {
    const dbCategory = categories.find((cat) => cat.slug === item.slug);
    return {
      ...item,
      image: dbCategory?.image || item.fallbackImage,
    };
  });

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
          {carouselItems.map((category, index) => (
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
