'use client';

/**
 * Header.jsx — EcomLanka B2B Marketplace Header
 *
 * Features:
 *  ✅ Full-width search bar with category/type dropdown + camera icon
 *  ✅ Hover mega menus for All Categories, Supplier, Buyer, Help, Apps, Sign In
 *  ✅ Cart badge from real CartContext
 *  ✅ Auth state reflected in header
 *  ✅ Mobile hamburger drawer
 *  ✅ WAF-safe cookie auth
 */

import { cloneElement, useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Camera, ShoppingBasket, MessageSquare,
  ChevronDown, Menu, X, User, LogOut, Package, Heart,
  FileText, Settings, Globe, Shield, Phone, HelpCircle,
  Smartphone, LayoutGrid, Star, BarChart2, BadgeCheck,
  Bell, Building2,
} from 'lucide-react';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { notificationsApi } from '@/lib/api';
import { TRENDING_SEARCHES } from '@/lib/constants';
import { initials } from '@/lib/utils';
import useCategories from '@/hooks/useCategories';

const SEARCH_TYPES = ['Products', 'Suppliers', 'Companies'];

const SECONDARY_NAV = [
  { label: 'Products', href: '/products' },
  { label: 'Suppliers', href: '/suppliers' },
  { label: 'Verified Suppliers', href: '/suppliers?verified=1' },
  { label: 'Post RFQ', href: '/rfq' },
];

const EXPORT_CATEGORY_FOCUS = [
  { label: 'Ceylon Tea', keywords: ['tea', 'beverage'], summary: 'Bulk tea, private label, hotel amenity packs', fallback: '/search?q=Ceylon%20Tea' },
  { label: 'Coconut Products', keywords: ['coconut', 'coir'], summary: 'Oils, spa amenities, coir, coconut-based goods', fallback: '/search?q=Coconut%20Products' },
  { label: 'Spices & Cinnamon', keywords: ['spice', 'cinnamon', 'condiment'], summary: 'True cinnamon, pepper, cloves, spice blends', fallback: '/search?q=Spices%20Cinnamon' },
  { label: 'Apparel & Textiles', keywords: ['apparel', 'textile', 'batik', 'fabric'], summary: 'Garments, fabric, resort uniforms, batik', fallback: '/search?q=Apparel%20Textiles' },
  { label: 'Handicrafts', keywords: ['handicraft', 'gift', 'wood'], summary: 'Resort gifts, decor, handmade export goods', fallback: '/search?q=Handicrafts' },
  { label: 'Wellness & Ayurveda', keywords: ['ayurvedic', 'ayurveda', 'herbal', 'wellness'], summary: 'Spa oils, herbal products, wellness ranges', fallback: '/search?q=Ayurvedic%20Wellness' },
  { label: 'Packaging Products', keywords: ['packaging', 'box', 'carton'], summary: 'Gift boxes, retail packs, export cartons', fallback: '/search?q=Packaging%20Products' },
  { label: 'Food & Agriculture', keywords: ['food', 'agriculture', 'seafood', 'fisheries'], summary: 'Agri exports, seafood, processed foods', fallback: '/search?q=Food%20Agriculture' },
];

