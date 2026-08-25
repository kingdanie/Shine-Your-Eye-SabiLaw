import type {
  ConstitutionChapterRow,
  ConstitutionSectionRow,
  EmergencyContactRow,
  QAEntryRow,
  TopicRow,
} from './types';

/**
 * MOCK CONTENT — for scaffolding the UI only.
 *
 * `full_source_text_key` strings are plain-language PARAPHRASES of the
 * named Act/section, written for this demo — they are deliberately not
 * presented as verbatim statute text, and citations (Act name + section)
 * are illustrative. None of this has had legal review. Before any real
 * release: replace with verified citations/text and get sign-off from
 * qualified Nigerian counsel.
 */

export const topics: TopicRow[] = [
  {
    id: 'police',
    label_key: 'topic.police.label',
    icon: 'shield-checkmark-outline',
    color: '#008751',
    description_key: 'topic.police.description',
    sort_order: 0,
  },
  {
    id: 'tenancy',
    label_key: 'topic.tenancy.label',
    icon: 'home-outline',
    color: '#008751',
    description_key: 'topic.tenancy.description',
    sort_order: 1,
  },
  {
    id: 'work',
    label_key: 'topic.work.label',
    icon: 'briefcase-outline',
    color: '#008751',
    description_key: 'topic.work.description',
    sort_order: 2,
  },
  {
    id: 'family',
    label_key: 'topic.family.label',
    icon: 'people-outline',
    color: '#008751',
    description_key: 'topic.family.description',
    sort_order: 3,
  },
  {
    id: 'consumer',
    label_key: 'topic.consumer.label',
    icon: 'cart-outline',
    color: '#008751',
    description_key: 'topic.consumer.description',
    sort_order: 4,
  },
  {
    id: 'business',
    label_key: 'topic.business.label',
    icon: 'briefcase-outline',
    color: '#008751',
    description_key: 'topic.business.description',
    sort_order: 5,
  },
];

function whyItMatters(steps: { textKey: string; icon: string }[]) {
  return JSON.stringify(steps);
}
function relatedIds(ids: string[]) {
  return JSON.stringify(ids);
}

