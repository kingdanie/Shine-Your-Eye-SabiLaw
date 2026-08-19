import type * as SQLite from 'expo-sqlite';

import { getDb } from './client';
import type {
  ConstitutionChapterRow,
  ConstitutionSectionRow,
  EmergencyCategory,
  EmergencyContactRow,
  QAEntry,
  QAEntryRow,
  TopicId,
  TopicRow,
} from './types';

/** Recently-viewed is capped and trimmed to keep on-device storage light. */
const RECENTLY_VIEWED_CAP = 30;

function toQAEntry(row: QAEntryRow): QAEntry {
  const { why_it_matters, related_ids, is_high_stakes, ...rest } = row;
  return {
    ...rest,
    whyItMatters: JSON.parse(why_it_matters),
    relatedIds: JSON.parse(related_ids),
    isHighStakes: is_high_stakes === 1,
  };
}

/** QAEntry plus the activity timestamp (saved_at / viewed_at) from the join,
 * so list rows can show real "2 days ago" style labels. */
export type QAEntryWithActivity = QAEntry & { activityAt: number };

export async function getTopics(): Promise<TopicRow[]> {
  const db = await getDb();
  return db.getAllAsync<TopicRow>('SELECT * FROM topics ORDER BY sort_order ASC');
}

export async function getTopicById(id: string): Promise<TopicRow | null> {
  const db = await getDb();
  return db.getFirstAsync<TopicRow>('SELECT * FROM topics WHERE id = ?', [id]);
}

export async function getQAById(id: string): Promise<QAEntry | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<QAEntryRow>('SELECT * FROM qa_entries WHERE id = ?', [id]);
  return row ? toQAEntry(row) : null;
}

export async function getQAByTopic(topicId: TopicId): Promise<QAEntry[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<QAEntryRow>(
    'SELECT * FROM qa_entries WHERE topic_id = ?',
    [topicId]
  );
  return rows.map(toQAEntry);
}

export async function getQAByIds(ids: string[]): Promise<QAEntry[]> {
  if (ids.length === 0) return [];
  const db = await getDb();
  const placeholders = ids.map(() => '?').join(',');
  const rows = await db.getAllAsync<QAEntryRow>(
    `SELECT * FROM qa_entries WHERE id IN (${placeholders})`,
    ids
  );
  // preserve the caller's ordering (e.g. relatedIds / recency order)
  const byId = new Map(rows.map((r) => [r.id, toQAEntry(r)]));
  return ids.map((id) => byId.get(id)).filter((e): e is QAEntry => !!e);
}

/**
 * Simple keyword search over already-resolved (translated) question text.
 * Callers pass a `resolveText` function (typically the i18n `t()` hook)
 * so this module stays independent of the i18n layer.
 */
export async function searchQA(
  query: string,
  resolveText: (key: string) => string
): Promise<QAEntry[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<QAEntryRow>('SELECT * FROM qa_entries');
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return rows
    .map(toQAEntry)
    .filter((entry) => resolveText(entry.question_key).toLowerCase().includes(needle));
}

// ---- Saved (bookmarks) ----

export async function isSaved(qaId: string): Promise<boolean> {
  const db = await getDb();
  const row = await db.getFirstAsync('SELECT qa_id FROM saved WHERE qa_id = ?', [qaId]);
  return !!row;
}

export async function toggleSaved(qaId: string): Promise<boolean> {
  const db = await getDb();
  const already = await isSaved(qaId);
  if (already) {
    await db.runAsync('DELETE FROM saved WHERE qa_id = ?', [qaId]);
    return false;
  }
  await db.runAsync('INSERT OR REPLACE INTO saved (qa_id, saved_at) VALUES (?, ?)', [
    qaId,
    Date.now(),
  ]);
  return true;
}

export async function getSaved(): Promise<QAEntryWithActivity[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<QAEntryRow & { activity_at: number }>(
    `SELECT qa_entries.*, saved.saved_at AS activity_at FROM qa_entries
     JOIN saved ON saved.qa_id = qa_entries.id
     ORDER BY saved.saved_at DESC`
  );
  return rows.map((row) => ({ ...toQAEntry(row), activityAt: row.activity_at }));
}

// ---- Recently viewed (offline-availability signal) ----

export async function recordView(qaId: string): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'INSERT OR REPLACE INTO recently_viewed (qa_id, viewed_at) VALUES (?, ?)',
    [qaId, Date.now()]
  );
  // Trim to the cap, oldest first, so on-device storage stays bounded.
  await db.runAsync(
    `DELETE FROM recently_viewed WHERE qa_id NOT IN (
       SELECT qa_id FROM recently_viewed ORDER BY viewed_at DESC LIMIT ?
     )`,
    [RECENTLY_VIEWED_CAP]
  );
}

export async function hasBeenViewed(qaId: string): Promise<boolean> {
  const db = await getDb();
  const row = await db.getFirstAsync('SELECT qa_id FROM recently_viewed WHERE qa_id = ?', [
    qaId,
  ]);
  return !!row;
}

