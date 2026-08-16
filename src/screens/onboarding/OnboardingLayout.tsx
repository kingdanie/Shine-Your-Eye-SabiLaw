import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, DotPagination } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

interface OnboardingLayoutProps {
  illustrationIcon: keyof typeof Ionicons.glyphMap;
  activeIndex: number;
  stepCount: number;
  onSkip?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  children: React.ReactNode;
}

/** Shared chrome for the 3 onboarding steps: illustration, skip, content, dots, CTA. */
export function OnboardingLayout({
  illustrationIcon,
  activeIndex,
  stepCount,
  onSkip,
  onNext,
  nextLabel,
  nextDisabled,
  children,
}: OnboardingLayoutProps) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {onSkip && (
        <View style={styles.skipRow}>
          <Button label={t('common.skip')} onPress={onSkip} variant="text" fullWidth={false} />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.illustrationWrap}>
          <Ionicons name={illustrationIcon} size={96} color={colors.primary} />
        </View>
        {children}
      </ScrollView>
      <View style={styles.footer}>
        <DotPagination count={stepCount} activeIndex={activeIndex} />
        <Button
          label={nextLabel ?? t('common.next')}
          onPress={onNext}
          disabled={nextDisabled}
          icon={<Ionicons name="arrow-forward" size={18} color={colors.onPrimary} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  skipRow: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.containerMargin,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.containerMargin,
    gap: spacing.md,
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: radius.full,
    backgroundColor: colors.secondaryContainer,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
});
