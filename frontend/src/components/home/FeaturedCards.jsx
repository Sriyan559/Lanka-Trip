import Link from 'next/link';
import { FEATURED_CARDS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const ICONS = ['🏛️', '🔒', '🏭', '⭐'];

export default function FeaturedCards() {
  return (
    <section className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
      {FEATURED_CARDS.map((card, i) => (
        <Link
          key={card.title}
          href={card.href}
          className={`group relative bg-gradient-to-br ${card.bg} rounded-xl p-4 text-white overflow-hidden hover-lift block`}
        >
          {/* Decorative circle */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-1 -bottom-1 w-14 h-14 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="text-3xl mb-2">{ICONS[i]}</div>
            <h3 className="font-bold text-sm leading-tight">{card.title}</h3>
            <p className="text-white/75 text-[11px] mt-1 leading-snug">{card.subtitle}</p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-white/90 group-hover:gap-2 transition-all">
              Learn More <ArrowRight size={11} />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
