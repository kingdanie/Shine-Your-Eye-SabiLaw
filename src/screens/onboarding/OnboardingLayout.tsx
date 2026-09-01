import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, type ImageSource } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, DotPagination } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

interface OnboardingLayoutProps {
  /** Glyph fallback for steps that don't have bespoke artwork yet. */
  illustrationIcon?: keyof typeof Ionicons.glyphMap;
  /**
   * Bespoke artwork for this step. Takes precedence over `illustrationIcon`,
   * and renders without the tinted circle — the artwork carries its own.
   */
  illustration?: ImageSource;
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
  illustration,
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
        {illustration ? (
          // Decorative: the step's title and body carry the meaning, so it stays
          // out of the screen-reader order.
          <Image
            source={illustration}
            style={styles.illustrationImage}
            contentFit="contain"
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          />
        ) : (
          illustrationIcon && (
            <View style={styles.illustrationWrap}>
              <Ionicons name={illustrationIcon} size={96} color={colors.primary} />
            </View>
          )
        )}
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
  illustrationImage: {
    alignSelf: 'center',
    // Caps at the icon-circle's 200px on a phone but scales down on short
    // screens rather than pushing the CTA off the bottom.
    width: '100%',
    maxWidth: 260,
    // Matches the source artwork's 1252x957 aspect so nothing letterboxes.
    aspectRatio: 1252 / 957,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
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
