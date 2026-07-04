// TODO: Rename legacy constant name in a later cleanup.
import { SL_BEAUTY_CATEGORY_SLUGS } from './slBeautyConfig';

export const SRI_LANKA_CATEGORIES = [
  { slug: 'makeup',          label: 'Makeup',          icon: '💄' },
  { slug: 'skincare',        label: 'Skincare',        icon: '🧴' },
  { slug: 'fragrance',       label: 'Fragrance',       icon: '✨' },
  { slug: 'hair-care',       label: 'Haircare',        icon: '💇' },
  { slug: 'bath-body',       label: 'Bath & Body',     icon: '🫧' },
  { slug: 'tools-brushes',   label: 'Beauty Tools',    icon: '🖌️' },
  { slug: 'mens-grooming',   label: 'Men’s Grooming',  icon: '🪒' },
  { slug: 'wellness',        label: 'Wellness',        icon: '🌿' },
  { slug: 'luxury-beauty',   label: 'Luxury Beauty',   icon: '💎' },
  { slug: 'k-beauty',        label: 'K-Beauty',        icon: '🌸' },
  { slug: 'mini-size',       label: 'Mini Size',       icon: '👜' },
  { slug: 'gift-sets',       label: 'Gift Sets',       icon: '🎁' },
  { slug: 'sale',            label: 'Sale & Offers',   icon: '🏷️' },
  { slug: 'new-arrivals',    label: 'New Arrivals',    icon: '🆕' },
].filter((category) => SL_BEAUTY_CATEGORY_SLUGS.includes(category.slug));

export const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/beauty/hero-beauty-01.webp',
    imageAlt: 'Assorted premium makeup and beauty products',
    link: '/products',
  },
  {
    id: 2,
    image: '/images/beauty/hero-beauty-02.webp',
    imageAlt: 'Skincare bottles and jars arranged for a beauty promotion',
    link: '/products',
  },
  {
    id: 3,
    image: '/images/beauty/hero-beauty-03.webp',
    imageAlt: 'Luxury fragrance skincare and makeup product arrangement',
    link: '/brands',
  },
];

export const YOU_MAY_LIKE = [
  { label: 'Gentle Cleanser',   count: 'Skincare',   image: 'https://placehold.co/160x160/ecfeff/155e75?text=Cleanser' },
  { label: 'Vitamin C Serum',   count: 'Skincare',   image: 'https://placehold.co/160x160/fef3c7/92400e?text=Serum' },
  { label: 'SPF 50 Sunscreen',  count: 'Sun Care',   image: 'https://placehold.co/160x160/fffbeb/a16207?text=SPF+50' },
  { label: 'Matte Lipstick',    count: 'Makeup',     image: 'https://placehold.co/160x160/fce7f3/9d174d?text=Lipstick' },
  { label: 'Repair Shampoo',    count: 'Haircare',   image: 'https://placehold.co/160x160/f0f9ff/0369a1?text=Shampoo' },
  { label: 'Eau de Parfum',     count: 'Fragrance',  image: 'https://placehold.co/160x160/faf5ff/6b21a8?text=Perfume' },
];

export const FEATURED_CARDS = [
  {
    title:    'Authentic Beauty',
    subtitle: 'Trusted skincare, cosmetics, fragrance, wellness, and haircare from verified beauty brands',
    bg:       'from-pink-800 to-rose-500',
    href:     '/products',
  },
  {
    title:    'Beauty Offers',
    subtitle: 'Daily deals, value sets, and limited-time savings',
    bg:       'from-neutral-900 to-neutral-700',
    href:     '/products?sale=1',
  },
  {
    title:    'Verified Brands',
    subtitle: 'Explore original brands, authorized sellers, retailers, and distributors',
    bg:       'from-purple-800 to-fuchsia-500',
    href:     '/brands',
  },
  {
    title:    'Gift Sets',
    subtitle: 'Curated beauty gifts and value bundles',
    bg:       'from-rose-800 to-pink-500',
    href:     '/products?collection=gifts-value-sets',
  },
];

