import { redirect } from 'next/navigation';

export default function AdminSupportOperationsRedirectPage() {
  redirect('/admin/customer-support/cases');
}

