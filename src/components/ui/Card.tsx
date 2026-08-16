import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, elevation, radius, spacing } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
  /** "Fixed/Statutory Corners" — use for citation/legal-source content, per spec. */
  statutory?: boolean;
  noPadding?: boolean;
}

/** The "pillowy" 24px-radius, soft-shadow container used for most surfaces. */
export function Card({
  children,
  style,
  onPress,
  accessibilityLabel,
  statutory,
  noPadding,
}: CardProps) {
  const content = (
    <View
      style={[
        styles.base,
        statutory ? styles.statutory : styles.approachable,
        !noPadding && styles.padding,
        style,
      ]}>
      {children}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => pressed && styles.pressed}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  approachable: {
    borderRadius: radius.xl,
    ...elevation.card,
  },
  statutory: {
    borderRadius: radius.sm,
    borderColor: colors.citationBorder,
  },
  padding: {
    padding: spacing.lg,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
