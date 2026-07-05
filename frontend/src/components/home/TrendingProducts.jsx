import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, ShoppingBasket, Star } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { TRENDING_PRODUCTS } from '@/lib/constants';

const BEAUTY_FOCUS = [
  { label: 'Makeup', keywords: ['makeup', 'lipstick', 'foundation', 'concealer', 'mascara', 'eyeliner', 'blush'] },
  { label: 'Skincare', keywords: ['skincare', 'serum', 'moisturizer', 'sunscreen', 'cleanser', 'toner', 'cream'] },
  { label: 'Fragrance', keywords: ['fragrance', 'perfume', 'eau de parfum', 'cologne'] },
  { label: 'Hair Care', keywords: ['hair', 'shampoo', 'conditioner', 'mask', 'kerastase', 'redken'] },
  { label: 'Bath & Body', keywords: ['body', 'lotion', 'shower', 'bath'] },
  { label: 'Tools & Brushes', keywords: ['brush', 'sponge', 'blender', 'tool'] },
  { label: 'Gift Sets', keywords: ['gift', 'set', 'bundle', 'mini'] },
];

const fallbackProducts = [
  'Gentle Hydrating Cleanser',
  'Vitamin C Brightening Serum',
  'SPF 50 Daily Sunscreen',
  'Long Wear Matte Lipstick',
  'Bond Repair Shampoo',
  'Signature Eau de Parfum',
  'Soft Glow Body Lotion',
  'Pore Care Clay Face Mask',
  'Nourishing Hair Oil',
  'Essential Beauty Tools Set',
];

const fallbackImage = (label = 'Beauty Product') =>
  label.toLowerCase().includes('perfume')
    ? 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    : 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80';

function numberFrom(...values) {
  const found = values.find((value) => value !== undefined && value !== null && value !== '');
  if (found === undefined) return null;
  const parsed = Number(found);
  return Number.isFinite(parsed) ? parsed : null;
}

function productHref(product) {
  if (product?.id) return `/products/${product.id}`;
  if (product?.slug) return `/products/${product.slug}`;
  if (product?.category?.slug) return `/categories/${product.category.slug}`;
  return '/products';
}

function getBeautyFocus(product) {
  const haystack = [
    product?.name,
    product?.label,
    product?.slug,
    product?.category?.name,
    product?.category?.label,
    product?.category?.slug,
  ].filter(Boolean).join(' ').toLowerCase();

  return BEAUTY_FOCUS.find((focus) => (
    focus.keywords.some((keyword) => haystack.includes(keyword))
  ));
}

function formatPrice(product, index) {
  const price = numberFrom(product?.retail_price, product?.sale_price, product?.price_min, product?.price);
  const currency = product?.currency?.code || product?.currency_code || 'LKR';

  return price !== null ? formatCurrency(price, currency) : formatCurrency([3900, 5200, 6800, 8400][index % 4], currency);
}

function normalizeForCard(product, index) {
  const label = product?.name || product?.label || fallbackProducts[index % fallbackProducts.length];
  const focus = getBeautyFocus(product);
  const rating = numberFrom(product?.rating, product?.average_rating) || (4.5 + (index % 5) / 10);

  return {
    id: product?.id || product?.slug || `${label}-${index}`,
    label,
    href: productHref(product),
    image: product?.featured_image || product?.image || product?.thumbnail || fallbackImage(label),
    categoryLabel: focus?.label || product?.category?.label || product?.category?.name || 'Beauty',
    brand: product?.brand?.name || product?.brand_name || ['L’Oréal', 'Maybelline', 'CeraVe', 'Lancôme', 'Redken'][index % 5],
    price: formatPrice(product, index),
    rating: rating.toFixed(1),
    badge: index % 3 === 0 ? 'Best Seller' : index % 3 === 1 ? 'New' : 'Original',
    focusScore: focus ? BEAUTY_FOCUS.indexOf(focus) : BEAUTY_FOCUS.length + index,
  };
}

export default function TrendingProducts() {
  const sourceProducts = TRENDING_PRODUCTS;

  const items = Array.isArray(sourceProducts)
    ? sourceProducts
      .map(normalizeForCard)
      .sort((a, b) => a.focusScore - b.focusScore)
      .slice(0, 8)
    : [];

  if (!items.length) return null;

  return (
    <section className="mt-5 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm sm:mt-6">
      <div className="border-b border-gray-100 px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-700">Trending Beauty</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">Best Sellers & New Favourites</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Shop original makeup, skincare, fragrance, haircare, bath and body, wellness, and beauty tools from verified beauty brands and authorized sellers.
            </p>
          </div>
          <Link
            href="/products?sort=trending"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-pink-200 hover:bg-pink-50 hover:text-pink-800 sm:w-auto md:self-auto"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((product) => (
          <article
            key={product.id}
            className="group flex min-h-[392px] flex-col border-b border-gray-100 bg-white p-3 transition-colors hover:bg-gray-50 sm:min-h-[430px] sm:border-r xl:border-b-0 [&:nth-child(2n)]:sm:border-r-0 [&:nth-child(4n)]:xl:border-r-0"
          >
            <Link href={product.href} className="relative block overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
              <div className="aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.label}
                  width={520}
                  height={390}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-pink-800 shadow-sm">
                {product.categoryLabel}
              </span>
              <span className="absolute right-2 top-2 rounded-full bg-black/90 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
                {product.badge}
              </span>
            </Link>

            <div className="flex flex-1 flex-col pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{product.brand}</p>
              <Link href={product.href}>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-gray-900 group-hover:text-pink-800">
                  {product.label}
                </h3>
              </Link>

              <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
                <Star size={13} fill="currentColor" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-400">customer rating</span>
              </div>

              <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="text-base font-black text-gray-950">{product.price}</div>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Authentic brand product with beauty routine-friendly delivery options.
                </p>
              </div>

              <div className="mt-auto flex gap-2 pt-3">
                <Link
                  href={product.href}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  <ShoppingBasket size={14} /> Shop
                </Link>
                <Link
                  href="/wishlist"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-pink-200 hover:bg-pink-50 hover:text-pink-800"
                >
                  <Heart size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
