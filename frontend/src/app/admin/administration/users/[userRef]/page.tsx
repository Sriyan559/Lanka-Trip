'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { UserDetailPage } from '@/components/administration/users/user-detail/UserDetailPage';

/**
 * Screen ID: AD03
 * Screen Name: User Detail, Access & Activity
 * Module: Administration
 * Domain: Users & Identity
 * Primary Route: /admin/administration/users/[userRef]
 * Primary Developer Responsibility: Administration / Users & Identity / User Detail, Access & Activity
 */
export default function UserDetailRoute() {
  const params = useParams();
  const rawUserRef = params?.userRef;
  const userRef = Array.isArray(rawUserRef)
    ? rawUserRef[0]
    : typeof rawUserRef === 'string'
    ? rawUserRef
    : 'USR-2026-00842';

  return <UserDetailPage userRef={userRef} />;
}
