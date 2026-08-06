import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | SL Beauty Platform',
  description: 'Terms of Service and Conditions for using the SL Beauty Enterprise Platform.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 font-serif mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: August 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using the SL Beauty Platform, you agree to be bound by these Terms of Service and all applicable laws and regulations in Sri Lanka and international commerce rules.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. User Accounts &amp; Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. Super Admin and Merchant accounts are non-transferable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Marketplace Standards &amp; Quality</h2>
            <p>
              All products listed on SL Beauty must satisfy authenticity, regulatory, and quality control guidelines established by platform administration.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Questions? Return to <Link href="/" className="font-semibold text-burgundy hover:underline">SL Beauty Home</Link> or <Link href="/login" className="font-semibold text-burgundy hover:underline">Sign In</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