const MARKETPLACE_CATEGORY_GROUPS = [
  {
    label: 'Agriculture & Food',
    keywords: ['agriculture', 'food', 'seafood', 'fisheries'],
    summary: 'Tea, spices, coconut, seafood, produce and processed food exports',
    fallback: '/search?q=Agriculture%20Food',
    columns: [
      { heading: 'Sri Lankan Exports', links: ['Ceylon Tea', 'Spices & Cinnamon', 'Coconut Products', 'Processed Food'] },
      { heading: 'Fresh & Bulk Supply', links: ['Seafood', 'Fresh Produce', 'Rice & Grains', 'Organic Food'] },
      { heading: 'Buyer Services', links: ['Private Label', 'Bulk Sourcing', 'Hotel Supply', 'Food Safety'] },
    ],
    featured: ['Ceylon tea bags', 'Cinnamon sticks', 'Virgin coconut oil'],
  },
  {
    label: 'Ceylon Tea',
    keywords: ['tea', 'beverage'],
    summary: 'Bulk tea, private label tea, sachets and premium hospitality packs',
    fallback: '/search?q=Ceylon%20Tea',
    columns: [
      { heading: 'Tea Products', links: ['Black Tea', 'Green Tea', 'Tea Bags', 'Flavoured Tea'] },
      { heading: 'Packaging', links: ['Private Label Tea', 'Hotel Amenity Packs', 'Gift Tea Boxes', 'Bulk Tea'] },
      { heading: 'Trade Ready', links: ['FOB Colombo', 'Organic Tea', 'Certified Tea', 'Maldives Resort Supply'] },
    ],
    featured: ['Resort tea packs', 'Bulk Ceylon black tea', 'Private label tea'],
  },
  {
    label: 'Coconut Products',
    keywords: ['coconut', 'coir'],
    summary: 'Coconut oil, coir, wellness amenities and coconut-based foods',
    fallback: '/search?q=Coconut%20Products',
    columns: [
      { heading: 'Food & Wellness', links: ['Virgin Coconut Oil', 'Coconut Milk', 'Coconut Snacks', 'Spa Amenity Oil'] },
      { heading: 'Industrial', links: ['Coir Products', 'Coconut Shell', 'Activated Carbon', 'Coconut Fiber'] },
      { heading: 'Sourcing', links: ['Bulk Supply', 'Private Label', 'Resort Amenities', 'Export Packaging'] },
    ],
    featured: ['Coconut spa oil', 'Virgin coconut oil', 'Coir products'],
  },
  {
    label: 'Spices & Cinnamon',
    keywords: ['spice', 'cinnamon', 'condiment'],
    summary: 'True cinnamon, spices, pepper, cloves and blended condiments',
    fallback: '/search?q=Spices%20Cinnamon',
    columns: [
      { heading: 'Spices', links: ['Ceylon Cinnamon', 'Black Pepper', 'Cloves', 'Cardamom'] },
      { heading: 'Formats', links: ['Cinnamon Sticks', 'Cinnamon Powder', 'Spice Blends', 'Retail Packs'] },
      { heading: 'Certifications', links: ['Organic Spices', 'Export Grade', 'Food Service', 'Private Label'] },
    ],
    featured: ['Ceylon cinnamon sticks', 'Mixed spice packs', 'Organic pepper'],
  },
  {
    label: 'Apparel & Textiles',
    keywords: ['apparel', 'textile', 'fabric', 'batik'],
    summary: 'Garments, fabrics, uniforms, resort wear and textile sourcing',
    fallback: '/search?q=Apparel%20Textiles',
    columns: [
      { heading: 'Products', links: ['Garments', 'Fabric', 'Uniforms', 'Sportswear'] },
      { heading: 'Hospitality', links: ['Resort Wear', 'Staff Uniforms', 'Beachwear', 'Batik Fabric'] },
      { heading: 'Manufacturing', links: ['OEM Apparel', 'Bulk Orders', 'Quality Control', 'Export Packing'] },
    ],
    featured: ['Resort uniforms', 'Organic cotton fabric', 'Batik resort wear'],
  },
  {
    label: 'Packaging & Printing',
    keywords: ['packaging', 'printing', 'box', 'carton'],
    summary: 'Tea packaging, food packaging, labels, gift boxes and eco packs',
    fallback: '/search?q=Packaging%20Printing',
    columns: [
      { heading: 'Packaging', links: ['Food Packaging', 'Tea Packaging', 'Eco Packaging', 'Gift Boxes'] },
      { heading: 'Print', links: ['Labels', 'Retail Boxes', 'Cartons', 'Custom Printing'] },
      { heading: 'Trade Use', links: ['Export Cartons', 'Hotel Amenities', 'Private Label Packs', 'Sample Boxes'] },
    ],
    featured: ['Kraft tea boxes', 'Eco food packaging', 'Custom labels'],
  },
  {
    label: 'Wellness & Ayurveda',
    keywords: ['ayurvedic', 'ayurveda', 'herbal', 'wellness'],
    summary: 'Ayurvedic oils, herbal products, spa products and natural cosmetics',
    fallback: '/search?q=Wellness%20Ayurveda',
    columns: [
      { heading: 'Wellness', links: ['Ayurvedic Oils', 'Herbal Products', 'Spa Products', 'Natural Cosmetics'] },
      { heading: 'Hospitality', links: ['Resort Spa Supply', 'Amenity Bottles', 'Gift Sets', 'Private Label'] },
      { heading: 'Compliance', links: ['Ingredient Data', 'Export Documents', 'Organic Options', 'Bulk Supply'] },
    ],
    featured: ['Ayurvedic herbal oil', 'Spa amenity kits', 'Natural cosmetics'],
  },
  {
    label: 'Handicrafts',
    keywords: ['handicraft', 'gift', 'wood', 'souvenir'],
    summary: 'Handmade gifts, wooden crafts, decor, souvenirs and resort retail',
    fallback: '/search?q=Handicrafts',
    columns: [
      { heading: 'Crafts', links: ['Wooden Crafts', 'Handmade Gifts', 'Souvenirs', 'Home Decor'] },
      { heading: 'Retail', links: ['Resort Gift Shop', 'Cultural Gifts', 'Decor Items', 'Custom Designs'] },
      { heading: 'Sourcing', links: ['Small Batch', 'Bulk Gift Packs', 'Artisan Supply', 'Export Packaging'] },
    ],
    featured: ['Wooden gift boxes', 'Handmade souvenirs', 'Decor collections'],
  },
  {
    label: 'Light Industry & Daily Use',
    keywords: ['rubber', 'daily', 'industrial'],
    summary: 'Rubber goods, daily-use products, light manufacturing and supplies',
    fallback: '/search?q=Light%20Industry%20Daily%20Use',
    columns: [
      { heading: 'Daily Use', links: ['Rubber Gloves', 'Household Goods', 'Cleaning Supplies', 'Hotel Supplies'] },
      { heading: 'Industrial', links: ['Light Manufacturing', 'OEM Products', 'Maintenance Supply', 'Bulk Orders'] },
      { heading: 'Trade', links: ['FOB Supply', 'Quality Checks', 'Private Label', 'Export Packing'] },
    ],
    featured: ['Latex gloves', 'Hotel supplies', 'Daily-use goods'],
  },
  {
    label: 'Construction & Decoration',
    keywords: ['construction', 'decor', 'decoration', 'home'],
    summary: 'Building supplies, decor, furnishing and project sourcing',
    fallback: '/search?q=Construction%20Decoration',
    columns: [
      { heading: 'Construction', links: ['Building Materials', 'Tiles', 'Fixtures', 'Timber Products'] },
      { heading: 'Decoration', links: ['Home Decor', 'Resort Decor', 'Furniture', 'Lighting'] },
      { heading: 'Projects', links: ['Hotel Projects', 'Bulk Procurement', 'Supplier Matching', 'Custom Orders'] },
    ],
    featured: ['Resort decor', 'Building fixtures', 'Custom furniture'],
  },
  {
    label: 'Consumer Electronics',
    keywords: ['electronics', 'it', 'software'],
    summary: 'IT services, software, electronics and digital export services',
    fallback: '/search?q=Consumer%20Electronics%20IT',
    columns: [
      { heading: 'Electronics', links: ['Consumer Electronics', 'Accessories', 'Smart Devices', 'Components'] },
      { heading: 'IT Services', links: ['Marketplace Integration', 'ERP Services', 'Web Solutions', 'Support Services'] },
      { heading: 'Business', links: ['B2B Software', 'SaaS Services', 'Digital Trade', 'Remote Delivery'] },
    ],
    featured: ['Export ERP services', 'Marketplace integration', 'IT support'],
  },
  {
    label: 'Sporting Goods & Recreation',
    keywords: ['sport', 'recreation', 'outdoor'],
    summary: 'Sportswear, recreation goods, outdoor products and tourism supply',
    fallback: '/search?q=Sporting%20Goods%20Recreation',
    columns: [
      { heading: 'Recreation', links: ['Sportswear', 'Outdoor Goods', 'Beach Products', 'Tourism Supply'] },
      { heading: 'Hospitality', links: ['Resort Activities', 'Gift Shop Goods', 'Branded Items', 'Custom Apparel'] },
      { heading: 'Sourcing', links: ['Bulk Orders', 'Private Label', 'Supplier Matching', 'Export Packing'] },
    ],
    featured: ['Sportswear', 'Beach products', 'Tourism goods'],
  },
];

