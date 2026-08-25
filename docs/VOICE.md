# Voice & Audio Chat — Architecture and Rollout Plan

**Status:** design document. No voice code exists yet — the mic button on the Ask screen is an honest placeholder that tells the user voice isn't available.

**Scope:** turn-based voice Q&A — hold to ask a question, confirm the transcript, get the normal Answer screen, tap to hear it read aloud. Deliberately *not* an open-mic conversational assistant: that costs far more data, latency, and battery, and this app's users are on low-end phones and expensive mobile data.

This repo is the mobile app. The speech pipeline runs server-side in a separate backend repo; the API contract this app expects is specified in [§7](#7-expected-backend-contract).

---

## 1. Principles

These come before any technical choice, and they override convenience.

### Never auto-submit a transcript

The best African-language speech recognition available today sits around **24 WER** — roughly one word in four is wrong. Feeding that silently into a legal answer is the single biggest risk in this feature: a misheard question produces a confidently wrong answer about someone's rights, and they have no way to know it happened.

So: the transcript is **always shown, always editable, always explicitly confirmed** before a question is answered. There is no "just speak and get an answer" fast path. The extra tap is the safety mechanism.

### Voice is never the only path, and never assumed safe

A core use case for this app is *"you are at a checkpoint, or being arrested, right now."* In that situation, speaking a legal question aloud can escalate the encounter, and visibly holding up a phone that's recording audio can make things worse.

Therefore:
- Text input stays equally prominent everywhere voice appears. Voice is an alternative, never a replacement.
- No wake word, no ambient listening, no auto-start. The user always initiates.
- A clear, unmissable recording indicator whenever the mic is live.
- **Explicitly out of scope:** positioning this as an encounter-recording or evidence-gathering tool. That carries a completely different legal exposure profile and would put users at risk.

### Degrade honestly, per language

The app already distinguishes "offline, showing you a saved answer" from "offline, never seen this before" rather than papering over the difference. Voice follows the same rule: if recognition for a language is weak or missing, the UI says so plainly instead of failing silently or pretending.

### Audio is the heaviest thing this app will ever move

Every audio decision is measured in kilobytes. See [§4](#4-data-budget).

---

## 2. What has to be true first

Four facts about the current codebase determine the order of work.

**Speech-to-text is blocked on AI retrieval.** `searchQA()` in `src/db/queries.ts` is a substring match against canonical question text:

```ts
resolveText(entry.question_key).toLowerCase().includes(needle)
```

A typed query already strains this. A *spoken* one — "dem wan lock me comot for my house" — will essentially never substring-match "Can my landlord lock me out?". Wiring a microphone to today's search would ship a feature that fails on almost every real utterance. **Voice input therefore depends on Stage 2 (AI-backed retrieval) in the README roadmap.**

**Text-to-speech has no such dependency** and can ship first, standalone.

**There is no networking layer.** The only network call in the entire codebase is a single `NetInfo.fetch()` in `AnswerScreen.tsx`. No API client, no base URL, no environment config, no auth, no retry or timeout handling. Cloud speech means building all of that from scratch — budget for it as real work, not glue.

Related: `NetInfo` is used as a one-shot fetch with no subscription, so the app never notices connectivity changing mid-session. Falling back from cloud to on-device TTS when the network drops requires adding that subscription.

**Mic capture ends Expo Go compatibility.** `app.json` currently has no `ios` block and no Android `permissions` array — so no `NSMicrophoneUsageDescription`, no `RECORD_AUDIO`. Adding them plus an audio config plugin requires a native rebuild. Per `AGENTS.md`, this is flagged deliberately: **voice work requires migrating to an EAS development build.** That is a real workflow cost (no more instant Expo Go onboarding for contributors) and it is scheduled explicitly as phase V0.

**Empty dictionaries are a TTS trap.** Hausa, Igbo, and Yoruba are being added as selectable languages with **intentionally empty dictionaries** pending native-speaker translation (see the `feature/multilingual-scaffold` branch), so every string falls back to English. A naive `selectedLanguage → TTS voice` mapping would therefore speak **English words using a Yoruba voice** — fluent-sounding nonsense.

> **Rule:** TTS language is derived from the language of the *resolved string being spoken*, never from the user's UI language setting.

---

## 3. Client architecture

A provider seam, so screens never know which vendor is in play:

```
src/services/speech/
  types.ts            SpeechProvider interface, capability + quality tier types
  index.ts            facade — the only thing screens import
  remoteProvider.ts   backend transcribe / synthesize
  deviceProvider.ts   expo-speech TTS + OS speech recognition (English only)
  capabilities.ts     per-language matrix: fetch, cache, conservative fallback
  audioBudget.ts      encoding params, duration caps, size accounting
```

Why the indirection is worth it here:

- English can use **free, offline, on-device** TTS (`expo-speech`) — no backend, no data cost.
- Nigerian languages have **no on-device option at all** and must go through the cloud.
- This market moves fast. One provider went from 24 to 57 supported languages in a matter of months. Screens must not be coupled to a vendor that will be replaced.

Screens bind only to the facade. Swapping a provider — or using different providers per language — never touches UI code.

### 3.1 Where it attaches

- **Read aloud:** `TopBar`'s `rightSlot` on the Answer screen already renders bookmark and share buttons in a flex row with correct 44×44 touch targets. A third play/stop `IconButton` drops in with no layout change.
- **Utterance composition:** content rows store i18n *keys*, not text, so composing what to speak requires `t()`. Follow the existing convention of passing `resolveText: (key: string) => string` (as `searchQA` and `WhyItMattersList` already do) rather than calling hooks outside components. The existing share handler already composes exactly the right pairing (`question` + `shortAnswer`) and is a good template.
- **Ask flow:** `VoiceFAB` is already built (80px, pulsing ring, Reanimated). Note it currently passes `t('ask.listening')` as its `accessibilityLabel` even when idle — fix that when the FAB becomes real.

---

## 4. Data budget

Record **16 kHz mono, Opus or AAC at ~16–24 kbps**.

| | 15-second question |
|---|---|
| Uncompressed 16-bit WAV | ~480 KB |
| Opus @ 20 kbps | **~35 KB** |

That ~14× difference is the whole argument. Additional guardrails:

- Hard cap recordings at **30 seconds**.
- A one-time, plain-language notice about data use before the first voice interaction.
- A **"voice on Wi-Fi only"** setting in Profile.
- Cache synthesized audio to the filesystem keyed by `(qaId, language, voiceId)`, evicted on the same recency policy as the existing `recently_viewed` table (currently capped at 30). Repeat answers then cost nothing.
- Curated answers are a small finite set, so they can be **pre-synthesized server-side** and cached on first view — which makes read-aloud work fully offline for the content that matters most, consistent with the app's offline-first principle.

---

## 5. Language-specific hazards

### Tone and diacritics (Yoruba, Igbo)

These are tonal languages. Wrong tone is not an accent — it is **a different word**. Yoruba's writing system carries tonal and orthographic diacritics (à, á, ẹ, ọ, ṣ), and most digital Yoruba text omits them because of poor device and keyboard support. TTS fed undiacritized text mispronounces systematically.

Two mitigations, both required:

1. **Authoring rule:** `yo` and `ig` dictionary entries must be written **fully diacritized**. This belongs in `AGENTS.md`'s i18n rules alongside the existing key conventions.
2. **Pipeline safety net:** the backend runs automatic diacritic restoration before synthesis. Published seq2seq approaches reach under 5% diacritization error, and at least one Nigerian provider exposes a dedicated diacritics endpoint.

### Code-switching is the norm, not an edge case

Real Nigerian speech mixes English legal terms into Yoruba, Hausa, and Igbo constantly — *"dem arrest me without warrant"*. Monolingual recognition trained on clean single-language corpora falls apart on this.

Mitigations: send the selected language as a **hint, not a hard constraint**; prefer providers trained on Nigerian code-switched data; and for `beta`-tier languages consider running both the selected language and English, then keeping the higher-confidence result.

### On-device recognition is English-only, and even then partial

`en-NG` is not reliably available for offline Android recognition, and on-device recognition requires Android 13+ or iOS 17+. Treat on-device STT as a best-effort fallback, never the primary path.

---

## 6. Provider recommendation

Start with Nigerian and African-specialist vendors rather than generic Whisper or Google — they materially outperform on African speech, accents, and names — then run a bake-off behind the abstraction.

| Provider | Why it's a candidate |
|---|---|
| **Intron — Sahara v2** | 57 languages, trained on ~14M African clips from 40k+ speakers; best average WER on the AfriVox-2 benchmark; **already in production for legal transcription** at Ogun and Yobe State High Courts; has offline capability |
| **Spitch** | STT + TTS + translation + **diacritics** for Yoruba, Hausa, Igbo, English; available directly or via the Cencori gateway |
| **N-ATLAS** (Awarri / Federal Government) | ASR for all three languages plus Nigerian-accented English; openly licensed |
| Whisper / Google | English-only fallback |

The legal-transcription deployment is worth weighting heavily — it is the closest existing analogue to this app's domain and vocabulary.

---

## 7. Expected backend contract

For the backend repo to build against.

```
POST /v1/speech/transcribe
  multipart: audio file + { languageHint, sampleRate, codec }
  → { transcript, confidence, detectedLanguage, durationMs }

POST /v1/speech/synthesize
  { text, language, voiceId }
  → audio stream or a short-lived URL  (Opus/AAC, 16 kHz mono)

GET /v1/speech/capabilities
  → { [lang]: { asr: tier, tts: tier, provider, voices[] } }
     tier ∈ "ga" | "beta" | "none"
```

Also needs specifying: auth, request timeouts, retry/backoff policy, and maximum payload size (aligned with the 30-second recording cap).

### The capability matrix is the highest-leverage decision here

The app fetches per-language quality tiers, caches them with a TTL, and ships a conservative bundled default. This means **Igbo recognition can be switched on the day it's good enough — with no app release.** Given how fast this landscape moves, that single indirection is worth more than any individual provider choice.

Tier drives UI behavior directly:

| Tier | Behavior |
|---|---|
| `ga` | Normal flow |
| `beta` | "Beta" chip shown; transcript always displayed and editable; never auto-advances |
| `none` | Mic hidden, with a plain-language reason and an offer to type or switch language |

---

## 8. Privacy and retention

- **No retention by default.** Audio is processed and discarded.
- Any retention for model improvement is **explicit opt-in**, never a default or a buried setting. These recordings can describe arrests, evictions, domestic situations, and abuse.
- Recording indicator always visible while the mic is live. No background capture, ever.
- Document what leaves the device, where it's processed, and for how long — in the app's own plain language, not a privacy-policy wall.

---

## 9. Evaluation gate — no language ships on vibes

Before any language is promoted from `beta` to `ga`, it needs a held-out evaluation set: **real Nigerian speakers asking real legal questions**, across dialects, age groups, and realistic noise conditions (traffic, market, outdoors).

Track WER, but **gate promotion on task success** — did the user get the right answer? WER is a poor proxy for that:

- A transcript with 30% WER can still retrieve the correct answer if the legal keywords survived.
- A transcript with 10% WER can fail completely if the one missed word *was* the legal term.

Measure what actually matters to the user, not what's easy to measure.

---

## 10. Phasing

| Phase | Work | Gate |
|---|---|---|
| **V0 — Prerequisites** | EAS development build migration; mic permission strings in `app.json`; add `expo-audio` + `expo-file-system`; build the networking layer; add a NetInfo subscription; capability-matrix plumbing | Dev build runs on iOS and Android |
| **V1 — Read aloud (English)** | TTS on the Answer screen via `TopBar` `rightSlot`; on-device `expo-speech` first (free, offline); utterance composed via `resolveText` | **Ships independently** — no backend, no mic, no AI dependency |
| **V2 — Speak to ask (English)** | Push-to-talk → record → upload → transcript → **confirm** → existing answer path | Requires Stage 2 AI retrieval (see [§2](#2-what-has-to-be-true-first)); task-success eval on Nigerian-accented English |
| **V3 — Harden** | TTS caching + offline fallback; data guardrails; error and empty states; screen-reader/audio interplay; telemetry | — |
| **V4 — Pidgin** | First real exercise of the tiering system; heavy code-switching | Per-language eval |
| **V5 — Hausa → Yoruba → Igbo** | Ordered by data availability; diacritic pipeline required before `yo`/`ig` TTS; each language gated independently | Per-language eval; **content must be translated first** |
| **V6 — Optional offline module** | Opt-in download, size shown before the user accepts. Small per-language TTS checkpoints are viable; on-device ASR for these languages is not yet | Only if quality justifies the weight |

**V1 is the one to start with.** It delivers real user value — hearing an answer read aloud helps users with low literacy, which is squarely the audience this app exists for — while depending on nothing else on this list.

**V5 has a hard prerequisite:** translating the content itself. Speaking an empty dictionary just produces English in a Yoruba voice.

---

## Open questions

- Does read-aloud (V1) justify the EAS dev build migration on its own, or should V0/V1 wait until another native need forces it? On-device TTS via `expo-speech` may not require the full mic setup — worth confirming before committing to the migration.
- Cost modelling per provider at expected volume — not yet done.
- Whether pre-synthesized curated answers should be bundled in the app download or fetched on first view.
