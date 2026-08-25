import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getStoredLanguage, setStoredLanguage, type LanguageCode } from '@/storage';

import { en } from './en';
import { pcm } from './pcm';

const dictionaries: Record<LanguageCode, Record<string, string>> = { en, pcm };

/**
 * A resolved string together with the language it actually came from — which is not
 * always the selected language, because of the English fallback in `t` below.
 *
 * Only speech needs this distinction: rendering English text under a Yoruba UI setting
 * is a harmless gap, but *speaking* English words with a Yoruba voice is fluent-sounding
 * nonsense. See docs/VOICE.md §2.
 */
export interface SpokenText {
  text: string;
  language: LanguageCode;
}

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Like `t`, but reports which dictionary supplied the string. For read-aloud. */
  resolveSpoken: (key: string, vars?: Record<string, string | number>) => SpokenText;
  /** True once the persisted language preference has been loaded. */
  ready: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
    template
  );
}

/** No Pidgin locale tag exists on-device, so there is nothing meaningful to
 * detect at first boot — English is the default until the user picks
 * Pidgin explicitly in onboarding or Profile → Language. */
const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await getStoredLanguage();
      if (!cancelled) {
        setLanguageState(stored ?? DEFAULT_LANGUAGE);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = useCallback(async (lang: LanguageCode) => {
    setLanguageState(lang);
    await setStoredLanguage(lang);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[language];
      const template = dict[key] ?? en[key] ?? key;
      return interpolate(template, vars);
    },
    [language]
  );

  const resolveSpoken = useCallback(
    (key: string, vars?: Record<string, string | number>): SpokenText => {
      const own = dictionaries[language][key];
      if (own !== undefined) return { text: interpolate(own, vars), language };

      // Fell through to English — so the voice must be English too, whatever the
      // user's UI language is set to.
      const fallback = en[key];
      return { text: interpolate(fallback ?? key, vars), language: 'en' };
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, resolveSpoken, ready }),
    [language, setLanguage, t, resolveSpoken, ready]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return ctx;
}
