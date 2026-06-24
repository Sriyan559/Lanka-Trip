import Image from 'next/image';
import Link from 'next/link';
import { SOURCING_SOLUTIONS, SRI_LANKA_CATEGORIES } from '@/lib/constants';

// Show 3 category thumbnail icons under each solution card
const SOLUTION_CATS = [
  ['tea-beverages', 'spices-condiments', 'food-agriculture'],
  ['gems-jewelry',  'ceramics-pottery',  'handicrafts'],
  ['textiles-apparel','rubber-products', 'coir-coconut'],
  ['it-software',   'electrical',        'construction'],
];

export default function SourcingSolutions() {
  return (
    <section className="mt-8">
      <h2 className="text-base font-bold text-gray-800 mb-4 text-center">
        Sourcing Solutions &amp; Tailored Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SOURCING_SOLUTIONS.map((card, idx) => {
          const catSlugs = SOLUTION_CATS[idx] || [];
          const cats = catSlugs.map((s) => SRI_LANKA_CATEGORIES.find((c) => c.slug === s)).filter(Boolean);
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover-lift block"
            >
              {/* Image header */}
              <div className="relative h-36 overflow-hidden">
                <Image src={card.bg} alt={card.title} width={600} height={360} unoptimized className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <h3 className="text-white font-bold text-sm leading-tight">{card.title}</h3>
                  <p className="text-white/75 text-[11px] mt-0.5">{card.subtitle}</p>
                </div>
              </div>

              {/* Sub-categories */}
              <div className="p-3 flex items-center gap-3">
                {cats.map((cat) => (
                  <div key={cat.slug} className="flex flex-col items-center gap-1 flex-1">
                    <div className="text-2xl">{cat.icon}</div>
                    <span className="text-[10px] text-gray-500 text-center leading-tight line-clamp-2">
                      {cat.label.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
