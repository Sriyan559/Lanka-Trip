'use client';

/**
 * B2BProductCard — product card styled for B2B marketplace listing pages.
 *
 * Features:
 *  - Price range display (US$X.XX – X.XX / Unit)
 *  - MOQ (Minimum Order Quantity)
 *  - Supplier certification badges (OEM/ODM, Audited, Secured Trading)
 *  - Send Inquiry CTA button
 *  - Chat icon button
 *  - Works in both grid and list view modes
 *
 * Connect to Laravel: product data comes from GET /api/products?... 
 * The onInquire callback should open the inquiry/RFQ workflow.
 */

import Image from 'next/image';
import Link from 'next/link';
import { Anchor, BadgeCheck, Eye, MapPin, MessageCircle, PackageCheck, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { FALLBACK_PRODUCT_IMAGE, normalizeProduct } from '@/lib/products';
import WishlistButton from './WishlistButton';
import { conversationsApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { loginUrlFor } from '@/lib/authRedirect';
import toast from 'react-hot-toast';

export default function B2BProductCard({ product, viewMode = 'grid' }) {
  const { addItem } = useCart();
  const { isAuthenticated, isBuyer } = useAuth();
  const router = useRouter();
  const normalized = normalizeProduct(product);

  const {
    id, slug, name,
    priceMin, priceMax, price,
    unit = 'Piece', minOrder = 1, moqUnit,
    rating = 0, reviews = 0,
    image,
    supplier, supplierLocation,
    audited = false, category,
  } = normalized;

  const displayUnit = unit || moqUnit || 'Piece';
  const displayPriceMin = priceMin ?? price ?? 0;
  const displayPriceMax = priceMax ?? null;
  const productHref = `/products/${id || slug || ''}`;
  const supplierName = typeof supplier === 'string'
    ? supplier
    : supplier?.name || supplier?.company_name || '';
  const supplierId = typeof supplier === 'object' ? supplier?.id : normalized.supplier_id;
  const supplierSlug = typeof supplier === 'object' ? supplier?.slug : null;
  const supplierHref = supplierId || supplierSlug ? `/suppliers/${supplierSlug || supplierId}` : null;
  const displaySupplierLocation = supplierLocation
    || (typeof supplier === 'object' ? supplier?.location : '')
    || '';
  const categoryLabel = category?.label || category?.name || normalized.category_name || 'Export product';
  const leadTime = normalized.lead_time_days ?? normalized.leadTimeDays ?? normalized.lead_time ?? null;
  const displayLeadTime = leadTime
    ? (String(leadTime).toLowerCase().includes('day') ? String(leadTime) : `${leadTime} days`)
    : 'Ask supplier';
  const displayPort = normalized.port || normalized.export_port || 'Colombo Port';
  const supplyAbility = normalized.supply_ability || normalized.supplyAbility || 'Available on request';
  const status = String(normalized.status || normalized.approval_status || '').toLowerCase();
  const featured = Boolean(normalized.featured || normalized.is_featured || status.includes('featured'));
  const exportReady = Boolean(normalized.export_ready || normalized.is_export_ready || status.includes('export'));
  const priceLabel = displayPriceMax
    ? `US$${Number(displayPriceMin).toFixed(2)}-${Number(displayPriceMax).toFixed(2)}`
    : displayPriceMin > 0
      ? formatCurrency(displayPriceMin)
      : 'Request FOB';
  const fallbackImage = image || FALLBACK_PRODUCT_IMAGE;

  const handleInquire = (e) => {
    e.preventDefault();
    addItem(normalized);
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(loginUrlFor(`${window.location.pathname}${window.location.search}`));
      return;
    }
    if (!isBuyer) {
      toast.error('Only buyer accounts can start supplier conversations.');
      return;
    }
    if (!normalized.supplier_id) {
      toast.error('Supplier information is unavailable for this product.');
      return;
    }
    try {
      const response = await conversationsApi.create({ supplier_id: normalized.supplier_id });
      const conversationId = response?.conversation?.id;
      router.push(conversationId ? `/messages?id=${conversationId}` : '/messages');
    } catch (error) {
      toast.error(error.message || 'Could not start this conversation.');
    }
  };

  /* ── Grid view (default) ──────────────────────────────── */
  if (viewMode === 'grid') {
    return (
      <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:border-primary-200 hover:shadow-md">
        {/* Image */}
        <Link href={productHref} className="relative block aspect-[4/3] overflow-hidden bg-gray-50">
          <Image
            src={fallbackImage}
            alt={name || 'Product image'}
            width={360}
            height={270}
            unoptimized
            onError={(event) => {
              event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {audited && (
              <span className="flex items-center gap-0.5 rounded-full bg-primary-700/95 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm">
                <BadgeCheck size={9} /> Verified
              </span>
            )}
            {(featured || exportReady) && (
              <span className="rounded-full bg-white/95 px-1.5 py-0.5 text-[10px] font-semibold text-primary-800 shadow-sm backdrop-blur-sm">
                {featured ? 'Featured' : 'Export ready'}
              </span>
            )}
          </div>
          <WishlistButton
            productId={id}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all shadow-sm"
          />
        </Link>

        {/* Body */}
        <div className="p-3.5 flex flex-col flex-1">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="min-w-0 truncate rounded-full bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500">
              {categoryLabel}
            </span>
            {rating > 0 && (
              <span className="flex flex-shrink-0 items-center gap-0.5 text-[11px] font-semibold text-amber-600">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                {rating.toFixed(1)}
              </span>
            )}
          </div>

          <Link href={productHref}>
            <h3 className="mb-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors hover:text-primary-800">
              {name || 'Export product'}
            </h3>
          </Link>

          {/* Price */}
          <div className="mb-2 rounded-lg border border-primary-50 bg-primary-50/70 px-2.5 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-primary-600">FOB price</div>
            <span className="text-primary-800 font-bold text-[15px]">
              {priceLabel}
            </span>
            <span className="text-gray-400 text-[11px] ml-0.5">/{displayUnit}</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-500">
            <div className="rounded-lg bg-gray-50 px-2 py-1.5">
              <span className="block text-[10px] uppercase text-gray-400">MOQ</span>
              <span className="font-semibold text-gray-700">{minOrder > 0 ? `${minOrder} ${moqUnit || displayUnit}` : 'Flexible'}</span>
            </div>
            <div className="rounded-lg bg-gray-50 px-2 py-1.5">
              <span className="block text-[10px] uppercase text-gray-400">Lead time</span>
              <span className="font-semibold text-gray-700">{displayLeadTime}</span>
            </div>
          </div>

          <div className="mt-2 space-y-1 text-[11px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <Anchor size={11} className="text-gray-400" />
              <span className="truncate">{displayPort}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PackageCheck size={11} className="text-gray-400" />
              <span className="truncate">{supplyAbility}</span>
            </div>
          </div>

          {/* Supplier */}
          {supplierName && (
            supplierHref ? (
              <Link href={supplierHref} className="mt-2 flex items-center gap-1 text-[11px] text-gray-500 hover:text-primary-800">
                {audited && <BadgeCheck size={10} className="text-primary-600 flex-shrink-0" />}
                <span className="truncate">{supplierName}</span>
              </Link>
            ) : (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
                {audited && <BadgeCheck size={10} className="text-primary-600 flex-shrink-0" />}
                <span className="truncate">{supplierName}</span>
              </div>
            )
          )}

          <div className="mt-auto" />

          {/* Rating */}
          {rating > 0 && (
            <div className="mt-2 flex items-center gap-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-100 text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400">({reviews} reviews)</span>
            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 px-3.5 pb-3.5">
          <Link
            href={productHref}
            className="flex items-center justify-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-800"
          >
            <Eye size={13} /> Details
          </Link>
          <button
            onClick={handleInquire}
            className="flex-1 py-2 bg-primary-800 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Send Inquiry
          </button>
          <button
            type="button"
            onClick={handleChat}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-primary-300 hover:text-primary-700 sm:flex"
            title="Chat with supplier"
          >
            <MessageCircle size={14} />
          </button>
        </div>
      </div>
    );
  }

  /* ── List view ────────────────────────────────────────── */
  return (
    <div className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-primary-200 flex flex-col gap-3 p-3 transition-all duration-200 sm:flex-row sm:gap-4 sm:p-4">
      {/* Thumbnail */}
      <Link href={productHref} className="relative flex-shrink-0 w-full h-44 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 sm:h-36 sm:w-36">
        <Image
          src={fallbackImage}
          alt={name || 'Product image'}
          width={180}
          height={180}
          unoptimized
          onError={(event) => {
            event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {audited && (
          <span className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-primary-700/95 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            <BadgeCheck size={9} /> Verified
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500">
            {categoryLabel}
          </span>
          {featured && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">Featured</span>}
          {exportReady && <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700">Export ready</span>}
        </div>
        <Link href={productHref}>
          <h3 className="text-base font-semibold text-gray-900 hover:text-primary-800 line-clamp-2 mb-1.5 transition-colors leading-snug">
            {name || 'Export product'}
          </h3>
        </Link>

        {/* Supplier */}
        {supplierName && (
          <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500 mb-2">
            {audited && <BadgeCheck size={11} className="text-primary-600 flex-shrink-0" />}
            {supplierHref ? (
              <Link href={supplierHref} className="font-medium text-gray-700 hover:text-primary-800">{supplierName}</Link>
            ) : (
              <span className="font-medium text-gray-700">{supplierName}</span>
            )}
            {displaySupplierLocation && (
              <span className="flex items-center gap-0.5 text-gray-400">
                <MapPin size={10} /> {displaySupplierLocation}
              </span>
            )}
          </div>
        )}

        <div className="grid gap-2 text-xs text-gray-500 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-50 px-2.5 py-2">
            <span className="block text-[10px] uppercase text-gray-400">MOQ</span>
            <span className="font-semibold text-gray-700">{minOrder > 0 ? `${minOrder} ${moqUnit || displayUnit}` : 'Flexible'}</span>
          </div>
          <div className="rounded-lg bg-gray-50 px-2.5 py-2">
            <span className="block text-[10px] uppercase text-gray-400">Lead time</span>
            <span className="font-semibold text-gray-700">{displayLeadTime}</span>
          </div>
          <div className="rounded-lg bg-gray-50 px-2.5 py-2">
            <span className="block text-[10px] uppercase text-gray-400">Port</span>
            <span className="font-semibold text-gray-700">{displayPort}</span>
          </div>
          <div className="rounded-lg bg-gray-50 px-2.5 py-2">
            <span className="block text-[10px] uppercase text-gray-400">Supply</span>
            <span className="font-semibold text-gray-700 line-clamp-1">{supplyAbility}</span>
          </div>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-100 text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-amber-600 font-medium">{rating}</span>
            <span className="text-xs text-gray-400">({reviews} reviews)</span>
          </div>
        )}
      </div>

      {/* Price + CTA */}
      <div className="flex-shrink-0 flex flex-col justify-between text-left sm:min-w-[140px] sm:items-end sm:text-right">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-primary-600">FOB price</div>
          <div className="text-primary-800 font-bold text-base sm:text-lg">
            {priceLabel}
          </div>
          <div className="text-xs text-gray-400">/{displayUnit}</div>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-1.5 min-[420px]:grid-cols-3 sm:flex sm:w-auto sm:flex-col">
          <Link
            href={productHref}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-center text-xs font-semibold text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-800 sm:py-1.5"
          >
            <Eye size={12} /> View details
          </Link>
          <button
            onClick={handleInquire}
            className="w-full whitespace-nowrap rounded-lg bg-primary-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-700 sm:py-1.5"
          >
            Send Inquiry
          </button>
          <button
            type="button"
            onClick={handleChat}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-center text-xs text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-700 sm:py-1.5"
          >
            <MessageCircle size={12} /> Chat
          </button>
        </div>
      </div>
    </div>
  );
}
