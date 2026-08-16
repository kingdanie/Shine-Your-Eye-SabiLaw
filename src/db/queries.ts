import { getDb } from './client';
import type {
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

export async function getSaved(): Promise<QAEntry[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<QAEntryRow>(
    `SELECT qa_entries.* FROM qa_entries
     JOIN saved ON saved.qa_id = qa_entries.id
     ORDER BY saved.saved_at DESC`
  );
  return rows.map(toQAEntry);
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

export async function getRecentlyViewed(limit = RECENTLY_VIEWED_CAP): Promise<QAEntry[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<QAEntryRow>(
    `SELECT qa_entries.* FROM qa_entries
     JOIN recently_viewed ON recently_viewed.qa_id = qa_entries.id
     ORDER BY recently_viewed.viewed_at DESC
     LIMIT ?`,
    [limit]
  );
  return rows.map(toQAEntry);
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
