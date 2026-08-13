import { BeautyWellnessOverview } from '@/components/admin/beauty-wellness/BeautyWellnessOverview';
import { PageHeader } from '@/components/admin/layout/PageHeader';

export default function BeautyWellness() {
  return (
    <>
      <PageHeader
        title="Beauty & Wellness Hub"
        description="Comprehensive analytics and management for beauty and wellness services."
        crumbs={['Admin', 'Beauty & Wellness']}
      />
      <BeautyWellnessOverview />
    </>
  );
}
