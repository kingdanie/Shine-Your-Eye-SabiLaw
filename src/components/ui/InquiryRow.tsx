import { Ionicons } from '@expo/vector-icons';
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

/** One row in the Saved/History/Recent-Activity lists — icon, question, status + time, bookmark. */
export function InquiryRow({ icon, question, statusLabel, timeLabel, isSaved, onPress }: InquiryRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={question}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <IconBadge name={icon} size={44} iconSize={20} />
      <View style={styles.content}>
        <AppText variant="labelMd" numberOfLines={2}>
          {question}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {statusLabel} · {timeLabel}
        </AppText>
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
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.containerMargin,
    borderRadius: radius.lg,
    minHeight: 44,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    backgroundColor: colors.surfaceContainerLow,
  },
});
