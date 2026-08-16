import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, TextField, TopBar } from '@/components/ui';
import { useProfile } from '@/context';
import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';

import { showPlaceholderAlert } from './authHelpers';

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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar onClose={() => router.back()} />
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

        <TextField
          icon="person-outline"
          placeholder={t('auth.login.placeholderIdentifier')}
          accessibilityLabel={t('auth.login.placeholderIdentifier')}
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          style={styles.field}
        />
        <TextField
          icon="lock-closed-outline"
          isPassword
          placeholder={t('auth.login.placeholderPassword')}
          accessibilityLabel={t('auth.login.placeholderPassword')}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={() => showPlaceholderAlert('Password reset')}
          style={styles.forgotRow}>
          <AppText variant="labelSm" color={colors.primary}>
            {t('auth.login.forgotPassword')}
          </AppText>
        </Pressable>

        <Button
          label={t('common.signIn')}
          onPress={submit}
          disabled={!identifier.trim() || !password}
        />

        <Pressable onPress={() => router.push('/(auth)/register')} style={styles.registerLink}>
          <AppText variant="labelSm" color={colors.textSecondary}>
            {t('auth.login.noAccount')}{' '}
          </AppText>
          <AppText variant="labelSm" color={colors.primary}>
            {t('auth.login.joinLink')}
          </AppText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
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
  field: { marginTop: spacing.md },
  forgotRow: {
    alignSelf: 'flex-end',
    minHeight: 44,
    justifyContent: 'center',
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 44,
    alignItems: 'center',
  },
});
