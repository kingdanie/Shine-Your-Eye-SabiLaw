# Feature: Chapter V: The Legislature

**From build-plan:** feature 7a
**Build attempt:** 1
**Branch:** `feature/chapter-v-the-legislature`

## Goal

Make Chapter V of the Constitution, The Legislature, available in the existing offline reader and search experience. Bundle sections 47-129 from the Federal Government/NILDS 2023 consolidated Constitution, using the user-provided Constitution App data only as a non-authoritative cross-reference.

## In scope

- Add Chapter V and sections 47-129 to the existing bundled Constitution seed data.
- Add the exact English heading and body keys required by the existing reader and offline search index.
- Rebuild bundled Constitution content on existing installations without erasing saved answers or recently viewed activity.
- Expose Chapter V in the existing available-chapters list and remove it from the unavailable list.
- Confirm each bundled section against the NILDS 2023 primary text before marking the feature ready for release review.

## Out of scope

- Chapter VI, schedules, or other Constitution amendments outside Chapter V.
- Legal-content review of the existing Q&A catalogue.
- Translation of constitutional source text into Pidgin or other languages.
- Changes to AI Q&A, speech-to-text, emergency contacts, or the reader's visual design.

## Build loop

One feature-level review packet after all passing implementation steps. Step checkpoint commits are disabled. `/complete` creates the feature commit only after the required verification and review handoff.

## Build steps

- [ ] 1. Add the Chapter V structure and section identifiers.
  - Add `chapter-5` and ordered section records 47-129 in `src/db/seed-data.ts`, retaining the existing `constitution_chapters` and `constitution_sections` contract.
  - Bump the bundled-content schema version so existing installations rebuild only the Constitution content and search indexes while preserving user activity tables.
  - Done when a fresh or reseeded database returns Chapter V with exactly 83 ordered section records, 47 through 129.

- [ ] 2. Add verified Chapter V source text.
  - Add English title, heading, and body dictionary entries for every Chapter V section from the NILDS 2023 consolidated Constitution.
  - Compare each section against the supplied Constitution App data only to surface discrepancies; preserve the NILDS wording as authoritative and record source/cross-check rationale beside the existing Constitution seed provenance.
  - Done when every Chapter V section record resolves to non-empty English heading and body text, with no unverified pasted wording substituted for the primary source.

- [ ] 3. Make Chapter V discoverable and searchable.
  - Remove Chapter V from `UNBUNDLED_CHAPTER_NUMBERS` so it appears with the existing available chapters.
  - Verify that existing chapter navigation, section navigation, native FTS5 search, and the web plain-SQL search fallback index the new entries through the existing database path.
  - Done when Chapter V is listed as available, opens its section list in order, and a known Chapter V term returns the matching section in both supported search paths.

- [ ] 4. Verify legal-content completeness and app integration.
  - Review all 83 source sections against the NILDS primary text and check identifier order, chapter association, heading/body keys, and user-visible source rendering.
  - Run the declared lint and TypeScript checks, then collect focused app evidence for Chapter V browsing and search.
  - Done when verification shows all 83 sections are present, ordered, readable, and searchable without breaking existing Constitution content or user activity.

## Files / areas

- `src/db/seed-data.ts` - Chapter V records, section identifiers, and source provenance.
- `src/db/schema.ts` - bundled-content schema version only, if required to reseed the new content.
- `src/i18n/en.ts` - Chapter V title and legal source-text keys.
- `src/screens/constitution/ConstitutionScreen.tsx` - Chapter availability list.
- `src/db/client.ts` and `src/db/queries.ts` - inspect and use the existing reseed/search paths; change only if the existing contracts cannot index Chapter V.

## Data / contracts

- `ConstitutionChapterRow` remains `{ id, number, title_key, sort_order }`; Chapter V uses `id: 'chapter-5'` and `number: 5`.
- `ConstitutionSectionRow` remains `{ id, chapter_id, number, heading_key, body_key, sort_order }`; Chapter V uses IDs `section-47` through `section-129` and `chapter_id: 'chapter-5'`.
- Legal source text remains English dictionary content indexed into `constitution_search_plain` and, when supported, `constitution_search` FTS5. No raw scraped dataset is stored as a separate runtime source.
- The NILDS 2023 consolidated Constitution is the primary transcription source. The supplied Constitution App data is a comparison aid, not an authority for resolving text differences.

## Testing

- No test runner is configured.
- Run `pnpm lint` and `pnpm exec tsc --noEmit -p .`.
- Use the existing app to verify Chapter V chapter/section navigation and a focused search on native FTS5 plus the web fallback when available.
- Confirm the seeded section count is 83 and the displayed range is 47-129.

## Notes for the AI

- Keep legal text verbatim from the approved primary source. Do not silently correct legal wording, modernize spelling, or fill gaps from the pasted dataset.
- Preserve the existing offline-first data flow and the user-visible distinction between bundled and unavailable content.
- Do not add dependencies, a scraping runtime, or a second data model for this feature.
