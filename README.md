# SabiLaw / Shine Your Eye *(working titles)*

**Understand your rights, in plain language.** An AI-powered legal literacy app for Nigerians — talk or text to it about the Nigerian constitution and the law, read the constitution itself, and reach emergency legal help in two taps or fewer.

> ⚠️ **This repository contains the mobile app only.** The backend, AI services, and speech pipeline live in a separate repository and are not part of this codebase.

## The Vision

Most Nigerians never read the law that governs them — it's written in dense legal English, scattered across statutes, and intimidating to approach. This app closes that gap:

- **Ask, your way.** Type or *speak* a question in everyday language — "Can my landlord lock me out?", "Police wan search my phone, e legal?" — and get a short, honest answer grounded in the actual Nigerian constitution and statutes, with the citation attached.
- **Read the law itself.** A dedicated Constitution section lets anyone read the full Constitution of Nigeria directly in the app, offline, with plain-language context alongside the legal text.
- **In your language.** English, Nigerian Pidgin, Hausa, Igbo, and Yoruba — including **voice in and voice out**: speak your question in your language, hear the answer back in it.
- **Help when it matters.** Emergency contacts (police complaint units, human rights commission, legal aid) and a path to a real lawyer, always reachable in ≤2 taps — because the moment you need this app most may be the moment you're most stressed.

The tone throughout is deliberately calm, warm, and non-alarming — a knowledgeable friend, not a protest pamphlet and not a law firm.

## Core Principles

These are product requirements, not preferences — the primary audience is on low-end Android phones with slow, expensive mobile data:

| Principle | What it means in practice |
|---|---|
| **Offline-first** | All bundled content (topics, Q&A, constitution) lives in on-device SQLite. Previously viewed answers work with no connection, and the app says so honestly — it never fakes freshness. |
| **Very light** | Every dependency is weighed. Measured JS+assets export is ~16MB total (after cutting 17MB of unused icon/font families). No raster illustrations, no heavy libraries, deep-imports only. |
| **Plain language** | No legal jargon anywhere — not in answers, not in buttons, not in error messages. |
| **Trust visible** | Every answer shows its source (Act + section, tappable to the full text) and a clear "this isn't legal advice" note. |
| **Accessible** | 44×44 touch targets, screen-reader labels, OS font scaling respected, WCAG-AA contrast — enforced centrally in the design-system primitives. |

## Current Status

**Stage 0 (MVP scaffold) is complete.** All core screens are built and navigable end-to-end on seeded mock content: onboarding, home, ask, answer (with citations, offline states, and a high-stakes "Talk to a Lawyer" path), legal source view, browse-by-topic, saved/history, profile, and emergency help. English is fully covered; Pidgin partially, with automatic English fallback.

