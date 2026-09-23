# Build Plan

Shipped work is checked so the next unchecked item represents the real roadmap.

## Completed

- [x] 1. **MVP app foundation** - Expo Router navigation, onboarding, home, ask, answer, source, topic, saved/history, profile, and emergency-help screens on local seeded content.
- [x] 2. **Offline-first local data and accessibility foundation** - SQLite content store, AsyncStorage preferences, Civic Green design system, responsive touch targets, and English/partial Pidgin support.
- [x] 3. **Initial Constitution reader** - Bundle and search Chapters I-IV and VIII offline, with an FTS5 path and a web fallback.
- [x] 4. **National emergency-contact content update** - Replace fake placeholders with sourced national contact numbers and retain an explicit unverified status pending sign-off.
- [x] 5. **English answer read-aloud** - Provide offline device text-to-speech through a swappable speech-provider boundary.

## Stage 1 - Real content and Constitution reader completion

- [ ] 6. **Legal content review and English/Pidgin completion** - Replace mock/paraphrased Q&A material with legally reviewed, sourced content and complete the supported content coverage.
- [ ] 7a. **Chapter V: The Legislature** - Bundle and search sections 47-129 using the Federal Government/NILDS 2023 consolidated Constitution as primary text, with a section-by-section cross-check before release.
- [ ] 7b. **Chapter VI: The Executive** - Bundle and search sections 130-229 using the Federal Government/NILDS 2023 consolidated Constitution as primary text, with a section-by-section cross-check before release.
- [ ] 8. **Verify and expand emergency help** - Obtain operations/legal verification for national contacts and add sourced state-specific and mental-health emergency services.

## Later roadmap

- [ ] 9. **Retrieval-grounded text AI Q&A** - Connect Ask to the separate backend, preserve citations, and provide a truthful offline cached or curated fallback.
- [ ] 10. **English speech-to-text and voice hardening** - Add push-to-talk after AI retrieval is available, then cover caching, error states, data guardrails, accessibility, and telemetry.
- [ ] 11. **Full multilingual content and voice** - Localize Hausa, Igbo, and Yoruba content and UI, then add each language's voice support behind its own quality gate.
- [ ] 12. **Optional offline AI module** - Evaluate an opt-in on-device model download only when quality and size make it worthwhile.
