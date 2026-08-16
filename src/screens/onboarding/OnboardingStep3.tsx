import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui';
import { getTopics, type TopicRow } from '@/db';
import { useTranslation } from '@/i18n';
import { setHasSeenOnboarding, setInterests, type TopicInterest } from '@/storage';
import { colors, radius, spacing } from '@/theme';

import { OnboardingLayout } from './OnboardingLayout';

export function OnboardingStep3() {
  const router = useRouter();
  const { t } = useTranslation();
  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [selected, setSelected] = useState<TopicInterest[]>([]);

  useEffect(() => {
    getTopics().then(setTopics);
  }, []);

  const toggle = (id: TopicInterest) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const finish = async () => {
    await setInterests(selected);
    await setHasSeenOnboarding();
    router.replace('/(tabs)/home');
  };

  return (
    <OnboardingLayout
      illustrationIcon="apps-outline"
      activeIndex={2}
      stepCount={3}
      onSkip={finish}
      onNext={finish}
      nextLabel={t('onboarding.step3.cta')}>
      <AppText variant="headlineLgMobile" style={styles.title}>
        {t('onboarding.step3.title')}
      </AppText>
      <AppText variant="bodyMd" color={colors.textSecondary} style={styles.body}>
        {t('onboarding.step3.body')}
      </AppText>
      <View style={styles.chipWrap}>
        {topics.map((topic) => {
          const active = selected.includes(topic.id);
          return (
            <Pressable
              key={topic.id}
              onPress={() => toggle(topic.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: active }}
              accessibilityLabel={t(topic.label_key)}
              style={[styles.chip, active && styles.chipActive]}>
              <Ionicons
                name={topic.icon as keyof typeof Ionicons.glyphMap}
                size={16}
                color={active ? colors.onPrimary : colors.primary}
              />
              <AppText variant="labelSm" color={active ? colors.onPrimary : colors.textPrimary}>
                {t(topic.label_key)}
              </AppText>
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
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.citationBorder,
    backgroundColor: colors.surfaceCard,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
