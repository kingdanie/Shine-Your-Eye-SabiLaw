import type { LanguageCode } from '@/storage';

/**
 * How good a given language is on a given capability.
 *
 * - `ga`   — normal flow, no caveats shown.
 * - `beta` — works, but the UI says so and never auto-advances on it.
 * - `none` — not offered at all; the control is hidden with a plain-language reason.
 *
 * See docs/VOICE.md §7 — the tiers drive UI behaviour directly, so a language can be
 * switched on without a code change once its quality is good enough.
 */
export type QualityTier = 'ga' | 'beta' | 'none';

export type SpeechProviderId = 'device' | 'remote';

export interface LanguageCapability {
  tts: QualityTier;
  asr: QualityTier;
  /**
   * BCP-47 tags in preference order — the first one the device actually has wins.
   * Ordered so a Nigerian voice is used whenever the device ships one.
   */
  voiceTags: readonly string[];
  /** Why `voiceTags` deliberately doesn't match the language, when it doesn't. */
  note?: string;
}

export interface SpeakRequest {
  text: string;
  /**
   * The language of `text` itself — which is not necessarily the user's selected
   * UI language. See `resolveSpoken` in src/i18n/context.tsx.
   */
  language: LanguageCode;
  onStart?: () => void;
  onDone?: () => void;
  onStopped?: () => void;
  onError?: (error: Error) => void;
}

/** V2 — speech-to-text. No provider implements this yet; see docs/VOICE.md §10. */
export interface TranscribeRequest {
  uri: string;
  language: LanguageCode;
  sampleRate: number;
  codec: string;
}

export interface TranscriptResult {
  transcript: string;
  confidence: number;
  detectedLanguage?: LanguageCode;
  durationMs: number;
}

/**
 * The seam every speech vendor implements. Screens never import a provider
 * directly — they go through the facade in ./index.ts — so swapping vendors is
 * a config value plus one new file in ./providers.
 */
export interface SpeechProvider {
  readonly id: SpeechProviderId;
  /** When true, the facade falls back to the device provider while offline. */
  readonly requiresNetwork: boolean;
  speak(request: SpeakRequest): Promise<void>;
  stop(): Promise<void>;
  isSpeaking(): Promise<boolean>;
  /** Absent means this provider cannot transcribe. */
  transcribe?(request: TranscribeRequest): Promise<TranscriptResult>;
}
