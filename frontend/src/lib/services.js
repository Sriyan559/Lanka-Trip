/**
 * services.js — Centralized service functions that wrap the API layer.
 *
 * Each function tries the Laravel backend first and falls back to local
 * mock data while the API is being built. Swap mock returns for real
 * API calls by updating the try block only.
 *
 * Laravel endpoint mapping is documented per function.
 */

import { api, productsApi, categoriesApi, ordersApi } from './api';

// ─────────────────────────────────────────────────────────────────────────────
// Types (JSDoc)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} NavMenu
 * @property {string} label
 * @property {string} [href]
 * @property {{ heading: string, links: { label: string, href: string }[] }[]} [columns]
 */

/**
 * @typedef {Object} HomeSection
 * @property {string} id
 * @property {string} title
 * @property {'category_grid'|'trending'|'featured'} type
 * @property {Object[]} items
 */

// ─────────────────────────────────────────────────────────────────────────────
// Navbar menus
// ─────────────────────────────────────────────────────────────────────────────

/** GET /api/nav/menus — returns structured navbar menu data */
export async function getNavbarMenus() {
  try {
    const data = await api.get('/nav/menus');
    return data;
  } catch {
    return MOCK_NAV_MENUS;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Home page
// ─────────────────────────────────────────────────────────────────────────────

/** GET /api/home/sections — returns all dynamic homepage sections in order */
export async function getHomeSections() {
  try {
    const data = await api.get('/home/sections');
    return data.sections || data;
  } catch {
    return MOCK_HOME_SECTIONS;
  }
}

/** GET /api/products/trending — returns trending product/category tiles */
export async function getTrendingProducts() {
  try {
    const data = await productsApi.trending();
    return data.data || data.products || [];
  } catch {
    return MOCK_TRENDING;
  }
}

/** GET /api/home/recommendations — personalised "You May Like" items */
export async function getRecommendations() {
  try {
    return await api.get('/home/recommendations');
  } catch {
    return MOCK_RECOMMENDATIONS;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Products & categories
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/categories/{slug}/products
 * Returns paginated products for a category slug.
 * @param {string} slug
 * @param {Object} [params]
 */
export async function getCategoryProducts(slug, params = {}) {
  try {
    const data = await productsApi.byCategory(slug, params);
    return data;
  } catch {
    return { data: MOCK_B2B_PRODUCTS.slice(0, 12), total: 12, last_page: 1 };
  }
}

/**
 * GET /api/products/{id}
 * Returns full product detail.
 * @param {string|number} id
 */
export async function getProductDetails(id) {
  try {
    return await productsApi.get(id);
  } catch {
    return null;
  }
}

/**
 * GET /api/products?search=...&category=...&sort=...
 * Returns paginated filtered products.
 * @param {Object} params
 */
export async function searchProducts(params = {}) {
  try {
    const data = await productsApi.list(params);
    return data;
  } catch {
    return { data: MOCK_B2B_PRODUCTS, total: MOCK_B2B_PRODUCTS.length, last_page: 2 };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────────────────────────────────────

/** POST /api/orders — creates an order from an accepted quotation. */
export async function createOrder(quotationId) {
  return await ordersApi.create(quotationId);
}

/**
 * GET /api/orders/{id}
 * Returns a single order by ID.
 * @param {string|number} id
 */
export async function getOrder(id) {
  return await ordersApi.get(id);
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data (used as fallback while Laravel API is being built)
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_NAV_MENUS = {
  supplier: {
    columns: [
      {
        heading: 'Service',
        links: [
          { label: 'Register as Supplier', href: '/register?role=supplier' },
          { label: 'Supplier Dashboard',   href: '/dashboard' },
          { label: 'Manage Products',      href: '/dashboard?tab=products' },
          { label: 'Trade Analytics',      href: '/dashboard?tab=analytics' },
          { label: 'Payment & Invoices',   href: '/dashboard?tab=payments' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Supplier Guide',         href: '/guide/supplier' },
          { label: 'Pricing & Membership',   href: '/pricing' },
          { label: 'Export Documentation',   href: '/guide/export-docs' },
          { label: 'Marketing Tools',        href: '/guide/marketing' },
          { label: 'Verified Supplier Badge',href: '/verified-supplier' },
        ],
      },
    ],
  },
  buyer: {
    columns: [
      {
        heading: 'Service',
        links: [
          { label: 'New Buyer Guide',         href: '/guide/buyer' },
          { label: 'Audited Supplier Reports',href: '/suppliers?audited=1' },
          { label: 'Meet Suppliers',          href: '/suppliers' },
          { label: 'Secured Trading Service', href: '/secured-trading' },
          { label: 'Buyer Centre',            href: '/buyer-centre' },
          { label: 'Contact Us',              href: '/contact' },
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
  },
  help: {
    links: [
      { label: 'Why EcomLanka',           href: '/about' },
      { label: 'How We Verify Suppliers', href: '/guide/verification' },
      { label: 'Secured Payment',         href: '/secured-trading' },
      { label: 'Submit a Complaint',      href: '/complaints' },
      { label: 'Contact Us',              href: '/contact' },
      { label: 'FAQ',                     href: '/faq' },
    ],
  },
  apps: {
    items: [
      { label: 'iOS App',     icon: '🍎', href: '#', sub: 'App Store' },
      { label: 'Android App', icon: '▶',  href: '#', sub: 'Google Play' },
    ],
  },
};

export const MOCK_HOME_SECTIONS = [
  {
    id: 'agricultural',
    type: 'category_grid',
    title: 'Agricultural & Natural Exports',
    promoTitle: 'Agricultural & Natural Exports',
    promoSubtitle: 'Ceylon Tea · Spices · Coconut · Cinnamon',
    promoBg: 'linear-gradient(135deg, #155e2c 0%, #14532d 100%)',
    promoHref: '/categories/food-agriculture',
    promoButtonLabel: 'Source Now',
    items: [
      { slug: 'ceylon-tea',       label: 'Ceylon Tea',       image: 'https://placehold.co/130x120/e8f5e9/155e2c?text=Tea' },
      { slug: 'cinnamon',         label: 'Cinnamon',         image: 'https://placehold.co/130x120/fbe9e7/bf360c?text=Cinnamon' },
      { slug: 'black-pepper',     label: 'Black Pepper',     image: 'https://placehold.co/130x120/263238/ffffff?text=Pepper' },
      { slug: 'turmeric',         label: 'Turmeric',         image: 'https://placehold.co/130x120/fff8e1/f57f17?text=Turmeric' },
      { slug: 'coconut-products', label: 'Coconut Products', image: 'https://placehold.co/130x120/fff9c4/f57f17?text=Coconut' },
      { slug: 'cashew-nuts',      label: 'Cashew Nuts',      image: 'https://placehold.co/130x120/fff3e0/e65100?text=Cashew' },
      { slug: 'cardamom',         label: 'Cardamom',         image: 'https://placehold.co/130x120/e8f5e9/2e7d32?text=Cardamom' },
      { slug: 'cloves',           label: 'Cloves',           image: 'https://placehold.co/130x120/efebe9/4e342e?text=Cloves' },
    ],
  },
  {
    id: 'gems-crafts',
    type: 'category_grid',
    title: 'Gems, Jewellery & Handicrafts',
    promoTitle: 'Gems, Jewellery & Handicrafts',
    promoSubtitle: 'Sapphires · Rubies · Batik · Masks',
    promoBg: 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
    promoHref: '/categories/gems-jewelry',
    promoButtonLabel: 'Source Now',
    items: [
      { slug: 'blue-sapphire',  label: 'Blue Sapphire',  image: 'https://placehold.co/130x120/e8eaf6/1a237e?text=Sapphire' },
      { slug: 'ruby',           label: 'Ruby & Gems',    image: 'https://placehold.co/130x120/fce4ec/880e4f?text=Ruby' },
      { slug: 'batik-fabric',   label: 'Batik Fabric',   image: 'https://placehold.co/130x120/f3e5f5/4a148c?text=Batik' },
      { slug: 'wooden-masks',   label: 'Wooden Masks',   image: 'https://placehold.co/130x120/fff3e0/bf360c?text=Masks' },
      { slug: 'brass-craft',    label: 'Brass Crafts',   image: 'https://placehold.co/130x120/fff8e1/f9a825?text=Brass' },
      { slug: 'handloom',       label: 'Handloom Silk',  image: 'https://placehold.co/130x120/fce4ec/c62828?text=Silk' },
      { slug: 'lacquerware',    label: 'Lacquerware',    image: 'https://placehold.co/130x120/e8f5e9/1b5e20?text=Lacquer' },
      { slug: 'silver-jewelry', label: 'Silver Jewellery',image: 'https://placehold.co/130x120/eceff1/546e7a?text=Silver' },
    ],
  },
];

export const MOCK_TRENDING = [
  { slug: 'ceylon-tea',       label: 'Ceylon Tea',          image: 'https://placehold.co/120x120/e8f5e9/155e2c?text=Tea' },
  { slug: 'coconut-products', label: 'Coconut Products',    image: 'https://placehold.co/120x120/fff9c4/f57f17?text=Coconut' },
  { slug: 'rubber-products',  label: 'Rubber & Latex',      image: 'https://placehold.co/120x120/f3e5f5/4a148c?text=Rubber' },
  { slug: 'gems-sapphire',    label: 'Gems & Sapphires',    image: 'https://placehold.co/120x120/e8eaf6/1a237e?text=Gems' },
  { slug: 'cinnamon',         label: 'Cinnamon & Spices',   image: 'https://placehold.co/120x120/fbe9e7/bf360c?text=Spices' },
  { slug: 'ayurvedic',        label: 'Ayurvedic Herbs',     image: 'https://placehold.co/120x120/e8f5e9/2e7d32?text=Herbs' },
  { slug: 'batik-fabric',     label: 'Batik & Textiles',    image: 'https://placehold.co/120x120/fce4ec/880e4f?text=Batik' },
  { slug: 'seafood',          label: 'Seafood & Fisheries', image: 'https://placehold.co/120x120/e1f5fe/01579b?text=Seafood' },
  { slug: 'ceramics',         label: 'Ceramics & Pottery',  image: 'https://placehold.co/120x120/fafafa/616161?text=Ceramics' },
  { slug: 'wood-furniture',   label: 'Wood & Furniture',    image: 'https://placehold.co/120x120/fff3e0/e65100?text=Wood' },
  { slug: 'handicrafts',      label: 'Handicrafts',         image: 'https://placehold.co/120x120/f9fbe7/558b2f?text=Crafts' },
  { slug: 'essential-oils',   label: 'Essential Oils',      image: 'https://placehold.co/120x120/ede7f6/4527a0?text=Oils' },
];

export const MOCK_RECOMMENDATIONS = [
  { label: 'Ceylon Tea',    count: '12,000+', image: 'https://placehold.co/60x60/e8f5e9/155e2c?text=Tea',     slug: 'ceylon-tea' },
  { label: 'Blue Sapphire', count: '3,200+',  image: 'https://placehold.co/60x60/e8eaf6/1a237e?text=Gem',     slug: 'gems-sapphire' },
  { label: 'Cinnamon',      count: '5,500+',  image: 'https://placehold.co/60x60/fbe9e7/bf360c?text=Spice',   slug: 'cinnamon' },
  { label: 'Rubber Gloves', count: '8,100+',  image: 'https://placehold.co/60x60/f3e5f5/4a148c?text=Rubber',  slug: 'rubber-products' },
  { label: 'Coconut Oil',   count: '4,700+',  image: 'https://placehold.co/60x60/fff9c4/f57f17?text=Coconut', slug: 'coconut-products' },
  { label: 'Batik Fabric',  count: '2,900+',  image: 'https://placehold.co/60x60/fce4ec/880e4f?text=Batik',   slug: 'batik-fabric' },
];

/** B2B-style product cards with price ranges, supplier badges, MOQ */
export const MOCK_B2B_PRODUCTS = [
  {
    id: 1,  slug: 'ceylon-bopf-tea',
    name: 'Ceylon BOPF Black Tea — Export Grade 25kg Bag',
    priceMin: 1.20, priceMax: 2.40, unit: 'Kg',
    minOrder: 500, moqUnit: 'Kg',
    rating: 4.8, reviews: 234,
    supplier: 'Lanka Tea Exports (Pvt) Ltd.',
    supplierLocation: 'Colombo, Sri Lanka',
    badges: ['OEM/ODM', 'ISO 22000', 'Rainforest Alliance'],
    audited: true, securedTrading: true, sampleAvailable: true,
    image: 'https://placehold.co/280x280/e8f5e9/155e2c?text=Ceylon+Tea',
    category: 'tea-beverages',
  },
  {
    id: 2,  slug: 'blue-sapphire-cert',
    name: 'Ceylon Blue Sapphire — GIA Certified Natural Gemstone',
    priceMin: 120, priceMax: 950, unit: 'Carat',
    minOrder: 1, moqUnit: 'Carat',
    rating: 4.9, reviews: 78,
    supplier: 'Ceylon Gems & Jewels Co.',
    supplierLocation: 'Ratnapura, Sri Lanka',
    badges: ['GIA Cert', 'Audited'],
    audited: true, securedTrading: true, sampleAvailable: false,
    image: 'https://placehold.co/280x280/e8eaf6/1a237e?text=Sapphire',
    category: 'gems-jewelry',
  },
  {
    id: 3,  slug: 'cinnamon-ceylon-organic',
    name: 'True Ceylon Cinnamon Sticks — Organic Certified 1kg Pack',
    priceMin: 3.50, priceMax: 7.20, unit: 'Kg',
    minOrder: 100, moqUnit: 'Kg',
    rating: 4.9, reviews: 412,
    supplier: 'Spice Garden Exports Ltd.',
    supplierLocation: 'Galle, Sri Lanka',
    badges: ['Organic', 'OEM/ODM', 'Sample Order'],
    audited: true, securedTrading: false, sampleAvailable: true,
    image: 'https://placehold.co/280x280/fbe9e7/bf360c?text=Cinnamon',
    category: 'spices-condiments',
  },
  {
    id: 4,  slug: 'vco-virgin-coconut-oil',
    name: 'Virgin Coconut Oil — Cold Pressed, Edible Grade, 1L Glass Bottle',
    priceMin: 2.80, priceMax: 5.50, unit: 'Litre',
    minOrder: 200, moqUnit: 'Litres',
    rating: 4.7, reviews: 189,
    supplier: 'Lanka Coconut Industries',
    supplierLocation: 'Kurunegala, Sri Lanka',
    badges: ['USDA Organic', 'OEM/ODM', 'Sample Order'],
    audited: true, securedTrading: true, sampleAvailable: true,
    image: 'https://placehold.co/280x280/fff9c4/f57f17?text=Coconut+Oil',
    category: 'coir-coconut',
  },
  {
    id: 5,  slug: 'batik-sarong-handmade',
    name: 'Handloom Batik Sarong — Traditional Sri Lankan Print, Custom Design',
    priceMin: 4.50, priceMax: 12.00, unit: 'Piece',
    minOrder: 100, moqUnit: 'Pieces',
    rating: 4.6, reviews: 95,
    supplier: 'Lanka Batik House (Pvt) Ltd.',
    supplierLocation: 'Kandy, Sri Lanka',
    badges: ['OEM/ODM', 'Custom Logo', 'Sample Order'],
    audited: false, securedTrading: false, sampleAvailable: true,
    image: 'https://placehold.co/280x280/fce4ec/880e4f?text=Batik',
    category: 'textiles-apparel',
  },
  {
    id: 6,  slug: 'natural-rubber-rss',
    name: 'Natural Rubber RSS1 Grade — Export Bale 33.3kg',
    priceMin: 1.45, priceMax: 1.85, unit: 'Kg',
    minOrder: 1000, moqUnit: 'Kg',
    rating: 4.5, reviews: 203,
    supplier: 'Ceylon Rubber Export Co.',
    supplierLocation: 'Ratnapura, Sri Lanka',
    badges: ['ISO 9001', 'Audited', 'SGS Certified'],
    audited: true, securedTrading: true, sampleAvailable: true,
    image: 'https://placehold.co/280x280/f3e5f5/4a148c?text=Rubber',
    category: 'rubber-products',
  },
  {
    id: 7,  slug: 'ayurvedic-massage-oil',
    name: 'Ayurvedic Herbal Massage Oil — 200ml Traditional Formula',
    priceMin: 2.20, priceMax: 4.80, unit: 'Bottle',
    minOrder: 200, moqUnit: 'Bottles',
    rating: 4.6, reviews: 91,
    supplier: 'Ayur Lanka Exports',
    supplierLocation: 'Colombo, Sri Lanka',
    badges: ['Ayush Certified', 'OEM/ODM', 'Sample Order'],
    audited: false, securedTrading: false, sampleAvailable: true,
    image: 'https://placehold.co/280x280/e8f5e9/2e7d32?text=Ayurvedic+Oil',
    category: 'ayurvedic-herbal',
  },
  {
    id: 8,  slug: 'black-pepper-grade-a',
    name: 'Black Pepper Grade A — Garbled, Bold Bean, 25kg Bag',
    priceMin: 2.80, priceMax: 4.50, unit: 'Kg',
    minOrder: 500, moqUnit: 'Kg',
    rating: 4.8, reviews: 347,
    supplier: 'SL Spice Exports',
    supplierLocation: 'Matara, Sri Lanka',
    badges: ['Organic', 'ISO 22000', 'OEM/ODM'],
    audited: true, securedTrading: false, sampleAvailable: true,
    image: 'https://placehold.co/280x280/263238/ffffff?text=Black+Pepper',
    category: 'spices-condiments',
  },
  {
    id: 9,  slug: 'handpainted-ceramic-bowl',
    name: 'Hand-Painted Ceramic Bowl Set — 6 Piece Traditional Design',
    priceMin: 8.50, priceMax: 22.00, unit: 'Set',
    minOrder: 50, moqUnit: 'Sets',
    rating: 4.4, reviews: 62,
    supplier: 'Lanka Ceramics Arts',
    supplierLocation: 'Colombo, Sri Lanka',
    badges: ['OEM/ODM', 'Custom Design'],
    audited: false, securedTrading: false, sampleAvailable: true,
    image: 'https://placehold.co/280x280/fafafa/616161?text=Ceramics',
    category: 'ceramics-pottery',
  },
  {
    id: 10, slug: 'teak-lumber-kiln-dried',
    name: 'Plantation Teak Lumber — Kiln Dried, FEQ Grade, S4S',
    priceMin: 680, priceMax: 1200, unit: 'CBM',
    minOrder: 5, moqUnit: 'CBM',
    rating: 4.3, reviews: 45,
    supplier: 'Lanka Timber Exports',
    supplierLocation: 'Kandy, Sri Lanka',
    badges: ['FSC Certified', 'Audited'],
    audited: true, securedTrading: true, sampleAvailable: false,
    image: 'https://placehold.co/280x280/fff3e0/e65100?text=Teak',
    category: 'wood-furniture',
  },
  {
    id: 11, slug: 'ruby-star-gem',
    name: 'Star Ruby Cabochon — Natural, 5–7 Carat, GIA Report',
    priceMin: 85, priceMax: 420, unit: 'Carat',
    minOrder: 1, moqUnit: 'Carat',
    rating: 4.9, reviews: 127,
    supplier: 'Gems Palace Lanka',
    supplierLocation: 'Beruwala, Sri Lanka',
    badges: ['GIA Certified', 'Audited'],
    audited: true, securedTrading: true, sampleAvailable: false,
    image: 'https://placehold.co/280x280/fce4ec/c62828?text=Ruby',
    category: 'gems-jewelry',
  },
  {
    id: 12, slug: 'cashew-whole-grade-w320',
    name: 'Cashew Nuts W320 — Vacuum Packed, Export Grade 10kg Carton',
    priceMin: 5.80, priceMax: 8.90, unit: 'Kg',
    minOrder: 100, moqUnit: 'Kg',
    rating: 4.7, reviews: 178,
    supplier: 'Ceylon Cashew Exports Ltd.',
    supplierLocation: 'Puttalam, Sri Lanka',
    badges: ['ISO 22000', 'Organic', 'OEM/ODM'],
    audited: true, securedTrading: false, sampleAvailable: true,
    image: 'https://placehold.co/280x280/fff3e0/bf360c?text=Cashew',
    category: 'food-agriculture',
  },
];
