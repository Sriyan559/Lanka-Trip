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
import { SlidersHorizontal, LayoutGrid, List, ChevronDown, X, Search, ShieldCheck } from 'lucide-react';
import B2BProductCard from '@/components/product/B2BProductCard';
import Pagination from '@/components/ui/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { productsApi, suppliersApi } from '@/lib/api';
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
  { label: 'Any MOQ', value: '' },
  { label: 'MOQ up to 50', value: '50' },
  { label: 'MOQ up to 100', value: '100' },
  { label: 'MOQ up to 500', value: '500' },
];

const LEAD_TIME_OPTIONS = [
  { label: 'Any lead time', value: '' },
  { label: 'Ready within 7 days', value: '7' },
  { label: 'Ready within 14 days', value: '14' },
  { label: 'Ready within 30 days', value: '30' },
  { label: 'Ready within 45 days', value: '45' },
];

const PORT_OPTIONS = [
  { label: 'Any export port', value: '' },
  { label: 'Colombo Port', value: 'Colombo' },
  { label: 'Hambantota Port', value: 'Hambantota' },
  { label: 'Bandaranaike Airport', value: 'Bandaranaike' },
];

const STATUS_OPTIONS = [
  { label: 'All products', value: '' },
  { label: 'Active listings', value: 'active' },
  { label: 'Featured products', value: 'featured' },
  { label: 'Export ready', value: 'export_ready' },
];

