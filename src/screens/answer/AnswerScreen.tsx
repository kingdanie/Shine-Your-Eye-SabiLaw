import Ionicons from '@expo/vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppText,
  Button,
  CitationBadge,
  Disclaimer,
  EmptyState,
  IconButton,
  OfflineBanner,
  TopBar,
  VerdictCard,
} from '@/components/ui';
import {
  getQAById,
  getQAByIds,
  hasBeenViewed,
  isSaved as isSavedQuery,
  recordView,
  toggleSaved,
  type QAEntry,
} from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';

import { WhyItMattersList } from './WhyItMattersList';

interface AnswerScreenProps {
  qaId: string;
}

export function AnswerScreen({ qaId }: AnswerScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [entry, setEntry] = useState<QAEntry | null>(null);
  const [related, setRelated] = useState<QAEntry[]>([]);
  const [saved, setSaved] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [wasViewedBefore, setWasViewedBefore] = useState(true);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [qa, alreadyViewed, netState] = await Promise.all([
        getQAById(qaId),
        hasBeenViewed(qaId),
        NetInfo.fetch(),
      ]);
      if (cancelled) return;
      setEntry(qa);
      setWasViewedBefore(alreadyViewed);
      setIsOnline(!!netState.isConnected);
      if (qa) {
        setSaved(await isSavedQuery(qaId));
        setRelated(await getQAByIds(qa.relatedIds));
        await recordView(qaId);
      }
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [qaId]);

  const onToggleSaved = async () => {
    const next = await toggleSaved(qaId);
    setSaved(next);
  };

  const onShare = () => {
    if (!entry) return;
    if (Platform.OS === 'web') return; // Share API is unreliable on web; icon is a no-op there.
    Share.share({ message: `${t(entry.question_key)}\n\n${t(entry.short_answer_key)}` }).catch(() => {});
  };

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <TopBar title={t('answer.title')} onBack={router.canGoBack() ? () => router.back() : undefined} />
      </SafeAreaView>
    );
  }

  if (!entry) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <TopBar title={t('answer.title')} onBack={router.canGoBack() ? () => router.back() : undefined} />
        <EmptyState
          icon="alert-circle-outline"
          title={t('ask.emptyResults.title')}
          body={t('ask.emptyResults.body')}
        />
      </SafeAreaView>
    );
  }

  const showOfflineBanner = !isOnline;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar
        title={t('answer.title')}
        onBack={router.canGoBack() ? () => router.back() : undefined}
        rightSlot={
          <>
            <IconButton
              name={saved ? 'bookmark' : 'bookmark-outline'}
              accessibilityLabel={t('common.save')}
              color={saved ? colors.primary : colors.textPrimary}
              onPress={onToggleSaved}
            />
            <IconButton name="share-outline" accessibilityLabel="Share" onPress={onShare} />
          </>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        {showOfflineBanner && (
            <View style={styles.section}>
              <OfflineBanner variant={wasViewedBefore ? 'saved' : 'unavailable'} />
            </View>
          )}

          <View style={styles.questionRow}>
            <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
            <AppText variant="headlineMd" color={colors.primary} style={styles.questionText}>
              {t(entry.question_key)}
            </AppText>
          </View>

          <VerdictCard verdict={entry.verdict} shortAnswer={t(entry.short_answer_key)} />

          <View style={styles.section}>
            <AppText variant="headlineSm" style={styles.whyHeading}>
              {t('answer.whyHeading')}
            </AppText>
            <WhyItMattersList steps={entry.whyItMatters} resolveText={t} />
          </View>

          {entry.tip_key && (
            <View style={[styles.section, styles.tipCard]}>
              <Ionicons name="bulb" size={20} color={colors.primary} />
              <AppText variant="bodyMd" style={styles.tipText}>
                {t(entry.tip_key)}
              </AppText>
            </View>
          )}

          <View style={styles.section}>
            <CitationBadge
              act={entry.citation_act}
              section={entry.citation_section}
              onPress={() => router.push(`/source/${entry.id}`)}
            />
          </View>

          <Pressable
            onPress={() => router.push(`/source/${entry.id}`)}
            accessibilityRole="button"
            style={styles.readMoreRow}>
            <Ionicons name="book-outline" size={20} color={colors.primary} />
            <View style={styles.readMoreText}>
              <AppText variant="labelMd">{t('answer.readMore')}</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                {t('answer.readMoreBody')}
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <View style={styles.section}>
            <Disclaimer />
          </View>

          <View style={[styles.section, styles.feedbackRow]}>
            <AppText variant="labelMd">{t('answer.feedbackPrompt')}</AppText>
            <View style={styles.feedbackButtons}>
              <IconButton
                name={feedback === 'up' ? 'thumbs-up' : 'thumbs-up-outline'}
                accessibilityLabel="Yes, this helped"
                color={feedback === 'up' ? colors.primary : colors.textMuted}
                onPress={() => setFeedback('up')}
              />
              <IconButton
                name={feedback === 'down' ? 'thumbs-down' : 'thumbs-down-outline'}
                accessibilityLabel="No, this didn't help"
                color={feedback === 'down' ? colors.emergency : colors.textMuted}
                onPress={() => setFeedback('down')}
              />
            </View>
          </View>

          {related.length > 0 && (
            <View style={styles.section}>
              <AppText variant="headlineSm" style={styles.whyHeading}>
                {t('answer.relatedHeading')}
              </AppText>
              {related.map((r) => (
                <Pressable
                  key={r.id}
                  onPress={() => router.push(`/answer/${r.id}`)}
                  style={styles.relatedRow}
                  accessibilityRole="button">
                  <AppText variant="bodyMd" color={colors.primary} style={styles.relatedText}>
                    {t(r.question_key)}
                  </AppText>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </Pressable>
              ))}
            </View>
          )}
      </ScrollView>

      {entry.isHighStakes && (
        <View style={styles.ctaFooter}>
          <Button
            label={t('answer.talkToLawyer')}
            onPress={() => router.push('/help')}
            icon={<Ionicons name="call" size={18} color={colors.onPrimary} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  scroll: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.containerMargin,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.containerMargin,
  },
  questionText: {
    flex: 1,
  },
  whyHeading: {
    marginBottom: spacing.md,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.secondaryContainer,
    borderRadius: spacing.md,
    marginHorizontal: spacing.containerMargin,
    padding: spacing.md,
  },
  tipText: {
    flex: 1,
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 44,
    paddingHorizontal: spacing.containerMargin,
  },
  readMoreText: {
    flex: 1,
    gap: 2,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  relatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    paddingVertical: spacing.xs,
  },
  relatedText: {
    flex: 1,
  },
  ctaFooter: {
    paddingHorizontal: spacing.containerMargin,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    backgroundColor: colors.surfaceCard,
  },
});
