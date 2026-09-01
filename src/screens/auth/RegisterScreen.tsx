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

export function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signIn } = useProfile();
  const [identifier, setIdentifier] = useState('');

  const submit = async () => {
    if (!identifier.trim()) return;
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
            <Ionicons name="shield-checkmark" size={32} color={colors.onPrimary} />
          </View>
          <AppText variant="headlineMd" style={styles.center}>
            {t('auth.register.title')}
          </AppText>
          <AppText variant="bodyMd" color={colors.textSecondary} style={styles.center}>
            {t('auth.register.subtitle')}
          </AppText>

          <View style={styles.fieldGroup}>
            <AppText variant="labelSm">{t('auth.labelIdentifier')}</AppText>
            <TextField
              icon="person-outline"
              placeholder={t('auth.placeholderIdentifier')}
              accessibilityLabel={t('auth.labelIdentifier')}
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
          </View>

          <Button label={t('common.getStarted')} onPress={submit} disabled={!identifier.trim()} />

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <AppText variant="caption" color={colors.textMuted}>
              {t('common.orContinueWith')}
            </AppText>
            <View style={styles.dividerLine} />
          </View>

          <Button
            label={t('common.continueWithGoogle')}
            variant="secondary"
            onPress={() => showPlaceholderAlert('Google sign-in')}
            icon={<Ionicons name="logo-google" size={18} color={colors.primary} />}
          />
          <Button
            label={t('common.continueWithApple')}
            variant="secondary"
            onPress={() => showPlaceholderAlert('Apple sign-in')}
            icon={<Ionicons name="logo-apple" size={18} color={colors.primary} />}
          />

          <AppText variant="caption" color={colors.textMuted} style={styles.terms}>
            {t('auth.register.terms')}
          </AppText>

          <Pressable
            onPress={() => router.push('/(auth)/login')}
            accessibilityRole="button"
            accessibilityLabel={`${t('auth.register.haveAccount')} ${t('common.signIn')}`}
            style={styles.loginLink}>
            <AppText variant="labelSm" color={colors.textSecondary}>
              {t('auth.register.haveAccount')}{' '}
            </AppText>
            <AppText variant="labelSm" color={colors.primary}>
              {t('common.signIn')}
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
    // Matches LoginScreen: wider than the app-wide containerMargin because the
    // form is a single narrow column.
    paddingHorizontal: spacing.lg * 2,
    paddingTop: spacing.xl,
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  terms: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 44,
    alignItems: 'center',
  },
});
