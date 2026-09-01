import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/ui';
import { getDb } from '@/db';
import { useTranslation } from '@/i18n';
import { colors } from '@/theme';

import { useProfile } from './ProfileProvider';

interface AppGateProps {
  fontsLoaded: boolean;
  children: React.ReactNode;
}

/**
 * Holds the native splash screen up until fonts, the SQLite db (schema +
 * seed), the persisted language, and the mock profile have all loaded —
 * then renders the real navigation tree in one frame, so nothing flashes
 * from "unstyled" to styled.
 */
export function AppGate({ fontsLoaded, children }: AppGateProps) {
  const [dbReady, setDbReady] = useState(false);
  const [dbFailed, setDbFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { t, ready: languageReady } = useTranslation();
  const { ready: profileReady } = useProfile();

  useEffect(() => {
    let cancelled = false;
    getDb().then(
      () => {
        if (!cancelled) setDbReady(true);
      },
      (error: unknown) => {
        // Opening SQLite can fail for reasons we can't pre-empt — on web, the
        // usual one is another tab (or a not-yet-torn-down worker from the last
        // refresh) still holding the OPFS access handles. Show a retryable
        // state: silently sitting behind the splash screen forever is exactly
        // the "never silently fail" case the offline rules call out.
        console.error('[db] failed to open database', error);
        if (!cancelled) setDbFailed(true);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const isReady = fontsLoaded && dbReady && languageReady && profileReady;

  useEffect(() => {
    // Also hide on failure — otherwise the error state renders underneath a
    // splash screen that never goes away.
    if (isReady || dbFailed) {
      SplashScreen.hideAsync();
    }
  }, [isReady, dbFailed]);

  const retry = useCallback(() => {
    setDbFailed(false);
    setAttempt((n) => n + 1);
  }, []);

  if (dbFailed) {
    return (
      <View style={styles.errorContainer}>
        <EmptyState
          icon="warning-outline"
          title={t('appGate.dbErrorTitle')}
          body={t('appGate.dbErrorBody')}
          ctaLabel={t('appGate.dbErrorRetry')}
          onPressCta={retry}
        />
      </View>
    );
  }

  if (!isReady) return null;

  return <>{children}</>;
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.screenBackground,
  },
});
