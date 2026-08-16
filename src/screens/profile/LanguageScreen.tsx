import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, TopBar } from '@/components/ui';
import { useTranslation, type LanguageCode } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

const OPTIONS: { code: LanguageCode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { code: 'en', label: 'English', icon: 'globe-outline' },
  { code: 'pcm', label: 'Pidgin', icon: 'chatbubbles-outline' },
  { code: 'ha', label: 'Hausa', icon: 'chatbubbles-outline' },
  { code: 'ig', label: 'Igbo', icon: 'chatbubbles-outline' },
  { code: 'yo', label: 'Yorùbá', icon: 'chatbubbles-outline' },
];

export function LanguageScreen() {
  const router = useRouter();
  const { t, language, setLanguage } = useTranslation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar title={t('profile.language')} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.list}>
        {OPTIONS.map((opt) => {
          const active = opt.code === language;
          return (
            <Pressable
              key={opt.code}
              onPress={() => setLanguage(opt.code)}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              accessibilityLabel={opt.label}
              style={[styles.option, active && styles.optionActive]}>
              <Ionicons name={opt.icon} size={22} color={active ? colors.onPrimary : colors.primary} />
              <AppText variant="bodyMd" color={active ? colors.onPrimary : colors.textPrimary} style={styles.label}>
                {opt.label}
              </AppText>
              {active && <Ionicons name="checkmark" size={20} color={colors.onPrimary} />}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  list: {
    paddingHorizontal: spacing.containerMargin,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  optionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: { flex: 1 },
});
