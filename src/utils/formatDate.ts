/**
 * Absolute "Oct 24, 2023" date, for lists where the exact day matters more
 * than recency — Saved/History entries can be months old, and "14 weeks ago"
 * is harder to place than the date itself. Home's recent-activity list stays
 * on `relativeTime`, where the last few items really are all recent.
 *
 * Same `toLocaleDateString` shape `relativeTime` already falls back to for
 * anything older than a few weeks, so the two agree on old entries rather
 * than rendering the same timestamp two different ways.
 */
export function formatDate(timestampMs: number): string {
  return new Date(timestampMs).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
