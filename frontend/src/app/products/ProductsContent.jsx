'use client';

/**
 * ProductsContent — B2B marketplace product search & listing page.
 *
 * Features:
 *  - Left filter sidebar: Category, Min Order, Price, Product Types, Supplier badges
 *  - Sort by: Best Match, Newest, Top Rated, Price ↑/↓
 *  - Grid / List view toggle
 *  - B2BProductCard with Send Inquiry + Chat buttons
 *  - Mobile filter drawer
 *  - Pagination
 *
 * Laravel integration: productsApi.list(params) — see /src/lib/api.js
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, LayoutGrid, List, ChevronDown, X, Search } from 'lucide-react';
import B2BProductCard from '@/components/product/B2BProductCard';
import Pagination from '@/components/ui/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { productsApi } from '@/lib/api';
import { normalizeProductResponse } from '@/lib/products';
import useCategories from '@/hooks/useCategories';

const SORT_OPTIONS = [
  { value: 'best',       label: 'Best Match' },
  { value: 'newest',     label: 'Newest' },
  { value: 'top',        label: 'Most Popular' },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
];

const MIN_ORDER_OPTIONS = [
  { label: 'Any quantity', value: '' },
  { label: 'Less than 50', value: '50' },
  { label: 'Less than 100', value: '100' },
  { label: 'Less than 500', value: '500' },
];

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q        = searchParams.get('q')        || '';
  const category = searchParams.get('category') || '';
  const sort     = searchParams.get('sort')     || 'best';
  const page     = Number(searchParams.get('page') || 1);
  const urlPriceMin = searchParams.get('price_min') || '';
  const urlPriceMax = searchParams.get('price_max') || '';
  const urlMaxOrder = searchParams.get('max_order') || '';

  const [products,    setProducts]    = useState([]);
  const [totalPages,  setTotalPages]  = useState(1);
  const [total,       setTotal]       = useState(0);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [reloadKey,   setReloadKey]   = useState(0);
  const [view,        setView]        = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* Filter state */
  const [selCat,      setSelCat]      = useState(category);
  const [priceMin,    setPriceMin]    = useState(urlPriceMin);
  const [priceMax,    setPriceMax]    = useState(urlPriceMax);
  const [maxOrder,    setMaxOrder]    = useState(urlMaxOrder);
  const { categories, loading: categoriesLoading, error: categoriesError, retry: retryCategories } = useCategories();

  const pushParams = (updates) => {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) p.set(k, v);
      else p.delete(k);
    });
    if (!Object.prototype.hasOwnProperty.call(updates, 'page')) p.set('page', '1');
    router.push(`/products?${p.toString()}`);
  };

  const applyPriceFilter = () => {
    pushParams({ price_min: priceMin, price_max: priceMax });
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await productsApi.list({
          search: q, category, sort, page,
          price_min: urlPriceMin, price_max: urlPriceMax,
          max_order: urlMaxOrder,
        });
        const normalized = normalizeProductResponse(data);
        setProducts(normalized.data);
        setTotalPages(normalized.last_page);
        setTotal(normalized.total);
      } catch (loadError) {
        setProducts([]);
        setTotalPages(1);
        setTotal(0);
        setError(loadError.message || 'Could not load products.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, sort, page, q, urlPriceMin, urlPriceMax, urlMaxOrder, reloadKey]);

  useEffect(() => {
    setSelCat(category);
    setPriceMin(urlPriceMin);
    setPriceMax(urlPriceMax);
    setMaxOrder(urlMaxOrder);
  }, [category, urlPriceMin, urlPriceMax, urlMaxOrder]);

  const clearFilters = () => {
    setSelCat('');
    setPriceMin('');
    setPriceMax('');
    setMaxOrder('');
    router.push('/products');
  };

  const hasFilters = category || urlPriceMin || urlPriceMax || urlMaxOrder;

  /* ── Filter sidebar content ─────────────────────────── */
  const FilterContent = () => (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-gray-800">Filter</h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-primary-700 hover:underline flex items-center gap-0.5">
            <X size={11} /> Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</div>
        <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1">
          <button
            onClick={() => { setSelCat(''); pushParams({ category: '' }); }}
            className={`w-full text-left text-[13px] px-2 py-1.5 rounded-lg transition-colors ${!selCat ? 'bg-primary-50 text-primary-800 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => { setSelCat(c.slug); pushParams({ category: c.slug }); }}
              className={`w-full text-left text-[13px] px-2 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${selCat === c.slug ? 'bg-primary-50 text-primary-800 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="line-clamp-1 flex-1">{c.label}</span>
            </button>
          ))}
          {categoriesLoading && <p className="px-2 py-1.5 text-xs text-gray-400">Loading categories…</p>}
          {categoriesError && (
            <button type="button" onClick={retryCategories} className="px-2 py-1.5 text-xs text-red-600 hover:underline">
              Retry categories
            </button>
          )}
        </div>
      </div>

      {/* Min Order */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Min. Order</div>
        <div className="space-y-0.5">
          {MIN_ORDER_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="minOrder"
                value={opt.value}
                checked={maxOrder === opt.value}
                onChange={() => {
                  setMaxOrder(opt.value);
                  pushParams({ max_order: opt.value });
                }}
                className="accent-primary-700 w-3.5 h-3.5"
              />
              <span className="text-[13px] text-gray-600">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Price (USD/Unit)</div>
        <div className="flex gap-1.5 items-center mb-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100"
          />
          <span className="text-gray-300 flex-shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="w-full py-1.5 bg-primary-800 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Apply Price
        </button>
      </div>

    </div>
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4 flex items-center gap-1.5 flex-wrap">
        <a href="/" className="hover:text-primary-700 transition-colors">Home</a>
        <span>/</span>
        <span className="text-gray-700">Products</span>
        {selCat && (
          <>
            <span>/</span>
            <span className="text-gray-700">{categories.find(c => c.slug === selCat)?.label || selCat}</span>
          </>
        )}
        {q && (
          <>
            <span>/</span>
            <span className="text-gray-700">&quot;{q}&quot;</span>
          </>
        )}
      </div>

      <div className="flex gap-5">
        {/* ── Desktop filter sidebar ── */}
        <aside className="hidden lg:block flex-shrink-0 w-52">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sticky top-20">
            <FilterContent />
          </div>
        </aside>

        {/* ── Mobile filter drawer ── */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="relative w-72 bg-white h-full overflow-y-auto p-4 shadow-2xl animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>
              <FilterContent />
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-4 w-full py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl"
              >
                Show Results ({total})
              </button>
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 shadow-sm transition-colors"
              >
                <SlidersHorizontal size={14} /> Filters
                {hasFilters && <span className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0" />}
              </button>

              {q && (
                <div className="flex items-center gap-1 bg-primary-50 text-primary-800 text-sm px-3 py-1.5 rounded-lg border border-primary-100">
                  <Search size={13} />
                  <span className="font-medium">&quot;{q}&quot;</span>
                </div>
              )}

              {total > 0 && (
                <span className="text-sm text-gray-500">
                  <strong className="text-gray-800">{total.toLocaleString()}</strong> products found
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500 hidden sm:block">Sort by:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => pushParams({ sort: e.target.value })}
                    className="appearance-none pl-3 pr-7 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none hover:border-gray-300 cursor-pointer shadow-sm"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* View toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 transition-colors ${view === 'grid' ? 'bg-primary-800 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                  title="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 transition-colors ${view === 'list' ? 'bg-primary-800 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                  title="List view"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Active filters chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selCat && (
                <span className="flex items-center gap-1.5 text-xs bg-primary-50 text-primary-800 px-2.5 py-1 rounded-full border border-primary-100 font-medium">
                  {categories.find(c => c.slug === selCat)?.label || selCat}
                  <button onClick={() => { setSelCat(''); pushParams({ category: '' }); }}>
                    <X size={11} />
                  </button>
                </span>
              )}
              {(priceMin || priceMax) && (
                <span className="flex items-center gap-1.5 text-xs bg-primary-50 text-primary-800 px-2.5 py-1 rounded-full border border-primary-100 font-medium">
                  Price: {priceMin || '0'}–{priceMax || '∞'}
                  <button onClick={() => { setPriceMin(''); setPriceMax(''); pushParams({ price_min: '', price_max: '' }); }}>
                    <X size={11} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products grid / list */}
          {loading ? (
            <LoadingSpinner label="Finding products…" />
          ) : error ? (
            <div className="py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Products could not be loaded</h3>
              <p className="text-sm text-gray-400 mb-4">{error}</p>
              <button type="button" onClick={() => setReloadKey((value) => value + 1)} className="px-6 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl">
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-sm text-gray-400 mb-4">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="px-6 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className={view === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-3'
              }>
                {products.map((p) => (
                  <B2BProductCard key={p.id} product={p} viewMode={view} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => pushParams({ page: String(p) })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
