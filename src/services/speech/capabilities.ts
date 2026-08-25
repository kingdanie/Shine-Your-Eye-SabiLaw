import type { LanguageCode } from '@/storage';

import type { LanguageCapability } from './types';

/**
 * Unknown languages get nothing. `feature/multilingual-scaffold` widens
 * `LanguageCode` to include `ha`/`ig`/`yo` with intentionally empty dictionaries —
 * this default is what keeps that merge from silently offering speech for a
 * language whose content is still English underneath.
 */
const UNSUPPORTED: LanguageCapability = {
  tts: 'none',
  asr: 'none',
  voiceTags: [],
};

/**
 * Per-language quality, English first. Adding a language is an entry here plus a
 * translated dictionary — deliberately not a code change anywhere else.
 *
 * `asr` is 'none' everywhere because speech-to-text needs both Stage 2 AI retrieval
 * and mic capture (a config plugin, so a custom dev build). See docs/VOICE.md §2.
 */
const CAPABILITIES: Partial<Record<LanguageCode, LanguageCapability>> = {
  en: {
    tts: 'ga',
    asr: 'none',
    voiceTags: ['en-NG', 'en-GB', 'en-US', 'en'],
  },
  pcm: {
    tts: 'beta',
    asr: 'none',
    voiceTags: ['en-NG', 'en-GB', 'en'],
    note:
      'No device has a Nigerian Pidgin voice. Pidgin is English-lexified, so an English ' +
      'voice stays broadly intelligible — unlike Yoruba or Igbo, where a mismatched voice ' +
      'would be actively wrong. Deliberate best-effort, hence beta rather than ga.',
  },
};

export function getCapability(language: LanguageCode): LanguageCapability {
  return CAPABILITIES[language] ?? UNSUPPORTED;
}

export function canSpeak(language: LanguageCode): boolean {
  return getCapability(language).tts !== 'none';
}

export function canTranscribe(language: LanguageCode): boolean {
  return getCapability(language).asr !== 'none';
}
