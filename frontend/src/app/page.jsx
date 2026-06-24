import Header             from '@/components/layout/Header';
import Footer             from '@/components/layout/Footer';
import CategorySidebar    from '@/components/home/CategorySidebar';
import HeroSlider         from '@/components/home/HeroSlider';
import YouMayLike         from '@/components/home/YouMayLike';
import FeaturedCards      from '@/components/home/FeaturedCards';
import TrendingProducts   from '@/components/home/TrendingProducts';
import CategoryGridSection from '@/components/home/CategoryGridSection';
import EasySourcingSection from '@/components/home/EasySourcingSection';
import SourcingSolutions  from '@/components/home/SourcingSolutions';
import TradeShows         from '@/components/home/TradeShows';
import FloatingActions    from '@/components/ui/FloatingActions';
import { MOCK_HOME_SECTIONS } from '@/lib/services';

export const metadata = {
  title: 'EcomLanka — Sri Lanka B2B Export Marketplace',
  description:
    'Find verified Sri Lankan exporters for tea, spices, gems, textiles and more. Source direct from certified suppliers.',
};

/**
 * HomePage — server component.
 *
 * Dynamic sections (CategoryGridSection) are driven by MOCK_HOME_SECTIONS
 * (see /src/lib/services.js). Replace with an API call once the Laravel
 * GET /api/home/sections endpoint is ready:
 *
 *   import { getHomeSections } from '@/lib/services';
 *   const sections = await getHomeSections();
 */
export default function HomePage() {
  // When Laravel is ready swap this line:
  // const sections = await getHomeSections();
  const sections = MOCK_HOME_SECTIONS;

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-4">

        {/* ── Hero row: [sidebar | slider | you-may-like] ────── */}
        <div className="flex gap-4">
          <CategorySidebar />
          <HeroSlider />
          <YouMayLike />
        </div>

        {/* ── Featured service cards ─────────────────────────── */}
        <FeaturedCards />

        {/* ── Trending products grid ─────────────────────────── */}
        <TrendingProducts />

        {/* ── Dynamic category grid sections ─────────────────── */}
        {/*
          These sections are driven by /api/home/sections data.
          Each section gets its own CategoryGridSection block.
          Add more sections by appending to MOCK_HOME_SECTIONS,
          or by returning more items from the Laravel API.
        */}
        {sections.map((section) => (
          <CategoryGridSection key={section.id} section={section} />
        ))}

        {/* ── Easy Sourcing / RFQ form ───────────────────────── */}
        <EasySourcingSection />

        {/* ── Secured Trading banner ─────────────────────────── */}
        <div className="mt-6 bg-gradient-to-r from-primary-800 to-primary-600 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-bold text-lg">Secured Trading Service</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
              {['🛡️ Funds Security', '✅ Audited Suppliers', '↩️ Refund Policy', '🔒 Service Guarantee'].map(f => (
                <span key={f} className="text-primary-100 text-sm">{f}</span>
              ))}
            </div>
          </div>
          <a
            href="/secured-trading"
            className="px-6 py-2.5 bg-white text-primary-800 font-semibold text-sm rounded-full hover:bg-gray-50 transition-colors shadow-sm"
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
