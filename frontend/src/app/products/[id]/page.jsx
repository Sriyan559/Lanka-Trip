'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, BadgeCheck, MapPin, Package, Send, Heart, Share2, ChevronLeft } from 'lucide-react';
import { productsApi } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, starRating } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProductCard from '@/components/product/ProductCard';

// Mock product for dev fallback
const MOCK_PRODUCT = {
  id: 1, name: 'Premium Ceylon BOPF Black Tea — 500g Export Pack',
  price: 12.50, moqUnit: 'Kg', minOrder: 50,
  rating: 4.8, reviews: 234, verified: true,
  description: `Our premium BOPF (Broken Orange Pekoe Fannings) Ceylon black tea is sourced from the finest estates in the Nuwara Eliya and Uva regions of Sri Lanka. Known worldwide for its bright, brisk flavour and golden liquor, this tea meets international food safety standards and is suitable for export to all major markets.\n\nAvailable in: 25kg kraft bags, 12.5kg cartons, or custom packaging on request.`,
  images: [
    'https://placehold.co/500x500/e8f5e9/155e2c?text=Ceylon+Tea+Pack',
    'https://placehold.co/500x500/f1f8e9/33691e?text=Tea+Leaves',
    'https://placehold.co/500x500/e0f2f1/004d40?text=Export+Pack',
  ],
  supplier: { id: 1, name: 'Lanka Tea Exports (Pvt) Ltd.', location: 'Colombo, Sri Lanka', rating: 4.9, products: 38, verified: true, since: 2012 },
  specs: [
    { label: 'Grade',       value: 'BOPF (Broken Orange Pekoe Fannings)' },
    { label: 'Origin',      value: 'Nuwara Eliya / Uva, Sri Lanka' },
    { label: 'Flavour',     value: 'Bright, brisk, golden liquor' },
    { label: 'Moisture',    value: '≤5%' },
    { label: 'Packaging',   value: '25kg kraft bag or custom' },
    { label: 'Shelf Life',  value: '24 months' },
    { label: 'Cert.',       value: 'ISO 22000, Rainforest Alliance, Fair Trade' },
    { label: 'HS Code',     value: '0902.30' },
  ],
  category: { slug: 'tea-beverages', label: 'Tea & Beverages' },
};

const RELATED = Array.from({ length: 4 }, (_, i) => ({ ...MOCK_PRODUCT, id: i + 10, name: ['FBOP Ceylon Tea 250g','OP1 Long Leaf Tea 500g','Green Tea Organic 200g','White Tea Pearl 100g'][i], price: [9, 15, 18, 28][i] }));

export default function ProductDetailPage() {
  const { id }  = useParams();
  const router  = useRouter();
  const { addItem } = useCart();

  const [product,   setProduct]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty,       setQty]       = useState(1);
  const [tab,       setTab]       = useState('description');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await productsApi.get(id);
        setProduct(data);
      } catch {
        setProduct(MOCK_PRODUCT);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <><Header /><LoadingSpinner label="Loading product…" /><Footer /></>;
  if (!product) return <><Header /><div className="p-20 text-center text-gray-400">Product not found.</div><Footer /></>;

  const stars = starRating(product.rating || 0);
  const images = product.images?.length ? product.images : [product.image || 'https://placehold.co/500x500/f0fdf4/155e2c?text=Product'];

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-4 flex items-center gap-1.5">
          <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-primary-700">
            <ChevronLeft size={14} /> Back
          </button>
          <span>/</span>
          <a href="/products" className="hover:text-primary-700">Products</a>
          {product.category && (<><span>/</span><a href={`/categories/${product.category.slug}`} className="hover:text-primary-700">{product.category.label}</a></>)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ── Images ── */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden aspect-square mb-3">
              <Image
                src={images[activeImg]}
                alt={product.name}
                width={600}
                height={600}
                unoptimized
                className="w-full h-full object-contain p-4"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                    <Image src={img} alt="" width={64} height={64} unoptimized className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="space-y-4">
            {/* Title + badges */}
            <div>
              {product.verified && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-700 font-medium px-2 py-0.5 rounded-full mb-2">
                  <BadgeCheck size={12} /> Verified Supplier
                </span>
              )}
              <h1 className="text-xl font-bold text-gray-800 leading-snug">{product.name}</h1>
            </div>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">{stars.map((t, i) => <Star key={i} size={14} className={t === 'full' ? 'fill-amber-400 text-amber-400' : t === 'half' ? 'fill-amber-200 text-amber-400' : 'fill-gray-100 text-gray-300'} />)}</div>
                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews?.toLocaleString()} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="bg-primary-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-primary-800">
                {formatCurrency(product.price)}
                <span className="text-base font-normal text-gray-500 ml-1">/ {product.moqUnit}</span>
              </div>
              {product.minOrder && (
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Package size={13} />
                  Min. Order: {product.minOrder} {product.moqUnit}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity ({product.moqUnit})</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setQty(Math.max(product.minOrder || 1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg">−</button>
                  <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} min={product.minOrder || 1}
                    className="w-20 h-10 text-center text-sm font-medium outline-none border-x border-gray-200" />
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg">+</button>
                </div>
                <span className="text-sm text-gray-400">Estimated: {formatCurrency(product.price * qty)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <a href={`/rfq?productId=${product.id}&product=${encodeURIComponent(product.name)}&qty=${qty}&unit=${encodeURIComponent(product.moqUnit || 'Pieces')}`}
                className="flex-1 min-w-[140px] py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <Send size={16} /> Request Quote
              </a>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"><Heart size={14} /> Wishlist</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"><Share2 size={14} /> Share</button>
            </div>

            {/* Supplier card */}
            {product.supplier && (
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{product.supplier.name || product.supplier}</div>
                    {product.supplier.location && (
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={11} />{product.supplier.location}</div>
                    )}
                  </div>
                  {product.supplier.verified && <BadgeCheck size={18} className="text-primary-700" />}
                </div>
                {product.supplier.id && (
                  <a href={`/suppliers/${product.supplier.id}`} className="text-xs text-primary-700 hover:underline">View Supplier Profile →</a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="flex border-b border-gray-100">
            {['description', 'specifications', 'shipping'].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-6 py-3.5 text-sm font-medium capitalize transition-colors border-b-2 ${tab === t ? 'border-primary-700 text-primary-800 bg-primary-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === 'description' && (
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description || 'No description available.'}
              </div>
            )}
            {tab === 'specifications' && (
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {(product.specs || []).map(({ label, value }) => (
                    <tr key={label}>
                      <td className="py-2.5 pr-4 font-medium text-gray-500 w-40">{label}</td>
                      <td className="py-2.5 text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === 'shipping' && (
              <div className="space-y-3 text-sm text-gray-600">
                <p>🚢 Export shipping available to all major ports worldwide.</p>
                <p>📦 FOB Colombo pricing available. CIF/CNF on request.</p>
                <p>📄 Export documentation: Certificate of Origin, Phytosanitary cert, Bill of Lading, Commercial Invoice — all provided.</p>
                <p>⏱️ Lead time: 2–4 weeks after order confirmation.</p>
                <p>Contact the supplier via <strong>Request Quote</strong> for specific shipping quotes.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Related products ── */}
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {RELATED.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
