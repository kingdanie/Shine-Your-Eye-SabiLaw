import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';

interface VerdictCardProps {
  verdict: 'yes' | 'no' | null;
  shortAnswer: string;
}

/** "The Verdict Card" — 2px solid primary-green border, Zilla Slab Yes/No status,
 * per spec: "command immediate attention" for the headline result. */
export function VerdictCard({ verdict, shortAnswer }: VerdictCardProps) {
  const { t } = useTranslation();
  const statusLabel = verdict === 'yes' ? t('common.yes') : verdict === 'no' ? t('common.no') : null;

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons
          name={verdict === 'no' ? 'close-circle' : 'checkmark-circle'}
          size={22}
          color={colors.primary}
        />
      </View>
      <View style={styles.content}>
        <AppText variant="headlineSm" color={colors.primary}>
          {t('answer.shortAnswerLabel')}
          {statusLabel ? ` ${statusLabel}.` : ''}
        </AppText>
        <AppText variant="bodyMd" style={styles.body}>
          {shortAnswer}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceCard,
    padding: spacing.lg,
    marginHorizontal: spacing.containerMargin,
  },
  iconWrap: {
    paddingTop: 2,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  body: {
    marginTop: spacing.xs,
  },
});
