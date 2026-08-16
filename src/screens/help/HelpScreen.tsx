import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Linking, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, EmergencyCard, TopBar } from '@/components/ui';
import { getEmergencyContacts, type EmergencyContactRow } from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';

const CATEGORY_ORDER: EmergencyContactRow['category'][] = [
  'police',
  'human-rights',
  'legal-aid',
  'lawyer-directory',
];

/** Reached from the Home FAB (1 tap) or Profile → Help & Support (2 taps),
 * satisfying the PRD's "≤2 taps to help" requirement from either path. */
export function HelpScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<EmergencyContactRow[]>([]);

  useEffect(() => {
    getEmergencyContacts().then(setContacts);
  }, []);

  const call = (phone: string) => {
    const url = Platform.OS === 'web' ? `tel:${phone}` : `tel:${phone.replace(/[^\d+]/g, '')}`;
    Linking.openURL(url).catch(() => {});
  };

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    contacts: contacts.filter((c) => c.category === category),
  })).filter((g) => g.contacts.length > 0);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar title={t('help.title')} onBack={router.canGoBack() ? () => router.back() : undefined} />
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="bodyMd" color={colors.textSecondary}>
          {t('help.subtitle')}
        </AppText>

        {grouped.map((group) => (
          <View key={group.category} style={styles.group}>
            <AppText variant="headlineSm">
              {group.category === 'lawyer-directory'
                ? t('help.directoryHeading')
                : t('help.emergencyHeading')}
            </AppText>
            {group.contacts.map((c) => (
              <EmergencyCard
                key={c.id}
                title={t(c.name_key)}
                description={c.description_key ? t(c.description_key) : undefined}
                phone={c.phone}
                verified={c.is_verified === 1}
                onCall={() => call(c.phone)}
              />
            ))}
          </View>
        ))}

        <AppText variant="caption" color={colors.textMuted} style={styles.disclaimer}>
          {t('help.disclaimerNote')}
        </AppText>
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
  group: {
    gap: spacing.sm,
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
