import NetInfo from '@react-native-community/netinfo';

import { getConfiguredProviderId } from './config';
import { deviceProvider } from './providers/device';
import { resolveProvider } from './registry';
import type { SpeakRequest, SpeechProvider } from './types';

/**
 * Which provider handles this call.
 *
 * A network-backed provider is skipped entirely while offline rather than being
 * allowed to fail first — the app's offline-first rule is to check connectivity
 * with NetInfo, not to infer it from a failed request. The device provider always
 * works, so read-aloud degrades instead of breaking.
 */
async function pickProvider(): Promise<SpeechProvider> {
  const configured = resolveProvider(getConfiguredProviderId());
  if (!configured.requiresNetwork) return configured;

  const { isConnected } = await NetInfo.fetch();
  return isConnected ? configured : deviceProvider;
}

/**
 * Speak text aloud. Resolves once speech has been dispatched, not once it finishes —
 * lifecycle is reported through the request's callbacks, so a stopped utterance
 * doesn't leave a promise hanging.
 */
export async function speak(request: SpeakRequest): Promise<void> {
  const provider = await pickProvider();
  await provider.speak(request);
}

/** Stops both the configured provider and the device fallback, whichever is talking. */
export async function stop(): Promise<void> {
  const provider = await pickProvider();
  await provider.stop();
  if (provider !== deviceProvider) await deviceProvider.stop();
}

export async function isSpeaking(): Promise<boolean> {
  const provider = await pickProvider();
  return provider.isSpeaking();
}
