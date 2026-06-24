'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { wishlistApi } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const MOCK_WISHLIST = [
  { id: 101, product: { id: 1, name: 'Premium Ceylon BOPF Black Tea 500g', price: 12.5, featured_image: 'https://placehold.co/160x160/e8f5e9/155e2c?text=Tea' } },
  { id: 102, product: { id: 4, name: 'Virgin Coconut Oil 5L', price: 15, featured_image: 'https://placehold.co/160x160/fff9c4/f57f17?text=Coconut' } },
  { id: 103, product: { id: 11, name: 'Blue Sapphire 3ct (Certified)', price: 380, featured_image: 'https://placehold.co/160x160/e8eaf6/1a237e?text=Gem' } },
];

function validWishlistItems(items) {
  return Array.isArray(items)
    ? items.filter((wishlist) => wishlist?.id && wishlist?.product?.id)
    : [];
}

export default function WishlistPage() {
  const { addItem } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await wishlistApi.get();
        setItems(validWishlistItems(data.items));
      } catch {
        setItems(MOCK_WISHLIST);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const remove = async (wishlistId) => {
    const previousItems = items;
    setItems((current) => current.filter((wishlist) => wishlist.id !== wishlistId));

    try {
      await wishlistApi.remove(wishlistId);
      toast.success('Removed from wishlist');
    } catch (error) {
      setItems(previousItems);
      toast.error(error.message || 'Could not remove this wishlist item.');
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-1">My Wishlist</h1>
        <p className="text-sm text-gray-400 mb-6">Products you have saved for later</p>

        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Heart size={48} className="text-gray-200 mx-auto mb-3" />
            <h2 className="text-gray-500 font-medium">Your wishlist is empty</h2>
            <Link href="/products" className="mt-3 inline-block text-sm text-primary-700 hover:underline">
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {items.map((wishlist) => (
              <div key={wishlist.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover-lift relative group">
                <button
                  onClick={() => remove(wishlist.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 z-10 shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={13} />
                </button>
                <Link href={`/products/${wishlist.product.id}`}>
                  <Image
                    src={wishlist.product.featured_image || 'https://placehold.co/160x160/f0fdf4/155e2c?text=Product'}
                    alt={wishlist.product.name}
                    width={160}
                    height={160}
                    unoptimized
                    className="w-full aspect-square object-cover rounded-lg mb-2"
                  />
                  <div className="text-sm font-medium text-gray-700 line-clamp-2">{wishlist.product.name}</div>
                  <div className="text-primary-700 font-bold text-sm mt-1">{formatCurrency(wishlist.product.price)}</div>
                </Link>
                <button
                  onClick={() => addItem(wishlist.product)}
                  className="mt-2 w-full py-1.5 border border-primary-700 text-primary-700 text-xs font-medium rounded-lg hover:bg-primary-700 hover:text-white transition-colors"
                >
                  Add to Basket
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
