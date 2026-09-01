import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Card, IconButton, InquiryRow, TopicCard } from '@/components/ui';
import { FloatingHelpButton } from '@/components/navigation/FloatingHelpButton';
import { useProfile } from '@/context';
import { getRecentlyViewed, getTopics, type QAEntryWithActivity, type TopicRow } from '@/db';
import { useTranslation } from '@/i18n';
import { getInterests } from '@/storage';
import { colors, radius, spacing } from '@/theme';
import { relativeTime } from '@/utils/relativeTime';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const heroIllustration = require('@/assets/images/Sabilaw.webp');

export function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { profile } = useProfile();
  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [recent, setRecent] = useState<QAEntryWithActivity[]>([]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [allTopics, interests, recentlyViewed] = await Promise.all([
          getTopics(),
          getInterests(),
          getRecentlyViewed(3),
        ]);
        if (cancelled) return;
        // Personalize order per onboarding interests without hiding the rest.
        const ordered = interests.length
          ? [...allTopics].sort((a, b) => {
              const aIn = interests.includes(a.id) ? 0 : 1;
              const bIn = interests.includes(b.id) ? 0 : 1;
              return aIn - bIn;
            })
          : allTopics;
        setTopics(ordered);
        setRecent(recentlyViewed);
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const greetingName = profile?.displayName ?? t('profile.guestName');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Ionicons name="business-outline" size={22} color={colors.primary} />
            <AppText variant="headlineSm">{t('common.appName')}</AppText>
          </View>
          <View style={styles.headerActions}>
            <IconButton name="notifications-outline" accessibilityLabel="Notifications" badge={recent.length > 0} />
            <Pressable onPress={() => router.push('/(tabs)/profile')} accessibilityLabel="Open profile">
              <View style={styles.avatar}>
                <Ionicons name="person" size={18} color={colors.onPrimary} />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroText}>
            <AppText variant="headlineMd" style={styles.greeting}>
              {t('home.greeting', { name: greetingName })}
            </AppText>
            <AppText variant="bodyMd" color={colors.textSecondary}>
              {t('home.subtitle')}
            </AppText>
          </View>
          {/* Decorative only — the greeting beside it carries the meaning, so it stays
              out of the screen-reader order. */}
          <Image
            source={heroIllustration}
            style={styles.heroImage}
            contentFit="contain"
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          />
        </View>

        <Pressable
          onPress={() => router.push('/ask')}
          accessibilityRole="button"
          accessibilityLabel={t('home.searchPlaceholder')}
          style={styles.searchBar}>
          <Ionicons name="sparkles-outline" size={18} color={colors.primary} />
          <AppText variant="bodyMd" color={colors.textMuted} style={styles.searchPlaceholder}>
            {t('home.searchPlaceholder')}
          </AppText>
          <Ionicons name="mic-outline" size={20} color={colors.primary} />
          <Ionicons name="search" size={20} color={colors.primary} />
        </Pressable>

        <View style={styles.sectionHeaderRow}>
          <AppText variant="headlineSm">{t('home.exploreTopics')}</AppText>
        </View>
        <View style={styles.topicGrid}>
          {topics.map((topic) => (
            <View key={topic.id} style={styles.topicCell}>
              <TopicCard
                icon={topic.icon as keyof typeof Ionicons.glyphMap}
                label={t(topic.label_key)}
                description={t(topic.description_key)}
                onPress={() => router.push(`/topic/${topic.id}`)}
              />
            </View>
          ))}
        </View>

        <Card
          style={styles.banner}
          onPress={() => router.push('/constitution')}
          accessibilityLabel={t('home.constitutionCardTitle')}>
          <View style={styles.bannerIcon}>
            <Ionicons name="book" size={22} color={colors.onPrimary} />
          </View>
          <View style={styles.bannerText}>
            <AppText variant="labelMd" color={colors.primary}>
              {t('home.constitutionCardTitle')}
            </AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              {t('home.constitutionCardBody')}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </Card>

        <Card style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons name="shield-checkmark" size={22} color={colors.onPrimary} />
          </View>
          <View style={styles.bannerText}>
            <AppText variant="labelMd" color={colors.primary}>
              {t('home.bannerTitle')}
            </AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              {t('home.bannerBody')}
            </AppText>
          </View>
          <Pressable onPress={() => router.push('/help')} accessibilityRole="button">
            <AppText variant="labelSm" color={colors.primary}>
              {t('home.bannerCta')}
            </AppText>
          </Pressable>
        </Card>

        <View style={styles.sectionHeaderRow}>
          <AppText variant="headlineSm">{t('home.recentActivity')}</AppText>
        </View>
        {recent.length === 0 ? (
          <AppText variant="bodyMd" color={colors.textSecondary} style={styles.emptyRecent}>
            {t('home.emptyRecent')}
          </AppText>
        ) : (
          recent.map((entry) => (
            <InquiryRow
              key={entry.id}
              icon="document-text-outline"
              question={t(entry.question_key)}
              statusLabel={t('saved.status.answered')}
              timeLabel={relativeTime(entry.activityAt)}
              isSaved={false}
              onPress={() => router.push(`/answer/${entry.id}`)}
            />
          ))
        )}
      </ScrollView>

      <FloatingHelpButton onPress={() => router.push('/help')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  scroll: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl * 2,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroText: {
    flex: 1,
    gap: spacing.xs,
  },
  greeting: {
    marginTop: spacing.sm,
  },
  heroImage: {
    width: '34%',
    // Matches the source artwork's 1389×944 aspect so nothing letterboxes.
    aspectRatio: 1389 / 944,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  searchPlaceholder: {
    flex: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  topicCell: {
    width: '47%',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
    gap: 2,
  },
  emptyRecent: {
    paddingHorizontal: spacing.sm,
  },
});
