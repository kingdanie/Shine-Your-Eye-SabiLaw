import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { Pill } from './Pill';

interface OfflineBannerProps {
  /** 'saved': previously-viewed content shown from cache. 'unavailable': offline
   * and this content was never cached — a deliberately different, non-misleading state. */
  variant: 'saved' | 'unavailable';
}

export function OfflineBanner({ variant }: OfflineBannerProps) {
  const { t } = useTranslation();
  const isSaved = variant === 'saved';

  return (
    <View style={styles.row} accessibilityRole="text">
      <Ionicons name="cloud-offline-outline" size={22} color={colors.textSecondary} />
      <View style={styles.textCol}>
        <AppText variant="labelMd">
          {t(isSaved ? 'answer.offlineBannerTitle' : 'answer.offlineUnavailableTitle')}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {t(isSaved ? 'answer.offlineBannerBody' : 'answer.offlineUnavailableBody')}
        </AppText>
      </View>
      {isSaved && <Pill label={t('common.saved')} icon="checkmark" tone="brand" />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.containerMargin,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
});
