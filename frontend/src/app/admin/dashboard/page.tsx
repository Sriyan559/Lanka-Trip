import { DashboardOverview } from '@/components/admin/dashboard/DashboardOverview';
import { PageHeader } from '@/components/admin/layout/PageHeader';

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Executive Command Center"
        description="Verified operational information from the SL Beauty database."
        crumbs={['Admin', 'Dashboard']}
      />
      <DashboardOverview />
    </>
  );
}
