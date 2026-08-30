export type TopicId = 'police' | 'tenancy' | 'work' | 'family' | 'consumer' | 'business';

export interface TopicRow {
  id: TopicId;
  label_key: string;
  icon: string;
  color: string;
  description_key: string;
  sort_order: number;
}

export interface WhyItMattersStep {
  textKey: string;
  icon: string;
}

export interface QAEntryRow {
  id: string;
  topic_id: TopicId;
  question_key: string;
  verdict: 'yes' | 'no' | null;
  short_answer_key: string;
  why_it_matters: string; // JSON-encoded WhyItMattersStep[]
  tip_key: string | null;
  citation_act: string;
  citation_section: string;
  full_source_text_key: string;
  related_ids: string; // JSON-encoded string[]
  is_high_stakes: number; // 0 | 1
}

/** `QAEntryRow` with JSON columns parsed for app use. */
export interface QAEntry
  extends Omit<QAEntryRow, 'why_it_matters' | 'related_ids' | 'is_high_stakes'> {
  whyItMatters: WhyItMattersStep[];
  relatedIds: string[];
  isHighStakes: boolean;
}

export type EmergencyCategory = 'police' | 'human-rights' | 'legal-aid' | 'lawyer-directory';

export interface EmergencyContactRow {
  id: string;
  name_key: string;
  category: EmergencyCategory;
  phone: string;
  description_key: string | null;
  is_verified: number; // 0 | 1 — see seed-data.ts caveat
}

export interface SavedRow {
  qa_id: string;
  saved_at: number;
}

export interface RecentlyViewedRow {
  qa_id: string;
  viewed_at: number;
}

export interface ConstitutionChapterRow {
  id: string;
  number: number;
  title_key: string;
  sort_order: number;
}

export interface ConstitutionSectionRow {
  id: string;
  chapter_id: string;
  /** Display label, not a quantity — ss. 254A-254F aren't integers. */
  number: string;
  heading_key: string;
  body_key: string;
  sort_order: number;
}