export const qaEntries: QAEntryRow[] = [
  // ---- Police & Arrest ----
  {
    id: 'police-arrest-warrant',
    topic_id: 'police',
    question_key: 'qa.police-arrest-warrant.question',
    verdict: 'yes',
    short_answer_key: 'qa.police-arrest-warrant.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.police-arrest-warrant.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.police-arrest-warrant.why.2', icon: 'time-outline' },
      { textKey: 'qa.police-arrest-warrant.why.3', icon: 'alert-circle-outline' },
    ]),
    tip_key: 'qa.police-arrest-warrant.tip',
    citation_act: 'Administration of Criminal Justice Act (ACJA) 2015',
    citation_section: 'Section 18',
    full_source_text_key: 'qa.police-arrest-warrant.fullSource',
    related_ids: relatedIds(['police-rights-if-arrested', 'police-phone-search']),
    is_high_stakes: 1,
  },
  {
    id: 'police-rights-if-arrested',
    topic_id: 'police',
    question_key: 'qa.police-rights-if-arrested.question',
    verdict: null,
    short_answer_key: 'qa.police-rights-if-arrested.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.police-rights-if-arrested.why.1', icon: 'chatbubble-ellipses-outline' },
      { textKey: 'qa.police-rights-if-arrested.why.2', icon: 'call-outline' },
      { textKey: 'qa.police-rights-if-arrested.why.3', icon: 'time-outline' },
      { textKey: 'qa.police-rights-if-arrested.why.4', icon: 'document-text-outline' },
    ]),
    tip_key: 'qa.police-rights-if-arrested.tip',
    citation_act: 'Constitution of Nigeria 1999',
    citation_section: 'Section 35',
    full_source_text_key: 'qa.police-rights-if-arrested.fullSource',
    related_ids: relatedIds(['police-arrest-warrant', 'police-phone-search']),
    is_high_stakes: 1,
  },
  {
    id: 'police-phone-search',
    topic_id: 'police',
    question_key: 'qa.police-phone-search.question',
    verdict: 'no',
    short_answer_key: 'qa.police-phone-search.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.police-phone-search.why.1', icon: 'lock-closed-outline' },
      { textKey: 'qa.police-phone-search.why.2', icon: 'document-text-outline' },
      { textKey: 'qa.police-phone-search.why.3', icon: 'alert-circle-outline' },
    ]),
    tip_key: 'qa.police-phone-search.tip',
    citation_act: 'Constitution of Nigeria 1999',
    citation_section: 'Section 37',
    full_source_text_key: 'qa.police-phone-search.fullSource',
    related_ids: relatedIds(['police-rights-if-arrested']),
    is_high_stakes: 0,
  },

  // ---- Tenant & Landlord ----
  {
    id: 'tenancy-lockout',
    topic_id: 'tenancy',
    question_key: 'qa.tenancy-lockout.question',
    verdict: 'no',
    short_answer_key: 'qa.tenancy-lockout.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.tenancy-lockout.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.tenancy-lockout.why.2', icon: 'hammer-outline' },
      { textKey: 'qa.tenancy-lockout.why.3', icon: 'lock-closed-outline' },
      { textKey: 'qa.tenancy-lockout.why.4', icon: 'scale-outline' },
    ]),
    tip_key: 'qa.tenancy-lockout.tip',
    citation_act: 'Lagos State Tenancy Law 2011',
    citation_section: 'Section 28',
    full_source_text_key: 'qa.tenancy-lockout.fullSource',
    related_ids: relatedIds(['tenancy-notice-period', 'tenancy-rent-increase']),
    is_high_stakes: 1,
  },
  {
    id: 'tenancy-notice-period',
    topic_id: 'tenancy',
    question_key: 'qa.tenancy-notice-period.question',
    verdict: null,
    short_answer_key: 'qa.tenancy-notice-period.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.tenancy-notice-period.why.1', icon: 'time-outline' },
      { textKey: 'qa.tenancy-notice-period.why.2', icon: 'document-text-outline' },
      { textKey: 'qa.tenancy-notice-period.why.3', icon: 'hammer-outline' },
    ]),
    tip_key: null,
    citation_act: 'Lagos State Tenancy Law 2011',
    citation_section: 'Section 13',
    full_source_text_key: 'qa.tenancy-notice-period.fullSource',
    related_ids: relatedIds(['tenancy-lockout']),
    is_high_stakes: 0,
  },
  {
    id: 'tenancy-rent-increase',
    topic_id: 'tenancy',
    question_key: 'qa.tenancy-rent-increase.question',
    verdict: 'no',
    short_answer_key: 'qa.tenancy-rent-increase.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.tenancy-rent-increase.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.tenancy-rent-increase.why.2', icon: 'time-outline' },
    ]),
    tip_key: null,
    citation_act: 'Lagos State Tenancy Law 2011',
    citation_section: 'Section 4',
    full_source_text_key: 'qa.tenancy-rent-increase.fullSource',
    related_ids: relatedIds(['tenancy-lockout', 'tenancy-notice-period']),
    is_high_stakes: 0,
  },

  // ---- Work & Employment ----
  {
    id: 'work-fired-without-notice',
    topic_id: 'work',
    question_key: 'qa.work-fired-without-notice.question',
    verdict: 'no',
    short_answer_key: 'qa.work-fired-without-notice.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.work-fired-without-notice.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.work-fired-without-notice.why.2', icon: 'time-outline' },
      { textKey: 'qa.work-fired-without-notice.why.3', icon: 'cash-outline' },
    ]),
    tip_key: 'qa.work-fired-without-notice.tip',
    citation_act: 'Labour Act (Cap L1)',
    citation_section: 'Section 11',
    full_source_text_key: 'qa.work-fired-without-notice.fullSource',
    related_ids: relatedIds(['work-unpaid-salary']),
    is_high_stakes: 0,
  },
  {
    id: 'work-maternity-leave',
    topic_id: 'work',
    question_key: 'qa.work-maternity-leave.question',
    verdict: 'yes',
    short_answer_key: 'qa.work-maternity-leave.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.work-maternity-leave.why.1', icon: 'time-outline' },
      { textKey: 'qa.work-maternity-leave.why.2', icon: 'cash-outline' },
      { textKey: 'qa.work-maternity-leave.why.3', icon: 'document-text-outline' },
    ]),
    tip_key: null,
    citation_act: 'Labour Act (Cap L1)',
    citation_section: 'Section 54',
    full_source_text_key: 'qa.work-maternity-leave.fullSource',
    related_ids: relatedIds(['work-fired-without-notice']),
    is_high_stakes: 0,
  },
  {
    id: 'work-minimum-wage',
    topic_id: 'work',
    question_key: 'qa.work-minimum-wage.question',
    verdict: null,
    short_answer_key: 'qa.work-minimum-wage.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.work-minimum-wage.why.1', icon: 'cash-outline' },
      { textKey: 'qa.work-minimum-wage.why.2', icon: 'document-text-outline' },
    ]),
    tip_key: null,
    citation_act: 'National Minimum Wage Act 2019',
    citation_section: 'Section 3',
    full_source_text_key: 'qa.work-minimum-wage.fullSource',
    related_ids: relatedIds(['work-unpaid-salary']),
    is_high_stakes: 0,
  },
  {
    id: 'work-unpaid-salary',
    topic_id: 'work',
    question_key: 'qa.work-unpaid-salary.question',
    verdict: null,
    short_answer_key: 'qa.work-unpaid-salary.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.work-unpaid-salary.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.work-unpaid-salary.why.2', icon: 'scale-outline' },
      { textKey: 'qa.work-unpaid-salary.why.3', icon: 'time-outline' },
    ]),
    tip_key: 'qa.work-unpaid-salary.tip',
    citation_act: 'National Industrial Court Act 2006',
    citation_section: 'Section 7',
    full_source_text_key: 'qa.work-unpaid-salary.fullSource',
    related_ids: relatedIds(['work-fired-without-notice', 'work-minimum-wage']),
    is_high_stakes: 0,
  },

  // ---- Family & Marriage ----
  {
    id: 'family-child-custody',
    topic_id: 'family',
    question_key: 'qa.family-child-custody.question',
    verdict: null,
    short_answer_key: 'qa.family-child-custody.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.family-child-custody.why.1', icon: 'people-outline' },
      { textKey: 'qa.family-child-custody.why.2', icon: 'scale-outline' },
      { textKey: 'qa.family-child-custody.why.3', icon: 'document-text-outline' },
    ]),
    tip_key: 'qa.family-child-custody.tip',
    citation_act: 'Matrimonial Causes Act',
    citation_section: 'Section 71',
    full_source_text_key: 'qa.family-child-custody.fullSource',
    related_ids: relatedIds(['family-divorce-grounds']),
    is_high_stakes: 0,
  },
  {
    id: 'family-divorce-grounds',
    topic_id: 'family',
    question_key: 'qa.family-divorce-grounds.question',
    verdict: null,
    short_answer_key: 'qa.family-divorce-grounds.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.family-divorce-grounds.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.family-divorce-grounds.why.2', icon: 'time-outline' },
    ]),
    tip_key: null,
    citation_act: 'Matrimonial Causes Act',
    citation_section: 'Section 15',
    full_source_text_key: 'qa.family-divorce-grounds.fullSource',
    related_ids: relatedIds(['family-child-custody']),
    is_high_stakes: 0,
  },

  // ---- Consumer Rights ----
  {
    id: 'consumer-faulty-refund',
    topic_id: 'consumer',
    question_key: 'qa.consumer-faulty-refund.question',
    verdict: 'yes',
    short_answer_key: 'qa.consumer-faulty-refund.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.consumer-faulty-refund.why.1', icon: 'cart-outline' },
      { textKey: 'qa.consumer-faulty-refund.why.2', icon: 'document-text-outline' },
      { textKey: 'qa.consumer-faulty-refund.why.3', icon: 'time-outline' },
    ]),
    tip_key: 'qa.consumer-faulty-refund.tip',
    citation_act: 'Federal Competition and Consumer Protection Act (FCCPA) 2018',
    citation_section: 'Section 130',
    full_source_text_key: 'qa.consumer-faulty-refund.fullSource',
    related_ids: relatedIds(['consumer-false-advertising']),
    is_high_stakes: 0,
  },
  {
    id: 'consumer-false-advertising',
    topic_id: 'consumer',
    question_key: 'qa.consumer-false-advertising.question',
    verdict: 'no',
    short_answer_key: 'qa.consumer-false-advertising.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.consumer-false-advertising.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.consumer-false-advertising.why.2', icon: 'alert-circle-outline' },
    ]),
    tip_key: null,
    citation_act: 'Federal Competition and Consumer Protection Act (FCCPA) 2018',
    citation_section: 'Section 114',
    full_source_text_key: 'qa.consumer-false-advertising.fullSource',
    related_ids: relatedIds(['consumer-faulty-refund']),
    is_high_stakes: 0,
  },

  // ---- Business & Registration ----
  {
    id: 'business-register-name',
    topic_id: 'business',
    question_key: 'qa.business-register-name.question',
    verdict: null,
    short_answer_key: 'qa.business-register-name.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.business-register-name.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.business-register-name.why.2', icon: 'time-outline' },
      { textKey: 'qa.business-register-name.why.3', icon: 'cash-outline' },
    ]),
    tip_key: null,
    citation_act: 'Companies and Allied Matters Act (CAMA) 2020',
    citation_section: 'Section 814',
    full_source_text_key: 'qa.business-register-name.fullSource',
    related_ids: relatedIds(['business-need-lawyer']),
    is_high_stakes: 0,
  },
  {
    id: 'business-need-lawyer',
    topic_id: 'business',
    question_key: 'qa.business-need-lawyer.question',
    verdict: 'no',
    short_answer_key: 'qa.business-need-lawyer.shortAnswer',
    why_it_matters: whyItMatters([
      { textKey: 'qa.business-need-lawyer.why.1', icon: 'document-text-outline' },
      { textKey: 'qa.business-need-lawyer.why.2', icon: 'people-outline' },
    ]),
    tip_key: 'qa.business-need-lawyer.tip',
    citation_act: 'Companies and Allied Matters Act (CAMA) 2020',
    citation_section: 'Section 18',
    full_source_text_key: 'qa.business-need-lawyer.fullSource',
    related_ids: relatedIds(['business-register-name']),
    is_high_stakes: 0,
  },
];

