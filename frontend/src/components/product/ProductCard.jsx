'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, Star, BadgeCheck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, starRating } from '@/lib/utils';
import { normalizeProduct } from '@/lib/products';
import WishlistButton from './WishlistButton';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const normalized = normalizeProduct(product);
  const {
    id, name, price, minOrder, moqUnit = 'Item', rating = 0,
    reviews = 0, image, supplier, verified = false, slug,
  } = normalized;

  const supplierName = typeof supplier === 'string'
    ? supplier
    : supplier?.name || supplier?.company_name || '';
  const stars = starRating(rating);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(normalized);
  };

  return (
    <Link
      href={`/products/${id || slug}`}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover-lift overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'}
          alt={name}
          width={240}
          height={240}
          unoptimized
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {verified && (
          <span className="absolute top-2 left-2 flex items-center gap-0.5 bg-primary-700/90 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded-full">
            <BadgeCheck size={10} /> Verified
          </span>
        )}
        <WishlistButton
          productId={id}
          className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
        />
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        {supplierName && (
          <div className="mb-1 text-[13px] font-medium text-gray-500 truncate">{supplierName}</div>
        )}
        <h3 className="text-[15px] sm:text-base font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
          {name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex">
              {stars.map((type, i) => (
                <Star
                  key={i}
                  size={11}
                  className={
                    type === 'full'  ? 'fill-amber-400 text-amber-400' :
                    type === 'half'  ? 'fill-amber-200 text-amber-400' :
                                       'fill-gray-100 text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-400">({reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          <div className="text-primary-800 font-semibold text-base sm:text-[17px]">
            {formatCurrency(price)}
            <span className="text-gray-400 text-[11px] font-normal ml-0.5">/{moqUnit}</span>
          </div>
          {minOrder && (
            <div className="text-[11px] text-gray-400">
              Quantity: {minOrder} {moqUnit}
            </div>
          )}
        </div>
      </div>

      {/* Add to Inquiry Basket */}
      <button
        onClick={handleAddToCart}
        className="mx-3 mb-3 py-2 bg-gradient-to-r from-primary-800 to-rose-500 hover:from-primary-900 hover:to-rose-600 text-white text-[13px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm border-0"
      >
        <ShoppingBasket size={13} />
        Add to Basket
      </button>
    </Link>
  );
}
