import Header             from '@/components/layout/Header';
import Footer             from '@/components/layout/Footer';
import HeroSlider         from '@/components/home/HeroSlider';
import FeaturedCards      from '@/components/home/FeaturedCards';
import TrendingProducts   from '@/components/home/TrendingProducts';
import ExportCategorySection from '@/components/home/ExportCategorySection';
import CategoryGridSection from '@/components/home/CategoryGridSection';
import VerifiedSuppliers  from '@/components/home/VerifiedSuppliers';
import EasySourcingSection from '@/components/home/EasySourcingSection';
import SourcingSolutions  from '@/components/home/SourcingSolutions';
import TradeShows         from '@/components/home/TradeShows';
import FloatingActions    from '@/components/ui/FloatingActions';
import { getHomeSections } from '@/lib/services';

export const metadata = {
  title: 'SL Beauty Platform — Beauty Ecommerce Marketplace',
  description:
    'Shop original beauty brands, skincare, makeup, fragrance, hair care, gifts, and daily beauty essentials in Sri Lanka.',
};

const sectionImageFallback = (label = 'Beauty Product') =>
  `https://placehold.co/160x160/fdf2f8/9f1239?text=${encodeURIComponent(label.slice(0, 16))}`;

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

function buildHomeCategorySections(sections) {
  const featuredProducts = Array.isArray(sections.featured_products) ? sections.featured_products : [];
  const trendingProducts = Array.isArray(sections.trending_products) ? sections.trending_products : [];
  const recommendations = Array.isArray(sections.recommendations) ? sections.recommendations : [];

  return [
    {
      id: 'featured-products',
      title: 'Featured Beauty Picks',
      promoTitle: 'Original Beauty Essentials',
      promoSubtitle: 'Discover makeup, skincare, fragrance, and hair care favourites',
      promoBg: 'linear-gradient(135deg, #9f1239 0%, #f472b6 100%)',
      promoImage: featuredProducts[0]?.featured_image || featuredProducts[0]?.image,
      promoHref: '/products?featured=1',
      items: featuredProducts.map(productToCategoryGridItem),
    },
    {
      id: 'trending-products',
      title: 'Trending Beauty Picks',
      promoTitle: 'Most-Loved Beauty Finds',
      promoSubtitle: 'Explore products shoppers are adding to their routines',
      promoBg: 'linear-gradient(135deg, #111827 0%, #be185d 100%)',
      promoImage: trendingProducts[0]?.featured_image || trendingProducts[0]?.image,
      promoHref: '/products?sort=trending',
      items: trendingProducts.map(productToCategoryGridItem),
    },
    {
      id: 'recommended-products',
      title: 'Recommended for You',
      promoTitle: 'More Beauty To Love',
      promoSubtitle: 'Discover related products and new routine ideas',
      promoBg: 'linear-gradient(135deg, #7e22ce 0%, #fb7185 100%)',
      promoImage: recommendations[0]?.featured_image || recommendations[0]?.image,
      promoHref: '/products',
      items: recommendations.map(productToCategoryGridItem),
    },
  ].filter((section) => section.items.length > 0);
}

export default async function HomePage() {
  const sections = await getHomeSections();
  const categorySections = buildHomeCategorySections(sections);

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
        <TrendingProducts products={sections.trending_products} />

        {/* ── Export category sourcing section, backed by Laravel categories ── */}
        <ExportCategorySection />

        {/* ── Source UI/UX product category sections, backed by Laravel data ── */}
        {categorySections.map((section) => (
          <CategoryGridSection key={section.id} section={section} />
        ))}

        {/* ── Verified supplier discovery, backed by Laravel data ── */}
        <VerifiedSuppliers suppliers={sections.verified_suppliers} />

        {/* ── Easy Sourcing / RFQ form ───────────────────────── */}
        <EasySourcingSection />

        {/* ── Secured Trading banner ─────────────────────────── */}
        <div className="mt-5 sm:mt-6 bg-gradient-to-r from-primary-800 to-primary-600 rounded-lg sm:rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-white font-bold text-lg">Secured Trading Service</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
              {['🛡️ Funds Security', '✅ Audited Suppliers', '↩️ Refund Policy', '🔒 Service Guarantee'].map(f => (
                <span key={f} className="text-primary-100 text-sm">{f}</span>
              ))}
            </div>
          </div>
          <a
            href="/secured-trading"
            className="w-full sm:w-auto text-center px-6 py-2.5 bg-white text-primary-800 font-semibold text-sm rounded-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            Learn More
          </a>
        </div>

        {/* ── Sourcing solutions ─────────────────────────────── */}
        <SourcingSolutions />

        {/* ── Trade shows ───────────────────────────────────── */}
        <TradeShows />

      </main>
      <Footer />

      {/* ── Sticky floating quick actions (RFQ · Help · App · ↑) */}
      <FloatingActions />
    </>
  );
}
