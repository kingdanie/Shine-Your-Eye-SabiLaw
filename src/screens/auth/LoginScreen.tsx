import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, TextField, TopBar } from '@/components/ui';
import { useProfile } from '@/context';
import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

import { showPlaceholderAlert } from './authHelpers';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const footerArtwork = require('@/assets/images/login-footer.webp');

export function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signIn } = useProfile();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!identifier.trim() || !password) return;
    await signIn(identifier.trim());
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Full-bleed behind the safe area so the wave meets the bottom edge of
          the screen rather than stopping at the home-indicator inset.
          Decorative, and non-interactive so it can't swallow taps. */}
      <View style={styles.footerArtworkWrap} pointerEvents="none">
        <Image
          source={footerArtwork}
          style={styles.footerArtwork}
          contentFit="cover"
          contentPosition="bottom"
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <TopBar onClose={router.canGoBack() ? () => router.back() : undefined} />
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.badge}>
            <Ionicons name="scale" size={30} color={colors.onPrimary} />
          </View>
          <AppText variant="headlineMd" style={styles.center}>
            {t('auth.login.title')}
          </AppText>
          <AppText variant="bodyMd" color={colors.textSecondary} style={styles.center}>
            {t('auth.login.subtitle')}
          </AppText>

          <View style={styles.fieldGroup}>
            <AppText variant="labelSm">{t('auth.login.labelIdentifier')}</AppText>
            <TextField
              icon="person-outline"
              placeholder={t('auth.login.placeholderIdentifier')}
              accessibilityLabel={t('auth.login.labelIdentifier')}
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <AppText variant="labelSm">{t('auth.login.labelPassword')}</AppText>
              <Pressable
                onPress={() => showPlaceholderAlert('Password reset')}
                accessibilityRole="button"
                accessibilityLabel={t('auth.login.forgotPassword')}
                hitSlop={12}>
                <AppText variant="labelSm" color={colors.primary}>
                  {t('auth.login.forgotPassword')}
                </AppText>
              </Pressable>
            </View>
            <TextField
              icon="lock-closed-outline"
              isPassword
              placeholder={t('auth.login.placeholderPassword')}
              accessibilityLabel={t('auth.login.labelPassword')}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Button
            label={t('common.signIn')}
            onPress={submit}
            disabled={!identifier.trim() || !password}
          />

          <View style={styles.divider} />

          <Pressable
            onPress={() => router.push('/(auth)/register')}
            accessibilityRole="button"
            accessibilityLabel={`${t('auth.login.noAccount')} ${t('auth.login.joinLink')}`}
            style={styles.registerLink}>
            <AppText variant="labelSm" color={colors.textSecondary}>
              {t('auth.login.noAccount')}
            </AppText>
            <AppText variant="labelMd" color={colors.primary}>
              {t('auth.login.joinLink')}
            </AppText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  safeArea: { flex: 1 },
  footerArtworkWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerArtwork: {
    width: '100%',
    // Matches the source artwork's 1860x751 aspect so the wave isn't squashed.
    aspectRatio: 1860 / 751,
  },
  content: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  badge: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  center: { textAlign: 'center' },
  fieldGroup: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginTop: spacing.lg,
  },
  registerLink: {
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 44,
    justifyContent: 'center',
  },
});