/**
 * REAL PUBLISHED CONTACTS, still `is_verified: 0` deliberately. Numbers
 * below were pulled from each agency's own official site/channel on
 * 2026-08-19 (sources in each comment) — they are real, current published
 * numbers, not placeholders. `is_verified` stays 0 because this app has not
 * had the ops/legal sign-off step (calling to confirm the line is live,
 * confirming with the agency this is still their current number) that
 * safety-critical content needs before shipping — that sign-off, not the
 * sourcing, is what's still pending.
 *
 * 'lawyer-directory' has no real agency behind it yet (the PRD's "find a
 * lawyer" referral path isn't built) — left as an explicit placeholder.
 */
export const emergencyContacts: EmergencyContactRow[] = [
  {
    id: 'police-complaint-unit',
    name_key: 'emergency.police-complaint-unit.name',
    category: 'police',
    // Nigeria Police Force Complaint Response Unit (CRU) — published call
    // lines, https://x.com/PoliceNG/status/1684850274291085312
    phone: '0805-700-0001',
    description_key: 'emergency.police-complaint-unit.description',
    is_verified: 0,
  },
  {
    id: 'human-rights-commission',
    name_key: 'emergency.human-rights-commission.name',
    category: 'human-rights',
    // National Human Rights Commission — toll-free line,
    // https://www.nigeriarights.gov.ng/contact-us.html
    phone: '0800-647-2428',
    description_key: 'emergency.human-rights-commission.description',
    is_verified: 0,
  },
  {
    id: 'legal-aid-council',
    name_key: 'emergency.legal-aid-council.name',
    category: 'legal-aid',
    // Legal Aid Council of Nigeria — call centre line,
    // https://legalaidcouncil.gov.ng/contact-us/
    phone: '0703-191-5990',
    description_key: 'emergency.legal-aid-council.description',
    is_verified: 0,
  },
  {
    id: 'lawyer-directory',
    name_key: 'emergency.lawyer-directory.name',
    category: 'lawyer-directory',
    phone: '0800-333-3333',
    description_key: 'emergency.lawyer-directory.description',
    is_verified: 0,
  },
];

