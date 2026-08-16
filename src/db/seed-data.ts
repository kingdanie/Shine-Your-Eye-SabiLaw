import type { EmergencyContactRow, QAEntryRow, TopicRow } from './types';

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
 * PLACEHOLDER CONTACTS — `is_verified: 0` on every row deliberately.
 * These are NOT confirmed real emergency numbers. Do not ship without
 * replacing with numbers verified against the relevant agency and legal/ops
 * sign-off — this is safety-critical content.
 */
export const emergencyContacts: EmergencyContactRow[] = [
  {
    id: 'police-complaint-unit',
    name_key: 'emergency.police-complaint-unit.name',
    category: 'police',
    phone: '0800-000-0000',
    description_key: 'emergency.police-complaint-unit.description',
    is_verified: 0,
  },
  {
    id: 'human-rights-commission',
    name_key: 'emergency.human-rights-commission.name',
    category: 'human-rights',
    phone: '0800-111-1111',
    description_key: 'emergency.human-rights-commission.description',
    is_verified: 0,
  },
  {
    id: 'legal-aid-council',
    name_key: 'emergency.legal-aid-council.name',
    category: 'legal-aid',
    phone: '0800-222-2222',
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
