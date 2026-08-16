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

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  t: (key: string, vars?: Record<string, string | number>) => string;
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

  const value = useMemo(
    () => ({ language, setLanguage, t, ready }),
    [language, setLanguage, t, ready]
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
