import React from 'react';
import { Text, type TextProps } from 'react-native';

import { colors, typography, type TypographyToken } from '@/theme';

interface AppTextProps extends TextProps {
  variant?: TypographyToken;
  color?: string;
}

/**
 * Every screen renders text through this component rather than raw RN
 * `Text`, so the Zilla Slab / Work Sans scale and OS font-scaling behavior
 * (never disabled — see theme/accessibility notes) stay consistent app-wide.
 */
export function AppText({ variant = 'bodyMd', color = colors.textPrimary, style, ...rest }: AppTextProps) {
  return <Text style={[typography[variant], { color }, style]} {...rest} />;
}
