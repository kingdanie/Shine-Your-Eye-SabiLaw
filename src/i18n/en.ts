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
  'home.constitutionCardTitle': 'Read the Constitution',
  'home.constitutionCardBody': 'The actual text of the law, in the app, offline.',
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
  'profile.constitution': 'The Constitution',
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

  'constitution.title': 'The Constitution',
  'constitution.subtitle': 'Read the Constitution of Nigeria itself, chapter by chapter — available offline.',
  'constitution.searchPlaceholder': 'Search the Constitution...',
  'constitution.availableHeading': 'Available now',
  'constitution.comingSoonHeading': 'Coming soon',
  'constitution.comingSoonBody':
    "The other chapters aren't bundled with the app yet — Chapter IV (Fundamental Rights) is available now.",
  'constitution.searchResultsHeading': 'Search results',
  'constitution.emptySearch.title': 'No matching sections',
  'constitution.emptySearch.body': 'Try a different word, or browse by chapter below.',
  'constitution.chapterSectionsHeading': 'Sections',
  'constitution.sectionLabel': 'Section {{number}}',
  'constitution.readSourceNote':
    'Reproduced from the Official Gazette text of the Constitution, cross-checked section by section against a government-published copy. It includes a small number of typographical errors present in the original printed Constitution itself, kept as printed rather than silently corrected.',

  'constitution.chapter.1.title': 'Chapter I — General Provisions',
  'constitution.chapter.2.title':
    'Chapter II — Fundamental Objectives and Directive Principles of State Policy',
  'constitution.chapter.3.title': 'Chapter III — Citizenship',
  'constitution.chapter.4.title': 'Chapter IV — Fundamental Rights',
  'constitution.chapter.5.title': 'Chapter V — The Legislature',
  'constitution.chapter.6.title': 'Chapter VI — The Executive',
  'constitution.chapter.7.title': 'Chapter VII — The Judicature',
  'constitution.chapter.8.title':
    'Chapter VIII — Federal Capital Territory, Abuja, and General Supplementary Provisions',

  'constitution.section.33.heading': 'Right to life',
  'constitution.section.33.body':
    '(1) Every person has a right to life, and no one shall be deprived intentionally of his life, save in execution of the sentence of a court in respect of a criminal offence of which he has been found guilty in Nigeria.\n\n(2) A person shall not be regarded as having been deprived of his life in contravention of this section, if he dies as a result of the use, to such extent and in such circumstances as are permitted by law, of such force as is reasonably necessary -\n\n(a) for the defence of any person from unlawful violence or for the defence of property:\n\n(b) in order to effect a lawful arrest or to prevent the escape of a person lawfully detained; or\n\n(c) for the purpose of suppressing a riot, insurrection or mutiny.',

  'constitution.section.34.heading': 'Right to dignity of human person',
  'constitution.section.34.body':
    '(1) Every individual is entitled to respect for the dignity of his person, and accordingly -\n\n(a) no person shall be subject to torture or to inhuman or degrading treatment;\n\n(b) no person shall he held in slavery or servitude; and\n\n(c) no person shall be required to perform forced of compulsory labour.\n\n(2) For the purposes of subsection (1)(c) of this section, "forced or compulsory labour" does not include -\n\n(a) any labour required in consequence of the sentence or order of a court;\n\n(b) any labour required of members of the armed forces of the Federation or the Nigeria Police Force in pursuance of their duties as such;\n\n(c) in the case of persons who have conscientious objections to service in the armed forces of the Federation, any labour required instead of such service;\n\n(d) any labour required which is reasonably necessary in the event of any emergency or calamity threatening the life or well-being of the community; or\n\n(e) any labour or service that forms part of -\n\n(i) normal communal or other civic obligations of the well-being of the community,\n\n(ii) such compulsory national service in the armed forces of the Federation as may be prescribed by an Act of the National Assembly, or\n\n(iii) such compulsory national service which forms part of the education and training of citizens of Nigeria as may be prescribed by an Act of the National Assembly.',

  'constitution.section.35.heading': 'Right to personal liberty',
  'constitution.section.35.body':
    '(1) Every person shall be entitled to his personal liberty and no person shall be deprived of such liberty save in the following cases and in accordance with a procedure permitted by law -\n\n(a) in execution of the sentence or order of a court in respect of a criminal offence of which he has been found guilty;\n\n(b) by reason of his failure to comply with the order of a court or in order to secure the fulfilment of any obligation imposed upon him by law;\n\n(c) for the purpose of bringing him before a court in execution of the order of a court or upon reasonable suspicion of his having committed a criminal offence, or to such extent as may be reasonably necessary to prevent his committing a criminal offence;\n\n(d) in the case of a person who has not attained the age of eighteen years for the purpose of his education or welfare;\n\n(e) in the case of persons suffering from infectious or contagious disease, persons of unsound mind, persons addicted to drugs or alcohol or vagrants, for the purpose of their care or treatment or the protection of the community; or\n\n(f) for the purpose of preventing the unlawful entry of any person into Nigeria or of effecting the expulsion, extradition or other lawful removal from Nigeria of any person or the taking of proceedings relating thereto:\n\nProvided that a person who is charged with an offence and who has been detained in lawful custody awaiting trial shall not continue to be kept in such detention for a period longer than the maximum period of imprisonment prescribed for the offence.\n\n(2) Any person who is arrested or detained shall have the right to remain silent or avoid answering any question until after consultation with a legal practitioner or any other person of his own choice.\n\n(3) Any person who is arrested or detained shall be informed in writing within twenty-four hours (and in a language that he understands) of the facts and grounds for his arrest or detention.\n\n(4) Any person who is arrested or detained in accordance with subsection (1)(c) of this section shall be brought before a court of law within a reasonable time, and if he is not tried within a period of -\n\n(a) two months from the date of his arrest or detention in the case of a person who is in custody or is not entitled to bail; or\n\n(b) three months from the date of his arrest or detention in the case of a person who has been released on bail, he shall (without prejudice to any further proceedings that may be brought against him) be released either unconditionally or upon such conditions as are reasonably necessary to ensure that he appears for trial at a later date.\n\n(5) In subsection (4) of this section, the expression "a reasonable time" means -\n\n(a) in the case of an arrest or detention in any place where there is a court of competent jurisdiction within a radius of forty kilometres, a period of one day; and\n\n(b) in any other case, a period of two days or such longer period as in the circumstances may be considered by the court to be reasonable.\n\n(6) Any person who is unlawfully arrested or detained shall be entitled to compensation and public apology from the appropriate authority or person; and in this subsection, "the appropriate authority or person" means an authority or person specified by law.\n\n(7) Nothing in this section shall be construed -\n\n(a) in relation to subsection (4) of this section, as applying in the case of a person arrested or detained upon reasonable suspicion of having committed a capital offence; and\n\n(b) as invalidating any law by reason only that it authorises the detention for a period not exceeding three months of a member of the armed forces of the Federation or a member of the Nigeria Police Force in execution of a sentence imposed by an officer of the armed forces of the Federation or of the Nigeria police force, in respect of an offence punishable by such detention of which he has been found guilty.',

  'constitution.section.36.heading': 'Right to fair hearing',
  'constitution.section.36.body':
    '(1) In the determination of his civil rights and obligations, including any question or determination by or against any government or authority, a person shall be entitled to a fair hearing within a reasonable time by a court or other tribunal established by law and constituted in such manner as to secure its independence and impartiality.\n\n(2) Without prejudice to the foregoing provisions of this section, a law shall not be invalidated by reason only that it confers on any government or authority power to determine questions arising in the administration of a law that affects or may affect the civil rights and obligations of any person if such law -\n\n(a) provides for an opportunity for the persons whose rights and obligations may be affected to make representations to the administering authority before that authority makes the decision affecting that person; and\n\n(b) contains no provision making the determination of the administering authority final and conclusive.\n\n(3) The proceedings of a court or the proceedings of any tribunal relating to the matters mentioned in subsection (1) of this section (including the announcement of the decisions of the court or tribunal) shall be held in public.\n\n(4) Whenever any person is charged with a criminal offence, he shall, unless the charge is withdrawn, be entitled to a fair hearing in public within a reasonable time by a court or tribunal:\n\nProvided that -\n\n(a) a court or such a tribunal may exclude from its proceedings persons other than the parties thereto or their legal practitioners in the interest of defence, public safety, public order, public morality, the welfare of persons who have not attained the age of eighteen years, the protection of the private lives of the parties or to such extent as it may consider necessary by reason of special circumstances in which publicity would be contrary to the interests of justice;\n\n(b) if in any proceedings before a court or such a tribunal, a Minister of the Government of the Federation or a commissioner of the government of a State satisfies the court or tribunal that it would not be in the public interest for any matter to be publicly disclosed, the court or tribunal shall make arrangements for evidence relating to that matter to be heard in private and shall take such other action as may be necessary or expedient to prevent the disclosure of the matter.\n\n(5) Every person who is charged with a criminal offence shall be presumed to be innocent until he is proved guilty;\n\nProvided that nothing in this section shall invalidate any law by reason only that the law imposes upon any such person the burden of proving particular facts.\n\n(6) Every person who is charged with a criminal offence shall be entitled to -\n\n(a) be informed promptly in the language that he understands and in detail of the nature of the offence;\n\n(b) be given adequate time and facilities for the preparation of his defence;\n\n(c) defend himself in person or by legal practitioners of his own choice;\n\n(d) examine, in person or by his legal practitioners, the witnesses called by the prosecution before any court or tribunal and obtain the attendance and carry out the examination of witnesses to testify on his behalf before the court or tribunal on the same conditions as those applying to the witnesses called by the prosecution; and\n\n(e) have, without payment, the assistance of an interpreter if he cannot understand the language used at the trial of the offence.\n\n(7) When any person is tried for any criminal offence, the court or tribunal shall keep a record of the proceedings and the accused person or any persons authorised by him in that behalf shall be entitled to obtain copies of the judgement in the case within seven days of the conclusion of the case.\n\n(8) No person shall be held to be guilty of a criminal offence on account of any act or omission that did not, at the time it took place, constitute such an offence, and no penalty shall be imposed for any criminal offence heavier than the penalty in force at the time the offence was committed.\n\n(9) No person who shows that he has been tried by any court of competent jurisdiction or tribunal for a criminal offence and either convicted or acquitted shall again be tried for that offence or for a criminal offence having the same ingredients as that offence save upon the order of a superior court.\n\n(10) No person who shows that he has been pardoned for a criminal offence shall again be tried for that offence.\n\n(11) No person who is tried for a criminal offence shall be compelled to give evidence at the trial.\n\n(12) Subject as otherwise provided by this Constitution, a person shall not be convicted of a criminal offence unless that offence is defined and the penalty therefor is prescribed in a written law, and in this subsection, a written law refers to an Act of the National Assembly or a Law of a State, any subsidiary legislation or instrument under the provisions of a law.',

  'constitution.section.37.heading': 'Right to private and family life',
  'constitution.section.37.body':
    'The privacy of citizens, their homes, correspondence, telephone conversations and telegraphic communications is hereby guaranteed and protected.',

  'constitution.section.38.heading': 'Right to freedom of thought, conscience and religion',
  'constitution.section.38.body':
    '(1) Every person shall be entitled to freedom of thought, conscience and religion, including freedom to change his religion or belief, and freedom (either alone or in community with others, and in public or in private) to manifest and propagate his religion or belief in worship, teaching, practice and observance.\n\n(2) No person attending any place of education shall be required to receive religious instruction or to take part in or attend any religious ceremony or observance if such instruction ceremony or observance relates to a religion other than his own, or religion not approved by his parent or guardian.\n\n(3) No religious community or denomination shall be prevented from providing religious instruction for pupils of that community or denomination in any place of education maintained wholly by that community or denomination.\n\n(4) Nothing in this section shall entitle any person to form, take part in the activity or be a member of a secret society.',

  'constitution.section.39.heading': 'Right to freedom of expression and the press',
  'constitution.section.39.body':
    '(1) Every person shall be entitled to freedom of expression, including freedom to hold opinions and to receive and impart ideas and information without interference.\n\n(2) Without prejudice to the generality of subsection (1) of this section, every person shall be entitled to own, establish and operate any medium for the dissemination of information, ideas and opinions:\n\nProvided that no person, other than the Government of the Federation or of a State or any other person or body authorised by the President on the fulfilment of conditions laid down by an Act of the National Assembly, shall own, establish or operate a television or wireless broadcasting station for, any purpose whatsoever.\n\n(3) Nothing in this section shall invalidate any law that is reasonably justifiable in a democratic society -\n\n(a) for the purpose of preventing the disclosure. of information received in confidence, maintaining the authority and independence of courts or regulating telephony, wireless broadcasting, television or the exhibition of cinematograph films; or\n\n(b) imposing restrictions upon persons holding office under the Government of the Federation or of a State, members of the armed forces of the Federation or members of the Nigeria Police Force or other Government security services or agencies established by law.',

  'constitution.section.40.heading': 'Right to peaceful assembly and association',
  'constitution.section.40.body':
    'Every person shall be entitled to assemble freely and associate with other persons, and in particular he may form or belong to any political party, trade union or any other association for the protection of his interests:\n\nProvided that the provisions of this section shall not derogate from the powers conferred by this Constitution on the Independent National Electoral Commission with respect to political parties to which that Commission does not accord recognition.',

  'constitution.section.41.heading': 'Right to freedom of movement',
  'constitution.section.41.body':
    '(1) Every citizen of Nigeria is entitled to move freely throughout Nigeria and to reside in any part thereof, and no citizen of Nigeria shall be expelled from Nigeria or refused entry thereby or exit therefrom.\n\n(2) Nothing in subsection (1) of this section shall invalidate any law that is reasonably justifiable in a democratic society-\n\n(a) imposing restrictions on the residence or movement of any person who has committed or is reasonably suspected to have committed a criminal offence in order to prevent him from leaving Nigeria; or\n\n(b) providing for the removal of any person from Nigeria to any other country to:-\n\n(i) be tried outside Nigeria for any criminal offence, or\n\n(ii) undergo imprisonment outside Nigeria in execution of the sentence of a court of law in respect of a criminal offence of which he has been found guilty:\n\nProvided that there is reciprocal agreement between Nigeria and such other country in relation to such matter.',

  'constitution.section.42.heading': 'Right to freedom from discrimination',
  'constitution.section.42.body':
    '(1) A citizen of Nigeria of a particular community, ethnic group, place of origin, sex, religion or political opinion shall not, by reason only that he is such a person:-\n\n(a) be subjected either expressly by, or in the practical application of, any law in force in Nigeria or any executive or administrative action of the government, to disabilities or restrictions to which citizens of Nigeria of other communities, ethnic groups, places of origin, sex, religions or political opinions are not made subject; or\n\n(b) be accorded either expressly by, or in the practical application of, any law in force in Nigeria or any such executive or administrative action, any privilege or advantage that is not accorded to citizens of Nigeria of other communities, ethnic groups, places of origin, sex, religions or political opinions.\n\n(2) No citizen of Nigeria shall be subjected to any disability or deprivation merely by reason of the circumstances of his birth.\n\n(3) Nothing in subsection (1) of this section shall invalidate any law by reason only that the law imposes restrictions with respect to the appointment of any person to any office under the State or as a member of the armed forces of the Federation or member of the Nigeria Police Forces or to an office in the service of a body, corporate established directly by any law in force in Nigeria.',

  'constitution.section.43.heading': 'Right to acquire and own immovable property',
  'constitution.section.43.body':
    'Subject to the provisions of this Constitution, every citizen of Nigeria shall have the right to acquire and own immovable property anywhere in Nigeria.',

  'constitution.section.44.heading': 'Compulsory acquisition of property',
  'constitution.section.44.body':
    '(1) No moveable property or any interest in an immovable property shall be taken possession of compulsorily and no right over or interest in any such property shall be acquired compulsorily in any part of Nigeria except in the manner and for the purposes prescribed by a law that, among other things -\n\n(a) requires the prompt payment of compensation therefore and\n\n(b) gives to any person claiming such compensation a right of access for the determination of his interest in the property and the amount of compensation to a court of law or tribunal or body having jurisdiction in that part of Nigeria.\n\n(2) Nothing in subsection (1) of this section shall be construed as affecting any general law.\n\n(a) for the imposition or enforcement of any tax, rate or duty;\n\n(b) for the imposition of penalties or forfeiture for breach of any law, whether under civil process or after conviction for an offence;\n\n(c) relating to leases, tenancies, mortgages, charges, bills of sale or any other rights or obligations arising out of contracts;\n\n(d) relating to the vesting and administration of property of persons adjudged or otherwise declared bankrupt or insolvent, of persons of unsound mind or deceased persons, and of corporate or unincorporate bodies in the course of being wound-up;\n\n(e) relating to the execution of judgements or orders of court;\n\n(f) providing for the taking of possession of property that is in a dangerous state or is injurious to the health of human beings, plants or animals;\n\n(g) relating to enemy property;\n\n(h) relating to trusts and trustees;\n\n(i) relating to limitation of actions;\n\n(j) relating to property vested in bodies corporate directly established by any law in force in Nigeria;\n\n(k) relating to the temporary taking of possession of property for the purpose of any examination, investigation or enquiry;\n\n(l) providing for the carrying out of work on land for the purpose of soil-conservation; or\n\n(m) subject to prompt payment of compensation for damage to buildings, economic trees or crops, providing for any authority or person to enter, survey or dig any land, or to lay, install or erect poles, cables, wires, pipes, or other conductors or structures on any land, in order to provide or maintain the supply or distribution of energy, fuel, water, sewage, telecommunication services or other public facilities or public utilities.\n\n(3) Notwithstanding the foregoing provisions of this section, the entire property in and control of all minerals, mineral oils and natural gas in under or upon any land in Nigeria or in, under or upon the territorial waters and the Exclusive Economic Zone of Nigeria shall vest in the Government of the Federation and shall be managed in such manner as may be prescribed by the National Assembly.',

  'constitution.section.45.heading': 'Restriction on and derogation from fundamental rights',
  'constitution.section.45.body':
    '(1) Nothing in sections 37, 38, 39, 40 and 41 of this Constitution shall invalidate any law that is reasonably justifiable in a democratic society\n\n(a) in the interest of defence, public safety, public order, public morality or public health; or\n\n(b) for the purpose of protecting the rights and freedom or other persons.\n\n(2) An Act of the National Assembly shall not be invalidated by reason only that it provides for the taking, during periods of emergency, of measures that derogate from the provisions of section 33 or 35 of this Constitution; but no such measures shall be taken in pursuance of any such act during any period of emergency save to the extent that those measures are reasonably justifiable for the purpose of dealing with the situation that exists during that period of emergency:\n\nProvided that nothing in this section shall authorise any derogation from the provisions of section 33 of this Constitution, except in respect of death resulting from acts of war or authorise any derogation from the provisions of section 36(8) of this Constitution.\n\n(3) In this section, "a period of emergency" means any period during which there is in force a Proclamation of a state of emergency declared by the President in exercise of the powers conferred on him under section 305 of this Constitution.',

  'constitution.section.46.heading': 'Special jurisdiction of High Court and legal aid',
  'constitution.section.46.body':
    '(1) Any person who alleges that any of the provisions of this Chapter has been, is being or likely to be contravened in any State in relation to him may apply to a High Court in that State for redress.\n\n(2) Subject to the provisions of this Constitution, a High Court shall have original jurisdiction to hear and determine any application made to it in pursuance of this section and may make such orders, issue such writs and give such directions as it may consider appropriate for the purpose of enforcement or securing the enforcing within that State of any right to which the person who makes the application may be entitled under this Chapter.\n\n(3) The Chief Justice of Nigeria may make rules with respect to the practice and procedure of a High Court for the purposes of this section.\n\n(4) The National Assembly -\n\n(a) may confer upon a High Court such powers in addition to those conferred by this section as may appear to the National Assembly to be necessary or desirable for the purpose of enabling the court more effectively to exercise the jurisdiction conferred upon it by this section; and\n\n(b) shall make provisions-\n\n(i) for the rendering of financial assistance to any indigent citizen of Nigeria where his right under this Chapter has been infringed or with a view to enabling him to engage the services of a legal practitioner to prosecute his claim, and\n\n(ii) for ensuring that allegations of infringement of such rights are substantial and the requirement or need for financial or legal aid is real.',

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
