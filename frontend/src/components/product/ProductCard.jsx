'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, Heart, Star, BadgeCheck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, starRating } from '@/lib/utils';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const {
    id, name, price, minOrder, moqUnit = 'Kg', rating = 0,
    reviews = 0, image, supplier, verified = false, slug,
  } = product;

  const stars = starRating(rating);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link
      href={`/products/${id || slug}`}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover-lift overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={image || `https://placehold.co/240x240/f0fdf4/155e2c?text=${encodeURIComponent(name?.slice(0,12) || 'Product')}`}
          alt={name}
          width={240}
          height={240}
          unoptimized
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {verified && (
          <span className="absolute top-2 left-2 flex items-center gap-0.5 bg-primary-700/90 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
            <BadgeCheck size={10} /> Verified
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); }}
          aria-label="Add to wishlist"
          className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug mb-1.5">
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
          <div className="text-primary-800 font-bold text-base">
            {formatCurrency(price)}
            <span className="text-gray-400 text-[11px] font-normal ml-0.5">/{moqUnit}</span>
          </div>
          {minOrder && (
            <div className="text-[11px] text-gray-400">
              Min. Order: {minOrder} {moqUnit}
            </div>
          )}
          {supplier && (
            <div className="text-[11px] text-gray-500 mt-1 truncate">{supplier}</div>
          )}
        </div>
      </div>

      {/* Add to Inquiry Basket */}
      <button
        onClick={handleAddToCart}
        className="mx-3 mb-3 py-1.5 border border-primary-700 text-primary-700 text-xs font-medium rounded-lg hover:bg-primary-700 hover:text-white transition-colors flex items-center justify-center gap-1.5"
      >
        <ShoppingBasket size={13} />
        Add to Basket
      </button>
    </Link>
  );
}
