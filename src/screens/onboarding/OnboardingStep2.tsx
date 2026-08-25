import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { useTranslation, type LanguageCode } from '@/i18n';
import { setHasSeenOnboarding } from '@/storage';
import { colors, radius, spacing } from '@/theme';

import { OnboardingLayout } from './OnboardingLayout';

const OPTIONS: { code: LanguageCode; labelKey: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { code: 'en', labelKey: 'onboarding.step2.english', icon: 'globe-outline' },
  { code: 'pcm', labelKey: 'onboarding.step2.pidgin', icon: 'chatbubbles-outline' },
  { code: 'ha', labelKey: 'onboarding.step2.hausa', icon: 'chatbubbles-outline' },
  { code: 'ig', labelKey: 'onboarding.step2.igbo', icon: 'chatbubbles-outline' },
  { code: 'yo', labelKey: 'onboarding.step2.yoruba', icon: 'chatbubbles-outline' },
];

export function OnboardingStep2() {
  const router = useRouter();
  const { t, language, setLanguage } = useTranslation();
  const [selected, setSelected] = useState<LanguageCode>(language);

  const skip = async () => {
    await setHasSeenOnboarding();
    router.replace('/(tabs)/home');
  };

  const next = async () => {
    await setLanguage(selected);
    router.push('/onboarding/step-3');
  };

  return (
    <OnboardingLayout
      illustrationIcon="language-outline"
      activeIndex={1}
      stepCount={3}
      onSkip={skip}
      onNext={next}>
      <AppText variant="headlineLgMobile" style={styles.title}>
        {t('onboarding.step2.title')}
      </AppText>
      <AppText variant="bodyMd" color={colors.textSecondary} style={styles.body}>
        {t('onboarding.step2.body')}
      </AppText>
      <View style={styles.options}>
        {OPTIONS.map((opt) => {
          const active = opt.code === selected;
          return (
            <Pressable
              key={opt.code}
              onPress={() => setSelected(opt.code)}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              accessibilityLabel={t(opt.labelKey)}
              style={[styles.option, active && styles.optionActive]}>
              <Ionicons
                name={opt.icon}
                size={28}
                color={active ? colors.onPrimary : colors.primary}
              />
              <AppText variant="labelMd" color={active ? colors.onPrimary : colors.textPrimary}>
                {t(opt.labelKey)}
              </AppText>
              {active && (
                <Ionicons name="checkmark-circle" size={20} color={colors.onPrimary} style={styles.check} />
              )}
            </Pressable>
          );
        })}
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: { textAlign: 'center' },
  body: { textAlign: 'center', marginTop: spacing.sm, marginBottom: spacing.md },
  options: {
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 64,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.citationBorder,
    backgroundColor: colors.surfaceCard,
  },
  optionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  check: {
    marginLeft: 'auto',
  },
});
