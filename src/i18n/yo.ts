/**
 * Yoruba — INTENTIONALLY EMPTY for now.
 *
 * The switcher (Onboarding step 2, Profile → Language) already lists
 * Yoruba as a selectable option, and every key here falls back to English
 * automatically (see LanguageProvider's `t()` in ./context.tsx) — so
 * selecting Yoruba today is safe, just not yet translated.
 *
 * This was left empty deliberately rather than machine/best-guess
 * translated: this is a legal-information product, and shipping
 * low-confidence translations of legal or even chrome copy risks being
 * wrong in ways that are worse than staying in English. Populate this file
 * incrementally with native-speaker-reviewed strings — start with
 * `common.*` and screen headings before Q&A content (see AGENTS.md's
 * i18n rules and pcm.ts for the key shape to follow).
 */
export const yo: Record<string, string> = {};
