import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';
import { useTranslation } from '@/i18n';

import { AppText } from './AppText';

/**
 * The single "this isn't legal advice" component — used everywhere an
 * answer is shown, per the design principle that trust/safety copy must
 * always be visible, never hidden behind a tap. Screen readers must always
 * announce it (accessibilityRole="text"), not skip past it as decorative.
 */
export function Disclaimer() {
  const { t } = useTranslation();
  return (
    <View style={styles.row} accessibilityRole="text">
      <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
      <AppText variant="caption" color={colors.textMuted} style={styles.text}>
        {t('disclaimer.text')}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    paddingHorizontal: spacing.containerMargin,
    paddingVertical: spacing.sm,
  },
  text: {
    flex: 1,
  },
});
