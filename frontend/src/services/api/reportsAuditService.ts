import { mockSupportReports } from '@/mocks/admin/reportsAudit.mock';
import { SupportReportItem, ReportFilterParams } from '@/types/reportsAudit';

export async function fetchSupportReports(filters: ReportFilterParams = {}): Promise<SupportReportItem[]> {
  let list = [...mockSupportReports];

  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase();
    list = list.filter((r) => r.reportName.toLowerCase().includes(q) || r.reportId.toLowerCase().includes(q));
  }

  if (filters.reportType && filters.reportType !== 'All' && filters.reportType !== 'All Types') {
    list = list.filter((r) => r.reportType === filters.reportType);
  }

  if (filters.statusChip && filters.statusChip !== 'All') {
    if (filters.statusChip === 'Healthy') {
      list = list.filter((r) => r.status === 'Active');
    } else if (filters.statusChip === 'Failed Jobs') {
      list = list.filter((r) => r.status === 'Failed');
    }
  }

  return list;
}
