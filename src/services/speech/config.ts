import Constants from 'expo-constants';

import type { SpeechProviderId } from './types';

const DEFAULT_PROVIDER: SpeechProviderId = 'device';

/**
 * Which provider the app should use, from `expo.extra.speech.provider` in app.json.
 *
 * Swapping vendors is meant to be this one value. Anything unrecognised — a typo, a
 * provider that hasn't shipped yet — falls back to the device rather than failing,
 * because a misconfigured build should still read answers aloud.
 */
export function getConfiguredProviderId(): SpeechProviderId {
  const configured = Constants.expoConfig?.extra?.speech?.provider;
  return isProviderId(configured) ? configured : DEFAULT_PROVIDER;
}

function isProviderId(value: unknown): value is SpeechProviderId {
  return value === 'device' || value === 'remote';
}