/* ── Dropdown data ───────────────────────────────── */
const SUPPLIER_MENU = {
  columns: [
    {
      heading: 'Service',
      links: [
        { label: 'Register as Supplier', href: '/register?role=supplier', icon: User },
        { label: 'Supplier Dashboard',   href: '/supplier-dashboard',           icon: BarChart2 },
        { label: 'Manage Products',      href: '/supplier-dashboard/products',  icon: Package },
        { label: 'Trade Analytics',      href: '/supplier-dashboard/analytics', icon: BarChart2 },
        { label: 'Orders & Payments',    href: '/supplier-dashboard/orders',    icon: Shield },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Supplier Guide',          href: '/guide/supplier',       icon: FileText },
        { label: 'Pricing & Membership',    href: '/pricing',              icon: Star },
        { label: 'Export Documentation',    href: '/guide/export-docs',    icon: FileText },
        { label: 'Marketing Tools',         href: '/guide/marketing',      icon: LayoutGrid },
        { label: 'Verified Supplier Badge', href: '/verified-supplier',    icon: BadgeCheck },
      ],
    },
  ],
};

const BUYER_MENU = {
  columns: [
    {
      heading: 'Service',
      links: [
        { label: 'New Buyer Guide',          href: '/guide/buyer' },
        { label: 'Buyer Dashboard',          href: '/dashboard' },
        { label: 'Verified Supplier Reports', href: '/suppliers?verified=1' },
        { label: 'Meet Suppliers',           href: '/suppliers' },
        { label: 'Secured Trading',          href: '/secured-trading' },
        { label: 'Buyer Centre',             href: '/buyer-centre' },
        { label: 'Contact Us',               href: '/contact' },
      ],
    },
    {
      heading: 'Search',
      links: [
        { label: 'Product Directory',     href: '/products' },
        { label: 'Supplier Discovery',    href: '/suppliers' },
        { label: 'Post Sourcing Request', href: '/rfq' },
      ],
    },
    {
      heading: 'Quick Links',
      links: [
        { label: 'My Favourites',    href: '/wishlist' },
        { label: 'Browsing History', href: '/history' },
      ],
    },
  ],
};

