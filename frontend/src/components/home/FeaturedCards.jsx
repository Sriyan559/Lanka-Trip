import Link from 'next/link';
import { ArrowRight, Scissors, Heart, GraduationCap, Calendar } from 'lucide-react';

// Keep card copy, destinations, icons, and artwork together so this section is easy to refresh.
const BEAUTY_BENEFITS = [
  {
    highlightTitle: 'Shop',
    normalTitle: ' Beauty',
    description: [
      { text: 'Shop ' },
      { text: 'advanced skincare', highlight: true },
      { text: ', dermatology, ' },
      { text: 'laser treatments', highlight: true },
      { text: ', and anti-aging therapies' }
    ],
    href: '/suppliers?q=clinic',
    Icon: Heart,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Aesthetic beauty clinic facial treatment',
    iconClass: 'bg-emerald-50/80 text-emerald-800 border border-emerald-100/30',
    overlayClass: 'from-white/80 via-emerald-50/50 to-emerald-100/35',
    accentClass: 'bg-emerald-300/20',
    highlightClass: 'text-emerald-700 font-extrabold',
  },
  {
    highlightTitle: 'Experience',
    normalTitle: ' Beauty',
    description: [
      { text: 'Professional ' },
      { text: 'hair styling', highlight: true },
      { text: ', coloring, ' },
      { text: 'bridal makeovers', highlight: true },
      { text: ', and nail artistry' }
    ],
    href: '/suppliers?q=salon',
    Icon: Scissors,
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Professional stylist working at a beauty salon',
    iconClass: 'bg-rose-50/80 text-rose-800 border border-rose-100/30',
    overlayClass: 'from-white/80 via-rose-50/50 to-rose-100/35',
    accentClass: 'bg-rose-300/20',
    highlightClass: 'text-rose-700 font-extrabold',
  },
  {
    highlightTitle: 'Grow',
    normalTitle: ' Beauty',
    description: [
      { text: 'Certified ' },
      { text: 'training courses', highlight: true },
      { text: ', ' },
      { text: 'makeup workshops', highlight: true },
      { text: ', and professional beauty certifications' }
    ],
    href: '/suppliers?q=academy',
    Icon: GraduationCap,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Cosmetics academy training workspace',
    iconClass: 'bg-amber-50/80 text-amber-850 border border-amber-100/30',
    overlayClass: 'from-white/80 via-amber-50/50 to-amber-100/35',
    accentClass: 'bg-amber-300/20',
    highlightClass: 'text-amber-700 font-extrabold',
  },
  {
    highlightTitle: 'Learn',
    normalTitle: ' Beauty',
    description: [
      { text: 'Exclusive ' },
      { text: 'product launches', highlight: true },
      { text: ', ' },
      { text: 'bridal exhibitions', highlight: true },
      { text: ', fashion runways, and expos' }
    ],
    href: '/trade-shows',
    Icon: Calendar,
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Luxury beauty launch event setting',
    iconClass: 'bg-violet-50/80 text-violet-850 border border-violet-100/30',
    overlayClass: 'from-white/80 via-violet-50/50 to-violet-100/35',
    accentClass: 'bg-violet-500/15',
    highlightClass: 'text-violet-750 font-extrabold',
  },
];

export default function FeaturedCards() {
  return (
    <section aria-labelledby="beauty-benefits-title" className="relative mt-6 overflow-hidden rounded-[32px] border border-stone-200/80 bg-[#fbfbf9] px-4 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <span aria-hidden="true" className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-stone-100/40 blur-3xl" />
      <span aria-hidden="true" className="absolute -right-20 bottom-[-6rem] h-80 w-80 rounded-full bg-rose-50/30 blur-3xl" />
      <span aria-hidden="true" className="absolute bottom-5 right-[6%] h-20 w-20 rotate-45 rounded-[24px] border border-stone-200/40 bg-white/5" />

      <div className="relative mx-auto max-w-screen-xl">
        <div className="mb-7 text-center sm:mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-400">Explore Platform</p>
          <h2 id="beauty-benefits-title" className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">Professional services, academies & events</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {BEAUTY_BENEFITS.map(({ highlightTitle, normalTitle, description, href, Icon, imageUrl, imageAlt, iconClass, overlayClass, accentClass, highlightClass }) => (
            <article key={highlightTitle} className="group relative min-h-[290px] overflow-hidden rounded-[26px] border border-stone-200/50 bg-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(120,95,78,0.12)] hover:border-stone-300/80">
              {/* Decorative source images */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] blur-[1.5px]" />
              <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${overlayClass}`} />
              <span aria-hidden="true" className={`absolute -bottom-12 -right-8 h-40 w-40 rounded-full ${accentClass} blur-[1px]`} />

              <Link href={href} aria-label={`${highlightTitle}${normalTitle}`} className="relative flex min-h-[290px] flex-col p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-800 focus-visible:ring-inset sm:p-6">
                <span aria-hidden="true" className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-stone-200/40 shadow-sm backdrop-blur-md ${iconClass}`}>
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-stone-900">
                  <span className={highlightClass}>{highlightTitle}</span>
                  {normalTitle}
                </h3>
                <p className="mt-2 max-w-[17rem] text-xs font-bold leading-5 text-stone-900">
                  {description.map((part, index) => part.highlight ? (
                    <strong key={index} className="font-black text-black">
                      {part.text}
                    </strong>
                  ) : (
                    <span key={index}>{part.text}</span>
                  ))}
                </p>
                <span className="mt-auto inline-flex w-full items-center justify-between rounded-xl border border-stone-200/50 bg-white/70 px-4 py-3 text-xs font-bold text-stone-900 shadow-[0_2px_8px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 group-hover:bg-stone-950 group-hover:text-white group-hover:border-stone-900">
                  Learn More
                  <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