export const TRENDING_PRODUCTS = [
  {
    slug: 'gentle-cleanser',
    label: 'Gentle Hydrating Cleanser',
    brand_name: 'CeraVe',
    price: 4200,
    currency_code: 'LKR',
    rating: 4.8,
    category: { slug: 'skincare', label: 'Skincare' },
    image: 'https://placehold.co/520x420/ecfeff/155e75?text=Gentle+Cleanser',
  },
  {
    slug: 'vitamin-c-serum',
    label: 'Vitamin C Brightening Serum',
    brand_name: 'Garnier',
    price: 3900,
    currency_code: 'LKR',
    rating: 4.7,
    category: { slug: 'skincare', label: 'Skincare' },
    image: 'https://placehold.co/520x420/fef3c7/92400e?text=Vitamin+C+Serum',
  },
  {
    slug: 'spf-50-sunscreen',
    label: 'SPF 50 Daily Sunscreen',
    brand_name: 'La Roche-Posay',
    price: 6800,
    currency_code: 'LKR',
    rating: 4.9,
    category: { slug: 'skincare', label: 'Sun Care' },
    image: 'https://placehold.co/520x420/fffbeb/a16207?text=SPF+50+Sunscreen',
  },
  {
    slug: 'matte-lipstick',
    label: 'Long Wear Matte Lipstick',
    brand_name: 'Maybelline',
    price: 3200,
    currency_code: 'LKR',
    rating: 4.6,
    category: { slug: 'makeup', label: 'Makeup' },
    image: 'https://placehold.co/520x420/fce7f3/9d174d?text=Matte+Lipstick',
  },
  {
    slug: 'repair-shampoo',
    label: 'Bond Repair Shampoo',
    brand_name: 'L’Oréal',
    price: 4500,
    currency_code: 'LKR',
    rating: 4.7,
    category: { slug: 'hair-care', label: 'Haircare' },
    image: 'https://placehold.co/520x420/f0f9ff/0369a1?text=Repair+Shampoo',
  },
  {
    slug: 'signature-perfume',
    label: 'Signature Eau de Parfum',
    brand_name: 'Lancôme',
    price: 18500,
    currency_code: 'LKR',
    rating: 4.9,
    category: { slug: 'fragrance', label: 'Fragrance' },
    image: 'https://placehold.co/520x420/faf5ff/6b21a8?text=Eau+de+Parfum',
  },
  {
    slug: 'body-lotion',
    label: 'Soft Glow Body Lotion',
    brand_name: 'Nivea',
    price: 2900,
    currency_code: 'LKR',
    rating: 4.5,
    category: { slug: 'bath-body', label: 'Bath & Body' },
    image: 'https://placehold.co/520x420/fff7ed/9a3412?text=Body+Lotion',
  },
  {
    slug: 'clay-face-mask',
    label: 'Pore Care Clay Face Mask',
    brand_name: 'The Ordinary',
    price: 5600,
    currency_code: 'LKR',
    rating: 4.6,
    category: { slug: 'skincare', label: 'Face Mask' },
    image: 'https://placehold.co/520x420/ecfdf5/047857?text=Face+Mask',
  },
  {
    slug: 'nourishing-hair-oil',
    label: 'Nourishing Hair Oil',
    brand_name: 'Kérastase',
    price: 9200,
    currency_code: 'LKR',
    rating: 4.8,
    category: { slug: 'hair-care', label: 'Haircare' },
    image: 'https://placehold.co/520x420/fef3c7/92400e?text=Hair+Oil',
  },
  {
    slug: 'beauty-brush-set',
    label: 'Essential Beauty Tools Set',
    brand_name: 'Real Techniques',
    price: 7400,
    currency_code: 'LKR',
    rating: 4.7,
    category: { slug: 'tools-brushes', label: 'Beauty Tools' },
    image: 'https://placehold.co/520x420/f3f4f6/111827?text=Beauty+Tools',
  },
];

export const SOURCING_SOLUTIONS = [
  {
    title:    'New Arrivals',
    subtitle: 'Fresh cosmetics, skincare, fragrance, and haircare launches',
    tags:     ['New Makeup', 'New Skincare', 'New Fragrance'],
    bg:       'https://placehold.co/760x420/fdf2f8/9f1239?text=New+Arrivals',
    href:     '/products?sort=new',
  },
  {
    title:    'Best Sellers',
    subtitle: 'Most-loved beauty products for everyday routines',
    tags:     ['Makeup Icons', 'Routine Staples', 'Top Rated'],
    bg:       'https://placehold.co/760x420/fce7f3/9d174d?text=Best+Sellers',
    href:     '/products?sort=popular',
  },
  {
    title:    'Luxury Beauty',
    subtitle: 'Premium fragrance, skincare, and makeup collections',
    tags:     ['Lancôme', 'YSL', 'Tom Ford'],
    bg:       'https://placehold.co/760x420/faf5ff/6b21a8?text=Luxury+Beauty',
    href:     '/categories/luxury-beauty',
  },
  {
    title:    'Gift Sets',
    subtitle: 'Curated beauty gifts, minis, and value bundles',
    tags:     ['Value Sets', 'Minis', 'Beauty Gifts'],
    bg:       'https://placehold.co/760x420/fff7ed/9a3412?text=Gift+Sets',
    href:     '/products?collection=gifts-value-sets',
  },
];

export const TRADE_SHOWS = [
  {
    id:       1,
    title:    'SL Beauty Brand Week',
    date:     'Aug 12–14, 2026',
    location: 'Online and selected stores',
    image:    'https://placehold.co/900x520/fdf2f8/9f1239?text=Brand+Week',
  },
  {
    id:       2,
    title:    'Luxury Beauty Edit',
    date:     'Sep 5–7, 2026',
    location: 'SL Beauty Platform',
    image:    'https://placehold.co/900x520/faf5ff/6b21a8?text=Luxury+Beauty',
  },
];

export const FOOTER_LINKS = {
  'Shop Categories': [
    { label: 'Makeup',          href: '/categories/makeup' },
    { label: 'Skincare',        href: '/categories/skincare' },
    { label: 'Fragrance',       href: '/categories/fragrance' },
    { label: 'Hair Care',       href: '/categories/hair-care' },
    { label: 'Bath & Body',     href: '/categories/bath-body' },
  ],
  'Featured Beauty': [
    { label: 'New Arrivals',    href: '/products?sort=new' },
    { label: 'Best Sellers',    href: '/products?sort=popular' },
    { label: 'Luxury Beauty',   href: '/categories/luxury-beauty' },
    { label: 'Gift Sets',       href: '/products?collection=gifts-value-sets' },
    { label: 'Sale & Offers',   href: '/products?sale=1' },
  ],
  'About SL Beauty': [
    { label: 'About Us',        href: '/about' },
    { label: 'Brands',          href: '/brands' },
    { label: 'Partner With Us', href: '/partners' },
    { label: 'Careers',         href: '/careers' },
    { label: 'Advertise',       href: '/advertise' },
  ],
  'Help': [
    { label: 'FAQ',                href: '/faq' },
    { label: 'Contact Us',         href: '/contact' },
    { label: 'Shipping & Delivery',href: '/shipping' },
    { label: 'Returns & Refunds',  href: '/returns' },
    { label: 'Complaints',         href: '/complaints' },
  ],
};
