import type { SpokenText } from '@/i18n';

/**
 * Joins resolved strings into one utterance.
 *
 * Parts can disagree about language — a dictionary may carry the question but not the
 * answer, so one part is Pidgin and the other fell back to English. Mixed content is
 * mostly-English by construction in that case, so the whole utterance is read in
 * English rather than in a voice that only suits half of it.
 */
export function composeUtterance(...parts: SpokenText[]): SpokenText {
  const present = parts.filter((part) => part.text.trim().length > 0);
  if (present.length === 0) return { text: '', language: 'en' };

  const [first] = present;
  const agreed = present.every((part) => part.language === first.language);

  return {
    text: present.map((part) => terminate(part.text.trim())).join(' '),
    language: agreed ? first.language : 'en',
  };
}

/** Adds sentence-final punctuation so the engine pauses between parts. */
function terminate(text: string): string {
  return /[.!?:;]$/.test(text) ? text : `${text}.`;
}
