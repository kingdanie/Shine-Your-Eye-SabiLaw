import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, TopBar } from '@/components/ui';
import { colors, spacing } from '@/theme';

/** Thin placeholder for settings rows not wired up in this MVP scaffold
 * (Account Information, Notification Preferences, Privacy & Security). */
export function PlaceholderSettingsScreen({
  title,
  icon,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar title={title} onBack={router.canGoBack() ? () => router.back() : undefined} />
      <View style={styles.content}>
        <Ionicons name={icon} size={40} color={colors.textMuted} />
        <AppText variant="bodyMd" color={colors.textSecondary} style={styles.text}>
          This section isn't available in the preview build yet.
        </AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  text: { textAlign: 'center' },
});
