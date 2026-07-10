import Link from 'next/link';
import { FEATURED_CARDS } from '@/lib/constants';
import { ArrowRight, BadgeCheck, Gift, Sparkles, Tags } from 'lucide-react';

const CARD_STYLES = [
  {
    Icon: BadgeCheck,
    iconWrap: 'bg-rose-50 text-primary-800 ring-rose-100',
    accent: 'bg-primary-800/5',
  },
  {
    Icon: Tags,
    iconWrap: 'bg-amber-50 text-amber-700 ring-amber-100',
    accent: 'bg-amber-500/10',
  },
  {
    Icon: Sparkles,
    iconWrap: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100',
    accent: 'bg-fuchsia-500/10',
  },
  {
    Icon: Gift,
    iconWrap: 'bg-pink-50 text-pink-700 ring-pink-100',
    accent: 'bg-pink-500/10',
  },
];

export default function FeaturedCards() {
  return (
    <section className="mt-5 rounded-3xl bg-[#F7F8FA] px-4 py-6 sm:px-5 sm:py-9 lg:px-6 lg:py-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {FEATURED_CARDS.map((card, index) => {
          const { Icon, iconWrap, accent } = CARD_STYLES[index] || CARD_STYLES[0];

          return (
            <Link
              key={card.title}
              href={card.href}
              aria-label={`${card.title}: ${card.subtitle}`}
              className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-[#E7E9EE] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-primary-200 hover:bg-gradient-to-br hover:from-white hover:to-primary-50/35 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-4 sm:p-6"
            >
              <span
                aria-hidden="true"
                className={`absolute -bottom-12 -right-10 h-36 w-36 rounded-full ${accent} transition duration-300 group-hover:scale-110`}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-800/70 via-primary-400/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
              />

              <span
                aria-hidden="true"
                className={`relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl ring-1 transition duration-300 group-hover:scale-105 ${iconWrap}`}
              >
                <Icon size={24} strokeWidth={1.9} />
              </span>

              <span className="relative z-10 mt-5 block text-lg font-bold leading-snug text-gray-950">
                {card.title}
              </span>
              <span className="relative z-10 mt-2 block flex-1 text-sm leading-6 text-gray-500">
                {card.subtitle}
              </span>
              <span className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-800">
                Learn More
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
