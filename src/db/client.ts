import * as SQLite from 'expo-sqlite';

import { SCHEMA_SQL, SCHEMA_VERSION } from './schema';
import { emergencyContacts, qaEntries, topics } from './seed-data';

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

    await db.runAsync(
      `INSERT INTO meta (key, value) VALUES ('schema_version', ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [SCHEMA_VERSION]
    );
  });
}
