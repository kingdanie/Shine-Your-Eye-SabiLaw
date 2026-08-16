import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  valueLabel?: string;
  onPress: () => void;
}

export function SettingsRow({ icon, label, valueLabel, onPress }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <AppText variant="bodyMd" style={styles.label}>
        {label}
      </AppText>
      {valueLabel && (
        <AppText variant="labelSm" color={colors.textMuted}>
          {valueLabel}
        </AppText>
      )}
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.containerMargin,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  label: {
    flex: 1,
  },
  pressed: {
    backgroundColor: colors.surfaceContainerLow,
  },
});
