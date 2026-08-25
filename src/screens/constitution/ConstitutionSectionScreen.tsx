import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Card, EmptyState, TopBar } from '@/components/ui';
import { getConstitutionChapterById, getConstitutionSectionById, type ConstitutionSectionRow } from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';

interface ConstitutionSectionScreenProps {
  sectionId: string;
}

/** Full text of one Constitution section — bundled content, so it's always
 * available offline (no OfflineBanner needed, unlike the future live-AI
 * Answer flow: this is shipped with the app, not fetched). */
export function ConstitutionSectionScreen({ sectionId }: ConstitutionSectionScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [section, setSection] = useState<ConstitutionSectionRow | null>(null);
  const [chapterTitleKey, setChapterTitleKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found = await getConstitutionSectionById(sectionId);
      if (cancelled) return;
      setSection(found);
      if (found) {
        const chapter = await getConstitutionChapterById(found.chapter_id);
        if (!cancelled) setChapterTitleKey(chapter?.title_key ?? null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sectionId]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar
        title={section ? t('constitution.sectionLabel', { number: section.number }) : undefined}
        onBack={router.canGoBack() ? () => router.back() : undefined}
      />
      {!section ? (
        <EmptyState
          icon="alert-circle-outline"
          title={t('ask.emptyResults.title')}
          body={t('ask.emptyResults.body')}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {chapterTitleKey && (
            <AppText variant="labelSm" color={colors.textMuted}>
              {t(chapterTitleKey)}
            </AppText>
          )}
          <AppText variant="headlineMd">{t(section.heading_key)}</AppText>

          <Card statutory style={styles.sourceCard}>
            <AppText variant="bodyLg">{t(section.body_key)}</AppText>
          </Card>

          <View style={styles.footnoteBlock}>
            <AppText variant="caption" color={colors.textMuted}>
              {t('constitution.readSourceNote')}
            </AppText>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  sourceCard: {
    marginTop: spacing.sm,
  },
  footnoteBlock: {
    marginTop: spacing.md,
  },
});
