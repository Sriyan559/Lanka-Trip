import Header             from '@/components/layout/Header';
import Footer             from '@/components/layout/Footer';
import HeroSlider         from '@/components/home/HeroSlider';
import FeaturedCards      from '@/components/home/FeaturedCards';
import TrendingProducts   from '@/components/home/TrendingProducts';
import CategoryGridSection from '@/components/home/CategoryGridSection';
import { SRI_LANKA_CATEGORIES, TRENDING_PRODUCTS } from '@/lib/constants';
import { SL_BEAUTY_DISPLAY_CONFIG } from '@/lib/slBeautyConfig';

export const metadata = {
  title: `${SL_BEAUTY_DISPLAY_CONFIG.displayName} — Sri Lanka Beauty Marketplace`,
  description: SL_BEAUTY_DISPLAY_CONFIG.description,
};

const sectionImageFallback = (label = 'Beauty Product') =>
  label.toLowerCase().includes('categor')
    ? 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80'
    : 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80';

function productToCategoryGridItem(product) {
  const label = product?.name || product?.label || 'Beauty Product';
  const categorySlug = product?.category?.slug || product?.category_slug || product?.slug || 'products';

  return {
    slug: product?.slug || String(product?.id || categorySlug),
    label,
    image: product?.featured_image || product?.image || product?.thumbnail || sectionImageFallback(label),
    href: product?.id ? `/products/${product.id}` : `/categories/${categorySlug}`,
  };
}

function categoryToGridItem(category) {
  const label = category?.label || 'Beauty Category';
  const slug = category?.slug || 'products';

  return {
    slug,
    label,
    image: sectionImageFallback(label),
    href: `/categories/${slug}`,
  };
}

function buildHomeCategorySections() {
  const beautyCategories = SRI_LANKA_CATEGORIES.filter((category) => (
    [
      'skincare',
      'makeup',
      'hair-care',
      'fragrance',
      'bath-body',
      'wellness',
      'tools-brushes',
      'luxury-beauty',
    ].includes(category.slug)
  ));

  const beautyProducts = TRENDING_PRODUCTS.map(productToCategoryGridItem);

  return [
    {
      id: 'beauty-categories',
      title: 'Shop Beauty Categories',
      promoTitle: 'Find Your Beauty Routine',
      promoSubtitle: 'Browse skincare, makeup, haircare, fragrance, bath and body, wellness, beauty tools, and luxury beauty',
      promoBg: 'linear-gradient(135deg, #9f1239 0%, #f472b6 100%)',
      promoImage: sectionImageFallback('Beauty Categories'),
      promoHref: '/products',
      items: beautyCategories.map(categoryToGridItem),
    },
    {
      id: 'beauty-essentials',
      title: 'Beauty Essentials',
      promoTitle: 'Daily Routine Picks',
      promoSubtitle: 'Cleanser, serum, sunscreen, lipstick, shampoo, perfume, body lotion, and face mask',
      promoBg: 'linear-gradient(135deg, #111827 0%, #be185d 100%)',
      promoImage: TRENDING_PRODUCTS[0]?.image,
      promoHref: '/products',
      items: beautyProducts.slice(0, 8),
    },
    {
      id: 'premium-beauty-picks',
      title: 'Premium Beauty Picks',
      promoTitle: 'Brands To Love',
      promoSubtitle: 'Hair oil, beauty tools, luxury fragrance, and authorized seller favourites',
      promoBg: 'linear-gradient(135deg, #7e22ce 0%, #fb7185 100%)',
      promoImage: TRENDING_PRODUCTS[5]?.image,
      promoHref: '/brands',
      items: beautyProducts.slice(2, 10),
    },
  ].filter((section) => section.items.length > 0);
}

export default function HomePage() {
  const categorySections = buildHomeCategorySections();

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-3 py-3 sm:px-4 sm:py-4">

        {/* ── Full-width beauty hero slider ─────────────────── */}
        <div className="w-full">
          <HeroSlider />
        </div>

        {/* ── Featured service cards ─────────────────────────── */}
        <FeaturedCards />

        {/* ── Trending products grid ─────────────────────────── */}
        <TrendingProducts />

        {/* ── Beauty product category sections, using public SL Beauty display data ── */}
        {categorySections.map((section) => (
          <CategoryGridSection key={section.id} section={section} />
        ))}

      </main>
      <Footer />
    </>
  );
}
