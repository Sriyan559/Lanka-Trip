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
 * The onInquire callback should call POST /api/rfq or open a modal.
 */

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Heart, Star, BadgeCheck, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

export default function B2BProductCard({ product, viewMode = 'grid' }) {
  const { addItem } = useCart();

  const {
    id, slug, name,
    priceMin, priceMax, price,
    unit = 'Piece', minOrder = 1, moqUnit,
    rating = 0, reviews = 0,
    image,
    supplier, supplierLocation,
    badges = [],
    audited = false,
    securedTrading = false,
    sampleAvailable = false,
    category,
  } = product;

  const displayUnit = unit || moqUnit || 'Piece';
  const displayPriceMin = priceMin ?? price ?? 0;
  const displayPriceMax = priceMax ?? null;
  const productHref = `/products/${id || slug}`;
  const orderHref = `/orders/create?productId=${id || slug}&productName=${encodeURIComponent(name || '')}`;

  const handleInquire = (e) => {
    e.preventDefault();
    addItem(product);
  };

  /* ── Grid view (default) ──────────────────────────────── */
  if (viewMode === 'grid') {
    return (
      <div className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 overflow-hidden flex flex-col transition-all duration-200">
        {/* Image */}
        <Link href={productHref} className="relative block aspect-square overflow-hidden bg-gray-50">
          <Image
            src={image || `https://placehold.co/280x280/f0fdf4/155e2c?text=${encodeURIComponent((name || 'Product').slice(0, 12))}`}
            alt={name}
            width={280}
            height={280}
            unoptimized
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {audited && (
            <span className="absolute top-2 left-2 flex items-center gap-0.5 bg-primary-700/90 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              <BadgeCheck size={9} /> Audited
            </span>
          )}
          <button
            onClick={(e) => e.preventDefault()}
            aria-label="Add to wishlist"
            className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
          >
            <Heart size={13} />
          </button>
        </Link>

        {/* Body */}
        <div className="p-3 flex flex-col flex-1">
          <Link href={productHref}>
            <h3 className="text-sm text-gray-800 line-clamp-2 leading-snug mb-2 hover:text-primary-800 transition-colors">
              {name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mb-1.5">
            <span className="text-primary-800 font-bold text-[15px]">
              {displayPriceMax
                ? `US$${displayPriceMin.toFixed(2)}–${displayPriceMax.toFixed(2)}`
                : formatCurrency(displayPriceMin)}
            </span>
            <span className="text-gray-400 text-[11px] ml-0.5">/{displayUnit}</span>
          </div>

          {/* MOQ */}
          {minOrder > 0 && (
            <div className="text-[11px] text-gray-400 mb-2">
              {minOrder} {moqUnit || displayUnit} (MOQ)
            </div>
          )}

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {badges.slice(0, 2).map((b) => (
                <span key={b} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* Supplier */}
          {supplier && (
            <div className="text-[11px] text-gray-500 truncate mb-2 flex items-center gap-1">
              {audited && <BadgeCheck size={10} className="text-primary-600 flex-shrink-0" />}
              {supplier}
            </div>
          )}

          <div className="mt-auto" />

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mb-2.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-100 text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-400">({reviews})</span>
            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div className="px-3 pb-3 flex gap-2">
          <button
            onClick={handleInquire}
            className="flex-1 py-1.5 bg-primary-800 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Send Inquiry
          </button>
          <Link
            href={`/messages?to=${encodeURIComponent(supplier || '')}`}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:text-primary-700 hover:border-primary-300 transition-colors flex-shrink-0"
            title="Chat with supplier"
          >
            <MessageCircle size={14} />
          </Link>
        </div>
      </div>
    );
  }

  /* ── List view ────────────────────────────────────────── */
  return (
    <div className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 flex gap-4 p-4 transition-all duration-200">
      {/* Thumbnail */}
      <Link href={productHref} className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
        <Image
          src={image || `https://placehold.co/280x280/f0fdf4/155e2c?text=${encodeURIComponent((name || 'Product').slice(0, 12))}`}
          alt={name}
          width={120}
          height={120}
          unoptimized
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link href={productHref}>
          <h3 className="text-sm font-medium text-gray-800 hover:text-primary-800 line-clamp-2 mb-1.5 transition-colors leading-snug">
            {name}
          </h3>
        </Link>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {badges.map((b) => (
              <span key={b} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                {b}
              </span>
            ))}
            {securedTrading && (
              <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                <Shield size={9} /> Secured Trading
              </span>
            )}
            {sampleAvailable && (
              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                Sample Order
              </span>
            )}
          </div>
        )}

        {/* Supplier */}
        {supplier && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            {audited && <BadgeCheck size={11} className="text-primary-600" />}
            <span className="font-medium text-gray-700">{supplier}</span>
            {supplierLocation && <span className="text-gray-400">· {supplierLocation}</span>}
          </div>
        )}

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1">
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
      <div className="flex-shrink-0 flex flex-col items-end justify-between text-right min-w-[140px]">
        <div>
          <div className="text-primary-800 font-bold text-base">
            {displayPriceMax
              ? `US$${displayPriceMin.toFixed(2)}–${displayPriceMax.toFixed(2)}`
              : formatCurrency(displayPriceMin)}
          </div>
          <div className="text-xs text-gray-400">/{displayUnit}</div>
          {minOrder > 0 && (
            <div className="text-[11px] text-gray-400 mt-0.5">
              {minOrder} {moqUnit || displayUnit} (MOQ)
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5 mt-3">
          <button
            onClick={handleInquire}
            className="w-full px-4 py-1.5 bg-primary-800 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Send Inquiry
          </button>
          <Link
            href={`/messages?to=${encodeURIComponent(supplier || '')}`}
            className="w-full px-4 py-1.5 border border-gray-200 text-gray-600 hover:text-primary-700 hover:border-primary-300 text-xs rounded-lg transition-colors text-center flex items-center justify-center gap-1"
          >
            <MessageCircle size={12} /> Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
