import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Clock, MapPin, PackageCheck, Ship } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

/**
 * TrendingProducts — "Selected Trending Products" grid section.
 *
 * Data source: GET /api/home/sections
 * Click → navigates to product detail when product IDs are available.
 */
const EXPORT_FOCUS = [
  { label: 'Ceylon Tea', keywords: ['tea'] },
  { label: 'Coconut', keywords: ['coconut', 'coir'] },
  { label: 'Spices', keywords: ['spice', 'cinnamon', 'pepper', 'clove'] },
  { label: 'Apparel', keywords: ['apparel', 'textile', 'fabric', 'batik', 'garment'] },
  { label: 'Handicraft', keywords: ['handicraft', 'gift', 'wood'] },
  { label: 'Wellness', keywords: ['ayurveda', 'ayurvedic', 'herbal', 'wellness'] },
  { label: 'Packaging', keywords: ['packaging', 'box', 'carton'] },
  { label: 'Food', keywords: ['food', 'agriculture', 'seafood', 'fish'] },
];

const fallbackImage = (label = 'Export Product') =>
  `https://placehold.co/520x420/f0fdf4/155e2c?text=${encodeURIComponent(label.slice(0, 18))}`;

function getExportFocus(product) {
  const haystack = [
    product?.name,
    product?.label,
    product?.slug,
    product?.category?.name,
    product?.category?.label,
    product?.category?.slug,
  ].filter(Boolean).join(' ').toLowerCase();

  return EXPORT_FOCUS.find((focus) => (
    focus.keywords.some((keyword) => haystack.includes(keyword))
  ));
}

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

function inquiryHref(product) {
  const id = product?.id || product?.slug;
  return id ? `/inquiry/create?product_id=${encodeURIComponent(id)}` : '/rfq';
}

function getSupplier(product) {
  const supplier = product?.supplier_details || product?.supplier;
  if (typeof supplier === 'string') {
    return { name: supplier, verified: Boolean(product?.verified) };
  }

  return {
    name: supplier?.company_name || supplier?.name || product?.supplier_name || 'Verified Sri Lankan supplier',
    verified: Boolean(
      product?.verified
      || supplier?.verified
      || supplier?.verification_status === 'verified'
      || product?.supplier_verified,
    ),
  };
}

function formatPrice(product) {
  const min = numberFrom(product?.fob_price_min, product?.price_min, product?.priceMin, product?.price);
  const max = numberFrom(product?.fob_price_max, product?.price_max, product?.priceMax);
  const currency = product?.currency?.code || product?.currency_code || 'USD';

  if (min === null) return 'RFQ pricing';
  if (max !== null && max > min) return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
  return formatCurrency(min, currency);
}

function normalizeForCard(product, index) {
  const label = product?.name || product?.label || 'Sri Lankan Export Product';
  const focus = getExportFocus(product);
  const supplier = getSupplier(product);
  const moq = numberFrom(product?.moq, product?.minOrder, product?.min_order);
  const unit = product?.moq_unit || product?.unit || product?.moqUnit || 'units';
  const leadTime = numberFrom(product?.lead_time_days, product?.leadTimeDays, product?.lead_time);

  return {
    id: product?.id || product?.slug || `${label}-${index}`,
    label,
    href: productHref(product),
    inquiryHref: inquiryHref(product),
    image: product?.featured_image || product?.image || product?.thumbnail || fallbackImage(label),
    categoryLabel: focus?.label || product?.category?.label || product?.category?.name || 'Export product',
    supplierName: supplier.name,
    supplierVerified: supplier.verified,
    price: formatPrice(product),
    moq: moq ? `${moq.toLocaleString()} ${unit}` : `MOQ by ${unit}`,
    leadTime: leadTime ? `${leadTime} days` : 'Lead time on request',
    port: product?.port || product?.shipping_port || 'Colombo Port',
    supplyAbility: product?.supply_ability || product?.supplyAbility || 'Export supply available',
    focusScore: focus ? EXPORT_FOCUS.indexOf(focus) : EXPORT_FOCUS.length + index,
  };
}

export default function TrendingProducts({ products }) {
  const items = Array.isArray(products)
    ? products
      .map(normalizeForCard)
      .sort((a, b) => a.focusScore - b.focusScore)
      .slice(0, 8)
    : [];

  if (!items.length) return null;

  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Featured export products</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">Maldives-ready B2B sourcing picks</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              High-demand Sri Lankan products with RFQ-ready trade details for hospitality, retail, food service, and distribution buyers.
            </p>
          </div>
          <Link
            href="/products?sort=trending"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800 md:self-auto"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((product) => (
          <article
            key={product.id}
            className="group flex min-h-[430px] flex-col border-b border-gray-100 bg-white p-3 transition-colors hover:bg-gray-50 sm:border-r xl:border-b-0 [&:nth-child(2n)]:sm:border-r-0 [&:nth-child(4n)]:xl:border-r-0"
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
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-primary-800 shadow-sm">
                {product.categoryLabel}
              </span>
              {product.supplierVerified && (
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary-700/95 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
                  <BadgeCheck size={12} />
                  Verified
                </span>
              )}
            </Link>

            <div className="flex flex-1 flex-col pt-3">
              <Link href={product.href}>
                <h3 className="text-sm font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-primary-800">
                  {product.label}
                </h3>
              </Link>

              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                {product.supplierVerified && <BadgeCheck size={13} className="flex-shrink-0 text-primary-700" />}
                <span className="line-clamp-1">{product.supplierName}</span>
              </div>

              <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="text-sm font-bold text-primary-800">{product.price}</div>
                <div className="mt-2 grid grid-cols-1 gap-2 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <PackageCheck size={13} className="text-gray-400" />
                    MOQ: {product.moq}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-gray-400" />
                    Lead time: {product.leadTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ship size={13} className="text-gray-400" />
                    {product.supplyAbility}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-gray-400" />
                    FOB: {product.port}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex gap-2 pt-3">
                <Link
                  href={product.inquiryHref}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-800"
                >
                  Send inquiry
                </Link>
                <Link
                  href={product.href}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800"
                >
                  Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
