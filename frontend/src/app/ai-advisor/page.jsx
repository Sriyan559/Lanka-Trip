import Header from '@/components/layout/Header';
import AIAdvisorPageClient from '@/components/ai-advisor/AIAdvisorPageClient';

export const metadata = {
  title: 'SL Beauty AI Advisor | Personal Beauty Guidance',
  description: 'Ask beauty questions, build personalised routines, explore cosmetic ingredients, and discover suitable products from SL Beauty Platform.',
  alternates: { canonical: '/ai-advisor' },
  robots: { index: false, follow: false },
};

export default function AIAdvisorPage() {
  return <><Header /><AIAdvisorPageClient /></>;
}
