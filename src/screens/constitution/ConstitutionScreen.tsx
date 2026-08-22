import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, EmptyState, IconBadge, TextField, TopBar } from '@/components/ui';
import {
  getConstitutionChapters,
  searchConstitution,
  type ConstitutionChapterRow,
  type ConstitutionSectionRow,
} from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';

/** Chapter numbers not yet bundled — shown greyed-out with their real
 * titles (same `constitution.chapter.<n>.title` keys a bundled chapter
 * would use) so the app never implies completeness it doesn't have (see
 * AGENTS.md "Trust visible" principle). */
const UNBUNDLED_CHAPTER_NUMBERS = [5, 6, 7];

export function ConstitutionScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [chapters, setChapters] = useState<ConstitutionChapterRow[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ConstitutionSectionRow[] | null>(null);

  useEffect(() => {
    getConstitutionChapters().then(setChapters);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!query.trim()) {
      setResults(null);
      return;
    }
    searchConstitution(query).then((rows) => {
      if (!cancelled) setResults(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar
        title={t('constitution.title')}
        onBack={router.canGoBack() ? () => router.back() : undefined}
      />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppText variant="bodyMd" color={colors.textSecondary}>
          {t('constitution.subtitle')}
        </AppText>

        <TextField
          icon="search"
          placeholder={t('constitution.searchPlaceholder')}
          accessibilityLabel={t('constitution.searchPlaceholder')}
          value={query}
          onChangeText={setQuery}
        />

        {results !== null ? (
          <View style={styles.section}>
            <AppText variant="headlineSm">{t('constitution.searchResultsHeading')}</AppText>
            {results.length === 0 ? (
              <EmptyState
                icon="search-outline"
                title={t('constitution.emptySearch.title')}
                body={t('constitution.emptySearch.body')}
              />
            ) : (
              results.map((section) => (
                <Pressable
                  key={section.id}
                  onPress={() => router.push(`/constitution/section/${section.id}`)}
                  accessibilityRole="button"
                  style={styles.row}>
                  <View style={styles.rowContent}>
                    <AppText variant="labelSm" color={colors.textMuted}>
                      {t('constitution.sectionLabel', { number: section.number })}
                    </AppText>
                    <AppText variant="bodyMd">{t(section.heading_key)}</AppText>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </Pressable>
              ))
            )}
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <AppText variant="headlineSm">{t('constitution.availableHeading')}</AppText>
              {chapters.map((chapter) => (
                <Pressable
                  key={chapter.id}
                  onPress={() => router.push(`/constitution/${chapter.id}`)}
                  accessibilityRole="button"
                  style={styles.row}>
                  <IconBadge name="book-outline" size={44} iconSize={20} />
                  <AppText variant="bodyMd" style={styles.rowContent}>
                    {t(chapter.title_key)}
                  </AppText>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </Pressable>
              ))}
            </View>

            <View style={styles.section}>
              <AppText variant="headlineSm" color={colors.textMuted}>
                {t('constitution.comingSoonHeading')}
              </AppText>
              <AppText variant="caption" color={colors.textMuted} style={styles.comingSoonBody}>
                {t('constitution.comingSoonBody')}
              </AppText>
              {UNBUNDLED_CHAPTER_NUMBERS.map((number) => (
                <View key={number} style={styles.disabledRow}>
                  <IconBadge
                    name="lock-closed-outline"
                    size={44}
                    iconSize={18}
                    backgroundColor={colors.surfaceContainerLow}
                    iconColor={colors.textMuted}
                  />
                  <AppText variant="bodyMd" color={colors.textMuted} style={styles.rowContent}>
                    {t(`constitution.chapter.${number}.title`)}
                  </AppText>
                </View>
              ))}
            </View>
          </>
        )}
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
  section: {
    gap: spacing.xs,
    marginTop: spacing.md,
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
  disabledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingVertical: spacing.sm,
    opacity: 0.6,
  },
  rowContent: {
    flex: 1,
  },
  comingSoonBody: {
    marginBottom: spacing.xs,
  },
});
