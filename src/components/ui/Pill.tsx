import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

type PillTone = 'brand' | 'neutral' | 'emergency';

interface PillProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  tone?: PillTone;
}

/** Small filled pill — status badges ("Verified Citizen", "✓ Saved", "Answered"). */
export function Pill({ label, icon, tone = 'brand' }: PillProps) {
  const t = toneStyles[tone];
  return (
    <View style={[styles.base, t.container]}>
      {icon && <Ionicons name={icon} size={14} color={t.text.color as string} />}
      <AppText variant="labelSm" color={t.text.color as string}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
});

const toneStyles = {
  brand: StyleSheet.create({
    container: { backgroundColor: colors.secondaryContainer },
    text: { color: colors.onSecondaryContainer },
  }),
  neutral: StyleSheet.create({
    container: { backgroundColor: colors.surfaceContainer },
    text: { color: colors.textSecondary },
  }),
  emergency: StyleSheet.create({
    container: { backgroundColor: colors.errorContainer },
    text: { color: colors.onErrorContainer },
  }),
};
