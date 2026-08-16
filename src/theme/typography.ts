/**
 * "Civic Green" typography scale.
 * Headlines: Zilla Slab (scholarly, sturdy — "asserts authority").
 * Body/labels: Work Sans (clarity, legibility under pressure).
 *
 * Font family names below must match the loaded expo-font names in
 * `src/theme/fonts.ts` exactly.
 */

export const fontFamilies = {
  headline: 'ZillaSlab_700Bold',
  body: 'WorkSans_400Regular',
  bodyMedium: 'WorkSans_500Medium',
  labelSemiBold: 'WorkSans_600SemiBold',
} as const;

type TextStyleToken = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
};

export const typography: Record<string, TextStyleToken> = {
  headlineLg: {
    fontFamily: fontFamilies.headline,
    fontSize: 32,
    lineHeight: 32 * 1.2,
  },
  headlineLgMobile: {
    fontFamily: fontFamilies.headline,
    fontSize: 28,
    lineHeight: 28 * 1.2,
  },
  headlineMd: {
    fontFamily: fontFamilies.headline,
    fontSize: 24,
    lineHeight: 24 * 1.3,
  },
  headlineSm: {
    fontFamily: fontFamilies.headline,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  bodyLg: {
    fontFamily: fontFamilies.body,
    fontSize: 18,
    lineHeight: 18 * 1.6,
  },
  bodyMd: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  labelMd: {
    fontFamily: fontFamilies.labelSemiBold,
    fontSize: 16,
    lineHeight: 16 * 1.2,
    letterSpacing: 0.32, // 0.02em @ 16px
  },
  labelSm: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    lineHeight: 14 * 1.2,
  },
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 12 * 1.4,
  },
  inputActive: {
    fontFamily: fontFamilies.body,
    fontSize: 24,
    lineHeight: 24 * 1.2,
  },
};

export type TypographyToken = keyof typeof typography;
