// TODO: Rename legacy constant name in a later cleanup.
export const SRI_LANKA_CATEGORIES = [
  { slug: 'makeup',          label: 'Makeup',          icon: '💄' },
  { slug: 'skincare',        label: 'Skincare',        icon: '🧴' },
  { slug: 'fragrance',       label: 'Fragrance',       icon: '✨' },
  { slug: 'hair-care',       label: 'Hair Care',       icon: '💇' },
  { slug: 'bath-body',       label: 'Bath & Body',     icon: '🫧' },
  { slug: 'tools-brushes',   label: 'Tools & Brushes', icon: '🖌️' },
  { slug: 'mens-grooming',   label: 'Men’s Grooming',  icon: '🪒' },
  { slug: 'wellness',        label: 'Wellness',        icon: '🌿' },
  { slug: 'luxury-beauty',   label: 'Luxury Beauty',   icon: '💎' },
  { slug: 'k-beauty',        label: 'K-Beauty',        icon: '🌸' },
  { slug: 'mini-size',       label: 'Mini Size',       icon: '👜' },
  { slug: 'gift-sets',       label: 'Gift Sets',       icon: '🎁' },
  { slug: 'sale',            label: 'Sale & Offers',   icon: '🏷️' },
  { slug: 'new-arrivals',    label: 'New Arrivals',    icon: '🆕' },
];

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
  { label: 'Makeup',       count: '12,000+', image: 'https://placehold.co/160x160/fdf2f8/9f1239?text=Makeup' },
  { label: 'Skincare',     count: '8,500+',  image: 'https://placehold.co/160x160/ecfeff/155e75?text=Skincare' },
  { label: 'Fragrance',    count: '3,200+',  image: 'https://placehold.co/160x160/faf5ff/6b21a8?text=Fragrance' },
  { label: 'Hair Care',    count: '5,100+',  image: 'https://placehold.co/160x160/fef3c7/92400e?text=Hair' },
  { label: 'Bath & Body',  count: '4,700+',  image: 'https://placehold.co/160x160/fff7ed/9a3412?text=Body' },
  { label: 'Gift Sets',    count: '2,900+',  image: 'https://placehold.co/160x160/fce7f3/9d174d?text=Gifts' },
];

export const FEATURED_CARDS = [
  {
    title:    'Original Beauty',
    subtitle: 'Trusted skincare, makeup, fragrance, and hair care',
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
    title:    'Premium Brands',
    subtitle: 'Explore global favourites and everyday essentials',
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
  { slug: 'makeup',        label: 'Makeup',          image: 'https://placehold.co/240x240/fdf2f8/9f1239?text=Makeup' },
  { slug: 'skincare',      label: 'Skincare',        image: 'https://placehold.co/240x240/ecfeff/155e75?text=Skincare' },
  { slug: 'fragrance',     label: 'Fragrance',       image: 'https://placehold.co/240x240/faf5ff/6b21a8?text=Fragrance' },
  { slug: 'hair-care',     label: 'Hair Care',       image: 'https://placehold.co/240x240/fef3c7/92400e?text=Hair' },
  { slug: 'bath-body',     label: 'Bath & Body',     image: 'https://placehold.co/240x240/fff7ed/9a3412?text=Body' },
  { slug: 'mini-size',     label: 'Mini Size',       image: 'https://placehold.co/240x240/fce7f3/9d174d?text=Mini' },
  { slug: 'gift-sets',     label: 'Gift Sets',       image: 'https://placehold.co/240x240/f5f3ff/5b21b6?text=Gifts' },
  { slug: 'beauty-tools',  label: 'Beauty Tools',    image: 'https://placehold.co/240x240/f3f4f6/111827?text=Tools' },
  { slug: 'sun-care',      label: 'Sun Care',        image: 'https://placehold.co/240x240/fffbeb/a16207?text=SPF' },
  { slug: 'lip-care',      label: 'Lip Care',        image: 'https://placehold.co/240x240/ffe4e6/be123c?text=Lips' },
  { slug: 'clean-beauty',  label: 'Clean Beauty',    image: 'https://placehold.co/240x240/ecfdf5/047857?text=Clean' },
  { slug: 'new-arrivals',  label: 'New Arrivals',    image: 'https://placehold.co/240x240/fdf2f8/831843?text=New' },
];

export const SOURCING_SOLUTIONS = [
  {
    title:    'New Arrivals',
    subtitle: 'Fresh makeup, skincare, fragrance, and hair care launches',
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