/**
 * Constitution reader (Stage 1) — structure only; the actual heading/body
 * text lives in i18n (`constitution.section.<n>.heading` /
 * `.body`, en.ts only — this is legal source text, not translated, same
 * convention as qa_entries.full_source_text_key having no pcm.ts entry).
 *
 * Five of the eight chapters are bundled so far: Chapter IV (Fundamental
 * Rights, ss. 33–46) — the chapter this app's Q&A content actually cites
 * most — plus Chapters I, II, III and VIII (ss. 1–32 and 297–320). Text was
 * transcribed from a public reproduction of the Official Gazette text and
 * cross-checked section-by-section against a second, independent source —
 * for Chapter IV, the official Gazette PDF at
 * https://nigeriarights.gov.ng/files/constitution.pdf; for Chapters I, II,
 * III and VIII, the Comparative Constitutions Project's transcription
 * (https://www.constituteproject.org/constitution/Nigeria_1999) was used
 * as the clean primary text (that same Gazette PDF's own text extraction
 * is badly corrupted by page-layout artifacts in these chapters — lines
 * routinely lose their first few characters — so it served only as the
 * cross-check, not the primary source, here). Anywhere the two agreed,
 * that wording was kept verbatim, including several small typographical
 * errors present in the original printed Constitution itself (e.g. s.3(4)
 * "First Scheduled" instead of "First Schedule"; s.6(3) "(5)(a) to (1)"
 * instead of a lettered paragraph — also confirmed against a third source,
 * WIPO Lex; s.11(1)/(3) "any part therefore" instead of "thereof";
 * s.34(1)(b) "he held" instead of "be held"; s.34(1)(c) "forced of
 * compulsory labour" instead of "or"; s.45(1)(b) "rights and freedom or
 * other persons" instead of "of"; s.46(2) "enforcing" instead of
 * "enforcement") — preserved for fidelity rather than silently corrected.
 * Edits made were limited to fixing words that were clearly OCR/extraction
 * artifacts unique to one source and contradicted by the other (e.g. the
 * Gazette PDF's "Cod of Conduct", "Part 11" for "Part II", and a dropped
 * paragraph of s.318 definitions, all confirmed complete and correctly
 * spelled in the Constitute Project text). Chapters V, VI and VII (The
 * Legislature, The Executive, The Judicature — around 250 sections
 * combined) are not bundled yet; the Constitution screen says so rather
 * than implying completeness.
 */
