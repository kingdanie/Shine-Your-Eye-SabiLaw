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
`;

/** Bump when SCHEMA_SQL or seed content shape changes, to force a reseed. */
export const SCHEMA_VERSION = '1';
