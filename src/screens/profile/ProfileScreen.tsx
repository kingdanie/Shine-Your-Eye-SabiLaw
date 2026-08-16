import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, Pill, SettingsRow } from '@/components/ui';
import { useProfile } from '@/context';
import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

export function ProfileScreen() {
  const router = useRouter();
  const { t, language } = useTranslation();
  const { profile, isLoggedIn, signOut } = useProfile();

  const confirmSignOut = () => {
    Alert.alert(t('profile.signOut'), undefined, [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('profile.signOut'), style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerPanel}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={40} color={colors.onPrimary} />
          </View>
          <AppText variant="headlineSm" color={colors.onPrimary} style={styles.center}>
            {isLoggedIn ? profile!.displayName : t('profile.guestName')}
          </AppText>
          {isLoggedIn && (
            <AppText variant="bodyMd" color={colors.onPrimary} style={styles.center}>
              {profile!.identifier}
            </AppText>
          )}
          {isLoggedIn && (
            <View style={styles.badgeWrap}>
              <Pill label={t('profile.verifiedBadge')} icon="checkmark-circle" tone="neutral" />
            </View>
          )}
        </View>

        <View style={styles.body}>
          {isLoggedIn ? (
            <Button
              label={t('profile.editProfile')}
              variant="secondary"
              onPress={() => Alert.alert(t('profile.editProfile'), 'Not available in this preview build.')}
            />
          ) : (
            <Button label={t('profile.signInCta')} onPress={() => router.push('/(auth)/register')} />
          )}

          <AppText variant="headlineSm" style={styles.settingsHeading}>
            {t('profile.settingsHeading')}
          </AppText>
          <View style={styles.settingsList}>
            <SettingsRow
              icon="person-outline"
              label={t('profile.accountInformation')}
              onPress={() => router.push('/(tabs)/profile/account-information')}
            />
            <SettingsRow
              icon="globe-outline"
              label={t('profile.language')}
              valueLabel={language === 'pcm' ? 'Pidgin' : 'English'}
              onPress={() => router.push('/(tabs)/profile/language')}
            />
            <SettingsRow
              icon="notifications-outline"
              label={t('profile.notificationPreferences')}
              onPress={() => router.push('/(tabs)/profile/notification-preferences')}
            />
            <SettingsRow
              icon="shield-outline"
              label={t('profile.privacySecurity')}
              onPress={() => router.push('/(tabs)/profile/privacy-security')}
            />
            <SettingsRow
              icon="help-buoy-outline"
              label={t('profile.helpSupport')}
              onPress={() => router.push('/(tabs)/profile/help-support')}
            />
          </View>

          {isLoggedIn && (
            <Button label={t('profile.signOut')} variant="text" onPress={confirmSignOut} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  scroll: { paddingBottom: spacing.xl },
  headerPanel: {
    backgroundColor: colors.primary,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xl * 2,
    borderBottomRightRadius: radius.xl * 2,
    alignItems: 'center',
    gap: spacing.xs,
  },
  avatarWrap: {
    width: 84,
    height: 84,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 3,
    borderColor: colors.onPrimary,
  },
  center: { textAlign: 'center' },
  badgeWrap: { marginTop: spacing.xs },
  body: {
    paddingHorizontal: spacing.containerMargin,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  settingsHeading: {
    marginTop: spacing.md,
  },
  settingsList: {
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
    overflow: 'hidden',
  },
});
