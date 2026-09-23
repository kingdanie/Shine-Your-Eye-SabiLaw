# SabiLaw / Shine Your Eye - Project Overview

<!-- blueprint:source-hash f77d7b525c9275a78389cfcbefb3ed38fd167ffc32d6663baee119aba51c5e4b -->

> A temporary-name, offline-first legal-literacy app that helps Nigerians understand their rights in plain language.

## Problem

Nigerian legal information is difficult to find and often written in dense legal language. The app provides understandable, cited legal information, a readable Constitution, and immediate paths to emergency help while being clear that it does not provide legal advice.

## Users

- Nigerians who need a calm, accessible explanation of legal rights.
- People using low-end Android devices or expensive, unreliable mobile data.
- English and Nigerian Pidgin users today; Hausa, Igbo, and Yoruba users as content and voice support expand.

## Usage model

- Public, internet-facing legal-literacy product.
- Offline-first and lightweight for constrained devices and data connections.
- Legal content and emergency contacts require attributable sources, review, and honest verification status before release.
- No established scale, tenancy, availability, audit, or additional compliance commitments.

## Features

1. **MVP app foundation** - Completed navigation, onboarding, home, ask, answer, source, topic, saved/history, profile, and emergency-help flows on local content.
2. **Offline-first data and accessibility foundation** - Completed SQLite content storage, AsyncStorage preferences, Civic Green UI primitives, and English/partial Pidgin support.
3. **Initial Constitution reader** - Completed bundled offline reader and search. The plan names Chapters I-IV and VIII; the repository also contains Chapter VII.
4. **National emergency-contact update** - Completed sourced national contacts, retaining their unverified status pending sign-off.
5. **English answer read-aloud** - Completed offline device text-to-speech through a swappable provider boundary.
6. **Legal content review and English/Pidgin completion** - Replace mock or paraphrased Q&A with legally reviewed, sourced content.
7a. **Chapter V: The Legislature** - Bundle and search sections 47-129 from the NILDS 2023 consolidated Constitution, with a section-by-section cross-check.
7b. **Chapter VI: The Executive** - Bundle and search sections 130-229 from the NILDS 2023 consolidated Constitution, with a section-by-section cross-check.
8. **Verify and expand emergency help** - Verify national contacts and add sourced state-specific and mental-health services.
9. **Retrieval-grounded text AI Q&A** - Connect Ask to the separate backend with citations and a truthful cached or curated offline fallback.
10. **English speech-to-text and voice hardening** - Add push-to-talk after retrieval is available, then cover caching, error states, data guardrails, accessibility, and telemetry.
11. **Full multilingual content and voice** - Localize Hausa, Igbo, and Yoruba content and UI, then add independently gated voice support.
12. **Optional offline AI module** - Consider an opt-in on-device model only when quality justifies its size.

## Data model

### Topic and Q&A content

- `Topic`: `id`, translation keys for label and description, `icon`, `color`, and `sort_order`.
- `QAEntry`: `id`, `topic_id`, translation keys for question/answer/source text, verdict, citation fields, JSON-encoded explanatory and related-answer lists, and a high-stakes flag.
- A Q&A entry belongs to one topic. `saved` and `recently_viewed` records reference a Q&A entry by `qa_id` with a timestamp.

### Legal and emergency content

- `ConstitutionChapter`: `id`, `number`, `title_key`, and `sort_order`.
- `ConstitutionSection`: `id`, `chapter_id`, display `number`, heading/body translation keys, and `sort_order`. A chapter has many sections; section numbers are text to support labels such as `254A`.
- `ConstitutionSearch`: resolved English heading/body text keyed by `section_id`, used for offline FTS5 or plain-SQL search.
- `EmergencyContact`: `id`, translation keys for name and optional description, category, phone, and `is_verified` status.

### Preferences

- AsyncStorage holds onboarding completion, selected language, topic interests, and the local mock profile.

## Tech stack

- **Expo SDK 57, React Native 0.86, React 19, strict TypeScript** - cross-platform mobile and web application.
- **Expo Router** - thin route entry points and navigation.
- **expo-sqlite** - bundled legal content, user activity, and offline search.
- **AsyncStorage** - small preference values.
- **Expo speech, localization, fonts, safe areas, and gestures** - native mobile capabilities.
- **In-house i18n context and dictionaries** - lightweight localized copy.
- **pnpm** - package manager.

## Monetization

> TODO: No monetization model is established.

## UI/UX

The Civic Green design system is calm, warm, trustworthy, and non-alarming. Use plain language, citations, legal disclaimers, 44px minimum touch targets, OS font scaling, WCAG-AA contrast, and honest offline/capability states.

- `/` and `/(tabs)/home` - entry and home experiences.
- `/ask`, `/answer/[qaId]`, `/source/[qaId]`, and `/topic/[topicId]` - local question and answer flows.
- `/constitution`, `/constitution/[chapterId]`, and `/constitution/section/[sectionId]` - offline Constitution reader and search.
- `/help` and profile routes - emergency help and preferences.

## Deployment

Expo-managed Android, iOS, and web app. Development starts with `pnpm start`; no deployment provider or production release pipeline is configured.

> TODO: Confirm distribution targets before release preparation. Speech recording may require an EAS development build.

## Open questions

- No monetization model or release/distribution target is defined.
- The project plan's completed-feature summary omits Chapter VII, although the repository bundles it. Update the plan on the next planning revision to keep the source documents aligned.
