/** Flat AsyncStorage keys — small preference flags only. Structured/queryable
 * content and activity live in SQLite instead (see src/db). */
export const STORAGE_KEYS = {
  language: 'kyr:language',
  hasSeenOnboarding: 'kyr:hasSeenOnboarding',
  interests: 'kyr:interests',
  profile: 'kyr:profile',
} as const;
