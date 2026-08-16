import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { getHasSeenOnboarding } from '@/storage';
import { colors } from '@/theme';

/**
 * Entry route: decides Onboarding vs Home once, based on the persisted
 * flag — never re-shown, and never gates on login (browsing stays
 * account-optional per the PRD).
 */
export default function Index() {
  const [target, setTarget] = useState<'/onboarding/step-1' | '/(tabs)/home' | null>(null);

  useEffect(() => {
    let cancelled = false;
    getHasSeenOnboarding().then((seen) => {
      if (!cancelled) setTarget(seen ? '/(tabs)/home' : '/onboarding/step-1');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!target) return <View style={{ flex: 1, backgroundColor: colors.screenBackground }} />;

  return <Redirect href={target} />;
}
