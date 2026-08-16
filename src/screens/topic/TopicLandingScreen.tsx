import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, EmptyState, IconBadge, TopBar } from '@/components/ui';
import { getQAByTopic, getTopicById, type QAEntry, type TopicRow } from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';

interface TopicLandingScreenProps {
  topicId: string;
}

export function TopicLandingScreen({ topicId }: TopicLandingScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [topic, setTopic] = useState<TopicRow | null>(null);
  const [questions, setQuestions] = useState<QAEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found = await getTopicById(topicId);
      if (cancelled) return;
      setTopic(found);
      if (found) setQuestions(await getQAByTopic(found.id));
    })();
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  if (!topic) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <TopBar onBack={() => router.back()} />
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
      <TopBar title={t(topic.label_key)} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <IconBadge name={topic.icon as keyof typeof Ionicons.glyphMap} size={56} iconSize={26} />
          <AppText variant="bodyMd" color={colors.textSecondary} style={styles.summary}>
            {t(topic.description_key)}
          </AppText>
        </View>

        <AppText variant="headlineSm" style={styles.sectionHeading}>
          {t('topic.commonQuestions')}
        </AppText>

        {questions.map((q) => (
          <Pressable
            key={q.id}
            onPress={() => router.push(`/answer/${q.id}`)}
            accessibilityRole="button"
            style={styles.row}>
            <AppText variant="bodyMd" style={styles.rowText}>
              {t(q.question_key)}
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
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summary: {
    flex: 1,
  },
  sectionHeading: {
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  rowText: {
    flex: 1,
  },
});
