import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

interface CitationBadgeProps {
  act: string;
  section: string;
  onPress?: () => void;
}

/** "Fixed/Statutory Corners" (4px radius) — visually marks this as tied to the
 * actual law, distinct from the app's soft/rounded plain-language UI. */
export function CitationBadge({ act, section, onPress }: CitationBadgeProps) {
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${t('answer.citationPrefix')} ${act}, ${section}`}
      style={styles.badge}>
      <Ionicons name="document-text-outline" size={14} color={colors.citationBorder} />
      <View style={styles.textCol}>
        <AppText variant="caption" color={colors.textMuted}>
          {t('answer.citationPrefix')}
        </AppText>
        <AppText variant="labelSm" color={colors.textSecondary} numberOfLines={1}>
          {act}, {section}
        </AppText>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={16} color={colors.citationBorder} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.citationBorder,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  textCol: {
    flex: 1,
  },
});