**Stage 1 (real content + Constitution reader) is in progress.** A Constitution reader is bundled and working: Chapter IV (Fundamental Rights, ss. 33–46) is real, verbatim Official Gazette text — cross-checked section-by-section against an independent government-published copy — browsable by chapter/section and searchable fully offline (FTS5 on native, with an automatic plain-SQL fallback on platforms like web where the fts5 module isn't available). The other 7 chapters aren't bundled yet, and the app says so rather than implying completeness. Emergency contact numbers were updated from explicit fake placeholders to each agency's real, currently-published number (sources cited in `src/db/seed-data.ts`) — they're still marked `is_verified: 0` pending the ops/legal sign-off step (confirming with each agency this is still their live line) that safety-critical content needs before shipping.

> ⚠️ **Not production-ready.** The Q&A content (topics, short answers, citations) is still unreviewed mock/paraphrase material — only the bundled Chapter IV Constitution text and the emergency contact numbers have been upgraded to real sourced content so far. Legal sign-off from qualified Nigerian counsel is still the first order of business before any release.

## Roadmap

| Stage | Focus | Status |
|---|---|---|
| **0 — MVP scaffold** | All screens on mock data · offline-first SQLite layer · Civic Green design system · EN + partial Pidgin i18n | ✅ Done |
| **1 — Real content + Constitution reader** | Legally reviewed statute content & verified emergency contacts · full Constitution of Nigeria bundled into SQLite, readable & searchable offline (FTS5) · complete EN/Pidgin content | 🚧 In progress — Constitution reader shipped (Chapter IV only) + real emergency contact numbers; Q&A content still mock, remaining 7 chapters not bundled, legal sign-off still pending |
| **2 — AI Q&A (text)** | Backend (separate repo) with retrieval-grounded AI over the constitution & statutes · Ask flow calls it live · citations preserved in every AI answer · graceful offline fallback to cached/curated answers | Planned |
| **3 — Voice (English first)** | Speech-to-text for asking · text-to-speech for answers · processed server-side so the app stays light | Planned |
| **4 — Full multilingual** | Hausa, Igbo, Yoruba UI + content localization · then voice in/out in all supported languages · the i18n layer was built for this — adding a language is a dictionary file, not a redesign | Planned |
| **5 — Offline AI module (experimental)** | *Optional, opt-in* on-device model download for AI answers without internet — app discloses exact download size before the user accepts · pursued only if on-device models for Nigerian languages mature enough to be worth the weight | Exploratory |

**Why cloud-first for the AI (stages 2–4):** running the AI server-side keeps the app itself tiny and works on any phone — no user is ever forced to download a model. On-device AI (stage 5) stays strictly optional so the "very light" promise is never broken for people who don't opt in.

## Tech Stack

| Choice | Why |
|---|---|
| **Expo SDK 57 + TypeScript (strict)** | One codebase for iOS, Android, and web; managed workflow keeps native complexity out |
| **Expo Router** | File-based routing with per-route code splitting and web URL support for free |
| **expo-sqlite** | The offline content store — queryable, FTS-ready for constitution search, works in Expo Go |
| **AsyncStorage** | Flat preference flags only (language, onboarding, profile) |
| **Hand-rolled i18n** (`src/i18n`) | A ~40-line `t()`/Context beats shipping i18next for key-value dictionaries; languages are added as plain dictionary files |
| **pnpm** | Package manager for the repo (with `node-linker=hoisted` for Metro) |

Deliberately avoided: Redux/MobX, UI kits, Lottie, moment/date-fns, MMKV — see [AGENTS.md](AGENTS.md) for the full rules and rationale.

## Getting Started

```bash
pnpm install
```

```bash
npx expo start
```

Then press `i` (iOS simulator), `a` (Android emulator), or `w` (web). The app runs in Expo Go — no custom dev client needed.

Type-check (must be clean before any commit):

```bash
npx tsc --noEmit -p .
```

## Project Structure

```
src/app/                 # Expo Router routes — thin re-exports only
src/screens/             # screen implementations, one folder per flow
src/components/ui/       # design-system primitives (all screens compose from these)
src/theme/               # Civic Green tokens: colors, type, spacing, fonts
src/db/                  # SQLite schema, seed content, typed queries
src/storage/             # AsyncStorage preference flags
src/i18n/                # en / pcm dictionaries + LanguageProvider
src/context/             # Profile + app-ready providers
src/utils/               # small hand-rolled helpers
```

## Contributing & Workflow

- Branch from `develop`: `feature/<name>`, `fix/<name>`; `main` is protected and always releasable.
- [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `perf:`, `docs:`, …).
- `npx tsc --noEmit -p .` must pass, and observable changes should be actually run, before a PR.
- Full coding standards, offline-first rules, and bundle-size rules: **[AGENTS.md](AGENTS.md)**.

## Disclaimer

This app explains Nigerian law in simple terms for general information. It is **not legal advice** for any specific case, and no lawyer–client relationship is created by using it. For advice about your own situation, talk to a qualified legal practitioner — the app's Help section exists to point you to one.
