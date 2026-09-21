export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isAvailable?: boolean;
}

export interface PlannerOptions {
  tripLengths: string[];
  travelersOptions: string[];
  budgets: string[];
  startCities: string[];
  interestsOptions: string[];
}

export interface PlannerDefaults {
  tripLength: string;
  travelers: string;
  budget: string;
  startCity: string;
  interests: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href?: string;
}

export interface PopularDestination {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt?: string;
  slug: string;
}

export interface ItineraryDay {
  dayNumber: number;
  destination: string;
  title?: string;
  description: string;
  image: string;
}

export interface ItineraryPreviewData {
  id: string;
  title: string;
  duration: string;
  destinationCount: number;
  summary: string;
  features: string[];
  days: ItineraryDay[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  country: string;
  message: string;
  rating: number;
  avatar: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  isAvailable?: boolean;
}

export interface FooterData {
  usefulLinks: FooterLinkItem[];
  travelerLinks: FooterLinkItem[];
  partnerLinks: FooterLinkItem[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface HomePageData {
  navigation: NavigationItem[];
  plannerOptions: PlannerOptions;
  plannerDefaults: PlannerDefaults;
  serviceCategories: ServiceCategory[];
  popularDestinations: PopularDestination[];
  sampleItinerary: ItineraryPreviewData;
  testimonials: TestimonialItem[];
  footer: FooterData;
}
