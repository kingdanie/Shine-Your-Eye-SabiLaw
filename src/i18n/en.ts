/**
 * English strings — UI chrome + all mock content. This is the fallback
 * dictionary: any key missing from another language resolves here.
 */
export const en: Record<string, string> = {
  // ---------------------------------------------------------------------
  // Chrome
  // ---------------------------------------------------------------------
  'common.appName': 'Know Your Right',
  'common.skip': 'Skip',
  'common.next': 'Next',
  'common.back': 'Back',
  'common.getStarted': 'Get Started',
  'common.continueWithGoogle': 'Continue with Google',
  'common.continueWithApple': 'Continue with Apple',
  'common.orContinueWith': 'OR CONTINUE WITH',
  'common.signIn': 'Sign In',
  'common.readMore': 'Read more',
  'common.viewAll': 'View all',
  'common.save': 'Save',
  'common.saved': 'Saved',
  'common.cancel': 'Cancel',
  'common.retry': 'Try again',
  'common.call': 'Call',
  'common.close': 'Close',
  'common.yes': 'Yes',
  'common.no': 'No',

  'onboarding.step1.title': 'Law in Plain English',
  'onboarding.step1.body':
    'Complex legal jargon translated into everyday language you can easily understand and apply.',
  'onboarding.step2.title': 'Choose your language',
  'onboarding.step2.body':
    "Pick the language you're most comfortable reading in. You can change this anytime.",
  'onboarding.step2.english': 'English',
  'onboarding.step2.pidgin': 'Pidgin',
  'onboarding.step2.hausa': 'Hausa',
  'onboarding.step2.igbo': 'Igbo',
  'onboarding.step2.yoruba': 'Yorùbá',
  'onboarding.step3.title': 'What matters to you?',
  'onboarding.step3.body':
    "Pick a few topics and we'll show you relevant answers first. You can skip this.",
  'onboarding.step3.cta': 'Done',

  'auth.register.title': 'Join the Community',
  'auth.register.subtitle': 'Secure, private, and always available.',
  'auth.register.placeholder': 'Phone Number or Email',
  'auth.register.terms': 'By joining, you agree to our Terms of Service and Privacy Policy.',
  'auth.register.haveAccount': 'Already have an account?',
  'auth.login.title': 'Welcome Back',
  'auth.login.subtitle': 'Sign in to access your saved history.',
  'auth.login.placeholderIdentifier': 'Phone or Email',
  'auth.login.placeholderPassword': 'Password',
  'auth.login.forgotPassword': 'Forgot password?',
  'auth.login.noAccount': "Don't have an account?",
  'auth.login.joinLink': 'Join the Community',

  'home.greeting': 'Good morning, {{name}} 👋',
  'home.subtitle': 'Get clear answers to your legal questions and know your rights.',
  'home.searchPlaceholder': 'What legal issue can we help you with?',
  'home.exploreTopics': 'Explore Popular Topics',
  'home.bannerTitle': 'Know Your Rights. Protect Yourself.',
  'home.bannerBody': 'Get reliable legal information and take the right action with confidence.',
  'home.bannerCta': 'Learn More',
  'home.recentActivity': 'Recent Activity',
  'home.emptyRecent': 'Your answered questions will show up here.',
  'home.helpFabLabel': 'Get emergency help',

  'ask.title': 'Explain what happened...',
  'ask.subtitle': 'Provide details so our experts can give you the best answer.',
  'ask.textPlaceholder': 'Type your question here...',
  'ask.getAnswer': 'Get Answer',
  'ask.listening': 'Listening...',
  'ask.loading': 'Looking through the law...',
  'ask.emptyResults.title': "We couldn't find an answer for that",
  'ask.emptyResults.body': 'Try asking it differently, or browse topics below.',

  'answer.title': 'Answer',
  'answer.shortAnswerLabel': 'Short Answer:',
  'answer.whyHeading': "Here's why:",
  'answer.readMore': 'Read more',
  'answer.readMoreBody': 'View the full legal explanation and related laws.',
  'answer.talkToLawyer': 'Talk to a Lawyer',
  'answer.relatedHeading': 'Related questions',
  'answer.feedbackPrompt': 'Was this helpful?',
  'answer.citationPrefix': 'Based on:',
  'answer.offlineBannerTitle': 'Offline Mode',
  'answer.offlineBannerBody':
    "You're viewing a saved answer. Connect to the internet for the latest updates.",
  'answer.offlineUnavailableTitle': 'This answer needs an internet connection',
  'answer.offlineUnavailableBody':
    "You haven't viewed this one before, so it isn't saved for offline use yet.",

  'source.title': 'Legal Source',
  'source.contextLabel': 'In plain language:',
  'source.sourceLabel': 'The law, in full:',
  'source.disclaimerNote':
    'This is a plain-language paraphrase for reference, not a certified legal text.',

  'topic.viewAll': 'All topics',
  'topic.commonQuestions': 'Common questions',

  'saved.title': 'My Legal Inquiries',
  'saved.subtitle': 'View and revisit your saved questions and answers.',
  'saved.tabSaved': 'Saved',
  'saved.tabRecent': 'Recent',
  'saved.tipTitle': 'Save important answers',
  'saved.tipBody': 'Bookmark answers to easily find them whenever you need.',
  'saved.emptySaved.title': 'No saved answers yet',
  'saved.emptySaved.body': 'Tap the bookmark on any answer to keep it here.',
  'saved.emptyRecent.title': 'No history yet',
  'saved.emptyRecent.body': 'Answers you view will show up here.',
  'saved.signInPrompt.title': 'Sign in to keep your history',
  'saved.signInPrompt.body': 'Create a free account to save questions and revisit them anytime.',
  'saved.signInPrompt.cta': 'Join the Community',
  'saved.status.answered': 'Answered',

  'profile.verifiedBadge': 'Verified Citizen',
  'profile.editProfile': 'Edit Profile',
  'profile.settingsHeading': 'Settings',
  'profile.accountInformation': 'Account Information',
  'profile.language': 'Language',
  'profile.notificationPreferences': 'Notification Preferences',
  'profile.privacySecurity': 'Privacy & Security',
  'profile.helpSupport': 'Help & Support',
  'profile.signOut': 'Sign Out',
  'profile.signInCta': 'Sign in or create an account',
  'profile.guestName': 'Guest',

  'help.title': 'Help & Support',
  'help.subtitle': 'Get emergency contacts and legal help, fast.',
  'help.emergencyHeading': 'Emergency contacts',
  'help.directoryHeading': 'Talk to a lawyer',
  'help.disclaimerNote':
    'Numbers shown are placeholders for this preview build and are not yet verified.',
  'help.callAction': 'Call',

  'disclaimer.text': "This explains the law simply. It isn't legal advice for your specific case.",

  // ---------------------------------------------------------------------
  // Topics
  // ---------------------------------------------------------------------
  'topic.police.label': 'Police',
  'topic.police.description': 'Know your rights when dealing with the police',
  'topic.tenancy.label': 'Tenant',
  'topic.tenancy.description': 'Rental agreements, evictions & more',
  'topic.work.label': 'Work',
  'topic.work.description': 'Employment rights & workplace issues',
  'topic.family.label': 'Family',
  'topic.family.description': 'Marriage, divorce, custody & more',
  'topic.consumer.label': 'Consumer',
  'topic.consumer.description': 'Your rights as a consumer',
  'topic.business.label': 'Business',
  'topic.business.description': 'Starting, running & growing your business',

  // ---------------------------------------------------------------------
  // Q&A — Police & Arrest
  // ---------------------------------------------------------------------
  'qa.police-arrest-warrant.question': 'Can the police arrest me without a warrant?',
  'qa.police-arrest-warrant.shortAnswer':
    'Yes, but only in specific situations. Police can arrest you without a warrant if they catch you committing an offence, reasonably suspect you of a serious crime, or you try to evade arrest.',
  'qa.police-arrest-warrant.why.1':
    'For minor offences, they usually need a warrant from a court first.',
  'qa.police-arrest-warrant.why.2':
    'Once arrested, they must bring you before a court within a reasonable time — usually 24 to 48 hours.',
  'qa.police-arrest-warrant.why.3':
    "Being arrested without a warrant doesn't automatically mean the arrest was illegal — check the circumstances against these rules.",
  'qa.police-arrest-warrant.tip':
    'If you think your arrest was unlawful, you can raise this with a lawyer or the Legal Aid Council.',
  'qa.police-arrest-warrant.fullSource':
    'Under the Administration of Criminal Justice Act (ACJA) 2015, a police officer may arrest a person without a warrant if the person is found committing an offence, is reasonably suspected of a felony, or obstructs an officer making a lawful arrest. Arrests for lesser offences generally require the officer to have witnessed the act or to hold a strong, reasonable suspicion supported by facts. This is a plain-language paraphrase of Section 18 for reference only.',

  'qa.police-rights-if-arrested.question': "What are my rights if I'm arrested?",
  'qa.police-rights-if-arrested.shortAnswer':
    'You have the right to remain silent, the right to know why you are being arrested, and the right to contact a lawyer or a relative.',
  'qa.police-rights-if-arrested.why.1':
    "You don't have to answer questions beyond confirming your identity.",
  'qa.police-rights-if-arrested.why.2':
    'You can ask to call a lawyer or family member before answering further questions.',
  'qa.police-rights-if-arrested.why.3':
    'You must be told the reason for your arrest, in a language you understand.',
  'qa.police-rights-if-arrested.why.4':
    'You should be brought before a court within 24–48 hours, or released.',
  'qa.police-rights-if-arrested.tip':
    'Stay calm and polite, and remember details — officer names, badge numbers, time and place — to share with a lawyer later.',
  'qa.police-rights-if-arrested.fullSource':
    'The Constitution of Nigeria 1999 (Section 35) and the ACJA 2015 set out rights on arrest: to be informed promptly of the reason for arrest, to remain silent or avoid answering questions until a legal practitioner is present, and to be produced before a court within a reasonable time. This is a plain-language paraphrase for reference only.',

  'qa.police-phone-search.question': 'Can the police search my phone without a warrant?',
  'qa.police-phone-search.shortAnswer':
    'No, not generally. Going through the contents of your phone usually requires your consent or a court warrant, even during a lawful arrest.',
  'qa.police-phone-search.why.1':
    "Your phone's contents are protected under your constitutional right to privacy.",
  'qa.police-phone-search.why.2':
    'Officers can hold your phone as evidence, but searching its contents without consent or a warrant is a separate matter from simply seizing it.',
  'qa.police-phone-search.why.3':
    "If your phone was searched without consent or a warrant, that's worth raising with a lawyer.",
  'qa.police-phone-search.tip':
    "You can politely state that you don't consent to a phone search, and ask for that to be noted.",
  'qa.police-phone-search.fullSource':
    "Section 37 of the Constitution of Nigeria 1999 guarantees citizens' right to privacy of their homes, correspondence, and communications. While a device can be seized as evidence during a lawful process, accessing the private data on it typically requires consent or judicial authorisation. This is a plain-language paraphrase for reference only.",

  // ---------------------------------------------------------------------
  // Q&A — Tenant & Landlord
  // ---------------------------------------------------------------------
  'qa.tenancy-lockout.question': 'Can my landlord lock me out?',
  'qa.tenancy-lockout.shortAnswer':
    'No. Your landlord cannot lock you out, remove your roof, or turn off your utilities to force you out.',
  'qa.tenancy-lockout.why.1':
    'They must give you a proper, written "Notice to Quit" based on your tenancy agreement.',
  'qa.tenancy-lockout.why.2':
    'If they want to evict you, they must take you to court and get a legal eviction order from a judge.',
  'qa.tenancy-lockout.why.3': 'Locking you out without a court order is a criminal offense.',
  'qa.tenancy-lockout.why.4': 'You have the right to quiet enjoyment of your home under the law.',
  'qa.tenancy-lockout.tip':
    "If your landlord has locked you out or cut off utilities, you can report it and seek legal help.",
  'qa.tenancy-lockout.fullSource':
    'Under the Lagos State Tenancy Law 2011 (Section 28), self-help eviction — locking out a tenant, removing doors, windows or roofing, or disconnecting utilities to force a tenant out — is prohibited and can amount to a criminal offence. A landlord must follow due process: serve a valid notice, then obtain a court order before recovering possession. This is a plain-language paraphrase for reference only; tenancy law varies by state in Nigeria.',

  'qa.tenancy-notice-period.question': 'How much notice must my landlord give before eviction?',
  'qa.tenancy-notice-period.shortAnswer':
    'It depends on your tenancy type — usually one week for a weekly tenant, one month for a monthly tenant, three months for a quarterly tenant, and six months for a yearly tenant.',
  'qa.tenancy-notice-period.why.1':
    "The notice period is tied to how often you pay rent, not how long you've lived there.",
  'qa.tenancy-notice-period.why.2':
    'A valid "Notice to Quit" must be in writing and correctly addressed to you.',
  'qa.tenancy-notice-period.why.3':
    'After the notice period, the landlord still needs a separate court process before eviction.',
  'qa.tenancy-notice-period.fullSource':
    'The Lagos State Tenancy Law 2011 (Section 13) sets minimum notice periods based on the tenancy period: 1 week for weekly tenancies, 1 month for monthly, 3 months for quarterly/half-yearly, and 6 months for yearly tenancies. This is a plain-language paraphrase for reference only; other states set their own periods.',

  'qa.tenancy-rent-increase.question': 'Can my landlord increase my rent anytime?',
  'qa.tenancy-rent-increase.shortAnswer':
    'No. A landlord generally cannot raise your rent in the middle of an existing tenancy term without your agreement.',
  'qa.tenancy-rent-increase.why.1':
    "Rent increases usually apply at renewal, not mid-term, unless your agreement says otherwise.",
  'qa.tenancy-rent-increase.why.2':
    "You're entitled to reasonable notice of any proposed increase before being asked to renew.",
  'qa.tenancy-rent-increase.fullSource':
    'Under the Lagos State Tenancy Law 2011, rent reviews are expected to happen at renewal rather than mid-tenancy, and unreasonable or excessive increases can be challenged before the Rent Tribunal. This is a plain-language paraphrase for reference only.',

  // ---------------------------------------------------------------------
  // Q&A — Work & Employment
  // ---------------------------------------------------------------------
  'qa.work-fired-without-notice.question': 'Can I be fired without notice?',
  'qa.work-fired-without-notice.shortAnswer':
    'No, not usually. Your employer must give you notice (or pay in place of notice) unless you were dismissed for serious misconduct.',
  'qa.work-fired-without-notice.why.1':
    "The length of notice depends on how long you've worked there — often one day to one month for shorter service.",
  'qa.work-fired-without-notice.why.2':
    "A notice period shorter than what's fair can usually be topped up with pay in lieu.",
  'qa.work-fired-without-notice.why.3':
    'Your outstanding wages and entitlements are still owed even at termination.',
  'qa.work-fired-without-notice.tip':
    'Keep a copy of your employment letter — it usually states your exact notice period.',
  'qa.work-fired-without-notice.fullSource':
    'Section 11 of the Labour Act (Cap L1) requires an employer to give notice before terminating employment (length depending on length of service), or wages in lieu of that notice, except in cases of proven gross misconduct. This is a plain-language paraphrase for reference only.',

  'qa.work-maternity-leave.question': 'Am I entitled to maternity leave?',
  'qa.work-maternity-leave.shortAnswer':
    'Yes. Female employees are entitled to maternity leave, with at least part of it paid, under the Labour Act.',
  'qa.work-maternity-leave.why.1':
    "You're generally entitled to up to 12 weeks of maternity leave, split before and after birth.",
  'qa.work-maternity-leave.why.2':
    "You should receive at least 50% of your normal wages during this leave, once you've worked long enough for your employer.",
  'qa.work-maternity-leave.why.3':
    'Your employer generally cannot terminate your employment because you are pregnant or on maternity leave.',
  'qa.work-maternity-leave.fullSource':
    'Section 54 of the Labour Act (Cap L1) provides for maternity leave of up to twelve weeks (six before, six after confinement) for qualifying female employees, with at least 50% of wages payable during that period. This is a plain-language paraphrase for reference only.',

  'qa.work-minimum-wage.question': 'What is the minimum wage in Nigeria?',
  'qa.work-minimum-wage.shortAnswer':
    "There's a national minimum wage that qualifying employers must pay, though the exact figure changes periodically by law.",
  'qa.work-minimum-wage.why.1':
    'The minimum wage is reviewed by the National Assembly and can change — always check for the current figure before relying on a number.',
  'qa.work-minimum-wage.why.2':
    'Some categories of workers and small employers may be treated differently under the Act.',
  'qa.work-minimum-wage.fullSource':
    'The National Minimum Wage Act sets a floor wage that qualifying employers must pay employees, subject to periodic review and amendment. This is a plain-language paraphrase for reference only — always confirm the current figure, as it changes over time.',

  'qa.work-unpaid-salary.question': "What can I do if my employer doesn't pay my salary?",
  'qa.work-unpaid-salary.shortAnswer':
    "You can formally demand payment in writing, then take your case to the National Industrial Court if it isn't resolved.",
  'qa.work-unpaid-salary.why.1':
    'Start with a clear, dated, written request for the unpaid amount.',
  'qa.work-unpaid-salary.why.2':
    'The National Industrial Court handles employment and wage disputes in Nigeria.',
  'qa.work-unpaid-salary.why.3':
    'Keep your employment letter, payslips, and any messages as evidence.',
  'qa.work-unpaid-salary.tip':
    'The Ministry of Labour can also help mediate wage disputes before you need to go to court.',
  'qa.work-unpaid-salary.fullSource':
    'The National Industrial Court Act 2006 (Section 7) gives the National Industrial Court exclusive jurisdiction over labour and employment disputes, including unpaid wages, allowing employees to formally pursue outstanding pay. This is a plain-language paraphrase for reference only.',

  // ---------------------------------------------------------------------
  // Q&A — Family & Marriage
  // ---------------------------------------------------------------------
  'qa.family-child-custody.question': 'How is child custody decided after divorce?',
  'qa.family-child-custody.shortAnswer':
    "Courts decide custody based on the best interests of the child, considering the child's age, each parent's circumstances, and the child's own wishes if old enough.",
  'qa.family-child-custody.why.1':
    "Very young children are often placed with their mother, but this isn't automatic.",
  'qa.family-child-custody.why.2':
    'Courts can award joint custody, or split custody and access/visitation rights.',
  'qa.family-child-custody.why.3':
    'You can apply to vary a custody order later if circumstances change significantly.',
  'qa.family-child-custody.tip':
    "Courts generally prioritise stability and the child's welfare over either parent's preference.",
  'qa.family-child-custody.fullSource':
    "Section 71 of the Matrimonial Causes Act directs courts to treat the welfare of the child as the paramount consideration in custody matters, weighing factors such as the child's age, wishes, and each parent's ability to provide care. This is a plain-language paraphrase for reference only.",

  'qa.family-divorce-grounds.question': 'What are the grounds for divorce in Nigeria?',
  'qa.family-divorce-grounds.shortAnswer':
    "There's one legal ground — that the marriage has broken down irretrievably — proven through specific facts like adultery, unreasonable behaviour, or living apart for a set period.",
  'qa.family-divorce-grounds.why.1':
    "You'll need to show one or more recognised facts to the court, not just that the marriage isn't working.",
  'qa.family-divorce-grounds.why.2':
    'Separation-based grounds usually require a minimum period apart — commonly two years or more, longer if one party disagrees.',
  'qa.family-divorce-grounds.fullSource':
    'Section 15 of the Matrimonial Causes Act provides a single ground for divorce — that the marriage has broken down irretrievably — which must be established through one of several specified facts (e.g. adultery, desertion, living apart for a continuous period). This is a plain-language paraphrase for reference only.',

  // ---------------------------------------------------------------------
  // Q&A — Consumer Rights
  // ---------------------------------------------------------------------
  'qa.consumer-faulty-refund.question': 'Can I get a refund for a faulty product?',
  'qa.consumer-faulty-refund.shortAnswer':
    'Yes. Consumers are entitled to a repair, replacement, or refund when a product is defective or not fit for purpose.',
  'qa.consumer-faulty-refund.why.1':
    'The remedy you get may depend on how serious the fault is and how soon you noticed it.',
  'qa.consumer-faulty-refund.why.2':
    'Keep your receipt or proof of purchase — it makes the claim much easier.',
  'qa.consumer-faulty-refund.why.3':
    'You can report a seller who refuses reasonable remedies to consumer protection authorities.',
  'qa.consumer-faulty-refund.tip':
    'The Federal Competition and Consumer Protection Commission (FCCPC) handles consumer complaints.',
  'qa.consumer-faulty-refund.fullSource':
    "The Federal Competition and Consumer Protection Act (FCCPA) 2018 (Section 130) protects consumers' rights to redress — repair, replacement or refund — for defective goods, and prohibits sellers from contracting out of these rights. This is a plain-language paraphrase for reference only.",

  'qa.consumer-false-advertising.question': 'What are my rights against false advertising?',
  'qa.consumer-false-advertising.shortAnswer':
    "No — sellers can't legally mislead you with false claims about a product or service. You can report it and may be entitled to a remedy.",
  'qa.consumer-false-advertising.why.1':
    'Misleading pricing, quality claims, or endorsements can all count as false advertising.',
  'qa.consumer-false-advertising.why.2':
    'You can complain to the FCCPC, which can investigate and penalise businesses.',
  'qa.consumer-false-advertising.fullSource':
    'The FCCPA 2018 (Section 114) prohibits false, misleading, or deceptive representations in trade, giving consumers grounds to complain and seek remedies against businesses that breach this. This is a plain-language paraphrase for reference only.',

  // ---------------------------------------------------------------------
  // Q&A — Business & Registration
  // ---------------------------------------------------------------------
  'qa.business-register-name.question': 'How do I register a business name?',
  'qa.business-register-name.shortAnswer':
    'You register through the Corporate Affairs Commission (CAC) — reserve a name, submit your details and ID, and pay the applicable fee.',
  'qa.business-register-name.why.1':
    "You'll typically need a valid means of ID and your business details ready.",
  'qa.business-register-name.why.2':
    'Name reservation and registration can often be done online via the CAC portal.',
  'qa.business-register-name.why.3':
    'Registration gives your business legal recognition and can help you open a business bank account.',
  'qa.business-register-name.fullSource':
    'Under the Companies and Allied Matters Act (CAMA) 2020 (Section 814 and related provisions), business names must be registered with the Corporate Affairs Commission, involving reservation of an available name and filing the required registration details. This is a plain-language paraphrase for reference only.',

  'qa.business-need-lawyer.question': 'Do I need a lawyer to register a company?',
  'qa.business-need-lawyer.shortAnswer':
    'No, not strictly — you can register directly through the CAC — but a lawyer or accredited agent can help you avoid costly mistakes, especially for companies rather than a simple business name.',
  'qa.business-need-lawyer.why.1':
    'Simple business name registration is often manageable without a lawyer.',
  'qa.business-need-lawyer.why.2':
    'Company registration (Ltd, etc.) has more legal steps where professional guidance really helps.',
  'qa.business-need-lawyer.tip':
    'If your structure involves multiple shareholders or complex agreements, professional help is strongly recommended.',
  'qa.business-need-lawyer.fullSource':
    'CAMA 2020 (Section 18) sets out requirements for forming a company, which self-filers can complete, though the process is more involved than business name registration and benefits from professional guidance. This is a plain-language paraphrase for reference only.',

  // ---------------------------------------------------------------------
  // Emergency contacts
  // ---------------------------------------------------------------------
  'emergency.police-complaint-unit.name': 'Police Complaint Response Unit',
  'emergency.police-complaint-unit.description':
    'Report police misconduct or human rights abuses by officers.',
  'emergency.human-rights-commission.name': 'National Human Rights Commission',
  'emergency.human-rights-commission.description':
    'File a complaint about a human rights violation.',
  'emergency.legal-aid-council.name': 'Legal Aid Council of Nigeria',
  'emergency.legal-aid-council.description': 'Free legal assistance for those who qualify.',
  'emergency.lawyer-directory.name': 'Find a Lawyer',
  'emergency.lawyer-directory.description': 'Get matched with a lawyer for paid legal support.',
};