const HELP_MENU = {
  links: [
    { label: 'Why EcomLanka',           href: '/about',              icon: Shield },
    { label: 'How We Verify Suppliers', href: '/guide/verification', icon: BadgeCheck },
    { label: 'Secured Payment',         href: '/secured-trading',    icon: Shield },
    { label: 'Submit a Complaint',      href: '/complaints',         icon: HelpCircle },
    { label: 'Contact Us',              href: '/contact',            icon: Phone },
    { label: 'FAQ',                     href: '/faq',                icon: HelpCircle },
  ],
};

const LANGUAGE_OPTIONS = [
  'English','Sinhala','Tamil','Arabic','Español','Français','Deutsch','日本語',
];

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { categories, loading: categoriesLoading, error: categoriesError, retry: retryCategories } = useCategories();

  const [query, setQuery]         = useState('');
  const [searchType, setSearchType] = useState('Products');
  const [typeOpen, setTypeOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'categories'|'supplier'|'buyer'|'help'|'apps'|'user'|'lang'
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [activeMarketplaceCategory, setActiveMarketplaceCategory] = useState(MARKETPLACE_CATEGORY_GROUPS[0].label);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const closeTimerRef = useRef(null);
  const typeRef = useRef(null);
  const headerRef = useRef(null);

  const openMenu = useCallback((name) => {
    clearTimeout(closeTimerRef.current);
    setTypeOpen(false);
    setActiveMenu(name);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimerRef.current);
  }, []);

  // Close dropdowns on outside click and Escape.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setTypeOpen(false);
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setTypeOpen(false);
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    if (!isAuthenticated) {
      setUnreadNotifications(0);
      return undefined;
    }

    const loadUnread = async () => {
      try {
        const response = await notificationsApi.list({ per_page: 1 });
        if (!cancelled) {
          setUnreadNotifications(Number(response?.unread_count || 0));
        }
      } catch {
        if (!cancelled) setUnreadNotifications(0);
      }
    };

    loadUnread();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const syncUnread = (event) => {
      setUnreadNotifications(Number(event.detail?.count || 0));
    };

    window.addEventListener('notifications:unread', syncUnread);
    return () => window.removeEventListener('notifications:unread', syncUnread);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    const base = searchType === 'Suppliers' ? '/suppliers' : '/search';
    router.push(`${base}?q=${encodeURIComponent(query.trim())}`);
  };

  const handleTrendingClick = (term) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleLogout = async () => {
    setActiveMenu(null);
    setMobileOpen(false);
    await logout();
    router.replace('/');
    router.refresh();
  };

  const exportCategoryCards = EXPORT_CATEGORY_FOCUS.map((focus) => {
    const match = categories.find((category) => {
      const haystack = `${category.slug || ''} ${category.label || ''}`.toLowerCase();
      return focus.keywords.some((keyword) => haystack.includes(keyword));
    });

    return {
      ...focus,
      href: match ? `/categories/${match.slug}` : focus.fallback,
      sourceLabel: match?.label || focus.label,
    };
  });

  const marketplaceCategories = MARKETPLACE_CATEGORY_GROUPS.map((group) => {
    const match = categories.find((category) => {
      const haystack = `${category.slug || ''} ${category.label || ''}`.toLowerCase();
      return group.keywords.some((keyword) => haystack.includes(keyword));
    });

    return {
      ...group,
      href: match ? `/categories/${match.slug}` : group.fallback,
      sourceLabel: match?.label || group.label,
    };
  });
  const activeCategoryGroup = marketplaceCategories.find((category) => category.label === activeMarketplaceCategory)
    || marketplaceCategories[0];
  const hotProductKeywords = [
    'Ceylon tea',
    'Virgin coconut oil',
    'Cinnamon sticks',
    'Resort uniforms',
    'Eco packaging',
    'Ayurvedic oils',
    'Wooden gifts',
    'Rubber gloves',
  ];

  /* ── Shared hover menu wrapper ─────────────────── */
  const HoverWrapper = ({ name, children, trigger, align = 'right' }) => {
    const triggerWithClick = cloneElement(trigger, {
      type: trigger.type === 'button' ? 'button' : trigger.props.type,
      'aria-expanded': activeMenu === name,
      'aria-haspopup': 'menu',
      'data-dropdown-trigger': name,
      onClick: (event) => {
        trigger.props.onClick?.(event);
        event.preventDefault();
        event.stopPropagation();
        openMenu(name);
      },
    });

    return (
    <div
      className="relative"
      onMouseEnter={() => openMenu(name)}
      onMouseLeave={scheduleClose}
    >
      {triggerWithClick}
      {activeMenu === name && (
        <div
          className={`absolute top-full z-[70] animate-slide-up ${align === 'left' ? 'left-0' : 'right-0'}`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          role="menu"
          data-dropdown-menu={name}
        >
          {children}
        </div>
      )}
    </div>
    );
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ── Top bar ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 h-[60px] flex items-center gap-2 sm:gap-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 sm:mr-2">
            <div className="w-9 h-9 bg-primary-800 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-lg leading-none">E</span>
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-bold text-primary-800 text-[15px] leading-none tracking-tight">EcomLanka</div>
              <div className="text-gray-400 text-[10px] mt-0.5">Sri Lanka B2B Marketplace</div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex h-10 min-w-0 flex-1 items-center rounded-full border-2 border-primary-800 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-100">
            {/* Type dropdown */}
            <div ref={typeRef} className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null);
                  setTypeOpen((o) => !o);
                }}
                aria-expanded={typeOpen}
                aria-haspopup="listbox"
                data-search-type-trigger
                className="flex h-10 items-center gap-1 rounded-l-full border-r border-gray-200 bg-gray-50 px-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-800 sm:px-3"
              >
                {searchType}
                <ChevronDown size={13} className={`transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
              </button>
              {typeOpen && (
                <div data-search-type-menu className="absolute left-0 top-full z-[80] mt-2 min-w-[160px] overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-2xl">
                  {SEARCH_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { setSearchType(t); setTypeOpen(false); }}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${searchType === t ? 'bg-primary-50 font-semibold text-primary-800' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-800'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${searchType.toLowerCase()}…`}
              className="min-w-0 flex-1 bg-white px-2 text-sm text-gray-800 outline-none placeholder-gray-400 sm:px-4"
            />

            {/* Camera icon */}
            <button type="button" aria-label="Image search" className="hidden px-2 text-gray-400 transition-colors hover:text-primary-700 sm:block">
              <Camera size={17} />
            </button>

            {/* Search button */}
            <button
              type="submit"
              className="flex h-10 flex-shrink-0 items-center justify-center rounded-r-full bg-primary-800 px-3 text-white transition-colors hover:bg-primary-700 sm:px-5"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {/* Post RFQ */}
            <Link href="/rfq" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-accent-500 hover:text-accent-600 hover:bg-orange-50 rounded-lg transition-colors">
              <FileText size={19} />
              <span className="text-[10px] font-semibold whitespace-nowrap">Post RFQ</span>
            </Link>

            {/* Messages */}
            <Link href="/messages" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-gray-600 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors">
              <MessageSquare size={19} />
              <span className="text-[10px] whitespace-nowrap">Messages</span>
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <HoverWrapper
                name="notifications"
                trigger={
              <button type="button" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-gray-600 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors relative">
                    <span className="relative">
                      <Bell size={19} />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                          {unreadNotifications > 99 ? '99+' : unreadNotifications}
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] whitespace-nowrap">Alerts</span>
                  </button>
                }
              >
                <NotificationCenter compact pageSize={8} />
              </HoverWrapper>
            )}

            {/* Cart */}
            <Link href="/cart" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-gray-600 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors relative">
              <div className="relative">
                <ShoppingBasket size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] whitespace-nowrap">Inquiry Basket</span>
            </Link>

            {/* Sign In / Account — hover dropdown */}
            <HoverWrapper
              name="user"
              trigger={
                <button type="button" className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 text-gray-600 hover:text-primary-700 hover:bg-gray-50 rounded-lg transition-colors">
                  {isAuthenticated ? (
                    <div className="w-5 h-5 rounded-full bg-primary-800 text-white text-[10px] font-bold flex items-center justify-center">
                      {initials(user?.name || 'U')}
                    </div>
                  ) : (
                    <User size={19} />
                  )}
                  <span className="text-[10px] whitespace-nowrap">{isAuthenticated ? 'Account' : 'Sign In'}</span>
                </button>
              }
            >
              {isAuthenticated ? (
                <div className="w-56 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 mt-2">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <div className="font-semibold text-sm text-gray-800">{user?.name}</div>
                    <div className="text-xs text-gray-400 truncate">{user?.email}</div>
                  </div>
                  {[
                    { label: 'Buyer Dashboard', href: '/dashboard', icon: BarChart2 },
                    { label: 'Supplier Dashboard', href: '/supplier-dashboard', icon: Building2 },
                    { label: 'My Orders', href: '/orders', icon: Package },
                    { label: 'Wishlist', href: '/wishlist', icon: Heart },
                    { label: 'My RFQs', href: '/rfq', icon: FileText },
                    { label: 'Settings', href: '/settings', icon: Settings },
                  ].map(({ label, href, icon: Icon }) => (
                    <Link key={href} href={href} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-800">
                      <Icon size={14} className="text-gray-400" />{label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={14} />Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                /* Sign-In panel — like the screenshots */
                <div className="w-72 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 mt-2">
                  <Link
                    href="/login"
                    className="block w-full py-2.5 bg-primary-800 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg text-center mb-3 transition-colors"
                  >
                    Sign In
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="flex gap-2 mb-4">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <span className="text-base">G</span> Google
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <span className="text-base">f</span> Facebook
                    </button>
                  </div>
                  <div className="border-t border-gray-100 pt-3 space-y-1">
                    {[
                      { label: 'Buyer Dashboard', href: '/dashboard' },
                      { label: 'Messages', href: '/messages' },
                      { label: 'Orders', href: '/orders' },
                      { label: 'Favourites', href: '/wishlist' },
                      { label: 'Supplier Dashboard', href: '/supplier-dashboard' },
                      { label: 'Post Sourcing Request', href: '/rfq' },
                    ].map(({ label, href }) => (
                      <Link key={label} href={href} className="block py-1.5 text-sm text-gray-600 hover:text-primary-800">
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                    <span className="text-xs text-gray-400">New here? </span>
                    <Link href="/register" className="text-xs text-primary-700 font-semibold hover:underline">Register Free</Link>
                  </div>
                </div>
              )}
            </HoverWrapper>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Trending searches */}
        <div className="max-w-screen-xl mx-auto px-4 pb-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs text-gray-400 flex-shrink-0 font-medium">Trending:</span>
          {TRENDING_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleTrendingClick(term)}
              className="flex-shrink-0 text-xs text-gray-500 hover:text-primary-700 hover:underline bg-gray-50 hover:bg-primary-50 px-2.5 py-0.5 rounded-full transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* ── Secondary / mega-menu nav ──────────────────────────── */}
      <div className="bg-primary-800 text-white relative">
        <div className="max-w-screen-xl mx-auto px-4 h-9 flex items-center gap-0.5 overflow-visible">

          {/* All Categories — mega dropdown */}
          <HoverWrapper
            name="categories"
            align="left"
            trigger={
              <button type="button" className="flex items-center gap-1.5 px-3 h-9 text-sm font-medium text-white hover:bg-primary-700 whitespace-nowrap transition-colors">
                <Menu size={14} />
                All Categories
                <ChevronDown size={12} className={`transition-transform ${activeMenu === 'categories' ? 'rotate-180' : ''}`} />
              </button>
            }
          >
            <div className="mt-0 w-[1040px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-b-xl border border-gray-200 bg-white text-gray-800 shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-primary-100 bg-primary-50 px-5 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Marketplace Category Navigation</p>
                  <p className="mt-1 text-sm text-gray-600">Browse Sri Lankan export sectors, subcategories, and RFQ-ready product keywords.</p>
                </div>
                <Link
                  href="/products"
                  onClick={() => setActiveMenu(null)}
                  className="hidden flex-shrink-0 rounded-lg bg-primary-800 px-3 py-2 text-xs font-semibold text-white hover:bg-primary-700 sm:block"
                >
                  Browse products
                </Link>
              </div>

              <div className="grid min-h-[360px] grid-cols-[240px_minmax(0,1fr)]">
                <aside className="border-r border-gray-100 bg-gray-50/80 p-2">
                  <div className="mb-1 px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">Categories</div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {marketplaceCategories.map((cat) => {
                      const selected = activeCategoryGroup?.label === cat.label;
                      return (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          onMouseEnter={() => setActiveMarketplaceCategory(cat.label)}
                          onFocus={() => setActiveMarketplaceCategory(cat.label)}
                          onClick={() => setActiveMenu(null)}
                          className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            selected
                              ? 'bg-white font-semibold text-primary-800 shadow-sm'
                              : 'text-gray-700 hover:bg-white hover:text-primary-800'
                          }`}
                        >
                          <span className="min-w-0 truncate">{cat.sourceLabel}</span>
                          <ChevronDown size={13} className="-rotate-90 flex-shrink-0 text-gray-300 group-hover:text-primary-600" />
                        </Link>
                      );
                    })}
                  </div>
                  {categoriesLoading && <span className="block px-3 py-2 text-xs text-gray-400">Loading backend categories...</span>}
                  {categoriesError && (
                    <button type="button" onClick={retryCategories} className="px-3 py-2 text-left text-xs text-red-600 hover:underline">
                      Retry categories
                    </button>
                  )}
                </aside>

                <div className="flex min-w-0 flex-col">
                  <div className="grid flex-1 grid-cols-3 gap-5 p-5">
                    {activeCategoryGroup.columns.map((column) => (
                      <div key={column.heading} className="min-w-0">
                        <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">{column.heading}</div>
                        <div className="space-y-1">
                          {column.links.map((label) => (
                            <Link
                              key={label}
                              href={`/search?q=${encodeURIComponent(label)}`}
                              onClick={() => setActiveMenu(null)}
                              className="block rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800"
                            >
                              {label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                    <div className="grid grid-cols-3 gap-3">
                      {activeCategoryGroup.featured.map((label) => (
                        <Link
                          key={label}
                          href={`/search?q=${encodeURIComponent(label)}`}
                          onClick={() => setActiveMenu(null)}
                          className="rounded-lg border border-gray-100 bg-white p-3 text-sm font-semibold text-gray-800 shadow-sm hover:border-primary-200 hover:text-primary-800"
                        >
                          <span className="block text-[10px] font-bold uppercase tracking-wide text-primary-600">Featured sourcing</span>
                          <span className="mt-1 block truncate">{label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Hot products:</span>
                      {hotProductKeywords.map((keyword) => (
                        <Link
                          key={keyword}
                          href={`/search?q=${encodeURIComponent(keyword)}`}
                          onClick={() => setActiveMenu(null)}
                          className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-600 hover:bg-primary-50 hover:text-primary-800"
                        >
                          {keyword}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HoverWrapper>

          <div className="h-4 w-px bg-primary-600 mx-1" />

          {/* Secondary nav links */}
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden lg:flex items-center px-3 h-9 text-sm text-primary-100 hover:text-white hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}

          {/* Right side menus */}
          <div className="ml-auto hidden xl:flex items-center">
            {/* Supplier dropdown */}
            <HoverWrapper
              name="supplier"
              trigger={
                <button type="button" className="hidden md:flex items-center gap-0.5 px-3 h-9 text-sm text-primary-100 hover:text-white hover:bg-primary-700 transition-colors">
                  Supplier <ChevronDown size={11} className={`transition-transform ${activeMenu === 'supplier' ? 'rotate-180' : ''}`} />
                </button>
              }
            >
              <div className="mt-1 w-[420px] overflow-hidden rounded-xl border border-gray-200 bg-white py-3 shadow-2xl">
                <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100">
                  {SUPPLIER_MENU.columns.map((col) => (
                    <div key={col.heading} className="px-4 py-1">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{col.heading}</div>
                      {col.links.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href} onClick={() => setActiveMenu(null)} className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800">
                          {Icon && <Icon size={13} className="text-gray-400 group-hover:text-primary-600" />}
                          {label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </HoverWrapper>

            {/* Buyer dropdown */}
            <HoverWrapper
              name="buyer"
              trigger={
                <button type="button" className="hidden md:flex items-center gap-0.5 px-3 h-9 text-sm text-primary-100 hover:text-white hover:bg-primary-700 transition-colors">
                  Buyer <ChevronDown size={11} className={`transition-transform ${activeMenu === 'buyer' ? 'rotate-180' : ''}`} />
                </button>
              }
            >
              <div className="mt-1 w-[540px] overflow-hidden rounded-xl border border-gray-200 bg-white py-3 shadow-2xl">
                <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
                  {BUYER_MENU.columns.map((col) => (
                    <div key={col.heading} className="px-4 py-1">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{col.heading}</div>
                      {col.links.map(({ label, href }) => (
                        <Link key={`${href}-${label}`} href={href} onClick={() => setActiveMenu(null)} className="block rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800">
                          {label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </HoverWrapper>

            {/* Help dropdown */}
            <HoverWrapper
              name="help"
              trigger={
                <button type="button" className="hidden md:flex items-center gap-0.5 px-3 h-9 text-sm text-primary-100 hover:text-white hover:bg-primary-700 transition-colors">
                  Help <ChevronDown size={11} className={`transition-transform ${activeMenu === 'help' ? 'rotate-180' : ''}`} />
                </button>
              }
            >
              <div className="mt-1 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-2xl">
                {HELP_MENU.links.map(({ label, href, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setActiveMenu(null)} className="group mx-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800">
                    {Icon && <Icon size={14} className="text-gray-400 group-hover:text-primary-600" />}
                    {label}
                  </Link>
                ))}
              </div>
            </HoverWrapper>

            {/* Apps dropdown */}
            <HoverWrapper
              name="apps"
              trigger={
                <button type="button" className="hidden md:flex items-center gap-0.5 px-3 h-9 text-sm text-primary-100 hover:text-white hover:bg-primary-700 transition-colors">
                  Apps <ChevronDown size={11} />
                </button>
              }
            >
              <div className="mt-1 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-3 shadow-2xl">
                <div className="px-4 mb-2">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Download App</div>
                </div>
                {[
                  { label: 'iOS App',     sub: 'App Store',    icon: '🍎', href: '/apps' },
                  { label: 'Android App', sub: 'Google Play',  icon: '▶',  href: '/apps' },
                ].map(({ label, sub, icon, href }) => (
                  <Link key={label} href={href} onClick={() => setActiveMenu(null)} className="group mx-1 flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary-50">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-lg">{icon}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{label}</div>
                      <div className="text-xs text-gray-400">{sub}</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-100 px-4">
                  <Link href="/apps" onClick={() => setActiveMenu(null)} className="text-xs text-primary-700 hover:underline">View all apps →</Link>
                </div>
              </div>
            </HoverWrapper>

            {/* Language */}
            <HoverWrapper
              name="lang"
              trigger={
                <button type="button" className="hidden md:flex items-center gap-1 px-3 h-9 text-sm text-primary-100 hover:text-white hover:bg-primary-700 transition-colors">
                  <Globe size={13} /> EN <ChevronDown size={11} />
                </button>
              }
            >
              <div className="mt-1 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-2xl">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button key={lang} type="button" onClick={() => setActiveMenu(null)} className="mx-1 block w-[calc(100%-0.5rem)] rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800">
                    {lang}
                  </button>
                ))}
              </div>
            </HoverWrapper>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            {/* Auth links */}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 bg-primary-50 rounded-lg mb-3">
                  <div className="font-semibold text-sm text-primary-800">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.email}</div>
                </div>
                {[
                  { label: 'Buyer Dashboard', href: '/dashboard' },
                  { label: 'Supplier Dashboard', href: '/supplier-dashboard' },
                  { label: 'Notifications', href: '/notifications' },
                  { label: 'My Orders', href: '/orders' },
                  { label: 'Wishlist',  href: '/wishlist' },
                  { label: 'My RFQs',  href: '/rfq' },
                  { label: 'Settings', href: '/settings' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    {label}
                  </Link>
                ))}
                <button onClick={handleLogout} className="block w-full text-left py-2.5 px-3 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 mb-3">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-lg text-center">Sign In</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 py-2.5 border border-primary-800 text-primary-800 text-sm font-semibold rounded-lg text-center">Register</Link>
              </div>
            )}

            {/* Quick links */}
            <div className="flex gap-2 py-2">
              <Link href="/rfq" onClick={() => setMobileOpen(false)} className="flex-1 py-2 text-center text-xs font-medium text-accent-600 bg-orange-50 rounded-lg border border-accent-200">Post RFQ</Link>
              <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex-1 py-2 text-center text-xs font-medium text-primary-700 bg-primary-50 rounded-lg border border-primary-200">
                Basket {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>

            {/* All Categories */}
            <div className="border-t border-gray-100 pt-3">
              <button
                onClick={() => setMobileCatOpen((o) => !o)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                All Categories
                <ChevronDown size={14} className={`transition-transform ${mobileCatOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCatOpen && (
                <div className="grid grid-cols-1 gap-1 mt-2 px-1 sm:grid-cols-2">
                  {exportCategoryCards.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex flex-col gap-0.5 px-3 py-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg"
                    >
                      <span className="text-xs font-semibold line-clamp-1">{cat.sourceLabel}</span>
                      <span className="text-[11px] leading-4 text-gray-400 line-clamp-1">{cat.summary}</span>
                    </Link>
                  ))}
                  {categoriesLoading && <span className="px-3 py-2 text-xs text-gray-400">Loading categories…</span>}
                  {categoriesError && (
                    <button type="button" onClick={retryCategories} className="px-3 py-2 text-xs text-red-600 hover:underline">
                      Retry categories
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Other nav items */}
            {[...SECONDARY_NAV, { label: 'Secured Trading', href: '/secured-trading' }, { label: 'Contact Us', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border-t border-gray-50">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
