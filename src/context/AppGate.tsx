import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

import { getDb } from '@/db';
import { useTranslation } from '@/i18n';

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
  const { ready: languageReady } = useTranslation();
  const { ready: profileReady } = useProfile();

  useEffect(() => {
    let cancelled = false;
    getDb().then(() => {
      if (!cancelled) setDbReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isReady = fontsLoaded && dbReady && languageReady && profileReady;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) return null;

  return <>{children}</>;
}