export const constitutionChapters: ConstitutionChapterRow[] = [
  {
    id: 'chapter-1',
    number: 1,
    title_key: 'constitution.chapter.1.title',
    sort_order: 0,
  },
  {
    id: 'chapter-2',
    number: 2,
    title_key: 'constitution.chapter.2.title',
    sort_order: 1,
  },
  {
    id: 'chapter-3',
    number: 3,
    title_key: 'constitution.chapter.3.title',
    sort_order: 2,
  },
  {
    id: 'chapter-4',
    number: 4,
    title_key: 'constitution.chapter.4.title',
    sort_order: 3,
  },
  {
    id: 'chapter-8',
    number: 8,
    title_key: 'constitution.chapter.8.title',
    sort_order: 4,
  },
];

const chapterSectionNumbers: Record<string, number[]> = {
  'chapter-1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  'chapter-2': [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  'chapter-3': [25, 26, 27, 28, 29, 30, 31, 32],
  'chapter-4': [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
  'chapter-8': [
    297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315,
    316, 317, 318, 319, 320,
  ],
};

export const constitutionSections: ConstitutionSectionRow[] = Object.entries(
  chapterSectionNumbers
).flatMap(([chapterId, numbers]) =>
  numbers.map((number, index) => ({
    id: `section-${number}`,
    chapter_id: chapterId,
    number,
    heading_key: `constitution.section.${number}.heading`,
    body_key: `constitution.section.${number}.body`,
    sort_order: index,
  }))
);
