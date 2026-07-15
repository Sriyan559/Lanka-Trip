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

export const HOME_PROMO_VIDEO = {
  youtubeId: 'l-UpsG80MZs',
  title: 'SL Beauty promotional video',
  // A 9:16 video needs roughly 3.16× scale to cover a 16:9 landscape frame.
  zoom: 3.2,
  positionX: '50%',
  positionY: '52%',
};

export const YOU_MAY_LIKE = [
  { label: 'Gentle Cleanser',   count: 'Skincare',   image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=320&q=80' },
  { label: 'Vitamin C Serum',   count: 'Skincare',   image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=320&q=80' },
  { label: 'SPF 50 Sunscreen',  count: 'Sun Care',   image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=320&q=80' },
  { label: 'Matte Lipstick',    count: 'Makeup',     image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=320&q=80' },
  { label: 'Repair Shampoo',    count: 'Haircare',   image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=320&q=80' },
  { label: 'Eau de Parfum',     count: 'Fragrance',  image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=320&q=80' },
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
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'vitamin-c-serum',
    label: 'Vitamin C Brightening Serum',
    brand_name: 'Garnier',
    price: 3900,
    currency_code: 'LKR',
    rating: 4.7,
    category: { slug: 'skincare', label: 'Skincare' },
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'spf-50-sunscreen',
    label: 'SPF 50 Daily Sunscreen',
    brand_name: 'La Roche-Posay',
    price: 6800,
    currency_code: 'LKR',
    rating: 4.9,
    category: { slug: 'skincare', label: 'Sun Care' },
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'matte-lipstick',
    label: 'Long Wear Matte Lipstick',
    brand_name: 'Maybelline',
    price: 3200,
    currency_code: 'LKR',
    rating: 4.6,
    category: { slug: 'makeup', label: 'Makeup' },
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'repair-shampoo',
    label: 'Bond Repair Shampoo',
    brand_name: 'L’Oréal',
    price: 4500,
    currency_code: 'LKR',
    rating: 4.7,
    category: { slug: 'hair-care', label: 'Haircare' },
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'signature-perfume',
    label: 'Signature Eau de Parfum',
    brand_name: 'Lancôme',
    price: 18500,
    currency_code: 'LKR',
    rating: 4.9,
    category: { slug: 'fragrance', label: 'Fragrance' },
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'body-lotion',
    label: 'Soft Glow Body Lotion',
    brand_name: 'Nivea',
    price: 2900,
    currency_code: 'LKR',
    rating: 4.5,
    category: { slug: 'bath-body', label: 'Bath & Body' },
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'clay-face-mask',
    label: 'Pore Care Clay Face Mask',
    brand_name: 'The Ordinary',
    price: 5600,
    currency_code: 'LKR',
    rating: 4.6,
    category: { slug: 'skincare', label: 'Face Mask' },
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'nourishing-hair-oil',
    label: 'Nourishing Hair Oil',
    brand_name: 'Kérastase',
    price: 9200,
    currency_code: 'LKR',
    rating: 4.8,
    category: { slug: 'hair-care', label: 'Haircare' },
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'beauty-brush-set',
    label: 'Essential Beauty Tools Set',
    brand_name: 'Real Techniques',
    price: 7400,
    currency_code: 'LKR',
    rating: 4.7,
    category: { slug: 'tools-brushes', label: 'Beauty Tools' },
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'rose-glow-blush-palette',
    label: 'Rose Glow Blush Palette',
    brand_name: 'NARS',
    price: 9800,
    currency_code: 'LKR',
    rating: 4.8,
    category: { slug: 'makeup', label: 'Makeup' },
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'retinol-night-cream',
    label: 'Retinol Night Cream',
    brand_name: 'Olay',
    price: 7600,
    currency_code: 'LKR',
    rating: 4.6,
    category: { slug: 'skincare', label: 'Skincare' },
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'micellar-cleansing-water',
    label: 'Micellar Cleansing Water',
    brand_name: 'Bioderma',
    price: 5100,
    currency_code: 'LKR',
    rating: 4.7,
    category: { slug: 'skincare', label: 'Skincare' },
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'hydrating-sheet-mask',
    label: 'Hydrating Sheet Mask',
    brand_name: 'Laneige',
    price: 1800,
    currency_code: 'LKR',
    rating: 4.5,
    category: { slug: 'k-beauty', label: 'K-Beauty' },
    image: 'https://images.unsplash.com/photo-1608979048467-6194dabc6a3d?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'brow-definer-pencil',
    label: 'Brow Definer Pencil',
    brand_name: 'Anastasia Beverly Hills',
    price: 5900,
    currency_code: 'LKR',
    rating: 4.6,
    category: { slug: 'makeup', label: 'Makeup' },
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'makeup-brush-collection',
    label: 'Makeup Brush Collection',
    brand_name: 'Morphe',
    price: 11200,
    currency_code: 'LKR',
    rating: 4.8,
    category: { slug: 'tools-brushes', label: 'Beauty Tools' },
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
  },
];

export const SOURCING_SOLUTIONS = [
  {
    title:    'New Arrivals',
    subtitle: 'Fresh cosmetics, skincare, fragrance, and haircare launches',
    tags:     ['New Makeup', 'New Skincare', 'New Fragrance'],
    bg:       'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    href:     '/products?sort=new',
  },
  {
    title:    'Best Sellers',
    subtitle: 'Most-loved beauty products for everyday routines',
    tags:     ['Makeup Icons', 'Routine Staples', 'Top Rated'],
    bg:       'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80',
    href:     '/products?sort=popular',
  },
  {
    title:    'Luxury Beauty',
    subtitle: 'Premium fragrance, skincare, and makeup collections',
    tags:     ['Lancôme', 'YSL', 'Tom Ford'],
    bg:       'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    href:     '/categories/luxury-beauty',
  },
  {
    title:    'Gift Sets',
    subtitle: 'Curated beauty gifts, minis, and value bundles',
    tags:     ['Value Sets', 'Minis', 'Beauty Gifts'],
    bg:       'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
    href:     '/products?collection=gifts-value-sets',
  },
];

export const TRADE_SHOWS = [
  {
    id:       1,
    title:    'SL Beauty Brand Week',
    date:     'Aug 12–14, 2026',
    location: 'Online and selected stores',
    image:    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id:       2,
    title:    'Luxury Beauty Edit',
    date:     'Sep 5–7, 2026',
    location: 'SL Beauty Platform',
    image:    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
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
    { label: 'New Arrivals',    href: '/categories/new-arrivals' },
    { label: 'Best Sellers',    href: '/products?sort=popular' },
    { label: 'Luxury Beauty',   href: '/categories/luxury-beauty' },
    { label: 'Gift Sets',       href: '/categories/gift-sets' },
    { label: 'Sale & Offers',   href: '/categories/sale' },
  ],
  'About SL Beauty': [
    { label: 'Brands',          href: '/brands' },
    { label: 'Gift Cards',      href: '/gift-cards' },
    { label: 'Wishlist',        href: '/wishlist' },
    { label: 'Beauty Products', href: '/products' },
    { label: 'Sign In',         href: '/login' },
  ],
  'Help': [
    { label: 'Help Center',        href: '/help-center' },
    { label: 'Shop Products',      href: '/products' },
    { label: 'Browse Brands',      href: '/brands' },
    { label: 'Shop Makeup',        href: '/categories/makeup' },
    { label: 'Shop Skincare',      href: '/categories/skincare' },
  ],
};

export const FOOTER_LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Fees & Payments', href: '/fees-payments' },
  { label: 'Cancellation & Refund Policy', href: '/cancellation-refund-policy' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Shipping & Delivery Policy', href: '/shipping-delivery-policy' },
  { label: 'Rewards Policy', href: '/rewards-policy' },
  { label: 'Promotions Terms & Conditions', href: '/promotions-terms' },
];

export const FOOTER_APP_LINKS = [
  {
    platform: 'google_play',
    label: 'Get it on Google Play',
    enabled: true,
    imageAlt: 'Get the SL Beauty app on Google Play',
    storeUrl: null,
    imageUrl: '/images/app-badges/google-play-badge.png',
  },
  {
    platform: 'app_store',
    label: 'Download on the App Store',
    enabled: true,
    imageAlt: 'Download the SL Beauty app on the App Store',
    storeUrl: null,
    imageUrl: '/images/app-badges/app-store-badge.svg',
  },
];

export const NAV_DROPDOWNS = {
  'Makeup': {
    columns: [
      {
        sections: [
          {
            title: 'Face',
            links: [
              { label: 'Foundation', href: '/products?category=makeup&q=foundation' },
              { label: 'Concealer', href: '/products?category=makeup&q=concealer' },
              { label: 'Primer', href: '/products?category=makeup&q=primer' },
              { label: 'Compact Powder', href: '/products?category=makeup&q=compact' },
              { label: 'Contour & Highlight', href: '/products?category=makeup&q=contour' },
              { label: 'Blush & Setting Spray', href: '/products?category=makeup&q=blush' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Eyes',
            links: [
              { label: 'Mascara', href: '/products?category=makeup&q=mascara' },
              { label: 'Eyeliner & Kajal', href: '/products?category=makeup&q=eyeliner' },
              { label: 'Eyeshadow', href: '/products?category=makeup&q=eyeshadow' },
              { label: 'Eyebrows', href: '/products?category=makeup&q=brow' },
              { label: 'False Eyelashes', href: '/products?category=makeup&q=lashes' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Lips',
            links: [
              { label: 'Lipstick', href: '/products?category=makeup&q=lipstick' },
              { label: 'Lip Gloss & Lacquer', href: '/products?category=makeup&q=gloss' },
              { label: 'Lip Liner & Plumper', href: '/products?category=makeup&q=liner' },
              { label: 'Lip Balm & Treatment', href: '/products?category=makeup&q=balm' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Nails',
            links: [
              { label: 'Nail Polish', href: '/products?category=makeup&q=polish' },
              { label: 'Gel & Matte Top Coat', href: '/products?category=makeup&q=coat' },
              { label: 'Nail Polish Remover', href: '/products?category=makeup&q=remover' },
            ]
          },
          {
            title: 'Shop By / Tools',
            links: [
              { label: "What's New", href: '/products?category=makeup&sort=new' },
              { label: 'Bestsellers', href: '/products?category=makeup&sort=popular' },
              { label: 'Makeup Brushes', href: '/products?category=tools-brushes' },
              { label: 'Sponges & Blenders', href: '/products?category=tools-brushes' },
            ]
          }
        ]
      }
    ],
    featured: {
      title: 'Glamorous Looks',
      subtitle: 'Premium cosmetics and tools',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
      href: '/products?category=makeup'
    }
  },
  'Skincare': {
    columns: [
      {
        sections: [
          {
            title: 'Cleansers',
            links: [
              { label: 'Face Wash', href: '/products?category=skincare&q=wash' },
              { label: 'Cleansing Oil & Balm', href: '/products?category=skincare&q=cleansing' },
              { label: 'Micellar Water', href: '/products?category=skincare&q=micellar' },
              { label: 'Face Scrub & Peeling', href: '/products?category=skincare&q=scrub' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Moisturizers',
            links: [
              { label: 'Face Cream & Gel', href: '/products?category=skincare&q=moisturizer' },
              { label: 'Night Cream & Mask', href: '/products?category=skincare&q=night' },
              { label: 'Face Oil & Mist', href: '/products?category=skincare&q=oil' },
              { label: 'Eye Cream & Serum', href: '/products?category=skincare&q=eye' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Treatments & Serums',
            links: [
              { label: 'Face Serum & Ampoule', href: '/products?category=skincare&q=serum' },
              { label: 'Sheet Masks', href: '/products?category=skincare&q=sheet' },
              { label: 'Clay & Peel-off Masks', href: '/products?category=skincare&q=mask' },
              { label: 'Toner & Essence', href: '/products?category=skincare&q=toner' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Sun Care',
            links: [
              { label: 'Face Sunscreen', href: '/products?category=skincare&q=sunscreen' },
              { label: 'Body Sunscreen', href: '/products?category=skincare&q=body' },
              { label: 'After Sun Gel', href: '/products?category=skincare&q=after-sun' },
            ]
          }
        ]
      }
    ],
    featured: {
      title: 'Daily Hydration',
      subtitle: 'Nourish your skin base',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      href: '/products?category=skincare'
    }
  },
  'Fragrance': {
    columns: [
      {
        sections: [
          {
            title: "Women's Fragrance",
            links: [
              { label: 'Perfume (EDT & EDP)', href: '/products?category=fragrance&q=women' },
              { label: 'Body Mists & Sprays', href: '/products?category=fragrance&q=mist' },
              { label: 'Deodorants & Roll-Ons', href: '/products?category=fragrance&q=deodorant' },
            ]
          },
          {
            title: "Men's Fragrance",
            links: [
              { label: 'Perfume (EDT & EDP)', href: '/products?category=fragrance&q=men' },
              { label: 'Body Mists & Sprays', href: '/products?category=fragrance&q=mist' },
              { label: 'Deodorants & Roll-Ons', href: '/products?category=fragrance&q=deodorant' },
              { label: 'Colognes & After Shaves', href: '/products?category=fragrance&q=cologne' },
            ]
          },
          {
            title: 'Home Fragrance',
            links: [
              { label: 'Candle', href: '/products?category=fragrance&q=candle' },
              { label: 'Diffuser', href: '/products?category=fragrance&q=diffuser' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Unisex Fragrance',
            links: [
              { label: 'Unisex Perfumes', href: '/products?category=fragrance&q=unisex' },
              { label: 'Unisex Mists & Sprays', href: '/products?category=fragrance&q=mist' },
              { label: 'Unisex Deodorants & Roll-Ons', href: '/products?category=fragrance&q=deodorant' },
            ]
          },
          {
            title: 'Fragrance Family',
            links: [
              { label: 'Floral', href: '/products?category=fragrance&q=floral' },
              { label: 'Fruity', href: '/products?category=fragrance&q=fruity' },
              { label: 'Spicy', href: '/products?category=fragrance&q=spicy' },
              { label: 'Woody', href: '/products?category=fragrance&q=woody' },
              { label: 'Fresh', href: '/products?category=fragrance&q=fresh' },
              { label: 'Aqua', href: '/products?category=fragrance&q=aqua' },
              { label: 'Citrus', href: '/products?category=fragrance&q=citrus' },
              { label: 'Musky', href: '/products?category=fragrance&q=musk' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Shop By',
            links: [
              { label: "What's New", href: '/products?category=fragrance&sort=new' },
              { label: 'Bestsellers', href: '/products?category=fragrance&sort=popular' },
              { label: 'Gift Sets', href: '/products?category=fragrance&q=set' },
              { label: 'Sets & Bundles', href: '/products?category=fragrance&q=bundle' },
              { label: 'Tira Loves', href: '/products?category=fragrance' },
            ]
          },
          {
            title: 'Tira Red',
            links: [
              { label: 'Yves Saint Laurent', href: '/brands' },
              { label: 'Burberry', href: '/brands' },
              { label: 'Tom Ford', href: '/brands' },
              { label: 'Prada', href: '/brands' },
              { label: 'Versace', href: '/brands' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Brands To Know',
            links: [
              { label: 'Gucci', href: '/brands' },
              { label: 'Jo Malone London', href: '/brands' },
              { label: 'Elizabeth Arden', href: '/brands' },
              { label: 'Jimmy Choo', href: '/brands' },
              { label: 'Giorgio Armani', href: '/brands' },
              { label: 'Calvin Klein', href: '/brands' },
              { label: 'Narciso Rodriguez', href: '/brands' },
              { label: 'Dolce&Gabbana', href: '/brands' },
              { label: 'Salvatore Ferragamo', href: '/brands' },
            ]
          }
        ]
      }
    ],
    featured: {
      title: 'Pocket-friendly everyday scents',
      subtitle: 'Find your signature fragrance',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      href: '/products?category=fragrance'
    }
  },
  'Hair': {
    columns: [
      {
        sections: [
          {
            title: 'Hair Care',
            links: [
              { label: 'Shampoo', href: '/products?category=hair-care&q=shampoo' },
              { label: 'Conditioner', href: '/products?category=hair-care&q=conditioner' },
              { label: 'Hair Mask & Treatment', href: '/products?category=hair-care&q=mask' },
              { label: 'Hair Oil & Serum', href: '/products?category=hair-care&q=oil' },
              { label: 'Dry Shampoo', href: '/products?category=hair-care&q=dry' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Hair Styling',
            links: [
              { label: 'Hair Gel & Wax', href: '/products?category=hair-care&q=gel' },
              { label: 'Hair Spray', href: '/products?category=hair-care&q=spray' },
              { label: 'Heat Protectant Cream', href: '/products?category=hair-care&q=protect' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Color & Tools',
            links: [
              { label: 'Permanent Hair Color', href: '/products?category=hair-care&q=color' },
              { label: 'Hair Dryer & Styler', href: '/products?category=hair-care&q=dryer' },
              { label: 'Hair Straightener & Curler', href: '/products?category=hair-care&q=straightener' },
              { label: 'Hair Brushes & Combs', href: '/products?category=hair-care&q=brush' },
            ]
          }
        ]
      }
    ],
    featured: {
      title: 'Healthy & Shiny Locks',
      subtitle: 'Professional hair care routines',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
      href: '/products?category=hair-care'
    }
  },
  'Bath & Body': {
    columns: [
      {
        sections: [
          {
            title: 'Shower & Bath',
            links: [
              { label: 'Body Wash & Gel', href: '/products?category=bath-body&q=wash' },
              { label: 'Shower Oil & Bubble Bath', href: '/products?category=bath-body&q=shower' },
              { label: 'Exfoliating Body Scrub', href: '/products?category=bath-body&q=scrub' },
              { label: 'Bar Soap', href: '/products?category=bath-body&q=soap' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Body Moisturizers',
            links: [
              { label: 'Body Lotion', href: '/products?category=bath-body&q=lotion' },
              { label: 'Body Butter & Yogurt', href: '/products?category=bath-body&q=butter' },
              { label: 'Body Oil & Mist', href: '/products?category=bath-body&q=oil' },
              { label: 'Hand Cream & Foot Cream', href: '/products?category=bath-body&q=hand' },
            ]
          }
        ]
      },
      {
        sections: [
          {
            title: 'Personal Care',
            links: [
              { label: 'Deodorants & Roll-ons', href: '/products?category=bath-body&q=deodorant' },
              { label: 'Intimate Wash & Care', href: '/products?category=bath-body&q=intimate' },
              { label: 'Shaving Gel & Razor', href: '/products?category=bath-body&q=shaving' },
              { label: 'Sun Protection for Body', href: '/products?category=bath-body&q=sun' },
            ]
          }
        ]
      }
    ],
    featured: {
      title: 'Relaxing Spa at Home',
      subtitle: 'Indulge in gentle body care',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
      href: '/products?category=bath-body'
    }
  }
};
