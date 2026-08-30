import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, EmptyState, TopBar } from '@/components/ui';
import {
  getConstitutionChapterById,
  getConstitutionSections,
  type ConstitutionChapterRow,
  type ConstitutionSectionRow,
} from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';

interface ConstitutionChapterScreenProps {
  chapterId: string;
}

/** Lists the sections within one bundled Constitution chapter. */
export function ConstitutionChapterScreen({ chapterId }: ConstitutionChapterScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [chapter, setChapter] = useState<ConstitutionChapterRow | null>(null);
  const [sections, setSections] = useState<ConstitutionSectionRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found = await getConstitutionChapterById(chapterId);
      if (cancelled) return;
      setChapter(found);
      if (found) setSections(await getConstitutionSections(found.id));
    })();
    return () => {
      cancelled = true;
    };
  }, [chapterId]);

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <TopBar onBack={router.canGoBack() ? () => router.back() : undefined} />
        <EmptyState
          icon="alert-circle-outline"
          title={t('ask.emptyResults.title')}
          body={t('ask.emptyResults.body')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar title={t(chapter.title_key)} onBack={router.canGoBack() ? () => router.back() : undefined} />
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="labelSm" color={colors.textMuted}>
          {t('constitution.chapterSectionsHeading')}
        </AppText>
        {sections.map((section) => (
          <Pressable
            key={section.id}
            onPress={() => router.push(`/constitution/section/${section.id}`)}
            accessibilityRole="button"
            style={styles.row}>
            <View style={styles.numberBadge}>
              <AppText variant="labelSm" color={colors.primary}>
                {section.number}
              </AppText>
            </View>
            <AppText variant="bodyMd" style={styles.rowContent}>
              {t(section.heading_key)}
            </AppText>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  numberBadge: {
    // minWidth, not width: Chapter VII's ss. 254A-254F are four characters
    // wide, so the badge grows into a pill rather than clipping them.
    minWidth: 32,
    paddingHorizontal: spacing.xs,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
  },
});
