'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBasket, Star, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, starRating } from '@/lib/utils';
import { wishlistApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AIAdvisorProductCard({ product, reason }) {
  const { addItem } = useCart();

  // Basic normalization
  const id = product.id;
  const name = product.name;
  const price = product.price || 0;
  const image = product.featured_image || product.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80';
  const rating = product.average_rating || 0;
  const supplier = product.supplier_details?.company_name || product.supplier || 'SL Beauty';
  const slug = product.slug;

  const stars = starRating(rating);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    try {
      await wishlistApi.add(id);
      toast.success(`${name} added to wishlist`);
    } catch (err) {
      toast.error(err.message || 'Please log in to save to wishlist.');
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-[#edebeb] overflow-hidden hover:shadow-md transition-shadow w-full">
      {/* Product Image & Wishlist */}
      <div className="relative aspect-square w-full bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 300px"
        />
        <button
          type="button"
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm cursor-pointer"
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-3 flex-1 flex flex-col">
        <span className="text-[10px] sm:text-xs font-bold tracking-wider text-gray-400 uppercase truncate">
          {supplier}
        </span>
        <h4 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mt-1 mb-1.5 min-h-[32px]">
          {name}
        </h4>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {stars.map((type, i) => (
                <Star
                  key={i}
                  size={10}
                  className={
                    type === 'full' ? 'fill-amber-400 text-amber-400' :
                    type === 'half' ? 'fill-amber-200 text-amber-400' :
                                      'fill-gray-100 text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({product.reviews_count || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="text-[#a21caf] font-bold text-sm sm:text-base">
          {formatCurrency(price)}
        </div>

        {/* Recommendation Reason */}
        {reason && (
          <div className="mt-2 text-[10px] sm:text-xs text-primary-800 bg-primary-50/60 p-2 rounded-xl border border-primary-100/50 leading-normal italic">
            <strong>Match Reason:</strong> {reason}
          </div>
        )}

        {/* Actions */}
        <div className="mt-3 flex gap-1.5">
          <Link
            href={`/products/${id || slug}`}
            className="flex-1 text-center py-2 border border-[#d9c7c3] hover:border-gray-400 text-gray-700 text-[11px] sm:text-xs font-bold rounded-xl transition duration-200 cursor-pointer"
          >
            View
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-2 bg-gradient-to-r from-primary-800 to-rose-500 hover:from-primary-950 hover:to-rose-600 text-white text-[11px] sm:text-xs font-bold rounded-xl transition duration-200 flex items-center justify-center gap-1 cursor-pointer"
          >
            <ShoppingBasket size={12} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
