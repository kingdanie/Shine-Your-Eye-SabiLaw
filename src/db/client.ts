import * as SQLite from 'expo-sqlite';

import { en } from '@/i18n/en';

import { CONSTITUTION_FTS5_SQL, SCHEMA_SQL, SCHEMA_VERSION } from './schema';
import {
  constitutionChapters,
  constitutionSections,
  emergencyContacts,
  qaEntries,
  topics,
} from './seed-data';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/** Opens (and lazily migrates/seeds) the single app database. Safe to call repeatedly. */
export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = openDb();
  }
  return dbPromise;
}

async function openDb() {
  const db = await SQLite.openDatabaseAsync('know-your-right.db');
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync(SCHEMA_SQL);
  // Best-effort: the fts5 module isn't compiled into expo-sqlite's web
  // (WASM) build, so this can throw there. Kept out of SCHEMA_SQL's batch
  // specifically so that failure can't take unrelated tables down with it
  // — search still works everywhere via constitution_search_plain (see
  // queries.ts searchConstitution()).
  try {
    await db.execAsync(CONSTITUTION_FTS5_SQL);
  } catch {
    // fts5 unavailable on this platform — fine, LIKE-based fallback covers it.
  }
  await seedIfNeeded(db);
  return db;
}

async function seedIfNeeded(db: SQLite.SQLiteDatabase) {
  const row = await db.getFirstAsync<{ value: string }>(
    "SELECT value FROM meta WHERE key = 'schema_version'"
  );
  if (row?.value === SCHEMA_VERSION) return;

  await db.withTransactionAsync(async () => {
    // Reseed bundled content from scratch; user activity tables are untouched
    // unless the schema itself changed shape (out of scope for MVP).
    await db.runAsync('DELETE FROM topics');
    await db.runAsync('DELETE FROM qa_entries');
    await db.runAsync('DELETE FROM emergency_contacts');
    await db.runAsync('DELETE FROM constitution_chapters');
    await db.runAsync('DELETE FROM constitution_sections');
    await db.runAsync('DELETE FROM constitution_search_plain');
    // Table may not exist at all if fts5 isn't supported on this platform
    // (see openDb()) — caught locally so it can't roll back this whole
    // transaction's other deletes/inserts.
    try {
      await db.runAsync('DELETE FROM constitution_search');
    } catch {
      // no-op — nothing to delete if the table was never created
    }

    for (const t of topics) {
      await db.runAsync(
        `INSERT INTO topics (id, label_key, icon, color, description_key, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [t.id, t.label_key, t.icon, t.color, t.description_key, t.sort_order]
      );
    }

    for (const q of qaEntries) {
      await db.runAsync(
        `INSERT INTO qa_entries
           (id, topic_id, question_key, verdict, short_answer_key, why_it_matters,
            tip_key, citation_act, citation_section, full_source_text_key,
            related_ids, is_high_stakes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          q.id,
          q.topic_id,
          q.question_key,
          q.verdict,
          q.short_answer_key,
          q.why_it_matters,
          q.tip_key,
          q.citation_act,
          q.citation_section,
          q.full_source_text_key,
          q.related_ids,
          q.is_high_stakes,
        ]
      );
    }

    for (const c of emergencyContacts) {
      await db.runAsync(
        `INSERT INTO emergency_contacts (id, name_key, category, phone, description_key, is_verified)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [c.id, c.name_key, c.category, c.phone, c.description_key, c.is_verified]
      );
    }

    for (const ch of constitutionChapters) {
      await db.runAsync(
        `INSERT INTO constitution_chapters (id, number, title_key, sort_order) VALUES (?, ?, ?, ?)`,
        [ch.id, ch.number, ch.title_key, ch.sort_order]
      );
    }

    for (const s of constitutionSections) {
      await db.runAsync(
        `INSERT INTO constitution_sections (id, chapter_id, number, heading_key, body_key, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [s.id, s.chapter_id, s.number, s.heading_key, s.body_key, s.sort_order]
      );
      // Search can only index plain text columns, not i18n keys — resolve
      // the English text once here (legal source text is English-only,
      // same as qa_entries.full_source_text_key) so search has something
      // to match. Populated into both the always-available plain table
      // and (best-effort) the FTS5 table — see queries.ts searchConstitution().
      const heading = en[s.heading_key] ?? '';
      const body = en[s.body_key] ?? '';
      await db.runAsync(
        `INSERT INTO constitution_search_plain (section_id, heading, body) VALUES (?, ?, ?)`,
        [s.id, heading, body]
      );
      try {
        await db.runAsync(
          `INSERT INTO constitution_search (section_id, heading, body) VALUES (?, ?, ?)`,
          [s.id, heading, body]
        );
      } catch {
        // fts5 unavailable on this platform — the plain table above covers it.
      }
    }

    await db.runAsync(
      `INSERT INTO meta (key, value) VALUES ('schema_version', ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [SCHEMA_VERSION]
    );
  });
}
