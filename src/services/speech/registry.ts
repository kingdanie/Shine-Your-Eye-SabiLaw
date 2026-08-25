import { deviceProvider } from './providers/device';
import type { SpeechProvider, SpeechProviderId } from './types';

/**
 * Every implemented provider. Adding a vendor is one file in ./providers plus one
 * line here — no screen changes, because screens only ever import the facade.
 *
 * `remote` is intentionally absent: it's declared in the type union so config and
 * capability code can already reason about it, but it has no implementation until
 * the backend speech endpoints exist (docs/VOICE.md §7).
 */
const REGISTRY: Partial<Record<SpeechProviderId, () => SpeechProvider>> = {
  device: () => deviceProvider,
};

export function resolveProvider(id: SpeechProviderId): SpeechProvider {
  return (REGISTRY[id] ?? (() => deviceProvider))();
}

export function isImplemented(id: SpeechProviderId): boolean {
  return REGISTRY[id] !== undefined;
}
