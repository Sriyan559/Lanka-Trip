import Link from 'next/link';
import { ArrowRight, BadgeCheck, Gift, Sparkles, Tags } from 'lucide-react';

// Keep card copy, destinations, icons, and artwork together so this section is easy to refresh.
const BEAUTY_BENEFITS = [
  {
    title: 'Authentic Beauty',
    description: 'Trusted skincare, cosmetics, fragrance, wellness, and haircare from verified beauty brands',
    href: '/products',
    Icon: BadgeCheck,
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Pearlescent beauty product texture',
    iconClass: 'bg-white/70 text-rose-800',
    overlayClass: 'from-[#fffdf8]/95 via-[#fff8f5]/78 to-[#dbc8c4]/65',
    accentClass: 'bg-rose-300/35',
  },
  {
    title: 'Beauty Offers',
    description: 'Daily deals, value sets, and limited-time savings',
    href: '/products?sale=1',
    Icon: Tags,
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Champagne gold beauty texture',
    iconClass: 'bg-amber-100/70 text-amber-800',
    overlayClass: 'from-[#fff5dd]/94 via-[#f8d28e]/70 to-[#b8792c]/55',
    accentClass: 'bg-amber-400/35',
  },
  {
    title: 'Verified Brands',
    description: 'Explore original brands, authorized sellers, retailers, and distributors',
    href: '/brands',
    Icon: Sparkles,
    imageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Lavender glass and crystal texture',
    iconClass: 'bg-white/65 text-fuchsia-700',
    overlayClass: 'from-[#f9f7ff]/94 via-[#ded7f0]/72 to-[#aaa0d0]/60',
    accentClass: 'bg-violet-400/35',
  },
  {
    title: 'Gift Sets',
    description: 'Curated beauty gifts and value bundles',
    href: '/products?collection=gifts-value-sets',
    Icon: Gift,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Luxury pink gift wrapping and ribbon',
    iconClass: 'bg-rose-100/70 text-rose-800',
    overlayClass: 'from-[#fff5f4]/92 via-[#efb2bb]/70 to-[#a94f62]/62',
    accentClass: 'bg-rose-500/30',
  },
];

export default function FeaturedCards() {
  return (
    <section aria-labelledby="beauty-benefits-title" className="relative mt-5 overflow-hidden rounded-[32px] border border-[#eadfca]/80 bg-gradient-to-br from-[#fffdf7] via-[#fbf4e6] to-[#f2d893] px-4 py-8 shadow-[0_18px_50px_rgba(130,96,39,0.09)] sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <span aria-hidden="true" className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/65 blur-3xl" />
      <span aria-hidden="true" className="absolute -right-20 bottom-[-6rem] h-80 w-80 rounded-full bg-[#d8a849]/25 blur-3xl" />
      <span aria-hidden="true" className="absolute bottom-5 right-[6%] h-20 w-20 rotate-45 rounded-[24px] border border-white/50 bg-white/20" />

      <div className="relative mx-auto max-w-screen-xl">
        <div className="mb-7 text-center sm:mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-800/70">Shop with confidence</p>
          <h2 id="beauty-benefits-title" className="mt-2 text-2xl font-bold text-stone-950 sm:text-3xl">Beauty benefits, thoughtfully curated</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {BEAUTY_BENEFITS.map(({ title, description, href, Icon, imageUrl, imageAlt, iconClass, overlayClass, accentClass }) => (
            <article key={title} className="group relative min-h-[290px] overflow-hidden rounded-[26px] border border-white/70 bg-white/40 shadow-[0_6px_16px_rgba(82,57,31,0.10),0_18px_36px_rgba(82,57,31,0.10)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_26px_rgba(82,57,31,0.12),0_28px_54px_rgba(82,57,31,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              {/* Decorative source images retain native img behavior and avoid Next image-domain configuration. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
              <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${overlayClass}`} />
              <span aria-hidden="true" className={`absolute -bottom-12 -right-8 h-40 w-40 rounded-full ${accentClass} blur-[1px]`} />

              <Link href={href} aria-label={`${title}: ${description}`} className="relative flex min-h-[290px] flex-col p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-800 focus-visible:ring-inset sm:p-6">
                <span aria-hidden="true" className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 shadow-sm backdrop-blur-md ${iconClass}`}>
                  <Icon size={25} strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-stone-950">{title}</h3>
                <p className="mt-2 max-w-[17rem] text-sm font-medium leading-6 text-stone-800 sm:text-[15px]">{description}</p>
                <span className="mt-auto inline-flex w-full items-center justify-between rounded-2xl border border-white/75 bg-white/45 px-4 py-3 text-sm font-bold text-stone-900 shadow-[0_2px_8px_rgba(72,43,22,0.10)] backdrop-blur-md transition-colors duration-300 group-hover:bg-white/65">
                  Learn More
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
