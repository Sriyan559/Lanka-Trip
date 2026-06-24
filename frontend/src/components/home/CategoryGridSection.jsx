import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * CategoryGridSection — a reusable homepage section block.
 *
 * Renders a large promo tile on the left and an 8-item category grid
 * on the right — matching the "Manufacturing & Processing Machinery" pattern
 * from the screenshots, adapted for Sri Lankan export categories.
 *
 * Backend: GET /api/home/sections returns an array of these objects.
 * Each section's `items` array is independently rendered.
 *
 * @param {Object}   section
 * @param {string}   section.id
 * @param {string}   section.title              — Section heading
 * @param {string}   section.promoTitle         — Bold text on left tile
 * @param {string}   section.promoSubtitle      — Smaller text on left tile
 * @param {string}   section.promoBg            — Inline style background (gradient string)
 * @param {string}   [section.promoImage]       — Optional image URL for left tile
 * @param {string}   section.promoHref          — Where "Source Now" links to
 * @param {string}   [section.promoButtonLabel] — CTA button text
 * @param {Object[]} section.items              — Array of { slug, label, image }
 */
export default function CategoryGridSection({ section }) {
  if (!section) return null;

  const {
    title,
    promoTitle,
    promoSubtitle,
    promoBg,
    promoImage,
    promoHref = '/products',
    promoButtonLabel = 'Source Now',
    items = [],
  } = section;

  return (
    <section className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <Link
          href={promoHref}
          className="flex items-center gap-1 text-sm text-primary-700 hover:text-primary-800 hover:underline font-medium"
        >
          View All <ArrowRight size={13} />
        </Link>
      </div>

      {/* Body: promo tile + grid */}
      <div className="flex flex-col sm:flex-row">
        {/* Left: Promo tile */}
        <div
          className="sm:w-48 lg:w-56 flex-shrink-0 relative flex flex-col justify-between p-5 min-h-[180px]"
          style={{ background: promoBg || '#155e2c' }}
        >
          {promoImage && (
            <Image
              src={promoImage}
              alt={promoTitle}
              fill
              unoptimized
              className="object-cover opacity-20"
            />
          )}
          <div className="relative z-10">
            <h3 className="text-white font-bold text-[15px] leading-snug">{promoTitle}</h3>
            {promoSubtitle && (
              <p className="text-white/70 text-[11px] mt-1.5 leading-relaxed">{promoSubtitle}</p>
            )}
          </div>
          <Link
            href={promoHref}
            className="relative z-10 mt-4 self-start inline-block px-4 py-1.5 bg-white text-primary-800 text-xs font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-sm"
          >
            {promoButtonLabel}
          </Link>
        </div>

        {/* Right: 8-item grid */}
        <div className="flex-1 grid grid-cols-4 divide-x divide-y divide-gray-100">
          {items.slice(0, 8).map((item) => (
            <Link
              key={item.slug}
              href={`/categories/${item.slug}`}
              className="flex flex-col items-center justify-center gap-2 p-3 hover:bg-primary-50 group transition-colors"
            >
              <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-primary-200 transition-colors flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.label}
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs text-center text-gray-600 group-hover:text-primary-800 leading-tight line-clamp-2 font-medium">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
