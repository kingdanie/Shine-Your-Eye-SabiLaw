import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/navigation/AppHeader';
import { AppText, Card, EmptyState, InquiryRow, SegmentedControl } from '@/components/ui';
import { useProfile } from '@/context';
import {
  getRecentlyViewed,
  getSaved,
  getTopics,
  type QAEntryWithActivity,
  type TopicId,
} from '@/db';
import { useTranslation } from '@/i18n';
import { colors, radius, spacing } from '@/theme';
import { formatDate } from '@/utils/formatDate';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const folderIllustration = require('@/assets/images/folder.webp');

type Segment = 'saved' | 'recent';

const FALLBACK_ICON = 'document-text-outline';

export function MyLegalInquiriesScreen({ initialSegment }: { initialSegment: Segment }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoggedIn } = useProfile();
  const [segment, setSegment] = useState<Segment>(initialSegment);
  const [saved, setSaved] = useState<QAEntryWithActivity[]>([]);
  const [recent, setRecent] = useState<QAEntryWithActivity[]>([]);
  // Each row shows its topic's glyph rather than one generic document icon, so
  // the list is scannable by topic at a glance. Sourced from the topics table
  // so it stays in step with the icons the Home grid uses.
  const [topicIcons, setTopicIcons] = useState<Partial<Record<TopicId, string>>>({});

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [savedList, recentList, topics] = await Promise.all([
          getSaved(),
          getRecentlyViewed(),
          getTopics(),
        ]);
        if (!cancelled) {
          setSaved(savedList);
          setRecent(recentList);
          setTopicIcons(Object.fromEntries(topics.map((topic) => [topic.id, topic.icon])));
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const savedIds = new Set(saved.map((e) => e.id));
  const list = segment === 'saved' ? saved : recent;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerWrap}>
        <AppHeader hasNotifications={recent.length > 0} />
      </View>

      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AppText variant="headlineMd" style={styles.title}>
            {t('saved.title')}
          </AppText>
          {/* TODO: not wired up yet — deliberately kept out of the accessibility
              tree until it does something, so screen-reader users aren't offered
              a button that goes nowhere. */}
          <View
            style={styles.searchButton}
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants">
            <Ionicons name="search" size={20} color={colors.textPrimary} />
          </View>
        </View>
        <AppText variant="bodyMd" color={colors.textSecondary}>
          {t('saved.subtitle')}
        </AppText>
      </View>

      <View style={styles.segmentWrap}>
        <SegmentedControl
          value={segment}
          onChange={(v) => setSegment(v as Segment)}
          segments={[
            { value: 'saved', label: t('saved.tabSaved'), icon: 'bookmark' },
            { value: 'recent', label: t('saved.tabRecent'), icon: 'time-outline' },
          ]}
        />
      </View>

      {!isLoggedIn && (
        <Card style={styles.signInCard}>
          <Ionicons name="person-circle-outline" size={28} color={colors.primary} />
          <View style={styles.signInText}>
            <AppText variant="labelMd">{t('saved.signInPrompt.title')}</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              {t('saved.signInPrompt.body')}
            </AppText>
          </View>
        </Card>
      )}

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon={segment === 'saved' ? 'bookmark-outline' : 'time-outline'}
            title={t(segment === 'saved' ? 'saved.emptySaved.title' : 'saved.emptyRecent.title')}
            body={t(segment === 'saved' ? 'saved.emptySaved.body' : 'saved.emptyRecent.body')}
          />
        }
        renderItem={({ item }) => (
          <InquiryRow
            icon={
              (topicIcons[item.topic_id] ?? FALLBACK_ICON) as keyof typeof Ionicons.glyphMap
            }
            question={t(item.question_key)}
            statusLabel={t('saved.status.answered')}
            timeLabel={formatDate(item.activityAt)}
            isSaved={savedIds.has(item.id)}
            onPress={() => router.push(`/answer/${item.id}`)}
          />
        )}
        ListFooterComponent={
          segment === 'saved' && list.length > 0 ? (
            <View
              accessibilityRole="text"
              accessibilityLabel={`${t('saved.tipTitle')}. ${t('saved.tipBody')}`}
              style={styles.tipCard}>
              <Image
                source={folderIllustration}
                style={styles.tipImage}
                contentFit="contain"
                accessible={false}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              />
              <View style={styles.tipText}>
                <AppText variant="labelMd">{t('saved.tipTitle')}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {t('saved.tipBody')}
                </AppText>
              </View>
              {/* TODO: same as the search button — drawn but not wired, so it
                  stays out of the accessibility tree until it has a destination. */}
              <View
                style={styles.tipArrow}
                accessible={false}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants">
                <Ionicons name="arrow-forward" size={20} color={colors.primary} />
              </View>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  headerWrap: {
    paddingHorizontal: spacing.containerMargin,
  },
  header: {
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.md,
    gap: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: {
    flex: 1,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  segmentWrap: {
    paddingHorizontal: spacing.containerMargin,
    marginTop: spacing.md,
  },
  signInCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.containerMargin,
    marginTop: spacing.md,
  },
  signInText: {
    flex: 1,
    gap: 2,
  },
  listContent: {
    paddingHorizontal: spacing.containerMargin,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    flexGrow: 1,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.secondaryContainer,
  },
  tipImage: {
    width: 72,
    aspectRatio: 1331 / 1182,
  },
  tipText: {
    flex: 1,
    gap: 2,
  },
  tipArrow: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceCard,
  },
});
