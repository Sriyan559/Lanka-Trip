import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SL Beauty Platform',
  description: 'Privacy Policy and Data Protection guidelines for the SL Beauty Enterprise Platform.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 font-serif mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: August 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Information We Collect</h2>
            <p>
              SL Beauty collects information necessary to process orders, manage merchant profiles, enforce regulatory compliance, and deliver AI diagnostic recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. How We Protect Your Data</h2>
            <p>
              We implement industry-standard encryption, strict access controls, and secure token lifecycle management to safeguard user data against unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Your Rights &amp; Choices</h2>
            <p>
              Users may request access to, correction of, or deletion of personal data at any time by contacting our support team or accessing account settings.
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
