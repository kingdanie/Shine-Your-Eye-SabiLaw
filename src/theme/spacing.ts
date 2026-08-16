/** "Civic Green" spacing scale — 4px base unit. */
export const spacing = {
  base: 4,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  containerMargin: 20,
  gutter: 16,
  buttonHeight: 56,
} as const;

/** Dual-radius shape system: pillowy "approachable" curves vs sharp "statutory" corners. */
export const radius = {
  sm: 4, // "Fixed/Statutory Corners" — citation badges, legal code blocks
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24, // "Approachable Curves" — cards, search bars, primary buttons
  full: 9999, // circular — avatars, step numbers, voice FAB
} as const;

export const elevation = {
  card: {
    shadowColor: '#008751',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  sticky: {
    shadowColor: '#008751',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;
