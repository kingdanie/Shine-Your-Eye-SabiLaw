/**
 * Public surface for speech. Screens import only from here, never from a provider —
 * that is what makes swapping vendors a config value plus one file in ./providers.
 *
 * Barrel only: the facade lives in ./facade so that ./useSpeak can depend on it
 * without importing this module back and creating a require cycle.
 */
export { canSpeak, canTranscribe, getCapability } from './capabilities';
export { getConfiguredProviderId } from './config';
export { isSpeaking, speak, stop } from './facade';
export { composeUtterance } from './utterance';
export { useSpeak } from './useSpeak';
export type {
  LanguageCapability,
  QualityTier,
  SpeakRequest,
  SpeechProvider,
  SpeechProviderId,
  TranscribeRequest,
  TranscriptResult,
} from './types';
