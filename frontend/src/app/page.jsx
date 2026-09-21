import React from 'react';
import LankaHeader from '@/components/layout/LankaHeader';
import LankaHero from '@/components/home/LankaHero';
import TripPlannerForm from '@/components/home/TripPlannerForm';
import ServiceCategories from '@/components/home/ServiceCategories';
import PopularDestinations from '@/components/home/PopularDestinations';
import ItineraryPreview from '@/components/home/ItineraryPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LankaFooter from '@/components/layout/LankaFooter';
import { getHomePageData } from '@/services/homeService';

export const metadata = {
  title: 'LankaTrip Planner — Build Your Perfect Sri Lanka Itinerary',
  description:
    'Discover amazing places, book trusted local services, and create unforgettable travel experiences across Sri Lanka.',
  keywords: [
    'Sri Lanka travel',
    'Sri Lanka itinerary',
    'trip planner',
    'Sri Lanka tourism',
    'Sigiriya',
    'Ella',
    'Kandy',
    'Yala safari',
    'Galle Fort',
    'Colombo',
  ],
  openGraph: {
    title: 'LankaTrip Planner — Build Your Perfect Sri Lanka Itinerary',
    description:
      'Discover amazing places, book trusted local services, and create unforgettable travel experiences across Sri Lanka.',
    type: 'website',
  },
};

export default async function HomePage() {
  const homeData = await getHomePageData();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-600 selection:text-white">
      {/* 1. Header / Navigation */}
      <LankaHeader />

      <main className="flex-1 w-full">
        {/* 2. Hero Banner */}
        <LankaHero />

        {/* 3. Floating Trip Planner Form */}
        <TripPlannerForm
          options={homeData.plannerOptions}
          defaults={homeData.plannerDefaults}
        />

        {/* 4. Service Category Cards */}
        <ServiceCategories categories={homeData.serviceCategories} />

        {/* 5. Popular Destinations */}
        <PopularDestinations destinations={homeData.popularDestinations} />

        {/* 6. Itinerary Preview (7-Day Preview + Sri Lanka Map) */}
        <ItineraryPreview itinerary={homeData.sampleItinerary} />

        {/* 7. Testimonials */}
        <TestimonialsSection testimonials={homeData.testimonials} />
      </main>

      {/* 8. Footer */}
      <LankaFooter footerData={homeData.footer} />
    </div>
  );
}
