/**
 * SQLite schema for the offline-first content/activity store.
 *
 * `topics` and `qa_entries` hold the bundled mock content (seeded once on
 * first boot — see seed.ts). `saved` and `recently_viewed` hold real
 * on-device user activity and are never wiped on reseed. Storing bundled
 * content in SQLite too (not just user activity) means Home/Ask/Topic
 * screens query it the same way real fetched content would be queried
 * later, so swapping in a real backend later doesn't change the read path.
 */
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  label_key TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  description_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS qa_entries (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES topics(id),
  question_key TEXT NOT NULL,
  verdict TEXT,
  short_answer_key TEXT NOT NULL,
  why_it_matters TEXT NOT NULL,
  tip_key TEXT,
  citation_act TEXT NOT NULL,
  citation_section TEXT NOT NULL,
  full_source_text_key TEXT NOT NULL,
  related_ids TEXT NOT NULL,
  is_high_stakes INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_qa_topic ON qa_entries(topic_id);

CREATE TABLE IF NOT EXISTS saved (
  qa_id TEXT PRIMARY KEY REFERENCES qa_entries(id),
  saved_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS recently_viewed (
  qa_id TEXT PRIMARY KEY REFERENCES qa_entries(id),
  viewed_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_recent_viewed_at ON recently_viewed(viewed_at);

CREATE TABLE IF NOT EXISTS emergency_contacts (
  id TEXT PRIMARY KEY,
  name_key TEXT NOT NULL,
  category TEXT NOT NULL,
  phone TEXT NOT NULL,
  description_key TEXT,
  is_verified INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- ---------------------------------------------------------------------
-- Constitution reader (Stage 1) — bundled, browsable & searchable
-- offline. 'constitution_chapters'/'constitution_sections' hold the
-- structure (numbers + i18n keys, same *_key pattern as qa_entries).
--
-- 'constitution_search_plain' holds the resolved English text (FTS
-- can't index i18n keys) and backs a LIKE-based search that works on
-- every platform. The FTS5 virtual table used for better ranked/prefix
-- search is created separately, NOT in this batch — expo-sqlite's web
-- (WASM) build doesn't ship the fts5 module, and a failed statement
-- partway through one execAsync(...) batch was taking every table in
-- this file down with it, including totally unrelated ones. See
-- client.ts seedIfNeeded() for how the two are populated and
-- queries.ts searchConstitution() for how the fallback is chosen.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS constitution_chapters (
  id TEXT PRIMARY KEY,
  number INTEGER NOT NULL,
  title_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS constitution_sections (
  id TEXT PRIMARY KEY,
  chapter_id TEXT NOT NULL REFERENCES constitution_chapters(id),
  number INTEGER NOT NULL,
  heading_key TEXT NOT NULL,
  body_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_constitution_sections_chapter ON constitution_sections(chapter_id);

CREATE TABLE IF NOT EXISTS constitution_search_plain (
  section_id TEXT PRIMARY KEY,
  heading TEXT NOT NULL,
  body TEXT NOT NULL
);
`;

/** Bump when SCHEMA_SQL or seed content shape changes, to force a reseed. */
export const SCHEMA_VERSION = '2';

/** Created/populated separately from SCHEMA_SQL, wrapped in its own
 * try/catch — see the big comment above. Only takes effect where the
 * fts5 module is actually compiled in (native/Expo Go; not web). */
export const CONSTITUTION_FTS5_SQL = `
CREATE VIRTUAL TABLE IF NOT EXISTS constitution_search USING fts5(
  section_id UNINDEXED,
  heading,
  body
);
`;
