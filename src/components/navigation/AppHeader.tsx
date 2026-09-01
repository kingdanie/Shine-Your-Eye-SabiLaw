import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText, IconButton } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

interface AppHeaderProps {
  /** Shows the unread dot on the bell. */
  hasNotifications?: boolean;
}

// Deliberately carries no horizontal padding: on Home it sits inside an
// already-padded scroll container, and padding here would double up.

/**
 * The app's top bar — wordmark on the left, notifications and profile on the
 * right. Shared by every top-level tab screen so the wordmark doesn't drift
 * between them.
 */
export function AppHeader({ hasNotifications }: AppHeaderProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Ionicons name="business-outline" size={22} color={colors.primary} />
        <AppText variant="headlineSm">{t('common.appName')}</AppText>
      </View>
      <View style={styles.actions}>
        <IconButton
          name="notifications-outline"
          accessibilityLabel={t('common.notifications')}
          badge={hasNotifications}
        />
        <Pressable
          onPress={() => router.push('/(tabs)/profile')}
          accessibilityRole="button"
          accessibilityLabel={t('common.openProfile')}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={18} color={colors.onPrimary} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
