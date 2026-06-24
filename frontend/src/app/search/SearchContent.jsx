'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import B2BProductCard from '@/components/product/B2BProductCard';
import Pagination from '@/components/ui/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { productsApi } from '@/lib/api';
import { SRI_LANKA_CATEGORIES } from '@/lib/constants';
import { debounce } from '@/lib/utils';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Best Match' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc','label': 'Price: High → Low' },
  { value: 'newest',    label: 'Newest First' },
  { value: 'top',       label: 'Top Rated' },
];

// Placeholder products for when API isn't connected
const MOCK_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: ['Ceylon Premium Tea 500g', 'Blue Sapphire 2ct', 'Ceylon Cinnamon Sticks 1kg',
         'Coconut Virgin Oil 1L', 'Hand-woven Batik Sarong', 'Natural Rubber Sheet 5kg',
         'Ayurvedic Hair Oil 200ml', 'Spiced Black Pepper 250g', 'Handmade Ceramic Vase',
         'Teak Wood Plank 2m', 'Gem-quality Ruby 1ct', 'Organic Turmeric Powder 500g'][i],
  price: [12.50, 450, 8.90, 15, 35, 22, 18, 5.50, 45, 120, 380, 6.80][i],
  moqUnit: ['Kg','ct','Kg','L','Piece','Kg','ml','Kg','Piece','m','ct','Kg'][i],
  minOrder: [10, 1, 5, 12, 50, 100, 24, 20, 5, 10, 1, 25][i],
  rating: [4.8, 4.5, 4.9, 4.3, 4.7, 4.2, 4.6, 4.8, 4.4, 4.1, 4.9, 4.5][i],
  reviews: [234, 89, 412, 156, 78, 203, 91, 347, 62, 45, 127, 289][i],
  verified: i % 3 === 0,
  supplier: ['Lanka Tea Co.', 'Gem Palace LK', 'Spice Garden', 'Coco Lanka',
             'Batik Art', 'Rubber Works', 'Ayur Life', 'Pepper Farm',
             'Clay Studio', 'Timber Lanka', 'Ruby Mine', 'Turmeric Farm'][i],
}));

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const q        = searchParams.get('q')        || '';
  const category = searchParams.get('category') || '';
  const sort     = searchParams.get('sort')     || 'relevance';
  const page     = Number(searchParams.get('page') || 1);

  const [products,   setProducts]   = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total,      setTotal]      = useState(0);
  const [loading,    setLoading]    = useState(false);
  const [filtersOpen,setFiltersOpen]= useState(false);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [verified, setVerified] = useState(false);
  const [selCat,   setSelCat]   = useState(category);

  const updateQuery = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v); else params.delete(k);
    });
    params.set('page', '1');
    router.push(`/search?${params.toString()}`);
  }, [searchParams, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { search: q, category: selCat, sort, page, price_min: priceMin, price_max: priceMax };
        if (verified) params.verified = 1;
        const data = await productsApi.search(q, params);
        setProducts(data.data || data.products || []);
        setTotalPages(data.last_page || data.totalPages || 1);
        setTotal(data.total || data.count || 0);
      } catch {
        // Fallback to mock data in dev
        setProducts(MOCK_PRODUCTS);
        setTotalPages(3);
        setTotal(36);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [q, selCat, sort, page, priceMin, priceMax, verified]);

  return (
    <div>
      {/* ── Search header ── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {q ? `Results for "${q}"` : 'All Products'}
          </h1>
          {total > 0 && <p className="text-sm text-gray-400">{total.toLocaleString()} products found</p>}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
          <select
            value={sort}
            onChange={(e) => updateQuery({ sort: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-5">
        {/* ── Filters sidebar ── */}
        {(filtersOpen) && (
          <aside className="w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-5 sticky top-20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-800">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={15} /></button>
              </div>

              {/* Category filter */}
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Category</div>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => { setSelCat(''); updateQuery({ category: '' }); }}
                    className={`block w-full text-left text-sm px-2 py-1 rounded ${!selCat ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    All Categories
                  </button>
                  {SRI_LANKA_CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => { setSelCat(cat.slug); updateQuery({ category: cat.slug }); }}
                      className={`block w-full text-left text-sm px-2 py-1 rounded ${selCat === cat.slug ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Price Range (USD)</div>
                <div className="flex gap-2 items-center">
                  <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-primary-400" />
                  <span className="text-gray-400 text-sm">–</span>
                  <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-primary-400" />
                </div>
              </div>

              {/* Verified suppliers */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-700 focus:ring-primary-500" />
                <span className="text-sm text-gray-700">Verified Suppliers Only</span>
              </label>
            </div>
          </aside>
        )}

        {/* ── Product grid ── */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <LoadingSpinner label="Searching…" />
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <Search size={40} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-gray-500 font-medium">No products found</h3>
              <p className="text-sm text-gray-400 mt-1">Try different keywords or{' '}
                <a href="/rfq" className="text-primary-700 underline">post an RFQ</a>
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((p) => <B2BProductCard key={p.id} product={p} viewMode="grid" />)}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => updateQuery({ page: String(p) })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
