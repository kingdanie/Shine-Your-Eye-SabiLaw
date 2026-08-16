import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';
import { Card } from './Card';
import { IconBadge } from './IconBadge';

interface TopicCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description: string;
  onPress: () => void;
}

/** "Topic Card" — pillowy container, centered icon badge, label + one-line description. */
export function TopicCard({ icon, label, description, onPress }: TopicCardProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={label} style={styles.card}>
      <View style={styles.inner}>
        <IconBadge name={icon} size={44} iconSize={22} />
        <AppText variant="labelMd" numberOfLines={1}>
          {label}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary} numberOfLines={2}>
          {description}
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
  },
  inner: {
    gap: spacing.xs,
  },
});
