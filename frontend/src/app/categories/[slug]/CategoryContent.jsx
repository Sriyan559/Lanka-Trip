'use client';

/**
 * CategoryContent — full B2B category listing page.
 *
 * Layout: left filter sidebar + right product grid/list (same as /products).
 * Product cards feed the inquiry/RFQ workflow; orders begin from accepted quotations.
 *
 * Laravel: GET /api/categories/{slug}/products?page=&sort=&...
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal, LayoutGrid, List,
  ChevronDown, X, ArrowRight,
} from 'lucide-react';
import B2BProductCard   from '@/components/product/B2BProductCard';
import Pagination       from '@/components/ui/Pagination';
import LoadingSpinner   from '@/components/ui/LoadingSpinner';
import { productsApi }  from '@/lib/api';
import { normalizeProductResponse } from '@/lib/products';
import useCategories from '@/hooks/useCategories';

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest' },
  { value: 'best',       label: 'Best Match' },
  { value: 'top',        label: 'Most Popular' },
  { value: 'price_asc',  label: 'Price ↑' },
  { value: 'price_desc', label: 'Price ↓' },
];

export default function CategoryContent({ slug }) {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const page = Number(searchParams.get('page') || 1);
  const sort = searchParams.get('sort') || 'newest';
  const urlPriceMin = searchParams.get('price_min') || '';
  const urlPriceMax = searchParams.get('price_max') || '';

  const [products,    setProducts]    = useState([]);
  const [totalPages,  setTotalPages]  = useState(1);
  const [total,       setTotal]       = useState(0);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [reloadKey,   setReloadKey]   = useState(0);
  const [view,        setView]        = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceMin,    setPriceMin]    = useState(urlPriceMin);
  const [priceMax,    setPriceMax]    = useState(urlPriceMax);
  const [category,    setCategory]    = useState(null);
  const { categories, error: categoriesError, retry: retryCategories } = useCategories();
  const related = categories.filter((item) => item.slug !== slug).slice(0, 6);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await productsApi.byCategory(slug, {
          page, sort,
          price_min: urlPriceMin,
          price_max: urlPriceMax,
        });
        const normalized = normalizeProductResponse(data);
        setProducts(normalized.data);
        setTotalPages(normalized.last_page);
        setTotal(normalized.total);
        setCategory(data.category || null);
      } catch (loadError) {
        setProducts([]);
        setTotalPages(1);
        setTotal(0);
        setCategory(null);
        setError(loadError.message || 'Could not load this category.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, page, sort, urlPriceMin, urlPriceMax, reloadKey]);

  useEffect(() => {
    setPriceMin(urlPriceMin);
    setPriceMax(urlPriceMax);
  }, [urlPriceMin, urlPriceMax]);

  const pushFilters = () => {
    const p = new URLSearchParams(searchParams.toString());
    if (priceMin) p.set('price_min', priceMin); else p.delete('price_min');
    if (priceMax) p.set('price_max', priceMax); else p.delete('price_max');
    p.set('page', '1');
    router.push(`/categories/${slug}?${p.toString()}`);
  };

  const pushSort = (s) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('sort', s); p.set('page', '1');
    router.push(`/categories/${slug}?${p.toString()}`);
  };
  const pushPage = (pg) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('page', String(pg));
    router.push(`/categories/${slug}?${p.toString()}`);
  };

  const FilterPanel = () => (
    <div className="space-y-5">
      <h3 className="font-bold text-sm text-gray-800">Filter</h3>

      {/* Sort (inside filter on mobile) */}
      <div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Sort By</div>
        {SORT_OPTIONS.map(o => (
          <button
            key={o.value}
            onClick={() => pushSort(o.value)}
            className={`block w-full text-left px-2 py-1.5 rounded-lg text-[13px] transition-colors ${sort === o.value ? 'bg-primary-50 text-primary-800 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Price */}
      <div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Price (USD)</div>
        <div className="flex gap-1.5 items-center mb-2">
          <input
            type="number" placeholder="Min" value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-primary-400"
          />
          <span className="text-gray-300">–</span>
          <input
            type="number" placeholder="Max" value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-primary-400"
          />
        </div>
        <button type="button" onClick={pushFilters} className="w-full py-1.5 bg-primary-800 text-white text-xs font-semibold rounded-lg">
          Apply Price
        </button>
      </div>

      {/* Related categories */}
      {(related.length > 0 || categoriesError) && (
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Related</div>
          <div className="space-y-0.5">
            {related.map(r => (
              <a key={r.slug} href={`/categories/${r.slug}`}
                className="block px-2 py-1.5 text-[13px] text-primary-700 hover:bg-primary-50 rounded-lg truncate">
                {r.label}
              </a>
            ))}
          </div>
          {categoriesError && (
            <button type="button" onClick={retryCategories} className="text-xs text-red-600 hover:underline">
              Retry categories
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Page header */}
      <div className="mb-5 pb-4 border-b border-gray-100">
        <div className="text-sm text-gray-400 mb-1 flex items-center gap-1.5 flex-wrap">
          <a href="/" className="hover:text-primary-700">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-primary-700">Products</a>
          <span>/</span>
          <span className="text-gray-700">{category?.label || category?.name || slug}</span>
        </div>
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{category?.label || category?.name || slug}</h1>
            {total > 0 && (
              <p className="text-sm text-gray-400 mt-0.5">{total.toLocaleString()} products available</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block flex-shrink-0 w-48">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-20">
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="relative w-72 bg-white h-full overflow-y-auto p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>
              <FilterPanel />
              <button onClick={() => setFiltersOpen(false)}
                className="mt-4 w-full py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl">
                Show Results ({total})
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 shadow-sm"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>

            <div className="flex items-center gap-2 ml-auto">
              {/* Sort (desktop) */}
              <div className="hidden lg:flex items-center gap-1.5">
                <span className="text-xs text-gray-500">Sort:</span>
                <div className="relative">
                  <select
                    value={sort} onChange={e => pushSort(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none shadow-sm cursor-pointer"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* View toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button onClick={() => setView('grid')}
                  className={`p-1.5 ${view === 'grid' ? 'bg-primary-800 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}>
                  <LayoutGrid size={15} />
                </button>
                <button onClick={() => setView('list')}
                  className={`p-1.5 ${view === 'list' ? 'bg-primary-800 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}>
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner label="Loading products…" />
          ) : error ? (
            <div className="py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Category could not be loaded</h3>
              <p className="text-sm text-gray-400 mb-4">{error}</p>
              <button type="button" onClick={() => setReloadKey((value) => value + 1)} className="px-6 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl">
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No products in this category yet</h3>
              <p className="text-sm text-gray-400 mb-4">Be the first supplier to list here, or post an RFQ.</p>
              <a href="/rfq"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent-500 text-white text-sm font-semibold rounded-xl hover:bg-accent-600 transition-colors">
                Post an RFQ <ArrowRight size={14} />
              </a>
            </div>
          ) : (
            <>
              <div className={view === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-3'}>
                {products.map(p => <B2BProductCard key={p.id} product={p} viewMode={view} />)}
              </div>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={pushPage} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
