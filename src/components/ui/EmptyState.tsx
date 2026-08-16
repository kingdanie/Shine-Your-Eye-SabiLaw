import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';
import { Button } from './Button';
import { IconBadge } from './IconBadge';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  ctaLabel?: string;
  onPressCta?: () => void;
}

/** Human, actionable empty/error state — never a bare "No results" or raw error. */
export function EmptyState({ icon, title, body, ctaLabel, onPressCta }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <IconBadge name={icon} size={64} iconSize={28} />
      <AppText variant="headlineSm" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="bodyMd" color={colors.textSecondary} style={styles.body}>
        {body}
      </AppText>
      {ctaLabel && onPressCta && (
        <Button label={ctaLabel} onPress={onPressCta} variant="secondary" fullWidth={false} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  body: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});
