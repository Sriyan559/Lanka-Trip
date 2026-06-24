import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MOCK_TRENDING } from '@/lib/services';

/**
 * TrendingProducts — "Selected Trending Products" grid section.
 *
 * Data source: GET /api/home/sections
 * Fallback: MOCK_TRENDING from services.js
 *
 * Click → navigates to /categories/[slug] product listing.
 */
export default function TrendingProducts({ products }) {
  const items = products ?? MOCK_TRENDING;

  if (!items.length) return null;

  return (
    <section className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Selected Trending Products</h2>
        <Link
          href="/products?sort=trending"
          className="flex items-center gap-1 text-sm text-primary-700 hover:text-primary-800 hover:underline font-medium"
        >
          View More <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
        {items.map((product) => (
          <Link
            key={product.id || product.slug}
            href={product.id ? `/products/${product.id}` : `/categories/${product.slug}`}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-primary-300 group-hover:shadow-md transition-all duration-300">
              <Image
                src={product.featured_image || product.image || `https://placehold.co/120x120/f0fdf4/155e2c?text=${encodeURIComponent((product.name || product.label).slice(0, 8))}`}
                alt={product.name || product.label}
                width={120}
                height={120}
                unoptimized
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs text-center text-gray-600 group-hover:text-primary-700 line-clamp-2 leading-tight font-medium w-full">
              {product.name || product.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
