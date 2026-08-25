import * as Speech from 'expo-speech';

import { getCapability } from '../capabilities';
import type { SpeakRequest, SpeechProvider } from '../types';

/** Cached across calls — the installed voice set doesn't change while the app runs. */
let cachedVoices: Speech.Voice[] | null = null;

function normalizeTag(tag: string): string {
  return tag.replace(/_/g, '-').toLowerCase();
}

/**
 * expo-speech's web implementation waits on `onvoiceschanged` and never settles when
 * the browser reports zero voices — so this has to be raced, not just caught, or
 * read-aloud hangs before it starts and the button looks dead.
 */
const VOICE_LOOKUP_TIMEOUT_MS = 1500;

async function loadVoices(): Promise<Speech.Voice[]> {
  if (cachedVoices !== null) return cachedVoices;

  // A device with no TTS engine installed rejects; an empty list just means
  // "let the OS pick", which is a fine outcome rather than an error.
  const voices = await Promise.race([
    Speech.getAvailableVoicesAsync().catch<Speech.Voice[]>(() => []),
    new Promise<Speech.Voice[]>((resolve) => {
      setTimeout(() => resolve([]), VOICE_LOOKUP_TIMEOUT_MS);
    }),
  ]);

  // Deliberately don't cache an empty result: Android's TTS engine initialises
  // lazily, so an early call can legitimately return nothing on a slow device and
  // a later one succeed. Caching [] here would mean never getting a Nigerian voice.
  if (voices.length > 0) cachedVoices = voices;

  return voices;
}

/**
 * Best available voice for a language, preferring a Nigerian one when the device
 * has it. Returns `undefined` to let the OS choose, which is correct on devices
 * that expose no voice list at all.
 */
async function pickVoice(
  voiceTags: readonly string[]
): Promise<{ voice?: string; language?: string }> {
  const voices = await loadVoices();
  if (voices.length === 0) return { language: voiceTags[0] };

  for (const tag of voiceTags) {
    const wanted = normalizeTag(tag);
    const match = voices.find((v) => {
      const have = normalizeTag(v.language ?? '');
      // Exact tag first, then prefix — 'en' should match 'en-GB' but 'en-NG' must not match 'en-GB'.
      return have === wanted || have.startsWith(`${wanted}-`);
    });
    if (match) return { voice: match.identifier, language: match.language };
  }

  return { language: voiceTags[0] };
}

/**
 * The device's own TTS engine. Free, offline, no API key, no native build — which
 * is why it is both the default and the permanent offline fallback for every other
 * provider, rather than just a cheap starting point.
 */
export const deviceProvider: SpeechProvider = {
  id: 'device',
  requiresNetwork: false,

  async speak(request: SpeakRequest): Promise<void> {
    const { voiceTags } = getCapability(request.language);
    const { voice, language } = await pickVoice(voiceTags);

    // Speech.speak() queues rather than replaces, so a second tap would otherwise
    // read both answers back to back.
    await Speech.stop();

    // maxSpeechInputLength is platform-dependent (finite on Android). Over it, the
    // native call fails silently, which reads to the user as a dead button.
    const text = request.text.slice(0, Speech.maxSpeechInputLength);

    Speech.speak(text, {
      voice,
      language,
      onStart: request.onStart,
      onDone: request.onDone,
      onStopped: request.onStopped,
      onError: request.onError,
    });
  },

  async stop(): Promise<void> {
    await Speech.stop();
  },

  async isSpeaking(): Promise<boolean> {
    return Speech.isSpeakingAsync();
  },
};
