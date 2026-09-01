import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { setHasSeenOnboarding } from '@/storage';
import { colors, spacing } from '@/theme';

import { OnboardingLayout } from './OnboardingLayout';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stepIllustration = require('@/assets/images/onboarding-step-1.webp');

export function OnboardingStep1() {
  const router = useRouter();
  const { t } = useTranslation();

  const skip = async () => {
    await setHasSeenOnboarding();
    router.replace('/(tabs)/home');
  };

  return (
    <OnboardingLayout
      illustration={stepIllustration}
      activeIndex={0}
      stepCount={3}
      onSkip={skip}
      onNext={() => router.push('/onboarding/step-2')}>
      <AppText variant="headlineLgMobile" style={styles.title}>
        {t('onboarding.step1.title')}
      </AppText>
      <AppText variant="bodyMd" color={colors.textSecondary} style={styles.body}>
        {t('onboarding.step1.body')}
      </AppText>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
