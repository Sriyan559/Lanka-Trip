'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BadgeCheck, MapPin, Star, Package, Clock, Users, Calendar,
  ShieldCheck, MessageSquare, Send, Heart, ChevronLeft, Phone,
  Mail, Globe2, CheckCircle2, Award,
} from 'lucide-react';
import { suppliersApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { starRating } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProductCard from '@/components/product/ProductCard';
import toast from 'react-hot-toast';

const TABS = ['Products', 'Company Profile', 'Certificates', 'Contact Supplier'];

// ── Mock fallback (used until the Laravel /suppliers/:id endpoint is live) ──
function buildMockSupplier(id) {
  return {
    id,
    name: 'Lanka Tea Exports (Pvt) Ltd.',
    coverImage: 'https://placehold.co/1200x260/155e2c/ffffff?text=Lanka+Tea+Exports',
    logo: 'https://placehold.co/120x120/e8f5e9/155e2c?text=LTE',
    location: 'Colombo, Sri Lanka',
    country: 'Sri Lanka',
    verified: true,
    rating: 4.9,
    reviews: 432,
    productsCount: 38,
    since: 2012,
    responseRate: '96%',
    responseTime: '< 4 hours',
    businessType: 'Manufacturer / Exporter',
    mainProducts: 'Ceylon Black Tea, Green Tea, Herbal Infusions',
    mainMarkets: 'Middle East, Europe, North America, East Asia',
    totalEmployees: '51–100',
    annualRevenue: 'US$5M – US$10M',
    description:
      `Lanka Tea Exports (Pvt) Ltd. has been sourcing and exporting premium Ceylon tea since 2012, working directly with estates across Nuwara Eliya, Uva, and Dimbula. We specialise in BOPF, FBOP, and OP1 grades, with full traceability from estate to export pack.\n\nOur facility is ISO 22000 and HACCP certified, and we support private-label packaging, custom blends, and small-batch sampling for new buyers.`,
    certifications: [
      { label: 'ISO 22000:2018', icon: '📋' },
      { label: 'HACCP Certified', icon: '✅' },
      { label: 'Rainforest Alliance', icon: '🌳' },
      { label: 'Fair Trade Certified', icon: '🤝' },
      { label: 'SLTB Registered Exporter', icon: '🏛️' },
      { label: 'Organic (EU/USDA)', icon: '🌿' },
    ],
    contact: {
      email: 'sales@lankatea-exports.lk',
      phone: '+94 11 234 5678',
      whatsapp: '+94 77 123 4567',
      website: 'www.lankatea-exports.lk',
      address: 'No. 24, Export Processing Zone, Colombo 14, Sri Lanka',
    },
  };
}

function buildMockProducts(supplierName) {
  const names = [
    'Premium BOPF Black Tea 500g', 'FBOP Ceylon Tea 250g', 'OP1 Long Leaf Tea 1kg',
    'Organic Green Tea 200g', 'White Tea Pearl 100g', 'Earl Grey Ceylon Blend',
    'Herbal Chamomile Infusion', 'Cinnamon Spiced Tea',
  ];
  return names.map((name, i) => ({
    id: 100 + i,
    name,
    price: [12, 9, 22, 18, 28, 14, 11, 13][i],
    moqUnit: 'Kg',
    minOrder: [50, 25, 100, 30, 10, 40, 35, 30][i],
    rating: [4.8, 4.5, 4.9, 4.6, 4.7, 4.4, 4.6, 4.3][i],
    reviews: [234, 89, 156, 78, 45, 102, 67, 54][i],
    verified: true,
    supplier: supplierName,
    image: `https://placehold.co/240x240/e8f5e9/155e2c?text=${encodeURIComponent(name.split(' ')[0])}`,
  }));
}

export default function SupplierProfileContent({ id }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('Products');
  const [saved, setSaved] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await suppliersApi.get(id);
        setSupplier(data);
        const prodData = await suppliersApi.products(id, {});
        setProducts(prodData.data || prodData.products || []);
      } catch {
        const mock = buildMockSupplier(id);
        setSupplier(mock);
        setProducts(buildMockProducts(mock.name));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to message this supplier.');
      router.push(`/login?redirect=/suppliers/${id}`);
      return;
    }
    setSending(true);
    // Wired for the Laravel inbox endpoint once available — see lib/api.js userApi.messages
    setTimeout(() => {
      setSending(false);
      toast.success('Message sent to supplier!');
      setContactForm({ name: '', email: '', message: '' });
    }, 600);
  };

  if (loading) return <LoadingSpinner label="Loading supplier profile…" />;
  if (!supplier) return <div className="py-20 text-center text-gray-400">Supplier not found.</div>;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4 flex items-center gap-1.5">
        <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-primary-700">
          <ChevronLeft size={14} /> Back
        </button>
        <span>/</span>
        <Link href="/suppliers" className="hover:text-primary-700">Suppliers</Link>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{supplier.name}</span>
      </div>

      {/* Cover + identity card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="h-32 sm:h-44 w-full relative bg-primary-800">
          <Image src={supplier.coverImage} alt="" fill unoptimized className="object-cover opacity-90" />
        </div>
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-end -mt-10 sm:-mt-12">
          <Image
            src={supplier.logo}
            alt={supplier.name}
            width={88}
            height={88}
            unoptimized
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-md object-cover bg-white flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">{supplier.name}</h1>
              {supplier.verified && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-700 font-medium px-2 py-0.5 rounded-full">
                  <BadgeCheck size={12} /> Verified Supplier
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={13} /> {supplier.location}</span>
              <span className="flex items-center gap-1"><Calendar size={13} /> Est. {supplier.since}</span>
              <span className="flex items-center gap-1">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {supplier.rating} ({supplier.reviews?.toLocaleString()} reviews)
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => { setSaved((s) => !s); toast.success(saved ? 'Removed from saved suppliers' : 'Supplier saved'); }}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium border flex items-center gap-1.5 transition-colors ${
                saved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart size={15} className={saved ? 'fill-rose-500' : ''} /> {saved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => setTab('Contact Supplier')}
              className="px-4 py-2.5 bg-primary-800 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare size={15} /> Contact Supplier
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar: quick facts ── */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
            <h3 className="font-semibold text-sm text-gray-800 mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary-700" /> Supplier Quick Facts
            </h3>
            <dl className="space-y-3 text-sm">
              {[
                { label: 'Business Type', value: supplier.businessType, icon: Package },
                { label: 'Main Products', value: supplier.mainProducts, icon: Award },
                { label: 'Main Markets', value: supplier.mainMarkets, icon: Globe2 },
                { label: 'Employees', value: supplier.totalEmployees, icon: Users },
                { label: 'Response Rate', value: supplier.responseRate, icon: CheckCircle2 },
                { label: 'Response Time', value: supplier.responseTime, icon: Clock },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <dt className="text-xs text-gray-400">{label}</dt>
                    <dd className="text-gray-700 font-medium leading-snug">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Link
              href={`/rfq?product=${encodeURIComponent(supplier.mainProducts?.split(',')[0] || '')}`}
              className="mt-5 block w-full py-2.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold text-center rounded-xl transition-colors"
            >
              <span className="inline-flex items-center gap-1.5"><Send size={14} /> Request a Quote</span>
            </Link>
          </div>
        </aside>

        {/* ── Main: tabs ── */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    tab === t ? 'border-primary-700 text-primary-800 bg-primary-50' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6">
              {/* Products */}
              {tab === 'Products' && (
                products.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">No products listed yet.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {products.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                )
              )}

              {/* Company Profile */}
              {tab === 'Company Profile' && (
                <div className="space-y-5">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{supplier.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      ['Business Type', supplier.businessType],
                      ['Year Established', supplier.since],
                      ['Main Markets', supplier.mainMarkets],
                      ['Total Employees', supplier.totalEmployees],
                      ['Annual Revenue', supplier.annualRevenue],
                      ['Main Products', supplier.mainProducts],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between border-b border-gray-50 py-2 text-sm">
                        <span className="text-gray-400">{label}</span>
                        <span className="text-gray-800 font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {tab === 'Certificates' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(supplier.certifications || []).map((c) => (
                    <div key={c.label} className="border border-gray-100 rounded-xl p-4 text-center hover-lift">
                      <div className="text-3xl mb-2">{c.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{c.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Supplier */}
              {tab === 'Contact Supplier' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <h3 className="font-semibold text-gray-800 mb-1">Send a message</h3>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Your Name</label>
                      <input required value={contactForm.name} onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Your Email</label>
                      <input required type="email" value={contactForm.email} onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
                      <textarea required rows={4} value={contactForm.message} onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder={`Hi, I'm interested in sourcing ${supplier.mainProducts?.split(',')[0] || 'your products'}…`}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 resize-none" />
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full py-2.5 bg-primary-800 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl disabled:opacity-60 flex items-center justify-center gap-2">
                      {sending ? 'Sending…' : <><Send size={14} /> Send Message</>}
                    </button>
                  </form>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800 mb-1">Direct contact details</h3>
                    {[
                      { icon: Mail, label: supplier.contact?.email },
                      { icon: Phone, label: supplier.contact?.phone },
                      { icon: MessageSquare, label: `WhatsApp: ${supplier.contact?.whatsapp}` },
                      { icon: Globe2, label: supplier.contact?.website },
                      { icon: MapPin, label: supplier.contact?.address },
                    ].filter((row) => row.label).map((row, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        <row.icon size={15} className="text-primary-700 mt-0.5 flex-shrink-0" />
                        <span>{row.label}</span>
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 pt-1">
                      For pricing and samples, we recommend using <Link href="/rfq" className="text-primary-700 hover:underline">Post an RFQ</Link> so multiple suppliers can compete for your order.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
