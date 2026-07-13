import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PRODUCT_IMAGES = {
  cleanser: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=240&q=80',
  serum: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=240&q=80',
  sunscreen: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=240&q=80',
  lipstick: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=240&q=80',
  shampoo: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=240&q=80',
  perfume: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=240&q=80',
  lotion: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=240&q=80',
  mask: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=240&q=80',
  hairOil: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=240&q=80',
  tools: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=240&q=80',
};

// This single configuration array controls panel content, artwork, images, and every destination URL.
const BEAUTY_SHOWCASES = [
  {
    id: 'beauty-essentials', title: 'Beauty Essentials', viewAllUrl: '/products?collection=beauty-essentials', introTitle: 'Daily Routine Picks',
    introDescription: 'Cleanser, serum, sunscreen, lipstick, shampoo, perfume, body lotion, and face mask', shopUrl: '/products?collection=daily-routine',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=80',
    introBackgroundImageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=700&q=80', variant: 'light',
    products: [
      ['gentle-hydrating-cleanser', 'Gentle Hydrating Cleanser', 'cleanser'], ['vitamin-c-brightening-serum', 'Vitamin C Brightening Serum', 'serum'], ['spf-50-daily-sunscreen', 'SPF 50 Daily Sunscreen', 'sunscreen'], ['long-wear-matte-lipstick', 'Long Wear Matte Lipstick', 'lipstick'],
      ['bond-repair-shampoo', 'Bond Repair Shampoo', 'shampoo'], ['signature-eau-de-parfum', 'Signature Eau de Parfum', 'perfume'], ['soft-glow-body-lotion', 'Soft Glow Body Lotion', 'lotion'], ['pore-care-clay-face-mask', 'Pore Care Clay Face Mask', 'mask'],
    ],
  },
  {
    id: 'premium-beauty-picks', title: 'Premium Beauty Picks', viewAllUrl: '/products?collection=premium-beauty', introTitle: 'Brands To Love',
    introDescription: 'Hair oil, beauty tools, luxury fragrance, and authorized seller favourites', shopUrl: '/brands',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=80',
    introBackgroundImageUrl: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=700&q=80', variant: 'dark',
    products: [
      ['spf-50-daily-sunscreen', 'SPF 50 Daily Sunscreen', 'sunscreen'], ['long-wear-matte-lipstick', 'Long Wear Matte Lipstick', 'lipstick'], ['bond-repair-shampoo', 'Bond Repair Shampoo', 'shampoo'], ['signature-eau-de-parfum', 'Signature Eau de Parfum', 'perfume'],
      ['soft-glow-body-lotion', 'Soft Glow Body Lotion', 'lotion'], ['pore-care-clay-face-mask', 'Pore Care Clay Face Mask', 'mask'], ['nourishing-hair-oil', 'Nourishing Hair Oil', 'hairOil'], ['essential-beauty-tools-set', 'Essential Beauty Tools Set', 'tools'],
    ],
  },
].map((showcase) => ({
  ...showcase,
  products: showcase.products.map(([id, name, imageKey]) => ({ id, name, imageUrl: PRODUCT_IMAGES[imageKey], imageAlt: name, productUrl: `/products?search=${encodeURIComponent(name)}` })),
}));

