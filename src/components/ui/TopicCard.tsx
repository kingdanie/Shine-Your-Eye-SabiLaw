import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { AppText } from './AppText';
import { Card } from './Card';
import { IconBadge } from './IconBadge';

interface TopicCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description: string;
  onPress: () => void;
}

/**
 * "Topic Card" — pillowy container with a centered icon badge, label and
 * description. Fills its grid cell's height so a row of cards reads as one
 * band rather than a ragged edge.
 */
export function TopicCard({ icon, label, description, onPress }: TopicCardProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={label} fill style={styles.card}>
      <View style={styles.inner}>
        <IconBadge name={icon} size={44} iconSize={22} />
        <AppText variant="labelMd" numberOfLines={1} style={styles.centered}>
          {label}
        </AppText>
        <AppText
          variant="caption"
          color={colors.textSecondary}
          numberOfLines={2}
          style={styles.description}>
          {description}
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 0,
  },
  inner: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  centered: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    // Reserve both lines even when the copy only fills one, so cards match
    // across rows too and not just within a row. Derived from the type token
    // rather than hardcoded, and a floor rather than a fixed height, so OS
    // font scaling can still grow it.
    minHeight: typography.caption.lineHeight * 2,
  },
});