function normalizeSupplierOptions(response) {
  const rows = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response?.suppliers)
      ? response.suppliers
      : Array.isArray(response)
        ? response
        : [];

  return rows
    .map((supplier) => ({
      id: supplier.id ?? supplier.supplier_id,
      name: supplier.company_name || supplier.name || supplier.business_name || 'Verified supplier',
      verified: Boolean(supplier.verified || supplier.verification_status === 'verified'),
    }))
    .filter((supplier) => supplier.id);
}

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
  const supplierId = searchParams.get('supplier_id') || '';
  const verifiedSupplier = searchParams.get('verified_supplier') || '';
  const leadTimeMax = searchParams.get('lead_time_max') || '';
  const port = searchParams.get('port') || '';
  const productStatus = searchParams.get('status') || '';

  const [products,    setProducts]    = useState([]);
  const [suppliers,   setSuppliers]   = useState([]);
  const [totalPages,  setTotalPages]  = useState(1);
  const [total,       setTotal]       = useState(0);
  const [loading,     setLoading]     = useState(true);
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [supplierError, setSupplierError] = useState('');
  const [error,       setError]       = useState('');
  const [reloadKey,   setReloadKey]   = useState(0);
  const [view,        setView]        = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* Filter state */
  const [keyword,     setKeyword]     = useState(q);
  const [selCat,      setSelCat]      = useState(category);
  const [priceMin,    setPriceMin]    = useState(urlPriceMin);
  const [priceMax,    setPriceMax]    = useState(urlPriceMax);
  const [maxOrder,    setMaxOrder]    = useState(urlMaxOrder);
  const [selSupplier, setSelSupplier] = useState(supplierId);
  const [selVerified, setSelVerified] = useState(verifiedSupplier);
  const [selLeadTime, setSelLeadTime] = useState(leadTimeMax);
  const [selPort,     setSelPort]     = useState(port);
  const [selStatus,   setSelStatus]   = useState(productStatus);
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

  const applyKeywordSearch = (event) => {
    event.preventDefault();
    pushParams({ q: keyword.trim() });
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
          supplier_id: supplierId,
          verified_supplier: verifiedSupplier,
          lead_time_max: leadTimeMax,
          port,
          status: productStatus,
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
  }, [category, sort, page, q, urlPriceMin, urlPriceMax, urlMaxOrder, supplierId, verifiedSupplier, leadTimeMax, port, productStatus, reloadKey]);

  useEffect(() => {
    let active = true;

    const loadSuppliers = async () => {
      setSupplierLoading(true);
      setSupplierError('');
      try {
        const data = await suppliersApi.list({ per_page: 20, verified: 1 });
        if (active) setSuppliers(normalizeSupplierOptions(data));
      } catch (supplierLoadError) {
        if (active) {
          setSuppliers([]);
          setSupplierError(supplierLoadError.message || 'Supplier filters unavailable.');
        }
      } finally {
        if (active) setSupplierLoading(false);
      }
    };

    loadSuppliers();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setKeyword(q);
    setSelCat(category);
    setPriceMin(urlPriceMin);
    setPriceMax(urlPriceMax);
    setMaxOrder(urlMaxOrder);
    setSelSupplier(supplierId);
    setSelVerified(verifiedSupplier);
    setSelLeadTime(leadTimeMax);
    setSelPort(port);
    setSelStatus(productStatus);
  }, [q, category, urlPriceMin, urlPriceMax, urlMaxOrder, supplierId, verifiedSupplier, leadTimeMax, port, productStatus]);

  const clearFilters = () => {
    setSelCat('');
    setPriceMin('');
    setPriceMax('');
    setMaxOrder('');
    setSelSupplier('');
    setSelVerified('');
    setSelLeadTime('');
    setSelPort('');
    setSelStatus('');
    router.push('/products');
  };

  const selectedCategoryLabel = categories.find(c => c.slug === selCat)?.label || selCat;
  const selectedSupplierLabel = suppliers.find(supplier => String(supplier.id) === String(selSupplier))?.name || 'Selected supplier';
  const selectedLeadTimeLabel = LEAD_TIME_OPTIONS.find(option => option.value === selLeadTime)?.label;
  const selectedPortLabel = PORT_OPTIONS.find(option => option.value === selPort)?.label || selPort;
  const selectedStatusLabel = STATUS_OPTIONS.find(option => option.value === selStatus)?.label || selStatus;
  const hasFilters = q || category || urlPriceMin || urlPriceMax || urlMaxOrder || supplierId || verifiedSupplier || leadTimeMax || port || productStatus;

  /* ── Filter sidebar content ─────────────────────────── */
  const FilterContent = () => (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold text-sm text-gray-800">Sourcing filters</h3>
        {hasFilters && (
          <button onClick={clearFilters} className="flex flex-shrink-0 items-center gap-0.5 text-xs text-primary-700 hover:underline">
            <X size={11} /> Clear All
          </button>
        )}
      </div>

      {/* Supplier */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Supplier</div>
        <select
          value={selSupplier}
          onChange={(event) => {
            setSelSupplier(event.target.value);
            pushParams({ supplier_id: event.target.value });
          }}
          className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm text-gray-700 bg-white outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100"
        >
          <option value="">All suppliers</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}{supplier.verified ? ' - Verified' : ''}
            </option>
          ))}
        </select>
        {supplierLoading && <p className="mt-1.5 text-xs text-gray-400">Loading suppliers...</p>}
        {supplierError && <p className="mt-1.5 text-xs text-gray-400">Supplier list unavailable; product results still work.</p>}
      </div>

      {/* Verified supplier */}
      <label className="flex items-start gap-2 rounded-lg border border-primary-100 bg-primary-50/70 px-3 py-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={selVerified === '1'}
          onChange={(event) => {
            const value = event.target.checked ? '1' : '';
            setSelVerified(value);
            pushParams({ verified_supplier: value });
          }}
          className="mt-0.5 accent-primary-700 w-3.5 h-3.5"
        />
        <span>
          <span className="flex items-center gap-1 text-[13px] font-semibold text-primary-900">
            <ShieldCheck size={13} /> Verified suppliers only
          </span>
          <span className="block text-[11px] leading-snug text-primary-700 mt-0.5">
            Prioritize export-ready Sri Lankan suppliers for Maldives sourcing.
          </span>
        </span>
      </label>

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
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">MOQ</div>
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
        <div className="flex items-center gap-1.5 mb-2">
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

      {/* Lead time */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Lead time</div>
        <select
          value={selLeadTime}
          onChange={(event) => {
            setSelLeadTime(event.target.value);
            pushParams({ lead_time_max: event.target.value });
          }}
          className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm text-gray-700 bg-white outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100"
        >
          {LEAD_TIME_OPTIONS.map((option) => (
            <option key={option.value || 'any'} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Port */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Export port</div>
        <select
          value={selPort}
          onChange={(event) => {
            setSelPort(event.target.value);
            pushParams({ port: event.target.value });
          }}
          className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm text-gray-700 bg-white outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100"
        >
          {PORT_OPTIONS.map((option) => (
            <option key={option.value || 'any'} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Product status */}
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Listing type</div>
        <select
          value={selStatus}
          onChange={(event) => {
            setSelStatus(event.target.value);
            pushParams({ status: event.target.value });
          }}
          className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-sm text-gray-700 bg-white outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value || 'all'} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

    </div>
  );

  return (
    <div className="min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-gray-400 sm:mb-4 sm:text-sm">
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

      <section className="mb-4 rounded-xl border border-primary-100 bg-white p-3.5 shadow-sm sm:mb-5 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">B2B product sourcing</p>
            <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">Find export-ready Sri Lankan products</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Search verified suppliers, compare MOQ and FOB pricing, then send inquiries for Maldives-ready sourcing.
            </p>
          </div>
          <form onSubmit={applyKeywordSearch} className="flex w-full min-w-0 flex-col gap-2 sm:flex-row lg:max-w-xl">
            <div className="relative flex-1 min-w-0">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search tea, coconut, cinnamon, apparel..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 sm:flex-shrink-0"
            >
              Search products
            </button>
          </form>
        </div>
      </section>

      <div className="flex min-w-0 gap-5">
        {/* ── Desktop filter sidebar ── */}
        <aside className="hidden lg:block flex-shrink-0 w-64">
          <div className="sticky top-20 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <FilterContent />
          </div>
        </aside>

        {/* ── Mobile filter drawer ── */}
        {filtersOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="relative flex h-full w-[min(22rem,calc(100vw-2rem))] flex-col bg-white shadow-2xl animate-slide-up">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <h3 className="font-bold text-gray-800">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <FilterContent />
              </div>
              <div className="border-t border-gray-100 p-4">
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-xl"
                >
                  Show Results ({total})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm transition-colors hover:border-gray-300 lg:hidden"
              >
                <SlidersHorizontal size={14} /> Filters
                {hasFilters && <span className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0" />}
              </button>

              {q && (
                <div className="flex min-w-0 max-w-full items-center gap-1 rounded-lg border border-primary-100 bg-primary-50 px-3 py-1.5 text-sm text-primary-800">
                  <Search size={13} />
                  <span className="font-medium truncate">&quot;{q}&quot;</span>
                </div>
              )}

              {total > 0 && (
                <span className="text-sm text-gray-500">
                  <strong className="text-gray-800">{total.toLocaleString()}</strong> products found
                </span>
              )}
            </div>

            <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
              {/* Sort */}
              <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:flex-none">
                <span className="text-xs text-gray-500 hidden sm:block">Sort by:</span>
                <div className="relative min-w-0 flex-1 sm:flex-none">
                  <select
                    value={sort}
                    onChange={(e) => pushParams({ sort: e.target.value })}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-7 text-sm text-gray-700 shadow-sm outline-none hover:border-gray-300 cursor-pointer sm:w-auto"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* View toggle */}
              <div className="flex flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
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
            <div className="mb-4 flex min-w-0 flex-wrap gap-2">
              {q && (
                <span className="flex max-w-full items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  <span className="truncate">Search: {q}</span>
                  <button onClick={() => { setKeyword(''); pushParams({ q: '' }); }} aria-label="Remove search filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selCat && (
                <span className="flex max-w-full items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  <span className="truncate">Category: {selectedCategoryLabel}</span>
                  <button onClick={() => { setSelCat(''); pushParams({ category: '' }); }} aria-label="Remove category filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selSupplier && (
                <span className="flex max-w-full items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  <span className="truncate">Supplier: {selectedSupplierLabel}</span>
                  <button onClick={() => { setSelSupplier(''); pushParams({ supplier_id: '' }); }} aria-label="Remove supplier filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selVerified && (
                <span className="flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  Verified suppliers
                  <button onClick={() => { setSelVerified(''); pushParams({ verified_supplier: '' }); }} aria-label="Remove verified supplier filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {(priceMin || priceMax) && (
                <span className="flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  Price: {priceMin || '0'}–{priceMax || '∞'}
                  <button onClick={() => { setPriceMin(''); setPriceMax(''); pushParams({ price_min: '', price_max: '' }); }} aria-label="Remove price filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {maxOrder && (
                <span className="flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  MOQ up to {maxOrder}
                  <button onClick={() => { setMaxOrder(''); pushParams({ max_order: '' }); }} aria-label="Remove MOQ filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selLeadTime && (
                <span className="flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  {selectedLeadTimeLabel}
                  <button onClick={() => { setSelLeadTime(''); pushParams({ lead_time_max: '' }); }} aria-label="Remove lead time filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selPort && (
                <span className="flex max-w-full items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  <span className="truncate">Port: {selectedPortLabel}</span>
                  <button onClick={() => { setSelPort(''); pushParams({ port: '' }); }} aria-label="Remove port filter">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selStatus && (
                <span className="flex max-w-full items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800">
                  <span className="truncate">{selectedStatusLabel}</span>
                  <button onClick={() => { setSelStatus(''); pushParams({ status: '' }); }} aria-label="Remove listing type filter">
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
                ? 'grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
                : 'space-y-3 sm:space-y-4'
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
