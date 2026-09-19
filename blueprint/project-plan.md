# Project Plan

## 1. Problem - What problem are we solving?

SabiLaw / Shine Your Eye (a temporary working name) helps Nigerians understand their legal rights in plain language. The app makes the Constitution and other legal information easier to read, gives people a way to ask everyday questions, and keeps emergency legal-help contacts close at hand.

It must be honest about what is available and verified. It is general legal information, not legal advice.

## 2. Users - Who is this for?

The primary users are Nigerians, especially people on low-end Android devices with slow or expensive data, who need a calm, accessible explanation of their rights. The app supports English and Nigerian Pidgin today, and is designed to grow into Hausa, Igbo, and Yoruba.

## 3. Features - What does the MVP need?

Already built:

- Guided onboarding and a home experience.
- Local question-and-answer browsing, topic browsing, answers with citations, saved items, history, profile, and emergency-help flows.
- A bundled, searchable offline Constitution reader for Chapters I-IV and VIII.
- English and partial Pidgin UI support with English fallback, plus the scaffolding for Hausa, Igbo, and Yoruba.
- English answer read-aloud through an offline device speech provider.

Next roadmap:

- Complete Stage 1 with legally reviewed Q&A content, verified national and state emergency contacts, complete English/Pidgin content, and the remaining Constitution chapters.
- Connect the Ask experience to a retrieval-grounded text AI backend while retaining citations and a truthful offline fallback.
- Add English speech-to-text, then harden the voice experience.
- Complete multilingual content and voice support.
- Evaluate an optional, opt-in offline AI module only when quality justifies its download size.

## 4. Data - What are we storing?

- Bundled SQLite data for topics, Q&A entries, legal citations, emergency contacts, Constitution chapters and sections, and offline search indexes.
- Local AsyncStorage preferences for onboarding, language, interests, and the mock profile.
- Local SQLite records for saved answers and recently viewed answers.

The mobile app currently has no production account or server-side data store. The planned AI backend lives in a separate repository.

## 5. Tech - What stack are we using?

- Expo SDK 57, React Native 0.86, React 19, and strict TypeScript.
- Expo Router for navigation and route entry points.
- `expo-sqlite` for bundled offline content and `@react-native-async-storage/async-storage` for preferences.
- Expo-native packages for fonts, speech, localization, safe areas, and gestures.
- A small in-house i18n context and dictionary files rather than an i18n library.
- pnpm as the package manager.

## 6. Monetize - How will this make money?

> TODO (confirm): No monetization model is established in the repository or current roadmap.

## 7. UI/UX - How should this look and feel?

The Civic Green design system should feel calm, warm, trustworthy, and non-alarming: a knowledgeable friend, not a law firm or protest pamphlet. Use plain language, visible citations and disclaimers, 44px minimum touch targets, OS font scaling, and WCAG-AA contrast. Keep the bundle light and work offline whenever possible.

## 8. Deployment - Where and how will this ship?

The app is an Expo-managed mobile and web app. It currently runs in Expo Go with `pnpm start`; no deployment provider or production release pipeline is configured in this repository.

> TODO (confirm): Choose Android, iOS, web, and distribution targets before release preparation. Voice recording may require an EAS development build when speech-to-text work starts.

## 9. Usage model and constraints (optional)

- Internet-facing product for public legal literacy.
- Offline-first and lightweight for low-end devices and constrained data connections.
- Legal content and emergency contacts require source attribution, review, and honest verification status before release.
- No scale, tenancy, availability, or regulatory commitments beyond these established product constraints are recorded.
