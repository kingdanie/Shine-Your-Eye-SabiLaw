export type TopicInterest = 'police' | 'tenancy' | 'work' | 'family' | 'consumer' | 'business';

/**
 * Local-only mock profile. Written after the mock Registration/Login flow —
 * no backend involved, "isLoggedIn" is simply "does this exist".
 */
export interface MockProfile {
  displayName: string;
  identifier: string; // phone or email as typed at registration/login
  createdAt: number;
}
