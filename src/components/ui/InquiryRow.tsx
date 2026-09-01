import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { IconBadge } from './IconBadge';

interface InquiryRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  question: string;
  statusLabel: string;
  timeLabel: string;
  isSaved: boolean;
  onPress: () => void;
}

/** One card in the Saved/History/Recent-Activity lists — icon, question, status + time, bookmark. */
export function InquiryRow({
  icon,
  question,
  statusLabel,
  timeLabel,
  isSaved,
  onPress,
}: InquiryRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${question}. ${statusLabel}. ${timeLabel}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <IconBadge
        name={icon}
        size={44}
        iconSize={20}
        backgroundColor={colors.surfaceContainerLow}
      />
      <View style={styles.content}>
        <AppText variant="labelMd" numberOfLines={2}>
          {question}
        </AppText>
        <View style={styles.metaRow}>
          <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
          <AppText variant="caption" color={colors.textSecondary}>
            {statusLabel}
          </AppText>
          <AppText variant="caption" color={colors.textMuted}>
            ·
          </AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            {timeLabel}
          </AppText>
        </View>
      </View>
      <Ionicons
        name={isSaved ? 'bookmark' : 'bookmark-outline'}
        size={18}
        color={isSaved ? colors.primary : colors.textMuted}
      />
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    minHeight: 44,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    // The status line wraps rather than clipping when font scaling is turned up.
    flexWrap: 'wrap',
  },
  pressed: {
    backgroundColor: colors.surfaceContainerLow,
  },
});