function ShowcasePanel({ showcase }) {
  const dark = showcase.variant === 'dark';
  const gridBorder = 'border-[#ece7e3]';

  return (
    <article className={`relative overflow-hidden rounded-[22px] border shadow-[0_14px_34px_rgba(82,47,42,0.15)] ${dark ? 'border-white/25 bg-[#6d3542]' : 'border-[#fffaf0]/90 bg-[#f9e9e2]'}`}>
      <Image src={showcase.backgroundImageUrl} alt="" fill unoptimized sizes="(max-width: 1280px) 100vw, 1200px" className="pointer-events-none object-cover" />
      <span aria-hidden="true" className={`absolute inset-0 ${dark ? 'bg-gradient-to-r from-[#542a3d]/88 via-[#6e3944]/72 to-[#3d2638]/70' : 'bg-gradient-to-r from-[#fff9ee]/94 via-[#f7e4df]/80 to-[#eed4cc]/75'}`} />
      {dark && <><span aria-hidden="true" className="absolute right-[14%] top-[30%] h-2 w-2 rounded-full bg-amber-100/80 shadow-[0_0_15px_5px_rgba(251,191,36,0.24)]" /><span aria-hidden="true" className="absolute bottom-7 right-[7%] h-8 w-8 rotate-45 border border-amber-100/40 bg-white/10" /></>}

      <header className={`relative z-10 flex items-center justify-between border-b px-4 py-3 backdrop-blur-md sm:px-5 ${dark ? 'border-white/30 bg-[#fff8ef]/75 text-[#42262c]' : 'border-white/70 bg-[#fffaf1]/65 text-[#38251f]'}`}>
        <h2 className="text-sm font-bold tracking-[-0.02em] sm:text-[15px]">{showcase.title}</h2>
        <Link href={showcase.viewAllUrl} className="group flex items-center gap-1 text-xs font-semibold italic focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-800 focus-visible:ring-offset-2 sm:text-sm">
          View All <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </Link>
      </header>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[minmax(11rem,24%)_1fr]">
        <aside className={`relative flex min-h-[172px] flex-col overflow-hidden p-4 sm:min-h-[220px] sm:p-5 ${dark ? 'text-white' : 'text-[#442c26]'}`}>
          <Image src={showcase.introBackgroundImageUrl} alt="" fill unoptimized sizes="(max-width: 640px) 100vw, 280px" className="pointer-events-none object-cover" />
          <span aria-hidden="true" className={`absolute inset-0 ${dark ? 'bg-gradient-to-br from-[#6f4b88]/90 to-[#a75062]/72' : 'bg-gradient-to-br from-[#f5cfbf]/92 to-[#f7e5bf]/72'}`} />
          <div className="relative"><h3 className="text-sm font-bold sm:text-[15px]">{showcase.introTitle}</h3><p className={`mt-1 max-w-[13rem] text-[11px] leading-[1.45] ${dark ? 'text-white/85' : 'text-[#543832]/85'}`}>{showcase.introDescription}</p></div>
          <Link href={showcase.shopUrl} className={`relative mt-auto inline-flex self-start rounded-full px-4 py-2 text-xs font-bold shadow-[0_5px_12px_rgba(56,28,23,0.20)] transition-shadow duration-300 hover:shadow-[0_8px_18px_rgba(56,28,23,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 motion-reduce:transition-none ${dark ? 'bg-[#fff5ed]/90 text-[#633344] focus-visible:ring-offset-[#76425b]' : 'bg-[#8b5949] text-white focus-visible:ring-offset-[#f6d7ca]'}`}>Shop Now</Link>
        </aside>

        <ul className={`relative grid grid-cols-2 bg-white sm:grid-cols-4 ${gridBorder} border-l`}>
          {showcase.products.map((product) => (
            <li key={product.id} className={`border-b border-r ${gridBorder} last:border-b-0 sm:[&:nth-last-child(-n+4)]:border-b-0`}>
              <Link href={product.productUrl} aria-label={`View ${product.name}`} className="group flex min-h-[118px] flex-col items-center justify-center gap-2 bg-white px-2 py-3 text-center outline-none transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(55,38,31,0.08)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-800 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-[110px]">
                <span className="relative h-12 w-12 overflow-hidden rounded-xl border border-[#ebe6e2] bg-white shadow-[0_4px_12px_rgba(55,38,31,0.08)] sm:h-[60px] sm:w-[60px]"><Image src={product.imageUrl} alt={product.imageAlt} fill unoptimized loading="lazy" sizes="60px" className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" /></span>
                <span className="line-clamp-2 max-w-[9rem] text-[10px] font-medium leading-tight text-[#332a27] sm:text-[11px]">{product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function BeautyProductShowcases() {
  return <section aria-label="Featured beauty product collections" className="relative mt-6 space-y-5 overflow-hidden rounded-[28px] bg-[#f9eee8] p-2 sm:mt-7 sm:space-y-6 sm:p-3"><span aria-hidden="true" className="pointer-events-none absolute -left-16 top-0 h-52 w-52 rounded-full bg-[#fffdf6]/90 blur-3xl" />{BEAUTY_SHOWCASES.map((showcase) => <ShowcasePanel key={showcase.id} showcase={showcase} />)}</section>;
}
