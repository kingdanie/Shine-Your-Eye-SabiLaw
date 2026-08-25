import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, EmptyState, TextField, TopBar, VoiceFAB } from '@/components/ui';
import { searchQA } from '@/db';
import { useTranslation } from '@/i18n';
import { canTranscribe } from '@/services/speech';
import { colors, spacing } from '@/theme';

type Status = 'idle' | 'loading' | 'no-results';

export function AskScreen() {
  const router = useRouter();
  const { t, language } = useTranslation();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const submit = async () => {
    if (!query.trim()) return;
    setStatus('loading');
    // Brief, reassuring loading state rather than an instant flash — the
    // "search" itself is a fast local keyword match, but instant results
    // read as untrustworthy for a legal-answer product.
    await new Promise((resolve) => setTimeout(resolve, 700));
    const results = await searchQA(query, t);
    if (results.length > 0) {
      router.replace(`/answer/${results[0].id}`);
    } else {
      setStatus('no-results');
    }
  };

  const onMicPress = () => {
    // Every language is asr:'none' until Stage 2 retrieval and mic capture land
    // (docs/VOICE.md §2), so this is the only branch that runs today. Deliberately
    // no simulated "listening" pause first: miming a mic that isn't recording is
    // precisely the dishonest degrade the doc rules out.
    if (!canTranscribe(language)) {
      Alert.alert(t('ask.voiceUnavailable.title'), t('ask.voiceUnavailable.body'));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopBar
        onClose={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/home'))}
      />

      {status === 'loading' ? (
        <View style={styles.centerFill}>
          <AppText variant="bodyMd" color={colors.textSecondary}>
            {t('ask.loading')}
          </AppText>
        </View>
      ) : status === 'no-results' ? (
        <View style={styles.centerFill}>
          <EmptyState
            icon="help-circle-outline"
            title={t('ask.emptyResults.title')}
            body={t('ask.emptyResults.body')}
            ctaLabel={t('common.retry')}
            onPressCta={() => setStatus('idle')}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <AppText variant="headlineMd" style={styles.center}>
            {t('ask.title')}
          </AppText>
          <AppText variant="bodyMd" color={colors.textSecondary} style={styles.center}>
            {t('ask.subtitle')}
          </AppText>

          <View style={styles.voiceWrap}>
            {/* Never active: nothing is recording until V2 wires up mic capture,
                and a pulsing "listening" ring would be claiming otherwise. */}
            <VoiceFAB
              active={false}
              onPress={onMicPress}
              accessibilityLabel={t('ask.micIdleLabel')}
            />
          </View>

          <TextField
            icon="create-outline"
            placeholder={t('ask.textPlaceholder')}
            accessibilityLabel={t('ask.textPlaceholder')}
            value={query}
            onChangeText={setQuery}
            multiline
            style={styles.textArea}
          />

          <Button label={t('ask.getAnswer')} onPress={submit} disabled={!query.trim()} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: {
    flex: 1,
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  center: { textAlign: 'center' },
  voiceWrap: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  textArea: {
    minHeight: 96,
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  centerFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
});
