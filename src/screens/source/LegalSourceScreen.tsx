import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Card, CitationBadge, EmptyState, TopBar } from '@/components/ui';
import { getQAById, type QAEntry } from '@/db';
import { useTranslation } from '@/i18n';
import { colors, spacing } from '@/theme';

interface LegalSourceScreenProps {
  qaId: string;
}

/** Reachable only via Answer's "Read more" / citation tap. The plain-language
 * short answer stays visible above the source text for context, per PRD 4.5. */
export function LegalSourceScreen({ qaId }: LegalSourceScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [entry, setEntry] = useState<QAEntry | null>(null);

  useEffect(() => {
    getQAById(qaId).then(setEntry);
  }, [qaId]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar title={t('source.title')} onClose={() => router.back()} />
      {!entry ? (
        <EmptyState
          icon="alert-circle-outline"
          title={t('ask.emptyResults.title')}
          body={t('ask.emptyResults.body')}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <CitationBadge act={entry.citation_act} section={entry.citation_section} />

          <View style={styles.block}>
            <AppText variant="labelSm" color={colors.textMuted}>
              {t('source.contextLabel')}
            </AppText>
            <AppText variant="bodyMd" color={colors.textSecondary}>
              {t(entry.short_answer_key)}
            </AppText>
          </View>

          <View style={styles.block}>
            <AppText variant="labelSm" color={colors.textMuted}>
              {t('source.sourceLabel')}
            </AppText>
            <Card statutory style={styles.sourceCard}>
              <AppText variant="bodyLg">{t(entry.full_source_text_key)}</AppText>
            </Card>
          </View>

          <AppText variant="caption" color={colors.textMuted} style={styles.footnote}>
            {t('source.disclaimerNote')}
          </AppText>
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
    gap: spacing.lg,
  },
  block: {
    gap: spacing.xs,
  },
  sourceCard: {
    marginTop: spacing.xs,
  },
  footnote: {
    textAlign: 'center',
  },
});
