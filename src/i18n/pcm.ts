/**
 * Naija Pidgin — PARTIAL coverage by design (see plan: "structure only,
 * partial Pidgin content acceptable" for MVP). Chrome strings are covered;
 * most Q&A content is not yet translated and will fall back to English via
 * the LanguageProvider's fallback logic. Extend this file incrementally —
 * no code changes needed elsewhere to add more keys.
 */
export const pcm: Record<string, string> = {
  'common.appName': 'Know Your Right',
  'common.notifications': 'Notifications',
  'common.openProfile': 'Open your profile',

  'tabs.home': 'Home',
  'tabs.chat': 'Chat',
  'tabs.history': 'History',
  'tabs.profile': 'Profile',
  'common.skip': 'Skip am',
  'common.next': 'Next',
  'common.back': 'Go back',
  'common.getStarted': 'Start am',
  'common.continueWithGoogle': 'Continue with Google',
  'common.continueWithApple': 'Continue with Apple',
  'common.orContinueWith': 'OR CONTINUE WITH',
  'common.signIn': 'Sign In',
  'common.readMore': 'Read more',
  'common.viewAll': 'See all',
  'common.save': 'Save am',
  'common.saved': 'E don save',
  'common.cancel': 'Cancel',
  'common.retry': 'Try again',
  'common.call': 'Call',
  'common.close': 'Close',
  'common.yes': 'Yes',
  'common.no': 'No',

  'onboarding.step1.title': 'Law for Simple English',
  'onboarding.step1.body':
    'We don translate hard legal grammar to simple everyday language wey you fit understand and use.',
  'onboarding.step2.title': 'Choose your language',
  'onboarding.step2.body':
    'Pick the language wey you go read well well. You fit change am anytime.',
  'onboarding.step2.english': 'English',
  'onboarding.step2.pidgin': 'Pidgin',
  'onboarding.step3.title': 'Wetin dey concern you?',
  'onboarding.step3.body':
    'Pick small topics make we show you relevant answers first. You fit skip am.',
  'onboarding.step3.cta': 'Don finish',

  'auth.register.haveAccount': 'You don already get account?',

  'home.greeting': 'Good morning, {{name}} 👋',
  'home.subtitle': 'Get clear answer to your legal wahala and know your right.',
  'home.searchPlaceholder': 'Wetin be the legal issue wey we fit help you with?',
  'home.exploreTopics': 'Popular Topics',
  'home.bannerTitle': 'Know Your Right. Protect Yourself.',
  'home.bannerBody': 'Get correct legal information and take the right action with confidence.',
  'home.bannerCta': 'Learn More',
  'home.recentActivity': 'Wetin You Ask Recently',
  'home.emptyRecent': 'The questions wey you don ask go show here.',
  'home.helpFabLabel': 'Get emergency help',

  'ask.title': 'Explain wetin happen...',
  'ask.subtitle': 'Give more details make our team fit give you the best answer.',
  'ask.textPlaceholder': 'Type your question here...',
  'ask.getAnswer': 'Get Answer',
  'ask.listening': 'We dey listen...',
  'ask.loading': 'We dey check the law...',
  'ask.emptyResults.title': 'We no fit find answer for that one',
  'ask.emptyResults.body': 'Try ask am another way, or check the topics below.',
  'ask.micIdleLabel': 'Use voice ask am',
  'ask.voiceUnavailable.title': 'Voice question dey come',
  'ask.voiceUnavailable.body': 'You never fit talk your question yet — abeg type am for down.',

  'answer.title': 'Answer',
  'answer.readAloud': 'Make e read this answer give you',
  'answer.stopReading': 'Stop the reading',
  'answer.shortAnswerLabel': 'Short Answer:',
  'answer.whyHeading': 'Why e be like this:',
  'answer.readMore': 'Read more',
  'answer.talkToLawyer': 'Talk to Lawyer',
  'answer.feedbackPrompt': 'E help you?',
  'answer.citationPrefix': 'E dey based on:',
  'answer.offlineBannerTitle': 'Offline Mode',
  'answer.offlineBannerBody': 'You dey see answer wey don save before. Connect internet to see latest update.',

  'saved.title': 'My Legal Questions',
  'saved.subtitle': 'Check back the questions and answers wey you don save.',
  'saved.tabSaved': 'Saved',
  'saved.tabRecent': 'Recent',
  'saved.status.answered': 'E don answer',

  'profile.editProfile': 'Edit Profile',
  'profile.settingsHeading': 'Settings',
  'profile.helpSupport': 'Help & Support',
  'profile.signOut': 'Sign Out',

  'help.title': 'Help & Support',
  'help.subtitle': 'Get emergency contact and legal help sharp sharp.',
  'help.emergencyHeading': 'Emergency contacts',
  'help.callAction': 'Call',

  'disclaimer.text': 'This one dey explain the law for simple way. E no be legal advice for your own case.',

  'constitution.title': 'The Constitution',
  'constitution.subtitle': 'Read the Constitution of Nigeria for the app — you fit read am even offline.',
  'constitution.searchPlaceholder': 'Search the Constitution...',
  'constitution.availableHeading': 'E dey available now',
  'constitution.comingSoonHeading': 'E dey come soon',

  'appGate.dbErrorTitle': 'The app no fit start finish',
  'appGate.dbErrorBody':
    'We no fit open your saved content right now. Nothing lost — try am again small time.',
  'appGate.dbErrorRetry': 'Try am again',
};
