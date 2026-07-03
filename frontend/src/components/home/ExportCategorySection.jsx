'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Leaf,
  PackageCheck,
  Palette,
  Shirt,
  Sparkles,
  Sprout,
  Waves,
} from 'lucide-react';
import useCategories from '@/hooks/useCategories';

const EXPORT_CATEGORIES = [
  {
    label: 'Ceylon Tea',
    keywords: ['tea', 'beverage'],
    summary: 'Bulk tea, hospitality packs, private label blends',
    buyerNeed: 'Hotels, resorts, distributors',
    query: 'Ceylon Tea',
    Icon: Leaf,
    accent: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  },
  {
    label: 'Coconut Products',
    keywords: ['coconut', 'coir'],
    summary: 'Virgin coconut oil, coir, spa and retail goods',
    buyerNeed: 'Wellness, retail, resort supply',
    query: 'Coconut Products',
    Icon: Waves,
    accent: 'text-cyan-700 bg-cyan-50 border-cyan-100',
  },
  {
    label: 'Spices & Cinnamon',
    keywords: ['spice', 'cinnamon', 'condiment'],
    summary: 'True cinnamon, pepper, cloves, blends, bulk packs',
    buyerNeed: 'Food service, grocery, importers',
    query: 'Spices Cinnamon',
    Icon: Sparkles,
    accent: 'text-amber-700 bg-amber-50 border-amber-100',
  },
  {
    label: 'Apparel & Textiles',
    keywords: ['apparel', 'textile', 'fabric', 'batik'],
    summary: 'Garments, fabric, resort uniforms, batik ranges',
    buyerNeed: 'Hospitality, retail, uniforms',
    query: 'Apparel Textiles',
    Icon: Shirt,
    accent: 'text-sky-700 bg-sky-50 border-sky-100',
  },
  {
    label: 'Handicrafts',
    keywords: ['handicraft', 'gift', 'wood'],
    summary: 'Resort gifts, decor, handmade export collections',
    buyerNeed: 'Gift shops, resorts, interiors',
    query: 'Handicrafts',
    Icon: Palette,
    accent: 'text-rose-700 bg-rose-50 border-rose-100',
  },
  {
    label: 'Wellness & Ayurveda',
    keywords: ['ayurvedic', 'ayurveda', 'herbal', 'wellness'],
    summary: 'Spa oils, herbal products, wellness amenities',
    buyerNeed: 'Spas, resorts, wellness retail',
    query: 'Ayurvedic Wellness',
    Icon: Sprout,
    accent: 'text-lime-700 bg-lime-50 border-lime-100',
  },
  {
    label: 'Packaging Products',
    keywords: ['packaging', 'box', 'carton'],
    summary: 'Gift boxes, retail packs, export cartons, labels',
    buyerNeed: 'Retail, logistics, resort supply',
    query: 'Packaging Products',
    Icon: PackageCheck,
    accent: 'text-indigo-700 bg-indigo-50 border-indigo-100',
  },
  {
    label: 'Food & Agriculture',
    keywords: ['food', 'agriculture', 'seafood', 'fisheries'],
    summary: 'Agri exports, processed foods, seafood suppliers',
    buyerNeed: 'Distributors, kitchens, importers',
    query: 'Food Agriculture',
    Icon: Box,
    accent: 'text-orange-700 bg-orange-50 border-orange-100',
  },
];

function categoryMatches(category, keywords) {
  const haystack = [
    category?.slug,
    category?.label,
    category?.name,
    category?.description,
  ].filter(Boolean).join(' ').toLowerCase();

  return keywords.some((keyword) => haystack.includes(keyword));
}

function buildCategoryHref(category, fallbackQuery) {
  if (category?.slug) return `/categories/${category.slug}`;
  return `/search?q=${encodeURIComponent(fallbackQuery)}`;
}

export default function ExportCategorySection() {
  const { categories, loading, error, retry } = useCategories();

  const exportCards = EXPORT_CATEGORIES.map((category) => {
    const match = categories.find((item) => categoryMatches(item, category.keywords));
    const productCount = Number(
      match?.products_count
      || match?.productsCount
      || match?.products
      || 0,
    );

    return {
      ...category,
      displayLabel: match?.label || match?.name || category.label,
      href: buildCategoryHref(match, category.query),
      productCount,
      isBackendMatch: Boolean(match),
    };
  });

  const connectedCount = exportCards.filter((category) => category.isBackendMatch).length;

  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-4 py-4 sm:px-5 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
              <BadgeCheck size={14} />
              Export-ready categories
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl">
              Source Sri Lankan products by verified export sector
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Built for B2B buyers sourcing for Maldives hospitality, retail, wellness, food service, and distribution channels.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800"
            >
              Browse products
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/rfq"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Post RFQ
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className="rounded-full bg-gray-50 px-2.5 py-1">
            {loading ? 'Syncing backend categories' : `${connectedCount} matched backend categories`}
          </span>
          <span className="rounded-full bg-gray-50 px-2.5 py-1">Safe search fallback enabled</span>
          <span className="rounded-full bg-gray-50 px-2.5 py-1">RFQ-ready sourcing paths</span>
          {error && (
            <button
              type="button"
              onClick={retry}
              className="rounded-full bg-red-50 px-2.5 py-1 font-medium text-red-700 hover:bg-red-100"
            >
              Retry category sync
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {exportCards.map(({ Icon, ...category }) => (
          <Link
            key={category.label}
            href={category.href}
            className="group min-h-[188px] border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 sm:border-r xl:min-h-[206px] [&:nth-child(2n)]:sm:border-r-0 [&:nth-child(4n)]:xl:border-r-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border ${category.accent}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-[11px] font-medium text-gray-500 ring-1 ring-gray-100">
                  {category.isBackendMatch ? 'Live category' : 'Search route'}
                </span>
              </div>

              <div className="mt-4 min-w-0">
                <h3 className="text-base font-bold leading-snug text-gray-900 group-hover:text-primary-800">
                  {category.displayLabel}
                </h3>
                <p className="mt-2 text-sm leading-5 text-gray-600 line-clamp-2">
                  {category.summary}
                </p>
              </div>

              <div className="mt-auto pt-4">
                <p className="text-xs font-medium text-gray-500 line-clamp-1">
                  {category.buyerNeed}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-gray-500">
                    {category.productCount > 0 ? `${category.productCount} products` : 'View sourcing options'}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary-700">
                    Explore
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