export async function getRecentlyViewed(
  limit = RECENTLY_VIEWED_CAP
): Promise<QAEntryWithActivity[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<QAEntryRow & { activity_at: number }>(
    `SELECT qa_entries.*, recently_viewed.viewed_at AS activity_at FROM qa_entries
     JOIN recently_viewed ON recently_viewed.qa_id = qa_entries.id
     ORDER BY recently_viewed.viewed_at DESC
     LIMIT ?`,
    [limit]
  );
  return rows.map((row) => ({ ...toQAEntry(row), activityAt: row.activity_at }));
}

// ---- Emergency contacts / Help & Support ----

export async function getEmergencyContacts(): Promise<EmergencyContactRow[]> {
  const db = await getDb();
  return db.getAllAsync<EmergencyContactRow>('SELECT * FROM emergency_contacts');
}

export async function getEmergencyContactsByCategory(
  category: EmergencyCategory
): Promise<EmergencyContactRow[]> {
  const db = await getDb();
  return db.getAllAsync<EmergencyContactRow>(
    'SELECT * FROM emergency_contacts WHERE category = ?',
    [category]
  );
}

// ---- Constitution reader (bundled, offline, FTS5-searchable) ----

export async function getConstitutionChapters(): Promise<ConstitutionChapterRow[]> {
  const db = await getDb();
  return db.getAllAsync<ConstitutionChapterRow>(
    'SELECT * FROM constitution_chapters ORDER BY sort_order ASC'
  );
}

export async function getConstitutionChapterById(
  id: string
): Promise<ConstitutionChapterRow | null> {
  const db = await getDb();
  return db.getFirstAsync<ConstitutionChapterRow>(
    'SELECT * FROM constitution_chapters WHERE id = ?',
    [id]
  );
}

export async function getConstitutionSections(chapterId: string): Promise<ConstitutionSectionRow[]> {
  const db = await getDb();
  return db.getAllAsync<ConstitutionSectionRow>(
    'SELECT * FROM constitution_sections WHERE chapter_id = ? ORDER BY sort_order ASC',
    [chapterId]
  );
}

export async function getConstitutionSectionById(
  id: string
): Promise<ConstitutionSectionRow | null> {
  const db = await getDb();
  return db.getFirstAsync<ConstitutionSectionRow>(
    'SELECT * FROM constitution_sections WHERE id = ?',
    [id]
  );
}

/** Builds an FTS5 MATCH expression that's safe against user input: each
 * word becomes its own quoted, prefix-matched phrase (so "arre" matches
 * "arrest"), and quoting neutralises FTS5 operator syntax (AND/OR/-/etc.)
 * a raw query could otherwise trip over. */
function toFtsQuery(raw: string): string {
  return raw
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => `"${token.replace(/"/g, '""')}"*`)
    .join(' ');
}

/** Whether the fts5 module is available on this platform — probed once
 * lazily and cached, since expo-sqlite's web (WASM) build doesn't ship it
 * (native/Expo Go does). `null` means "not probed yet". */
let ftsSupported: boolean | null = null;

async function resolveIdsToSections(
  db: SQLite.SQLiteDatabase,
  ids: string[]
): Promise<ConstitutionSectionRow[]> {
  if (ids.length === 0) return [];
  const placeholders = ids.map(() => '?').join(',');
  const rows = await db.getAllAsync<ConstitutionSectionRow>(
    `SELECT * FROM constitution_sections WHERE id IN (${placeholders})`,
    ids
  );
  // preserve the caller's (rank/relevance) order
  const byId = new Map(rows.map((r) => [r.id, r]));
  return ids.map((id) => byId.get(id)).filter((r): r is ConstitutionSectionRow => !!r);
}

/** LIKE-based fallback for platforms without fts5 — every word must
 * appear somewhere in the heading or body (AND across words, OR across
 * the two columns), same "readable & searchable offline" guarantee, just
 * without FTS5's ranking. */
async function searchConstitutionPlain(
  db: SQLite.SQLiteDatabase,
  query: string
): Promise<ConstitutionSectionRow[]> {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  // ESCAPE applies to a single LIKE expression, not a compound WHERE
  // clause — it has to be repeated after each one, not tacked on the end.
  const whereClause = tokens
    .map(() => "(heading LIKE ? ESCAPE '\\' OR body LIKE ? ESCAPE '\\')")
    .join(' AND ');
  const params = tokens.flatMap((token) => {
    const pattern = `%${token.replace(/[%_]/g, '\\$&')}%`;
    return [pattern, pattern];
  });
  const hits = await db.getAllAsync<{ section_id: string }>(
    `SELECT section_id FROM constitution_search_plain WHERE ${whereClause} LIMIT 30`,
    params
  );
  return resolveIdsToSections(db, hits.map((h) => h.section_id));
}

export async function searchConstitution(query: string): Promise<ConstitutionSectionRow[]> {
  if (!query.trim()) return [];
  const db = await getDb();

  if (ftsSupported !== false) {
    try {
      const ftsQuery = toFtsQuery(query);
      const hits = await db.getAllAsync<{ section_id: string }>(
        `SELECT section_id FROM constitution_search WHERE constitution_search MATCH ? ORDER BY rank LIMIT 30`,
        [ftsQuery]
      );
      ftsSupported = true;
      return resolveIdsToSections(db, hits.map((h) => h.section_id));
    } catch {
      ftsSupported = false;
      // fall through to the LIKE-based fallback below
    }
  }

  return searchConstitutionPlain(db, query);
}
