'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BadgeCheck, Star, MapPin, Package } from 'lucide-react';
import { suppliersApi } from '@/lib/api';
import { SRI_LANKA_CATEGORIES } from '@/lib/constants';
import Pagination from '@/components/ui/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Mock fallback
const MOCK_SUPPLIERS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: ['Lanka Tea Co.','Gem Palace LK','Spice Garden Export','Coco Lanka Ltd.','Batik Arts Lanka',
         'Rubber Works LK','Ayur Life Export','Ceylon Pepper Farm','Lanka Ceramics','Timber Lanka',
         'Ruby Mine Export','Turmeric Farm LK'][i],
  location: 'Colombo, Sri Lanka',
  rating: [4.9,4.7,4.8,4.5,4.6,4.3,4.7,4.9,4.4,4.2,4.8,4.6][i],
  reviews: [432,89,210,156,78,203,91,347,62,45,127,289][i],
  products: [38,12,24,45,18,67,29,53,15,8,22,41][i],
  verified: i % 2 === 0,
  since: 2010 + i,
  categories: [SRI_LANKA_CATEGORIES[i % SRI_LANKA_CATEGORIES.length]?.label],
  image: `https://placehold.co/80x80/${['e8f5e9','e8eaf6','fbe9e7','fff9c4','fce4ec','f3e5f5','e8f5e9','e1f5fe','fafafa','fff3e0','ede7f6','f1f8e9'][i]}/${['155e2c','1a237e','bf360c','f57f17','880e4f','4a148c','2e7d32','01579b','616161','e65100','4527a0','558b2f'][i]}?text=${encodeURIComponent(['Tea','Gem','Spice','Coco','Batik','Rubber','Ayur','Pepper','Ceramic','Wood','Ruby','Turmeric'][i])}`,
}));

export default function SuppliersContent() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const category = searchParams.get('category') || '';
  const verified  = searchParams.get('verified') === '1';
  const page      = Number(searchParams.get('page') || 1);

  const [suppliers,   setSuppliers]   = useState([]);
  const [totalPages,  setTotalPages]  = useState(1);
  const [loading,     setLoading]     = useState(true);
  const [selCat,      setSelCat]      = useState(category);
  const [verifiedOnly,setVerifiedOnly]= useState(verified);

  const pushParams = (updates) => {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => v ? p.set(k, String(v)) : p.delete(k));
    p.set('page', '1');
    router.push(`/suppliers?${p.toString()}`);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await suppliersApi.list({ category: selCat, verified: verifiedOnly ? 1 : undefined, page });
        setSuppliers(data.data || data.suppliers || []);
        setTotalPages(data.last_page || 1);
      } catch {
        setSuppliers(MOCK_SUPPLIERS);
        setTotalPages(3);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selCat, verifiedOnly, page]);

  return (
    <div className="flex gap-5">
      {/* Sidebar */}
      <aside className="hidden lg:block w-52 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4 sticky top-20">
          <h3 className="font-semibold text-sm text-gray-800">Filter Suppliers</h3>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => { setVerifiedOnly(e.target.checked); pushParams({ verified: e.target.checked ? 1 : '' }); }}
              className="w-4 h-4 rounded border-gray-300 text-primary-700" />
            <span className="text-sm text-gray-700">Verified Only</span>
          </label>

          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Category</div>
            <div className="space-y-0.5 max-h-64 overflow-y-auto">
              <button onClick={() => { setSelCat(''); pushParams({ category: '' }); }}
                className={`w-full text-left text-sm px-2 py-1.5 rounded ${!selCat ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                All
              </button>
              {SRI_LANKA_CATEGORIES.map((c) => (
                <button key={c.slug} onClick={() => { setSelCat(c.slug); pushParams({ category: c.slug }); }}
                  className={`w-full text-left text-sm px-2 py-1.5 rounded flex items-center gap-1.5 ${selCat === c.slug ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {c.icon} <span className="line-clamp-1">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Grid */}
      <div className="flex-1 min-w-0">
        {loading ? <LoadingSpinner /> : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.map((s) => (
                <a key={s.id} href={`/suppliers/${s.id}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover-lift block">
                  <div className="flex items-start gap-3 mb-3">
                    <Image
                      src={s.image || `https://placehold.co/64x64/f0fdf4/155e2c?text=S`}
                      alt={s.name}
                      width={56}
                      height={56}
                      unoptimized
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">{s.name}</h3>
                        {s.verified && <BadgeCheck size={14} className="text-primary-700 flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                        <MapPin size={10} /> {s.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-0.5">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-700">{s.rating}</span>
                      <span className="text-gray-400">({s.reviews})</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Package size={11} />
                      {s.products} products
                    </div>
                    {s.since && <span>Est. {s.since}</span>}
                  </div>

                  {s.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {s.categories.slice(0, 3).map((c) => (
                        <span key={c} className="badge-pill bg-primary-50 text-primary-700">{c}</span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => pushParams({ page: String(p) })} />
          </>
        )}
      </div>
    </div>
  );
}
