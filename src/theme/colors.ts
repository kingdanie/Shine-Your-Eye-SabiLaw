/**
 * "Civic Green" design system — color tokens.
 *
 * Values are taken verbatim from the design system spec (Material Design 3
 * role naming). Where the spec's prose and its token table used slightly
 * different hex values for the same idea, the token table wins here and the
 * prose's intent is preserved as a semantic alias below (see comments).
 *
 * Single light theme only — no dark palette was specified.
 */

export const palette = {
  surface: '#f9f9f9',
  surfaceDim: '#dadada',
  surfaceBright: '#f9f9f9',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f3f3',
  surfaceContainer: '#eeeeee',
  surfaceContainerHigh: '#e8e8e8',
  surfaceContainerHighest: '#e2e2e2',
  onSurface: '#1a1c1c',
  onSurfaceVariant: '#3e4a41',
  inverseSurface: '#2f3131',
  inverseOnSurface: '#f1f1f1',
  outline: '#6e7a70',
  outlineVariant: '#bdcabe',
  surfaceTint: '#006d40',

  primary: '#006b3f',
  onPrimary: '#ffffff',
  primaryContainer: '#008751',
  onPrimaryContainer: '#fdfff9',
  inversePrimary: '#70db9d',

  secondary: '#4b6457',
  onSecondary: '#ffffff',
  secondaryContainer: '#cbe6d6',
  onSecondaryContainer: '#4f685b',

  tertiary: '#006b37',
  onTertiary: '#ffffff',
  tertiaryContainer: '#008747',
  onTertiaryContainer: '#fafff7',

  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  primaryFixed: '#8df8b7',
  primaryFixedDim: '#70db9d',
  onPrimaryFixed: '#002110',
  onPrimaryFixedVariant: '#00522f',

  secondaryFixed: '#cee9d9',
  secondaryFixedDim: '#b2cdbd',
  onSecondaryFixed: '#082016',
  onSecondaryFixedVariant: '#344c40',

  tertiaryFixed: '#5eff9c',
  tertiaryFixedDim: '#00e47d',
  onTertiaryFixed: '#00210d',
  onTertiaryFixedVariant: '#005229',

  background: '#f9f9f9',
  onBackground: '#1a1c1c',
  surfaceVariant: '#e2e2e2',

  // App-specific additions from the spec, outside the base M3 role set.
  emergencyCrimson: '#D9455F',
  guardianMuted: '#829A8E',
} as const;

/**
 * Semantic aliases mapping the raw palette onto how the spec's prose
 * describes usage, so screens read by intent rather than by hex-role name.
 *
 * - "Primary (#008751)" in the prose ("brand moments, primary actions") maps
 *   to `primaryContainer`, which is the token that is literally #008751 —
 *   `primary` (#006b3f) is the M3 role used for on-white button fills.
 * - "Tertiary (#00ED82) ... active states, links, pulse animations" maps to
 *   `tertiaryFixedDim` (#00e47d), the closest token to that vivid value —
 *   the base `tertiary` token is a dark green, not the vivid one.
 * - "Secondary (#0A2218) ... primary typography" isn't a literal token in
 *   the spec's table; `onSurface` (#1a1c1c, near-black) is the actual text
 *   color token and serves that role here.
 * - "Neutral (#F4F4F4) ... secondary surfaces and input fields" maps to
 *   `surfaceContainerLow` (#f3f3f3), the closest token.
 */
export const colors = {
  ...palette,

  textPrimary: palette.onSurface,
  textSecondary: palette.onSurfaceVariant,
  textMuted: palette.guardianMuted,
  textOnPrimary: palette.onPrimary,

  screenBackground: palette.background,
  surfaceInput: palette.surfaceContainerLow,
  surfaceCard: palette.surfaceContainerLowest,

  brandAccent: palette.primaryContainer, // the vivid "Nigerian Green" brand moment color
  liveAccent: palette.tertiaryFixedDim, // pulse / active / "live" indicator
  emergency: palette.emergencyCrimson,
  citationBorder: palette.guardianMuted,

  border: palette.outline,
  borderSubtle: palette.outlineVariant,
} as const;

export type ColorToken = keyof typeof colors;
