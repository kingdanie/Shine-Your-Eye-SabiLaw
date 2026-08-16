import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Card, EmptyState, InquiryRow, SegmentedControl } from '@/components/ui';
import { useProfile } from '@/context';
import { getRecentlyViewed, getSaved, type QAEntryWithActivity } from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';
import { relativeTime } from '@/utils/relativeTime';

type Segment = 'saved' | 'recent';

export function MyLegalInquiriesScreen({ initialSegment }: { initialSegment: Segment }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoggedIn } = useProfile();
  const [segment, setSegment] = useState<Segment>(initialSegment);
  const [saved, setSaved] = useState<QAEntryWithActivity[]>([]);
  const [recent, setRecent] = useState<QAEntryWithActivity[]>([]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [savedList, recentList] = await Promise.all([getSaved(), getRecentlyViewed()]);
        if (!cancelled) {
          setSaved(savedList);
          setRecent(recentList);
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
      <View style={styles.header}>
        <AppText variant="headlineMd">{t('saved.title')}</AppText>
        <AppText variant="bodyMd" color={colors.textSecondary}>
          {t('saved.subtitle')}
        </AppText>
      </View>

      <View style={styles.segmentWrap}>
        <SegmentedControl
          value={segment}
          onChange={(v) => setSegment(v as Segment)}
          segments={[
            { value: 'saved', label: t('saved.tabSaved') },
            { value: 'recent', label: t('saved.tabRecent') },
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
            icon="document-text-outline"
            question={t(item.question_key)}
            statusLabel={t('saved.status.answered')}
            timeLabel={relativeTime(item.activityAt)}
            isSaved={savedIds.has(item.id)}
            onPress={() => router.push(`/answer/${item.id}`)}
          />
        )}
        ListFooterComponent={
          segment === 'saved' && list.length > 0 ? (
            <Card style={styles.tipCard}>
              <Ionicons name="bookmark" size={22} color={colors.primary} />
              <View style={styles.signInText}>
                <AppText variant="labelMd">{t('saved.tipTitle')}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {t('saved.tipBody')}
                </AppText>
              </View>
            </Card>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  header: {
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.sm,
    gap: spacing.xs,
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
    paddingVertical: spacing.md,
    flexGrow: 1,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.containerMargin,
    marginTop: spacing.sm,
  },
});
