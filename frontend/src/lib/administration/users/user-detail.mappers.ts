import { UserDetailFullData, UserProfileData } from './user-detail.types';
import { DEFAULT_USER_DETAIL } from './user-detail.constants';

/**
 * Data transformation and lookup helpers for User Detail
 */
export function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatUserDetailForReference(userRef: string): UserDetailFullData {
  if (userRef === DEFAULT_USER_DETAIL.profile.userRef || !userRef) {
    return DEFAULT_USER_DETAIL;
  }

  // Generate customized copy if different userRef is provided
  const emailPrefix = userRef.toLowerCase().replace(/[^a-z0-9]/g, '.');
  const customizedProfile: UserProfileData = {
    ...DEFAULT_USER_DETAIL.profile,
    userRef: userRef,
    name: userRef.includes('00001') ? 'Elena Vance' :
          userRef.includes('00002') ? 'Anuradha Sen' :
          userRef.includes('00003') ? 'Nimal Perera' :
          userRef.includes('00004') ? 'Arun Silva' :
          userRef.includes('00005') ? 'Security Team' : 'Priya Kumar',
    email: `${emailPrefix}@slbeauty.com`,
  };

  return {
    ...DEFAULT_USER_DETAIL,
    profile: customizedProfile,
  };
}
